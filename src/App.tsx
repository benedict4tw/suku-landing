import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ParticleCanvas } from "./components/ParticleCanvas";
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
import { AccessPage } from "./pages/AccessPage";

/* Global background — fixed so it spans every section as one canvas */
function GlobalBackground() {
  return (
    <>
      {/* Particle canvas — fixed, behind everything */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <ParticleCanvas />
      </div>

      {/* Fixed gradient orbs */}
      <div
        style={{
          position: "fixed", zIndex: 0, pointerEvents: "none",
          width: 800, height: 800, borderRadius: "50%",
          bottom: -300, left: -250,
          background: "radial-gradient(circle, rgba(5,227,194,0.1) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "fixed", zIndex: 0, pointerEvents: "none",
          width: 700, height: 700, borderRadius: "50%",
          top: -200, right: -200,
          background: "radial-gradient(circle, rgba(0,98,255,0.12) 0%, transparent 65%)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "fixed", zIndex: 0, pointerEvents: "none",
          width: 500, height: 500, borderRadius: "50%",
          top: "50%", left: "40%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(5,227,194,0.04) 0%, transparent 65%)",
          filter: "blur(100px)",
        }}
      />
    </>
  );
}

function LandingPage() {
  return (
    <div style={{ background: "#080808", minHeight: "100vh", position: "relative" }}>
      <GlobalBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <FeaturesBentoGrid />
        <DemoSection />
        <TaglinesSection />
        <HowItWorks />
        <FinalCTASection />
        <BuiltBySection />
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/access" element={<AccessPage />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </>
  );
}
