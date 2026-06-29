import { FormLabel } from "./FormLabel";
import {Eye,X,Upload} from "lucide-react"
export const MediaGrid = ({
  images,
  onRemove,
  onAdd,
  fileInputRef,
  onFileChange,
  editable = false,
}: {
  images: string[];
  onRemove?: (i: number) => void;
  onAdd?: () => void;
  fileInputRef?: React.RefObject<HTMLInputElement>;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editable?: boolean;
}) => (
  <div>
    <FormLabel>
      Client Media{" "}
      {editable
        ? `(${images.length}/3)`
        : `(${images.length} file${images.length !== 1 ? "s" : ""})`}
    </FormLabel>
    {images.length === 0 && !editable ? (
      <div className="flex items-center justify-center h-24 rounded-xl bg-[#F8FAFC] border border-dashed border-[#E2E8F0]">
        <p className="text-sm text-[#94A3B8]">No media uploaded</p>
      </div>
    ) : (
      <div className="grid grid-cols-3 gap-3">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative rounded-xl border border-[#E2E8F0] overflow-hidden aspect-square bg-[#F8FAFC] group"
          >
            {img.startsWith("data:video/") ? (
              <video
                src={img}
                className="w-full h-full object-cover"
                muted
                playsInline
              />
            ) : (
              <img
                src={img}
                alt={`media-${i}`}
                className="w-full h-full object-cover"
              />
            )}
            {editable && onRemove && (
              <button
                onClick={() => onRemove(i)}
                className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
              >
                <X size={13} />
              </button>
            )}
            {/* View-only lightbox indicator */}
            {!editable && (
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye size={18} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {editable && images.length < 3 && onAdd && (
          <div
            onClick={onAdd}
            className="border-2 border-dashed border-[#E2E8F0] rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-[#0F4C81] hover:bg-[#F8FBFF] transition-all cursor-pointer group p-2"
          >
            <div className="w-9 h-9 bg-[#F1F5F9] group-hover:bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-2 transition-colors">
              <Upload
                size={15}
                className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors"
              />
            </div>
            <p className="text-[11px] font-semibold text-[#0F172A] leading-tight">
              Add Media
            </p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5">
              {images.length}/3
            </p>
          </div>
        )}
      </div>
    )}
    {editable && fileInputRef && onFileChange && (
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={onFileChange}
      />
    )}
    {editable && (
      <p className="text-[12px] text-[#94A3B8] mt-2">
        PNG, JPG, MP4 up to 50MB each — max 3 files
      </p>
    )}
  </div>
);