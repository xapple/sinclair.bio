import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journey = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/journey' }),
  schema: z.object({
    experiences: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        employmentType: z.string().optional(),
        period: z.string(),
        location: z.string().optional(),
        summary: z.string(),
        highlights: z.array(z.string()).optional(),
      })
    ),
    education: z.array(
      z.object({
        school: z.string(),
        degree: z.string(),
        field: z.string().optional(),
        period: z.string(),
        summary: z.string(),
        details: z.array(z.string()).optional(),
      })
    ),
    certifications: z
      .array(
        z.object({
          name: z.string(),
          href: z.string().url().optional(),
          issuer: z.string(),
          field: z.string().optional(),
          period: z.string(),
          summary: z.string(),
          details: z.array(z.string()).optional(),
        })
      )
      .optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/portfolio' }),
  schema: z.object({
    testimonials: z.array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
      })
    ),
    publications: z.array(
      z.object({
        title: z.string(),
        href: z.string().url(),
        authors: z.string(),
        journal: z.string(),
        year: z.string(),
      })
    ),
  }),
});

export const collections = { journey, portfolio };
