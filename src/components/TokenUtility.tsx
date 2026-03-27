"use client";

import { Landmark, Gift, Vote, Sparkles, Percent } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import TiltCard from "./ui/TiltCard";

const utilities = [
  {
    icon: Landmark,
    title: "Staking",
    description: "Stake tokens to become a network validator and earn yield from energy settlement fees.",
    color: "from-cyan-500/20 to-blue-600/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Gift,
    title: "Rewards",
    description: "Earn tokens for contributing energy to the network through solar generation, storage, or demand response.",
    color: "from-purple-500/20 to-blue-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Vote,
    title: "Governance",
    description: "Participate in protocol governance decisions including fee structures, network upgrades, and partnerships.",
    color: "from-blue-500/20 to-cyan-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Sparkles,
    title: "Premium Access",
    description: "Unlock advanced AI optimization services, detailed analytics dashboards, and priority device integration.",
    color: "from-cyan-500/20 to-purple-600/20",
    iconColor: "text-cyan-400",
  },
  {
    icon: Percent,
    title: "Fee Discounts",
    description: "Hold tokens to receive discounted transaction fees on energy trades within the ecosystem.",
    color: "from-purple-500/20 to-cyan-600/20",
    iconColor: "text-purple-400",
  },
];

export default function TokenUtility() {
  return (
    <section id="tokenomics" className="relative py-24 px-6">
      <div className="section-divider max-w-4xl mx-auto mb-24" />

      <SectionHeading
        label="Tokenomics"
        title="Token Utility"
        description="The GRID token powers the entire ecosystem. Stablecoins are used for actual energy payments."
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilities.map((u, i) => (
          <TiltCard key={u.title} delay={i * 0.08}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${u.color} flex items-center justify-center animate-pulse-glow`}>
                <u.icon className={`w-5 h-5 ${u.iconColor}`} />
              </div>
              <h3 className="text-base font-semibold text-white">{u.title}</h3>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{u.description}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
