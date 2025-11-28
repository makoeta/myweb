import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    personalProject: defineCollection({
      type: 'page',
      source: 'projects/personal/*.md',
      schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        description: z.string()
      })
    }),
    studentProject: defineCollection({
      type: 'page',
      source: 'projects/student/*.md',
      schema: z.object({
        title: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        date: z.date(),
        description: z.string()
      })
    })
  }
})
