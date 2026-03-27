"use client";

import { AlertTriangle, CloudOff, Unplug, DollarSign } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const problems = [
  {
    icon: AlertTriangle,
    title: "Centralized & Inefficient",
    description:
      "Traditional energy grids rely on centralized infrastructure that wastes up to 30% of generated electricity through transmission losses.",
  },
  {
    icon: CloudOff,
    title: "Unpredictable Renewables",
    description:
      "Solar and wind energy output fluctuates wildly, making it difficult to balance supply and demand without intelligent coordination.",
  },
  {
    icon: Unplug,
    title: "No Device Coordination",
    description:
      "Millions of distributed devices like batteries, EVs, and solar panels operate in silos with no unified optimization layer.",
  },
  {
    icon: DollarSign,
    title: "High Energy Costs",
    description:
      "Without real-time optimization and incentive mechanisms, consumers pay premium prices during peak demand periods.",
  },
];

export default function Problems() {
  return (
    <section id="features" className="relative py-24 px-6">
      <SectionHeading
        label="The Challenge"
        title="Why Energy Needs Intelligence"
        description="The global energy infrastructure faces critical challenges that demand a decentralized, AI-driven solution."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {problems.map((problem, i) => (
          <TiltCard key={problem.title} delay={i * 0.1}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-5 animate-pulse-glow">
              <problem.icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">{problem.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {problem.description}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
