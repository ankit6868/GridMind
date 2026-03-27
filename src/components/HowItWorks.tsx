"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Plug, Brain, TrendingUp, Coins } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const steps = [
  {
    icon: Plug,
    number: "01",
    title: "Connect Devices",
    description:
      "Solar panels, EV chargers, batteries, and smart meters connect to the GridMind network through IoT integration.",
  },
  {
    icon: Brain,
    number: "02",
    title: "AI Analyzes Data",
    description:
      "Our AI engine processes real-time and historical energy data to understand consumption patterns and predict demand.",
  },
  {
    icon: TrendingUp,
    number: "03",
    title: "Optimize Energy",
    description:
      "The system automatically determines when to store, consume, or sell energy for maximum efficiency and savings.",
  },
  {
    icon: Coins,
    number: "04",
    title: "Earn Rewards",
    description:
      "Blockchain records contributions and handles settlements. Participants earn tokens for their energy contributions.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={sectionRef} className="relative py-24 px-6">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <SectionHeading
        label="Process"
        title="How GridMind Works"
        description="A four-step intelligent process that transforms passive energy consumption into active participation."
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Animated connection line (desktop) */}
        <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
          <motion.div
            style={{ width: lineWidth }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {/* Step number + icon with pulse glow */}
              <div className="relative inline-flex flex-col items-center mb-6">
                <motion.div
                  whileInView={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.4)", "0 0 8px rgba(6,182,212,0.2)"] }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.2 }}
                  className="relative w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 flex items-center justify-center"
                >
                  <step.icon className="w-8 h-8 text-cyan-400" />
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.3 + i * 0.15, stiffness: 300 }}
                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-white flex items-center justify-center"
                  >
                    {step.number}
                  </motion.span>
                </motion.div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
