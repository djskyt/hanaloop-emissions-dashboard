export default function GuidePage() {
  return (
    <div className="p-8 space-y-10 max-w-4xl">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          탄소 회계 가이드
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          이 대시보드에서 사용하는 탄소 배출량 측정 기준과 개념을 설명합니다.
        </p>
      </div>

      {/* PCF */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            PCF란 무엇인가?
          </h2>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 space-y-3">
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            <span className="text-[var(--text-primary)] font-medium">PCF(Product Carbon Footprint)</span>는
            제품 또는 조직의 전체 생애주기에서 발생하는 온실가스 배출량을
            CO₂ 등가(CO₂e) 단위로 정량화한 지표입니다.
          </p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            제조사, 물류사 등 기업이 원소재·전기·운송 데이터를 입력하면
            제품별 탄소 배출량을 자동으로 산출할 수 있으며,
            탄소세 계획 수립 및 Net Zero 목표 달성을 위한 핵심 지표로 활용됩니다.
          </p>
          <div className="rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-3 text-xs text-[var(--text-muted)]">
            단위: <span className="text-[var(--text-primary)] font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>tCO₂e</span>
            &nbsp;— 이산화탄소 환산톤 (tons of CO₂ equivalent)
          </div>
        </div>
      </section>

      {/* GHG Scope */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            GHG Protocol — Scope 분류
          </h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          GHG(Greenhouse Gas) Protocol은 기업 온실가스 배출량을 측정·보고하는 국제 표준입니다.
          배출원을 성격에 따라 Scope 1·2·3으로 분류합니다.
        </p>

        <div className="space-y-4">
          {/* Scope 1 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">
                Scope 1 — 직접 배출
              </h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              기업이 직접 소유하거나 통제하는 설비에서 발생하는 온실가스 배출입니다.
              연료를 직접 연소하는 모든 활동이 해당되며, 가장 기업의 직접적인 책임 범위입니다.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: "휘발유", en: "Gasoline" },
                { label: "경유",   en: "Diesel"   },
                { label: "LPG",    en: "LPG"      },
                { label: "천연가스", en: "Natural Gas" },
                { label: "석탄",   en: "Coal"     },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--danger-dim)] border border-[var(--danger)]"
                >
                  <span className="text-xs text-[var(--danger)] font-medium">{s.label}</span>
                  <span className="text-xs text-[var(--text-muted)]">· {s.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope 2 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--warn)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">
                Scope 2 — 전력 간접 배출
              </h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              외부에서 구매한 전력·열·냉방 사용으로 인해 발생하는 간접 배출입니다.
              기업이 전기를 사용할 때 발전소에서 발생하는 배출량을 귀속시킵니다.
              재생에너지 전환을 통해 Scope 2 감축이 가능합니다.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[{ label: "전기", en: "Electricity" }].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950 border border-amber-800"
                >
                  <span className="text-xs text-amber-400 font-medium">{s.label}</span>
                  <span className="text-xs text-[var(--text-muted)]">· {s.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope 3 */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]" />
              <h3 className="font-semibold text-[var(--text-primary)]">
                Scope 3 — 가치사슬 간접 배출
              </h3>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              공급망·물류·제품 사용·폐기 등 기업 가치사슬 전반에서 발생하는 기타 간접 배출입니다.
              일반적으로 기업 전체 배출량의 70% 이상을 차지하며,
              측정 난이도가 가장 높습니다.
            </p>
            <div className="rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] px-4 py-3">
              <p className="text-xs text-[var(--text-muted)]">
                현재 대시보드에서는 Scope 3 데이터를 포함하지 않습니다.
                공급망 데이터 연동 시 확장 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 대시보드 반영 방식 */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-1 h-6 rounded-full bg-[var(--accent)]" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            이 대시보드에서의 반영
          </h2>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6 space-y-4">
          {[
            {
              label: "대시보드",
              desc: "Scope 1·2·3 KPI 카드로 전체 배출량 구조를 한눈에 파악",
            },
            {
              label: "회사 상세",
              desc: "회사별 Scope 1·2 배출량 분리 표시 및 월별 트렌드 시각화",
            },
            {
              label: "배출원별 차트",
              desc: "휘발유·경유·전기 등 source 단위로 배출 비중 분석",
            },
            {
              label: "포스트",
              desc: "월별 탄소 이슈·대응 활동을 기록하고 회사와 연결",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 py-3 border-b border-[var(--border-subtle)] last:border-0"
            >
              <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-glow)] border border-[var(--accent-dim)] px-2 py-1 rounded-md whitespace-nowrap">
                {item.label}
              </span>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}