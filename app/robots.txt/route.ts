import { siteConfig } from '@/config/site-config';

export function GET() {
  const host = siteConfig.url.replace(/\/$/, '');
  const content = `User-agent: *
Disallow:

Sitemap: ${host}/sitemap.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
