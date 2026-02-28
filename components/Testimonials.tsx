"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "LeadSense cut our lead research time by 80%. Our SDRs now only call people ready to buy.",
    name: "Marcus T.",
    role: "VP Sales",
    company: "TechFlow",
  },
  {
    quote: "The outreach messages are scary good. Prospects reply thinking we spent hours researching them.",
    name: "Priya S.",
    role: "Founder",
    company: "GrowthOS",
  },
  {
    quote: "We went from 12% to 34% lead-to-meeting conversion in 6 weeks.",
    name: "James K.",
    role: "Head of Revenue",
    company: "Nexus AI",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
  return (
    <section className="section overflow-hidden">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-6xl px-6"
      >
        <h2 className="text-3xl font-heading font-black text-text">
          Sales Teams <span className="gradient-text">Love</span> LeadSense
        </h2>
        <div className="mt-8 overflow-hidden">
          <div className="flex gap-6 animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]">
            {testimonials.concat(testimonials).map((item, idx) => (
              <div key={`${item.name}-${idx}`} className="min-w-[320px] rounded-3xl border border-border bg-surface/70 p-5">
                <div className="text-3xl text-white/10">“</div>
                <p className="text-sm text-text">{item.quote}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-border" />
                  <div>
                    <p className="text-xs font-semibold text-text">{item.name}</p>
                    <p className="text-xs text-muted">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
