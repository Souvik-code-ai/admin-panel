import { ChevronDown,ChevronUp } from "lucide-react";
export const ReorderControls = ({
  index,
  total,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => (
  <div className="flex flex-col gap-0.5">
    <button
      onClick={onMoveUp}
      disabled={index === 0}
      className="p-0.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
    >
      <ChevronUp size={13} />
    </button>
    <button
      onClick={onMoveDown}
      disabled={index === total - 1}
      className="p-0.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
    >
      <ChevronDown size={13} />
    </button>
  </div>
);