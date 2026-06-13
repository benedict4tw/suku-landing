import { useState } from "react";
import { useTranslation } from "react-i18next";

// To wire up email delivery:
// 1. Go to https://formspree.io and sign in with your Gmail
// 2. Create a new form — Formspree will send you the submissions
// 3. Copy the form ID (e.g. "xkgnjozd") and set VITE_FORMSPREE_ID in Vercel env vars
const ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID ?? ""}`;

export function AccessPage() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, reason }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", top: -200, right: -150, background: "radial-gradient(circle, rgba(0,98,255,0.1) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", bottom: -150, left: -150, background: "radial-gradient(circle, rgba(5,227,194,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      {/* Back */}
      <a
        href="/"
        style={{ position: "absolute", top: 28, left: 28, color: "rgba(255,255,255,0.3)", fontSize: 14, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, transition: "color 0.15s" }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.3)")}
      >
        {t("access.back")}
      </a>

      {status === "success" ? (
        <div style={{ textAlign: "center", maxWidth: 440, position: "relative", zIndex: 1 }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(5,227,194,0.12)", border: "1px solid rgba(5,227,194,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: 28 }}>
            ✓
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", marginBottom: 12, letterSpacing: "-0.02em" }}>
            {t("access.successTitle")}
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 32 }}>
            {t("access.successSub")}
          </p>
          <a
            href="/"
            style={{ display: "inline-block", padding: "12px 28px", borderRadius: 100, background: "#05e3c2", color: "#080808", fontWeight: 700, fontSize: 15, textDecoration: "none" }}
          >
            {t("access.successCta")}
          </a>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px",
                borderRadius: 100, border: "1px solid rgba(5,227,194,0.3)",
                background: "rgba(5,227,194,0.06)", color: "#05e3c2",
                fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#05e3c2", boxShadow: "0 0 6px #05e3c2" }} />
              {t("access.badge")}
            </div>
            <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 12px" }}>
              {t("access.title")}
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.4)", lineHeight: 1.6, margin: 0 }}>
              {t("access.sub")}
            </p>
          </div>

          {/* Card */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#0f0f0f",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Field label={t("access.nameLabel")} required>
              <input
                type="text"
                placeholder={t("access.namePlaceholder")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(5,227,194,0.4)")}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>

            <Field label={t("access.emailLabel")} required>
              <input
                type="email"
                placeholder={t("access.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={inputStyle}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(5,227,194,0.4)")}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>

            <Field label={t("access.reasonLabel")}>
              <textarea
                placeholder={t("access.reasonPlaceholder")}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }}
                onFocus={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(5,227,194,0.4)")}
                onBlur={(e) => ((e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </Field>

            {status === "error" && (
              <p style={{ fontSize: 13, color: "#ff6b6b", margin: 0 }}>
                {t("access.error")}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                padding: "14px 0",
                borderRadius: 100,
                background: "#05e3c2",
                color: "#080808",
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: status === "sending" ? "wait" : "pointer",
                opacity: status === "sending" ? 0.75 : 1,
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
              onMouseEnter={(e) => { if (status !== "sending") (e.currentTarget as HTMLElement).style.background = "#00ccad"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#05e3c2"; }}
            >
              {status === "sending" ? (
                <>
                  <span style={{ width: 14, height: 14, border: "2px solid #080808", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                  {t("access.sending")}
                </>
              ) : (
                t("access.submit")
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 20 }}>
            {t("access.note")}
          </p>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
        {label}{required && <span style={{ color: "#05e3c2", marginLeft: 3 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  fontSize: 14,
  fontFamily: "Inter, sans-serif",
  outline: "none",
  transition: "border-color 0.15s",
  boxSizing: "border-box",
};
