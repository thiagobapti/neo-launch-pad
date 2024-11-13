// Before defining your Security Headers
// add Content Security Policy directives using a template string.

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  connect-src 'self' https://spacex-production.up.railway.app/;
  img-src 'self';
  object-src 'self';
`;

module.exports = { ContentSecurityPolicy };
