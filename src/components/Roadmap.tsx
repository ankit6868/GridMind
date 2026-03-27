"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const phases = [
  {
    phase: "Phase 1",
    title: "Foundation",
    period: "Q1 - Q2 2026",
    items: [
      "MVP development with core AI engine",
      "Basic device integration SDK",
      "Smart contract deployment on testnet",
      "Private beta with select partners",
    ],
    status: "active",
  },
  {
    phase: "Phase 2",
    title: "Pilot Launch",
    period: "Q3 - Q4 2026",
    items: [
      "Pilot program with EV charging networks",
      "Mainnet smart contract deployment",
      "Token generation event",
      "First energy settlement transactions",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 3",
    title: "Expansion",
    period: "Q1 - Q2 2027",
    items: [
      "Residential solar user onboarding",
      "Advanced AI optimization features",
      "Governance framework launch",
      "Regional utility partnerships",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 4",
    title: "Multichain",
    period: "Q3 - Q4 2027",
    items: [
      "Full multichain deployment",
      "Cross-chain energy trading",
      "Enterprise API launch",
      "Global compliance framework",
    ],
    status: "upcoming",
  },
  {
    phase: "Phase 5",
    title: "Global Scale",
    period: "2028+",
    items: [
      "Global scaling with 1M+ devices",
      "Government & utility integrations",
      "AI-driven autonomous grid management",
      "Decentralized energy marketplace",
    ],
    status: "upcoming",
  },
];

export default function Roadmap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);

  return (
    <section id="roadmap" ref={sectionRef} className="relative py-24 px-6">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <SectionHeading
        label="Timeline"
        title="Roadmap"
        description="Our phased approach to building the future of decentralized energy intelligence."
      />

      <div className="max-w-3xl mx-auto relative">
        {/* Background timeline line */}
        <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 transform lg:-translate-x-[1px]" />
        {/* Animated growing timeline line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-6 lg:left-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 transform lg:-translate-x-[1px] shadow-[0_0_8px_rgba(6,182,212,0.4)]"
        />

        {phases.map((phase, i) => (
          <motion.div
            key={phase.phase}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex items-start gap-6 mb-12 ${
              i % 2 === 0
                ? "lg:flex-row lg:text-right"
                : "lg:flex-row-reverse lg:text-left"
            }`}
          >
            {/* Timeline dot with spring animation */}
            <div className="absolute left-6 lg:left-1/2 transform -translate-x-1/2 z-10">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, delay: i * 0.12 }}
                className={`relative w-4 h-4 rounded-full ${
                  phase.status === "active"
                    ? "bg-cyan-400 pulse-ring"
                    : "bg-gray-600 border-2 border-gray-500"
                }`}
              />
            </div>

            {/* Content card */}
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className={`ml-14 lg:ml-0 lg:w-[calc(50%-2rem)] glass-card p-6 ${
                i % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
              }`}
            >
              <div className="flex items-center gap-3 mb-3 justify-start">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  {phase.phase}
                </span>
                <span className="text-xs text-gray-500">{phase.period}</span>
                {phase.status === "active" && (
                  <span className="px-2 py-0.5 text-[10px] font-semibold text-cyan-900 bg-cyan-400 rounded-full">
                    ACTIVE
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-white mb-3 text-left">
                {phase.title}
              </h3>
              <ul className="space-y-2 text-left">
                {phase.items.map((item, j) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                    className="flex items-start gap-2 text-sm text-gray-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
