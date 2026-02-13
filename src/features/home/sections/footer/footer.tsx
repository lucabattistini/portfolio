import { Payoff } from './payoff';
import { Thanks } from './thanks';

export function Footer() {
  return (
    <footer className="relative flex w-full flex-row content-end items-end justify-between px-16 pb-8">
      <div className="relative flex w-[67%] flex-none flex-col content-start items-start justify-end gap-20">
        <div className="flex w-full flex-col gap-8">
          <Thanks />
          <Payoff />
        </div>
        <div className="flex flex-col">
          <p className="text-primary font-sans text-xl font-semibold">
            1993 / {new Date().getFullYear()}
          </p>
          <p className="text-primary font-sans text-xl font-semibold">VAT No. (IT) 04841180401</p>
        </div>
      </div>
    </footer>
  );
}
