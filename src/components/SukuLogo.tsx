export function SukuLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer diamond */}
      <path
        d="M20 2L38 14V26L20 38L2 26V14L20 2Z"
        fill="rgba(5,227,194,0.1)"
        stroke="#05e3c2"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner diamond */}
      <path
        d="M20 10L30 17V23L20 30L10 23V17L20 10Z"
        fill="rgba(5,227,194,0.2)"
        stroke="#05e3c2"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Center gem facet */}
      <path
        d="M20 16L25 20L20 24L15 20L20 16Z"
        fill="#05e3c2"
      />
      {/* Shine */}
      <path
        d="M20 16L23 19L20 20L17 19L20 16Z"
        fill="rgba(255,255,255,0.45)"
      />
    </svg>
  );
}
