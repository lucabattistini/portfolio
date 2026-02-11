type SectionProps = {
  name: string;
  children: React.ReactNode;
};

export function Section({ name, children }: SectionProps) {
  return (
    <section className="relative flex items-start justify-start gap-0 w-[67%] h-min pb-30 pt-0">
      <h2 className="font-sans font-semibold text-4xl text-primary uppercase grow-4 shrink-0 basis-0">{name}</h2>
      <div className="relative flex flex-col grow-4 shrink-0 basis-0 gap-20 w-px h-min p-0 text-primary text-lg font-sans">
        {children}
      </div>
    </section>
  );
}
