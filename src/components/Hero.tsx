"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import GradientButton from "./ui/GradientButton";

const EnergyOrb = dynamic(() => import("./three/EnergyOrb"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg">
      {/* Radial glows */}
      <div className="radial-glow top-[-200px] left-[-200px]" />
      <div className="radial-glow bottom-[-200px] right-[-100px]" />

      {/* 3D Orb as full background behind text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-full h-full max-w-[950px] max-h-[950px] pointer-events-auto">
          <Suspense fallback={null}>
            <EnergyOrb />
          </Suspense>
        </div>
      </motion.div>

      {/* Floating color orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[15%] w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-600/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-600/10 blur-3xl"
      />

      {/* Text content centered on top of the orb */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-cyan-400 border border-cyan-400/20 rounded-full bg-cyan-400/5 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Powered by AI & Blockchain
          </span>
        </motion.div>

        {/* Headline - clean, no drop-shadow on gradient text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] mb-8 tracking-tight"
        >
          <span className="text-white block">Decentralized</span>
          <span className="gradient-text block">AI-Powered Energy</span>
          <span className="text-white block">Intelligence Network</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-10 leading-relaxed"
        >
          Optimize how electricity is produced, stored, and consumed across
          distributed energy systems. Transform passive consumers into active
          participants in the decentralized energy economy.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <GradientButton href="#cta">
            Get Started <ArrowRight className="w-4 h-4" />
          </GradientButton>
          <GradientButton variant="outline" href="#features">
            <FileText className="w-4 h-4" /> Read Whitepaper
          </GradientButton>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="glass-card grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 px-6 sm:px-10 py-6 backdrop-blur-xl w-full max-w-3xl mx-auto"
        >
          {[
            { value: "50K+", label: "Devices Connected" },
            { value: "12 GWh", label: "Energy Optimized" },
            { value: "98.7%", label: "Uptime" },
            { value: "$2.1M", label: "Saved for Users" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent" />
    </section>
  );
}
