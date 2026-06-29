import { useState,useRef } from "react";
import { profileGallery } from "./Data";
import { mediaItems } from "./Data";
import { PageHeader } from "./components/ui/Pageheader";
import { Btn } from "./components/ui/Btn";
import { CheckCircle2,Upload,Edit2,Eye,Trash2,Plus } from "lucide-react";
import { Card } from "./components/ui/card";
export const ProfilePage = () => {
  const [mediaTab, setMediaTab] = useState<"photos" | "reels" | "videos">(
    "photos",
  );

  // ── Company Progress / Statistics ──────────────────────────────
  const [stats, setStats] = useState([
    { id: 1, label: "Years of Experience", value: "18+" },
    { id: 2, label: "Total Clients", value: "386" },
    { id: 3, label: "Total Projects", value: "1,247" },
  ]);

  const [editingStatId, setEditingStatId] = useState<number | null>(null);
  const [statInput, setStatInput] = useState("");

  // ── Services ───────────────────────────────────────────────────
  const [services, setServices] = useState([
    "Event Management & Production",
    "Brand Activation & Experiential",
    "Exhibition Design & Build",
    "Digital Marketing & Social Media",
    "Corporate Events & Conferences",
    "Sponsorship Activation",
  ]);

  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(
    null,
  );
  const [serviceInput, setServiceInput] = useState("");

  // ── Gallery ────────────────────────────────────────────────────
  const [galleryItems, setGalleryItems] = useState(profileGallery);

  // ── Media ──────────────────────────────────────────────────────
  const [media, setMedia] = useState(mediaItems);

  const [saveMessage, setSaveMessage] = useState("");

  const galleryUploadRef = useRef<HTMLInputElement>(null);
  const mediaUploadRef = useRef<HTMLInputElement>(null);

  // ── STAT EDIT FUNCTIONS ─────────────────────────────────────────
  const startStatEdit = (id: number) => {
    setEditingStatId(id);

    // Empty input: existing number is removed
    setStatInput("");
  };

  const saveStat = (id: number) => {
    const trimmedValue = statInput.trim();

    if (!trimmedValue) {
      setEditingStatId(null);
      return;
    }

    setStats((previousStats) =>
      previousStats.map((stat) =>
        stat.id === id ? { ...stat, value: trimmedValue } : stat,
      ),
    );

    setEditingStatId(null);
    setStatInput("");
  };

  // ── SERVICE EDIT FUNCTIONS ──────────────────────────────────────
  const startServiceEdit = (index: number) => {
    setEditingServiceIndex(index);

    // You may keep the old value while editing services
    setServiceInput(services[index]);
  };

  const saveService = (index: number) => {
    const trimmedValue = serviceInput.trim();

    if (!trimmedValue) {
      setEditingServiceIndex(null);
      return;
    }

    setServices((previousServices) =>
      previousServices.map((service, serviceIndex) =>
        serviceIndex === index ? trimmedValue : service,
      ),
    );

    setEditingServiceIndex(null);
    setServiceInput("");
  };

  const addService = () => {
    setServices((previousServices) => [...previousServices, "New Service"]);

    // Open the new service directly in edit mode
    setEditingServiceIndex(services.length);
    setServiceInput("New Service");
  };

  // ── DELETE FUNCTIONS ────────────────────────────────────────────
  const deleteGalleryImage = (index: number) => {
    setGalleryItems((previousGallery) =>
      previousGallery.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  const deleteMediaItem = (id: number | string) => {
    setMedia((previousMedia) =>
      previousMedia.filter((mediaItem) => mediaItem.id !== id),
    );
  };

  // ── UPLOAD FUNCTIONS ────────────────────────────────────────────
  const uploadGalleryImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const newImages = files.map((file) => URL.createObjectURL(file));

    setGalleryItems((previousGallery) => [...newImages, ...previousGallery]);

    event.target.value = "";
  };

  const uploadMediaFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const typeMap = {
      photos: "image",
      reels: "reel",
      videos: "video",
    } as const;

    const newMediaItems = files.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      url: URL.createObjectURL(file),
      type: typeMap[mediaTab],
    }));

    setMedia((previousMedia) => [...newMediaItems, ...previousMedia]);

    event.target.value = "";
  };

  // ── SAVE ALL ────────────────────────────────────────────────────
  const handleSaveAllChanges = () => {
    // Replace this console.log with your API mutation later
    console.log({
      stats,
      services,
      galleryItems,
      media,
    });

    setSaveMessage("All profile changes saved successfully.");

    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  return (
    <div>
      <PageHeader
        title="Profile"
        subtitle="Manage your agency profile, featured work, and service offerings."
        action={<Btn onClick={handleSaveAllChanges}>Save All Changes</Btn>}
      />

      {saveMessage && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={17} />
          {saveMessage}
        </div>
      )}

      {/* Hidden upload inputs */}
      <input
        ref={galleryUploadRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={uploadGalleryImages}
      />

      <input
        ref={mediaUploadRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={uploadMediaFiles}
      />

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.id} className="p-5 text-center">
            {editingStatId === stat.id ? (
              <input
                autoFocus
                type="text"
                inputMode="numeric"
                value={statInput}
                onChange={(event) => setStatInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    saveStat(stat.id);
                  }

                  if (event.key === "Escape") {
                    setEditingStatId(null);
                  }
                }}
                onBlur={() => saveStat(stat.id)}
                placeholder="Enter value"
                className="mx-auto w-full max-w-[160px] rounded-lg border border-[#0F4C81] bg-white px-3 py-1.5 text-center text-2xl font-bold text-[#0F4C81] outline-none"
              />
            ) : (
              <p className="text-3xl font-bold text-[#0F4C81]">{stat.value}</p>
            )}

            <p className="mt-1 text-sm text-[#64748B]">{stat.label}</p>

            {editingStatId !== stat.id && (
              <button
                onClick={() => startStatEdit(stat.id)}
                className="mx-auto mt-3 flex items-center gap-1 text-xs font-medium text-[#0F4C81] hover:underline"
              >
                <Edit2 size={11} />
                Edit
              </button>
            )}
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          {/* Featured Work Gallery */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0F172A]">
                Featured Work Gallery
              </p>

              <Btn
                icon={Upload}
                small
                variant="secondary"
                onClick={() => galleryUploadRef.current?.click()}
              >
                Upload
              </Btn>
            </div>

            <div className="columns-2 gap-3 space-y-3 md:columns-3">
              {galleryItems.map((url, index) => (
                <div
                  key={`${url}-${index}`}
                  className="group relative overflow-hidden rounded-xl break-inside-avoid"
                >
                  <img
                    src={url}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full object-cover"
                  />

                  <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      <Eye size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteGalleryImage(index)}
                      className="rounded-lg bg-white/20 p-2 text-white backdrop-blur-sm transition-colors hover:bg-red-500/70"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {!galleryItems.length && (
              <p className="py-8 text-center text-sm text-[#64748B]">
                No featured work available. Click Upload to add images.
              </p>
            )}
          </Card>

          {/* Photos / Reels / Videos */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex gap-1 rounded-lg bg-[#F1F5F9] p-1">
                {(["photos", "reels", "videos"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setMediaTab(tab)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                      mediaTab === tab
                        ? "bg-white text-[#0F172A] shadow-sm"
                        : "text-[#64748B]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <Btn
                icon={Upload}
                small
                variant="secondary"
                onClick={() => mediaUploadRef.current?.click()}
              >
                Upload
              </Btn>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {media
                .filter((item) =>
                  mediaTab === "photos"
                    ? item.type === "image"
                    : mediaTab === "videos"
                      ? item.type === "video"
                      : item.type === "reel",
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    {item.type !== "image" && (
                      <div className="absolute right-2 top-2">
                        <div className="rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                          {item.type}
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        className="rounded-lg bg-white/20 p-1.5 text-white"
                      >
                        <Eye size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteMediaItem(item.id)}
                        className="rounded-lg bg-white/20 p-1.5 text-white transition-colors hover:bg-red-500/70"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>

        {/* Services */}
        <div>
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-semibold text-[#0F172A]">Services</p>

              <button
                type="button"
                onClick={addService}
                className="rounded-lg p-1.5 text-[#0F4C81] transition-colors hover:bg-[#EFF6FF]"
              >
                <Plus size={15} />
              </button>
            </div>

            <div className="space-y-2">
              {services.map((service, index) => (
                <div
                  key={`${service}-${index}`}
                  className="group flex items-center gap-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3"
                >
                  <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#F97316]" />

                  {editingServiceIndex === index ? (
                    <input
                      autoFocus
                      value={serviceInput}
                      onChange={(event) => setServiceInput(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          saveService(index);
                        }

                        if (event.key === "Escape") {
                          setEditingServiceIndex(null);
                        }
                      }}
                      onBlur={() => saveService(index)}
                      className="min-w-0 flex-1 rounded-md border border-[#0F4C81] bg-white px-2 py-1 text-sm text-[#0F172A] outline-none"
                    />
                  ) : (
                    <span className="flex-1 text-sm text-[#0F172A]">
                      {service}
                    </span>
                  )}

                  {editingServiceIndex !== index && (
                    <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => startServiceEdit(index)}
                        className="text-[#94A3B8] transition-colors hover:text-[#F97316]"
                      >
                        <Edit2 size={12} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setServices((previousServices) =>
                            previousServices.filter(
                              (_, serviceIndex) => serviceIndex !== index,
                            ),
                          )
                        }
                        className="text-[#94A3B8] transition-colors hover:text-red-500"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};