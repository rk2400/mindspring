import { siteConfig } from '@/config/site-config';
import { getProductsFromDb } from '@/lib/products';

export async function GET() {
  const baseUrl = siteConfig.url.replace(/\/$/, '');
  const staticRoutes = [
    '/',
    '/products',
    '/about',
    '/contact',
    '/help',
    '/login',
    '/signup',
    '/cart',
    '/profile',
  ];

  let productUrls: string[] = [];
  try {
    const products = await getProductsFromDb({ status: 'active', limit: 200 });
    productUrls = products
      .filter((p: any) => p._id)
      .map((p: any) => `/products/${p._id}`);
  } catch (error) {
    // If product fetch fails (e.g. no DB), still return sitemap with static routes.
    console.warn('Failed to generate sitemap product URLs', error);
  }

  const urls = [...staticRoutes, ...productUrls];
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
