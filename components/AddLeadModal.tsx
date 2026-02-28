"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const initialState = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  job_title: "",
  industry: "",
  team_size: "",
  budget_range: "",
  pain_points: "",
  website: "",
  linkedin_url: "",
  location: "",
  lead_source: "",
  notes: "",
};

const sources = ["CRM", "Form", "Ads", "Email List", "Social", "Manual"];
const budgets = ["Low", "Medium", "High", "Enterprise"];

const inputClass =
  "peer w-full rounded-2xl border border-border bg-surface/70 px-4 py-4 text-sm text-text placeholder-transparent focus:border-secondary focus:outline-none";
const labelClass =
  "absolute left-4 top-3 text-xs text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-muted/70 peer-focus:top-3 peer-focus:text-xs peer-focus:text-secondary";

export default function AddLeadModal({
  open,
  onOpenChange,
  onCreate,
  onQualify,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (payload: Record<string, unknown>) => Promise<any>;
  onQualify: (id: string) => Promise<any>;
}) {
  const [form, setForm] = useState(initialState);
  const [step, setStep] = useState<"idle" | "creating" | "qualifying" | "done">("idle");
  const [createdLead, setCreatedLead] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const confettiPieces = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const updateField = (key: keyof typeof initialState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const reset = () => {
    setForm(initialState);
    setStep("idle");
    setCreatedLead(null);
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      setStep("creating");
      const lead = await onCreate({ ...form });
      setCreatedLead(lead);
      setStep("qualifying");
      await onQualify(lead.id);
      setStep("done");
      setTimeout(() => {
        onOpenChange(false);
        reset();
      }, 1800);
    } catch (err) {
      setError("We could not create this lead. Please try again.");
      setStep("idle");
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur" />
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 overflow-y-auto bg-bg p-8"
          >
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center justify-between">
                <Dialog.Title className="text-2xl font-heading font-extrabold">Add Lead</Dialog.Title>
                <Dialog.Close className="rounded-full border border-border px-4 py-2 text-xs text-muted">Close</Dialog.Close>
              </div>

              {step === "idle" && (
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {[
                    { label: "Full Name", key: "full_name" },
                    { label: "Email", key: "email" },
                    { label: "Phone", key: "phone" },
                    { label: "Company", key: "company" },
                    { label: "Job Title", key: "job_title" },
                    { label: "Industry", key: "industry" },
                    { label: "Team Size", key: "team_size" },
                    { label: "Website", key: "website" },
                    { label: "LinkedIn URL", key: "linkedin_url" },
                    { label: "Location", key: "location" },
                  ].map((field) => (
                    <div key={field.key} className="relative">
                      <input
                        value={(form as any)[field.key]}
                        onChange={(event) => updateField(field.key as any, event.target.value)}
                        placeholder=" "
                        className={inputClass}
                      />
                      <span className={labelClass}>{field.label}</span>
                    </div>
                  ))}
                  <label className="text-xs text-muted">
                    Budget Range
                    <select
                      value={form.budget_range}
                      onChange={(event) => updateField("budget_range", event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-border bg-surface/70 px-4 py-3 text-sm text-text"
                    >
                      <option value="">Select</option>
                      {budgets.map((budget) => (
                        <option key={budget}>{budget}</option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-muted">
                    Lead Source
                    <div className="mt-2 flex flex-wrap gap-2">
                      {sources.map((source) => (
                        <button
                          key={source}
                          onClick={() => updateField("lead_source", source)}
                          className={`rounded-full border px-3 py-1 text-xs ${form.lead_source === source ? "border-secondary text-text" : "border-border text-muted"}`}
                        >
                          {source}
                        </button>
                      ))}
                    </div>
                  </label>
                  <div className="relative md:col-span-2">
                    <textarea
                      value={form.pain_points}
                      onChange={(event) => updateField("pain_points", event.target.value)}
                      placeholder=" "
                      className={`${inputClass} min-h-[120px] resize-none`}
                      rows={3}
                    />
                    <span className={labelClass}>Pain Points</span>
                  </div>
                  <div className="relative md:col-span-2">
                    <textarea
                      value={form.notes}
                      onChange={(event) => updateField("notes", event.target.value)}
                      placeholder=" "
                      className={`${inputClass} min-h-[120px] resize-none`}
                      rows={3}
                    />
                    <span className={labelClass}>Notes</span>
                  </div>
                  <div className="md:col-span-2 flex justify-end">
                    <button onClick={handleSubmit} className="rounded-full bg-hero px-6 py-3 text-sm font-semibold text-white">
                      Create Lead
                    </button>
                  </div>
                  {error && (
                    <div className="md:col-span-2 rounded-2xl border border-border bg-surface/70 p-4 text-sm text-muted">
                      {error}
                    </div>
                  )}
                </div>
              )}

              {step === "creating" && (
                <div className="mt-16 text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
                  <p className="mt-4 text-sm text-muted">Creating lead...</p>
                </div>
              )}

              {step === "qualifying" && (
                <div className="mt-16 text-center">
                  <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="mt-4 text-sm text-muted">🤖 AI is analyzing your lead<span className="animate-pulse">...</span></p>
                </div>
              )}

              {step === "done" && (
                <div className="relative mt-16 text-center">
                  <div className="mx-auto max-w-sm rounded-3xl border border-border bg-surface/70 p-6">
                    <p className="text-sm text-muted">Qualification complete</p>
                    <p className="mt-2 text-4xl font-heading font-black">Score {createdLead?.score ?? 86}</p>
                  </div>
                  {confettiPieces.map((piece) => (
                    <span
                      key={piece}
                      className="confetti"
                      style={{
                        left: `${10 + (piece * 3)}%`,
                        top: "-10px",
                        background: piece % 2 === 0 ? "#7C3AED" : "#06B6D4",
                        animationDelay: `${piece * 0.03}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
