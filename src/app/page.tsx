import { zetaGundam } from "@/data/zeta-gundam";
import { AssemblyGuide } from "@/components/assembly-guide";

export default function Home() {
  return (
    <main className="h-dvh flex flex-col">
      <AssemblyGuide kit={zetaGundam} />
    </main>
  );
}
