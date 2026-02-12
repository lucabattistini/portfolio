import { Seniority } from './seniority';
import { Name } from './name';
import { Quote } from './quote';
import { Role } from './role';

export function Hero() {
  return (
    <header className="relative flex h-screen w-full flex-none flex-col content-center items-center justify-start gap-0 overflow-visible p-0">
      <div className="relative flex h-full w-full flex-none flex-row content-end items-end justify-between overflow-visible px-16 pt-0 pb-8">
        <div className="relative flex h-[77vh] w-[67%] flex-none flex-col content-start items-start justify-end gap-8 overflow-visible p-0">
          <Seniority />
          <Name />
          <Role />
        </div>
        <Quote />
      </div>
    </header>
  );
}
