"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-hero opacity-90 animate-[gradient-shift_10s_ease-in-out_infinite]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center"
      >
        <h2 className="text-3xl font-heading font-black text-white md:text-4xl">
          Ready to Let AI <span className="text-black/90">Close More Deals</span>?
        </h2>
        <p className="text-sm text-white/80">
          Add your first lead and get a full AI intelligence report in under 30 seconds.
        </p>
        <motion.button
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="mt-4 rounded-full bg-black/80 px-6 py-3 text-sm font-semibold text-white"
        >
          Qualify Your First Lead — Free
        </motion.button>
        <div className="pointer-events-none absolute -right-6 top-10 hidden w-48 rounded-3xl border border-white/20 bg-white/10 p-4 text-left text-xs text-white/80 blur-sm md:block">
          <p className="text-lg font-heading font-extrabold">Score 93</p>
          <p>Recommended action: Call within 1 hour.</p>
        </div>
      </motion.div>
    </section>
  );
}
