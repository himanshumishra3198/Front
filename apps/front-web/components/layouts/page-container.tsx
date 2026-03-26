import { cn } from "@repo/ui";
interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={cn("min-h-screen bg-background", className)}>
      {children}
    </main>
  );
}

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("px-4 py-16 md:py-24 lg:px-8", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
