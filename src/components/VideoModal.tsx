import { useEffect } from "react";

interface Props {
  onClose: () => void;
}

export function VideoModal({ onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(5,227,194,0.25)", boxShadow: "0 0 80px rgba(5,227,194,0.15)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
        >
          ✕
        </button>

        {/* 16:9 video area */}
        <div
          className="relative w-full flex items-center justify-center"
          style={{ paddingTop: "56.25%", background: "#020218" }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Play button */}
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(5,227,194,0.15)",
                border: "2px solid rgba(5,227,194,0.5)",
                boxShadow: "0 0 40px rgba(5,227,194,0.25)",
              }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M8 5L23 14L8 23V5Z" fill="#05e3c2" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              Demo video coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
