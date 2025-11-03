const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nrcommcare.org';

export default async function sitemap() {
  const staticRoutes = ['/', '/about', '/programs', '/donate', '/volunteer', '/items-needed', '/hours-and-contact'];

  return staticRoutes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));
}
