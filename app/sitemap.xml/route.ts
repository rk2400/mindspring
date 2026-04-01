import { siteConfig } from '@/config/site-config';

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const staticRoutes = [
    '/',
    '/therapy',
    '/appointments',
    '/about',
    '/contact',
    '/help',
    '/login',
    '/signup',
    '/profile',
    '/privacy',
    '/terms',
  ];

  const urls = [...staticRoutes];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map((route) => {
      const location = `${baseUrl}${route}`;
      return `<url><loc>${location}</loc><changefreq>weekly</changefreq><priority>0.7</priority></url>`;
    })
    .join('\n  ')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
