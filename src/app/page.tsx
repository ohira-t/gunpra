import { zetaGundam } from "@/data/zeta-gundam";
import { AssemblyGuide } from "@/components/assembly-guide";

export default function Home() {
  return (
    <main className="h-dvh max-w-lg mx-auto flex flex-col">
      <AssemblyGuide kit={zetaGundam} />
    </main>
  );
}
