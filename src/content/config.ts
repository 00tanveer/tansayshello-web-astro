import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const ideas = defineCollection({
  schema: z.object({
    stage: z.string(),
    description: z.string(),
    ideas: z.array(z.string()),
  })
})

export const collections = { blog, ideas };
