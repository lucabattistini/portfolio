'use client';

import { Seniority } from './seniority';
import { Name } from './name';
import { Quote } from './quote';
import { Role } from './role';
import { useMobileDetect } from '@/lib/hooks';

export function Hero() {
  const isMobile = useMobileDetect();

  return (
    <header className="relative flex h-screen w-full flex-row content-end items-end justify-between px-8 py-8 md:px-16">
      <div className="relative flex h-[77vh] flex-col content-start items-start justify-end gap-8 md:w-[67%]">
        <Seniority />
        <Name />
        <Role />
      </div>
      {!isMobile && <Quote />}
    </header>
  );
}
