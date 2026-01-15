export function JSONIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="jsonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
      </defs>
      
      {/* Rounded square background */}
      <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#jsonGradient)" />
      
      {/* Left curly brace { */}
      <path
        d="M9 6C7.5 6 7 7 7 8V10C7 11 6 12 5 12C6 12 7 13 7 14V16C7 17 7.5 18 9 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right curly brace } */}
      <path
        d="M15 6C16.5 6 17 7 17 8V10C17 11 18 12 19 12C18 12 17 13 17 14V16C17 17 16.5 18 15 18"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
