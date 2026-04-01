interface GradientButtonProps {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  className?: string;
  href?: string;
  target?: string;
}

export default function GradientButton({
  children,
  variant = "filled",
  className = "",
  href = "#",
  target,
}: GradientButtonProps) {
  const externalProps = target === "_blank" ? { target, rel: "noopener noreferrer" } : {};

  if (variant === "outline") {
    return (
      <a
        href={href}
        {...externalProps}
        className={`gradient-border inline-flex items-center gap-2 px-7 py-3 text-sm font-medium text-white hover:text-cyan-300 transition-colors ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      {...externalProps}
      className={`gradient-fill inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white ${className}`}
    >
      {children}
    </a>
  );
}
