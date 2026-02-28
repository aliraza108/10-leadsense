"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import LeadCard from "./LeadCard";
import LeadDetailPanel from "./LeadDetailPanel";
import { filters, statusColors } from "../../lib/constants";
import type { Lead } from "../../hooks/useLeads";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const sorters = ["Score", "Date Added", "Company Size"];

export default function LeadPipeline({
  leads,
  loading,
  error,
  onRetry,
  highlightId,
  onAddLead,
  onGenerateOutreach,
  onRequalify,
}: {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  highlightId?: string | null;
  onAddLead: () => void;
  onGenerateOutreach: (id: string, type: string, tone: string) => Promise<string>;
  onRequalify: (id: string) => Promise<void>;
}) {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(sorters[0]);
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    const base = leads.filter((lead) => {
      const matchesFilter = filter === "ALL" || lead.status?.toUpperCase() === filter;
      const matchesTerm =
        lead.company?.toLowerCase().includes(term) ||
        lead.company_name?.toLowerCase().includes(term) ||
        lead.industry?.toLowerCase().includes(term) ||
        lead.full_name?.toLowerCase().includes(term) ||
        lead.name?.toLowerCase().includes(term);
      return matchesFilter && (term ? matchesTerm : true);
    });

    if (sort === "Score") return [...base].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    if (sort === "Date Added") return [...base].sort((a, b) => (b.added_at || "").localeCompare(a.added_at || ""));
    if (sort === "Company Size") return [...base].sort((a, b) => Number(b.team_size ?? 0) - Number(a.team_size ?? 0));
    return base;
  }, [leads, filter, search, sort]);

  return (
    <section className="section" id="pipeline">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-3xl font-heading font-black">
            Your <span className="gradient-text">Live Pipeline</span>
          </h2>
          <div className="flex gap-3">
            <button className="rounded-full border border-border px-4 py-2 text-xs text-muted">Import Leads</button>
            <button onClick={onAddLead} className="rounded-full bg-hero px-4 py-2 text-xs font-semibold text-white">
              Add Lead
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search leads by name, company, or industry..."
            className="w-full rounded-full border border-border bg-surface/70 px-4 py-2 text-xs text-text placeholder:text-muted md:w-[320px]"
          />
          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item.key}
                onClick={() => setFilter(item.key)}
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs",
                  filter === item.key ? "border-secondary text-text" : "border-border text-muted"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-full border border-border bg-surface/70 px-3 py-2 text-xs text-text"
          >
            {sorters.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          {loading && (
            <div className="grid gap-6 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="skeleton h-64 rounded-3xl" />
              ))}
            </div>
          )}
          {error && (
            <div className="rounded-2xl border border-border bg-surface/70 p-6 text-sm text-muted">
              {error}
              <button onClick={onRetry} className="ml-4 rounded-full border border-border px-3 py-1 text-xs text-text">
                Retry
              </button>
            </div>
          )}
          {!loading && !error && (
            <motion.div variants={stagger} initial="hidden" animate="visible" className="grid gap-6 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {filtered.length === 0 ? (
                  <div className="rounded-2xl border border-border bg-surface/70 p-6 text-sm text-muted">
                    No leads match this filter yet.
                  </div>
                ) : (
                  filtered.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onSelect={setSelected}
                      highlight={highlightId === lead.id}
                    />
                  ))
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </motion.div>

      <LeadDetailPanel
        lead={selected}
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
        onGenerateOutreach={onGenerateOutreach}
        onRequalify={onRequalify}
      />
    </section>
  );
}
