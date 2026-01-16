export function SchemaIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ aspectRatio: "1/1" }}
    >
      <defs>
        <linearGradient id="schemaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <circle cx="12" cy="12" r="10" fill="url(#schemaGradient)" />

      <circle cx="7.5" cy="8" r="2" fill="white" />
      <circle cx="16.5" cy="8" r="2" fill="white" />
      <circle cx="12" cy="16" r="2" fill="white" />

      <path
        d="M9.2 9.2L10.8 10.8M14.8 9.2L13.2 10.8M11.2 14.8L9.6 13.2M12.8 14.8L14.4 13.2"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
