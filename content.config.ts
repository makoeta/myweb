import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const projectSchema = z.object({
  title: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().default(''),
  date: z.string().optional(),
  featured: z.boolean().default(false),
  description: z.string().default(''),
  repo: z.string().default(''),
  link: z.string().default('')
})

export default defineContentConfig({
  collections: {
    personalProject: defineCollection({
      type: 'page',
      source: 'projects/personal/*.md',
      schema: projectSchema
    }),
    studentProject: defineCollection({
      type: 'page',
      source: 'projects/student/*.md',
      schema: projectSchema
    }),
    career: defineCollection({
      type: 'page',
      source: 'career/*.md',
      schema: z.object({
        role: z.string(),
        type: z.enum(['work', 'education']).default('work'),
        company: z.string(),
        companyUrl: z.string().default(''),
        location: z.string().default(''),
        start: z.string(),
        end: z.string().default('present'),
        current: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        description: z.string().default('')
      })
    })
  }
})
