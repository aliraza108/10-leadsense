"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const cards = [
  {
    title: "Email",
    badge: "🔥 HOT Lead · Email",
    subject: "Subject: Personalized growth insights for your SDR team",
    preview: "Hi Alex, noticed your team is scaling fast. LeadSense can surface the hottest accounts in under 30 seconds...",
    score: "94/100",
  },
  {
    title: "LinkedIn",
    badge: "🟠 WARM Lead · LinkedIn",
    subject: "",
    preview: "Hey Priya, loved your recent post on pipeline hygiene. We built AI scoring that plugs straight into HubSpot...",
    score: "88/100",
  },
  {
    title: "Call Script",
    badge: "🔥 HOT Lead · Call Script",
    subject: "Opening",
    preview: "Thanks for taking the call. I saw your team hiring SDRs and wanted to share how LeadSense cuts research time by 80%...",
    score: "91/100",
  },
];

export default function OutreachGallery() {
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
          AI-Crafted Messages That <span className="gradient-text">Actually Convert</span>
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, rotateY: 15 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="rounded-3xl border border-border bg-surface/70 p-5 shadow-xl"
            >
              <div className="flex items-center justify-between text-xs text-muted">
                <span className="rounded-full border border-border px-3 py-1">{card.badge}</span>
                <span className="rounded-full bg-secondary/20 px-3 py-1 text-secondary">{card.score}</span>
              </div>
              {card.subject && <p className="mt-4 text-xs text-muted">{card.subject}</p>}
              <p className="mt-3 text-sm text-text">
                {card.preview}
                <span className="text-muted">...</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
