const body = 'naver-site-verification: naver6dde13e69fe8ec25cd17e085c65c2124.html';

export function onRequest({ request }) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response(null, { status: 405, headers: { allow: 'GET, HEAD' } });
  }
  return new Response(request.method === 'HEAD' ? null : body, {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}
