import { useState,useRef } from "react";
import { caseStudies } from "./Data";
import { FieldError } from "./components/ui/FieldError";
import { FormLabel } from "./components/ui/FormLabel";
import { Upload } from "lucide-react";
import { Btn } from "./components/ui/Btn";
import { Plus,MapPin,Edit2,Trash2,X } from "lucide-react";
import { PageHeader } from "./components/ui/Pageheader";
import { Card } from "./components/ui/card";
import { Modal } from "./components/ui/Modal";
import { UploadZone } from "./components/ui/UploadZone";
import { HMInput } from "./components/ui/HMInput";
import { HMSelect } from "./components/ui/HMSelect";
const blankForm = () => ({
  id: null,
  name: "",
  location: "",
  year: "",
  attendance: "",
  description: "",
  image: "",
  featuredImages: [],
});
export const CaseStudiesPage = () => {
  const [caseStudiesList, setCaseStudiesList] = useState(
    caseStudies.map((cs) => ({
      ...cs,
      image: cs.image || "",
      featuredImages: cs.featuredImages || [],
    })),
  );
  const [activeId, setActiveId] = useState(caseStudies[0].id);
  const [modal, setModal] = useState(null); // null | "add" | "edit"
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [form, setForm] = useState(blankForm());
  const [errors, setErrors] = useState({}); // ← NEW: validation errors

  // Derived: recomputes whenever activeId or caseStudiesList changes
  const activeStudy =
    caseStudiesList.find((item) => item.id === activeId) || caseStudiesList[0];

  const templateImageRef = useRef(null);
  const featuredImagesRef = useRef(null);

  // ── helpers ───────────────────────────────────────────────────────────────

  const clearErrors = () => setErrors({});

  const openModal = (mode, cs = null) => {
    setForm(cs ? { ...cs } : blankForm());
    clearErrors();
    setModal(mode);
  };

  const closeModal = () => {
    setModal(null);
    setForm(blankForm());
    clearErrors();
  };

  // ── image upload handlers ─────────────────────────────────────────────────

  /**
   * Cover image — must be exactly 800 × 700 px.
   */
  const handleTemplateImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth !== 800 || img.naturalHeight !== 700) {
          setErrors((prev) => ({
            ...prev,
            image: `Cover image must be exactly 800×700 px (uploaded: ${img.naturalWidth}×${img.naturalHeight} px).`,
          }));
          return;
        }
        // Clear any existing cover-image error
        setErrors((prev) => {
          const next = { ...prev };
          delete next.image;
          return next;
        });
        setForm((prev) => ({ ...prev, image: ev.target.result }));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  /**
   * Featured images — each must be exactly 1200 × 900 px; max 4 total.
   */
  const handleFeaturedImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img = new Image();
        img.onload = () => {
          if (img.naturalWidth !== 1000 || img.naturalHeight !== 700) {
            setErrors((prev) => ({
              ...prev,
              featuredImages: `Each featured image must be exactly 1200×900 px (got ${img.naturalWidth}×${img.naturalHeight} px).`,
            }));
            return;
          }
          setForm((prev) => {
            if (prev.featuredImages.length >= 4) return prev; // max 4
            // Clear featured-image errors once a valid image is accepted
            setErrors((p) => {
              const next = { ...p };
              delete next.featuredImages;
              return next;
            });
            return {
              ...prev,
              featuredImages: [...prev.featuredImages, ev.target.result],
            };
          });
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
    e.target.value = "";
  };

  const removeFeaturedImage = (index) =>
    setForm((prev) => ({
      ...prev,
      featuredImages: prev.featuredImages.filter((_, i) => i !== index),
    }));

  // ── save / edit / delete ──────────────────────────────────────────────────

  const validate = () => {
    const errs = {};
    if (!form.image) errs.image = "Cover image is required (800×700 px).";
    if (form.featuredImages.length < 4)
      errs.featuredImages = `${4 - form.featuredImages.length} more featured image(s) required (1200×900 px, max 4).`;
    if (!form.name.trim()) errs.name = "Case study name is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    if (!form.year.trim()) errs.year = "Year is required.";
    if (!form.attendance.trim()) errs.attendance = "Attendance is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    return errs;
  };

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (modal === "add") {
      const newId = Date.now();
      setCaseStudiesList((prev) => [...prev, { ...form, id: newId }]);
      setActiveId(newId);
    } else {
      setCaseStudiesList((prev) =>
        prev.map((cs) => (cs.id === form.id ? { ...form } : cs)),
      );
      setActiveId(form.id);
    }
    closeModal();
  };

  const handleDelete = () => {
    const remaining = caseStudiesList.filter((cs) => cs.id !== deleteTarget.id);
    setCaseStudiesList(remaining);
    if (activeId === deleteTarget.id && remaining.length > 0) {
      setActiveId(remaining[0].id);
    }
    setDeleteTarget(null);
  };

  // ── featured-images grid (used inside the modal) ──────────────────────────

  const renderFeaturedImagesGrid = () => (
    <div>
      <FormLabel>
        Featured Images ({form.featuredImages.length}/4)
        <span className="text-red-400 ml-0.5">*</span>
      </FormLabel>

      {/* 4-column grid: up to 4 thumbnails + one "Add" slot */}
      <div className="grid grid-cols-4 gap-3">
        {form.featuredImages.map((img, i) => (
          <div
            key={i}
            className="relative rounded-xl border border-[#E2E8F0] overflow-hidden aspect-square bg-[#F8FAFC] group"
          >
            <img
              src={img}
              alt={`featured-${i}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeFeaturedImage(i)}
              className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-colors"
            >
              <X size={13} />
            </button>
          </div>
        ))}

        {form.featuredImages.length < 4 && (
          <div
            onClick={() => featuredImagesRef.current?.click()}
            className={`border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center hover:border-[#0F4C81] hover:bg-[#F8FBFF] transition-all cursor-pointer group p-2 ${
              errors.featuredImages
                ? "border-red-400 bg-red-50"
                : "border-[#E2E8F0]"
            }`}
          >
            <div className="w-9 h-9 bg-[#F1F5F9] group-hover:bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-2 transition-colors">
              <Upload
                size={15}
                className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors"
              />
            </div>
            <p className="text-[11px] font-semibold text-[#0F172A]">
              Add Image
            </p>
            <p className="text-[10px] text-[#94A3B8] mt-0.5">
              {form.featuredImages.length}/4
            </p>
          </div>
        )}
      </div>

      <input
        ref={featuredImagesRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFeaturedImagesChange}
      />

      <p className="text-[12px] text-[#94A3B8] mt-2">
        PNG, JPG up to 50MB — exactly 1200×900 px, max 4 images
      </p>

      <FieldError message={errors.featuredImages} />
    </div>
  );

  // ── render ────────────────────────────────────────────────────────────────

  return (
    <div>
      <PageHeader
        title="Case Studies"
        subtitle="Manage in-depth case studies for your most impactful projects."
        action={
          <Btn icon={Plus} onClick={() => openModal("add")}>
            Add Case Study
          </Btn>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        {/* ── Detail Panel (left, col-span-2) ── */}
        <div className="col-span-2">
          <Card className="overflow-hidden">
            {/* Cover image — displayed at 800:700 aspect ratio */}
            {activeStudy.image ? (
              <img
                src={activeStudy.image}
                className="w-full object-cover"
                style={{ aspectRatio: "800 / 700" }}
                alt={activeStudy.name}
              />
            ) : (
              <div
                className="flex items-center justify-center bg-[#F1F5F9] text-[#94A3B8] text-sm"
                style={{ aspectRatio: "800 / 700" }}
              >
                No image
              </div>
            )}

            <div className="p-6 space-y-4">
              {/* Title + Edit / Delete */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0F172A]">
                    {activeStudy.name || "—"}
                  </h2>
                  <p className="text-sm text-[#64748B] mt-0.5 flex items-center gap-1.5">
                    <MapPin size={12} />
                    {activeStudy.location || "—"}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Btn
                    small
                    icon={Edit2}
                    variant="secondary"
                    onClick={() => openModal("edit", activeStudy)}
                  >
                    Edit
                  </Btn>
                  <Btn
                    small
                    icon={Trash2}
                    variant="danger"
                    onClick={() => setDeleteTarget(activeStudy)}
                  >
                    Delete
                  </Btn>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Location
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {activeStudy.location || "—"}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Year
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {activeStudy.year || "—"}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Attendance
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {activeStudy.attendance || "—"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Description
                </p>
                <p className="text-sm text-[#0F172A] leading-relaxed">
                  {activeStudy.description || "No description provided."}
                </p>
              </div>

              {/* Featured images (view-only, shown only when present) */}
              {activeStudy.featuredImages?.length > 0 && (
                <div>
                  <FormLabel>Featured Images</FormLabel>
                  <div className="grid grid-cols-4 gap-3">
                    {activeStudy.featuredImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setLightbox(img)}
                        className="rounded-xl border border-[#E2E8F0] overflow-hidden aspect-square bg-[#F8FAFC] cursor-pointer group relative"
                      >
                        <img
                          src={img}
                          alt={`featured-${i}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Eye size={18} className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* ── Sidebar List (right) ── */}
        <div>
          <p className="text-sm font-semibold text-[#0F172A] mb-3">
            All Case Studies
          </p>
          <div className="space-y-3">
            {caseStudiesList.map((cs) => (
              <Card
                key={cs.id}
                className={`overflow-hidden transition-all cursor-pointer ${
                  cs.id === activeId
                    ? "ring-2 ring-[#0F4C81]"
                    : "hover:border-[#0F4C81]/30"
                }`}
                onClick={() => setActiveId(cs.id)}
              >
                <div className="flex gap-3 p-3">
                  {cs.image ? (
                    <img
                      src={cs.image}
                      alt={cs.name}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-14 rounded-lg bg-[#EFF6FF] flex-shrink-0 flex items-center justify-center text-xs text-[#94A3B8]">
                      No img
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0F172A] leading-snug line-clamp-2">
                      {cs.name}
                    </p>
                    <p className="text-[10px] text-[#94A3B8] mt-1">
                      {cs.location} · {cs.year}
                    </p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">
                      {cs.attendance} attendance
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODAL: Add / Edit ── */}
      <Modal
        title={modal === "add" ? "Add Case Study" : "Edit Case Study"}
        isOpen={modal === "add" || modal === "edit"}
        onClose={closeModal}
        wide
      >
        <div className="space-y-4">
          {/* Cover Image */}
          <div>
            <FormLabel>
              Cover Image (800×700 px)
              <span className="text-red-400 ml-0.5">*</span>
            </FormLabel>

            {form.image ? (
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <img
                  src={form.image}
                  alt="cover"
                  className="rounded-lg object-cover border border-[#E2E8F0]"
                  style={{ width: 64, height: 56, aspectRatio: "800 / 700" }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#94A3B8]">
                    Cover image ready (800×700 px)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, image: "" }));
                    setErrors((prev) => ({
                      ...prev,
                      image: "Cover image is required (800×700 px).",
                    }));
                  }}
                  className="text-xs text-[#64748B] hover:text-red-500 font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <UploadZone
                label="Upload Cover Image"
                hint="PNG, JPG — exactly 800×700 px"
                hasError={!!errors.image}
                onClick={() => templateImageRef.current?.click()}
              />
            )}

            <input
              ref={templateImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleTemplateImageChange}
            />

            <FieldError message={errors.image} />
          </div>

          {/* Featured Images */}
          {renderFeaturedImagesGrid()}

          {/* Case Study Name */}
          <div>
            <HMInput
              label={
                <>
                  Case Study Name <span className="text-red-400">*</span>
                </>
              }
              placeholder="e.g. Samsung Galaxy Multiverse Experience"
              value={form.name}
              hasError={!!errors.name}
              onChange={(v) => {
                setForm((prev) => ({ ...prev, name: v }));
                if (v.trim())
                  setErrors((p) => {
                    const n = { ...p };
                    delete n.name;
                    return n;
                  });
              }}
            />
            <FieldError message={errors.name} />
          </div>

          {/* Location / Year / Attendance */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <HMInput
                label={
                  <>
                    Location <span className="text-red-400">*</span>
                  </>
                }
                placeholder="e.g. Dubai, UAE"
                value={form.location}
                hasError={!!errors.location}
                onChange={(v) => {
                  setForm((prev) => ({ ...prev, location: v }));
                  if (v.trim())
                    setErrors((p) => {
                      const n = { ...p };
                      delete n.location;
                      return n;
                    });
                }}
              />
              <FieldError message={errors.location} />
            </div>

            <div>
              <HMInput
                label={
                  <>
                    Year <span className="text-red-400">*</span>
                  </>
                }
                placeholder="e.g. 2024"
                value={form.year}
                hasError={!!errors.year}
                onChange={(v) => {
                  setForm((prev) => ({ ...prev, year: v }));
                  if (v.trim())
                    setErrors((p) => {
                      const n = { ...p };
                      delete n.year;
                      return n;
                    });
                }}
              />
              <FieldError message={errors.year} />
            </div>

            <div>
              <HMInput
                label={
                  <>
                    Attendance <span className="text-red-400">*</span>
                  </>
                }
                placeholder="e.g. 22,000+"
                value={form.attendance}
                hasError={!!errors.attendance}
                onChange={(v) => {
                  setForm((prev) => ({ ...prev, attendance: v }));
                  if (v.trim())
                    setErrors((p) => {
                      const n = { ...p };
                      delete n.attendance;
                      return n;
                    });
                }}
              />
              <FieldError message={errors.attendance} />
            </div>
          </div>

          {/* Description */}
          <div>
            <FormLabel>
              Description <span className="text-red-400">*</span>
            </FormLabel>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => {
                const v = e.target.value;
                setForm((prev) => ({ ...prev, description: v }));
                if (v.trim())
                  setErrors((p) => {
                    const n = { ...p };
                    delete n.description;
                    return n;
                  });
              }}
              placeholder="Describe the case study..."
              className={`w-full border rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] resize-none ${
                errors.description ? "border-red-400" : "border-[#E2E8F0]"
              }`}
            />
            <FieldError message={errors.description} />
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <Btn variant="secondary" onClick={closeModal}>
              Cancel
            </Btn>
            <Btn icon={modal === "add" ? Plus : undefined} onClick={handleSave}>
              {modal === "add" ? "Save Case Study" : "Save Changes"}
            </Btn>
          </div>
        </div>
      </Modal>

      {/* ── MODAL: Delete Confirm ── */}
      {deleteTarget && (
        <Modal
          title="Delete Case Study"
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
        >
          <div className="space-y-4">
            <p className="text-sm text-[#64748B]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[#0F172A]">
                {deleteTarget.name}
              </span>
              ? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <Btn variant="secondary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Btn>
              <Btn variant="danger" icon={Trash2} onClick={handleDelete}>
                Delete
              </Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox} alt="lightbox" className="w-full rounded-xl" />
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};