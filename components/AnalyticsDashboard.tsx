"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useAnalytics } from "../hooks/useAnalytics";
import { statusColors } from "../lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function AnalyticsDashboard() {
  const { data, loading, error } = useAnalytics();

  const overview = (data.overview && typeof data.overview === "object" ? data.overview : null) ?? {
    total_leads: 12847,
    hot_leads: 2403,
    avg_score: 84,
    expected_revenue: 4.2,
  };

  const segmentsFallback: { status: string; value: number }[] = [
    { status: "HOT", value: 38 },
    { status: "WARM", value: 24 },
    { status: "NURTURE", value: 20 },
    { status: "COLD", value: 18 },
  ];
  const segments: { status: string; value: number }[] = Array.isArray(data.segments) ? data.segments : segmentsFallback;

  const topLeadsFallback = Array.from({ length: 10 }, (_, i) => ({
    id: `lead-${i + 1}`,
    company: `Company ${i + 1}`,
    score: 96 - i,
    status: i === 0 ? "HOT" : "WARM",
    deal_value: `$${(2.4 - i * 0.1).toFixed(1)}M`,
  }));
  const topLeads = Array.isArray(data.topLeads) ? data.topLeads : topLeadsFallback;

  const revenueFallback: {
    segment: string;
    pipeline_value: string;
    conversion: string;
    expected: string;
  }[] = [
    { segment: "HOT", pipeline_value: "$3.2M", conversion: "62%", expected: "$1.9M" },
    { segment: "WARM", pipeline_value: "$2.1M", conversion: "38%", expected: "$0.8M" },
    { segment: "NURTURE", pipeline_value: "$1.4M", conversion: "18%", expected: "$0.3M" },
    { segment: "COLD", pipeline_value: "$0.9M", conversion: "8%", expected: "$0.1M" },
  ];
  const revenueRows: {
    segment: string;
    pipeline_value: string;
    conversion: string;
    expected: string;
  }[] = Array.isArray(data.revenue) ? data.revenue : revenueFallback;

  return (
    <section className="section" id="analytics">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        <h2 className="text-3xl font-heading font-black text-text">
          <span className="gradient-text">Pipeline Intelligence</span> at a Glance
        </h2>

        {loading && <div className="mt-8 grid gap-4 md:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}</div>}
        {error && <div className="mt-6 rounded-2xl border border-border bg-surface/70 p-4 text-sm text-muted">{error}</div>}

        {!loading && !error && (
          <motion.div variants={stagger} className="mt-8 space-y-10">
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Total Leads", value: overview.total_leads, suffix: "" },
                { label: "HOT Leads", value: overview.hot_leads, suffix: "" },
                { label: "Avg Score", value: overview.avg_score, suffix: "" },
                { label: "Expected Revenue", value: overview.expected_revenue, suffix: "M" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-2xl border border-border bg-surface/70 p-4">
                  <p className="text-xs text-muted">{kpi.label}</p>
                  <p className="mt-3 text-2xl font-heading font-extrabold text-text">
                    <CountUp end={Number(kpi.value)} suffix={kpi.suffix} enableScrollSpy />
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs text-secondary">▲ 12% vs last month</span>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-border bg-surface/70 p-6">
                <h3 className="text-sm font-semibold text-text">Segment Distribution</h3>
                <div className="mt-6 flex items-center justify-center">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    {(() => {
                      type Segment = { status: string; value: number };
                      type SegmentAccumulator = { angle: number; paths: JSX.Element[] };

                      const total = segments.reduce((sum, s) => sum + s.value, 0);

                      return segments.reduce<SegmentAccumulator>(
                        (acc, seg, idx) => {
                          const startAngle = acc.angle;
                          const angle = (seg.value / total) * 2 * Math.PI;
                          const endAngle = startAngle + angle;
                          const largeArc = angle > Math.PI ? 1 : 0;
                          const startX = 90 + 70 * Math.cos(startAngle);
                          const startY = 90 + 70 * Math.sin(startAngle);
                          const endX = 90 + 70 * Math.cos(endAngle);
                          const endY = 90 + 70 * Math.sin(endAngle);
                          const path = `M 90 90 L ${startX} ${startY} A 70 70 0 ${largeArc} 1 ${endX} ${endY} Z`;
                          const color = statusColors[seg.status as keyof typeof statusColors]?.bg || "#7C3AED";
                          acc.paths.push(
                            <motion.path
                              key={seg.status}
                              d={path}
                              fill={color}
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              transition={{ duration: 0.8, delay: idx * 0.2 }}
                            />
                          );
                          acc.angle = endAngle;
                          return acc;
                        },
                        { angle: -Math.PI / 2, paths: [] }
                      ).paths;
                    })()}
                  </svg>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-surface/70 p-6">
                <h3 className="text-sm font-semibold text-text">Top Industries</h3>
                <div className="mt-6 flex items-end justify-between gap-4">
                  {["SaaS", "Fintech", "Healthcare", "Security", "E-commerce"].map((industry, idx) => {
                    const value = 32 - idx * 4;
                    return (
                      <div key={industry} className="flex flex-1 flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: 0 }}
                          whileInView={{ height: `${value * 2}px` }}
                          transition={{ duration: 0.8, delay: idx * 0.1 }}
                          className="w-8 rounded-full bg-secondary"
                        />
                        <span className="text-[10px] text-muted">{industry}</span>
                        <span className="text-[10px] text-muted">{value}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/70 p-6">
              <h3 className="text-sm font-semibold text-text">Revenue Forecast</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs text-muted">
                  <thead>
                    <tr>
                      <th className="pb-3">Segment</th>
                      <th className="pb-3">Pipeline Value</th>
                      <th className="pb-3">Conversion %</th>
                      <th className="pb-3">Expected Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {revenueRows.map((row) => (
                      <tr key={row.segment} className={row.segment === "HOT" ? "border-l-4 border-hot" : ""}>
                        <td className="py-2">{row.segment}</td>
                        <td className="py-2">{row.pipeline_value}</td>
                        <td className="py-2">{row.conversion}</td>
                        <td className="py-2">{row.expected}</td>
                      </tr>
                    ))}
                    <tr className="bg-hero text-white">
                      <td className="py-2 font-semibold">Totals</td>
                      <td className="py-2">$7.6M</td>
                      <td className="py-2">33%</td>
                      <td className="py-2">$3.1M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-surface/70 p-6">
              <h3 className="text-sm font-semibold text-text">Top Leads Leaderboard</h3>
              <div className="mt-4 space-y-3">
                {topLeads.map((lead: any, index: number) => (
                  <div key={lead.id} className="flex items-center justify-between rounded-2xl border border-border bg-bg/60 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-border text-xs">
                        {index === 0 ? "🏆" : index + 1}
                      </span>
                      <div>
                        <p className="text-sm text-text">{lead.company}</p>
                        <p className="text-xs text-muted">{lead.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-32 rounded-full bg-border">
                        <div className="h-2 rounded-full bg-secondary" style={{ width: `${lead.score}%` }} />
                      </div>
                      <span className="text-xs text-muted">{lead.deal_value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
