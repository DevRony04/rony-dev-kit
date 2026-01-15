export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="url(#logoGradient)" />
      
      {/* Letter W stylized as tools */}
      <path
        d="M16 20L22 44L32 28L42 44L48 20"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Dot accents */}
      <circle cx="32" cy="48" r="3" fill="white" />
    </svg>
  );
}
