import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

const siteUrl = 'https://food.emfls.com';
const staticPaths = ['/', '/categories/', '/tools/cooking-converter/', '/about/', '/privacy/', '/contact/'];
type SitemapUrl = { path: string; updatedAt?: Date };

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const [recipes, knowledge] = await Promise.all([getCollection('recipes'), getCollection('knowledge')]);
  const contentPaths = [
    ...recipes.map((entry) => ({ path: `/recipes/${entry.id.replace(/\.md$/, '')}/`, updatedAt: entry.data.updatedAt })),
    ...knowledge.map((entry) => ({ path: `/knowledge/${entry.id.replace(/\.md$/, '')}/`, updatedAt: entry.data.updatedAt })),
  ];
  const urls: SitemapUrl[] = [
    ...staticPaths.map((path) => ({ path })),
    ...contentPaths,
  ];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls.map(({ path, updatedAt }) => [
      '  <url>',
      `    <loc>${escapeXml(`${siteUrl}${path}`)}</loc>`,
      ...(updatedAt ? [`    <lastmod>${updatedAt.toISOString()}</lastmod>`] : []),
      '  </url>',
    ].join('\n')),
    '</urlset>',
  ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
