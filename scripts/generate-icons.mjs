import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const publicDir = join(process.cwd(), 'public')
const sourcePath = join(publicDir, 'icon-source.svg')
const cachePath = join(publicDir, '.icon-source.hash')

if (!existsSync(sourcePath)) {
  throw new Error(`Missing icon source: ${sourcePath}`)
}

const source = readFileSync(sourcePath)
const hash = createHash('sha256').update(source).digest('hex')
const previousHash = existsSync(cachePath) ? readFileSync(cachePath, 'utf8').trim() : ''
const generatedTargets = [
  'favicon.svg',
  'favicon-16x16.png',
  'favicon-32x32.png',
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

await Promise.all(
  pngTargets.map(([file, size]) =>
    sharp(source)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, file))
  )
)

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
      input: await sharp(source).resize(256, 256).png().toBuffer(),
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
