"use client";

const RUNNER_COLORS: Record<string, string> = {
  A: "bg-red-500/20 text-red-300 border-red-500/40",
  B1: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  B2: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
  C1: "bg-green-500/20 text-green-300 border-green-500/40",
  C2: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  D: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  E1: "bg-orange-500/20 text-orange-300 border-orange-500/40",
  E2: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  PC: "bg-gray-500/20 text-gray-300 border-gray-500/40",
  "SB-13": "bg-pink-500/20 text-pink-300 border-pink-500/40",
};

export function RunnerBadge({
  runner,
  number,
  quantity,
  checked,
  onToggle,
}: {
  runner: string;
  number: number;
  quantity?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  const color = RUNNER_COLORS[runner] ?? "bg-gray-500/20 text-gray-300 border-gray-500/40";

  return (
    <button
      onClick={onToggle}
      className={`
        relative flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border
        transition-all duration-200 select-none
        ${color}
        ${checked ? "opacity-35 scale-95" : "active:scale-95"}
      `}
    >
      <div
        className={`
          w-4 h-4 rounded flex-shrink-0 flex items-center justify-center border
          transition-colors duration-200
          ${checked ? "bg-success border-success" : "border-current/30"}
        `}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className={`font-mono font-black text-lg ${checked ? "line-through" : ""}`}>
        {number}
      </span>
      {quantity && quantity > 1 && (
        <span className="text-[10px] font-bold bg-white/10 rounded-full px-1.5 py-0.5">
          x{quantity}
        </span>
      )}
    </button>
  );
}
