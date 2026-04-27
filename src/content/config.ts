import { defineCollection, z } from 'astro:content';

/**
 * Cards. Every loose-stars card on /notebook has the same
 * shape: archetype + aim + state + dates + seed/preview/body.
 *
 * State machine, per the rebuild brief §2:
 *   draft → in-progress → patch-1 → patch-2 → … → finalized
 * The wax stamp is granted only when state === 'finalized'.
 */
const cards = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    archetype: z.enum(['logic', 'psyche', 'instinct']),
    aim: z.enum(['essay', 'lyric', 'story', 'thought']),
    state: z.enum([
      'draft',
      'in-progress',
      'patch-1', 'patch-2', 'patch-3', 'patch-4', 'patch-5',
      'finalized',
    ]),
    seeded: z.string(),   // YYYY.MM.DD
    touched: z.string(),  // YYYY.MM.DD
    seed: z.string(),
    preview: z.string(),
    pairs_with: z.array(z.string()).optional(),
  }),
});

export const collections = { cards };
