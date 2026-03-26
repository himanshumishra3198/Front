import { cn } from "@repo/ui";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({
  step,
  title,
  description,
  className,
}: StepCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="relative mb-6">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
          <span className="font-display text-2xl font-bold text-primary">
            {step}
          </span>
        </div>
        <div className="absolute -inset-2 -z-10 rounded-full bg-primary/5 blur-xl" />
      </div>
      <h3 className="mb-2 font-display text-xl font-semibold">{title}</h3>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
