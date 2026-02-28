"use client";

import { motion } from "framer-motion";

const colors = ["#7C3AED", "#06B6D4"];

export default function FloatingOrbs() {
  const orbs = Array.from({ length: 68 }, (_, i) => i);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb) => {
        const size = 140 + (orb % 6) * 30;
        const x = (orb * 13) % 100;
        const y = (orb * 19) % 100;
        const color = colors[orb % colors.length];
        return (
          <motion.span
            key={orb}
            className="absolute rounded-full opacity-20 blur-[80px]"
            style={{
              width: size,
              height: size,
              left: `${x}%`,
              top: `${y}%`,
              background: color,
            }}
            animate={{ x: [0, orb % 2 === 0 ? 40 : -40, 0], y: [0, orb % 3 === 0 ? -30 : 30, 0] }}
            transition={{
              duration: 14 + (orb % 10),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
