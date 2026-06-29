export type SectionId =
  | "dashboard"
  | "home-management"
  | "events"
  | "campaigns"
  | "activations"
  | "exhibitions"
  | "presence"
  | "profile"
  | "case-studies"
  | "awards"
  | "messages"
  | "media-library"
  | "settings";

export interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
export type EventStatus = "Upcoming" | "Active" | "Completed";

export interface EventItem {
  id: number;
  image: string | null;
  name: string;
  location: string;
  type: EventType;
  date: string;
  attendance: number;
  status: EventStatus;
}
// Home Management types
export type HMStatus = "Active" | "Draft" | "Archived";
export type MediaType = "Photo" | "Video" | "Reel";
export type EventType =
  | "Product Launch"
  | "Brand Activation"
  | "Conference"
  | "Exhibition"
  | "Sponsorship";

export interface Client {
  id: number;
  name: string;
  logo: string | null;
  initials: string;
}

export interface ClientStory {
  id: number;
  clientId: number;
  clientName: string;
  clientLogo: string | null;
  clientInitials: string;
  event: string;
  type: EventType;
  location: string;
  status: HMStatus;
  images: string[];
}

export interface FeedCard {
  id: number;
  cover: string | null;
  images: string[];
  title: string;
  desc: string;
  location: string;
  date: string;

  status: HMStatus;
}