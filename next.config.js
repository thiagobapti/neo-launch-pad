const { ContentSecurityPolicy } = require('./next.csp');

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*?)', // automatically handles all locales
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
