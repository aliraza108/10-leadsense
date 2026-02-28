"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const stats = [
  { label: "Leads Qualified", value: 12847, suffix: "+" },
  { label: "Avg Score Accuracy", value: 94, suffix: "%" },
  { label: "Time Saved Per SDR", value: 8, suffix: " hrs/week" },
  { label: "Revenue Influenced", value: 4.2, suffix: " M+" },
];

export default function StatsBar() {
  return (
    <section className="section bg-surface">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        <motion.div variants={stagger} className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-bg/70 p-6"
            >
              <div className="mb-4 h-1 w-full rounded-full bg-hero" />
              <p className="text-3xl font-heading font-extrabold text-text tabular-nums">
                <CountUp end={stat.value} suffix={stat.suffix} enableScrollSpy />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
