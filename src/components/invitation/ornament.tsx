type OrnamentProps = {
  className?: string;
  delay?: number;
};

/** Small gold line–diamond–line flourish used beneath section headings. */
export function Ornament({ className = "", delay = 120 }: OrnamentProps) {
  return (
    <svg
      className={`km-ornament ${className}`}
      viewBox="0 0 140 14"
      aria-hidden="true"
      data-reveal="draw"
      style={{ ["--d" as string]: `${delay}ms` }}
    >
      <line x1="4" y1="7" x2="54" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      <line x1="86" y1="7" x2="136" y2="7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.75" />
      <circle cx="60" cy="7" r="1.3" fill="currentColor" />
      <circle cx="80" cy="7" r="1.3" fill="currentColor" />
      <path d="M70 1.5 L75.5 7 L70 12.5 L64.5 7 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M70 4.5 L72.5 7 L70 9.5 L67.5 7 Z" fill="currentColor" />
    </svg>
  );
}
