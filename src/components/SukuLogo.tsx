export function SukuLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="rgba(5,227,194,0.12)" stroke="#05e3c2" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="16,8 24,13 24,19 16,24 8,19 8,13" fill="rgba(5,227,194,0.25)" stroke="#05e3c2" strokeWidth="1" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3.5" fill="#05e3c2" />
    </svg>
  );
}
