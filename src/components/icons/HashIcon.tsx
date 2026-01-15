export function HashIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="hashGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      
      {/* Hexagon background */}
      <path
        d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
        fill="url(#hashGradient)"
      />
      
      {/* Hash symbol # */}
      <path
        d="M9 7L7 17M17 7L15 17M6 10H18M6 14H18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
