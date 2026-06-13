export function Footer() {
  return (
    <footer
      className="px-6 py-8"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/SUKU-Logov1.png" style={{ width: 22, height: 22, objectFit: "contain" }} alt="Suku" />
          <span className="font-bold text-white text-base">Suku</span>
        </div>

        {/* Center */}
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          Built by{" "}
          <span style={{ color: "#05e3c2" }}>Benedict Donkor</span>
        </p>

        {/* Year */}
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
          2026
        </p>
      </div>
    </footer>
  );
}
