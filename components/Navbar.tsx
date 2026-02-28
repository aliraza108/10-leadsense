"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const navItems = ["Dashboard", "Leads", "Analytics", "Outreach"];

export default function Navbar({ onAddLead }: { onAddLead: () => void }) {
  const [active, setActive] = useState("Dashboard");

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass fixed top-0 left-0 right-0 z-50 border-b border-border"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-heading font-black">
          <span className="text-text">Lead</span>
          <span className="text-primary">Sense</span>
        </div>
        <div className="relative hidden gap-8 text-sm font-medium text-muted md:flex">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={clsx("relative pb-2 transition-colors", active === item ? "text-text" : "text-muted hover:text-text")}
            >
              {item}
              {active === item && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-gradient-to-r from-primary to-secondary"
                />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={onAddLead}
          className="rounded-full bg-hero px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
        >
          Add Lead +
        </button>
      </div>
    </motion.nav>
  );
}
