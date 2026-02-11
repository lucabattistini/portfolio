export function Thanks() {
  return (
    <footer className="relative flex flex-col flex-none items-center content-center gap-4 w-full max-w-384 h-min p-0 overflow-hidden">
      <div className="relative flex flex-col flex-none items-start gap-8 w-[67%] p-0 overflow-visible">
        <h1 className=" font-display text-primary font-semibold leading-[0.9] text-[clamp(3rem,14vw,12.5rem)]">
          THAT’S ALL
          <br />
          FOLKS
        </h1>
      </div>
      <div className="flex flex-row flex-none items-start content-end gap-0 h-min">
        <h2 className="font-sans font-bold text-4xl text-accent leading-[0.9]">
          <span>Let’s make the www</span>
          <span></span>
          <br />
          <span>a better place</span>
          <br />
          <span>together</span>
        </h2>
      </div>
      <div className="w-full flex gap-4">
        <p className="text-lg text-primary font-sans font-semibold">1993/{new Date().getFullYear()}</p>
        <p className="text-lg text-primary font-sans font-semibold">VAT No. IT 04841180401</p>
      </div>
    </footer>
  );
}
