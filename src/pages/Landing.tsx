import { useTranslation } from "react-i18next";
import { Hero } from "../components/Hero";
import { ModuleStrip } from "../components/ModuleStrip";
import { AiShowcase } from "../components/AiShowcase";
import { FeatureGroups } from "../components/FeatureGroups";
import { WhySuku } from "../components/WhySuku";
import { Faq } from "../components/Faq";
import { ClosingCta } from "../components/ClosingCta";
import { useReveal } from "../hooks/useReveal";

export function Landing() {
  const { i18n } = useTranslation();
  useReveal(i18n.resolvedLanguage);
  return (
    <>
      <Hero />
      <ModuleStrip />
      <AiShowcase />
      <FeatureGroups />
      <WhySuku />
      <Faq />
      <ClosingCta />
    </>
  );
}
