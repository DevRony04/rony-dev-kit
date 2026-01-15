export function JWTIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="jwtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      
      {/* Shield shape - adjusted to be more compact */}
      <path
        d="M12 3L5 6.5V11C5 15.5 8 19.5 12 21C16 19.5 19 15.5 19 11V6.5L12 3Z"
        fill="url(#jwtGradient)"
      />
      
      {/* Lock body */}
      <rect x="9" y="11" width="6" height="5" rx="1" fill="white" />
      
      {/* Lock shackle */}
      <path
        d="M10 11V9C10 7.9 10.9 7 12 7C13.1 7 14 7.9 14 9V11"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Keyhole */}
      <circle cx="12" cy="13.5" r="1" fill="url(#jwtGradient)" />
    </svg>
  );
}
