import { useState,useRef } from "react";
import { exhibitionsData } from "./Data";
import { PageHeader } from "./components/ui/Pageheader";
import { Btn } from "./components/ui/Btn";
import { Card } from "./components/ui/card";
import { Plus,Search,Filter,X ,Film} from "lucide-react";
import { FormLabel } from "./components/ui/FormLabel";
import { Th } from "./components/ui/Th";
import { Td } from "./components/ui/Td";
import { UploadZone } from "./components/ui/UploadZone";
import { Modal } from "./components/ui/Modal";
import { ReorderControls } from "./components/ui/ReorderControls";
import { RowActions } from "./components/ui/RowActions";
import { StatusBadge } from "./components/ui/Statusbadge";
import { HMInput } from "./components/ui/HMInput";
import { HMSelect } from "./components/ui/HMSelect";
const EXH_TEMPLATE_WIDTH = 800;
const EXH_TEMPLATE_HEIGHT = 700;
const EXH_TEMPLATE_MAX_MB = 10;

const EXH_BODY_WIDTH = 1920;
const EXH_BODY_HEIGHT = 1080;
const EXH_BODY_MAX_MB = 10;
const readFileAsData = (
  file: File,
): Promise<{ url: string; name: string; isVideo: boolean }> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      resolve({
        url: ev.target?.result as string,
        name: file.name,
        isVideo: file.type.startsWith("video/"),
      });
    reader.readAsDataURL(file);
  });
const getImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
};
const validateExhBodyFile = async (file: File): Promise<string> => {
  if (file.size > EXH_BODY_MAX_MB * 1024 * 1024) {
    return `File must be max ${EXH_BODY_MAX_MB}MB (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }
  if (file.type.startsWith("video/")) {
    return ""; // videos: size-only check, no dimension validation
  }
  if (!file.type.startsWith("image/")) {
    return "Only images and videos are supported.";
  }
  try {
    const { width, height } = await getImageDimensions(file);
    if (width !== EXH_BODY_WIDTH || height !== EXH_BODY_HEIGHT) {
      return `Body image must be exactly ${EXH_BODY_WIDTH}x${EXH_BODY_HEIGHT}px (selected: ${width}x${height}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};
const readFileAsExhibitionData = (
  file: File,
): Promise<{ url: string; name: string; isVideo: boolean }> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) =>
      resolve({
        url: ev.target?.result as string,
        name: file.name,
        isVideo: file.type.startsWith("video/"),
      });
    reader.readAsDataURL(file);
  });
const getExhibitionsImageDimensions = (
  file: File,
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
};
const validateExhTemplateFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    return "Template must be an image file (PNG or JPG).";
  }
  if (file.size > EXH_TEMPLATE_MAX_MB * 1024 * 1024) {
    return `Template image must be max ${EXH_TEMPLATE_MAX_MB}MB (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }
  try {
    const { width, height } = await getExhibitionsImageDimensions(file);
    if (width !== EXH_TEMPLATE_WIDTH || height !== EXH_TEMPLATE_HEIGHT) {
      return `Template image must be exactly ${EXH_TEMPLATE_WIDTH}x${EXH_TEMPLATE_HEIGHT}px (selected: ${width}x${height}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};
export const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState(exhibitionsData);

  // Search + filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  // View / Edit
  const [viewExhibition, setViewExhibition] = useState(null);
  const [editExhibition, setEditExhibition] = useState(null);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);

  // Add form fields
  const [newName, setNewName] = useState("");
  const [newHighlights, setNewHighlights] = useState("");
  const [newStatus, setNewStatus] = useState("Active");

  const [newTemplateImage, setNewTemplateImage] = useState(null);
  const [newTemplateImageName, setNewTemplateImageName] = useState("");
  const [newBodyImages, setNewBodyImages] = useState([]);

  const newTemplateImageRef = useRef(null);
  const newBodyImageRef = useRef(null);

  // Edit form fields
  const [editName, setEditName] = useState("");
  const [editHighlights, setEditHighlights] = useState("");
  const [editStatus, setEditStatus] = useState("Active");

  const [editTemplateImage, setEditTemplateImage] = useState(null);
  const [editTemplateImageName, setEditTemplateImageName] = useState("");
  const [editBodyImages, setEditBodyImages] = useState([]);

  const editTemplateImageRef = useRef(null);
  const editBodyImageRef = useRef(null);

  const allStatuses = ["All", "Active", "Paused", "Completed"];

  // ── Validation error state ──
  const [newNameError, setNewNameError] = useState("");
  const [newHighlightsError, setNewHighlightsError] = useState("");
  const [newTemplateImageError, setNewTemplateImageError] = useState("");
  const [newBodyImagesError, setNewBodyImagesError] = useState("");
  const [newBodyUploadError, setNewBodyUploadError] = useState("");

  const [editNameError, setEditNameError] = useState("");
  const [editHighlightsError, setEditHighlightsError] = useState("");
  const [editTemplateImageError, setEditTemplateImageError] = useState("");
  const [editBodyImagesError, setEditBodyImagesError] = useState("");
  const [editBodyUploadError, setEditBodyUploadError] = useState("");

  const filteredExhibitions = exhibitions.filter((exhibition) => {
    const matchesSearch = exhibition.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchesStatus =
      filterStatus === "All" || exhibition.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const activeFilterCount = filterStatus !== "All" ? 1 : 0;

  const deleteExhibition = (exhibitionId) => {
    setExhibitions((prev) =>
      prev.filter((exhibition) => exhibition.id !== exhibitionId),
    );
  };

  const moveExhibition = (index, direction) => {
    setExhibitions((prev) => {
      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= prev.length) return prev;

      const updated = [...prev];

      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

      return updated;
    });
  };

  const resetAddForm = () => {
    setNewName("");
    setNewHighlights("");
    setNewStatus("Active");

    setNewTemplateImage(null);
    setNewTemplateImageName("");
    setNewBodyImages([]);

    setNewNameError("");
    setNewHighlightsError("");
    setNewTemplateImageError("");
    setNewBodyImagesError("");
    setNewBodyUploadError("");

    if (newTemplateImageRef.current) {
      newTemplateImageRef.current.value = "";
    }

    if (newBodyImageRef.current) {
      newBodyImageRef.current.value = "";
    }
  };

  const openEditExhibition = (exhibition) => {
    setEditExhibition(exhibition);

    setEditName(exhibition.name);
    setEditHighlights(exhibition.highlights);
    setEditStatus(exhibition.status);

    setEditTemplateImage(exhibition.templateImage || exhibition.image || null);
    setEditTemplateImageName(exhibition.templateImageName || "");

    if (Array.isArray(exhibition.bodyImages)) {
      setEditBodyImages(exhibition.bodyImages);
    } else if (exhibition.bodyImage) {
      setEditBodyImages([
        {
          url: exhibition.bodyImage,
          name: exhibition.bodyImageName || "Body image",
        },
      ]);
    } else {
      setEditBodyImages([]);
    }

    setEditNameError("");
    setEditHighlightsError("");
    setEditTemplateImageError("");
    setEditBodyImagesError("");
    setEditBodyUploadError("");

    if (editTemplateImageRef.current) {
      editTemplateImageRef.current.value = "";
    }

    if (editBodyImageRef.current) {
      editBodyImageRef.current.value = "";
    }
  };

  const handleNewImageChange = async (event, imageType) => {
    const files = Array.from(event.target.files || []) as File[];

    if (!files.length) return;

    if (imageType === "template") {
      const file = files[0];
      const error = await validateExhTemplateFile(file);
      if (error) {
        setNewTemplateImageError(error);
        event.target.value = "";
        return;
      }
      setNewTemplateImageError("");
      const { url, name } = await readFileAsExhibitionData(file);
      setNewTemplateImage(url);
      setNewTemplateImageName(name);
      event.target.value = "";
      return;
    }

    const remainingSlots = 3 - newBodyImages.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    for (const file of selectedFiles) {
      const error = await validateExhBodyFile(file);
      if (error) {
        setNewBodyUploadError(error);
        continue;
      }
      setNewBodyUploadError("");
      const item = await readFileAsData(file);
      setNewBodyImages((prev) => (prev.length < 3 ? [...prev, item] : prev));
    }

    event.target.value = "";
  };

  const handleEditImageChange = async (event, imageType) => {
    const files = Array.from(event.target.files || []) as File[];

    if (!files.length) return;

    if (imageType === "template") {
      const file = files[0];
      const error = await validateExhTemplateFile(file);
      if (error) {
        setEditTemplateImageError(error);
        event.target.value = "";
        return;
      }
      setEditTemplateImageError("");
      const { url, name } = await readFileAsData(file);
      setEditTemplateImage(url);
      setEditTemplateImageName(name);
      event.target.value = "";
      return;
    }

    const remainingSlots = 3 - editBodyImages.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    for (const file of selectedFiles) {
      const error = await validateExhBodyFile(file);
      if (error) {
        setEditBodyUploadError(error);
        continue;
      }
      setEditBodyUploadError("");
      const item = await readFileAsData(file);
      setEditBodyImages((prev) => (prev.length < 3 ? [...prev, item] : prev));
    }

    event.target.value = "";
  };

  const handleSaveExhibition = () => {
    let hasError = false;

    if (!newTemplateImage) {
      setNewTemplateImageError("Template image is mandatory.");
      hasError = true;
    } else {
      setNewTemplateImageError("");
    }

    if (newBodyImages.length === 0) {
      setNewBodyImagesError("At least one body image or video is mandatory.");
      hasError = true;
    } else {
      setNewBodyImagesError("");
    }

    if (!newName.trim()) {
      setNewNameError("Exhibition Name is mandatory.");
      hasError = true;
    } else {
      setNewNameError("");
    }

    if (!newHighlights.trim()) {
      setNewHighlightsError("Highlights is mandatory.");
      hasError = true;
    } else {
      setNewHighlightsError("");
    }

    if (hasError) return;

    setExhibitions((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        highlights: newHighlights.trim(),
        status: newStatus,

        image: newTemplateImage || newBodyImages[0]?.url || null,

        templateImage: newTemplateImage,
        templateImageName: newTemplateImageName,

        bodyImages: newBodyImages,
      },
    ]);

    resetAddForm();
    setShowAddModal(false);
  };

  const handleUpdateExhibition = () => {
    let hasError = false;

    if (!editTemplateImage) {
      setEditTemplateImageError("Template image is mandatory.");
      hasError = true;
    } else {
      setEditTemplateImageError("");
    }

    if (editBodyImages.length === 0) {
      setEditBodyImagesError("At least one body image or video is mandatory.");
      hasError = true;
    } else {
      setEditBodyImagesError("");
    }

    if (!editName.trim()) {
      setEditNameError("Exhibition Name is mandatory.");
      hasError = true;
    } else {
      setEditNameError("");
    }

    if (!editHighlights.trim()) {
      setEditHighlightsError("Highlights is mandatory.");
      hasError = true;
    } else {
      setEditHighlightsError("");
    }

    if (!editExhibition || hasError) return;

    setExhibitions((prev) =>
      prev.map((exhibition) =>
        exhibition.id === editExhibition.id
          ? {
              ...exhibition,
              name: editName.trim(),
              highlights: editHighlights.trim(),
              status: editStatus,

              templateImage: editTemplateImage,
              templateImageName: editTemplateImageName,
              bodyImages: editBodyImages,

              image: editTemplateImage || editBodyImages[0]?.url || null,
            }
          : exhibition,
      ),
    );

    setEditExhibition(null);
    setEditBodyImages([]);
    setEditNameError("");
    setEditHighlightsError("");
    setEditTemplateImageError("");
    setEditBodyImagesError("");
    setEditBodyUploadError("");
  };

  return (
    <div>
      <PageHeader
        title="Exhibitions"
        subtitle="Track all exhibition projects, booth specifications, and attendance figures."
        action={
          <Btn icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Exhibition
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
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by exhibition name..."
              className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                showFilter || activeFilterCount > 0
                  ? "bg-[#EFF6FF] text-[#0F4C81] border-[#BFDBFE]"
                  : "bg-white text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]"
              }`}
            >
              <Filter size={14} />
              Filter by Status
              {activeFilterCount > 0 && (
                <span className="ml-0.5 w-5 h-5 rounded-full bg-[#0F4C81] text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              )}
            </button>

            {showFilter && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
                    Status
                  </p>

                  {filterStatus !== "All" && (
                    <button
                      onClick={() => setFilterStatus("All")}
                      className="text-xs text-[#64748B] hover:text-red-500 font-medium"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {allStatuses.map((status) => {
                    const isActive = filterStatus === status;

                    const activeColors = {
                      All: "bg-[#0F4C81] text-white border-[#0F4C81]",
                      Active: "bg-emerald-500 text-white border-emerald-500",
                      Paused: "bg-yellow-500 text-white border-yellow-500",
                      Completed: "bg-blue-500 text-white border-blue-500",
                    };

                    return (
                      <button
                        key={status}
                        onClick={() => {
                          setFilterStatus(status);
                          setShowFilter(false);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          isActive
                            ? activeColors[status]
                            : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0F4C81] hover:text-[#0F4C81]"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {filterStatus !== "All" && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <span className="text-xs text-[#64748B] font-medium">
              Filtered by:
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#EFF6FF] text-[#0F4C81] text-xs font-medium rounded-full border border-[#BFDBFE]">
              ● {filterStatus}
              <button
                onClick={() => setFilterStatus("All")}
                className="ml-0.5 hover:text-red-500"
              >
                <X size={11} />
              </button>
            </span>

            <span className="text-xs text-[#94A3B8]">
              ({filteredExhibitions.length} result
              {filteredExhibitions.length !== 1 ? "s" : ""})
            </span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Exhibition</Th>
                <Th>Highlights</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>

            <tbody>
              {filteredExhibitions.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-14 text-[#94A3B8] text-sm"
                  >
                    <Filter size={28} className="mx-auto mb-2 opacity-25" />
                    No exhibitions match the current filter.
                    <button
                      onClick={() => {
                        setFilterStatus("All");
                        setSearchTerm("");
                      }}
                      className="block mx-auto mt-2 text-xs text-[#0F4C81] font-medium hover:underline"
                    >
                      Clear filter
                    </button>
                  </td>
                </tr>
              ) : (
                filteredExhibitions.map((exhibition, idx) => (
                  <tr
                    key={exhibition.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <img
                          src={exhibition.image}
                          alt={exhibition.name}
                          className="w-14 h-9 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
                        />

                        <span className="font-medium text-[#0F172A]">
                          {exhibition.name}
                        </span>
                      </div>
                    </Td>

                    <Td className="text-[#64748B] max-w-xs">
                      {exhibition.highlights}
                    </Td>

                    <Td>
                      <StatusBadge status={exhibition.status} />
                    </Td>

                    <Td>
                      <div className="flex items-center gap-1">
                        <ReorderControls
                          index={idx}
                          total={filteredExhibitions.length}
                          onMoveUp={() => moveExhibition(idx, -1)}
                          onMoveDown={() => moveExhibition(idx, 1)}
                        />

                        <RowActions
                          onView={() => setViewExhibition(exhibition)}
                          onEdit={() => openEditExhibition(exhibition)}
                          onDelete={() => deleteExhibition(exhibition.id)}
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

      {/* Add modal */}
      <Modal
        title="Add New Exhibition"
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetAddForm();
        }}
        wide
      >
        <div className="space-y-4">
          {/* Template Image */}
          <div>
            <FormLabel>Template Image *</FormLabel>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Required: exactly {EXH_TEMPLATE_WIDTH}x{EXH_TEMPLATE_HEIGHT}px,
              max {EXH_TEMPLATE_MAX_MB}MB (PNG or JPG).
            </p>

            {newTemplateImage ? (
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <img
                  src={newTemplateImage}
                  alt="template preview"
                  className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">
                    {newTemplateImageName}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    Template image ready to save
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setNewTemplateImage(null);
                    setNewTemplateImageName("");
                    setNewTemplateImageError("");

                    if (newTemplateImageRef.current) {
                      newTemplateImageRef.current.value = "";
                    }
                  }}
                  className="text-xs text-[#64748B] hover:text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <UploadZone
                label="Upload Template Image"
                hint={`PNG, JPG — exactly ${EXH_TEMPLATE_WIDTH}x${EXH_TEMPLATE_HEIGHT}px, max ${EXH_TEMPLATE_MAX_MB}MB`}
                onClick={() => newTemplateImageRef.current?.click()}
              />
            )}

            <input
              ref={newTemplateImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleNewImageChange(event, "template")}
            />
            {newTemplateImageError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newTemplateImageError}
              </p>
            )}
          </div>

          {/* Body Media */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <FormLabel>Body Media — Images & Videos *</FormLabel>
              <span className="text-xs text-[#94A3B8]">
                {newBodyImages.length}/3 files
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-2">
              Images: exactly {EXH_BODY_WIDTH}x{EXH_BODY_HEIGHT}px, max{" "}
              {EXH_BODY_MAX_MB}MB &nbsp;|&nbsp; Videos: max {EXH_BODY_MAX_MB}
              MB. At least one file is mandatory.
            </p>

            {newBodyImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-3">
                {newBodyImages.map((image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative border border-[#E2E8F0] rounded-xl overflow-hidden"
                  >
                    {image.isVideo ? (
                      <video
                        src={image.url}
                        className="w-full h-24 object-cover"
                        muted
                      />
                    ) : (
                      <img
                        src={image.url}
                        alt={`body ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    )}
                    {image.isVideo && (
                      <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Film size={9} /> VIDEO
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setNewBodyImages((prev) =>
                          prev.filter((_, imageIndex) => imageIndex !== index),
                        )
                      }
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-red-500 text-xs font-bold"
                      title="Remove media"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {newBodyImages.length < 3 && (
              <UploadZone
                label={`Upload Body Media (${newBodyImages.length}/3)`}
                hint={`PNG, JPG — exactly ${EXH_BODY_WIDTH}x${EXH_BODY_HEIGHT}px; MP4 — max ${EXH_BODY_MAX_MB}MB`}
                onClick={() => newBodyImageRef.current?.click()}
              />
            )}

            <input
              ref={newBodyImageRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(event) => handleNewImageChange(event, "body")}
            />
            {newBodyUploadError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newBodyUploadError}
              </p>
            )}
            {newBodyImagesError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newBodyImagesError}
              </p>
            )}
          </div>

          <div>
            <HMInput
              label="Exhibition Name *"
              placeholder="e.g. India International Trade Fair"
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
            <HMInput
              label="Highlights *"
              placeholder="Describe exhibition highlights"
              value={newHighlights}
              onChange={(v) => {
                setNewHighlights(v);
                if (newHighlightsError) setNewHighlightsError("");
              }}
            />
            {newHighlightsError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newHighlightsError}
              </p>
            )}
          </div>

          <HMSelect label="Status *" value={newStatus} onChange={setNewStatus}>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </HMSelect>

          <div className="flex gap-3 pt-1">
            <Btn
              variant="secondary"
              onClick={() => {
                setShowAddModal(false);
                resetAddForm();
              }}
            >
              Cancel
            </Btn>

            <Btn onClick={handleSaveExhibition}>Create Exhibition</Btn>
          </div>
        </div>
      </Modal>

      {/* View modal */}
      {viewExhibition && (
        <Modal
          title="Exhibition Details"
          isOpen={!!viewExhibition}
          onClose={() => setViewExhibition(null)}
          wide
        >
          <div className="space-y-5">
            <img
              src={viewExhibition.image}
              alt={viewExhibition.name}
              className="w-full h-52 rounded-xl object-cover border border-[#E2E8F0]"
            />

            {viewExhibition.bodyImages?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                  Body Images & Videos
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {viewExhibition.bodyImages.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="relative border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAFC]"
                    >
                      {image.isVideo ? (
                        <video
                          src={image.url}
                          controls
                          className="w-full h-36 object-cover"
                        />
                      ) : (
                        <img
                          src={image.url}
                          alt={`${viewExhibition.name} body image ${index + 1}`}
                          className="w-full h-36 object-cover"
                        />
                      )}
                      {image.isVideo && (
                        <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Film size={9} /> VIDEO
                        </div>
                      )}

                      <p className="px-3 py-2 text-xs text-[#64748B] truncate">
                        {image.name || `Body Media ${index + 1}`}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {viewExhibition.name}
                </h3>
              </div>

              <StatusBadge status={viewExhibition.status} />
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                Highlights
              </p>

              <p className="text-sm text-[#0F172A]">
                {viewExhibition.highlights}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {editExhibition && (
        <Modal
          title="Edit Exhibition"
          isOpen={!!editExhibition}
          onClose={() => {
            setEditExhibition(null);
            setEditBodyImages([]);
            setEditNameError("");
            setEditHighlightsError("");
            setEditTemplateImageError("");
            setEditBodyImagesError("");
            setEditBodyUploadError("");
          }}
          wide
        >
          <div className="space-y-4">
            {/* Template Image */}
            <div>
              <FormLabel>Template Image *</FormLabel>
              <p className="text-xs text-[#94A3B8] mb-1.5">
                Required: exactly {EXH_TEMPLATE_WIDTH}x{EXH_TEMPLATE_HEIGHT}
                px, max {EXH_TEMPLATE_MAX_MB}MB (PNG or JPG).
              </p>

              {editTemplateImage ? (
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <img
                    src={editTemplateImage}
                    alt="template preview"
                    className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                      {editTemplateImageName || "Current template image"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditTemplateImage(null);
                      setEditTemplateImageName("");
                      setEditTemplateImageError("");
                      if (editTemplateImageRef.current) {
                        editTemplateImageRef.current.value = "";
                      }
                    }}
                    className="text-xs text-[#64748B] hover:text-red-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <UploadZone
                  label="Upload Template Image"
                  hint={`PNG, JPG — exactly ${EXH_TEMPLATE_WIDTH}x${EXH_TEMPLATE_HEIGHT}px, max ${EXH_TEMPLATE_MAX_MB}MB`}
                  onClick={() => editTemplateImageRef.current?.click()}
                />
              )}

              <input
                ref={editTemplateImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(event) => handleEditImageChange(event, "template")}
              />
              {editTemplateImageError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editTemplateImageError}
                </p>
              )}
            </div>

            {/* Body Media — maximum 3 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Body Media — Images & Videos *</FormLabel>
                <span className="text-xs text-[#94A3B8]">
                  {editBodyImages.length}/3 files
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mb-2">
                Images: exactly {EXH_BODY_WIDTH}x{EXH_BODY_HEIGHT}px, max{" "}
                {EXH_BODY_MAX_MB}MB &nbsp;|&nbsp; Videos: max {EXH_BODY_MAX_MB}
                MB. At least one file is mandatory.
              </p>

              {editBodyImages.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {editBodyImages.map((image, index) => (
                    <div
                      key={`${image.name}-${index}`}
                      className="relative border border-[#E2E8F0] rounded-xl overflow-hidden"
                    >
                      {image.isVideo ? (
                        <video
                          src={image.url}
                          className="w-full h-24 object-cover"
                          muted
                        />
                      ) : (
                        <img
                          src={image.url}
                          alt={`body ${index + 1}`}
                          className="w-full h-24 object-cover"
                        />
                      )}
                      {image.isVideo && (
                        <div className="absolute top-1.5 left-1.5 bg-black/60 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5">
                          <Film size={9} /> VIDEO
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setEditBodyImages((prev) =>
                            prev.filter(
                              (_, imageIndex) => imageIndex !== index,
                            ),
                          )
                        }
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-red-500 text-xs font-bold"
                        title="Remove media"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {editBodyImages.length < 3 && (
                <UploadZone
                  label={`Upload Body Media (${editBodyImages.length}/3)`}
                  hint={`PNG, JPG — exactly ${EXH_BODY_WIDTH}x${EXH_BODY_HEIGHT}px; MP4 — max ${EXH_BODY_MAX_MB}MB`}
                  onClick={() => editBodyImageRef.current?.click()}
                />
              )}

              <input
                ref={editBodyImageRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={(event) => handleEditImageChange(event, "body")}
              />
              {editBodyUploadError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editBodyUploadError}
                </p>
              )}
              {editBodyImagesError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editBodyImagesError}
                </p>
              )}
            </div>

            <div>
              <HMInput
                label="Exhibition Name *"
                value={editName}
                onChange={(v) => {
                  setEditName(v);
                  if (editNameError) setEditNameError("");
                }}
                placeholder="Enter exhibition name"
              />
              {editNameError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editNameError}
                </p>
              )}
            </div>

            <div>
              <HMInput
                label="Highlights *"
                value={editHighlights}
                onChange={(v) => {
                  setEditHighlights(v);
                  if (editHighlightsError) setEditHighlightsError("");
                }}
                placeholder="Enter exhibition highlights"
              />
              {editHighlightsError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editHighlightsError}
                </p>
              )}
            </div>

            <HMSelect
              label="Status *"
              value={editStatus}
              onChange={setEditStatus}
            >
              <option>Active</option>
              <option>Paused</option>
              <option>Completed</option>
            </HMSelect>

            <div className="flex gap-3 pt-1">
              <Btn
                variant="secondary"
                onClick={() => {
                  setEditExhibition(null);
                  setEditBodyImages([]);
                  setEditNameError("");
                  setEditHighlightsError("");
                  setEditTemplateImageError("");
                  setEditBodyImagesError("");
                  setEditBodyUploadError("");
                }}
              >
                Cancel
              </Btn>

              <Btn onClick={handleUpdateExhibition}>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};