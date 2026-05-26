"use client";

import type { Step } from "@/data/zeta-gundam";

export function StepList({
  steps,
  currentIndex,
  onSelect,
}: {
  steps: Step[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3">
        <h2 className="text-xl font-bold">組立ステップ一覧</h2>
        <p className="text-muted text-sm mt-1">
          全{steps.length}ステップ
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex flex-col gap-2">
          {steps.map((step, i) => (
            <button
              key={step.step}
              onClick={() => onSelect(i)}
              className={`
                flex items-center gap-3 p-4 rounded-xl text-left transition-all
                active:scale-[0.98]
                ${i === currentIndex
                  ? "bg-accent/20 border border-accent/40"
                  : "bg-surface hover:bg-surface-hover border border-transparent"
                }
              `}
            >
              <span className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0
                ${i === currentIndex ? "bg-accent text-white" : "bg-border text-muted"}
              `}>
                {step.step}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold truncate">{step.name}</div>
                <div className="text-muted text-sm">
                  {step.parts.length} パーツ
                </div>
              </div>
              <svg className="w-5 h-5 text-muted flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
