"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { statusColors } from "../../lib/constants";
import type { Lead } from "../../hooks/useLeads";
import OutreachGenerator from "./OutreachGenerator";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function LeadDetailPanel({
  lead,
  open,
  onOpenChange,
  onGenerateOutreach,
  onRequalify,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerateOutreach: (id: string, type: string, tone: string) => Promise<string>;
  onRequalify: (id: string) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [requalifyState, setRequalifyState] = useState<"idle" | "running" | "done">("idle");
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    setRequalifyState("idle");
  }, [lead]);

  if (!lead) return null;

  const statusKey = (lead.status?.toUpperCase() || "PENDING") as keyof typeof statusColors;
  const status = statusColors[statusKey] ?? statusColors.PENDING;

  const handleRequalify = async () => {
    setLoading(true);
    setRequalifyState("running");
    try {
      await onRequalify(lead.id);
      setRequalifyState("done");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed right-0 top-0 h-full w-full max-w-[700px] overflow-y-auto bg-bg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <Dialog.Title className="text-2xl font-heading font-extrabold text-text">
                  {lead.company_name || lead.company || "Lead Profile"}
                </Dialog.Title>
                <p className="text-xs text-muted">{lead.full_name || lead.name || "Lead contact"}</p>
              </div>
              <Dialog.Close className="rounded-full border border-border px-3 py-1 text-xs text-muted">Close</Dialog.Close>
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-6 space-y-5">
              <div className="rounded-2xl border border-border bg-surface/70 p-4">
                <h4 className="text-sm font-semibold text-text">Lead Profile</h4>
                <div className="mt-2 grid gap-3 text-xs text-muted md:grid-cols-2">
                  <div>Contact: {lead.full_name || lead.name || "N/A"}</div>
                  <div>Email: {lead.email || "N/A"}</div>
                  <div>Phone: {lead.phone || "N/A"}</div>
                  <div>Company: {lead.company || lead.company_name || "N/A"}</div>
                  <div>Role: {lead.job_title || "N/A"}</div>
                  <div>Industry: {lead.industry || "N/A"}</div>
                  <div>Team Size: {lead.team_size || "N/A"}</div>
                  <div>Location: {lead.location || "N/A"}</div>
                  <div>Website: {lead.website || "N/A"}</div>
                  <div>LinkedIn: {lead.linkedin_url || "N/A"}</div>
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-surface/70 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: `${status.bg}20`, color: status.bg }}>
                    {status.text}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">Score: {lead.score ?? 80}</span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">Intent: {lead.intent_score ?? 74}</span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">Fit: {lead.fit_score ?? 82}</span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">Budget: {lead.budget_score ?? 66}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface/70 p-4">
                <h4 className="text-sm font-semibold text-text">Intelligence Report</h4>
                <p className="mt-2 text-xs text-muted">Company stage: {lead.company_stage || "Series B Growth"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["High web intent", "Pricing page views", "Open roles for SDR", "Recent funding"].map((signal) => (
                    <span key={signal} className="rounded-full border border-border px-2 py-1 text-[11px] text-secondary">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface/70 p-4">
                <h4 className="text-sm font-semibold text-text">Scoring Breakdown</h4>
                {["Intent", "Fit", "Budget", "Timing"].map((label, index) => (
                  <div key={label} className="mt-3">
                    <div className="flex justify-between text-xs text-muted">
                      <span>{label}</span>
                      <span>{70 + index * 6}%</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${70 + index * 6}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-1.5 rounded-full bg-secondary"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-secondary/50 bg-secondary/10 p-4">
                <h4 className="text-sm font-semibold text-text">AI Recommendation</h4>
                <p className="mt-2 text-xs text-muted">Prioritize a discovery call within 24 hours. High urgency signals detected.</p>
              </div>

              <div className="rounded-2xl border border-border bg-surface/70 p-4">
                <h4 className="text-sm font-semibold text-text">Objection Handlers</h4>
                <div className="mt-2 space-y-2 text-xs text-muted">
                  {[
                    {
                      id: "vendor",
                      title: "We are already working with another vendor.",
                      body: "Highlight unique AI automation and faster time-to-value with a 2-week pilot.",
                    },
                    {
                      id: "budget",
                      title: "Budget is tight this quarter.",
                      body: "Offer a usage-based plan and show ROI snapshots tied to pipeline lift.",
                    },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                      className="w-full rounded-xl border border-border bg-bg/50 p-3 text-left"
                    >
                      <div className="flex items-center justify-between text-xs text-text">
                        <span>{item.title}</span>
                        <span>{openAccordion === item.id ? "−" : "+"}</span>
                      </div>
                      {openAccordion === item.id && <p className="mt-2 text-xs text-muted">{item.body}</p>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface/70 p-4">
                <h4 className="text-sm font-semibold text-text">Nurture Timeline</h4>
                <ul className="mt-2 space-y-2 text-xs text-muted">
                  <li>Day 1: Personalized email intro</li>
                  <li>Day 3: LinkedIn connect + value snippet</li>
                  <li>Day 7: Video demo invite</li>
                </ul>
              </div>

              <button
                onClick={handleRequalify}
                disabled={loading}
                className="rounded-full bg-hero px-4 py-2 text-xs font-semibold text-white"
              >
                {requalifyState === "running" ? "Re-Qualifying..." : requalifyState === "done" ? "Qualification Updated" : "Re-Qualify with AI"}
              </button>

              <OutreachGenerator
                onGenerate={async (type, tone) => {
                  const result = await onGenerateOutreach(lead.id, type, tone);
                  return result;
                }}
              />
            </motion.div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
