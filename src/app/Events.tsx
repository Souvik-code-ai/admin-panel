import { useState,useRef } from "react";
import { eventsData } from "./Data";
import { Card } from "./components/ui/card";
import { Calendar,Users,Plus,X,MapPin,Filter,Search } from "lucide-react";
import { Btn } from "./components/ui/Btn";
import { PageHeader } from "./components/ui/Pageheader"; 
import { Modal } from "./components/ui/Modal";
import { FormLabel } from "./components/ui/FormLabel";
import { HMSelect } from "./components/ui/HMSelect";
import { HMInput } from "./components/ui/HMInput";
import { UploadZone } from "./components/ui/UploadZone";
import { StatusBadge } from "./components/ui/Statusbadge";
import { Th } from "./components/ui/Th";
import { Td } from "./components/ui/Td";
import { ReorderControls } from "./components/ui/ReorderControls";
import { RowActions } from "./components/ui/RowActions";
export  const  EventsPage = () => {
  const [events, setEvents] = useState(eventsData);
  const [search, setSearch] = useState("");

  // ── Filter state ──
  const [showFilter, setShowFilter] = useState(false);
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  // Add Event modal

  const [newImageError, setNewImageError] = useState("");

  const [newNameError, setNewNameError] = useState("");

  const [newLocationError, setNewLocationError] = useState("");

  const [newDateError, setNewDateError] = useState("");

  const [newAttendanceError, setNewAttendanceError] = useState("");
  // Derive unique values for dropdowns
  const allLocations = [
    "All",
    ...Array.from(new Set(events.map((e) => e.location))),
  ];
  const allTypes = ["All", ...Array.from(new Set(events.map((e) => e.type)))];
  const allStatuses = ["All", "Upcoming", "Active", "Completed"];

  const activeFilterCount = [filterLocation, filterType, filterStatus].filter(
    (v) => v !== "All",
  ).length;

  const resetFilters = () => {
    setFilterLocation("All");
    setFilterType("All");
    setFilterStatus("All");
  };

  // Add Event modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newImageName, setNewImageName] = useState("");
  const newImageRef = useRef(null);
  const [newName, setNewName] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newType, setNewType] = useState("Product Launch");
  const [newDate, setNewDate] = useState("");
  const [newAttendance, setNewAttendance] = useState("");

  // View / Edit modal
  const [viewEvent, setViewEvent] = useState(null);
  const [editEvent, setEditEvent] = useState(null);
  const [editImage, setEditImage] = useState(null);

  const [editImageName, setEditImageName] = useState("");
  const editImageRef = useRef(null);
  const [editName, setEditName] = useState("");
  const [editNameError, setEditNameError] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editLocationError, setEditLocationError] = useState("");
  const [editType, setEditType] = useState("Product Launch");
  const [editDate, setEditDate] = useState("");
  const [editDateError, setEditDateError] = useState("");
  const [editAttendance, setEditAttendance] = useState("");
  const [editAttendanceError, setEditAttendanceError] = useState("");
  const [editStatus, setEditStatus] = useState("Upcoming");
  const [editImageError, setEditImageError] = useState("");
  const resetAddForm = () => {
    setNewImage(null);
    setNewImageName("");
    setNewImageError("");
    setNewName("");
    setNewNameError("");
    setNewLocation("");
    setNewLocationError("");
    setNewType("Product Launch");
    setNewDate("");
    setNewDateError("");
    setNewAttendance("");
    setNewAttendanceError("");
    if (newImageRef.current) newImageRef.current.value = "";
  };
  const EVENT_IMAGE_MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const EVENT_IMAGE_WIDTH = 800;
const EVENT_IMAGE_HEIGHT = 700;
const getEventImageDimensions = (file) => {
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
const validateEventImageFile = async (file) => {
  if (file.size > EVENT_IMAGE_MAX_SIZE_BYTES) {
    return `Image must be max ${EVENT_IMAGE_MAX_SIZE_BYTES / (1024 * 1024)}MB (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }
  try {
    const { width, height } = await getEventImageDimensions(file);
    if (width !== EVENT_IMAGE_WIDTH || height !== EVENT_IMAGE_HEIGHT) {
      return `Image must be exactly ${EVENT_IMAGE_WIDTH}x${EVENT_IMAGE_HEIGHT}px (selected: ${width}x${height}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};
  const handleNewImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateEventImageFile(file);
    if (error) {
      setNewImageError(error);
      setNewImage(null);
      setNewImageName("");
      e.target.value = "";
      return;
    }

    setNewImageError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewImage(ev.target?.result);
      setNewImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveEvent = () => {
    let hasError = false;

    if (!newImage) {
      setNewImageError("Event Cover Image is mandatory.");
      hasError = true;
    }

    if (!newName.trim()) {
      setNewNameError("Event Name is mandatory.");
      hasError = true;
    } else {
      setNewNameError("");
    }

    if (!newLocation.trim()) {
      setNewLocationError("Location is mandatory.");
      hasError = true;
    } else {
      setNewLocationError("");
    }

    if (!newDate) {
      setNewDateError("Event Date is mandatory.");
      hasError = true;
    } else {
      setNewDateError("");
    }

    if (!newAttendance.trim() || Number(newAttendance) <= 0) {
      setNewAttendanceError(
        "Attendance is mandatory and must be a positive number.",
      );
      hasError = true;
    } else {
      setNewAttendanceError("");
    }

    if (hasError) return;

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        image: newImage,
        name: newName.trim(),
        location: newLocation.trim(),
        type: newType,
        date: new Date(newDate).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        attendance: Number(newAttendance),
        status: "Upcoming",
      },
    ]);
    resetAddForm();
    setShowAddModal(false);
  };

  const openEditEvent = (ev) => {
    setEditEvent(ev);
    setEditImage(ev.image);
    setEditImageName("");
    setEditImageError("");
    setEditName(ev.name);
    setEditNameError("");
    setEditLocation(ev.location);
    setEditLocationError("");
    setEditType(ev.type);
    setEditDate(ev.date);
    setEditDateError("");
    setEditAttendance(String(ev.attendance));
    setEditAttendanceError("");
    setEditStatus(ev.status);
  };

  const handleEditImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateEventImageFile(file);
    if (error) {
      setEditImageError(error);
      e.target.value = "";
      return;
    }

    setEditImageError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditImage(ev.target?.result);
      setEditImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateEvent = () => {
    let hasError = false;

    if (!editImage) {
      setEditImageError("Event Cover Image is mandatory.");
      hasError = true;
    } else {
      setEditImageError("");
    }

    if (!editName.trim()) {
      setEditNameError("Event Name is mandatory.");
      hasError = true;
    } else {
      setEditNameError("");
    }

    if (!editLocation.trim()) {
      setEditLocationError("Location is mandatory.");
      hasError = true;
    } else {
      setEditLocationError("");
    }

    if (!editDate) {
      setEditDateError("Event Date is mandatory.");
      hasError = true;
    } else {
      setEditDateError("");
    }

    if (!editAttendance.toString().trim() || Number(editAttendance) <= 0) {
      setEditAttendanceError(
        "Attendance is mandatory and must be a positive number.",
      );
      hasError = true;
    } else {
      setEditAttendanceError("");
    }

    if (!editEvent || hasError) return;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === editEvent.id
          ? {
              ...ev,
              image: editImage,
              name: editName.trim(),
              location: editLocation.trim(),
              type: editType,
              date: editDate,
              attendance: Number(editAttendance),
              status: editStatus,
            }
          : ev,
      ),
    );
    setEditEvent(null);
  };

  const moveEvent = (index, direction) => {
    setEvents((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  // Apply search + filters
  const filteredEvents = events.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchLocation =
      filterLocation === "All" || e.location === filterLocation;
    const matchType = filterType === "All" || e.type === filterType;
    const matchStatus = filterStatus === "All" || e.status === filterStatus;
    return matchSearch && matchLocation && matchType && matchStatus;
  });

  return (
    <div>
      <PageHeader
        title="Events"
        subtitle="Manage all events, track attendance, and monitor status across your portfolio."
        action={
          <Btn icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Event
          </Btn>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Events Managed",
            value: events.length.toLocaleString(),
            icon: Calendar,
            bg: "#EFF6FF",
          },
          { label: "Cities Covered", value: "42", icon: Globe, bg: "#ECFDF5" },
          {
            label: "Total Attendance",
            value: events
              .reduce((s, e) => s + e.attendance, 0)
              .toLocaleString(),
            icon: Users,
            bg: "#FFF7ED",
          },
        ].map((s) => (
          <Card key={s.label} className="p-5 flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: s.bg }}
            >
              <s.icon size={22} className="text-lime-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0F172A]">{s.value}</p>
              <p className="text-xs text-[#64748B] font-medium">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b border-[#F1F5F9] gap-3 flex-wrap">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
            />
          </div>

          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => setShowFilter((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                showFilter || activeFilterCount > 0
                  ? "bg-[#EFF6FF] text-lime-600 border-lime-600"
                  : "bg-white text-lime-800 border-lime-800 hover:bg-[#F8FAFC]"
              }`}
            >
              <Filter size={14} />
              Filter
              {activeFilterCount > 0 && (
                <span className="ml-0.5 w-5 h-5 rounded-full bg-lime-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Filter dropdown panel */}
            {showFilter && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-30 p-4 space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-[#0F172A] uppercase tracking-wide">
                    Filters
                  </p>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={resetFilters}
                      className="text-xs text-[#64748B] hover:text-red-500 font-medium transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                    Location
                  </label>
                  <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] bg-white"
                  >
                    {allLocations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Event Type */}
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                    Event Type
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {allTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                          filterType === t
                            ? "bg-lime-600 text-white border-lime-600"
                            : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#0F4C81] hover:text-[#0F4C81]"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {allStatuses.map((s) => {
                      const colors = {
                        All: "bg-lime-600 text-white border-lime-600",
                        Upcoming: "bg-amber-500 text-white border-amber-500",
                        Active: "bg-emerald-500 text-white border-emerald-500",
                        Completed: "bg-blue-500 text-white border-blue-500",
                      };
                      const isActive = filterStatus === s;
                      return (
                        <button
                          key={s}
                          onClick={() => setFilterStatus(s)}
                          className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                            isActive
                              ? colors[s]
                              : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-lime-600 hover:text-lime-600"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setShowFilter(false)}
                  className="w-full py-2 bg-lime-600 hover:bg-lime-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] border-b border-[#F1F5F9] flex-wrap">
            <span className="text-xs text-[#64748B] font-medium">
              Active filters:
            </span>
            {filterLocation !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#EFF6FF] text-lime-600 text-xs font-medium rounded-full border border-lime-400">
                📍 {filterLocation}
                <button
                  onClick={() => setFilterLocation("All")}
                  className="ml-0.5 hover:text-red-500 transition-colors"
                >
                  <X size={11} />
                </button>
              </span>
            )}
            {filterType !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#EFF6FF] text-lime-600 text-xs font-medium rounded-full border border-lime-200">
                🏷 {filterType}
                <button
                  onClick={() => setFilterType("All")}
                  className="ml-0.5 hover:text-red-500 transition-colors"
                >
                  <X size={11} />
                </button>
              </span>
            )}
            {filterStatus !== "All" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#EFF6FF] text-lime-600 text-xs font-medium rounded-full border border-lime-200">
                ● {filterStatus}
                <button
                  onClick={() => setFilterStatus("All")}
                  className="ml-0.5 hover:text-red-500 transition-colors"
                >
                  <X size={11} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Event</Th>
                <Th>Location</Th>
                <Th>Type</Th>
                <Th>Date</Th>
                <Th>Attendance</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-14 text-[#94A3B8] text-sm"
                  >
                    <Filter size={28} className="mx-auto mb-2 opacity-25" />
                    No events match the current filters.
                    {activeFilterCount > 0 && (
                      <button
                        onClick={resetFilters}
                        className="block mx-auto mt-2 text-xs text-[#0F4C81] font-medium hover:underline"
                      >
                        Clear filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filteredEvents.map((e, idx) => (
                  <tr
                    key={e.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-9 rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden flex-shrink-0">
                          {e.image ? (
                            <img
                              src={e.image}
                              alt={e.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-sm">🖼️</span>
                          )}
                        </div>
                        <span className="font-medium text-[#0F172A]">
                          {e.name}
                        </span>
                      </div>
                    </Td>
                    <Td className="text-[#64748B]">{e.location}</Td>
                    <Td>
                      <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
                        {e.type}
                      </span>
                    </Td>
                    <Td className="text-[#64748B]">{e.date}</Td>
                    <Td className="font-semibold">
                      {e.attendance.toLocaleString()}
                    </Td>
                    <Td>
                      <StatusBadge status={e.status} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        <ReorderControls
                          index={idx}
                          total={filteredEvents.length}
                          onMoveUp={() => moveEvent(idx, -1)}
                          onMoveDown={() => moveEvent(idx, 1)}
                        />
                        <RowActions
                          onView={() => setViewEvent(e)}
                          onEdit={() => openEditEvent(e)}
                          onDelete={() =>
                            setEvents((prev) =>
                              prev.filter((x) => x.id !== e.id),
                            )
                          }
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

      {/* MODAL: Add Event */}
      {/* MODAL: Add Event */}
      <Modal
        title="Add New Event"
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetAddForm();
        }}
      >
        <div className="space-y-4">
          <div>
            <FormLabel>Event Cover Image *</FormLabel>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Required: exactly {EVENT_IMAGE_WIDTH}x{EVENT_IMAGE_HEIGHT}px, max{" "}
              {EVENT_IMAGE_MAX_SIZE_BYTES / (1024 * 1024)}MB.
            </p>
            {newImage ? (
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <img
                  src={newImage}
                  alt="preview"
                  className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">
                    {newImageName}
                  </p>
                  <p className="text-xs text-[#94A3B8]">Image ready to save</p>
                </div>
                <button
                  onClick={() => {
                    setNewImage(null);
                    setNewImageName("");
                    setNewImageError("");
                    if (newImageRef.current) newImageRef.current.value = "";
                  }}
                  className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <UploadZone
                label="Upload Event Cover Image"
                hint={`PNG, JPG — exactly ${EVENT_IMAGE_WIDTH}x${EVENT_IMAGE_HEIGHT}px, max ${EVENT_IMAGE_MAX_SIZE_BYTES / (1024 * 1024)}MB`}
                onClick={() => newImageRef.current?.click()}
              />
            )}
            <input
              ref={newImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleNewImageChange}
            />
            {newImageError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newImageError}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <HMInput
                label="Event Name *"
                placeholder="e.g. Galaxy AI Launch 2025"
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
                label="Location *"
                placeholder="e.g. Dubai, UAE"
                value={newLocation}
                onChange={(v) => {
                  setNewLocation(v);
                  if (newLocationError) setNewLocationError("");
                }}
              />
              {newLocationError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {newLocationError}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <HMSelect
              label="Event Type *"
              value={newType}
              onChange={(v) => setNewType(v)}
            >
              <option>Product Launch</option>
              <option>Brand Activation</option>
              <option>Conference</option>
              <option>Exhibition</option>
              <option>Sponsorship</option>
            </HMSelect>
            <div>
              <FormLabel>Event Date *</FormLabel>
              <input
                type="date"
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
          <div>
            <FormLabel>Attendance *</FormLabel>
            <input
              type="number"
              min="0"
              placeholder="e.g. 5000"
              value={newAttendance}
              onChange={(e) => {
                setNewAttendance(e.target.value);
                if (newAttendanceError) setNewAttendanceError("");
              }}
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
            />
            {newAttendanceError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newAttendanceError}
              </p>
            )}
          </div>

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
            <Btn onClick={handleSaveEvent}>Create Event</Btn>
          </div>
        </div>
      </Modal>

      {/* MODAL: View Event */}
      {viewEvent && (
        <Modal
          title="Event Details"
          isOpen={!!viewEvent}
          onClose={() => setViewEvent(null)}
          wide
        >
          <div className="space-y-5">
            <div className="w-full h-52 rounded-xl border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden">
              {viewEvent.image ? (
                <img
                  src={viewEvent.image}
                  alt={viewEvent.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl">🖼️</span>
              )}
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {viewEvent.name}
                </h3>
                <p className="text-sm text-[#64748B] mt-0.5 flex items-center gap-1.5">
                  <MapPin size={12} /> {viewEvent.location}
                </p>
              </div>
              <StatusBadge status={viewEvent.status} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Event Type
                </p>
                <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
                  {viewEvent.type}
                </span>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Date
                </p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {viewEvent.date}
                </p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Attendance
                </p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {viewEvent.attendance.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: Edit Event */}
      {/* MODAL: Edit Event */}
      {editEvent && (
        <Modal
          title="Edit Event"
          isOpen={!!editEvent}
          onClose={() => {
            setEditEvent(null);
            setEditImageError("");
            setEditNameError("");
            setEditLocationError("");
            setEditDateError("");
            setEditAttendanceError("");
          }}
        >
          <div className="space-y-4">
            <div>
              <FormLabel>Event Cover Image *</FormLabel>
              <p className="text-xs text-[#94A3B8] mb-1.5">
                Required: exactly {EVENT_IMAGE_WIDTH}x{EVENT_IMAGE_HEIGHT}px,
                max {EVENT_IMAGE_MAX_SIZE_BYTES / (1024 * 1024)}MB.
              </p>
              {editImage ? (
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <img
                    src={editImage}
                    alt="preview"
                    className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                      {editImageName || "Current image"}
                    </p>
                    <p className="text-xs text-[#94A3B8]">
                      Image ready to save
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setEditImage(null);
                      setEditImageName("");
                      if (editImageRef.current) editImageRef.current.value = "";
                    }}
                    className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <UploadZone
                  label="Upload Event Cover Image"
                  hint={`PNG, JPG — exactly ${EVENT_IMAGE_WIDTH}x${EVENT_IMAGE_HEIGHT}px, max ${EVENT_IMAGE_MAX_SIZE_BYTES / (1024 * 1024)}MB`}
                  onClick={() => editImageRef.current?.click()}
                />
              )}
              <input
                ref={editImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleEditImageChange}
              />
              {editImageError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editImageError}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <HMInput
                  label="Event Name *"
                  placeholder="e.g. Galaxy AI Launch 2025"
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
                <HMInput
                  label="Location *"
                  placeholder="e.g. Dubai, UAE"
                  value={editLocation}
                  onChange={(v) => {
                    setEditLocation(v);
                    if (editLocationError) setEditLocationError("");
                  }}
                />
                {editLocationError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editLocationError}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <HMSelect
                label="Event Type *"
                value={editType}
                onChange={(v) => setEditType(v)}
              >
                <option>Product Launch</option>
                <option>Brand Activation</option>
                <option>Conference</option>
                <option>Exhibition</option>
                <option>Sponsorship</option>
              </HMSelect>
              <HMSelect
                label="Status *"
                value={editStatus}
                onChange={(v) => setEditStatus(v)}
              >
                <option>Upcoming</option>
                <option>Active</option>
                <option>Completed</option>
              </HMSelect>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FormLabel>Event Date *</FormLabel>
                <input
                  type="date"
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
              <div>
                <FormLabel>Attendance *</FormLabel>
                <input
                  type="number"
                  min="0"
                  placeholder="e.g. 5000"
                  value={editAttendance}
                  onChange={(e) => {
                    setEditAttendance(e.target.value);
                    if (editAttendanceError) setEditAttendanceError("");
                  }}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                />
                {editAttendanceError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editAttendanceError}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-3 pt-1">
              <Btn
                variant="secondary"
                onClick={() => {
                  setEditEvent(null);
                  setEditImageError("");
                  setEditNameError("");
                  setEditLocationError("");
                  setEditDateError("");
                  setEditAttendanceError("");
                }}
              >
                Cancel
              </Btn>
              <Btn onClick={handleUpdateEvent}>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};