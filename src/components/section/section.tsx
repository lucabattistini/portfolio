type SectionProps = {
  name: string;
  children: React.ReactNode;
};

export function Section({ name, children }: SectionProps) {
  return (
    <section className="relative flex h-min w-[67%] items-start justify-start gap-0 pt-0 pb-30">
      <h2 className="text-primary shrink-0 grow-4 basis-0 font-sans text-4xl font-semibold uppercase">
        {name}
      </h2>
      <div className="text-primary relative flex h-min w-px shrink-0 grow-4 basis-0 flex-col gap-20 p-0 font-sans text-lg">
        {children}
      </div>
    </section>
  );
}
