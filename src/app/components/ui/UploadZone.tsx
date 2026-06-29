import { Upload } from "lucide-react";
export const UploadZone = ({
  label,
  hint,
  onClick,
}: {
  label: string;
  hint: string;
  onClick: () => void;
}) => (
  <div
    onClick={onClick}
    className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-8 text-center hover:border-[#0F4C81] hover:bg-[#F8FBFF] transition-all cursor-pointer group"
  >
    <div className="w-11 h-11 bg-[#F1F5F9] group-hover:bg-[#EFF6FF] rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
      <Upload
        size={18}
        className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors"
      />
    </div>
    <p className="text-[13px] font-semibold text-[#0F172A]">{label}</p>
    <p className="text-[12px] text-[#94A3B8] mt-1">{hint}</p>
  </div>
);