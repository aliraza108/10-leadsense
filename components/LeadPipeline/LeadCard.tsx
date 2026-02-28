"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import ScoreRing from "./ScoreRing";
import { actionStyles, statusColors } from "../../lib/constants";
import type { Lead } from "../../hooks/useLeads";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function LeadCard({
  lead,
  onSelect,
  highlight,
}: {
  lead: Lead;
  onSelect: (lead: Lead) => void;
  highlight?: boolean;
}) {
  const statusKey = (lead.status?.toUpperCase() || "PENDING") as keyof typeof statusColors;
  const status = statusColors[statusKey] ?? statusColors.PENDING;
  const actionKey = (lead.recommended_action || "FOLLOW_UP") as keyof typeof actionStyles;
  const action = actionStyles[actionKey] ?? actionStyles.FOLLOW_UP;

  const intent = lead.intent_score ?? 74;
  const fit = lead.fit_score ?? 81;
  const budget = lead.budget_score ?? 68;
  const probability = lead.conversion_probability ?? 62;
  const score = lead.score ?? 80;

  return (
    <motion.button
      variants={fadeUp}
      exit="exit"
      onClick={() => onSelect(lead)}
      className={clsx(
        "group relative flex flex-col rounded-3xl border border-border bg-surface/70 p-5 text-left transition hover:-translate-y-1 hover:border-secondary hover:shadow-glow",
        highlight && "border-secondary/70 shadow-glow animate-pulse"
      )}
    >
      {highlight && <span className="absolute -top-2 right-4 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold text-black">NEW</span>}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-lg font-heading font-extrabold text-text">{lead.company_name || lead.company || "Acme Corp"}</p>
          <span className="mt-1 inline-flex rounded-full border border-border px-2 py-1 text-[11px] text-muted">
            {lead.industry || "SaaS"}
          </span>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold" style={{ color: status.bg }}>
          <span className="h-2 w-2 rounded-full" style={{ background: status.bg }} />
          {status.text}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <ScoreRing score={score} color={status.bg} />
        <div className="space-y-3 text-xs text-muted">
          {[
            { label: "Intent", value: intent },
            { label: "Fit", value: fit },
            { label: "Budget", value: budget },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="mt-1 h-1 w-32 rounded-full bg-border">
                <div className="h-1 rounded-full bg-secondary" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-muted">
          <span>Conversion probability</span>
          <span>{probability}%</span>
        </div>
        <div className="mt-2 h-1.5 rounded-full bg-border">
          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${probability}%` }} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${action.color}20`, color: action.color }}>
          {action.label}
        </span>
        <div className="flex gap-2">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">Generate Outreach</span>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">Full Report</span>
        </div>
      </div>
    </motion.button>
  );
}
