import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesBentoGrid } from "./components/FeaturesBentoGrid";
import { TaglinesSection } from "./components/TaglinesSection";
import { HowItWorks } from "./components/HowItWorks";
import { DemoSection } from "./components/DemoSection";
import { BuiltBySection } from "./components/BuiltBySection";
import { FinalCTASection } from "./components/FinalCTASection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div style={{ background: "#04044A", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <FeaturesBentoGrid />
      <TaglinesSection />
      <HowItWorks />
      <DemoSection />
      <BuiltBySection />
      <FinalCTASection />
      <Footer />
    </div>
  );
}
