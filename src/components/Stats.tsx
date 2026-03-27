"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./ui/AnimatedCounter";

export default function Stats() {
  return (
    <section className="relative py-24 px-6">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto glass-card py-14 px-8 relative overflow-hidden"
      >
        {/* Subtle background shimmer */}
        <div className="absolute inset-0 shimmer pointer-events-none" />
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <AnimatedCounter target={50000} suffix="+" label="Devices Connected" />
          <AnimatedCounter target={12} suffix=" GWh" label="Energy Optimized" />
          <AnimatedCounter target={150} suffix="+" label="Network Nodes" />
          <AnimatedCounter target={2100000} prefix="$" label="Saved for Users" />
        </div>
      </motion.div>

      {/* Partners */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-5xl mx-auto mt-16 text-center"
      >
        <p className="text-xs tracking-widest uppercase text-gray-600 mb-8">
          Trusted by leading energy companies
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {["SolarEdge", "ChargePoint", "Siemens", "Tesla Energy", "Enel X"].map(
            (name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.3 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ opacity: 0.7 }}
                className="text-lg font-semibold text-gray-400 cursor-default transition-opacity"
              >
                {name}
              </motion.span>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
