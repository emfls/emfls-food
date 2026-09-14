import { defineCollection, z } from 'astro:content';

const relatedContent = z.array(z.object({ collection: z.enum(['recipes', 'knowledge']), slug: z.string(), label: z.string() })).default([]);
const image = z.object({ src: z.string(), alt: z.string() });
const shared = {
  title: z.string(), description: z.string(),
  category: z.enum(['밥', '고기', '채소', '해산물', '면', '간식', '조리법', '식재료', '보관법', '주방도구']),
  tags: z.array(z.string()).default([]), relatedContent, updatedAt: z.coerce.date(), image: image.optional(),
};

const recipes = defineCollection({ type: 'content', schema: z.object({
  ...shared, servings: z.number().positive(), prepTime: z.string(), cookTime: z.string(),
  ingredients: z.array(z.object({ item: z.string(), amount: z.union([z.number(), z.string()]), unit: z.string().optional(), note: z.string().optional() })),
  totalTime: z.string(),
  method: z.array(z.object({ title: z.string(), instruction: z.string(), point: z.string().optional(), image: image.optional() })),
  cookingReason: z.string(), substitutions: z.array(z.string()).default([]), storage: z.string(), reheating: z.string().optional(), failures: z.array(z.string()).default([]), tips: z.array(z.string()).default([]),
}) });

const knowledge = defineCollection({ type: 'content', schema: z.object({
  ...shared, topic: z.enum(['ingredient', 'storage', 'technique', 'tool']), summary: z.string(), whenUseful: z.string().optional(), keyPoints: z.array(z.string()).default([]),
  principles: z.array(z.object({ title: z.string(), explanation: z.string() })).default([]), steps: z.array(z.object({ title: z.string(), instruction: z.string() })).default([]), cautions: z.array(z.string()).default([]), commonMistakes: z.array(z.string()).default([]), variations: z.array(z.object({ title: z.string(), explanation: z.string() })).default([]),
  storage: z.string().optional(), substitutions: z.array(z.string()).default([]),
}) });

export const collections = { recipes, knowledge };
