import type { CollectionEntry } from 'astro:content';

type Entry = CollectionEntry<'recipes'> | CollectionEntry<'knowledge'>;
export function relatedEntries(current: Entry, allEntries: Entry[], limit = 3): Entry[] {
  const explicit = current.data.relatedContent.map((link) => allEntries.find((entry) => entry.collection === link.collection && entry.id.replace(/\.md$/, '') === link.slug)).filter((entry): entry is Entry => Boolean(entry));
  const rest = allEntries.filter((entry) => entry.id !== current.id && !explicit.some((item) => item.id === entry.id)).map((entry) => ({ entry, score: (entry.data.category === current.data.category ? 2 : 0) + entry.data.tags.filter((tag) => current.data.tags.includes(tag)).length })).sort((a, b) => b.score - a.score).map(({ entry }) => entry);
  return [...explicit, ...rest].slice(0, limit);
}
export function contentHref(entry: Entry): string { return `/${entry.collection}/${entry.id.replace(/\.md$/, '')}/`; }
