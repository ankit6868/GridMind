import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import HowItWorks from "@/components/HowItWorks";
import TechStack from "@/components/TechStack";
import TokenUtility from "@/components/TokenUtility";
import UseCases from "@/components/UseCases";
import Roadmap from "@/components/Roadmap";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <HowItWorks />
        <TechStack />
        <TokenUtility />
        <UseCases />
        <Roadmap />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
