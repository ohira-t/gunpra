"use client";

import Image from "next/image";

const RUNNER_IMAGES: Record<string, { width: number; height: number }> = {
  A:       { width: 500, height: 603 },
  B1:      { width: 500, height: 439 },
  C1:      { width: 500, height: 530 },
  C2:      { width: 450, height: 480 },
  D:       { width: 500, height: 400 },
  E1:      { width: 500, height: 296 },
  E2:      { width: 500, height: 562 },
  PC:      { width: 410, height: 630 },
  "SB-13": { width: 500, height: 330 },
};

export function RunnerImage({ runner }: { runner: string }) {
  const dims = RUNNER_IMAGES[runner];
  if (!dims) {
    return (
      <div className="px-4 py-3 bg-surface/50 text-muted text-sm text-center">
        画像なし
      </div>
    );
  }

  return (
    <div className="bg-white p-2 border-t border-b border-border">
      <Image
        src={`/runners/${runner}.png`}
        alt={`${runner}ランナー`}
        width={dims.width}
        height={dims.height}
        className="w-full h-auto"
      />
    </div>
  );
}
