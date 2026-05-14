# HanaLoop Emissions Dashboard

탄소 배출량 모니터링 대시보드. 회사별·국가별·배출원별 온실가스 배출 현황을 시각화합니다.

🚀 **배포**: https://hanaloop-emissions-dashboard.vercel.app

---

## 실행

```bash
npm install && npm run dev
```

---

## 기술 스택
Next.js 16 · TypeScript · Tailwind CSS · Zustand · Recharts · Vercel

---

## 아키텍처 핵심 결정

**상태 3레이어 분리**
- Data State → Custom Hooks (로딩/에러 독립 관리)
- Filter + UI State → Zustand 단일 스토어 (규모상 통합이 적절)

**Optimistic Update + 롤백**  
저장 즉시 UI 반영 → API 실패(15%) 시 자동 롤백

---

## 도메인 반영 (PCF / GHG Scope)

`utils/emissions.ts`에 Scope 분류 로직 구현
- Scope 1: 직접 연소 (휘발유, 경유, LPG, 천연가스, 석탄)
- Scope 2: 전력 간접 (전기)
- Scope 3: 데이터 미포함 (확장 가능 구조로 설계)

대시보드 KPI · 회사 상세 · 가이드 페이지에 반영

---

## 과제 문서 버그 수정
1. seed data JSON 문법 오류 (`:` → `,`)
2. `GhgEmission.source` 필드 누락 → 직접 정의
3. `Post` 타입 중복 선언

---

## AI 활용
Claude를 활용해 개발했습니다. 컴포넌트 코드 생성 및 아키텍처 설계에 활용했으며, 모든 코드는 직접 검토하고 구조적 판단은 직접 결정했습니다.
