import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const journey = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/journey' }),
  schema: z.object({
    experiences: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        period: z.string(),
        summary: z.string(),
      })
    ),
  }),
});

const cv = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cv' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    website: z.string(),
    linkedin: z.string(),
  }),
});

export const collections = { journey, cv };
