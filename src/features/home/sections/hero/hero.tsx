import { Seniority } from "./seniority";
import { Name } from "./name";
import { Quote } from "./quote";
import { Role } from "./role";

export function Hero() {
  return (
    <header className="relative flex flex-col flex-none items-center justify-start content-center gap-0 w-full h-screen p-0 overflow-visible">
      <div className="relative flex flex-row flex-none items-end justify-between content-end w-full h-full px-16 pb-8 pt-0 overflow-visible">
        <div className="relative flex flex-col flex-none items-start justify-end content-start gap-8 w-[67%] h-[77vh] p-0 overflow-visible">
          <Seniority />
          <Name />
          <Role />
        </div>
        <Quote />
      </div>
    </header>
  );
}
