"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Brain, Link2, Cpu, Database } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const FloatingGrid = dynamic(() => import("./three/FloatingGrid"), { ssr: false });

const techPillars = [
  {
    icon: Brain,
    title: "AI Layer",
    description:
      "Predictive analytics and optimization models that forecast energy demand, optimize distribution, and learn from patterns in real-time.",
    features: ["Demand Forecasting", "Load Balancing", "Pattern Recognition"],
  },
  {
    icon: Link2,
    title: "Blockchain Layer",
    description:
      "Multichain settlement across Ethereum L2 and Solana for transparent, verifiable energy contribution records and instant payments.",
    features: ["Smart Contracts", "Multichain", "Instant Settlement"],
  },
  {
    icon: Cpu,
    title: "IoT Integration",
    description:
      "Seamless connectivity with smart devices, energy meters, solar inverters, EV chargers, and battery management systems.",
    features: ["Device SDK", "Real-time Telemetry", "Edge Computing"],
  },
  {
    icon: Database,
    title: "Data Layer",
    description:
      "Hybrid architecture combining off-chain processing for speed with on-chain verification for trust and transparency.",
    features: ["Off-chain Processing", "On-chain Verification", "Data Analytics"],
  },
];

export default function TechStack() {
  return (
    <section id="technology" className="relative py-24 px-6 overflow-hidden">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      {/* 3D Floating Grid Background */}
      <div className="hidden md:block">
        <Suspense fallback={null}>
          <FloatingGrid />
        </Suspense>
      </div>

      <div className="relative z-10">
        <SectionHeading
          label="Architecture"
          title="Technology Stack"
          description="Built on a robust, multi-layered architecture designed for scalability, security, and real-time performance."
        />

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {techPillars.map((pillar, i) => (
            <TiltCard key={pillar.title} delay={i * 0.1} className="flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 flex items-center justify-center animate-pulse-glow">
                  <pillar.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {pillar.features.map((feat) => (
                  <span
                    key={feat}
                    className="px-3 py-1 text-xs text-cyan-300 bg-cyan-400/5 border border-cyan-400/15 rounded-full"
                  >
                    {feat}
                  </span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
