interface DecorativeCornerProps {
  className?: string;
  flip?: boolean;
}

export function DecorativeCorner({ className = "", flip = false }: DecorativeCornerProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      style={flip ? { transform: "scaleX(-1) scaleY(-1)" } : undefined}
      aria-hidden="true"
    >
      <circle cx="40" cy="40" r="34" fill="#ffd166" opacity="0.9" />
      <circle cx="95" cy="20" r="20" fill="#ff8fab" opacity="0.85" />
      <circle cx="20" cy="105" r="18" fill="#4bc5d3" opacity="0.85" />
      <path
        d="M60 10 C80 0 105 15 100 40 C95 65 65 65 55 45 C48 30 45 20 60 10Z"
        fill="#38ab5c"
        opacity="0.8"
      />
      <path
        d="M10 60 C0 80 15 105 40 100 C65 95 65 65 45 55 C30 48 20 45 10 60Z"
        fill="#7bc47f"
        opacity="0.75"
      />
      <circle cx="130" cy="55" r="10" fill="#f7941d" opacity="0.8" />
    </svg>
  );
}
