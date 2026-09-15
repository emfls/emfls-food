export function onRequestGet() {
  return new Response('naver-site-verification: naver6dde13e69fe8ec25cd17e085c65c2124.html', {
    headers: { 'content-type': 'text/html; charset=UTF-8' },
  });
}
