import { cn } from "@/lib/utils";

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-4 p-10 bg-stable-gradient rounded-lg border border-white/30",
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
