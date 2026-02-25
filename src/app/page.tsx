import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureRecovery from "@/components/FeatureRecovery";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureRecovery />
      <Testimonials />
    </main>
  );
}
