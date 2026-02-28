"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const steps = [
  {
    icon: "🧠",
    title: "Deep Lead Enrichment",
    body: "AI profiles every lead — company stage, decision-maker level, buying signals, and urgency score.",
  },
  {
    icon: "🎯",
    title: "Predictive Scoring",
    body: "Our model scores intent, budget fit, and behavior to give each lead a 0–100 conversion score.",
  },
  {
    icon: "🚀",
    title: "Instant Outreach",
    body: "Personalized emails, LinkedIn messages, and call scripts generated automatically for every HOT lead.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        <h2 className="text-3xl font-heading font-black text-text">
          From Lead to Deal in <span className="gradient-text">3 AI Steps</span>
        </h2>
        <motion.div variants={stagger} className="relative mt-10 grid gap-6 md:grid-cols-3">
          <svg className="absolute left-0 right-0 top-10 hidden h-24 w-full md:block">
            <motion.line
              x1="6%"
              y1="50%"
              x2="94%"
              y2="50%"
              stroke="#1E1E2E"
              strokeDasharray="6 8"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
          </svg>
          {steps.map((step) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              className="group relative rounded-2xl border border-border bg-surface/70 p-6 transition hover:border-secondary"
            >
              <span className="shimmer-border pointer-events-none group-hover:opacity-100" />
              <motion.div whileHover={{ scale: 1.2 }} className="text-4xl">
                {step.icon}
              </motion.div>
              <h3 className="mt-4 text-xl font-heading font-extrabold text-text">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent group-hover:border-secondary/60 group-hover:shadow-glow" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
