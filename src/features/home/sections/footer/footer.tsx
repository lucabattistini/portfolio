import { Payoff } from './payoff';
import { Thanks } from './thanks';

export function Footer() {
  return (
    <footer className="relative flex w-full flex-row content-end items-end justify-between px-8 pb-8 md:px-16">
      <div className="relative flex flex-none flex-col content-start items-start justify-end gap-20 md:w-[67%]">
        <div className="flex w-full flex-col gap-8 md:grid md:grid-cols-[1fr_2fr] md:gap-20">
          <Thanks />
          <Payoff />
        </div>
        <div className="flex flex-col">
          <p className="text-primary font-sans text-xl font-semibold">VAT No. IT 04841180401</p>
        </div>
      </div>
    </footer>
  );
}
