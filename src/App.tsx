import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { FeaturesBentoGrid } from "./components/FeaturesBentoGrid";
import { TaglinesSection } from "./components/TaglinesSection";
import { HowItWorks } from "./components/HowItWorks";
import { DemoSection } from "./components/DemoSection";
import { BuiltBySection } from "./components/BuiltBySection";
import { FinalCTASection } from "./components/FinalCTASection";
import { Footer } from "./components/Footer";
import { DemoPage } from "./pages/DemoPage";

function LandingPage() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh" }}>
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<DemoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
