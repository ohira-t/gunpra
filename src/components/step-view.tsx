"use client";

import { useState, useCallback } from "react";
import type { Step } from "@/data/zeta-gundam";
import { RunnerBadge } from "./runner-badge";

export function StepView({
  step,
  totalSteps,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: {
  step: Step;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const allChecked = checked.size === step.parts.length;
  const progress = step.parts.length > 0 ? checked.size / step.parts.length : 0;

  const handleNext = () => {
    setChecked(new Set());
    onNext();
  };

  const handlePrev = () => {
    setChecked(new Set());
    onPrev();
  };

  const runnerGroups = new Map<string, number>();
  for (const part of step.parts) {
    runnerGroups.set(part.runner, (runnerGroups.get(part.runner) ?? 0) + (part.quantity ?? 1));
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-muted text-sm">
            STEP {step.step}
          </span>
          <span className="text-muted text-sm">
            {checked.size}/{step.parts.length} パーツ
          </span>
        </div>
        <h2 className="text-2xl font-bold">
          {step.name}
          <span className="text-muted text-sm font-normal ml-2">{step.nameEn}</span>
        </h2>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Runner summary */}
      <div className="px-4 pb-2">
        <div className="flex flex-wrap gap-1.5">
          {Array.from(runnerGroups.entries()).map(([runner, count]) => (
            <span
              key={runner}
              className="text-xs px-2 py-1 rounded-lg bg-surface text-muted"
            >
              {runner} x{count}
            </span>
          ))}
        </div>
      </div>

      {/* Parts grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {step.parts.map((part, i) => (
            <RunnerBadge
              key={`${part.runner}-${part.number}-${i}`}
              runner={part.runner}
              number={part.number}
              quantity={part.quantity}
              checked={checked.has(i)}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-6 pt-2 flex gap-3 border-t border-border">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="flex-1 py-3 rounded-xl bg-surface text-foreground font-bold
                     disabled:opacity-30 active:scale-95 transition-all"
        >
          前へ
        </button>
        <button
          onClick={handleNext}
          disabled={isLast}
          className={`
            flex-1 py-3 rounded-xl font-bold transition-all active:scale-95
            ${allChecked
              ? "bg-success text-white"
              : "bg-accent text-white"
            }
            disabled:opacity-30
          `}
        >
          {allChecked ? "完了 → 次へ" : "次へ"}
        </button>
      </div>
    </div>
  );
}
