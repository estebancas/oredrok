import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    role: z.string(),
    problem: z.string(),
    contribution: z.string(),
    results: z.array(z.object({
      metric: z.string(),
    })),
    techStack: z.array(z.string()),
    image: z.string(),
    liveUrl: z.string().nullable().optional(),
    appStoreUrl: z.string().nullable().optional(),
    playStoreUrl: z.string().nullable().optional(),
    order: z.number(),
    // Legacy fields for backward compatibility
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    cta: z.string().default('View Project'),
    demo: z.string().optional(),
    github: z.string().optional(),
    publishedDate: z.date().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    author: z.string().default('Oredrok'),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  blog,
};
