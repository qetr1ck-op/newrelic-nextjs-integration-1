export function getHost(req) {
  const host = req.headers.host;
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  return `${protocol}://${host}`;
}
