import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import Solution from "@/components/landing/Solution";
import Credibility from "@/components/landing/Credibility";
import ScoreBreakdown from "@/components/landing/ScoreBreakdown";
import FAQ from "@/components/landing/FAQ";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Credibility />
        <ScoreBreakdown />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
