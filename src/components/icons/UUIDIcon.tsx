export function UUIDIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="uuidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      
      {/* Rounded rectangle background */}
      <rect x="2" y="4" width="20" height="16" rx="3" fill="url(#uuidGradient)" />
      
      {/* ID lines representing UUID segments */}
      <rect x="5" y="8" width="4" height="2" rx="0.5" fill="white" />
      <rect x="10" y="8" width="3" height="2" rx="0.5" fill="white" opacity="0.8" />
      <rect x="14" y="8" width="5" height="2" rx="0.5" fill="white" />
      
      <rect x="5" y="14" width="6" height="2" rx="0.5" fill="white" opacity="0.8" />
      <rect x="12" y="14" width="7" height="2" rx="0.5" fill="white" />
    </svg>
  );
}
