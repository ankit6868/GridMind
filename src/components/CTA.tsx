"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GradientButton from "./ui/GradientButton";

const ParticleField = dynamic(() => import("./three/ParticleField"), { ssr: false });

export default function CTA() {
  return (
    <section id="cta" className="relative py-32 px-6 overflow-hidden">
      {/* 3D Particle Network Background */}
      <Suspense fallback={null}>
        <ParticleField />
      </Suspense>

      {/* Gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-cyan-500/5 via-blue-600/5 to-purple-600/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          <span className="text-white">Join the Energy</span>
          <br />
          <span className="gradient-text">Revolution</span>
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
          Be part of the movement to create a smarter, more sustainable, and
          decentralized energy future. Connect your devices and start earning today.
        </p>

        {/* Email signup */}
        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto mb-6">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 text-sm"
          />
          <GradientButton href="#">
            Join <ArrowRight className="w-4 h-4" />
          </GradientButton>
        </div>

        <p className="text-xs text-gray-500">
          Join 5,000+ early adopters. No spam, unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
}
