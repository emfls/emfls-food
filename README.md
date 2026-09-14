# emfls food

`food.emfls.com`을 위한 음식·요리 전문 정적 사이트입니다. 요리법뿐 아니라 식재료, 보관, 조리 원리까지 실용적으로 설명하는 Recipe Knowledge Base를 지향합니다.

## 시작하기

```bash
npm install
npm run dev
```

Production build는 `npm run build`, 타입과 Astro 구성 확인은 `npm run check`로 실행합니다.

## 구조

- `src/content/recipes`: 레시피 문서
- `src/content/knowledge`: 음식 지식 문서
- `src/pages`: 정적 페이지와 collection 기반 상세 라우트
- `src/styles/global.css`: editorial recipe book 디자인 토큰과 반응형 스타일

## Production

- Domain: `https://food.emfls.com`
- Build command: `npm run build`
- Output directory: `dist`
- Deployment target: Cloudflare Pages static hosting (`emfls-food.pages.dev` plus `food.emfls.com`)
- URL policy: trailing slash (`trailingSlash: 'always'`)

주요 route는 `/`, `/categories/`, `/recipes/<slug>/`, `/knowledge/<slug>/`, `/tools/cooking-converter/`, `/about/`, `/privacy/`, `/contact/`입니다. Cloudflare Pages production deployment와 `food.emfls.com` custom domain은 연결되어 있습니다. GA4, AdSense, 실제 문의 채널은 아직 설정하지 않았습니다.

Recipe Scaling과 Cooking Converter는 정적 페이지에 최소 client-side JavaScript로 동작하며, 콘텐츠는 `src/content/recipes`와 `src/content/knowledge`의 Astro Content Collections로 관리합니다.

현재 상태와 다음 작업은 `PROJECT_HISTORY.md`, `TASKS.md`, `SITE_STRATEGY.md`를 먼저 확인하세요.
