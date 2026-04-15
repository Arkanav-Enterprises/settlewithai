import type { ReactNode } from "react";

export function ToolProse({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-text mb-4 font-heading">
        {title}
      </h2>
      <div className="space-y-4 text-text-muted text-[1rem] leading-[1.7]">
        {children}
      </div>
    </section>
  );
}
