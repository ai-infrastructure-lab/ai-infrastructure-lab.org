import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        cwd: 'content/pages',
        include: '**/*.md',
        prefix: ''
      },
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        date: z.date().optional(),
        author: z.string().optional(),
        status: z.string().optional()
      })
    }),
    fragments: defineCollection({
      type: 'page',
      source: '*.md'
    }),
    siteData: defineCollection({
      type: 'data',
      source: '**/*.{yml,yaml,json}'
    })
  }
})
