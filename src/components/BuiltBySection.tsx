import { useReveal } from "../hooks/useReveal";

export function BuiltBySection() {
  const ref = useReveal(0.2) as React.RefObject<HTMLDivElement>;

  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <div ref={ref} className="reveal text-center">
        <p className="text-base" style={{ color: "rgba(255,255,255,0.3)" }}>
          A project by{" "}
          <span className="font-semibold" style={{ color: "#05e3c2" }}>Benedict Donkor</span>
        </p>
      </div>
    </section>
  );
}
