"use client";

import { useState } from "react";
import type { KitData } from "@/data/zeta-gundam";
import { StepView } from "./step-view";
import { StepList } from "./step-list";

type View = "list" | "step";

export function AssemblyGuide({ kit }: { kit: KitData }) {
  const [view, setView] = useState<View>("list");
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = kit.steps;
  const currentStep = steps[currentIndex];

  const totalParts = steps.reduce(
    (sum, s) => sum + s.parts.reduce((ps, p) => ps + (p.quantity ?? 1), 0),
    0
  );

  if (view === "list") {
    return (
      <div className="flex flex-col h-full">
        {/* Kit header */}
        <div className="px-4 pt-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-accent/20 text-accent-light">
              {kit.grade}
            </span>
            <span className="text-xs text-muted">{kit.scale}</span>
          </div>
          <h1 className="text-3xl font-black">{kit.name}</h1>
          <p className="text-muted text-sm mt-1">
            {steps.length}ステップ / {totalParts}パーツ / {kit.runners.length}ランナー
          </p>
        </div>

        <StepList
          steps={steps}
          currentIndex={currentIndex}
          onSelect={(i) => {
            setCurrentIndex(i);
            setView("step");
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <div className="px-4 pt-3 pb-1">
        <button
          onClick={() => setView("list")}
          className="flex items-center gap-1 text-accent-light text-sm font-medium active:opacity-70"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          ステップ一覧
        </button>
      </div>

      <StepView
        step={currentStep}
        totalSteps={steps.length}
        onPrev={() => setCurrentIndex((i) => Math.max(0, i - 1))}
        onNext={() => setCurrentIndex((i) => Math.min(steps.length - 1, i + 1))}
        isFirst={currentIndex === 0}
        isLast={currentIndex === steps.length - 1}
      />
    </div>
  );
}
