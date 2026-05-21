import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg" | "full";

const sizeClass: Record<Size, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-none",
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: Size;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}

export function Container({
  children,
  className,
  size = "lg",
  as: As = "div",
}: ContainerProps) {
  return (
    <As
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClass[size],
        className,
      )}
    >
      {children}
    </As>
  );
}
