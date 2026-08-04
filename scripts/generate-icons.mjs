import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const publicDir = join(process.cwd(), 'public')
const sourcePath = join(publicDir, 'title-logo-short.svg')
const cachePath = join(publicDir, '.icon-source.hash')

if (!existsSync(sourcePath)) {
  throw new Error(`Missing icon source: ${sourcePath}`)
}

const source = readFileSync(sourcePath)
const hash = createHash('sha256')
  .update(source)
  .update(readFileSync(new URL(import.meta.url)))
  .digest('hex')
const previousHash = existsSync(cachePath) ? readFileSync(cachePath, 'utf8').trim() : ''
const generatedTargets = [
  'favicon.svg',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'og-image.png',
  'site.webmanifest'
]
const hasMissingTargets = generatedTargets.some((file) => !existsSync(join(publicDir, file)))

if (hash === previousHash && !hasMissingTargets) {
  console.log('icons: source unchanged')
  process.exit(0)
}

mkdirSync(dirname(cachePath), { recursive: true })
writeFileSync(join(publicDir, 'favicon.svg'), source)

const pngTargets = [
  ['favicon-16x16.png', 16],
  ['favicon-32x32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512]
]

const renderSquareIcon = (size) => {
  const innerSize = Math.round(size * 0.8)
  const leadingPadding = Math.floor((size - innerSize) / 2)
  const trailingPadding = size - innerSize - leadingPadding

  return sharp(source)
    .resize(innerSize, innerSize, { fit: 'contain', background: '#0b0f10' })
    .extend({
      top: leadingPadding,
      right: trailingPadding,
      bottom: trailingPadding,
      left: leadingPadding,
      background: '#0b0f10'
    })
}

await Promise.all(
  pngTargets.map(([file, size]) =>
    renderSquareIcon(size)
      .png()
      .toFile(join(publicDir, file))
  )
)

const icoImages = await Promise.all(
  [16, 32].map((size) => renderSquareIcon(size).png().toBuffer())
)
const icoHeader = Buffer.alloc(6 + icoImages.length * 16)
icoHeader.writeUInt16LE(0, 0)
icoHeader.writeUInt16LE(1, 2)
icoHeader.writeUInt16LE(icoImages.length, 4)

let iconOffset = icoHeader.length
icoImages.forEach((image, index) => {
  const size = [16, 32][index]
  const entryOffset = 6 + index * 16

  icoHeader.writeUInt8(size, entryOffset)
  icoHeader.writeUInt8(size, entryOffset + 1)
  icoHeader.writeUInt8(0, entryOffset + 2)
  icoHeader.writeUInt8(0, entryOffset + 3)
  icoHeader.writeUInt16LE(1, entryOffset + 4)
  icoHeader.writeUInt16LE(32, entryOffset + 6)
  icoHeader.writeUInt32LE(image.length, entryOffset + 8)
  icoHeader.writeUInt32LE(iconOffset, entryOffset + 12)
  iconOffset += image.length
})

writeFileSync(join(publicDir, 'favicon.ico'), Buffer.concat([icoHeader, ...icoImages]))

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: '#0b0f10'
  }
})
  .composite([
    {
      input: await renderSquareIcon(256).png().toBuffer(),
      left: 472,
      top: 187
    }
  ])
  .png()
  .toFile(join(publicDir, 'og-image.png'))

writeFileSync(
  join(publicDir, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'The AI Infrastructure Lab',
      short_name: 'AI Infrastructure Lab',
      start_url: '/',
      display: 'standalone',
      background_color: '#0b0f10',
      theme_color: '#0b0f10',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' }
      ]
    },
    null,
    2
  )
)

writeFileSync(cachePath, `${hash}\n`)
console.log('icons: generated')
