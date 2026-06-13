import { useState } from "react";
import { supabase } from "../lib/supabase";

const DEMO_EMAIL = "kevin@trysuku.live";
const DEMO_PASSWORD = "SukuDemo2026!";
const MAIN_APP_URL = "https://suku-teal.vercel.app";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  onMouseEnter?: React.MouseEventHandler;
  onMouseLeave?: React.MouseEventHandler;
}

export function DemoLoginButton({
  className,
  style,
  label = "Try Demo →",
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error: authErr } = await supabase.auth.signInWithPassword({
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
      });

      if (authErr || !data.session) {
        setError("Demo unavailable. Try again.");
        setLoading(false);
        return;
      }

      const { access_token, refresh_token, expires_in } = data.session;
      const hash = `access_token=${access_token}&refresh_token=${refresh_token}&expires_in=${expires_in}&token_type=bearer`;
      window.location.href = `${MAIN_APP_URL}/#${hash}`;
    } catch {
      setError("Demo unavailable. Try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <button
        onClick={handleClick}
        disabled={loading}
        className={className}
        style={{
          ...style,
          cursor: loading ? "wait" : "pointer",
          opacity: loading ? 0.8 : 1,
          transition: "all 0.2s",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 14, height: 14, border: "2px solid currentColor",
                borderTopColor: "transparent", borderRadius: "50%",
                display: "inline-block", animation: "spin 0.7s linear infinite",
              }}
            />
            Signing in…
          </span>
        ) : (
          label
        )}
      </button>
      {error && (
        <span style={{ fontSize: 12, color: "#ff6b6b" }}>{error}</span>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
