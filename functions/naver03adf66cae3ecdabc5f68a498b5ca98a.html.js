const body = 'naver-site-verification: naver03adf66cae3ecdabc5f68a498b5ca98a.html';

export function onRequest({ request }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { allow: 'GET, HEAD' } });
  }
  return new Response(request.method === 'HEAD' ? null : body, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}
