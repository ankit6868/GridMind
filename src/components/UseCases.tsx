"use client";

import { Sun, Car, Building2, Factory, Network } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const useCases = [
  {
    icon: Sun,
    title: "Residential Solar",
    description:
      "Optimize when to use, store, or sell your solar energy for maximum savings and minimal grid dependency.",
    stat: "Up to 40% savings",
  },
  {
    icon: Car,
    title: "EV Charging",
    description:
      "Smart charging that automatically schedules EV charging during off-peak hours or when solar generation peaks.",
    stat: "30% cheaper charging",
  },
  {
    icon: Building2,
    title: "Smart Cities",
    description:
      "City-wide energy management coordinating streetlights, public buildings, and municipal EV fleets intelligently.",
    stat: "25% grid efficiency",
  },
  {
    icon: Factory,
    title: "Commercial Energy",
    description:
      "Enterprise-grade optimization for office buildings, data centers, and industrial facilities to reduce energy costs.",
    stat: "$500K+ annual savings",
  },
  {
    icon: Network,
    title: "Microgrid Coordination",
    description:
      "Coordinate independent microgrids to share resources, balance loads, and maintain resilience during outages.",
    stat: "99.9% resilience",
  },
];

export default function UseCases() {
  return (
    <section className="relative py-24 px-6">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <SectionHeading
        label="Applications"
        title="Use Cases"
        description="GridMind adapts to multiple energy scenarios, delivering intelligent optimization at every scale."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((uc, i) => (
          <TiltCard key={uc.title} delay={i * 0.08}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-4 animate-pulse-glow">
              <uc.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{uc.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {uc.description}
            </p>
            <span className="inline-block px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-400/5 border border-cyan-400/15 rounded-full">
              {uc.stat}
            </span>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
