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
  const baseStyles = "relative overflow-hidden px-8 py-4 rounded-full font-bold text-lg cursor-pointer transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-br from-[#ECC25F] to-[#E9A15A] text-foreground hover:shadow-hover hover:scale-105",
    secondary: "bg-secondary text-secondary-foreground hover:shadow-lg hover:scale-105",
  };

  return (
    <button
      onClick={onClick}
      className={cn(baseStyles, variants[variant], className)}
    >
      {children}
    </button>
  );
};
