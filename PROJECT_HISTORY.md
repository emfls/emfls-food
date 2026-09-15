# Project history

## 2026-09-14 — P0 foundation

### 수행 내용

- 비어 있던 저장소에 Astro 정적 사이트 기반을 구성했다.
- `food.emfls.com`을 canonical site URL로 설정했다.
- 홈, 소개, 개인정보처리방침, 문의, 카테고리, 404 라우트를 만들었다.
- 레시피 1개와 음식 지식 1개만 샘플로 추가해 collection과 상세 템플릿을 검증했다.
- 연결 기록은 `REPOSITORY_CONNECTION.md`에 남겼다.

### 기술 결정

- `output: 'static'`과 `@astrojs/sitemap`만 사용했다.
- React/Vue, Tailwind, API, DB, CMS, 로그인, 외부 UI 라이브러리는 추가하지 않았다.
- 레시피와 음식 지식을 `recipes`, `knowledge` Content Collection으로 분리했다.
- 두 collection에 title, description, category, tags, updatedAt, relatedContent를 공통으로 두고, 각 문서 성격에 맞는 고유 필드를 별도로 정의했다.
- 상세 라우트는 `/recipes/[...slug]`, `/knowledge/[...slug]`로 분리했다.

### 디자인 결정

- Modern Editorial Recipe Book 방향을 선택했다.
- warm white/paper 배경, cream section, terracotta accent, serif heading과 읽기 쉬운 sans 본문을 사용했다.
- 카드와 facts row는 얇은 rule 기반으로 만들고 장식적 그림자와 애니메이션을 배제했다.
- P0는 이미지 없이도 성립하도록 구성했다.

### 미완료 및 다음 단계

- Recipe Scaling과 Cooking Converter는 P1로 남겼다.
- 콘텐츠 대량 확장, 실제 GA4/AdSense, Cloudflare 배포, 검색 기능, 이미지 운영은 하지 않았다.
- 다음 작업자는 `SITE_STRATEGY.md`, `TASKS.md`, 이 문서를 먼저 읽고 P1 콘텐츠와 기능을 별도 계획으로 진행한다.

### 검증 기록

- `npm install` — 완료
- `npm run build` — 최초 성공 후 collection id의 `.md` 확장자를 공개 URL에서 제거하도록 수정
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 8개 정적 페이지 생성; recipe/knowledge URL에서 `.md` 확장자 제거 확인
- 콘텐츠(`src`, `public`, `README.md`, 전략·디자인·작업 문서)에서 placeholder/lorem ipsum 표현 없음 확인

## 2026-09-14 — P1-A content templates

### Recipe template

- Recipe 상세 페이지를 breadcrumb, tags, editorial facts, 본문, 재료, 조리 단계별 point, 조리 이유, 대체 재료, 보관/재가열, 실패하기 쉬운 부분, 팁, 관련 콘텐츠 순서로 확장했다.
- `totalTime`, `method[].point`, `reheating`, `failures`를 optional/확장 가능한 방식으로 추가했다. 기존 recipe 필드는 유지했다.

### Knowledge template

- Recipe와 다른 흐름으로 summary, 필요한 상황, 본문, 핵심 원칙, 단계별 방법, 보관 기준, 주의점, 흔한 실수, 상황별 차이, 관련 콘텐츠를 optional로 렌더링한다.
- `summary`만 Knowledge 답변의 핵심 진입점으로 required이며, 나머지 섹션은 빈 문서에 강제하지 않는다.

### Related content

- `src/lib/related.ts`에서 빌드타임 resolver를 추가했다.
- 우선순위는 명시적 `relatedContent` → 같은 category → 공통 tags이며, 자기 자신과 중복 항목은 제외한다.
- Recipe↔Knowledge 양방향 연결을 지원하고 최대 3개까지만 표시한다.

### Image and SEO decisions

- 공통 `image` 필드를 optional `{ src, alt }`로 추가했지만 이미지가 없으면 렌더링하지 않는다.
- 기존 canonical, description, Open Graph, article heading 구조를 유지하고 JSON-LD는 추가하지 않았다. 현재 샘플은 Google Recipe 필수 정보와 이미지 조건을 충분히 운영할 단계가 아니기 때문이다.
- breadcrumb와 category link를 상세 페이지에 추가했다.

### npm audit

- `npm audit --omit=dev --json` 결과 production dependency 기준 low 1, high 1, critical 1로 총 3건이다.
- 모두 Astro 및 그 하위 의존성에서 발생하며 자동 수정은 Astro 7.3.2로의 major upgrade를 요구한다. P0 구조를 깨뜨릴 수 있어 `npm audit fix --force`와 major upgrade는 적용하지 않았다.

### Not done

- 콘텐츠 대량 추가, Recipe Scaling, Cooking Converter, 검색, 이미지 추가, GA4, AdSense, Cloudflare 배포는 이번 P1-A에서 하지 않았다.

### Verification

- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 8개 정적 페이지 생성

## 2026-09-14 — P1-B initial content expansion

### Content added

- Recipe 5개: 김치볶음밥, 계란볶음밥, 계란찜, 두부부침, 감자볶음
- Knowledge 4개: 밥 냉장·냉동 보관, 남은 두부 보관, 계란 보관 원칙, 감자 보관과 싹
- 기존 Recipe 1개와 Knowledge 1개를 포함해 총 11개 상세 콘텐츠 페이지가 되었다.

### Content decisions

- 각 글은 별도 검색 의도를 갖도록 구성했고, 불필요한 서론과 키워드 반복을 넣지 않았다.
- Recipe는 불 조절, 재료 상태, 순서, 실패 지점을 중심으로 작성했다.
- Knowledge는 식품 안전 수치를 임의로 단정하지 않고, 상태 확인과 제품 안내 우선 원칙을 사용했다.
- 계란/달걀 표기는 `계란`으로 통일했고, 보관·볶음·반찬 등 태그도 기존 표현과 충돌하지 않게 사용했다.
- 명시적 `relatedContent`는 실제로 다음 행동이 유용한 경우에만 추가했으며, 나머지는 P1-A의 자동 resolver에 맡겼다.

### Architecture impact

- P0/P1-A의 Content Collection schema, 상세 템플릿, related resolver, 홈페이지·카테고리 collection 기반 노출 구조는 변경하지 않았다.
- 신규 콘텐츠는 모두 기존 schema를 사용했으며, optional 필드는 의미가 있는 문서에만 채웠다.

### Not done

- Recipe Scaling, Cooking Converter, 검색, 이미지 추가, GA4, AdSense, Cloudflare 배포는 이번 단계에서 하지 않았다.

### Verification

- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 17개 정적 페이지 생성

## 2026-09-14 — P1-D Cooking Converter

### 구현 내용

- `/tools/cooking-converter`에 독립적인 조리 단위 변환 도구를 추가했다.
- Header와 홈페이지의 주방 도구 영역에서 도구 페이지로 연결했다.
- 기존 Recipe Scaling과 분리된 `src/lib/cookingConverter.ts` 계산 모듈을 사용한다.

### Conversion rules

- 부피: `ml`, `L`, `작은술 (tsp)`, `큰술 (tbsp)`, `컵`
- 질량: `g`, `kg`
- 기준값은 코드 한 곳의 `COOKING_UNITS`에서 관리한다.
- 1컵=200ml, 1큰술=15ml, 1작은술=5ml, 1L=1000ml, 1kg=1000g을 사용한다. 한국어 레시피에서 이해하기 쉬운 조리 계량 기준으로 초기 범위를 고정하고, 페이지에도 기준을 명시했다.
- g↔ml은 밀도 정보가 없으면 변환하지 않고 안내 메시지를 표시한다.

### UX and technical decisions

- 기본값은 1 큰술→15ml로 즉시 결과가 보이도록 했다.
- 입력값은 0 이상 100,000 이하로 제한하며, 빈 값·NaN·음수·차원 불일치를 안전하게 처리한다.
- 결과는 소수 둘째 자리까지 반올림하고 한국어 locale 숫자 표기를 사용한다.
- native input/select/button과 `aria-live` 결과 영역을 사용해 keyboard 접근을 지원한다.
- JS 없이도 페이지의 설명과 변환 기준은 읽을 수 있으며, 계산 UI는 progressive enhancement로 동작한다.
- 모바일에서는 입력 필드를 두 열로 재배치하고 swap control을 유지한다.

### Not done

- Recipe Scaling 재작성, Recipe ingredient 자동 단위 변환, 재료별 g↔ml, 별도 영양 계산, 검색, CMS, 외부 API, 분석/광고/배포 설정은 하지 않았다.

### Verification

- cooking converter helper direct checks — volume, mass, incompatible units, negative, NaN, formatting 확인
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 18개 정적 페이지 생성
- Recipe 6개 route와 Knowledge 5개 route 생성 확인
- 기존 홈페이지 및 카테고리 페이지가 collection 기반으로 신규 콘텐츠를 자동 반영함을 확인

## 2026-09-14 — P1-E Launch Readiness QA

### Audit scope

- 전체 정적 route, Header/Footer navigation, Recipe 6개, Knowledge 5개, Recipe Scaling, Cooking Converter, metadata/canonical, sitemap/robots, About/Privacy/Contact, 내부 링크를 점검했다.
- 신규 기능이나 콘텐츠는 추가하지 않았다.

### Issue found and fixed

- 빌드 산출물의 canonical은 trailing slash를 사용했지만 일부 내부 링크가 slash 없이 생성되어 Astro preview에서 `/categories`, 상세 route, Converter route가 404가 되는 불일치를 발견했다.
- `astro.config.mjs`에 `trailingSlash: 'always'`를 명시하고 Header, Footer, Breadcrumbs, 홈, 카테고리, 관련 콘텐츠 링크를 trailing slash URL로 통일했다.
- 새 preview 포트에서 주요 route 모두 HTTP 200을 확인했다.

### QA results

- Recipe 6개와 Knowledge 5개 정적 route 생성 확인
- HTML 18개 모두 title, description, canonical 1개, h1 1개 확인
- 내부 링크 broken target 없음 확인
- Recipe Scaling과 Cooking Converter client bundle이 정적 HTML과 함께 생성됨 확인
- sitemap-index.xml과 robots.txt 존재 및 `https://food.emfls.com` 기준 확인
- 기본 navigation, category, related content, tool link 확인
- native form controls, labels, `aria-live`, `aria-pressed`, focus-visible CSS 확인
- responsive CSS의 모바일 breakpoint와 grid 축소 규칙 확인

### Verification

- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 18개 정적 페이지 생성
- generated HTML route/link/SEO structural audit — 통과
- preview HTTP audit — 주요 10개 route 모두 200

## 2026-09-14 — P1-F image operations system

### 구현 내용

- 기존 optional `image: { src, alt }` 구조를 유지하고, Recipe/Knowledge 상세 hero, homepage/category card, Open Graph 이미지에 조건부 연결했다.
- Recipe method에는 optional step image 필드를 추가할 수 있도록 schema를 확장했다.
- 공통 `ContentImage.astro`를 추가해 hero/card/step variant, alt, loading, decoding을 한 곳에서 관리한다.
- 이미지가 없는 현재 Recipe 6개와 Knowledge 5개는 이미지 영역 없이 기존 editorial layout을 유지한다.

### 운영 결정

- 향후 asset 경로는 `src/assets/food/recipes/<slug>/`, `src/assets/food/knowledge/<slug>/`, `src/assets/food/shared/`로 구분한다.
- WebP를 초기 기본 포맷으로 하고, slug 기반 kebab-case 파일명을 사용한다.
- hero는 16:9, card와 step은 4:3 crop 영역을 사용하며 hero eager, card/step lazy loading을 적용한다.
- alt는 실제 이미지 내용을 짧게 설명하고 파일명이나 SEO 키워드를 반복하지 않는다.
- 직접 촬영, 권리 확인 이미지, 직접 생성 이미지, 프로젝트 생성 AI 이미지만 허용한다. 검색·블로그·쇼핑몰 이미지 무단 사용과 권리 불명확 이미지는 금지한다.
- AI 이미지는 실제 레시피에 없는 재료나 garnish를 추가하지 않아 조리 결과를 오해하게 만들지 않는다.
- 이번 단계에서는 실제 이미지 다운로드·생성·대량 추가를 하지 않았다.

### SEO and performance

- 이미지가 있을 때만 `og:image`와 `og:image:alt`를 출력한다.
- 이미지가 없어도 OG metadata와 상세 layout이 깨지지 않는다.
- aspect-ratio, object-fit, loading 전략으로 layout shift와 초기 로딩 부담을 줄인다.

### Verification

- 기존 11개 콘텐츠에 이미지가 없어도 image block이 생성되지 않는 구조 확인
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 18개 정적 페이지 생성
- image-less content audit — 18개 HTML에서 이미지 없는 콘텐츠에 불필요한 image block이 생성되지 않음을 확인

## 2026-09-14 — P1-G AdSense / Production Launch Preparation

### Audit and repository updates

- About 페이지에 사이트 목적, Recipe와 Food Knowledge의 차이, Recipe Scaling/Cooking Converter의 역할, 콘텐츠 작성 원칙을 보강했다.
- 실제 운영 이메일이 확인되지 않아 Contact 페이지의 임의 이메일을 제거하고, 공개 전 실제 문의 채널을 설정해야 한다는 안내와 체크리스트를 추가했다.
- Privacy 페이지를 현재 상태에 맞게 수정했다. 현재 GA4, AdSense, 회원가입, 댓글, 결제, 문의 폼은 연결되어 있지 않으며 향후 외부 서비스 연결 전에 정책을 갱신해야 한다.
- README에 현재 route, build/output, static Cloudflare Pages 배포 방향, 도구 상태, production domain을 반영했다.
- `LAUNCH_CHECKLIST.md`를 추가해 Cloudflare, Search Console, GA4, AdSense, ads.txt의 외부 설정 작업을 분리했다.
- `SITE_STRATEGY.md`에 광고 위치 원칙과 개인정보처리방침/ads.txt 갱신 원칙을 추가했다.

### Production findings

- `food.emfls.com`은 Astro site/canonical, sitemap, robots에 일관되게 설정되어 있다.
- `trailingSlash: 'always'` 정책과 내부 링크를 유지했고, GA4 ID·AdSense publisher ID·ads.txt·Cloudflare token·secret은 저장소에 넣지 않았다.
- 현재 Recipe 6개, Knowledge 5개, Tool 1개와 Trust/Navigation 페이지로 launch candidate 구조를 갖춘 상태다.
- 실제 Cloudflare 연결, DNS/HTTPS, Search Console, GA4, AdSense 승인 및 운영 문의 채널은 외부 설정 blocker로 남겼다.

### Security note

- `npm audit --omit=dev --json` 재확인 결과 production dependency 기준 low 1, high 1, critical 1이다.
- Astro major upgrade가 fix를 제공하지만 이번 작업에서 `npm audit fix --force`나 major upgrade는 실행하지 않았다. 출시 전 별도 maintenance 검토가 필요하다.

### Verification

- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 18개 정적 페이지 생성
- fake email/ID, localhost, `.env`, placeholder, under-construction source scan — 발견되지 않음

## 2026-09-14 — P1-H Production Deployment assessment

### Repository status

- Current branch: `main`
- Repository remote: `https://github.com/emfls/emfls-food.git`
- Initial project content was committed normally in `8a18a3c` (`chore: prepare emfls-food for production deployment`) and pushed to `origin/main`. No history rewrite, reset, or force push was used.
- `package-lock.json` lockfileVersion is 3. Build configuration is Astro static with `npm run build` and `dist` output.

### Deployment status

- Cloudflare Pages project lookup, GitHub connection, DNS, HTTPS certificate, and deployment were not performed because no Cloudflare/GitHub deployment connector or credentials are available in this session.
- `https://food.emfls.com/` could not be resolved from the current environment, so the site is not reported as LIVE.
- Status: BLOCKED for actual production deployment because Cloudflare project access and DNS/HTTPS configuration are external prerequisites. The repository is ready for that setup, with blockers documented in `LAUNCH_CHECKLIST.md`.

### P1-H handoff

- GitHub: `https://github.com/emfls/emfls-food`, branch `main`, latest pushed commit `8a18a3c`.
- Cloudflare Pages deployment and custom-domain verification were not performed because no Cloudflare project access or connector is available in this session.
- `food.emfls.com` did not resolve during the production check, so live HTTP, HTTPS, sitemap, robots, and canonical URLs remain unverified.

### Local production verification

- `npm install` is already represented by the lockfile and installed dependency tree.
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — success, 18 static pages
- Generated Recipe 6, Knowledge 5, Cooking Converter, sitemap, robots, and 404 outputs confirmed.
- Production artifact scan found no localhost, 127.0.0.1, fake IDs, `.env`, or unverified contact address in source/config.
- Generated HTML structural SEO audit passed for 18 HTML files.

### Remaining external steps

- Connect GitHub repository to Cloudflare Pages using `main`, `npm run build`, and `dist`.
- Configure `food.emfls.com` DNS and HTTPS.
- Run production smoke tests, then register Search Console and submit the sitemap.
- Set a real contact channel before public launch.
- Review the known Astro/esbuild/sharp audit findings before production deployment; no major upgrade or `npm audit fix --force` was applied.

## 2026-09-15 — P1-H Production QA attempt

### Scope

- Audited only the current `emfls-food` repository and its declared production domain `food.emfls.com`.
- No new feature, content, dependency, Cloudflare configuration, or source change was made.

### Actual production result

- `curl -I -L https://food.emfls.com/` failed with `Could not resolve host: food.emfls.com`.
- DNS resolution failed before HTTP or TLS negotiation, so HTTP 200, certificate, Cloudflare serving headers, redirects, trailing slash behavior, route responses, browser rendering, interactive features, and production SEO could not be verified.
- Cloudflare Pages project identity, repository connection, production branch, latest deployment, build settings, output directory, and `pages.dev` relationship were not accessible from this session and were not assumed.

### QA status

- Status remains `BLOCKED`, not `LIVE`.
- The production checklist intentionally remains incomplete. Local build and artifact checks documented earlier are not treated as production evidence.

## 2026-09-15 — P1-H Cloudflare deployment and production verification

### Cloudflare and GitHub

- Confirmed GitHub App access to `emfls/emfls-food` (repository ID `1369403866`, default branch `main`).
- Confirmed no existing `emfls-food` Pages project; other EMFLS projects were not modified.
- Created Pages project `emfls-food` (project ID `415d55b6-647e-4765-991d-2f9d77e0ca91`) connected to `emfls/emfls-food`.
- Production branch: `main`; build command: `npm run build`; output directory: `dist`; framework detected: Astro; no Functions used.
- Production deployment `70e75954-95a3-4e10-8e52-60a65b07c6ca` completed with queued, initialize, clone, build, and deploy stages all successful.
- Pages URL: `https://emfls-food.pages.dev/`.

### Custom domain and DNS

- Added `food.emfls.com` as the Pages custom domain.
- Added only the scoped DNS record `food.emfls.com CNAME emfls-food.pages.dev`; no other subdomain records were changed.
- Cloudflare Pages domain status became `active`; HTTPS certificate validation became active.

### Production QA

- Pages URL returned HTTP 200 with Cloudflare headers.
- `https://food.emfls.com/` returned HTTP 200 over HTTPS after DNS propagation.
- Route smoke test passed: home, categories, two Recipes, two Knowledge pages, Cooking Converter, About, Privacy, Contact, robots, and sitemap returned 200.
- An arbitrary nonexistent URL returned 404.
- Browser QA passed on production: Recipe Scaling changed 2 servings to 4 servings; Cooking Converter returned `400 ml` for 2 cups, swap returned `0.07 큰술`, and invalid `-1` input displayed `—`.
- Homepage navigation and related-content links were visible and resolved to the expected trailing-slash URLs.
- Production HTML contained canonical URLs, title, description, and Open Graph metadata using `https://food.emfls.com/`; the pages.dev homepage also emitted the food.emfls.com canonical.
- `/robots.txt` referenced `https://food.emfls.com/sitemap-index.xml`; `/sitemap-index.xml` referenced the food.emfls.com sitemap.

### Status

- P1-H status is now complete and production status is `LIVE`.
- Remaining external work is limited to Search Console, a real operating contact channel, GA4, AdSense, and dependency security maintenance.

## 2026-09-15 — Google Search Console initial indexing setup

### Property and verification

- Confirmed the existing verified Google Search Console Domain Property `sc-domain:emfls.com` is available to the signed-in account and covers the `food.emfls.com` subdomain.
- Did not create a duplicate `food.emfls.com` URL-prefix property and did not add or change verification DNS/meta values.

### Sitemap and URL inspection

- Submitted `https://food.emfls.com/sitemap-index.xml` in the verified Domain Property.
- Search Console reported the submission as successful. The current report shows 0 discovered pages while Google performs initial processing; this is not treated as full indexing.
- Inspected the homepage and `https://food.emfls.com/recipes/egg-fried-rice/`.
- The homepage was previously unknown to Google and the representative Recipe was reported as discovered but not currently indexed; both indexing requests were submitted and confirmed as added to Google's priority crawl queue.

### Scope and remaining work

- Production SEO files remain unchanged: robots, sitemap, canonical, HTTP, and trailing-slash checks were already passing on production.
- No new content, features, verification token, GA4, AdSense, or Astro upgrade was added.
- Google must still process the sitemap and crawl the requested URLs; indexing is not guaranteed immediately.

## 2026-09-14 — P1-C Recipe Scaling

### 구현 내용

- Recipe 상세 페이지의 재료 섹션에 1~6인분 선택 control을 추가했다.
- 기본 인분 재료는 서버에서 HTML로 먼저 렌더링하고, JavaScript는 선택 변경 시 수량만 갱신하는 progressive enhancement 방식으로 구현했다.
- `src/lib/recipeScaling.ts`로 계산과 표시 포맷을 UI에서 분리했다.

### Data and calculation decisions

- 기존 `{ item, amount: string }` 구조를 유지하면서 `amount`가 number 또는 string이 될 수 있도록 최소 확장했다. `unit`과 `note`도 optional로 지원한다.
- 숫자형 양은 `기본 수량 × 선택 인분 / 기본 인분`으로 계산한다.
- 숫자로 시작하는 문자열은 `2공기`처럼 suffix를 보존해 환산하고, `약간`, `취향껏` 같은 비수량 문자열은 그대로 유지한다.
- 1/4, 1/2, 3/4, 1 1/2 같은 읽기 쉬운 표현을 우선하며, 그 외 값은 소수 둘째 자리까지 제한한다.
- 단위 변환은 하지 않는다. g, ml, 큰술, 작은술, 개, 공기 등 원래 단위를 그대로 유지한다.

### UI and accessibility decisions

- SaaS 계산기 대신 재료 heading 옆의 작은 editorial control로 배치했다.
- 버튼은 native `button`과 `aria-pressed`를 사용해 keyboard와 현재 선택 상태를 지원한다.
- JS 오류나 비활성화 상황에서도 기본 인분 재료 목록은 그대로 읽을 수 있다.
- 선택 범위는 1~6인분으로 제한해 과도한 수량 입력을 막았다.

### Not done

- Cooking Converter, 별도 `/tools/recipe-scaling` 페이지, Recipe JSON-LD, 신규 콘텐츠, 검색, 이미지, 배포 설정은 이번 단계에서 하지 않았다.

### Verification

- Recipe scaling helper direct checks — 2→1, 2→4, 1큰술→1/2큰술·1 1/2큰술, 1/2→1, 비수량 문자열 유지 확인
- `npm run check` — 0 errors, 0 warnings, 0 hints
- `npm run build` — 성공, 17개 정적 페이지 생성
