import { Particles } from "@/components/particles/particles";

export default function Home() {
  return (
    <div className="relative flex w-full h-min min-h-screen flex-col items-center justify-start content-center gap-0 overflow-visible p-0 bg-[#222222]">
      <Particles picture="/me.png" />
    </div>
  );
}
