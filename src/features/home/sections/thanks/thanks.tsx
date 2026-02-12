export function Thanks() {
  return (
    <footer className="relative flex h-min w-full max-w-384 flex-none flex-col content-center items-center gap-4 overflow-hidden p-0">
      <div className="relative flex w-[67%] flex-none flex-col items-start gap-8 overflow-visible p-0">
        <h1 className="font-display text-primary text-[clamp(3rem,14vw,12.5rem)] leading-[0.9] font-semibold">
          THAT’S ALL
          <br />
          FOLKS
        </h1>
      </div>
      <div className="flex h-min flex-none flex-row content-end items-start gap-0">
        <h2 className="text-accent font-sans text-4xl leading-[0.9] font-bold">
          <span>Let’s make the www</span>
          <span></span>
          <br />
          <span>a better place</span>
          <br />
          <span>together</span>
        </h2>
      </div>
      <div className="flex w-full gap-4">
        <p className="text-primary font-sans text-lg font-semibold">
          1993/{new Date().getFullYear()}
        </p>
        <p className="text-primary font-sans text-lg font-semibold">VAT No. IT 04841180401</p>
      </div>
    </footer>
  );
}
