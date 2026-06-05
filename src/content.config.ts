import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const journey = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/journey' }),
  schema: z.object({
    experiences: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        href: z.url().optional(),
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
        href: z.url().optional(),
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
          href: z.url().optional(),
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
    projects: z.array(
      z.object({
        name: z.string(),
        href: z.url(),
        // Card thumbnails: root-relative paths into public/projects/ (a remote
        // URL is also accepted). imageDark is shown when the theme toggle puts
        // the site in dark mode; it falls back to image when absent.
        image: z.union([z.url(), z.string().startsWith('/')]).optional(),
        imageDark: z.union([z.url(), z.string().startsWith('/')]).optional(),
        description: z.string(),
        tags: z.array(z.string()),
      })
    ),
    testimonials: z.array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string(),
        translated: z.boolean().optional(),
      })
    ),
    classes: z.array(
      z.object({
        title: z.string(),
        href: z.url(),
        institution: z.string(),
        year: z.string(),
      })
    ),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/home' }),
  // Body is the rendered prose; no required frontmatter.
  schema: z.object({}).optional(),
});

export const collections = { journey, portfolio, home };
