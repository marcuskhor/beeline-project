import { cn } from "@/lib/utils";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export const AnimatedButton = ({
  children,
  variant = "primary",
  onClick,
  className,
}: AnimatedButtonProps) => {
  const baseStyles = "btn-animated relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg cursor-pointer transition-shadow";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#ECC25F] to-[#E9A15A] text-primary-foreground hover:shadow-hover",
    secondary: "bg-secondary text-secondary-foreground hover:shadow-lg",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      <span className="btn-bg" />
      <span className="text-wrap">
        <span className="text-inner">{children}</span>
        <span className={cn(
          "text-inner",
          variant === "primary" ? "text-primary" : "text-secondary"
        )}>
          {children}
        </span>
      </span>
    </button>
  );
};
