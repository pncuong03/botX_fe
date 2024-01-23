// /** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

module.exports = {
  siteUrl,
  priority: 0.8,
  additionalPaths: async () => {
    const result = [];
    // all possible values
    result.push({
      loc: '/',
      priority: 1.0,
    });

    return result;
  },
  generateRobotsTxt: true,
  exclude: ['/sitemap-page.xml', '/sitemap-review-truyen.xml', '/sitemap-the-loai.xml', '/sitemap-truyen.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/sitemap-page.xml`,
      `${siteUrl}/sitemap-review-truyen.xml`,
      `${siteUrl}/sitemap-the-loai.xml`,
      `${siteUrl}/sitemap-truyen.xml`,
    ],
    policies: [
      {
        userAgent: '*',
        disallow: ['/_next/', '/cdn-cgi*', '/feed*', '/tag*', '/?s=', '/?__hstc=', '/p=*', '/*.jsp'],
      },
      {
        userAgent: 'dotbot',
        disallow: '/',
      },
    ],
  },
};
