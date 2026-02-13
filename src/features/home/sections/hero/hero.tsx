import { Seniority } from './seniority';
import { Name } from './name';
import { Quote } from './quote';
import { Role } from './role';

export function Hero() {
  return (
    <header className="relative flex h-screen w-full flex-row content-end items-end justify-between px-16 py-8">
      <div className="relative flex h-[77vh] w-[67%] flex-col content-start items-start justify-end gap-8">
        <Seniority />
        <Name />
        <Role />
      </div>
      <Quote />
    </header>
  );
}
