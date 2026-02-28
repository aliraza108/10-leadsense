"use client";

import { motion } from "framer-motion";
import FloatingOrbs from "./FloatingOrbs";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

const word = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function HeroSection() {
  const titleWords = ["Turn", "Cold", "Leads", "Into", "Closed", "Deals"];

  return (
    <section className="relative min-h-screen overflow-hidden pt-28">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.4),_transparent_55%)] animate-[float_8s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 dots-grid opacity-5" />
      <FloatingOrbs />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-xs uppercase text-secondary"
          >
            🤖 AI-Powered Sales Intelligence
          </motion.div>
          <motion.h1 variants={stagger} className="text-4xl font-heading font-black leading-tight text-text md:text-6xl">
            {titleWords.map((item) => (
              <motion.span
                key={item}
                variants={word}
                className={item === "Closed" || item === "Deals" ? "gradient-text" : ""}
              >
                {item}{" "}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p variants={stagger} className="text-lg text-muted">
            LeadSense automatically scores, segments, and crafts personalized outreach so your team only talks to buyers
            ready to buy.
          </motion.p>
          <motion.div variants={stagger} className="flex flex-wrap gap-4">
            <button className="rounded-full bg-hero px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]">
              Start Qualifying Leads
            </button>
            <button className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-text transition hover:border-secondary">
              View Live Demo
            </button>
          </motion.div>
          <motion.div variants={stagger} className="flex flex-wrap gap-6 text-xs text-muted">
            <span>Trusted by 500+ sales teams</span>
            <span>94% accuracy</span>
            <span>10x faster qualification</span>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative flex justify-center"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-sm rounded-3xl border border-border bg-surface/80 p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted">Lead Score</p>
                <p className="text-4xl font-heading font-extrabold text-text">92/100</p>
              </div>
              <span className="rounded-full bg-hot/20 px-3 py-1 text-xs font-semibold text-hot">🔥 HOT</span>
            </div>
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-border bg-black/30 p-4">
                <p className="text-xs text-muted">Recommended Action</p>
                <p className="text-lg font-semibold text-secondary">CALL NOW</p>
              </div>
              <div className="rounded-2xl border border-border bg-black/30 p-4">
                <p className="text-xs text-muted">AI Insight</p>
                <p className="text-sm text-text">High intent from recent pricing page visits.</p>
              </div>
            </div>
          </motion.div>
          <div className="absolute -right-8 top-12 h-20 w-20 rounded-full bg-primary/40 blur-2xl" />
          <div className="absolute -left-6 bottom-10 h-24 w-24 rounded-full bg-secondary/30 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
