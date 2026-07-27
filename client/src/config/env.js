/**
 * Create React App exposes only REACT_APP_* variables at build time.
 * Set these in .env locally and in your host's environment for production.
 */
function trimTrailingSlash(url) {
  if (!url) return '';
  return url.replace(/\/+$/, '');
}

export const API_URL = trimTrailingSlash(process.env.REACT_APP_API_URL || '');
export const CHAT_API_URL = trimTrailingSlash(
  process.env.REACT_APP_CHAT_API_URL || process.env.REACT_APP_API_URL || ''
);

export function assertApiConfigured() {
  if (!API_URL && process.env.NODE_ENV === 'production') {
    console.error(
      'REACT_APP_API_URL is not set. API requests will fail until you configure it at build time.'
    );
  }
}
