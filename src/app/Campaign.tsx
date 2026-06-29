import { useState ,useRef} from "react";
import { campaignsData } from "./Data";
import { FormLabel } from "./components/ui/FormLabel";
import {Film,X} from "lucide-react"
import { Modal } from "./components/ui/Modal";
import { Btn } from "./components/ui/Btn";
import { ReorderControls } from "./components/ui/ReorderControls";
import { RowActions } from "./components/ui/RowActions";
import { Th } from "./components/ui/Th";
import { Td } from "./components/ui/Td";
import { HMInput } from "./components/ui/HMInput";
import { HMSelect } from "./components/ui/HMSelect";
import { StatusBadge } from "./components/ui/Statusbadge";
import { UploadZone } from "./components/ui/UploadZone";
import { Card } from "./components/ui/card";
import { Filter,Eye,Search,Plus } from "lucide-react";
import { PageHeader } from "./components/ui/Pageheader";
const CAMP_TEMPLATE_MAX_MB = 2;
const CAMP_TEMPLATE_WIDTH = 800;
const CAMP_TEMPLATE_HEIGHT = 700;

const CAMP_BODY_MAX_MB = 2;
const CAMP_BODY_WIDTH = 1920;
const CAMP_BODY_HEIGHT = 1080;
const getCampImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Cannot read image"));
    };
    img.src = url;
  });
const validateCampTemplateFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/"))
    return "Template must be an image file (PNG or JPG).";
  if (file.size > CAMP_TEMPLATE_MAX_MB * 1024 * 1024)
    return `Template image must be max ${CAMP_TEMPLATE_MAX_MB}MB (yours: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  try {
    const { width, height } = await getCampImageDimensions(file);
    if (width !== CAMP_TEMPLATE_WIDTH || height !== CAMP_TEMPLATE_HEIGHT)
      return `Template must be exactly ${CAMP_TEMPLATE_WIDTH}×${CAMP_TEMPLATE_HEIGHT}px (yours: ${width}×${height}px).`;
  } catch {
    return "Could not read this image. Try another file.";
  }
  return "";
};
const validateCampBodyFile = async (file: File): Promise<string> => {
  if (file.type.startsWith("video/")) {
    if (file.size > CAMP_BODY_MAX_MB * 1024 * 1024)
      return `Video must be max ${CAMP_BODY_MAX_MB}MB (yours: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
    return ""; // videos: size only, no dimension check
  }
  if (!file.type.startsWith("image/"))
    return "Body media must be an image (PNG/JPG) or video file.";
  if (file.size > CAMP_BODY_MAX_MB * 1024 * 1024)
    return `Body image must be max ${CAMP_BODY_MAX_MB}MB (yours: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  try {
    const { width, height } = await getCampImageDimensions(file);
    if (width !== CAMP_BODY_WIDTH || height !== CAMP_BODY_HEIGHT)
      return `Body image must be exactly ${CAMP_BODY_WIDTH}×${CAMP_BODY_HEIGHT}px (yours: ${width}×${height}px).`;
  } catch {
    return "Could not read this image. Try another file.";
  }
  return "";
};
export const CampaignsPage = () => {
  // ── Data state ──
  const [campaigns, setCampaigns] = useState(campaignsData);

  // ── Filter ──
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const allStatuses = ["All", "Active", "Paused", "Completed"];

  // ── Search ──
  const [searchTerm, setSearchTerm] = useState("");

  // ── View / Detail ──
  const [viewCampaign, setViewCampaign] = useState(null);

  // ── Edit state ──
  const [editCampaign, setEditCampaign] = useState(null);
  const [editName, setEditName] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDateError, setEditDateError] = useState("");
  const [editStatus, setEditStatus] = useState("Active");
  const [editServices, setEditServices] = useState([]);
  const [editServicesError, setEditServicesError] = useState("");
  const [editTemplateImg, setEditTemplateImg] = useState(null);
  const [editTemplateImgName, setEditTemplateImgName] = useState("");
  const [editTemplateImgError, setEditTemplateImgError] = useState("");
  const editTemplateRef = useRef(null);
  const [editBodyImgs, setEditBodyImgs] = useState([]);
  const [editBodyImgsError, setEditBodyImgsError] = useState("");
  const [editBodyUploadError, setEditBodyUploadError] = useState("");
  const editBodyRef = useRef(null);

  // ── Add state ──
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newNameError, setNewNameError] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newDateError, setNewDateError] = useState("");
  const [newServices, setNewServices] = useState([]);
  const [newServicesError, setNewServicesError] = useState("");
  const [newTemplateImg, setNewTemplateImg] = useState(null);
  const [newTemplateImgName, setNewTemplateImgName] = useState("");
  const [newTemplateImgError, setNewTemplateImgError] = useState("");
  const newTemplateRef = useRef(null);
  const [newBodyImgs, setNewBodyImgs] = useState([]);
  const [newBodyImgsError, setNewBodyImgsError] = useState("");
  const [newBodyUploadError, setNewBodyUploadError] = useState("");
  const newBodyRef = useRef(null);

  const SERVICE_OPTIONS = [
    "Social Media",
    "Digital",
    "Influencer",
    "OOH",
    "TVC",
    "PR",
    "Events",
    "Content",
  ];

  // ── Filtering ──
  const filtered = campaigns.filter((c) => {
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    return matchesStatus && matchesSearch;
  });
  const activeFilterCount = filterStatus !== "All" ? 1 : 0;

  // ── Image helpers ──
  const readFile = (
    file: File,
    cb: (data: string, name: string, isVideo: boolean) => void,
  ) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      cb(ev.target.result as string, file.name, file.type.startsWith("video/"));
    reader.readAsDataURL(file);
  };

  // ── New campaign handlers ──
  const handleNewTemplate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = await validateCampTemplateFile(file);
    if (error) {
      setNewTemplateImgError(error);
      e.target.value = "";
      return;
    }
    setNewTemplateImgError("");
    readFile(file, (data, name) => {
      setNewTemplateImg(data);
      setNewTemplateImgName(name);
    });
    e.target.value = "";
  };

  const handleNewBody = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const slots = 3 - newBodyImgs.length;
    const toAdd = Array.from(files).slice(0, slots);
    for (const file of toAdd) {
      const error = await validateCampBodyFile(file);
      if (error) {
        setNewBodyUploadError(error);
        continue;
      }
      setNewBodyUploadError("");
      await new Promise<void>((res) =>
        readFile(file, (data, name, isVideo) => {
          setNewBodyImgs((prev) =>
            prev.length < 3 ? [...prev, { url: data, name, isVideo }] : prev,
          );
          res();
        }),
      );
    }
    e.target.value = "";
  };

  const toggleNewService = (s: string) =>
    setNewServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const resetAddForm = () => {
    setNewName("");
    setNewNameError("");
    setNewDate("");
    setNewDateError("");
    setNewServices([]);
    setNewServicesError("");
    setNewTemplateImg(null);
    setNewTemplateImgName("");
    setNewTemplateImgError("");
    setNewBodyImgs([]);
    setNewBodyImgsError("");
    setNewBodyUploadError("");
    if (newTemplateRef.current) newTemplateRef.current.value = "";
    if (newBodyRef.current) newBodyRef.current.value = "";
  };

  const handleSaveCampaign = () => {
    let hasError = false;

    if (!newTemplateImg) {
      setNewTemplateImgError("Template image is mandatory.");
      hasError = true;
    } else setNewTemplateImgError("");

    if (newBodyImgs.length === 0) {
      setNewBodyImgsError("At least one body image or video is mandatory.");
      hasError = true;
    } else setNewBodyImgsError("");

    if (!newName.trim()) {
      setNewNameError("Campaign Name is mandatory.");
      hasError = true;
    } else setNewNameError("");

    if (!newDate) {
      setNewDateError("Launch Month is mandatory.");
      hasError = true;
    } else setNewDateError("");

    if (newServices.length === 0) {
      setNewServicesError("Select at least one service.");
      hasError = true;
    } else setNewServicesError("");

    if (hasError) return;

    setCampaigns((prev) => [
      ...prev,
      {
        id: Date.now(),
        image: newTemplateImg,
        name: newName.trim(),
        date: newDate,
        reach: "—",
        engagement: "—",
        services: newServices,
        status: "Active",
        bodyImages: newBodyImgs,
      },
    ]);
    resetAddForm();
    setShowAdd(false);
  };

  // ── Edit handlers ──
  const openEdit = (c: any) => {
    setEditCampaign(c);
    setEditName(c.name);
    setEditNameError("");
    setEditDate(c.date);
    setEditDateError("");
    setEditStatus(c.status);
    setEditServices(c.services || []);
    setEditServicesError("");
    setEditTemplateImg(c.image);
    setEditTemplateImgName("");
    setEditTemplateImgError("");
    setEditBodyImgs(c.bodyImages || []);
    setEditBodyImgsError("");
    setEditBodyUploadError("");
  };

  const handleEditTemplate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const error = await validateCampTemplateFile(file);
    if (error) {
      setEditTemplateImgError(error);
      e.target.value = "";
      return;
    }
    setEditTemplateImgError("");
    readFile(file, (data, name) => {
      setEditTemplateImg(data);
      setEditTemplateImgName(name);
    });
    e.target.value = "";
  };

  const handleEditBody = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const slots = 3 - editBodyImgs.length;
    const toAdd = Array.from(files).slice(0, slots);
    for (const file of toAdd) {
      const error = await validateCampBodyFile(file);
      if (error) {
        setEditBodyUploadError(error);
        continue;
      }
      setEditBodyUploadError("");
      await new Promise<void>((res) =>
        readFile(file, (data, name, isVideo) => {
          setEditBodyImgs((prev) =>
            prev.length < 3 ? [...prev, { url: data, name, isVideo }] : prev,
          );
          res();
        }),
      );
    }
    e.target.value = "";
  };

  const toggleEditService = (s: string) =>
    setEditServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );

  const handleUpdateCampaign = () => {
    let hasError = false;

    if (!editTemplateImg) {
      setEditTemplateImgError("Template image is mandatory.");
      hasError = true;
    } else setEditTemplateImgError("");

    if (editBodyImgs.length === 0) {
      setEditBodyImgsError("At least one body image or video is mandatory.");
      hasError = true;
    } else setEditBodyImgsError("");

    if (!editName.trim()) {
      setEditNameError("Campaign Name is mandatory.");
      hasError = true;
    } else setEditNameError("");

    if (!editDate) {
      setEditDateError("Launch Month is mandatory.");
      hasError = true;
    } else setEditDateError("");

    if (editServices.length === 0) {
      setEditServicesError("Select at least one service.");
      hasError = true;
    } else setEditServicesError("");

    if (!editCampaign || hasError) return;

    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === editCampaign.id
          ? {
              ...c,
              name: editName.trim(),
              date: editDate,
              status: editStatus,
              services: editServices,
              image: editTemplateImg,
              bodyImages: editBodyImgs,
            }
          : c,
      ),
    );
    setEditCampaign(null);
  };

  const deleteCampaign = (id: number) =>
    setCampaigns((prev) => prev.filter((c) => c.id !== id));

  const moveCampaign = (index: number, direction: number) => {
    setCampaigns((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  // ── Body media grid (images + videos) ──
  const BodyMediaGrid = ({
    items,
    onRemove,
    onAdd,
    fileRef,
    onFileChange,
    uploadError,
  }: {
    items: { url: string; name: string; isVideo?: boolean }[];
    onRemove: (i: number) => void;
    onAdd: () => void;
    fileRef: React.RefObject<HTMLInputElement>;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    uploadError?: string;
  }) => (
    <div>
      <FormLabel>Body Media — Images & Videos ({items.length}/3)</FormLabel>
      <p className="text-xs text-[#94A3B8] mb-2">
        Images: exactly {CAMP_BODY_WIDTH}×{CAMP_BODY_HEIGHT}px, max{" "}
        {CAMP_BODY_MAX_MB}MB &nbsp;|&nbsp; Videos: max {CAMP_BODY_MAX_MB}MB
      </p>
      <div className="grid grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative rounded-xl border border-[#E2E8F0] overflow-hidden aspect-video bg-[#F8FAFC] group"
          >
            {item.isVideo ? (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                muted
              />
            ) : (
              <img
                src={item.url}
                alt={`body-${i}`}
                className="w-full h-full object-cover"
              />
            )}
            {item.isVideo && (
              <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <Film size={9} /> VIDEO
              </div>
            )}
            <button
              onClick={() => onRemove(i)}
              className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
            >
              <X size={12} />
            </button>
          </div>
        ))}
        {items.length < 3 && (
          <div
            onClick={onAdd}
            className="border-2 border-dashed border-[#E2E8F0] rounded-xl aspect-video flex flex-col items-center justify-center text-center hover:border-[#0F4C81] hover:bg-[#F8FBFF] transition-all cursor-pointer group p-2"
          >
            <div className="w-9 h-9 bg-[#F1F5F9] group-hover:bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-2 transition-colors">
              <Upload
                size={15}
                className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors"
              />
            </div>
            <p className="text-[11px] font-semibold text-[#0F172A]">
              Add Image / Video
            </p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5">
              {items.length}/3
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={onFileChange}
      />
      {uploadError && (
        <p className="text-xs text-red-500 mt-1.5 font-medium">{uploadError}</p>
      )}
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Digital Campaigns"
        subtitle="Track digital marketing campaigns and performance across all channels."
        action={
          <Btn icon={Plus} onClick={() => setShowAdd(true)}>
            New Campaign
          </Btn>
        }
      />

      <Card>
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-[#F1F5F9] gap-3 flex-wrap">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by campaign name..."
              className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                showFilter || activeFilterCount > 0
                  ? "bg-[#EFF6FF] text-lime-600 border-[#BFDBFE]"
                  : "bg-white text-lime-800 border-[#E2E8F0] hover:bg-[#F8FAFC]"
              }`}
            >
              <Filter size={14} />
              Filter by Status
              {activeFilterCount > 0 && (
                <span className="ml-0.5 w-5 h-5 rounded-full bg-lime-600 text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              )}
            </button>
            {showFilter && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-black uppercase tracking-wide">
                    Status
                  </p>
                  {filterStatus !== "All" && (
                    <button
                      onClick={() => setFilterStatus("All")}
                      className="text-xs text-[#64748B] hover:text-red-500 font-medium transition-colors"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {allStatuses.map((s) => {
                    const activeClr: Record<string, string> = {
                      All: "bg-lime-600 text-white border-lime-600",
                      Active: "bg-emerald-500 text-white border-emerald-500",
                      Paused: "bg-yellow-500 text-white border-yellow-500",
                      Completed: "bg-blue-500 text-white border-blue-500",
                    };
                    const isActive = filterStatus === s;
                    return (
                      <button
                        key={s}
                        onClick={() => {
                          setFilterStatus(s);
                          setShowFilter(false);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          isActive
                            ? activeClr[s]
                            : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0F4C81] hover:text-[#0F4C81]"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active filter chip */}
        {filterStatus !== "All" && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <span className="text-xs text-[#64748B] font-medium">
              Filtered by:
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#EFF6FF] text-lime-600 text-xs font-medium rounded-full border border-lime-200">
              ● {filterStatus}
              <button
                onClick={() => setFilterStatus("All")}
                className="ml-0.5 hover:text-red-500 transition-colors"
              >
                <X size={11} />
              </button>
            </span>
            <span className="text-xs text-[#94A3B8]">
              ({filtered.length} result{filtered.length !== 1 ? "s" : ""})
            </span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Campaign</Th>
                <Th>Date</Th>
                <Th>Services</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-14 text-[#94A3B8] text-sm"
                  >
                    <Filter size={28} className="mx-auto mb-2 opacity-25" />
                    No campaigns match the current filter.
                    <button
                      onClick={() => setFilterStatus("All")}
                      className="block mx-auto mt-2 text-xs text-[#0F4C81] font-medium hover:underline"
                    >
                      Clear filter
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((c, idx) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-9 rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] overflow-hidden flex-shrink-0">
                          {c.image ? (
                            <img
                              src={c.image}
                              alt={c.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="w-full h-full flex items-center justify-center text-sm">
                              🖼️
                            </span>
                          )}
                        </div>
                        <span className="font-medium text-[#0F172A]">
                          {c.name}
                        </span>
                      </div>
                    </Td>
                    <Td className="text-[#64748B]">{c.date}</Td>
                    <Td>
                      <div className="flex flex-wrap gap-1">
                        {(c.services || []).slice(0, 2).map((s) => (
                          <span
                            key={s}
                            className="text-[10px] bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded font-medium"
                          >
                            {s}
                          </span>
                        ))}
                        {(c.services || []).length > 2 && (
                          <span className="text-[10px] bg-[#F1F5F9] text-[#94A3B8] px-2 py-0.5 rounded">
                            +{c.services.length - 2}
                          </span>
                        )}
                      </div>
                    </Td>
                    <Td>
                      <StatusBadge status={c.status} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        <ReorderControls
                          index={idx}
                          total={filtered.length}
                          onMoveUp={() => moveCampaign(idx, -1)}
                          onMoveDown={() => moveCampaign(idx, 1)}
                        />
                        <RowActions
                          onView={() => setViewCampaign(c)}
                          onEdit={() => openEdit(c)}
                          onDelete={() => deleteCampaign(c.id)}
                        />
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── MODAL: View Campaign ── */}
      {viewCampaign && (
        <Modal
          title="Campaign Details"
          isOpen={!!viewCampaign}
          onClose={() => setViewCampaign(null)}
          wide
        >
          <div className="space-y-5">
            {/* Template image */}
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                Template Image
              </p>
              <div className="w-full h-52 rounded-xl border border-[#E2E8F0] bg-[#EFF6FF] overflow-hidden flex items-center justify-center">
                {viewCampaign.image ? (
                  <img
                    src={viewCampaign.image}
                    alt={viewCampaign.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">🖼️</span>
                )}
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {viewCampaign.name}
                </h3>
                <p className="text-sm text-[#64748B] mt-0.5">
                  {viewCampaign.date}
                </p>
              </div>
              <StatusBadge status={viewCampaign.status} />
            </div>

            {/* Body images + videos */}
            {viewCampaign.bodyImages?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Body Images & Videos
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {viewCampaign.bodyImages.map((item: any, i: number) => {
                    const isVideo =
                      item?.isVideo || (typeof item === "string" && false);
                    const src = item?.url ?? item;
                    const name = item?.name ?? `Media ${i + 1}`;
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC] group relative"
                      >
                        {isVideo ? (
                          <video
                            src={src}
                            controls
                            className="w-full aspect-video object-cover"
                          />
                        ) : (
                          <img
                            src={src}
                            alt={name}
                            className="w-full aspect-video object-cover"
                          />
                        )}
                        {isVideo && (
                          <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            <Film size={9} /> VIDEO
                          </div>
                        )}
                        {!isVideo && (
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye size={18} className="text-white" />
                          </div>
                        )}
                        <p className="px-2 py-1.5 text-[10px] text-[#64748B] truncate border-t border-[#E2E8F0]">
                          {name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Services */}
            {viewCampaign.services?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Services Covered
                </p>
                <div className="flex flex-wrap gap-2">
                  {viewCampaign.services.map((s: string) => (
                    <span
                      key={s}
                      className="bg-[#F1F5F9] text-[#0F172A] text-sm px-3 py-1 rounded-full font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* ── MODAL: New Campaign ── */}
      <Modal
        title="New Campaign"
        isOpen={showAdd}
        onClose={() => {
          setShowAdd(false);
          resetAddForm();
        }}
        wide
      >
        <div className="space-y-5">
          {/* Template image */}
          <div>
            <FormLabel>Template Image *</FormLabel>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Required: exactly {CAMP_TEMPLATE_WIDTH}×{CAMP_TEMPLATE_HEIGHT}px,
              max {CAMP_TEMPLATE_MAX_MB}MB (PNG or JPG).
            </p>
            {newTemplateImg ? (
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <img
                  src={newTemplateImg}
                  alt="template"
                  className="w-16 h-10 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">
                    {newTemplateImgName}
                  </p>
                  <p className="text-xs text-[#94A3B8]">Template image ready</p>
                </div>
                <button
                  onClick={() => {
                    setNewTemplateImg(null);
                    setNewTemplateImgName("");
                    if (newTemplateRef.current)
                      newTemplateRef.current.value = "";
                  }}
                  className="text-xs text-[#64748B] hover:text-red-500 font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <UploadZone
                label="Upload Template Image"
                hint={`PNG, JPG — exactly ${CAMP_TEMPLATE_WIDTH}×${CAMP_TEMPLATE_HEIGHT}px, max ${CAMP_TEMPLATE_MAX_MB}MB`}
                onClick={() => newTemplateRef.current?.click()}
              />
            )}
            <input
              ref={newTemplateRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleNewTemplate}
            />
            {newTemplateImgError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newTemplateImgError}
              </p>
            )}
          </div>

          {/* Body media */}
          <div>
            <BodyMediaGrid
              items={newBodyImgs}
              onRemove={(i) =>
                setNewBodyImgs((prev) => prev.filter((_, idx) => idx !== i))
              }
              onAdd={() => newBodyRef.current?.click()}
              fileRef={newBodyRef}
              onFileChange={handleNewBody}
              uploadError={newBodyUploadError}
            />
            {newBodyImgsError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newBodyImgsError}
              </p>
            )}
          </div>

          {/* Name + Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <HMInput
                label="Campaign Name *"
                placeholder="e.g. Nike Summer Sprint"
                value={newName}
                onChange={(v) => {
                  setNewName(v);
                  if (newNameError) setNewNameError("");
                }}
              />
              {newNameError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {newNameError}
                </p>
              )}
            </div>
            <div>
              <FormLabel>Launch Month *</FormLabel>
              <input
                type="month"
                value={newDate}
                onChange={(e) => {
                  setNewDate(e.target.value);
                  if (newDateError) setNewDateError("");
                }}
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
              />
              {newDateError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {newDateError}
                </p>
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <FormLabel>Services *</FormLabel>
            <div className="flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    toggleNewService(s);
                    if (newServicesError) setNewServicesError("");
                  }}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                    newServices.includes(s)
                      ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                      : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0F4C81] hover:text-[#0F4C81]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            {newServicesError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newServicesError}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <Btn
              variant="secondary"
              onClick={() => {
                setShowAdd(false);
                resetAddForm();
              }}
            >
              Cancel
            </Btn>
            <Btn onClick={handleSaveCampaign}>Create Campaign</Btn>
          </div>
        </div>
      </Modal>

      {/* ── MODAL: Edit Campaign ── */}
      {editCampaign && (
        <Modal
          title="Edit Campaign"
          isOpen={!!editCampaign}
          onClose={() => setEditCampaign(null)}
          wide
        >
          <div className="space-y-5">
            {/* Template image */}
            <div>
              <FormLabel>Template Image *</FormLabel>
              <p className="text-xs text-[#94A3B8] mb-1.5">
                Required: exactly {CAMP_TEMPLATE_WIDTH}×{CAMP_TEMPLATE_HEIGHT}
                px, max {CAMP_TEMPLATE_MAX_MB}MB (PNG or JPG).
              </p>
              {editTemplateImg ? (
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <img
                    src={editTemplateImg}
                    alt="template"
                    className="w-16 h-10 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                      {editTemplateImgName || "Current template"}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      Template image ready
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditTemplateImg(null);
                      setEditTemplateImgName("");
                      if (editTemplateRef.current)
                        editTemplateRef.current.value = "";
                    }}
                    className="text-xs text-[#64748B] hover:text-red-500 font-medium transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <UploadZone
                  label="Upload Template Image"
                  hint={`PNG, JPG — exactly ${CAMP_TEMPLATE_WIDTH}×${CAMP_TEMPLATE_HEIGHT}px, max ${CAMP_TEMPLATE_MAX_MB}MB`}
                  onClick={() => editTemplateRef.current?.click()}
                />
              )}
              <input
                ref={editTemplateRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleEditTemplate}
              />
              {editTemplateImgError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editTemplateImgError}
                </p>
              )}
            </div>

            {/* Body media */}
            <div>
              <BodyMediaGrid
                items={editBodyImgs}
                onRemove={(i) =>
                  setEditBodyImgs((prev) => prev.filter((_, idx) => idx !== i))
                }
                onAdd={() => editBodyRef.current?.click()}
                fileRef={editBodyRef}
                onFileChange={handleEditBody}
                uploadError={editBodyUploadError}
              />
              {editBodyImgsError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editBodyImgsError}
                </p>
              )}
            </div>

            {/* Name + Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <HMInput
                  label="Campaign Name *"
                  placeholder="e.g. Nike Summer Sprint"
                  value={editName}
                  onChange={(v) => {
                    setEditName(v);
                    if (editNameError) setEditNameError("");
                  }}
                />
                {editNameError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editNameError}
                  </p>
                )}
              </div>
              <div>
                <FormLabel>Launch Month *</FormLabel>
                <input
                  type="month"
                  value={editDate}
                  onChange={(e) => {
                    setEditDate(e.target.value);
                    if (editDateError) setEditDateError("");
                  }}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                />
                {editDateError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editDateError}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <HMSelect
              label="Status *"
              value={editStatus}
              onChange={setEditStatus}
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Completed</option>
            </HMSelect>

            {/* Services */}
            <div>
              <FormLabel>Services *</FormLabel>
              <div className="flex flex-wrap gap-2">
                {SERVICE_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      toggleEditService(s);
                      if (editServicesError) setEditServicesError("");
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      editServices.includes(s)
                        ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                        : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0F4C81] hover:text-[#0F4C81]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {editServicesError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editServicesError}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <Btn variant="secondary" onClick={() => setEditCampaign(null)}>
                Cancel
              </Btn>
              <Btn onClick={handleUpdateCampaign}>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};