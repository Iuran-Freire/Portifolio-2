import type { ReactNode } from "react";

type AnimatedLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function AnimatedLink({
  children,
  href,
  className = "",
}: AnimatedLinkProps) {
  return (
    <a
      href={href}
      className={`animated-link ${className}`}
    >
      {children}
    </a>
  );
}

