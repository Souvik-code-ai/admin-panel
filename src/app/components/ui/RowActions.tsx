import { Eye ,Edit2,Archive,Trash2} from "lucide-react";
export const RowActions = ({
  onView,
  onEdit,
  onDelete,
  onArchive,
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
}) => (
  <div className="flex items-center gap-0.5">
    {onView && (
      <button
        onClick={onView}
        className="p-1.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors"
      >
        <Eye size={14} />
      </button>
    )}
    {onEdit && (
      <button
        onClick={onEdit}
        className="p-1.5 rounded-md hover:bg-orange-50 text-[#94A3B8] hover:text-[#F97316] transition-colors"
      >
        <Edit2 size={14} />
      </button>
    )}
    {onArchive && (
      <button
        onClick={onArchive}
        className="p-1.5 rounded-md hover:bg-gray-50 text-[#94A3B8] hover:text-[#64748B] transition-colors"
      >
        <Archive size={14} />
      </button>
    )}
    {onDelete && (
      <button
        onClick={onDelete}
        className="p-1.5 rounded-md hover:bg-red-50 text-[#94A3B8] hover:text-red-500 transition-colors"
      >
        <Trash2 size={14} />
      </button>
    )}
  </div>
);