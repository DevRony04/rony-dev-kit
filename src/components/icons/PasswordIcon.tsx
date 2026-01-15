export function PasswordIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="passwordGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      
      {/* Circle background */}
      <circle cx="12" cy="12" r="10" fill="url(#passwordGradient)" />
      
      {/* Key head (circle) */}
      <circle cx="9" cy="10" r="3" stroke="white" strokeWidth="2" fill="none" />
      
      {/* Key shaft */}
      <path
        d="M11.5 12L17 12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Key teeth */}
      <path
        d="M15 12V15M17 12V14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
