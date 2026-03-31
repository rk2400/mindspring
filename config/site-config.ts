/**
 * Site-wide configuration for the template.
 *
 * This file is intended to be the first place developers update their branding
 * and SEO defaults when reusing the template for a new project.
 */

import { theme } from './theme';

export const siteConfig = {
  name: theme.name,
  shortName: theme.name,
  description: theme.description,
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Paths to logo assets (should exist in /public)
  logo: theme.logo,

  // Theme colors are used by tailwind config and can be referenced in components.
  theme: theme.colors,

  // Contact info used across the site and in email templates.
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || theme.contact?.email || 'support@cozycrochet.com',
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || theme.contact?.phone || '+1 (555) 123-4567',
    address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || theme.contact?.studio || '123 Main St, Anytown, USA',
  },

  // Social links (optional)
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || '',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
