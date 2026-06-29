import { useState,useRef } from "react";

import {seedClients,seedStories,seedFeedCards} from "../app/Data"
import { Client,ClientStory,FeedCard,EventType ,HMStatus} from "./Type";
import { FormLabel } from "./components/ui/FormLabel";
import { Btn } from "./components/ui/Btn";
const HomeManagementPage = () => {
  const [tab, setTab] = useState<"clients" | "feed">("clients");
  const [editImages, setEditImages] = useState<string[]>([]);
  const editImageRef = useRef<HTMLInputElement>(null);
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
const ACT_TEMPLATE_WIDTH = 800;
const ACT_TEMPLATE_HEIGHT = 700;
const ACT_TEMPLATE_MAX_MB = 10;

const ACT_BODY_WIDTH = 1920;
const ACT_BODY_HEIGHT = 1080;
const ACT_BODY_MAX_MB = 10;
const LOGO_MAX_SIZE_BYTES = 100 * 1024; // 100KB
const LOGO_WIDTH = 500;
const LOGO_HEIGHT = 500;

const MEDIA_MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const MEDIA_MAX_WIDTH = 1080;
const MEDIA_MAX_HEIGHT = 1920;
const MEDIA_MIN_WIDTH = 720;
const getActivationImageDimensions = (
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
  // Modal visibility
  const validateLogoFile = async (file: File): Promise<string> => {
  if (file.size > LOGO_MAX_SIZE_BYTES) {
    return `Logo must be max ${LOGO_MAX_SIZE_BYTES / 1024}KB (selected: ${(file.size / 1024).toFixed(0)}KB).`;
  }
  try {
    const { width, height } = await getActivationImageDimensions(file);
    if (width !== LOGO_WIDTH || height !== LOGO_HEIGHT) {
      return `Logo must be exactly ${LOGO_WIDTH}x${LOGO_HEIGHT}px (selected: ${width}x${height}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};
const validateMediaFile = async (file: File): Promise<string> => {
  if (file.size > MEDIA_MAX_SIZE_BYTES) {
    return `File must be max ${MEDIA_MAX_SIZE_BYTES / (1024 * 1024)}MB (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }
  if (file.type.startsWith("video/")) {
    return ""; // videos: size-only check, no dimension validation
  }
  try {
    const { width, height } = await getImageDimensions(file);
    if (width > MEDIA_MAX_WIDTH || height > MEDIA_MAX_HEIGHT) {
      return `Image resolution must not exceed ${MEDIA_MAX_WIDTH}x${MEDIA_MAX_HEIGHT}px (selected: ${width}x${height}px).`;
    }
    if (width < MEDIA_MIN_WIDTH) {
      return `Image width must be at least ${MEDIA_MIN_WIDTH}px (selected width: ${width}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showFeedModal, setShowFeedModal] = useState(false);

  // Data state
  const [clients, setClients] = useState<Client[]>(seedClients);
  const [stories, setStories] = useState<ClientStory[]>(seedStories);
  const [feedCards, setFeedCards] = useState<FeedCard[]>(seedFeedCards);
  const [editFeedTitleError, setEditFeedTitleError] = useState("");
  // Add Client form state
  const [newClientName, setNewClientName] = useState("");
  const [newClientNameError, setNewClientNameError] = useState("");
  const [newClientLogo, setNewClientLogo] = useState<string | null>(null);
  const [newClientLogoName, setNewClientLogoName] = useState("");
  const [newClientLogoError, setNewClientLogoError] = useState("");
  const clientLogoRef = useRef<HTMLInputElement>(null);

  // Add Client Story form state
  const [storyClientId, setStoryClientId] = useState("");
  const [storyClientIdError, setStoryClientIdError] = useState("");
  const [storyEventName, setStoryEventName] = useState("");
  const [storyEventNameError, setStoryEventNameError] = useState("");
  const [storyEventType, setStoryEventType] =
    useState<EventType>("Product Launch");
  const [storyLocation, setStoryLocation] = useState("");
  const [storyLocationError, setStoryLocationError] = useState("");
  const [storyImages, setStoryImages] = useState<string[]>([]);
  const [storyImagesError, setStoryImagesError] = useState("");
  const storyImageRef = useRef<HTMLInputElement>(null);

  // Client Story view/edit
  const [viewStory, setViewStory] = useState<ClientStory | null>(null);
  const [editStory, setEditStory] = useState<ClientStory | null>(null);
  const [editClientId, setEditClientId] = useState("");
  const [editEventName, setEditEventName] = useState("");
  const [editEventType, setEditEventType] =
    useState<EventType>("Product Launch");
  const [editLocation, setEditLocation] = useState("");
  const [editStatus, setEditStatus] = useState<HMStatus>("Active");
  const [editImagesUploadError, setEditImagesUploadError] = useState("");
  const [editLocationError, setEditLocationError] = useState("");
  // Add Feed Card form state
  const [feedTitle, setFeedTitle] = useState("");
  const [editImagesError, setEditImagesError] = useState("");
  const [feedTitleError, setFeedTitleError] = useState("");
  const [feedDesc, setFeedDesc] = useState("");
  const [feedDescError, setFeedDescError] = useState("");
  const [feedLocation, setFeedLocation] = useState("");
  const [feedLocationError, setFeedLocationError] = useState("");
  const [feedDate, setFeedDate] = useState("");
  const [feedDateError, setFeedDateError] = useState("");
  const [feedLogo, setFeedLogo] = useState<string | null>(null);
  const [feedLogoName, setFeedLogoName] = useState("");
  const [feedLogoError, setFeedLogoError] = useState("");
  const feedLogoRef = useRef<HTMLInputElement>(null);
  const [feedImages, setFeedImages] = useState<string[]>([]);
  const [feedImagesError, setFeedImagesError] = useState("");
  const feedImageRef = useRef<HTMLInputElement>(null);
  const [editClientLogoOverride, setEditClientLogoOverride] = useState<
    string | null
  >(null);
  const [editClientLogoOverrideName, setEditClientLogoOverrideName] =
    useState("");
  // Feed Card view/edit
  const [viewFeed, setViewFeed] = useState<FeedCard | null>(null);
  const [editFeed, setEditFeed] = useState<FeedCard | null>(null);
  const [editFeedTitle, setEditFeedTitle] = useState("");
  const [editFeedDesc, setEditFeedDesc] = useState("");
  const [editFeedDescError, setEditFeedDescError] = useState("");
  const [editFeedLocation, setEditFeedLocation] = useState("");
  const [editFeedLocationError, setEditFeedLocationError] = useState("");
  const [editFeedDate, setEditFeedDate] = useState("");
  const [editFeedDateError, setEditFeedDateError] = useState("");
  const [editFeedStatus, setEditFeedStatus] = useState<HMStatus>("Active");
  const [editFeedLogo, setEditFeedLogo] = useState<string | null>(null);
  const [editFeedLogoName, setEditFeedLogoName] = useState("");

  const [editEventNameError, setEditEventNameError] = useState("");
  const [editClientLogoError, setEditClientLogoError] = useState("");
  const editFeedImageRef = useRef<HTMLInputElement>(null);
  const editClientLogoRef = useRef<HTMLInputElement>(null);
  const [editClientIdError, setEditClientIdError] = useState("");
  const [editFeedLogoError, setEditFeedLogoError] = useState("");
  const editFeedLogoRef = useRef<HTMLInputElement>(null);
  const [editFeedImages, setEditFeedImages] = useState<string[]>([]);
  const [editFeedImagesUploadError, setEditFeedImagesUploadError] =
    useState("");
  const [editFeedImagesError, setEditFeedImagesError] = useState("");
  // ───────────────── Client Logo (Add Client) ─────────────────
  const handleClientLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateLogoFile(file);
    if (error) {
      setNewClientLogoError(error);
      setNewClientLogo(null);
      setNewClientLogoName("");
      e.target.value = "";
      return;
    }

    setNewClientLogoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewClientLogo(ev.target?.result as string);
      setNewClientLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const moveStory = (index: number, direction: -1 | 1) => {
    setStories((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  const moveFeed = (index: number, direction: -1 | 1) => {
    setFeedCards((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  const handleSaveClient = () => {
    let hasError = false;

    const name = newClientName.trim();
    if (!name) {
      setNewClientNameError("Client / Brand Name is mandatory.");
      hasError = true;
    } else {
      setNewClientNameError("");
    }

    if (!newClientLogo) {
      setNewClientLogoError("Client Logo is mandatory.");
      hasError = true;
    }

    if (hasError) return;

    const initials = name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
    setClients((prev) => [
      ...prev,
      { id: Date.now(), name, logo: newClientLogo, initials },
    ]);
    setNewClientName("");
    setNewClientNameError("");
    setNewClientLogo(null);
    setNewClientLogoName("");
    setNewClientLogoError("");
    if (clientLogoRef.current) clientLogoRef.current.value = "";
    setShowAddClientModal(false);
  };

  // ───────────────── Client Story: add ─────────────────
  const handleStoryImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const remainingSlots = 3 - storyImages.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToAdd) {
      const error = await validateMediaFile(file);
      if (error) {
        setStoryImagesError(error);
        continue;
      }
      setStoryImagesError("");
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setStoryImages((prev) =>
            prev.length < 3 ? [...prev, ev.target?.result as string] : prev,
          );
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = "";
  };

  const removeStoryImage = (index: number) => {
    setStoryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveStory = () => {
    let hasError = false;

    if (!storyClientId) {
      setStoryClientIdError("Client selection is mandatory.");
      hasError = true;
    } else {
      setStoryClientIdError("");
    }

    if (!storyEventName.trim()) {
      setStoryEventNameError("Event Name is mandatory.");
      hasError = true;
    } else {
      setStoryEventNameError("");
    }

    if (!storyLocation.trim()) {
      setStoryLocationError("Location is mandatory.");
      hasError = true;
    } else {
      setStoryLocationError("");
    }

    if (storyImages.length === 0) {
      setStoryImagesError("At least one image is mandatory.");
      hasError = true;
    }

    if (hasError) return;

    const client = clients.find((c) => c.id === Number(storyClientId));
    if (!client) return;

    setStories((prev) => [
      ...prev,
      {
        id: Date.now(),
        clientId: client.id,
        clientName: client.name,
        clientLogo: client.logo,
        clientInitials: client.initials,
        event: storyEventName.trim(),
        type: storyEventType,
        location: storyLocation.trim(),
        status: "Active",
        images: storyImages,
      },
    ]);
    setStoryClientId("");
    setStoryEventName("");
    setStoryEventType("Product Launch");
    setStoryLocation("");
    setStoryImages([]);
    setStoryClientIdError("");
    setStoryEventNameError("");
    setStoryLocationError("");
    setStoryImagesError("");
    setShowStoryModal(false);
  };

  // ───────────────── Client Story: edit ─────────────────
  const openEditStory = (s: ClientStory) => {
    setEditStory(s);
    setEditClientId(String(s.clientId));
    setEditEventName(s.event);
    setEditEventType(s.type);
    setEditLocation(s.location);
    setEditStatus(s.status);
    setEditImages(s.images);
    setEditClientIdError("");
    setEditEventNameError("");
    setEditLocationError("");
    setEditImagesUploadError("");
    setEditImagesError("");
    setEditClientLogoOverride(null);
    setEditClientLogoOverrideName("");
    setEditClientLogoError("");
  };

  const handleEditImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const remainingSlots = 3 - editImages.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToAdd) {
      const error = await validateMediaFile(file);
      if (error) {
        setEditImagesUploadError(error);
        continue;
      }
      setEditImagesUploadError("");
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setEditImages((prev) =>
            prev.length < 3 ? [...prev, ev.target?.result as string] : prev,
          );
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = "";
  };

  const handleUpdateStory = () => {
    let hasError = false;

    if (!editClientId) {
      setEditClientIdError("Client selection is mandatory.");
      hasError = true;
    } else {
      setEditClientIdError("");
    }

    if (!editEventName.trim()) {
      setEditEventNameError("Event Name is mandatory.");
      hasError = true;
    } else {
      setEditEventNameError("");
    }

    if (!editLocation.trim()) {
      setEditLocationError("Location is mandatory.");
      hasError = true;
    } else {
      setEditLocationError("");
    }

    if (editImages.length === 0) {
      setEditImagesError("At least one image is mandatory.");
      hasError = true;
    } else {
      setEditImagesError("");
    }

    if (!editStory || hasError) return;

    const client = clients.find((c) => c.id === Number(editClientId));
    if (!client) return;

    // If the logo was changed in this modal, update the client record too
    const updatedLogo = editClientLogoOverride ?? client.logo;
    if (editClientLogoOverride) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === client.id ? { ...c, logo: editClientLogoOverride } : c,
        ),
      );
    }

    setStories((prev) =>
      prev.map((s) =>
        s.id === editStory.id
          ? {
              ...s,
              clientId: client.id,
              clientName: client.name,
              clientLogo: updatedLogo,
              clientInitials: client.initials,
              event: editEventName.trim(),
              type: editEventType,
              location: editLocation.trim(),
              status: editStatus,
              images: editImages,
            }
          : s,
      ),
    );

    // If logo changed, also propagate to any other stories from this client
    if (editClientLogoOverride) {
      setStories((prev) =>
        prev.map((s) =>
          s.clientId === client.id ? { ...s, clientLogo: updatedLogo } : s,
        ),
      );
    }

    setEditStory(null);
    setEditImages([]);
    setEditImagesUploadError("");
    setEditImagesError("");
    setEditClientLogoOverride(null);
    setEditClientLogoOverrideName("");
    setEditClientLogoError("");
  };

  // ───────────────── Feed Card: add ─────────────────
  const handleFeedLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateLogoFile(file);
    if (error) {
      setFeedLogoError(error);
      setFeedLogo(null);
      setFeedLogoName("");
      e.target.value = "";
      return;
    }

    setFeedLogoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFeedLogo(ev.target?.result as string);
      setFeedLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleFeedImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const remainingSlots = 3 - feedImages.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToAdd) {
      const error = await validateMediaFile(file);
      if (error) {
        setFeedImagesError(error);
        continue;
      }
      setFeedImagesError("");
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setFeedImages((prev) =>
            prev.length < 3 ? [...prev, ev.target?.result as string] : prev,
          );
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = "";
  };

  const removeFeedImage = (index: number) => {
    setFeedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveFeed = () => {
    let hasError = false;

    if (!feedTitle.trim()) {
      setFeedTitleError("Title is mandatory.");
      hasError = true;
    } else {
      setFeedTitleError("");
    }

    if (!feedDesc.trim()) {
      setFeedDescError("Description is mandatory.");
      hasError = true;
    } else {
      setFeedDescError("");
    }

    if (!feedLocation.trim()) {
      setFeedLocationError("Location is mandatory.");
      hasError = true;
    } else {
      setFeedLocationError("");
    }

    if (!feedDate) {
      setFeedDateError("Date is mandatory.");
      hasError = true;
    } else {
      setFeedDateError("");
    }

    if (!feedLogo) {
      setFeedLogoError("Logo / Cover Image is mandatory.");
      hasError = true;
    }

    if (feedImages.length === 0) {
      setFeedImagesError("At least one image is mandatory.");
      hasError = true;
    }

    if (hasError) return;

    setFeedCards((prev) => [
      ...prev,
      {
        id: Date.now(),
        cover: feedLogo,
        images: feedImages,
        title: feedTitle.trim(),
        desc: feedDesc.trim(),
        location: feedLocation.trim(),
        date: feedDate,
        status: "Active",
      },
    ]);
    setFeedTitle("");
    setFeedDesc("");
    setFeedLocation("");
    setFeedDate("");
    setFeedLogo(null);
    setFeedLogoName("");
    setFeedImages([]);
    setFeedTitleError("");
    setFeedDescError("");
    setFeedLocationError("");
    setFeedDateError("");
    setFeedLogoError("");
    setFeedImagesError("");
    if (feedLogoRef.current) feedLogoRef.current.value = "";
    setShowFeedModal(false);
  };

  // ───────────────── Feed Card: edit ─────────────────
  const openEditFeed = (f: FeedCard) => {
    setEditFeed(f);
    setEditFeedTitle(f.title);
    setEditFeedDesc(f.desc);
    setEditFeedLocation(f.location);
    setEditFeedDate(f.date);
    setEditFeedStatus(f.status);
    setEditFeedLogo(f.cover);
    setEditFeedLogoName("");
    setEditFeedImages(f.images);
    setEditFeedTitleError("");
    setEditFeedDescError("");
    setEditFeedLocationError("");
    setEditFeedDateError("");
    setEditFeedLogoError("");
    setEditFeedImagesUploadError("");
    setEditFeedImagesError("");
  };

  const handleEditFeedLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateLogoFile(file);
    if (error) {
      setEditFeedLogoError(error);
      e.target.value = "";
      return;
    }

    setEditFeedLogoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditFeedLogo(ev.target?.result as string);
      setEditFeedLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleEditFeedImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const remainingSlots = 3 - editFeedImages.length;
    const filesToAdd = Array.from(files).slice(0, remainingSlots);

    for (const file of filesToAdd) {
      const error = await validateMediaFile(file);
      if (error) {
        setEditFeedImagesUploadError(error);
        continue;
      }
      setEditFeedImagesUploadError("");
      await new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setEditFeedImages((prev) =>
            prev.length < 3 ? [...prev, ev.target?.result as string] : prev,
          );
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }
    e.target.value = "";
  };

  const removeEditFeedImage = (index: number) => {
    setEditFeedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateFeed = () => {
    let hasError = false;

    if (!editFeedTitle.trim()) {
      setEditFeedTitleError("Title is mandatory.");
      hasError = true;
    } else {
      setEditFeedTitleError("");
    }

    if (!editFeedDesc.trim()) {
      setEditFeedDescError("Description is mandatory.");
      hasError = true;
    } else {
      setEditFeedDescError("");
    }

    if (!editFeedLocation.trim()) {
      setEditFeedLocationError("Location is mandatory.");
      hasError = true;
    } else {
      setEditFeedLocationError("");
    }

    if (!editFeedDate) {
      setEditFeedDateError("Date is mandatory.");
      hasError = true;
    } else {
      setEditFeedDateError("");
    }

    if (!editFeedLogo) {
      setEditFeedLogoError("Logo / Cover Image is mandatory.");
      hasError = true;
    } else {
      setEditFeedLogoError("");
    }

    if (editFeedImages.length === 0) {
      setEditFeedImagesError("At least one image is mandatory.");
      hasError = true;
    } else {
      setEditFeedImagesError("");
    }

    if (!editFeed || hasError) return;

    setFeedCards((prev) =>
      prev.map((f) =>
        f.id === editFeed.id
          ? {
              ...f,
              title: editFeedTitle.trim(),
              desc: editFeedDesc.trim(),
              location: editFeedLocation.trim(),
              date: editFeedDate,
              status: editFeedStatus,
              cover: editFeedLogo,
              images: editFeedImages,
            }
          : f,
      ),
    );
    setEditFeed(null);
    setEditFeedImages([]);
    setEditFeedLogoError("");
    setEditFeedImagesUploadError("");
    setEditFeedImagesError("");
  };
  const handleEditClientLogoChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateLogoFile(file);
    if (error) {
      setEditClientLogoError(error);
      e.target.value = "";
      return;
    }

    setEditClientLogoError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      setEditClientLogoOverride(ev.target?.result as string);
      setEditClientLogoOverrideName(file.name);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      {/* Page header */}
      <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A]">Home </h1>
          <p className="text-sm text-[#64748B] mt-0.5 max-w-lg">
            Manage the client carousel and featured feed cards shown on your
            public homepage.
          </p>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          {tab === "clients" && (
            <Btn
              variant="purple"
              icon={User}
              onClick={() => setShowAddClientModal(true)}
            >
              Add Client
            </Btn>
          )}
          <Btn
            icon={Plus}
            onClick={() =>
              tab === "clients"
                ? setShowStoryModal(true)
                : setShowFeedModal(true)
            }
          >
            {tab === "clients" ? "Add Client Story" : "Add Feed Card"}
          </Btn>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 p-1 bg-[#F1F5F9] rounded-xl w-fit">
        {(["clients", "feed"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"}`}
          >
            {t === "clients" ? "Client Carousel" : "Featured Feed Cards"}
          </button>
        ))}
      </div>

      {/* Clients table */}
      {tab === "clients" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <Th>Client</Th>
                  <Th>Event Name</Th>
                  <Th>Event Type</Th>
                  <Th>Location</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {stories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-[#94A3B8] text-sm"
                    >
                      No client stories yet. Click{" "}
                      <strong className="text-[#0F172A]">
                        Add Client Story
                      </strong>{" "}
                      to get started.
                    </td>
                  </tr>
                ) : (
                  stories.map((s, idx) => (
                    <tr
                      key={s.id}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Td>
                        <div className="flex items-center gap-2.5">
                          <ClientAvatar
                            logo={s.clientLogo}
                            initials={s.clientInitials}
                          />
                          <span className="font-medium text-[#0F172A]">
                            {s.clientName}
                          </span>
                        </div>
                      </Td>
                      <Td>{s.event}</Td>
                      <Td>
                        <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
                          {s.type}
                        </span>
                      </Td>
                      <Td className="text-[#64748B]">{s.location}</Td>
                      <Td>
                        <StatusBadge status={s.status} />
                      </Td>
                      <Td>
                        <div className="flex items-center gap-1">
                          <ReorderControls
                            index={idx}
                            total={stories.length}
                            onMoveUp={() => moveStory(idx, -1)}
                            onMoveDown={() => moveStory(idx, 1)}
                          />
                          <RowActions
                            onView={() => setViewStory(s)}
                            onEdit={() => openEditStory(s)}
                            onDelete={() =>
                              setStories((prev) =>
                                prev.filter((x) => x.id !== s.id),
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
      )}

      {/* Feed table */}
      {tab === "feed" && (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <Th>Cover</Th>
                  <Th>Title</Th>
                  <Th>Location</Th>
                  <Th>Date</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                {feedCards.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-[#94A3B8] text-sm"
                    >
                      No feed cards yet. Click{" "}
                      <strong className="text-[#0F172A]">Add Feed Card</strong>{" "}
                      to get started.
                    </td>
                  </tr>
                ) : (
                  feedCards.map((f, idx) => (
                    <tr
                      key={f.id}
                      className="hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Td>
                        <div className="w-16 h-10 rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden">
                          {f.cover ? (
                            <img
                              src={f.cover}
                              alt={f.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">🖼️</span>
                          )}
                        </div>
                      </Td>
                      <Td>
                        <p className="font-medium text-[#0F172A]">{f.title}</p>
                        <p className="text-[#94A3B8] text-xs mt-0.5 truncate max-w-[200px]">
                          {f.desc}
                        </p>
                      </Td>
                      <Td className="text-[#64748B]">{f.location}</Td>
                      <Td className="text-[#64748B]">
                        {f.date
                          ? new Date(f.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </Td>
                      <Td>
                        <StatusBadge status={f.status} />
                      </Td>
                      <Td>
                        <div className="flex items-center gap-1">
                          <ReorderControls
                            index={idx}
                            total={feedCards.length}
                            onMoveUp={() => moveFeed(idx, -1)}
                            onMoveDown={() => moveFeed(idx, 1)}
                          />
                          <RowActions
                            onView={() => setViewFeed(f)}
                            onEdit={() => openEditFeed(f)}
                            onDelete={() =>
                              setFeedCards((prev) =>
                                prev.filter((x) => x.id !== f.id),
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
      )}

      {/* MODAL: Add Client */}
      <Modal
        title="Add Client"
        isOpen={showAddClientModal}
        onClose={() => {
          setShowAddClientModal(false);
          setNewClientNameError("");
          setNewClientLogoError("");
        }}
      >
        <div className="space-y-4">
          <div>
            <HMInput
              label="Client / Brand Name *"
              placeholder="e.g. Samsung Electronics"
              value={newClientName}
              onChange={(v: string) => {
                setNewClientName(v);
                if (newClientNameError) setNewClientNameError("");
              }}
            />
            {newClientNameError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newClientNameError}
              </p>
            )}
          </div>
          <div>
            <FormLabel>Client Logo *</FormLabel>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Required: exactly {LOGO_WIDTH}x{LOGO_HEIGHT}px, max{" "}
              {LOGO_MAX_SIZE_BYTES / 1024}KB.
            </p>
            {newClientLogo ? (
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <img
                  src={newClientLogo}
                  alt="preview"
                  className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">
                    {newClientLogoName}
                  </p>
                  <p className="text-xs text-[#94A3B8]">Logo ready to save</p>
                </div>
                <button
                  onClick={() => {
                    setNewClientLogo(null);
                    setNewClientLogoName("");
                    setNewClientLogoError("");
                    if (clientLogoRef.current) clientLogoRef.current.value = "";
                  }}
                  className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <UploadZone
                label="Upload Logo"
                hint={`PNG, JPG — exactly ${LOGO_WIDTH}x${LOGO_HEIGHT}px, max ${LOGO_MAX_SIZE_BYTES / 1024}KB`}
                onClick={() => clientLogoRef.current?.click()}
              />
            )}
            <input
              ref={clientLogoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleClientLogoChange}
            />
            {newClientLogoError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newClientLogoError}
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-1">
            <Btn
              variant="secondary"
              onClick={() => {
                setShowAddClientModal(false);
                setNewClientNameError("");
                setNewClientLogoError("");
              }}
            >
              Cancel
            </Btn>
            <Btn onClick={handleSaveClient}>Save Client</Btn>
          </div>
        </div>
      </Modal>

      {/* MODAL: Add Client Story */}
      <Modal
        title="Add Client Story"
        isOpen={showStoryModal}
        onClose={() => setShowStoryModal(false)}
      >
        <div className="space-y-4">
          <div>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Images or reels. Max {MEDIA_MAX_SIZE_BYTES / (1024 * 1024)}MB —
              images: up to {MEDIA_MAX_WIDTH}x{MEDIA_MAX_HEIGHT}px, min width{" "}
              {MEDIA_MIN_WIDTH}px. At least one file required.
            </p>
            <MediaGrid
              images={storyImages}
              onRemove={removeStoryImage}
              onAdd={() => storyImageRef.current?.click()}
              fileInputRef={storyImageRef}
              onFileChange={handleStoryImageChange}
              editable
            />
            {storyImagesError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {storyImagesError}
              </p>
            )}
          </div>
          <div>
            <FormLabel>Client Name *</FormLabel>
            <select
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] bg-white transition-all"
              value={storyClientId}
              onChange={(e) => {
                setStoryClientId(e.target.value);
                if (storyClientIdError) setStoryClientIdError("");
              }}
            >
              <option value="" disabled>
                — Select a client —
              </option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {storyClientIdError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {storyClientIdError}
              </p>
            )}
            {clients.length === 0 && (
              <p className="text-xs text-[#94A3B8] mt-1.5">
                No clients yet. Use{" "}
                <button
                  className="text-[#0F4C81] font-semibold underline"
                  onClick={() => {
                    setShowStoryModal(false);
                    setShowAddClientModal(true);
                  }}
                >
                  Add Client
                </button>{" "}
                to register one first.
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <HMInput
                label="Event Name *"
                placeholder="e.g. Galaxy AI Launch"
                value={storyEventName}
                onChange={(v: string) => {
                  setStoryEventName(v);
                  if (storyEventNameError) setStoryEventNameError("");
                }}
              />
              {storyEventNameError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {storyEventNameError}
                </p>
              )}
            </div>
            <HMSelect
              label="Event Type *"
              value={storyEventType}
              onChange={(v) => setStoryEventType(v as EventType)}
            >
              <option>Product Launch</option>
              <option>Brand Activation</option>
              <option>Conference</option>
              <option>Exhibition</option>
              <option>Sponsorship</option>
            </HMSelect>
          </div>
          <div>
            <HMInput
              label="Location *"
              placeholder="e.g. Dubai, UAE"
              value={storyLocation}
              onChange={(v: string) => {
                setStoryLocation(v);
                if (storyLocationError) setStoryLocationError("");
              }}
            />
            {storyLocationError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {storyLocationError}
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-1">
            <Btn variant="secondary" onClick={() => setShowStoryModal(false)}>
              Cancel
            </Btn>
            <Btn onClick={handleSaveStory}>Save Entry</Btn>
          </div>
        </div>
      </Modal>

      {/* MODAL: View Client Story */}
      {/* MODAL: View Client Story */}
      {viewStory && (
        <Modal
          title="Client Story Details"
          isOpen={!!viewStory}
          onClose={() => setViewStory(null)}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <ClientAvatar
                logo={viewStory.clientLogo}
                initials={viewStory.clientInitials}
                size={48}
              />
              <div>
                <p className="font-semibold text-[#0F172A] text-base">
                  {viewStory.clientName}
                </p>
                <StatusBadge status={viewStory.status} />
              </div>
            </div>

            {/* Client Logo — dedicated, clearly visible */}
            {/* <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                Client Logo
              </p>
              {viewStory.clientLogo ? (
                <img
                  src={viewStory.clientLogo}
                  alt={`${viewStory.clientName} logo`}
                  className="w-24 h-24 rounded-lg object-cover border border-[#E2E8F0] bg-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-lg border border-dashed border-[#E2E8F0] bg-white flex items-center justify-center text-[#94A3B8] text-xs">
                  No logo
                </div>
              )}
            </div> */}

            <MediaGrid images={viewStory.images} editable={false} />
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Event Name
                </p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {viewStory.event}
                </p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Event Type
                </p>
                <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
                  {viewStory.type}
                </span>
              </div>
            </div>
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                <MapPin size={11} /> Location
              </p>
              <p className="text-sm font-medium text-[#0F172A]">
                {viewStory.location}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: Edit Client Story */}
      {/* MODAL: Edit Client Story */}
      {editStory && (
        <Modal
          title="Edit Client Story"
          isOpen={!!editStory}
          onClose={() => {
            setEditStory(null);
            setEditImages([]);
            setEditImagesUploadError("");
            setEditImagesError("");
            setEditClientLogoOverride(null);
            setEditClientLogoOverrideName("");
            setEditClientLogoError("");
          }}
        >
          <div className="space-y-4">
            <div>
              <p className="text-xs text-[#94A3B8] mb-1.5">
                Images or reels. Max {MEDIA_MAX_SIZE_BYTES / (1024 * 1024)}MB —
                images: up to {MEDIA_MAX_WIDTH}x{MEDIA_MAX_HEIGHT}px, min width{" "}
                {MEDIA_MIN_WIDTH}px. At least one file required.
              </p>
              <MediaGrid
                images={editImages}
                onRemove={(i) =>
                  setEditImages((prev) => prev.filter((_, idx) => idx !== i))
                }
                onAdd={() => editImageRef.current?.click()}
                fileInputRef={editImageRef}
                onFileChange={handleEditImageChange}
                editable
              />
              {editImagesUploadError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editImagesUploadError}
                </p>
              )}
              {editImagesError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editImagesError}
                </p>
              )}
            </div>

            <div>
              <FormLabel>Client Name *</FormLabel>
              <select
                className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] bg-white transition-all"
                value={editClientId}
                onChange={(e) => {
                  setEditClientId(e.target.value);
                  if (editClientIdError) setEditClientIdError("");
                }}
              >
                <option value="" disabled>
                  — Select a client —
                </option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {editClientIdError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editClientIdError}
                </p>
              )}

              {/* Selected client's logo — live preview */}
              {/* Selected client's logo — editable */}
              {editClientId &&
                (() => {
                  const selectedClient = clients.find(
                    (c) => c.id === Number(editClientId),
                  );
                  if (!selectedClient) return null;
                  const currentLogo =
                    editClientLogoOverride ?? selectedClient.logo;

                  return (
                    <div className="mt-3">
                      <FormLabel>Client Logo</FormLabel>
                      <p className="text-xs text-[#94A3B8] mb-1.5">
                        Required: exactly {LOGO_WIDTH}x{LOGO_HEIGHT}px, max{" "}
                        {LOGO_MAX_SIZE_BYTES / 1024}KB.
                      </p>
                      {currentLogo ? (
                        <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                          <img
                            src={currentLogo}
                            alt={`${selectedClient.name} logo`}
                            className="w-12 h-12 rounded-lg object-cover border border-[#E2E8F0] bg-white"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0F172A] truncate">
                              {editClientLogoOverrideName ||
                                selectedClient.name}
                            </p>
                            <p className="text-xs text-[#94A3B8]">
                              {editClientLogoOverride
                                ? "New logo ready to save"
                                : "Current logo"}
                            </p>
                          </div>
                          <button
                            onClick={() => editClientLogoRef.current?.click()}
                            className="text-xs text-[#0F4C81] hover:underline transition-colors font-medium"
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <UploadZone
                          label="Upload Logo"
                          hint={`PNG, JPG — exactly ${LOGO_WIDTH}x${LOGO_HEIGHT}px, max ${LOGO_MAX_SIZE_BYTES / 1024}KB`}
                          onClick={() => editClientLogoRef.current?.click()}
                        />
                      )}
                      <input
                        ref={editClientLogoRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEditClientLogoChange}
                      />
                      {editClientLogoError && (
                        <p className="text-xs text-red-500 mt-1.5 font-medium">
                          {editClientLogoError}
                        </p>
                      )}
                    </div>
                  );
                })()}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <HMInput
                  label="Event Name *"
                  placeholder="e.g. Galaxy AI Launch"
                  value={editEventName}
                  onChange={(v: string) => {
                    setEditEventName(v);
                    if (editEventNameError) setEditEventNameError("");
                  }}
                />
                {editEventNameError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editEventNameError}
                  </p>
                )}
              </div>
              <HMSelect
                label="Event Type *"
                value={editEventType}
                onChange={(v) => setEditEventType(v as EventType)}
              >
                <option>Product Launch</option>
                <option>Brand Activation</option>
                <option>Conference</option>
                <option>Exhibition</option>
                <option>Sponsorship</option>
              </HMSelect>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <HMInput
                  label="Location *"
                  placeholder="e.g. Dubai, UAE"
                  value={editLocation}
                  onChange={(v: string) => {
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
              <HMSelect
                label="Status *"
                value={editStatus}
                onChange={(v) => setEditStatus(v as HMStatus)}
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </HMSelect>
            </div>

            <div className="flex gap-3 pt-1">
              <Btn
                variant="secondary"
                onClick={() => {
                  setEditStory(null);
                  setEditImages([]);
                  setEditImagesUploadError("");
                  setEditImagesError("");
                  setEditClientLogoOverride(null);
                  setEditClientLogoOverrideName("");
                  setEditClientLogoError("");
                }}
              >
                Cancel
              </Btn>
              <Btn onClick={handleUpdateStory}>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: Add Feed Card */}
      <Modal
        title="Add Feed Card"
        isOpen={showFeedModal}
        onClose={() => setShowFeedModal(false)}
      >
        <div className="space-y-4">
          <div>
            <FormLabel>Feed Logo / Cover Image *</FormLabel>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Required: exactly {LOGO_WIDTH}x{LOGO_HEIGHT}px, max{" "}
              {LOGO_MAX_SIZE_BYTES / 1024}KB.
            </p>
            {feedLogo ? (
              <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <img
                  src={feedLogo}
                  alt="preview"
                  className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">
                    {feedLogoName}
                  </p>
                  <p className="text-xs text-[#94A3B8]">Logo ready to save</p>
                </div>
                <button
                  onClick={() => {
                    setFeedLogo(null);
                    setFeedLogoName("");
                    if (feedLogoRef.current) feedLogoRef.current.value = "";
                  }}
                  className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            ) : (
              <UploadZone
                label="Upload Logo / Cover"
                hint={`PNG, JPG — exactly ${LOGO_WIDTH}x${LOGO_HEIGHT}px, max ${LOGO_MAX_SIZE_BYTES / 1024}KB`}
                onClick={() => feedLogoRef.current?.click()}
              />
            )}
            <input
              ref={feedLogoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFeedLogoChange}
            />
            {feedLogoError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {feedLogoError}
              </p>
            )}
          </div>
          <div>
            <p className="text-xs text-[#94A3B8] mb-1.5">
              Images or videos. Max {MEDIA_MAX_SIZE_BYTES / (1024 * 1024)}MB —
              images: up to {MEDIA_MAX_WIDTH}x{MEDIA_MAX_HEIGHT}px, min width{" "}
              {MEDIA_MIN_WIDTH}px. At least one file required.
            </p>
            <MediaGrid
              images={feedImages}
              onRemove={removeFeedImage}
              onAdd={() => feedImageRef.current?.click()}
              fileInputRef={feedImageRef}
              onFileChange={handleFeedImageChange}
              editable
            />
            {feedImagesError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {feedImagesError}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <HMInput
                label="Title *"
                placeholder="e.g. Gala Night Recap"
                value={feedTitle}
                onChange={(v: string) => {
                  setFeedTitle(v);
                  if (feedTitleError) setFeedTitleError("");
                }}
              />
              {feedTitleError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {feedTitleError}
                </p>
              )}
            </div>
            <div>
              <HMInput
                label="Location *"
                placeholder="e.g. Paris, France"
                value={feedLocation}
                onChange={(v: string) => {
                  setFeedLocation(v);
                  if (feedLocationError) setFeedLocationError("");
                }}
              />
              {feedLocationError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {feedLocationError}
                </p>
              )}
            </div>
          </div>
          <div>
            <FormLabel>Date *</FormLabel>
            <input
              type="date"
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
              value={feedDate}
              onChange={(e) => {
                setFeedDate(e.target.value);
                if (feedDateError) setFeedDateError("");
              }}
            />
            {feedDateError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {feedDateError}
              </p>
            )}
          </div>
          <div>
            <HMInput
              label="Description *"
              placeholder="Short description..."
              value={feedDesc}
              onChange={(v: string) => {
                setFeedDesc(v);
                if (feedDescError) setFeedDescError("");
              }}
            />
            {feedDescError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {feedDescError}
              </p>
            )}
          </div>
          <div className="flex gap-3 pt-1">
            <Btn variant="secondary" onClick={() => setShowFeedModal(false)}>
              Cancel
            </Btn>
            <Btn onClick={handleSaveFeed}>Save Entry</Btn>
          </div>
        </div>
      </Modal>

      {/* MODAL: View Feed Card */}
      {viewFeed && (
        <Modal
          title="Feed Card Details"
          isOpen={!!viewFeed}
          onClose={() => setViewFeed(null)}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden flex-shrink-0">
                {viewFeed.cover ? (
                  <img
                    src={viewFeed.cover}
                    alt={viewFeed.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🖼️</span>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#0F172A] text-base">
                  {viewFeed.title}
                </p>
                <StatusBadge status={viewFeed.status} />
              </div>
            </div>
            <MediaGrid images={viewFeed.images} editable={false} />
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                Description
              </p>
              <p className="text-sm font-medium text-[#0F172A]">
                {viewFeed.desc}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1 flex items-center gap-1.5">
                  <MapPin size={11} /> Location
                </p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {viewFeed.location}
                </p>
              </div>
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                  Date
                </p>
                <p className="text-sm font-medium text-[#0F172A]">
                  {viewFeed.date
                    ? new Date(viewFeed.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* MODAL: Edit Feed Card */}
      {/* MODAL: Edit Feed Card */}
      {editFeed && (
        <Modal
          title="Edit Feed Card"
          isOpen={!!editFeed}
          onClose={() => {
            setEditFeed(null);
            setEditFeedImages([]);
            setEditFeedLogoError("");
            setEditFeedImagesUploadError("");
            setEditFeedImagesError("");
            setEditFeedTitleError("");
            setEditFeedDescError("");
            setEditFeedLocationError("");
            setEditFeedDateError("");
          }}
        >
          <div className="space-y-4">
            <div>
              <FormLabel>Feed Logo / Cover Image *</FormLabel>
              <p className="text-xs text-[#94A3B8] mb-1.5">
                Required: exactly {LOGO_WIDTH}x{LOGO_HEIGHT}px, max{" "}
                {LOGO_MAX_SIZE_BYTES / 1024}KB.
              </p>
              {editFeedLogo ? (
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                  <img
                    src={editFeedLogo}
                    alt="preview"
                    className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A] truncate">
                      {editFeedLogoName || "Current logo"}
                    </p>
                    <p className="text-xs text-[#94A3B8]">Logo ready to save</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditFeedLogo(null);
                      setEditFeedLogoName("");
                      if (editFeedLogoRef.current)
                        editFeedLogoRef.current.value = "";
                    }}
                    className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <UploadZone
                  label="Upload Logo / Cover"
                  hint={`PNG, JPG — exactly ${LOGO_WIDTH}x${LOGO_HEIGHT}px, max ${LOGO_MAX_SIZE_BYTES / 1024}KB`}
                  onClick={() => editFeedLogoRef.current?.click()}
                />
              )}
              <input
                ref={editFeedLogoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleEditFeedLogoChange}
              />
              {editFeedLogoError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editFeedLogoError}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs text-[#94A3B8] mb-1.5">
                Images or videos. Max {MEDIA_MAX_SIZE_BYTES / (1024 * 1024)}MB —
                images: up to {MEDIA_MAX_WIDTH}x{MEDIA_MAX_HEIGHT}px, min width{" "}
                {MEDIA_MIN_WIDTH}px. At least one file required.
              </p>
              <MediaGrid
                images={editFeedImages}
                onRemove={removeEditFeedImage}
                onAdd={() => editFeedImageRef.current?.click()}
                fileInputRef={editFeedImageRef}
                onFileChange={handleEditFeedImageChange}
                editable
              />
              {editFeedImagesUploadError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editFeedImagesUploadError}
                </p>
              )}
              {editFeedImagesError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editFeedImagesError}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <HMInput
                  label="Title *"
                  placeholder="e.g. Gala Night Recap"
                  value={editFeedTitle}
                  onChange={(v: string) => {
                    setEditFeedTitle(v);
                    if (editFeedTitleError) setEditFeedTitleError("");
                  }}
                />
                {editFeedTitleError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editFeedTitleError}
                  </p>
                )}
              </div>
              <div>
                <HMInput
                  label="Location *"
                  placeholder="e.g. Paris, France"
                  value={editFeedLocation}
                  onChange={(v: string) => {
                    setEditFeedLocation(v);
                    if (editFeedLocationError) setEditFeedLocationError("");
                  }}
                />
                {editFeedLocationError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editFeedLocationError}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <FormLabel>Date *</FormLabel>
                <input
                  type="date"
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
                  value={editFeedDate}
                  onChange={(e) => {
                    setEditFeedDate(e.target.value);
                    if (editFeedDateError) setEditFeedDateError("");
                  }}
                />
                {editFeedDateError && (
                  <p className="text-xs text-red-500 mt-1.5 font-medium">
                    {editFeedDateError}
                  </p>
                )}
              </div>
              <HMSelect
                label="Status *"
                value={editFeedStatus}
                onChange={(v) => setEditFeedStatus(v as HMStatus)}
              >
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </HMSelect>
            </div>

            <div>
              <HMInput
                label="Description *"
                placeholder="Short description..."
                value={editFeedDesc}
                onChange={(v: string) => {
                  setEditFeedDesc(v);
                  if (editFeedDescError) setEditFeedDescError("");
                }}
              />
              {editFeedDescError && (
                <p className="text-xs text-red-500 mt-1.5 font-medium">
                  {editFeedDescError}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <Btn
                variant="secondary"
                onClick={() => {
                  setEditFeed(null);
                  setEditFeedImages([]);
                  setEditFeedLogoError("");
                  setEditFeedImagesUploadError("");
                  setEditFeedImagesError("");
                  setEditFeedTitleError("");
                  setEditFeedDescError("");
                  setEditFeedLocationError("");
                  setEditFeedDateError("");
                }}
              >
                Cancel
              </Btn>
              <Btn onClick={handleUpdateFeed}>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};