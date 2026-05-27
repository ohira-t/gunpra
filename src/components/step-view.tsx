"use client";

import { useState, useCallback, useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import type { Step } from "@/data/zeta-gundam";
import { RunnerBadge } from "./runner-badge";
import { RunnerImage } from "./runner-image";

export function StepView({
  step,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: {
  step: Step;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [expandedRunner, setExpandedRunner] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);

  const toggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, { part: typeof step.parts[0]; index: number }[]>();
    step.parts.forEach((part, index) => {
      const list = map.get(part.runner) ?? [];
      list.push({ part, index });
      map.set(part.runner, list);
    });
    return map;
  }, [step.parts]);

  const allChecked = checked.size === step.parts.length;
  const progress = step.parts.length > 0 ? checked.size / step.parts.length : 0;

  const handleNext = () => {
    setChecked(new Set());
    setExpandedRunner(null);
    setShowManual(false);
    onNext();
  };
  const handlePrev = () => {
    setChecked(new Set());
    setExpandedRunner(null);
    setShowManual(false);
    onPrev();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-muted text-sm">STEP {step.step}</span>
          <span className="text-muted text-sm">{checked.size}/{step.parts.length}</span>
        </div>
        <h2 className="text-2xl font-bold">
          {step.name}
          <span className="text-muted text-sm font-normal ml-2">{step.nameEn}</span>
        </h2>
        <div className="mt-2 h-1.5 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Manual page thumbnail - tap to open fullscreen */}
        <button
          onClick={() => setShowManual(true)}
          className="relative w-full rounded-xl overflow-hidden bg-white mb-4 block text-left"
        >
          <img
            src={`/manual/page-${step.manualPage}.jpg`}
            alt={`説明書 ページ${step.manualPage}`}
            className="w-full h-auto block"
            style={{ maxHeight: "30vh", objectFit: "cover", objectPosition: "top" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/80 to-transparent" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            タップで拡大
          </div>
        </button>

        {/* Parts grouped by runner */}
        <div className="flex flex-col gap-4">
          {Array.from(grouped.entries()).map(([runner, items]) => {
            const allInGroupChecked = items.every((i) => checked.has(i.index));
            const isExpanded = expandedRunner === runner;

            return (
              <div key={runner} className="rounded-xl border border-border overflow-hidden">
                {/* Runner header - tap to show runner image */}
                <button
                  onClick={() => setExpandedRunner(isExpanded ? null : runner)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-left
                    transition-colors
                    ${allInGroupChecked ? "bg-success/10" : "bg-surface"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-xl">{runner}</span>
                    <span className="text-muted text-sm">
                      {items.length}パーツ
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {allInGroupChecked && (
                      <span className="text-success text-xs font-bold">完了</span>
                    )}
                    <svg
                      className={`w-4 h-4 text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Runner image (expandable) with highlighted parts */}
                {isExpanded && (
                  <RunnerImage
                    runner={runner}
                    highlightParts={items.map((i) => i.part.number)}
                  />
                )}

                {/* Parts in this runner */}
                <div className="p-2 grid grid-cols-3 gap-1.5">
                  {items.map(({ part, index }) => (
                    <RunnerBadge
                      key={`${part.runner}-${part.number}-${index}`}
                      runner={part.runner}
                      number={part.number}
                      quantity={part.quantity}
                      checked={checked.has(index)}
                      onToggle={() => toggle(index)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
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
            ${allChecked ? "bg-success text-white" : "bg-accent text-white"}
            disabled:opacity-30
          `}
        >
          {allChecked ? "完了 → 次へ" : "次へ"}
        </button>
      </div>

      {/* Manual page fullscreen modal */}
      {showManual && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 shrink-0">
            <span className="text-white/50 text-sm">ピンチで拡大できます</span>
            <button
              onClick={() => setShowManual(false)}
              className="text-white/80 w-10 h-10 flex items-center justify-center rounded-full active:bg-white/10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="flex-1 min-h-0">
            <TransformWrapper
              initialScale={1}
              minScale={1}
              maxScale={5}
              centerOnInit
            >
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/manual/page-${step.manualPage}.jpg`}
                  alt={`説明書 ページ${step.manualPage}`}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </TransformComponent>
            </TransformWrapper>
          </div>
        </div>
      )}
    </div>
  );
}
