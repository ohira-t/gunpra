"use client";

import Image from "next/image";
import { RUNNER_PART_POSITIONS } from "@/data/runner-part-positions";

const RUNNER_IMAGES: Record<string, { width: number; height: number }> = {
  A: { width: 500, height: 603 },
  B1: { width: 500, height: 439 },
  B2: { width: 300, height: 240 },
  C1: { width: 500, height: 530 },
  C2: { width: 450, height: 480 },
  D: { width: 500, height: 400 },
  E1: { width: 500, height: 296 },
  E2: { width: 500, height: 562 },
  PC: { width: 410, height: 630 },
  "SB-13": { width: 500, height: 330 },
};

export function RunnerImage({
  runner,
  highlightParts,
}: {
  runner: string;
  highlightParts?: number[];
}) {
  const dims = RUNNER_IMAGES[runner];
  if (!dims) {
    return (
      <div className="px-4 py-3 bg-surface/50 text-muted text-sm text-center">
        画像なし
      </div>
    );
  }

  const positions = RUNNER_PART_POSITIONS[runner] ?? {};

  return (
    <div className="relative bg-white p-2 border-t border-b border-border">
      <div className="relative">
        <Image
          src={`/runners/${runner}.png`}
          alt={`${runner}ランナー`}
          width={dims.width}
          height={dims.height}
          className="w-full h-auto"
        />
        {highlightParts && highlightParts.length > 0 && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {highlightParts.map((partNum) => {
              const pos = positions[partNum];
              if (!pos) return null;
              return (
                <g key={partNum}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="4.5"
                    fill="rgba(255, 100, 50, 0.25)"
                    stroke="rgba(255, 100, 50, 0.9)"
                    strokeWidth="0.5"
                  />
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="2.2"
                    fill="rgba(255, 100, 50, 0.85)"
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 0.8}
                    textAnchor="middle"
                    fill="white"
                    fontSize="2.2"
                    fontWeight="bold"
                    fontFamily="system-ui, sans-serif"
                  >
                    {partNum}
                  </text>
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </div>
  );
}
