import { useState, useRef } from "react";
import Toast from "react-hot-toast";
import {
  LayoutDashboard,
  Home,
  Calendar,
  Megaphone,
  Flame,
  Building2,
  MapPin,
  User,
  BookOpen,
  Trophy,
  MessageSquare,
  ImageIcon,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Archive,
  Upload,
  Users,
  CheckCircle2,
  Globe,
  Target,
  Activity,
  TrendingUp,
  X,
  LogOut,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  ArrowUp,
  ArrowDown,
  Phone,
  Mail,
  Film,
  FileText,
  Send,
  Lock,
  Grid,
  ExternalLink,
  Download,
  Award,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Check,
  Star,
  BarChart2,
  Layers,
  Filter,
  Camera,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ─── TYPES ──────────────────────────────────────────────────────────────────
type SectionId =
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

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
type EventStatus = "Upcoming" | "Active" | "Completed";

interface EventItem {
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
type HMStatus = "Active" | "Draft" | "Archived";
type MediaType = "Photo" | "Video" | "Reel";
type EventType =
  | "Product Launch"
  | "Brand Activation"
  | "Conference"
  | "Exhibition"
  | "Sponsorship";

interface Client {
  id: number;
  name: string;
  logo: string | null;
  initials: string;
}

interface ClientStory {
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

interface FeedCard {
  id: number;
  cover: string | null;
  images: string[];
  title: string;
  desc: string;
  location: string;
  date: string;

  status: HMStatus;
}

// ─── NAV ────────────────────────────────────────────────────────────────────
const NAV: NavItem[] = [
  { id: "home-management", label: "Home", icon: Home },
  { id: "events", label: "Events", icon: Calendar },
  { id: "campaigns", label: "Digital Campaigns", icon: Megaphone },
  { id: "activations", label: "Activations", icon: Flame },
  { id: "exhibitions", label: "Exhibitions", icon: Building2 },
  { id: "profile", label: "Profile", icon: User },
  { id: "case-studies", label: "Case Studies", icon: BookOpen },
  { id: "awards", label: "Awards & Recognition", icon: Trophy },
  { id: "messages", label: "Messages", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const SECTION_TITLES: Record<SectionId, string> = {
  dashboard: "Dashboard",
  "home-management": "Home Management",
  events: "Events",
  campaigns: "Digital Campaigns",
  activations: "Activations",
  exhibitions: "Exhibitions",
  presence: "Presence",
  profile: "Profile",
  "case-studies": "Case Studies",
  awards: "Awards & Recognition",
  messages: "Messages",
  "media-library": "Media Library",
  settings: "Settings",
};

// ─── MOCK DATA ───────────────────────────────────────────────────────────────
const monthlyData = [
  { month: "Jan", events: 14, attendance: 9800 },
  { month: "Feb", events: 19, attendance: 13200 },
  { month: "Mar", events: 16, attendance: 11100 },
  { month: "Apr", events: 24, attendance: 16800 },
  { month: "May", events: 31, attendance: 21700 },
  { month: "Jun", events: 38, attendance: 26600 },
  { month: "Jul", events: 29, attendance: 20300 },
  { month: "Aug", events: 22, attendance: 15400 },
  { month: "Sep", events: 41, attendance: 28700 },
  { month: "Oct", events: 47, attendance: 32900 },
  { month: "Nov", events: 52, attendance: 36400 },
  { month: "Dec", events: 58, attendance: 40600 },
];

const kpiData = [
  {
    label: "Total Events Managed",
    value: "1,247",
    trend: "+12.4%",
    up: true,
    icon: Calendar,
    color: "#0F4C81",
    bg: "#EFF6FF",
  },
  {
    label: "Total Clients",
    value: "386",
    trend: "+8.2%",
    up: true,
    icon: Users,
    color: "#0F4C81",
    bg: "#EFF6FF",
  },
  {
    label: "Cities Covered",
    value: "42",
    trend: "+3",
    up: true,
    icon: Globe,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Total Attendance",
    value: "2.8M",
    trend: "+18.7%",
    up: true,
    icon: Activity,
    color: "#10B981",
    bg: "#ECFDF5",
  },
  {
    label: "Campaign Reach",
    value: "47.3M",
    trend: "+24.1%",
    up: true,
    icon: Target,
    color: "#F97316",
    bg: "#FFF7ED",
  },
  {
    label: "Total Engagements",
    value: "12.6M",
    trend: "+31.5%",
    up: true,
    icon: TrendingUp,
    color: "#F97316",
    bg: "#FFF7ED",
  },
];

const recentActivities = [
  {
    time: "2h ago",
    text: "Samsung Galaxy AI Launch event created",
    type: "event",
  },
  {
    time: "4h ago",
    text: "Nike Air Campaign surpassed 5M reach milestone",
    type: "campaign",
  },
  {
    time: "Yesterday",
    text: "BMW Auto Show gallery uploaded — 42 assets",
    type: "media",
  },
  {
    time: "Yesterday",
    text: "Mastercard MEA onboarded as a new client",
    type: "client",
  },
  {
    time: "2d ago",
    text: "GITEX Global 2024 Exhibition successfully completed",
    type: "exhibition",
  },
  {
    time: "3d ago",
    text: "Best Brand Activation Award 2024 received",
    type: "award",
  },
];

const topCampaigns = [
  {
    name: "Coca-Cola Refresh 2024",
    client: "Coca-Cola",
    reach: "15.3M",
    eng: "3.2M",
    status: "Active",
  },
  {
    name: "Samsung Galaxy Universe",
    client: "Samsung",
    reach: "12.7M",
    eng: "2.1M",
    status: "Active",
  },
  {
    name: "Nike Digital Sprint",
    client: "Nike",
    reach: "8.2M",
    eng: "1.4M",
    status: "Active",
  },
  {
    name: "Emirates Sky Stories",
    client: "Emirates",
    reach: "6.9M",
    eng: "980K",
    status: "Completed",
  },
  {
    name: "BMW Drive Forward",
    client: "BMW",
    reach: "4.1M",
    eng: "620K",
    status: "Paused",
  },
];

const eventsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=55&fit=crop",
    name: "Samsung Galaxy AI Launch 2024",
    location: "Dubai, UAE",
    type: "Product Launch",
    date: "Dec 15, 2024",
    attendance: 12500,
    status: "Upcoming",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=80&h=55&fit=crop",
    name: "GITEX Global Tech Exhibition",
    location: "Dubai, UAE",
    type: "Exhibition",
    date: "Oct 14–18, 2024",
    attendance: 48000,
    status: "Completed",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=80&h=55&fit=crop",
    name: "Nike Air Max Global Activation",
    location: "London, UK",
    type: "Brand Activation",
    date: "Nov 08, 2024",
    attendance: 8200,
    status: "Active",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&h=55&fit=crop",
    name: "Emirates Corporate Summit 2024",
    location: "Abu Dhabi, UAE",
    type: "Conference",
    date: "Sep 22–24, 2024",
    attendance: 3400,
    status: "Completed",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=80&h=55&fit=crop",
    name: "Mastercard Innovation Summit",
    location: "Riyadh, KSA",
    type: "Conference",
    date: "Jan 14, 2025",
    attendance: 2100,
    status: "Upcoming",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=80&h=55&fit=crop",
    name: "Unilever Brand Experience Tour",
    location: "Singapore",
    type: "Brand Activation",
    date: "Aug 30, 2024",
    attendance: 6800,
    status: "Completed",
  },
];

const campaignsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=55&fit=crop",
    name: "Samsung Galaxy Universe",
    date: "Oct 2024",
    reach: "12.7M",
    engagement: "2.1M",
    services: ["Social Media", "Influencer", "OOH"],
    status: "Active",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=55&fit=crop",
    name: "Coca-Cola Refresh 2024",
    date: "Aug 2024",
    reach: "15.3M",
    engagement: "3.2M",
    services: ["Digital", "TVC", "Events"],
    status: "Active",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=80&h=55&fit=crop",
    name: "Nike Digital Sprint",
    date: "Nov 2024",
    reach: "8.2M",
    engagement: "1.4M",
    services: ["Social Media", "Influencer"],
    status: "Active",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=80&h=55&fit=crop",
    name: "Emirates Sky Stories",
    date: "Sep 2024",
    reach: "6.9M",
    engagement: "980K",
    services: ["Content", "Digital", "PR"],
    status: "Completed",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=80&h=55&fit=crop",
    name: "BMW Drive Forward",
    date: "Jul 2024",
    reach: "4.1M",
    engagement: "620K",
    services: ["OOH", "Digital", "Events"],
    status: "Paused",
  },
];

const activationsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=80&h=55&fit=crop",
    name: "Nike Air Max Street Activation",
    reach: "8,200+",
    highlights: "12 cities, 48 activators, viral UGC campaign",
    status: "Active",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=80&h=55&fit=crop",
    name: "Samsung Galaxy Experiential Hub",
    reach: "22,000+",
    highlights: "Interactive AR/VR demos, live keynote presentations",
    status: "Completed",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=55&fit=crop",
    name: "Coca-Cola Summer Refresh Tour",
    reach: "45,000+",
    highlights: "50 locations, product sampling & community engagement",
    status: "Completed",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&h=55&fit=crop",
    name: "Mastercard Tap & Pay Experience",
    reach: "5,400+",
    highlights: "Contactless payment demo at 8 premium malls",
    status: "Upcoming",
  },
];

const exhibitionsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=80&h=55&fit=crop",
    name: "GITEX Global 2024",
    attendance: "48,000",
    booth: "1,200 sqm",
    highlights: "AI showcase, 6 sub-brands, media day",
    status: "Completed",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=80&h=55&fit=crop",
    name: "BMW World Auto Show",
    attendance: "32,000",
    booth: "850 sqm",
    highlights: "4 new model launches, VIP preview night",
    status: "Completed",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=80&h=55&fit=crop",
    name: "Arab Health 2025",
    attendance: "18,000",
    booth: "640 sqm",
    highlights: "MedTech innovations, live surgery demos",
    status: "Upcoming",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3603?w=80&h=55&fit=crop",
    name: "Big 5 Construction Expo",
    attendance: "26,500",
    booth: "920 sqm",
    highlights: "Sustainable building tech focus",
    status: "Upcoming",
  },
];

const locationsData = [
  {
    id: 1,
    city: "Dubai",
    address: "Level 18, One Business Bay, Business Bay, Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=160&fit=crop",
  },
  {
    id: 2,
    city: "Abu Dhabi",
    address: "Capital Gate Tower, Abu Dhabi Global Market Square, UAE",
    image:
      "https://images.unsplash.com/photo-1539631975258-9b5eab95b5e1?w=300&h=160&fit=crop",
  },
  {
    id: 3,
    city: "Riyadh",
    address: "Kingdom Tower, King Fahad Road, Al Olaya, Riyadh, KSA",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=300&h=160&fit=crop",
  },
  {
    id: 4,
    city: "Cairo",
    address: "Nile City Towers, Corniche El Nil, Cairo, Egypt",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=300&h=160&fit=crop",
  },
  {
    id: 5,
    city: "London",
    address: "10 Canary Wharf, Level 22, London E14 5AB, United Kingdom",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=160&fit=crop",
  },
  {
    id: 6,
    city: "New York",
    address: "One World Trade Center, 31st Floor, New York, NY 10007, USA",
    image:
      "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=300&h=160&fit=crop",
  },
  {
    id: 7,
    city: "Singapore",
    address: "Marina Bay Financial Centre Tower 3, Level 14, Singapore 018982",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=300&h=160&fit=crop",
  },
  {
    id: 8,
    city: "Mumbai",
    address: "Bandra Kurla Complex, Bandra East, Mumbai 400051, India",
    image:
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=300&h=160&fit=crop",
  },
];

const profileGallery = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=350&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=320&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=260&fit=crop",
];

const caseStudies = [
  {
    id: 1,
    name: "Samsung Galaxy Multiverse Experience",
    location: "Dubai, UAE",
    year: "2024",
    attendance: "22,000+",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=360&fit=crop",
    description:
      "A groundbreaking immersive brand experience that transported visitors into the Samsung Galaxy universe. The activation featured AR/VR zones, live product demos, and a social media wall, generating over 2M impressions within 72 hours of launch. The custom-built 1,800 sqm venue in Dubai Design District became the most talked-about brand experience in the region.",
  },
  {
    id: 2,
    name: "Nike Run Dubai 2024",
    location: "Dubai, UAE",
    year: "2024",
    attendance: "8,500+",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=360&fit=crop",
    description:
      "An electrifying city-wide running activation across 14km of downtown Dubai, partnered with 120 global running communities and broadcast to 48 countries live. The event generated 18M social impressions and a 340% spike in Nike+ app downloads across the GCC.",
  },
  {
    id: 3,
    name: "Emirates First Class Journey",
    location: "Abu Dhabi",
    year: "2023",
    attendance: "3,200+",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=360&fit=crop",
    description:
      "An exclusive experiential marketing campaign for Emirates First Class cabin reveal. Invited media, top-tier influencers, and HNWI guests for an unforgettable simulated A380 experience, resulting in $12M in earned media value.",
  },
];

const awardsData = [
  {
    id: 1,
    name: "Best Brand Activation Agency 2024",
    type: "Industry Award",
    location: "Dubai, UAE",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800&h=360&fit=crop",
    description:
      "Awarded by MENA Events Awards for outstanding contribution to brand experience marketing across the region. APEX won gold in all three nominated categories: Best Large-Scale Activation, Best Experiential Strategy, and Agency of the Year.",
  },
  {
    id: 2,
    name: "Dubai Lynx Gold — Experiential",
    type: "Creative Award",
    location: "Dubai, UAE",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&h=360&fit=crop",
    description:
      "Recognized for the Samsung Galaxy Multiverse Experience campaign, which set a new benchmark for experiential marketing in the MENA region. Judges praised the seamless blend of technology and human storytelling.",
  },
  {
    id: 3,
    name: "Event Marketer IT Award",
    type: "International Award",
    location: "Chicago, USA",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3603?w=800&h=360&fit=crop",
    description:
      "Received the prestigious IT Award from Event Marketer magazine for innovation in trade show and exhibition design, specifically for the GITEX Global 2023 Samsung pavilion.",
  },
];

const messagesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@techcorp.com",
    phone: "+1 212 555 0142",
    subject: "Event Management Inquiry",
    message:
      "We are planning a product launch for Q1 2025 with an expected attendance of 5,000 guests. Could you share your full capabilities and a ballpark investment range?",
    date: "Dec 10, 2024",
    status: "New",
  },
  {
    id: 2,
    name: "Mohammed Al-Rashid",
    email: "m.rashid@globalmedia.ae",
    phone: "+971 50 123 4567",
    subject: "Exhibition Booth Design",
    message:
      "We require a 500 sqm custom exhibition booth for Arab Health 2025. Looking for a complete turnkey solution including design, build, logistics, and staffing.",
    date: "Dec 9, 2024",
    status: "Replied",
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily.chen@brandco.sg",
    phone: "+65 9123 4567",
    subject: "Digital Campaign Partnership",
    message:
      "We are interested in a 6-month integrated digital brand activation campaign across Southeast Asia markets. Our budget range is $500K-$1M.",
    date: "Dec 8, 2024",
    status: "New",
  },
  {
    id: 4,
    name: "Carlos Rodriguez",
    email: "c.rodriguez@eventos.mx",
    phone: "+52 55 1234 5678",
    subject: "Brand Activation Proposal",
    message:
      "We need a comprehensive brand activation strategy for our new product line launch across LATAM markets. Timeline is Q2 2025.",
    date: "Dec 7, 2024",
    status: "Archived",
  },
  {
    id: 5,
    name: "Priya Sharma",
    email: "priya@hindustan.in",
    phone: "+91 98765 43210",
    subject: "Awards Gala Planning",
    message:
      "Planning an awards gala ceremony for 800 guests in Mumbai. Require complete production, AV, decor, catering coordination, and event management.",
    date: "Dec 6, 2024",
    status: "Replied",
  },
];

const mediaItems = [
  {
    id: 1,
    type: "image",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=320&h=220&fit=crop",
    name: "Samsung Launch Event.jpg",
    size: "2.4 MB",
    date: "Dec 1, 2024",
    cat: "Events",
  },
  {
    id: 2,
    type: "image",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=320&h=220&fit=crop",
    name: "GITEX Exhibition Hall.jpg",
    size: "3.1 MB",
    date: "Nov 28, 2024",
    cat: "Exhibitions",
  },
  {
    id: 3,
    type: "video",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=320&h=220&fit=crop",
    name: "Nike Activation Reel.mp4",
    size: "128 MB",
    date: "Nov 25, 2024",
    cat: "Activations",
  },
  {
    id: 4,
    type: "image",
    url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=320&h=220&fit=crop",
    name: "Emirates Summit Keynote.jpg",
    size: "4.2 MB",
    date: "Nov 20, 2024",
    cat: "Events",
  },
  {
    id: 5,
    type: "image",
    url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=320&h=220&fit=crop",
    name: "BMW Auto Show Booth.jpg",
    size: "5.7 MB",
    date: "Nov 18, 2024",
    cat: "Exhibitions",
  },
  {
    id: 6,
    type: "video",
    url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=320&h=220&fit=crop",
    name: "Coca-Cola Campaign Film.mp4",
    size: "245 MB",
    date: "Nov 15, 2024",
    cat: "Campaigns",
  },
  {
    id: 7,
    type: "image",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=320&h=220&fit=crop",
    name: "Product Launch Stage.jpg",
    size: "3.8 MB",
    date: "Nov 12, 2024",
    cat: "Events",
  },
  {
    id: 8,
    type: "image",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=320&h=220&fit=crop",
    name: "Corporate Activation.jpg",
    size: "2.9 MB",
    date: "Nov 10, 2024",
    cat: "Activations",
  },
  {
    id: 9,
    type: "reel",
    url: "https://images.unsplash.com/photo-1560179707-f14e90ef3603?w=320&h=220&fit=crop",
    name: "Brand Experience Reel.mp4",
    size: "89 MB",
    date: "Nov 8, 2024",
    cat: "Activations",
  },
  {
    id: 10,
    type: "image",
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=320&h=220&fit=crop",
    name: "Nike Sprint Campaign.jpg",
    size: "4.6 MB",
    date: "Nov 5, 2024",
    cat: "Campaigns",
  },
  {
    id: 11,
    type: "image",
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=320&h=220&fit=crop",
    name: "Analytics Dashboard.jpg",
    size: "1.8 MB",
    date: "Nov 3, 2024",
    cat: "Campaigns",
  },
  {
    id: 12,
    type: "video",
    url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=320&h=220&fit=crop",
    name: "Team Behind Scenes.mp4",
    size: "312 MB",
    date: "Nov 1, 2024",
    cat: "Events",
  },
];

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Completed: "bg-blue-100 text-blue-700 border border-blue-200",
  Upcoming: "bg-amber-100 text-amber-700 border border-amber-200",
  Paused: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Published: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Draft: "bg-gray-100 text-gray-600 border border-gray-200",
  Archived: "bg-gray-100 text-gray-500 border border-gray-200",
  New: "bg-purple-100 text-purple-700 border border-purple-200",
  Replied: "bg-blue-100 text-blue-700 border border-blue-200",
};

const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[status] || "bg-gray-100 text-gray-600"}`}
  >
    {status}
  </span>
);

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  wide,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? "max-w-3xl" : "max-w-xl"} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} className="text-[#64748B]" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const PageHeader = ({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h1 className="text-xl font-bold text-[#0F172A]">{title}</h1>
      {subtitle && <p className="text-[#64748B] mt-0.5 text-sm">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

const Btn = ({
  onClick,
  children,
  variant = "primary",
  icon: Icon,
  small,
  type = "button",
}: {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "purple";
  icon?: React.ComponentType<{ size?: number }>;
  small?: boolean;
  type?: "button" | "submit";
}) => {
  const base = `inline-flex items-center gap-1.5 font-medium rounded-lg transition-colors ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm"}`;
  const variants = {
    primary: "bg-lime-600 hover:bg-lime-800 text-white",
    secondary:
      "bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0]",
    ghost: "hover:bg-[#F1F5F9] text-[#64748B]",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    purple:
      "bg-[#F5F3FF] text-[#6D28D9] border border-[#DDD6FE] hover:bg-[#EDE9FE]",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {Icon && <Icon size={small ? 13 : 15} />}
      {children}
    </button>
  );
};

const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  textarea,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  textarea?: boolean;
}) => (
  <div>
    {label && (
      <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
        {label}
      </label>
    )}
    {textarea ? (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] bg-white resize-none"
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] bg-white"
      />
    )}
  </div>
);

const Card = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-xl border border-[#E2E8F0] shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Th = ({
  children,
  right,
}: {
  children: React.ReactNode;
  right?: boolean;
}) => (
  <th
    className={`px-4 py-3 text-xs font-semibold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC] border-b border-[#E2E8F0] ${right ? "text-right" : "text-left"}`}
  >
    {children}
  </th>
);

const Td = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td
    className={`px-4 py-3 text-sm text-[#0F172A] border-b border-[#F1F5F9] ${className}`}
  >
    {children}
  </td>
);
const ReorderControls = ({
  index,
  total,
  onMoveUp,
  onMoveDown,
}: {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) => (
  <div className="flex flex-col gap-0.5">
    <button
      onClick={onMoveUp}
      disabled={index === 0}
      className="p-0.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
    >
      <ChevronUp size={13} />
    </button>
    <button
      onClick={onMoveDown}
      disabled={index === total - 1}
      className="p-0.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed"
    >
      <ChevronDown size={13} />
    </button>
  </div>
);
const RowActions = ({
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

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-3 shadow-xl text-xs">
      <p className="font-semibold text-[#0F172A] mb-1.5">{label}</p>
      {payload.map((p: any) => (
        <p
          key={p.name}
          style={{ color: p.color }}
          className="flex items-center gap-1.5"
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ background: p.color }}
          />
          {p.name}:{" "}
          <span className="font-semibold text-[#0F172A]">
            {typeof p.value === "number" && p.value > 999
              ? p.value.toLocaleString()
              : p.value}
          </span>
        </p>
      ))}
    </div>
  );
};

// ─── HOME MANAGEMENT HELPERS ─────────────────────────────────────────────────

const ClientAvatar = ({
  logo,
  initials,
  size = 36,
}: {
  logo: string | null;
  initials: string;
  size?: number;
}) => (
  <div
    className="rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden flex-shrink-0 font-bold text-[#0F4C81]"
    style={{ width: size, height: size, fontSize: size * 0.35 }}
  >
    {logo ? (
      <img src={logo} alt={initials} className="w-full h-full object-cover" />
    ) : (
      initials
    )}
  </div>
);

const FormLabel = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1.5">
    {children}
  </label>
);

const HMInput = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <FormLabel>{label}</FormLabel>
    <input
      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const HMSelect = ({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) => (
  <div>
    <FormLabel>{label}</FormLabel>
    <select
      className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] bg-white transition-all"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {children}
    </select>
  </div>
);

const UploadZone = ({
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
const MediaGrid = ({
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

// ─── HOME MANAGEMENT SEED DATA ────────────────────────────────────────────────

const seedClients: Client[] = [
  { id: 1, name: "Samsung", logo: null, initials: "SA" },
  { id: 2, name: "Nike", logo: null, initials: "NK" },
  { id: 3, name: "Apple", logo: null, initials: "AP" },
];

const seedStories: ClientStory[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Samsung",
    clientLogo: null,
    clientInitials: "SA",
    event: "Galaxy AI Launch",
    type: "Product Launch",
    location: "Dubai, UAE",
    status: "Active",
    images: [],
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Nike",
    clientLogo: null,
    clientInitials: "NK",
    event: "Run the Future",
    type: "Brand Activation",
    location: "London, UK",
    status: "Active",
    images: [],
  },
  {
    id: 3,
    clientId: 3,
    clientName: "Apple",
    clientLogo: null,
    clientInitials: "AP",
    event: "WWDC 2025",
    type: "Conference",
    location: "Cupertino, CA",
    status: "Draft",
    images: [],
  },
];

const seedFeedCards: FeedCard[] = [
  {
    id: 1,
    cover: null,
    images: [],
    title: "Gala Night 2025",
    desc: "Annual awards ceremony highlights",
    location: "Paris, France",
    date: "2025-03-12",
    status: "Active",
  },
  {
    id: 2,
    cover: null,
    images: [],
    title: "Desert Activation",
    desc: "Brand activation in the dunes",
    location: "Riyadh, KSA",
    date: "2025-01-20",
    status: "Active",
  },
];

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [email, setEmail] = useState("admin@apexevents.com");
  const [password, setPassword] = useState("••••••••••");
  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
    >
      <div className="hidden lg:flex flex-col justify-between w-[55%] bg-lime-800 p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F97316] rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#F97316] rounded-xl flex items-center justify-center">
              <Star size={20} className="text-white fill-white" />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">APEX</p>
              <p className="text-blue-200 text-xs">Brand Activation</p>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="text-white text-4xl font-bold leading-tight mb-4">
            Crafting Experiences.
            <br />
            <span className="text-[#F97316]">Building Brands.</span>
          </h2>
          <p className="text-blue-200 text-base leading-relaxed mb-10 max-w-md">
            The enterprise command center for managing your entire event
            marketing ecosystem — from brand activations to digital campaigns,
            all in one place.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: "1,247", lbl: "Events Managed" },
              { val: "386", lbl: "Global Clients" },
              { val: "2.8M", lbl: "Total Attendance" },
            ].map((s) => (
              <div
                key={s.lbl}
                className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
              >
                <p className="text-white text-2xl font-bold">{s.val}</p>
                <p className="text-blue-200 text-xs mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <img
              key={i}
              src={`https://images.unsplash.com/photo-${["1500648767791-00dcc994a43e", "1472099645785-5658abf4ff4e", "1507003211169-0a1dd7228f2d", "1494790108377-be9c29b29330", "1438761681033-6461ffad8d80"][i - 1]}?w=32&h=32&fit=crop&crop=face`}
              alt="client"
              className="w-8 h-8 rounded-full border-2 border-white/30 object-cover"
            />
          ))}
          <p className="text-blue-200 text-xs">Trusted by 386+ global brands</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center bg-[#F8FAFC] p-8">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-[#0F4C81] rounded-lg flex items-center justify-center">
              <Star size={16} className="text-white fill-white" />
            </div>
            <span className="font-bold text-[#0F172A]">
              APEX Brand Activation
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A] mb-1">
            Welcome back
          </h1>
          <p className="text-[#64748B] text-sm mb-8">
            Sign in to your admin dashboard
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-2.5 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] bg-white"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className="w-4 h-4 bg-lime-600 rounded flex items-center justify-center">
                  <Check size={11} className="text-white" />
                </div>
                <span className="text-sm text-lime-600">Keep me signed in</span>
              </label>
              <button className="text-sm text-lime-600 font-medium hover:underline">
                Forgot password?
              </button>
            </div>
            <button
              onClick={onLogin}
              className="w-full bg-lime-600 hover:bg-lime-800 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm mt-2"
            >
              Sign In to Dashboard
            </button>
          </div>
          <p className="text-center text-xs text-[#94A3B8] mt-8">
            © {new Date().getFullYear()} APEX Brand Activation. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// const HomeManagementPage = () => {
//   const [tab, setTab] = useState<"clients" | "feed">("clients");
//   const [editImages, setEditImages] = useState<string[]>([]);
//   const editImageRef = useRef<HTMLInputElement>(null);
//   // Modal visibility
//   const [showAddClientModal, setShowAddClientModal] = useState(false);
//   const [showStoryModal, setShowStoryModal] = useState(false);
//   const [showFeedModal, setShowFeedModal] = useState(false);

//   // Data state
//   const [clients, setClients] = useState<Client[]>(seedClients);
//   const [stories, setStories] = useState<ClientStory[]>(seedStories);
//   const [feedCards, setFeedCards] = useState<FeedCard[]>(seedFeedCards);

//   // Add Client form state
//   const [newClientName, setNewClientName] = useState("");
//   const [newClientLogo, setNewClientLogo] = useState<string | null>(null);
//   const [newClientLogoName, setNewClientLogoName] = useState("");
//   const clientLogoRef = useRef<HTMLInputElement>(null);

//   // Add Client Story form state
//   const [storyClientId, setStoryClientId] = useState("");
//   const [storyEventName, setStoryEventName] = useState("");
//   const [storyEventType, setStoryEventType] =
//     useState<EventType>("Product Launch");
//   const [storyLocation, setStoryLocation] = useState("");
//   const [storyImages, setStoryImages] = useState<string[]>([]);
//   const storyImageRef = useRef<HTMLInputElement>(null);
//   // Add Feed Card form state
//   const [feedTitle, setFeedTitle] = useState("");
//   const [feedDesc, setFeedDesc] = useState("");
//   const [feedLocation, setFeedLocation] = useState("");
//   const [feedDate, setFeedDate] = useState("");
//   const [feedMedia, setFeedMedia] = useState<MediaType>("Photo");
//   const [viewStory, setViewStory] = useState<ClientStory | null>(null);
//   const [editStory, setEditStory] = useState<ClientStory | null>(null);
//   const [editClientId, setEditClientId] = useState("");
//   const [editEventName, setEditEventName] = useState("");
//   const [editEventType, setEditEventType] =
//     useState<EventType>("Product Launch");
//   const [editLocation, setEditLocation] = useState("");
//   const [editStatus, setEditStatus] = useState<HMStatus>("Active");
//   // Handlers: Add Client
//   const handleClientLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       setNewClientLogo(ev.target?.result as string);
//       setNewClientLogoName(file.name);
//     };
//     reader.readAsDataURL(file);
//   };
//   const openEditStory = (s: ClientStory) => {
//     setEditStory(s);
//     setEditClientId(String(s.clientId));
//     setEditEventName(s.event);
//     setEditEventType(s.type);
//     setEditLocation(s.location);
//     setEditStatus(s.status);
//     setEditImages(s.images);
//   };
//   const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
//     const remainingSlots = 3 - editImages.length;
//     const filesToAdd = Array.from(files).slice(0, remainingSlots);
//     filesToAdd.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (ev) => {
//         setEditImages((prev) =>
//           prev.length < 3 ? [...prev, ev.target?.result as string] : prev,
//         );
//       };
//       reader.readAsDataURL(file);
//     });
//     e.target.value = "";
//   };

//   const handleUpdateStory = () => {
//     if (!editStory || !editClientId || !editEventName.trim()) return;
//     const client = clients.find((c) => c.id === Number(editClientId));
//     if (!client) return;
//     setStories((prev) =>
//       prev.map((s) =>
//         s.id === editStory.id
//           ? {
//               ...s,
//               clientId: client.id,
//               clientName: client.name,
//               clientLogo: client.logo,
//               clientInitials: client.initials,
//               event: editEventName.trim(),
//               type: editEventType,
//               location: editLocation.trim() || "—",
//               status: editStatus,
//               images: editImages,
//             }
//           : s,
//       ),
//     );
//     setEditStory(null);
//   };
//   const handleSaveClient = () => {
//     const name = newClientName.trim();
//     if (!name) return;
//     const initials = name
//       .split(" ")
//       .map((w) => w[0])
//       .join("")
//       .substring(0, 2)
//       .toUpperCase();
//     setClients((prev) => [
//       ...prev,
//       { id: Date.now(), name, logo: newClientLogo, initials },
//     ]);
//     setNewClientName("");
//     setNewClientLogo(null);
//     setNewClientLogoName("");
//     if (clientLogoRef.current) clientLogoRef.current.value = "";
//     setShowAddClientModal(false);
//   };

//   // Handlers: Add Client Story
//   const handleSaveStory = () => {
//     if (!storyClientId || !storyEventName.trim()) return;
//     const client = clients.find((c) => c.id === Number(storyClientId));
//     if (!client) return;
//     setStories((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         clientId: client.id,
//         clientName: client.name,
//         clientLogo: client.logo,
//         clientInitials: client.initials,
//         event: storyEventName.trim(),
//         type: storyEventType,
//         location: storyLocation.trim() || "—",
//         status: "Active",
//         images: storyImages,
//       },
//     ]);
//     setStoryClientId("");
//     setStoryEventName("");
//     setStoryEventType("Product Launch");
//     setStoryLocation("");
//     setStoryImages([]);
//     setShowStoryModal(false);
//   };

//   // Handlers: Add Feed Card
//   const handleSaveFeed = () => {
//     if (!feedTitle.trim()) return;
//     setFeedCards((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         cover: null,
//         title: feedTitle.trim(),
//         desc: feedDesc.trim() || "No description",
//         location: feedLocation.trim() || "—",
//         date: feedDate,
//         media: feedMedia,
//         status: "Active",
//       },
//     ]);
//     setFeedTitle("");
//     setFeedDesc("");
//     setFeedLocation("");
//     setFeedDate("");
//     setFeedMedia("Photo");
//     setShowFeedModal(false);
//   };

//   const mediaBadgeCls = (m: MediaType) =>
//     m === "Video"
//       ? "bg-purple-100 text-purple-700"
//       : m === "Reel"
//         ? "bg-pink-100 text-pink-700"
//         : "bg-blue-100 text-blue-700";
//   const handleStoryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;
//     const remainingSlots = 3 - storyImages.length;
//     const filesToAdd = Array.from(files).slice(0, remainingSlots);
//     filesToAdd.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = (ev) => {
//         setStoryImages((prev) =>
//           prev.length < 3 ? [...prev, ev.target?.result as string] : prev,
//         );
//       };
//       reader.readAsDataURL(file);
//     });
//     e.target.value = "";
//   };

//   const removeStoryImage = (index: number) => {
//     setStoryImages((prev) => prev.filter((_, i) => i !== index));
//   };
//   return (
//     <div>
//       {/* Page header */}
//       <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
//         <div>
//           <h1 className="text-xl font-bold text-[#0F172A]">Home Management</h1>
//           <p className="text-sm text-[#64748B] mt-0.5 max-w-lg">
//             Manage the client carousel and featured feed cards shown on your
//             public homepage.
//           </p>
//         </div>
//         <div className="flex gap-2.5 flex-wrap">
//           <Btn
//             variant="purple"
//             icon={User}
//             onClick={() => setShowAddClientModal(true)}
//           >
//             Add Client
//           </Btn>
//           <Btn
//             icon={Plus}
//             onClick={() =>
//               tab === "clients"
//                 ? setShowStoryModal(true)
//                 : setShowFeedModal(true)
//             }
//           >
//             {tab === "clients" ? "Add Client Story" : "Add Feed Card"}
//           </Btn>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 mb-6 p-1 bg-[#F1F5F9] rounded-xl w-fit">
//         {(["clients", "feed"] as const).map((t) => (
//           <button
//             key={t}
//             onClick={() => setTab(t)}
//             className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B] hover:text-[#0F172A]"}`}
//           >
//             {t === "clients" ? "Client Carousel" : "Featured Feed Cards"}
//           </button>
//         ))}
//       </div>

//       {/* Clients table */}
//       {tab === "clients" && (
//         <Card>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   <Th>Client</Th>
//                   <Th>Event Name</Th>
//                   <Th>Event Type</Th>
//                   <Th>Location</Th>
//                   <Th>Status</Th>
//                   <Th>Actions</Th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {stories.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={6}
//                       className="text-center py-10 text-[#94A3B8] text-sm"
//                     >
//                       No client stories yet. Click{" "}
//                       <strong className="text-[#0F172A]">
//                         Add Client Story
//                       </strong>{" "}
//                       to get started.
//                     </td>
//                   </tr>
//                 ) : (
//                   stories.map((s) => (
//                     <tr
//                       key={s.id}
//                       className="hover:bg-[#F8FAFC] transition-colors"
//                     >
//                       <Td>
//                         <div className="flex items-center gap-2.5">
//                           <ClientAvatar
//                             logo={s.clientLogo}
//                             initials={s.clientInitials}
//                           />
//                           <span className="font-medium text-[#0F172A]">
//                             {s.clientName}
//                           </span>
//                         </div>
//                       </Td>
//                       <Td>{s.event}</Td>
//                       <Td>
//                         <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
//                           {s.type}
//                         </span>
//                       </Td>
//                       <Td className="text-[#64748B]">{s.location}</Td>
//                       <Td>
//                         <StatusBadge status={s.status} />
//                       </Td>
//                       <Td>
//                         <RowActions
//                           onView={() => setViewStory(s)}
//                           onEdit={() => openEditStory(s)}
//                           onDelete={() =>
//                             setStories((prev) =>
//                               prev.filter((x) => x.id !== s.id),
//                             )
//                           }
//                         />
//                       </Td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {/* Feed table */}
//       {tab === "feed" && (
//         <Card>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr>
//                   <Th>Cover</Th>
//                   <Th>Title</Th>
//                   <Th>Location</Th>
//                   <Th>Date</Th>
//                   <Th>Media Type</Th>
//                   <Th>Status</Th>
//                   <Th>Actions</Th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {feedCards.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="text-center py-10 text-[#94A3B8] text-sm"
//                     >
//                       No feed cards yet. Click{" "}
//                       <strong className="text-[#0F172A]">Add Feed Card</strong>{" "}
//                       to get started.
//                     </td>
//                   </tr>
//                 ) : (
//                   feedCards.map((f) => (
//                     <tr
//                       key={f.id}
//                       className="hover:bg-[#F8FAFC] transition-colors"
//                     >
//                       <Td>
//                         <div className="w-16 h-10 rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden">
//                           {f.cover ? (
//                             <img
//                               src={f.cover}
//                               alt={f.title}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-lg">🖼️</span>
//                           )}
//                         </div>
//                       </Td>
//                       <Td>
//                         <p className="font-medium text-[#0F172A]">{f.title}</p>
//                         <p className="text-[#94A3B8] text-xs mt-0.5 truncate max-w-[200px]">
//                           {f.desc}
//                         </p>
//                       </Td>
//                       <Td className="text-[#64748B]">{f.location}</Td>
//                       <Td className="text-[#64748B]">
//                         {f.date
//                           ? new Date(f.date).toLocaleDateString("en-GB", {
//                               day: "2-digit",
//                               month: "short",
//                               year: "numeric",
//                             })
//                           : "—"}
//                       </Td>
//                       <Td>
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded-md font-medium ${mediaBadgeCls(f.media)}`}
//                         >
//                           {f.media}
//                         </span>
//                       </Td>
//                       <Td>
//                         <StatusBadge status={f.status} />
//                       </Td>
//                       <Td>
//                         <RowActions
//                           onEdit={() => {}}
//                           onDelete={() =>
//                             setFeedCards((prev) =>
//                               prev.filter((x) => x.id !== f.id),
//                             )
//                           }
//                         />
//                       </Td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </Card>
//       )}

//       {/* MODAL: Add Client */}
//       <Modal
//         title="Add Client"
//         isOpen={showAddClientModal}
//         onClose={() => setShowAddClientModal(false)}
//       >
//         <div className="space-y-4">
//           <HMInput
//             label="Client / Brand Name"
//             placeholder="e.g. Samsung Electronics"
//             value={newClientName}
//             onChange={setNewClientName}
//           />
//           <div>
//             <FormLabel>Client Logo</FormLabel>
//             {newClientLogo ? (
//               <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
//                 <img
//                   src={newClientLogo}
//                   alt="preview"
//                   className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-[#0F172A] truncate">
//                     {newClientLogoName}
//                   </p>
//                   <p className="text-xs text-[#94A3B8]">Logo ready to save</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setNewClientLogo(null);
//                     setNewClientLogoName("");
//                     if (clientLogoRef.current) clientLogoRef.current.value = "";
//                   }}
//                   className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <UploadZone
//                 label="Upload Logo"
//                 hint="PNG, JPG up to 10MB"
//                 onClick={() => clientLogoRef.current?.click()}
//               />
//             )}
//             <input
//               ref={clientLogoRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleClientLogoChange}
//             />
//           </div>
//           <div className="flex gap-3 pt-1">
//             <Btn
//               variant="secondary"
//               onClick={() => setShowAddClientModal(false)}
//             >
//               Cancel
//             </Btn>
//             <Btn onClick={handleSaveClient}>Save Client</Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* MODAL: Add Client Story */}
//       <Modal
//         title="Add Client Story"
//         isOpen={showStoryModal}
//         onClose={() => setShowStoryModal(false)}
//       >
//         <div className="space-y-4">
//           <div>
//             <FormLabel>Client Media (up to 3 files)</FormLabel>
//             <div className="grid grid-cols-3 gap-3">
//               {storyImages.map((img, i) => (
//                 <div
//                   key={i}
//                   className="relative rounded-xl border border-[#E2E8F0] overflow-hidden aspect-square bg-[#F8FAFC] group"
//                 >
//                   <img
//                     src={img}
//                     alt={`media-${i}`}
//                     className="w-full h-full object-cover"
//                   />
//                   <button
//                     onClick={() => removeStoryImage(i)}
//                     className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors opacity-0 group-hover:opacity-100"
//                   >
//                     <X size={13} />
//                   </button>
//                 </div>
//               ))}
//               {storyImages.length < 3 && (
//                 <div
//                   onClick={() => storyImageRef.current?.click()}
//                   className="border-2 border-dashed border-[#E2E8F0] rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-[#0F4C81] hover:bg-[#F8FBFF] transition-all cursor-pointer group p-2"
//                 >
//                   <div className="w-9 h-9 bg-[#F1F5F9] group-hover:bg-[#EFF6FF] rounded-lg flex items-center justify-center mb-2 transition-colors">
//                     <Upload
//                       size={15}
//                       className="text-[#94A3B8] group-hover:text-[#0F4C81] transition-colors"
//                     />
//                   </div>
//                   <p className="text-[11px] font-semibold text-[#0F172A] leading-tight">
//                     Add Media
//                   </p>
//                   <p className="text-[10px] text-[#94A3B8] mt-0.5">
//                     {storyImages.length}/3
//                   </p>
//                 </div>
//               )}
//             </div>
//             <p className="text-[12px] text-[#94A3B8] mt-2">
//               PNG, JPG, MP4 up to 50MB each — max 3 files
//             </p>
//           </div>
//           <input
//             ref={storyImageRef}
//             type="file"
//             accept="image/*,video/*"
//             multiple
//             className="hidden"
//             onChange={handleStoryImageChange}
//             editable
//           />
//           <div>
//             <FormLabel>Client Name</FormLabel>
//             <select
//               className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] bg-white transition-all"
//               value={storyClientId}
//               onChange={(e) => setStoryClientId(e.target.value)}
//             >
//               <option value="" disabled>
//                 — Select a client —
//               </option>
//               {clients.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>
//             {clients.length === 0 && (
//               <p className="text-xs text-[#94A3B8] mt-1.5">
//                 No clients yet. Use{" "}
//                 <button
//                   className="text-[#0F4C81] font-semibold underline"
//                   onClick={() => {
//                     setShowStoryModal(false);
//                     setShowAddClientModal(true);
//                   }}
//                 >
//                   Add Client
//                 </button>{" "}
//                 to register one first.
//               </p>
//             )}
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <HMInput
//               label="Event Name"
//               placeholder="e.g. Galaxy AI Launch"
//               value={storyEventName}
//               onChange={setStoryEventName}
//             />
//             <HMSelect
//               label="Event Type"
//               value={storyEventType}
//               onChange={(v) => setStoryEventType(v as EventType)}
//             >
//               <option>Product Launch</option>
//               <option>Brand Activation</option>
//               <option>Conference</option>
//               <option>Exhibition</option>
//               <option>Sponsorship</option>
//             </HMSelect>
//           </div>
//           <HMInput
//             label="Location"
//             placeholder="e.g. Dubai, UAE"
//             value={storyLocation}
//             onChange={setStoryLocation}
//           />
//           <div className="flex gap-3 pt-1">
//             <Btn variant="secondary" onClick={() => setShowStoryModal(false)}>
//               Cancel
//             </Btn>
//             <Btn onClick={handleSaveStory}>Save Entry</Btn>
//           </div>
//         </div>
//       </Modal>
//       {/* MODAL: View Client Story */}
//       {viewStory && (
//         <Modal
//           title="Client Story Details"
//           isOpen={!!viewStory}
//           onClose={() => setViewStory(null)}
//         >
//           <div className="space-y-5">
//             <div className="flex items-center gap-3">
//               <ClientAvatar
//                 logo={viewStory.clientLogo}
//                 initials={viewStory.clientInitials}
//                 size={48}
//               />
//               <div>
//                 <p className="font-semibold text-[#0F172A] text-base">
//                   {viewStory.clientName}
//                 </p>
//                 <StatusBadge status={viewStory.status} />
//               </div>
//             </div>
//             <MediaGrid images={viewStory.images} editable={false} />
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Event Name
//                 </p>
//                 <p className="text-sm font-medium text-[#0F172A]">
//                   {viewStory.event}
//                 </p>
//               </div>
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Event Type
//                 </p>
//                 <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
//                   {viewStory.type}
//                 </span>
//               </div>
//             </div>

//             <div className="bg-[#F8FAFC] rounded-xl p-4">
//               <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1 flex items-center gap-1.5">
//                 <MapPin size={11} /> Location
//               </p>
//               <p className="text-sm font-medium text-[#0F172A]">
//                 {viewStory.location}
//               </p>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* MODAL: Edit Client Story */}
//       {editStory && (
//         <Modal
//           title="Edit Client Story"
//           isOpen={!!editStory}
//           onClose={() => {
//             setEditStory(null);
//             setEditImages([]);
//           }}
//         >
//           <div className="space-y-4">
//             <MediaGrid
//               images={editImages}
//               onRemove={(i) =>
//                 setEditImages((prev) => prev.filter((_, idx) => idx !== i))
//               }
//               onAdd={() => editImageRef.current?.click()}
//               fileInputRef={editImageRef}
//               onFileChange={handleEditImageChange}
//               editable
//             />
//             <div>
//               <FormLabel>Client Name</FormLabel>
//               <select
//                 className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] bg-white transition-all"
//                 value={editClientId}
//                 onChange={(e) => setEditClientId(e.target.value)}
//               >
//                 <option value="" disabled>
//                   — Select a client —
//                 </option>
//                 {clients.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <HMInput
//                 label="Event Name"
//                 placeholder="e.g. Galaxy AI Launch"
//                 value={editEventName}
//                 onChange={setEditEventName}
//               />
//               <HMSelect
//                 label="Event Type"
//                 value={editEventType}
//                 onChange={(v) => setEditEventType(v as EventType)}
//               >
//                 <option>Product Launch</option>
//                 <option>Brand Activation</option>
//                 <option>Conference</option>
//                 <option>Exhibition</option>
//                 <option>Sponsorship</option>
//               </HMSelect>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <HMInput
//                 label="Location"
//                 placeholder="e.g. Dubai, UAE"
//                 value={editLocation}
//                 onChange={setEditLocation}
//               />
//               <HMSelect
//                 label="Status"
//                 value={editStatus}
//                 onChange={(v) => setEditStatus(v as HMStatus)}
//               >
//                 <option>Active</option>
//                 <option>Draft</option>
//                 <option>Archived</option>
//               </HMSelect>
//             </div>

//             <div className="flex gap-3 pt-1">
//               <Btn variant="secondary" onClick={() => setEditStory(null)}>
//                 Cancel
//               </Btn>
//               <Btn onClick={handleUpdateStory}>Save Changes</Btn>
//             </div>
//           </div>
//         </Modal>
//       )}
//       {/* MODAL: Add Feed Card */}
//       <Modal
//         title="Add Feed Card"
//         isOpen={showFeedModal}
//         onClose={() => setShowFeedModal(false)}
//       >
//         <div className="space-y-4">
//           <UploadZone
//             label="Upload Cover Media"
//             hint="PNG, JPG, MP4 up to 50MB"
//             onClick={() => {}}
//           />
//           <div className="grid grid-cols-2 gap-3">
//             <HMInput
//               label="Title"
//               placeholder="e.g. Gala Night Recap"
//               value={feedTitle}
//               onChange={setFeedTitle}
//             />
//             <HMInput
//               label="Location"
//               placeholder="e.g. Paris, France"
//               value={feedLocation}
//               onChange={setFeedLocation}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <FormLabel>Date</FormLabel>
//               <input
//                 type="date"
//                 className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
//                 value={feedDate}
//                 onChange={(e) => setFeedDate(e.target.value)}
//               />
//             </div>
//             <HMSelect
//               label="Media Type"
//               value={feedMedia}
//               onChange={(v) => setFeedMedia(v as MediaType)}
//             >
//               <option>Photo</option>
//               <option>Video</option>
//               <option>Reel</option>
//             </HMSelect>
//           </div>
//           <HMInput
//             label="Description"
//             placeholder="Short description..."
//             value={feedDesc}
//             onChange={setFeedDesc}
//           />
//           <div className="flex gap-3 pt-1">
//             <Btn variant="secondary" onClick={() => setShowFeedModal(false)}>
//               Cancel
//             </Btn>
//             <Btn onClick={handleSaveFeed}>Save Entry</Btn>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
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

const HomeManagementPage = () => {
  const [tab, setTab] = useState<"clients" | "feed">("clients");
  const [editImages, setEditImages] = useState<string[]>([]);
  const editImageRef = useRef<HTMLInputElement>(null);

  // Modal visibility
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

// const EventsPage = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [search, setSearch] = useState("");
//   return (
//     <div>
//       <PageHeader
//         title="Events"
//         subtitle="Manage all events, track attendance, and monitor status across your portfolio."
//         action={
//           <Btn icon={Plus} onClick={() => setShowModal(true)}>
//             Add Event
//           </Btn>
//         }
//       />
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {[
//           {
//             label: "Events Managed",
//             value: "1,247",
//             icon: Calendar,
//             color: "#0F4C81",
//             bg: "#EFF6FF",
//           },
//           {
//             label: "Cities Covered",
//             value: "42",
//             icon: Globe,
//             color: "#10B981",
//             bg: "#ECFDF5",
//           },
//           {
//             label: "Total Attendance",
//             value: "2.8M",
//             icon: Users,
//             color: "#F97316",
//             bg: "#FFF7ED",
//           },
//         ].map((s) => (
//           <Card key={s.label} className="p-5 flex items-center gap-4">
//             <div
//               className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//               style={{ background: s.bg }}
//             >
//               <s.icon size={22} className="text-lime-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-[#0F172A]">{s.value}</p>
//               <p className="text-xs text-[#64748B] font-medium">{s.label}</p>
//             </div>
//             <button className="ml-auto p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#94A3B8]">
//               <Edit2 size={13} />
//             </button>
//           </Card>
//         ))}
//       </div>
//       <Card>
//         <div className="flex items-center justify-between p-4 border-b border-[#F1F5F9]">
//           <div className="relative">
//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search events..."
//               className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
//             />
//           </div>
//           <div className="flex gap-2">
//             <Btn variant="secondary" icon={Filter}>
//               Filter
//             </Btn>
//             <Btn variant="secondary" icon={Download}>
//               Export
//             </Btn>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr>
//                 <Th>Event</Th>
//                 <Th>Location</Th>
//                 <Th>Type</Th>
//                 <Th>Date</Th>
//                 <Th>Attendance</Th>
//                 <Th>Status</Th>
//                 <Th>Actions</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {eventsData
//                 .filter((e) =>
//                   e.name.toLowerCase().includes(search.toLowerCase()),
//                 )
//                 .map((e) => (
//                   <tr
//                     key={e.id}
//                     className="hover:bg-[#F8FAFC] transition-colors"
//                   >
//                     <Td>
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={e.image}
//                           alt={e.name}
//                           className="w-14 h-9 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
//                         />
//                         <span className="font-medium text-[#0F172A]">
//                           {e.name}
//                         </span>
//                       </div>
//                     </Td>
//                     <Td className="text-[#64748B]">{e.location}</Td>
//                     <Td>
//                       <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
//                         {e.type}
//                       </span>
//                     </Td>
//                     <Td className="text-[#64748B]">{e.date}</Td>
//                     <Td className="font-semibold">
//                       {e.attendance.toLocaleString()}
//                     </Td>
//                     <Td>
//                       <StatusBadge status={e.status} />
//                     </Td>
//                     <Td>
//                       <RowActions
//                         onView={() => {}}
//                         onEdit={() => {}}
//                         onDelete={() => {}}
//                       />
//                     </Td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//       <Modal
//         title="Add New Event"
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//       >
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-6 text-center cursor-pointer hover:border-[#0F4C81] transition-colors">
//             <Camera size={24} className="text-[#94A3B8] mx-auto mb-2" />
//             <p className="text-sm text-[#64748B]">Upload Event Cover Image</p>
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <Input
//               label="Event Name"
//               placeholder="e.g. Galaxy AI Launch 2025"
//             />
//             <Input label="Location" placeholder="e.g. Dubai, UAE" />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
//                 Event Type
//               </label>
//               <select className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 bg-white">
//                 <option>Product Launch</option>
//                 <option>Brand Activation</option>
//                 <option>Conference</option>
//                 <option>Exhibition</option>
//               </select>
//             </div>
//             <Input label="Event Date" type="date" />
//           </div>
//           <Input
//             label="Expected Attendance"
//             type="number"
//             placeholder="e.g. 5000"
//           />
//           <div className="flex gap-3 pt-2">
//             <Btn variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Btn>
//             <Btn onClick={() => setShowModal(false)}>Create Event</Btn>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
// const EventsPage = () => {
//   const [events, setEvents] = useState<EventItem[]>(eventsData as EventItem[]);
//   const [search, setSearch] = useState("");

//   // Add Event modal
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newImage, setNewImage] = useState<string | null>(null);
//   const [newImageName, setNewImageName] = useState("");
//   const newImageRef = useRef<HTMLInputElement>(null);
//   const [newName, setNewName] = useState("");
//   const [newLocation, setNewLocation] = useState("");
//   const [newType, setNewType] = useState<EventType>("Product Launch");
//   const [newDate, setNewDate] = useState("");
//   const [newAttendance, setNewAttendance] = useState("");

//   // View Event modal
//   const [viewEvent, setViewEvent] = useState<EventItem | null>(null);

//   // Edit Event modal
//   const [editEvent, setEditEvent] = useState<EventItem | null>(null);
//   const [editImage, setEditImage] = useState<string | null>(null);
//   const [editImageName, setEditImageName] = useState("");
//   const editImageRef = useRef<HTMLInputElement>(null);
//   const [editName, setEditName] = useState("");
//   const [editLocation, setEditLocation] = useState("");
//   const [editType, setEditType] = useState<EventType>("Product Launch");
//   const [editDate, setEditDate] = useState("");
//   const [editAttendance, setEditAttendance] = useState("");
//   const [editStatus, setEditStatus] = useState<EventStatus>("Upcoming");

//   const resetAddForm = () => {
//     setNewImage(null);
//     setNewImageName("");
//     setNewName("");
//     setNewLocation("");
//     setNewType("Product Launch");
//     setNewDate("");
//     setNewAttendance("");
//     if (newImageRef.current) newImageRef.current.value = "";
//   };

//   const handleNewImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       setNewImage(ev.target?.result as string);
//       setNewImageName(file.name);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSaveEvent = () => {
//     if (!newName.trim()) return;
//     setEvents((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         image: newImage,
//         name: newName.trim(),
//         location: newLocation.trim() || "—",
//         type: newType,
//         date: newDate
//           ? new Date(newDate).toLocaleDateString("en-US", {
//               month: "short",
//               day: "2-digit",
//               year: "numeric",
//             })
//           : "—",
//         attendance: Number(newAttendance) || 0,
//         status: "Upcoming",
//       },
//     ]);
//     resetAddForm();
//     setShowAddModal(false);
//   };

//   const openEditEvent = (ev: EventItem) => {
//     setEditEvent(ev);
//     setEditImage(ev.image);
//     setEditImageName("");
//     setEditName(ev.name);
//     setEditLocation(ev.location);
//     setEditType(ev.type);
//     setEditDate(ev.date);
//     setEditAttendance(String(ev.attendance));
//     setEditStatus(ev.status);
//   };

//   const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = (ev) => {
//       setEditImage(ev.target?.result as string);
//       setEditImageName(file.name);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleUpdateEvent = () => {
//     if (!editEvent || !editName.trim()) return;
//     setEvents((prev) =>
//       prev.map((ev) =>
//         ev.id === editEvent.id
//           ? {
//               ...ev,
//               image: editImage,
//               name: editName.trim(),
//               location: editLocation.trim() || "—",
//               type: editType,
//               date: editDate,
//               attendance: Number(editAttendance) || 0,
//               status: editStatus,
//             }
//           : ev,
//       ),
//     );
//     setEditEvent(null);
//   };

//   const moveEvent = (index: number, direction: -1 | 1) => {
//     setEvents((prev) => {
//       const newIndex = index + direction;
//       if (newIndex < 0 || newIndex >= prev.length) return prev;
//       const updated = [...prev];
//       [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
//       return updated;
//     });
//   };

//   const filteredEvents = events.filter((e) =>
//     e.name.toLowerCase().includes(search.toLowerCase()),
//   );

//   return (
//     <div>
//       <PageHeader
//         title="Events"
//         subtitle="Manage all events, track attendance, and monitor status across your portfolio."
//         action={
//           <Btn icon={Plus} onClick={() => setShowAddModal(true)}>
//             Add Event
//           </Btn>
//         }
//       />
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {[
//           {
//             label: "Events Managed",
//             value: events.length.toLocaleString(),
//             icon: Calendar,
//             color: "#0F4C81",
//             bg: "#EFF6FF",
//           },
//           {
//             label: "Cities Covered",
//             value: "42",
//             icon: Globe,
//             color: "#10B981",
//             bg: "#ECFDF5",
//           },
//           {
//             label: "Total Attendance",
//             value: events
//               .reduce((sum, e) => sum + e.attendance, 0)
//               .toLocaleString(),
//             icon: Users,
//             color: "#F97316",
//             bg: "#FFF7ED",
//           },
//         ].map((s) => (
//           <Card key={s.label} className="p-5 flex items-center gap-4">
//             <div
//               className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
//               style={{ background: s.bg }}
//             >
//               <s.icon size={22} className="text-lime-600" />
//             </div>
//             <div>
//               <p className="text-2xl font-bold text-[#0F172A]">{s.value}</p>
//               <p className="text-xs text-[#64748B] font-medium">{s.label}</p>
//             </div>
//           </Card>
//         ))}
//       </div>

//       <Card>
//         <div className="flex items-center justify-between p-4 border-b border-[#F1F5F9]">
//           <div className="relative">
//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
//             />
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search events..."
//               className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
//             />
//           </div>
//           <div className="flex gap-2">
//             <Btn variant="secondary" icon={Filter}>
//               Filter
//             </Btn>
//             <Btn variant="secondary" icon={Download}>
//               Export
//             </Btn>
//           </div>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr>
//                 <Th>Event</Th>
//                 <Th>Location</Th>
//                 <Th>Type</Th>
//                 <Th>Date</Th>
//                 <Th>Attendance</Th>
//                 <Th>Status</Th>
//                 <Th>Actions</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredEvents.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="text-center py-10 text-[#94A3B8] text-sm"
//                   >
//                     No events found.
//                   </td>
//                 </tr>
//               ) : (
//                 filteredEvents.map((e, idx) => (
//                   <tr
//                     key={e.id}
//                     className="hover:bg-[#F8FAFC] transition-colors"
//                   >
//                     <Td>
//                       <div className="flex items-center gap-3">
//                         <div className="w-14 h-9 rounded-lg border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden flex-shrink-0">
//                           {e.image ? (
//                             <img
//                               src={e.image}
//                               alt={e.name}
//                               className="w-full h-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-sm">🖼️</span>
//                           )}
//                         </div>
//                         <span className="font-medium text-[#0F172A]">
//                           {e.name}
//                         </span>
//                       </div>
//                     </Td>
//                     <Td className="text-[#64748B]">{e.location}</Td>
//                     <Td>
//                       <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
//                         {e.type}
//                       </span>
//                     </Td>
//                     <Td className="text-[#64748B]">{e.date}</Td>
//                     <Td className="font-semibold">
//                       {e.attendance.toLocaleString()}
//                     </Td>
//                     <Td>
//                       <StatusBadge status={e.status} />
//                     </Td>
//                     <Td>
//                       <div className="flex items-center gap-1">
//                         <ReorderControls
//                           index={idx}
//                           total={filteredEvents.length}
//                           onMoveUp={() => moveEvent(idx, -1)}
//                           onMoveDown={() => moveEvent(idx, 1)}
//                         />
//                         <RowActions
//                           onView={() => setViewEvent(e)}
//                           onEdit={() => openEditEvent(e)}
//                           onDelete={() =>
//                             setEvents((prev) =>
//                               prev.filter((x) => x.id !== e.id),
//                             )
//                           }
//                         />
//                       </div>
//                     </Td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Card>

//       {/* MODAL: Add Event */}
//       <Modal
//         title="Add New Event"
//         isOpen={showAddModal}
//         onClose={() => {
//           setShowAddModal(false);
//           resetAddForm();
//         }}
//       >
//         <div className="space-y-4">
//           <div>
//             <FormLabel>Event Cover Image</FormLabel>
//             {newImage ? (
//               <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
//                 <img
//                   src={newImage}
//                   alt="preview"
//                   className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-[#0F172A] truncate">
//                     {newImageName}
//                   </p>
//                   <p className="text-xs text-[#94A3B8]">Image ready to save</p>
//                 </div>
//                 <button
//                   onClick={() => {
//                     setNewImage(null);
//                     setNewImageName("");
//                     if (newImageRef.current) newImageRef.current.value = "";
//                   }}
//                   className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ) : (
//               <UploadZone
//                 label="Upload Event Cover Image"
//                 hint="PNG, JPG up to 10MB"
//                 onClick={() => newImageRef.current?.click()}
//               />
//             )}
//             <input
//               ref={newImageRef}
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleNewImageChange}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <HMInput
//               label="Event Name"
//               placeholder="e.g. Galaxy AI Launch 2025"
//               value={newName}
//               onChange={setNewName}
//             />
//             <HMInput
//               label="Location"
//               placeholder="e.g. Dubai, UAE"
//               value={newLocation}
//               onChange={setNewLocation}
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <HMSelect
//               label="Event Type"
//               value={newType}
//               onChange={(v) => setNewType(v as EventType)}
//             >
//               <option>Product Launch</option>
//               <option>Brand Activation</option>
//               <option>Conference</option>
//               <option>Exhibition</option>
//               <option>Sponsorship</option>
//             </HMSelect>
//             <div>
//               <FormLabel>Event Date</FormLabel>
//               <input
//                 type="date"
//                 value={newDate}
//                 onChange={(e) => setNewDate(e.target.value)}
//                 className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-[13px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] transition-all"
//               />
//             </div>
//           </div>
//           <HMInput
//             label="Expected Attendance"
//             placeholder="e.g. 5000"
//             value={newAttendance}
//             onChange={setNewAttendance}
//           />
//           <div className="flex gap-3 pt-1">
//             <Btn
//               variant="secondary"
//               onClick={() => {
//                 setShowAddModal(false);
//                 resetAddForm();
//               }}
//             >
//               Cancel
//             </Btn>
//             <Btn onClick={handleSaveEvent}>Create Event</Btn>
//           </div>
//         </div>
//       </Modal>

//       {/* MODAL: View Event */}
//       {viewEvent && (
//         <Modal
//           title="Event Details"
//           isOpen={!!viewEvent}
//           onClose={() => setViewEvent(null)}
//           wide
//         >
//           <div className="space-y-5">
//             <div className="w-full h-52 rounded-xl border border-[#E2E8F0] bg-[#EFF6FF] flex items-center justify-center overflow-hidden">
//               {viewEvent.image ? (
//                 <img
//                   src={viewEvent.image}
//                   alt={viewEvent.name}
//                   className="w-full h-full object-cover"
//                 />
//               ) : (
//                 <span className="text-3xl">🖼️</span>
//               )}
//             </div>
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-lg font-bold text-[#0F172A]">
//                   {viewEvent.name}
//                 </h3>
//                 <p className="text-sm text-[#64748B] mt-0.5 flex items-center gap-1.5">
//                   <MapPin size={12} /> {viewEvent.location}
//                 </p>
//               </div>
//               <StatusBadge status={viewEvent.status} />
//             </div>
//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Event Type
//                 </p>
//                 <span className="text-xs bg-[#EFF6FF] text-[#0F4C81] px-2 py-0.5 rounded-md font-medium">
//                   {viewEvent.type}
//                 </span>
//               </div>
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Date
//                 </p>
//                 <p className="text-sm font-medium text-[#0F172A]">
//                   {viewEvent.date}
//                 </p>
//               </div>
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Attendance
//                 </p>
//                 <p className="text-sm font-medium text-[#0F172A]">
//                   {viewEvent.attendance.toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* MODAL: Edit Event */}
//       {editEvent && (
//         <Modal
//           title="Edit Event"
//           isOpen={!!editEvent}
//           onClose={() => setEditEvent(null)}
//         >
//           <div className="space-y-4">
//             <div>
//               <FormLabel>Event Cover Image</FormLabel>
//               {editImage ? (
//                 <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
//                   <img
//                     src={editImage}
//                     alt="preview"
//                     className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
//                   />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-semibold text-[#0F172A] truncate">
//                       {editImageName || "Current image"}
//                     </p>
//                     <p className="text-xs text-[#94A3B8]">
//                       Image ready to save
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setEditImage(null);
//                       setEditImageName("");
//                       if (editImageRef.current) editImageRef.current.value = "";
//                     }}
//                     className="text-xs text-[#64748B] hover:text-red-500 transition-colors font-medium"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ) : (
//                 <UploadZone
//                   label="Upload Event Cover Image"
//                   hint="PNG, JPG up to 10MB"
//                   onClick={() => editImageRef.current?.click()}
//                 />
//               )}
//               <input
//                 ref={editImageRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleEditImageChange}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <HMInput
//                 label="Event Name"
//                 placeholder="e.g. Galaxy AI Launch 2025"
//                 value={editName}
//                 onChange={setEditName}
//               />
//               <HMInput
//                 label="Location"
//                 placeholder="e.g. Dubai, UAE"
//                 value={editLocation}
//                 onChange={setEditLocation}
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <HMSelect
//                 label="Event Type"
//                 value={editType}
//                 onChange={(v) => setEditType(v as EventType)}
//               >
//                 <option>Product Launch</option>
//                 <option>Brand Activation</option>
//                 <option>Conference</option>
//                 <option>Exhibition</option>
//                 <option>Sponsorship</option>
//               </HMSelect>
//               <HMSelect
//                 label="Status"
//                 value={editStatus}
//                 onChange={(v) => setEditStatus(v as EventStatus)}
//               >
//                 <option>Upcoming</option>
//                 <option>Active</option>
//                 <option>Completed</option>
//               </HMSelect>
//             </div>
//             <div className="grid grid-cols-2 gap-3">
//               <HMInput
//                 label="Event Date"
//                 placeholder="e.g. Dec 15, 2024"
//                 value={editDate}
//                 onChange={setEditDate}
//               />
//               <HMInput
//                 label="Attendance"
//                 placeholder="e.g. 5000"
//                 value={editAttendance}
//                 onChange={setEditAttendance}
//               />
//             </div>
//             <div className="flex gap-3 pt-1">
//               <Btn variant="secondary" onClick={() => setEditEvent(null)}>
//                 Cancel
//               </Btn>
//               <Btn onClick={handleUpdateEvent}>Save Changes</Btn>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };
// ─── EVENTS PAGE ──────────────────────────────────────────────────────────────
// Drop-in replacement for the EventsPage component.
// Changes vs original:
//   • Export button removed
//   • Filter button opens a panel with Location, Event Type, and Status filters
//   • Filters are applied live; active filter count badge shown on button
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
const EventsPage = () => {
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

// const CampaignsPage = () => {
//   const [detailCampaign, setDetailCampaign] = useState<
//     (typeof campaignsData)[0] | null
//   >(null);
//   const [showAdd, setShowAdd] = useState(false);
//   return (
//     <div>
//       <PageHeader
//         title="Digital Campaigns"
//         subtitle="Track digital marketing campaigns, reach, and engagement performance."
//         action={
//           <Btn icon={Plus} onClick={() => setShowAdd(true)}>
//             New Campaign
//           </Btn>
//         }
//       />
//       <Card>
//         <div className="flex items-center justify-between p-4 border-b border-[#F1F5F9]">
//           <div className="relative">
//             <Search
//               size={14}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
//             />
//             <input
//               placeholder="Search campaigns..."
//               className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
//             />
//           </div>
//           <Btn variant="secondary" icon={Filter}>
//             Filter by Status
//           </Btn>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr>
//                 <Th>Campaign</Th>
//                 <Th>Date</Th>
//                 <Th>Reach</Th>
//                 <Th>Engagement</Th>
//                 <Th>Services</Th>
//                 <Th>Status</Th>
//                 <Th>Actions</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {campaignsData.map((c) => (
//                 <tr key={c.id} className="hover:bg-[#F8FAFC] transition-colors">
//                   <Td>
//                     <div className="flex items-center gap-3">
//                       <img
//                         src={c.image}
//                         alt={c.name}
//                         className="w-14 h-9 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
//                       />
//                       <span className="font-medium text-[#0F172A]">
//                         {c.name}
//                       </span>
//                     </div>
//                   </Td>
//                   <Td className="text-[#64748B]">{c.date}</Td>
//                   <Td className="font-semibold text-[#0F4C81]">{c.reach}</Td>
//                   <Td className="font-semibold text-[#F97316]">
//                     {c.engagement}
//                   </Td>
//                   <Td>
//                     <div className="flex flex-wrap gap-1">
//                       {c.services.slice(0, 2).map((s) => (
//                         <span
//                           key={s}
//                           className="text-[10px] bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded font-medium"
//                         >
//                           {s}
//                         </span>
//                       ))}
//                       {c.services.length > 2 && (
//                         <span className="text-[10px] bg-[#F1F5F9] text-[#94A3B8] px-2 py-0.5 rounded">
//                           +{c.services.length - 2}
//                         </span>
//                       )}
//                     </div>
//                   </Td>
//                   <Td>
//                     <StatusBadge status={c.status} />
//                   </Td>
//                   <Td>
//                     <RowActions
//                       onView={() => setDetailCampaign(c)}
//                       onEdit={() => {}}
//                       onDelete={() => {}}
//                     />
//                   </Td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </Card>
//       {detailCampaign && (
//         <Modal
//           title="Campaign Details"
//           isOpen={!!detailCampaign}
//           onClose={() => setDetailCampaign(null)}
//           wide
//         >
//           <div className="space-y-5">
//             <img
//               src={detailCampaign.image.replace("w=80&h=55", "w=800&h=300")}
//               alt={detailCampaign.name}
//               className="w-full h-52 object-cover rounded-xl"
//             />
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-lg font-bold text-[#0F172A]">
//                   {detailCampaign.name}
//                 </h3>
//                 <p className="text-sm text-[#64748B] mt-0.5">
//                   {detailCampaign.date}
//                 </p>
//               </div>
//               <StatusBadge status={detailCampaign.status} />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 {
//                   label: "Total Reach",
//                   value: detailCampaign.reach,
//                   color: "#0F4C81",
//                   bg: "#EFF6FF",
//                 },
//                 {
//                   label: "Engagements",
//                   value: detailCampaign.engagement,
//                   color: "#F97316",
//                   bg: "#FFF7ED",
//                 },
//               ].map((s) => (
//                 <div
//                   key={s.label}
//                   className="rounded-xl p-4 text-center"
//                   style={{ background: s.bg }}
//                 >
//                   <p className="text-2xl font-bold" style={{ color: s.color }}>
//                     {s.value}
//                   </p>
//                   <p className="text-xs text-[#64748B] font-medium mt-1">
//                     {s.label}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             <div>
//               <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
//                 Services Covered
//               </p>
//               <div className="flex flex-wrap gap-2">
//                 {detailCampaign.services.map((s) => (
//                   <span
//                     key={s}
//                     className="bg-[#F1F5F9] text-[#0F172A] text-sm px-3 py-1 rounded-full font-medium"
//                   >
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}
//       <Modal
//         title="New Campaign"
//         isOpen={showAdd}
//         onClose={() => setShowAdd(false)}
//       >
//         <div className="space-y-4">
//           <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-6 text-center cursor-pointer hover:border-[#0F4C81] transition-colors">
//             <Camera size={24} className="text-[#94A3B8] mx-auto mb-2" />
//             <p className="text-sm text-[#64748B]">Upload Campaign Image</p>
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <Input
//               label="Campaign Name"
//               placeholder="e.g. Nike Summer Sprint"
//             />
//             <Input label="Launch Date" type="month" />
//           </div>
//           <div>
//             <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
//               Services
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 "Social Media",
//                 "Digital",
//                 "Influencer",
//                 "OOH",
//                 "TVC",
//                 "PR",
//                 "Events",
//                 "Content",
//               ].map((s) => (
//                 <button
//                   key={s}
//                   className="text-xs px-3 py-1.5 border border-[#E2E8F0] rounded-full text-[#64748B] hover:border-[#0F4C81] hover:text-[#0F4C81] hover:bg-[#EFF6FF] transition-colors"
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>
//           <div className="flex gap-3 pt-2">
//             <Btn variant="secondary" onClick={() => setShowAdd(false)}>
//               Cancel
//             </Btn>
//             <Btn onClick={() => setShowAdd(false)}>Create Campaign</Btn>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };
// ─── CAMPAIGNS PAGE ───────────────────────────────────────────────────────────
// Changes vs original:
//  • Reach + Engagement columns removed from table
//  • Filter by Status (pill buttons, active count badge)
//  • New Campaign modal: template image upload + 3-slot body image grid
//  • Edit modal: same fields + image management
//  • Delete: live removal from list
//  • View modal: shows all fields including body images

// ─── CAMPAIGN VALIDATION CONSTANTS ────────────────────────────────────────────
// Place these constants just ABOVE the CampaignsPage component definition,
// replacing the old "const CampaignsPage = () => {" line.

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

// ─── CAMPAIGNS PAGE ───────────────────────────────────────────────────────────
const CampaignsPage = () => {
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
// ─── ACTIVATIONS PAGE ─────────────────────────────────────────────────────────

// const ActivationsPage = () => (
//   <div>
//     <PageHeader
//       title="Activations"
//       subtitle="Manage brand activation programs, reach metrics, and highlights."
//       action={<Btn icon={Plus}>Add Activation</Btn>}
//     />
//     <Card>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr>
//               <Th>Activation</Th>
//               <Th>Attendance Reach</Th>
//               <Th>Highlights</Th>
//               <Th>Status</Th>
//               <Th>Actions</Th>
//             </tr>
//           </thead>
//           <tbody>
//             {activationsData.map((a) => (
//               <tr key={a.id} className="hover:bg-[#F8FAFC] transition-colors">
//                 <Td>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={a.image}
//                       alt={a.name}
//                       className="w-14 h-9 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
//                     />
//                     <span className="font-medium text-[#0F172A]">{a.name}</span>
//                   </div>
//                 </Td>
//                 <Td>
//                   <span className="text-[#F97316] font-bold">{a.reach}</span>
//                 </Td>
//                 <Td className="text-[#64748B] max-w-xs">{a.highlights}</Td>
//                 <Td>
//                   <StatusBadge status={a.status} />
//                 </Td>
//                 <Td>
//                   <RowActions
//                     onView={() => {}}
//                     onEdit={() => {}}
//                     onDelete={() => {}}
//                   />
//                 </Td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   </div>
// );
const ACT_TEMPLATE_WIDTH = 800;
const ACT_TEMPLATE_HEIGHT = 700;
const ACT_TEMPLATE_MAX_MB = 10;

const ACT_BODY_WIDTH = 1920;
const ACT_BODY_HEIGHT = 1080;
const ACT_BODY_MAX_MB = 10;

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

const validateActTemplateFile = async (file: File): Promise<string> => {
  if (!file.type.startsWith("image/")) {
    return "Template must be an image file (PNG or JPG).";
  }
  if (file.size > ACT_TEMPLATE_MAX_MB * 1024 * 1024) {
    return `Template image must be max ${ACT_TEMPLATE_MAX_MB}MB (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }
  try {
    const { width, height } = await getImageDimensions(file);
    if (width !== ACT_TEMPLATE_WIDTH || height !== ACT_TEMPLATE_HEIGHT) {
      return `Template image must be exactly ${ACT_TEMPLATE_WIDTH}x${ACT_TEMPLATE_HEIGHT}px (selected: ${width}x${height}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};

const validateActBodyFile = async (file: File): Promise<string> => {
  if (file.size > ACT_BODY_MAX_MB * 1024 * 1024) {
    return `File must be max ${ACT_BODY_MAX_MB}MB (selected: ${(file.size / (1024 * 1024)).toFixed(2)}MB).`;
  }
  if (file.type.startsWith("video/")) {
    return ""; // videos: size-only check, no dimension validation
  }
  if (!file.type.startsWith("image/")) {
    return "Only images and videos are supported.";
  }
  try {
    const { width, height } = await getImageDimensions(file);
    if (width !== ACT_BODY_WIDTH || height !== ACT_BODY_HEIGHT) {
      return `Body image must be exactly ${ACT_BODY_WIDTH}x${ACT_BODY_HEIGHT}px (selected: ${width}x${height}px).`;
    }
  } catch {
    return "Could not read this image. Please try another file.";
  }
  return "";
};

const ActivationsPage = () => {
  const [activations, setActivations] = useState(activationsData);

  // Search + filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  // View / Edit
  const [viewActivation, setViewActivation] = useState(null);
  const [editActivation, setEditActivation] = useState(null);
  const [editName, setEditName] = useState("");

  const [editHighlights, setEditHighlights] = useState("");
  const [editStatus, setEditStatus] = useState("Active");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTemplateImage, setEditTemplateImage] = useState(null);
  const [editTemplateImageName, setEditTemplateImageName] = useState("");
  const editTemplateImageRef = useRef(null);

  const [editBodyImages, setEditBodyImages] = useState([]);

  const editBodyImageRef = useRef(null);
  const [newName, setNewName] = useState("");
  const [newHighlights, setNewHighlights] = useState("");
  const [newStatus, setNewStatus] = useState("Active");

  const [newTemplateImage, setNewTemplateImage] = useState(null);
  const [newTemplateImageName, setNewTemplateImageName] = useState("");
  const newTemplateImageRef = useRef(null);

  const [newBodyImages, setNewBodyImages] = useState([]);

  const newBodyImageRef = useRef(null);
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

  const filteredActivations = activations.filter((activation) => {
    const matchesSearch = activation.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());

    const matchesStatus =
      filterStatus === "All" || activation.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const activeFilterCount = filterStatus !== "All" ? 1 : 0;

  const deleteActivation = (activationId) => {
    setActivations((prev) =>
      prev.filter((activation) => activation.id !== activationId),
    );
  };

  // Same reorder behavior as EventsPage / CampaignsPage
  const moveActivation = (index, direction) => {
    setActivations((prev) => {
      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= prev.length) {
        return prev;
      }

      const updated = [...prev];

      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];

      return updated;
    });
  };

  const openEditActivation = (activation) => {
    setEditActivation(activation);

    setEditName(activation.name);
    setEditHighlights(activation.highlights);
    setEditStatus(activation.status);

    setEditTemplateImage(activation.templateImage || activation.image || null);
    setEditTemplateImageName(activation.templateImageName || "");

    // Supports old data with one body image and new data with multiple body images
    if (Array.isArray(activation.bodyImages)) {
      setEditBodyImages(activation.bodyImages);
    } else if (activation.bodyImage) {
      setEditBodyImages([
        {
          url: activation.bodyImage,
          name: activation.bodyImageName || "Body image",
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

  const handleEditImageChange = async (event, imageType) => {
    const files = Array.from(event.target.files || []) as File[];

    if (files.length === 0) return;

    if (imageType === "template") {
      const file = files[0];
      const error = await validateActTemplateFile(file);
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

    // Body images/videos: maximum 3
    const remainingSlots = 3 - editBodyImages.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    for (const file of selectedFiles) {
      const error = await validateActBodyFile(file);
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

  const handleUpdateActivation = () => {
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
      setEditNameError("Activation Name is mandatory.");
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

    if (!editActivation || hasError) return;

    setActivations((prev) =>
      prev.map((activation) =>
        activation.id === editActivation.id
          ? {
              ...activation,
              name: editName.trim(),
              highlights: editHighlights.trim(),
              status: editStatus,

              templateImage: editTemplateImage,
              templateImageName: editTemplateImageName,

              bodyImages: editBodyImages,

              image: editTemplateImage || editBodyImages[0]?.url || null,
            }
          : activation,
      ),
    );

    setEditActivation(null);
    setEditBodyImages([]);
    setEditNameError("");
    setEditHighlightsError("");
    setEditTemplateImageError("");
    setEditBodyImagesError("");
    setEditBodyUploadError("");
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

  const handleImageChange = async (event, imageType) => {
    const files = Array.from(event.target.files || []) as File[];

    if (files.length === 0) return;

    if (imageType === "template") {
      const file = files[0];
      const error = await validateActTemplateFile(file);
      if (error) {
        setNewTemplateImageError(error);
        event.target.value = "";
        return;
      }
      setNewTemplateImageError("");
      const { url, name } = await readFileAsData(file);
      setNewTemplateImage(url);
      setNewTemplateImageName(name);
      event.target.value = "";
      return;
    }

    // Body images/videos: maximum 3
    const remainingSlots = 3 - newBodyImages.length;

    if (remainingSlots <= 0) {
      event.target.value = "";
      return;
    }

    const selectedFiles = files.slice(0, remainingSlots);

    for (const file of selectedFiles) {
      const error = await validateActBodyFile(file);
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

  const handleSaveActivation = () => {
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
      setNewNameError("Activation Name is mandatory.");
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

    setActivations((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newName.trim(),
        highlights: newHighlights.trim(),
        status: newStatus,

        // Existing table image
        image: newTemplateImage || newBodyImages[0]?.url || null,

        templateImage: newTemplateImage,
        templateImageName: newTemplateImageName,

        bodyImages: newBodyImages,
      },
    ]);

    resetAddForm();
    setShowAddModal(false);
  };

  return (
    <div>
      <PageHeader
        title="Activations"
        subtitle="Manage brand activation programs, reach metrics, and highlights."
        action={
          <Btn icon={Plus} onClick={() => setShowAddModal(true)}>
            Add Activation
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
              placeholder="Search by activation name..."
              className="pl-9 pr-4 py-2 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 w-64"
            />
          </div>

          {/* Status filter */}
          <div className="relative">
            <button
              onClick={() => setShowFilter((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                showFilter || activeFilterCount > 0
                  ? "bg-[#EFF6FF] text-lime-600 border-lime-200"
                  : "bg-white text-lime-600 border-[#E2E8F0] hover:bg-[#F8FAFC]"
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
                      All: "bg-lime-600 text-white border-lime-600",
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

        {/* Active filter */}
        {filterStatus !== "All" && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] border-b border-[#F1F5F9]">
            <span className="text-xs text-[#64748B] font-medium">
              Filtered by:
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#EFF6FF] text-lime-600 text-xs font-medium rounded-full border border-lime-200">
              ● {filterStatus}
              <button
                onClick={() => setFilterStatus("All")}
                className="ml-0.5 hover:text-red-500"
              >
                <X size={11} />
              </button>
            </span>

            <span className="text-xs text-[#94A3B8]">
              ({filteredActivations.length} result
              {filteredActivations.length !== 1 ? "s" : ""})
            </span>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Activation</Th>
                <Th>Highlights</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>

            <tbody>
              {filteredActivations.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-14 text-[#94A3B8] text-sm"
                  >
                    <Filter size={28} className="mx-auto mb-2 opacity-25" />
                    No activations match the current filter.
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
                filteredActivations.map((activation, idx) => (
                  <tr
                    key={activation.id}
                    className="hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Td>
                      <div className="flex items-center gap-3">
                        <img
                          src={activation.image}
                          alt={activation.name}
                          className="w-14 h-9 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
                        />

                        <span className="font-medium text-[#0F172A]">
                          {activation.name}
                        </span>
                      </div>
                    </Td>

                    <Td className="text-[#64748B] max-w-xs">
                      {activation.highlights}
                    </Td>

                    <Td>
                      <StatusBadge status={activation.status} />
                    </Td>

                    <Td>
                      <div className="flex items-center gap-1">
                        <ReorderControls
                          index={idx}
                          total={filteredActivations.length}
                          onMoveUp={() => moveActivation(idx, -1)}
                          onMoveDown={() => moveActivation(idx, 1)}
                        />

                        <RowActions
                          onView={() => setViewActivation(activation)}
                          onEdit={() => openEditActivation(activation)}
                          onDelete={() => deleteActivation(activation.id)}
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
        title="Add New Activation"
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
              Required: exactly {ACT_TEMPLATE_WIDTH}x{ACT_TEMPLATE_HEIGHT}px,
              max {ACT_TEMPLATE_MAX_MB}MB (PNG or JPG).
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
                hint={`PNG, JPG — exactly ${ACT_TEMPLATE_WIDTH}x${ACT_TEMPLATE_HEIGHT}px, max ${ACT_TEMPLATE_MAX_MB}MB`}
                onClick={() => newTemplateImageRef.current?.click()}
              />
            )}

            <input
              ref={newTemplateImageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(event, "template")}
            />
            {newTemplateImageError && (
              <p className="text-xs text-red-500 mt-1.5 font-medium">
                {newTemplateImageError}
              </p>
            )}
          </div>

          {/* Body Image / Video */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <FormLabel>Body Media — Images & Videos *</FormLabel>
              <span className="text-xs text-[#94A3B8]">
                {newBodyImages.length}/3 files
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-2">
              Images: exactly {ACT_BODY_WIDTH}x{ACT_BODY_HEIGHT}px, max{" "}
              {ACT_BODY_MAX_MB}MB &nbsp;|&nbsp; Videos: max {ACT_BODY_MAX_MB}MB.
              At least one file is mandatory.
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
                hint={`PNG, JPG — exactly ${ACT_BODY_WIDTH}x${ACT_BODY_HEIGHT}px; MP4 — max ${ACT_BODY_MAX_MB}MB`}
                onClick={() => newBodyImageRef.current?.click()}
              />
            )}

            <input
              ref={newBodyImageRef}
              type="file"
              accept="image/*,video/*"
              multiple
              className="hidden"
              onChange={(event) => handleImageChange(event, "body")}
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
              label="Activation Name *"
              placeholder="e.g. Summer Brand Experience"
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
              placeholder="Describe key activation highlights"
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

            <Btn onClick={handleSaveActivation}>Create Activation</Btn>
          </div>
        </div>
      </Modal>

      {/* View modal */}
      {viewActivation && (
        <Modal
          title="Activation Details"
          isOpen={!!viewActivation}
          onClose={() => setViewActivation(null)}
          wide
        >
          <div className="space-y-5">
            <img
              src={viewActivation.image}
              alt={viewActivation.name}
              className="w-full h-52 rounded-xl object-cover border border-[#E2E8F0]"
            />
            {/* Body Images & Videos */}
            {viewActivation.bodyImages?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                  Body Images & Videos
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {viewActivation.bodyImages.map((image, index) => (
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
                          alt={`${viewActivation.name} body image ${index + 1}`}
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
                  {viewActivation.name}
                </h3>
              </div>

              <StatusBadge status={viewActivation.status} />
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                Highlights
              </p>

              <p className="text-sm text-[#0F172A]">
                {viewActivation.highlights}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {editActivation && (
        <Modal
          title="Edit Activation"
          isOpen={!!editActivation}
          onClose={() => {
            setEditActivation(null);
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
                Required: exactly {ACT_TEMPLATE_WIDTH}x{ACT_TEMPLATE_HEIGHT}
                px, max {ACT_TEMPLATE_MAX_MB}MB (PNG or JPG).
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
                  hint={`PNG, JPG — exactly ${ACT_TEMPLATE_WIDTH}x${ACT_TEMPLATE_HEIGHT}px, max ${ACT_TEMPLATE_MAX_MB}MB`}
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

            {/* Body Images / Videos — maximum 3 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <FormLabel>Body Media — Images & Videos *</FormLabel>
                <span className="text-xs text-[#94A3B8]">
                  {editBodyImages.length}/3 files
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mb-2">
                Images: exactly {ACT_BODY_WIDTH}x{ACT_BODY_HEIGHT}px, max{" "}
                {ACT_BODY_MAX_MB}MB &nbsp;|&nbsp; Videos: max {ACT_BODY_MAX_MB}
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
                  hint={`PNG, JPG — exactly ${ACT_BODY_WIDTH}x${ACT_BODY_HEIGHT}px; MP4 — max ${ACT_BODY_MAX_MB}MB`}
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
                label="Activation Name *"
                value={editName}
                onChange={(v) => {
                  setEditName(v);
                  if (editNameError) setEditNameError("");
                }}
                placeholder="Enter activation name"
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
                placeholder="Enter activation highlights"
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
                  setEditActivation(null);
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

              <Btn onClick={handleUpdateActivation}>Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// const ExhibitionsPage = () => (
//   <div>
//     <PageHeader
//       title="Exhibitions"
//       subtitle="Track all exhibition projects, booth specifications, and attendance figures."
//       action={<Btn icon={Plus}>Add Exhibition</Btn>}
//     />
//     <Card>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr>
//               <Th>Exhibition</Th>
//               <Th>Attendance</Th>
//               <Th>Booth Size</Th>
//               <Th>Highlights</Th>
//               <Th>Status</Th>
//               <Th>Actions</Th>
//             </tr>
//           </thead>
//           <tbody>
//             {exhibitionsData.map((e) => (
//               <tr key={e.id} className="hover:bg-[#F8FAFC] transition-colors">
//                 <Td>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={e.image}
//                       alt={e.name}
//                       className="w-14 h-9 rounded-lg object-cover border border-[#E2E8F0] flex-shrink-0"
//                     />
//                     <span className="font-medium text-[#0F172A]">{e.name}</span>
//                   </div>
//                 </Td>
//                 <Td>
//                   <span className="font-semibold text-[#0F4C81]">
//                     {e.attendance}
//                   </span>
//                 </Td>
//                 <Td>
//                   <span className="text-xs bg-[#F1F5F9] text-[#64748B] px-2 py-0.5 rounded font-medium">
//                     {e.booth}
//                   </span>
//                 </Td>
//                 <Td className="text-[#64748B] max-w-xs">{e.highlights}</Td>
//                 <Td>
//                   <StatusBadge status={e.status} />
//                 </Td>
//                 <Td>
//                   <RowActions
//                     onView={() => {}}
//                     onEdit={() => {}}
//                     onDelete={() => {}}
//                   />
//                 </Td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Card>
//   </div>
// );
const ImageUploadSection = ({
  title,
  image,
  imageName,
  inputRef,
  onUpload,
  onChange,
  onRemove,
}) => (
  <div>
    <FormLabel>{title}</FormLabel>

    {image ? (
      <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
        <img
          src={image}
          alt="template preview"
          className="w-10 h-10 rounded-lg object-cover border border-[#E2E8F0]"
        />

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-[#0F172A] truncate">
            {imageName || "Current template image"}
          </p>
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="text-xs text-[#64748B] hover:text-red-500 font-medium"
        >
          Remove
        </button>
      </div>
    ) : (
      <UploadZone
        label="Upload Template Image"
        hint="PNG, JPG up to 10MB"
        onClick={onUpload}
      />
    )}

    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={onChange}
    />
  </div>
);

const BodyImagesSection = ({
  images,
  inputRef,
  onUpload,
  onChange,
  onRemove,
}) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <FormLabel>Body Images</FormLabel>

      <span className="text-xs text-[#94A3B8]">{images.length}/3 images</span>
    </div>

    {images.length > 0 && (
      <div className="grid grid-cols-3 gap-3 mb-3">
        {images.map((image, index) => (
          <div
            key={`${image.name}-${index}`}
            className="relative border border-[#E2E8F0] rounded-xl overflow-hidden"
          >
            <img
              src={image.url}
              alt={`body ${index + 1}`}
              className="w-full h-24 object-cover"
            />

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute top-1 right-1 w-6 h-6 rounded-full bg-white/90 text-red-500 text-xs font-bold"
              title="Remove image"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    )}

    {images.length < 3 && (
      <UploadZone
        label={`Upload Body Images (${images.length}/3)`}
        hint="PNG, JPG up to 10MB — maximum 3 images"
        onClick={onUpload}
      />
    )}

    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      multiple
      className="hidden"
      onChange={onChange}
    />
  </div>
);
const EXH_TEMPLATE_WIDTH = 800;
const EXH_TEMPLATE_HEIGHT = 700;
const EXH_TEMPLATE_MAX_MB = 10;

const EXH_BODY_WIDTH = 1920;
const EXH_BODY_HEIGHT = 1080;
const EXH_BODY_MAX_MB = 10;

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

const ExhibitionsPage = () => {
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

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────

// const ProfilePage = () => {
//   const [mediaTab, setMediaTab] = useState<"photos" | "reels" | "videos">(
//     "photos",
//   );
//   const [services, setServices] = useState([
//     "Event Management & Production",
//     "Brand Activation & Experiential",
//     "Exhibition Design & Build",
//     "Digital Marketing & Social Media",
//     "Corporate Events & Conferences",
//     "Sponsorship Activation",
//   ]);
//   return (
//     <div>
//       <PageHeader
//         title="Profile"
//         subtitle="Manage your agency profile, featured work, and service offerings."
//         action={<Btn>Save All Changes</Btn>}
//       />
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         {[
//           { label: "Years of Experience", value: "18+" },
//           { label: "Total Clients", value: "386" },
//           { label: "Total Projects", value: "1,247" },
//         ].map((s) => (
//           <Card key={s.label} className="p-5 text-center">
//             <p className="text-3xl font-bold text-[#0F4C81]">{s.value}</p>
//             <p className="text-sm text-[#64748B] mt-1">{s.label}</p>
//             <button className="mt-3 text-xs text-[#0F4C81] hover:underline font-medium flex items-center gap-1 mx-auto">
//               <Edit2 size={11} />
//               Edit
//             </button>
//           </Card>
//         ))}
//       </div>
//       <div className="grid grid-cols-3 gap-6">
//         <div className="col-span-2 space-y-6">
//           <Card className="p-5">
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm font-semibold text-[#0F172A]">
//                 Featured Work Gallery
//               </p>
//               <Btn icon={Upload} small variant="secondary">
//                 Upload
//               </Btn>
//             </div>
//             <div className="columns-3 gap-3 space-y-3">
//               {profileGallery.map((url, i) => (
//                 <div
//                   key={i}
//                   className="relative group rounded-xl overflow-hidden break-inside-avoid"
//                 >
//                   <img
//                     src={url}
//                     alt={`Portfolio ${i + 1}`}
//                     className="w-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                     <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors">
//                       <Eye size={14} />
//                     </button>
//                     <button className="p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-red-500/70 transition-colors">
//                       <Trash2 size={14} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//           <Card className="p-5">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex gap-1 p-1 bg-[#F1F5F9] rounded-lg">
//                 {(["photos", "reels", "videos"] as const).map((t) => (
//                   <button
//                     key={t}
//                     onClick={() => setMediaTab(t)}
//                     className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${mediaTab === t ? "bg-white text-[#0F172A] shadow-sm" : "text-[#64748B]"}`}
//                   >
//                     {t}
//                   </button>
//                 ))}
//               </div>
//               <Btn icon={Upload} small variant="secondary">
//                 Upload
//               </Btn>
//             </div>
//             <div className="grid grid-cols-4 gap-2">
//               {mediaItems
//                 .filter((m) =>
//                   mediaTab === "photos"
//                     ? m.type === "image"
//                     : mediaTab === "videos"
//                       ? m.type === "video"
//                       : m.type === "reel",
//                 )
//                 .slice(0, 8)
//                 .map((m) => (
//                   <div
//                     key={m.id}
//                     className="relative group rounded-lg overflow-hidden aspect-square bg-gray-100"
//                   >
//                     <img
//                       src={m.url}
//                       alt={m.name}
//                       className="w-full h-full object-cover"
//                     />
//                     {m.type !== "image" && (
//                       <div className="absolute top-2 right-2">
//                         <div className="bg-black/60 rounded px-1.5 py-0.5 text-white text-[9px] font-bold uppercase">
//                           {m.type}
//                         </div>
//                       </div>
//                     )}
//                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
//                       <button className="p-1.5 bg-white/20 rounded-lg text-white">
//                         <Eye size={13} />
//                       </button>
//                       <button className="p-1.5 bg-white/20 rounded-lg text-white">
//                         <Trash2 size={13} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </Card>
//         </div>
//         <div>
//           <Card className="p-5">
//             <div className="flex items-center justify-between mb-4">
//               <p className="text-sm font-semibold text-[#0F172A]">Services</p>
//               <button
//                 onClick={() => setServices((s) => [...s, "New Service"])}
//                 className="p-1.5 hover:bg-[#EFF6FF] rounded-lg transition-colors text-[#0F4C81]"
//               >
//                 <Plus size={15} />
//               </button>
//             </div>
//             <div className="space-y-2">
//               {services.map((svc, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center gap-2 p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] group"
//                 >
//                   <div className="w-1.5 h-1.5 bg-[#F97316] rounded-full flex-shrink-0" />
//                   <span className="text-sm text-[#0F172A] flex-1">{svc}</span>
//                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button className="text-[#94A3B8] hover:text-[#F97316] transition-colors">
//                       <Edit2 size={12} />
//                     </button>
//                     <button
//                       onClick={() =>
//                         setServices((s) => s.filter((_, j) => j !== i))
//                       }
//                       className="text-[#94A3B8] hover:text-red-500 transition-colors"
//                     >
//                       <Trash2 size={12} />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };
const ProfilePage = () => {
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

const FieldError = ({ message }) =>
  message ? <p className="text-xs text-red-500 mt-1">{message}</p> : null;
const CaseStudiesPage = () => {
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
// ─── AWARDS PAGE ──────────────────────────────────────────────────────────────

// const AwardsPage = () => {
//   const [active, setActive] = useState(0);
//   const aw = awardsData[active];
//   return (
//     <div>
//       <PageHeader
//         title="Awards & Recognition"
//         subtitle="Showcase your industry awards and recognition milestones."
//         action={<Btn icon={Plus}>Add Award</Btn>}
//       />
//       <div className="grid grid-cols-3 gap-6">
//         <div className="col-span-2">
//           <div className="p-6 space-y-4">
//             {/* Header row with title + action buttons */}
//             <div className="flex items-start justify-between gap-4">
//               <div>
//                 <h2 className="text-lg font-bold text-[#0F172A]">
//                   {activeStudy.name}
//                 </h2>
//                 <p className="text-sm text-[#64748B] mt-0.5 flex items-center gap-1.5">
//                   <MapPin size={12} />
//                   {activeStudy.location || "—"}
//                 </p>
//               </div>
//               <div className="flex gap-2 flex-shrink-0">
//                 <Btn
//                   small
//                   icon={Edit2}
//                   variant="secondary"
//                   onClick={() => openEdit(activeStudy)}
//                 >
//                   Edit
//                 </Btn>
//                 <Btn
//                   small
//                   icon={Trash2}
//                   variant="danger"
//                   onClick={() => setDeleteTarget(activeStudy)}
//                 >
//                   Delete
//                 </Btn>
//               </div>
//             </div>

//             {/* Stats row */}
//             <div className="grid grid-cols-3 gap-3">
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Location
//                 </p>
//                 <p className="text-sm font-medium text-[#0F172A]">
//                   {activeStudy.location || "—"}
//                 </p>
//               </div>
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Year
//                 </p>
//                 <p className="text-sm font-medium text-[#0F172A]">
//                   {activeStudy.year || "—"}
//                 </p>
//               </div>
//               <div className="bg-[#F8FAFC] rounded-xl p-4">
//                 <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
//                   Attendance
//                 </p>
//                 <p className="text-sm font-medium text-[#0F172A]">
//                   {activeStudy.attendance || "—"}
//                 </p>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="bg-[#F8FAFC] rounded-xl p-4">
//               <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
//                 Description
//               </p>
//               <p className="text-sm text-[#0F172A] leading-relaxed">
//                 {activeStudy.description || "No description provided."}
//               </p>
//             </div>

//             {/* Featured images (view-only) */}
//             {activeStudy.featuredImages.length > 0 && (
//               <div>
//                 <FormLabel>Featured Images</FormLabel>
//                 <div className="grid grid-cols-3 gap-3">
//                   {activeStudy.featuredImages.map((img, i) => (
//                     <div
//                       key={i}
//                       onClick={() => setLightbox(img)}
//                       className="rounded-xl border border-[#E2E8F0] overflow-hidden aspect-square bg-[#F8FAFC] cursor-pointer group relative"
//                     >
//                       <img
//                         src={img}
//                         alt={`featured-${i}`}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <Eye size={18} className="text-white" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//           <Card className="overflow-hidden">
//             <img
//               src={aw.image}
//               alt={aw.name}
//               className="w-full h-52 object-cover"
//             />
//             <div className="p-6 space-y-4">
//               <div className="flex items-start gap-3">
//                 <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center flex-shrink-0">
//                   <Trophy size={20} className="text-[#F97316]" />
//                 </div>
//                 <div className="flex-1">
//                   <Input label="Award Name" value={aw.name} />
//                 </div>
//               </div>
//               <div className="grid grid-cols-3 gap-3">
//                 <Input label="Award Type" value={aw.type} />
//                 <Input label="Location" value={aw.location} />
//                 <Input label="Year" value={aw.year} />
//               </div>
//               <Input label="Description" value={aw.description} textarea />
//               <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-4 text-center cursor-pointer hover:border-[#0F4C81] transition-colors">
//                 <Upload size={18} className="text-[#94A3B8] mx-auto mb-1" />
//                 <p className="text-xs text-[#64748B]">
//                   Upload Award Image / Trophy Photo
//                 </p>
//               </div>
//               <Btn>Save Award</Btn>
//             </div>
//           </Card>
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-[#0F172A] mb-3">
//             Awards Carousel
//           </p>
//           <div className="space-y-3">
//             {awardsData.map((a, i) => (
//               <Card
//                 key={a.id}
//                 className={`overflow-hidden cursor-pointer transition-all ${i === active ? "ring-2 ring-[#F97316]" : "hover:border-[#F97316]/30"}`}
//                 onClick={() => setActive(i)}
//               >
//                 <div className="flex gap-3 p-3">
//                   <img
//                     src={a.image.replace("w=800&h=360", "w=120&h=80")}
//                     alt={a.name}
//                     className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
//                   />
//                   <div className="min-w-0">
//                     <p className="text-xs font-semibold text-[#0F172A] leading-snug line-clamp-2">
//                       {a.name}
//                     </p>
//                     <p className="text-[10px] text-[#F97316] font-medium mt-1">
//                       {a.type}
//                     </p>
//                     <p className="text-[10px] text-[#94A3B8]">
//                       {a.location} · {a.year}
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
const blankAwardForm = () => ({
  id: null,
  name: "",
  type: "",
  location: "",
  year: "",
  description: "",
  image: "",
  featuredImages: [],
});

// ─────────────────────────────────────────────────────────────────────────────

// ── helpers ──────────────────────────────────────────────────────────────────

// ── small shared UI pieces ────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

const AwardsPage = () => {
  const [awardsList, setAwardsList] = useState(
    awardsData.map((a) => ({
      ...a,
      image: a.image || "",
      featuredImages: a.featuredImages || [],
    })),
  );
  const [activeId, setActiveId] = useState(awardsData[0].id);
  const [modal, setModal] = useState(null); // "add" | "edit" | null
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [form, setForm] = useState(blankAwardForm());
  const [errors, setErrors] = useState({}); // ← validation errors

  // Recomputes automatically whenever activeId or awardsList changes
  const activeAward =
    awardsList.find((item) => item.id === activeId) || awardsList[0];

  const imageRef = useRef(null);
  const featuredImagesRef = useRef(null);

  // ── helpers ───────────────────────────────────────────────────────────────

  const clearErrors = () => setErrors({});

  const openModal = (mode, award = null) => {
    setForm(award ? { ...award } : blankAwardForm());
    clearErrors();
    setModal(mode);
  };

  const closeModal = () => {
    setModal(null);
    setForm(blankAwardForm());
    clearErrors();
  };

  // ── image upload handlers ─────────────────────────────────────────────────

  /**
   * Cover image — must be exactly 800 × 700 px.
   */
  const handleImageChange = (e) => {
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
          if (img.naturalWidth !== 1200 || img.naturalHeight !== 900) {
            setErrors((prev) => ({
              ...prev,
              featuredImages: `Each featured image must be exactly 1200×900 px (got ${img.naturalWidth}×${img.naturalHeight} px).`,
            }));
            return;
          }
          setForm((prev) => {
            if (prev.featuredImages.length >= 4) return prev;
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

  // ── validation ────────────────────────────────────────────────────────────

  const validate = () => {
    const errs = {};
    if (!form.image) errs.image = "Cover image is required (800×700 px).";
    if (form.featuredImages.length < 4)
      errs.featuredImages = `${4 - form.featuredImages.length} more featured image(s) required (1200×900 px, max 4).`;
    if (!form.name.trim()) errs.name = "Award name is required.";
    if (!form.type.trim()) errs.type = "Award type is required.";
    if (!form.location.trim()) errs.location = "Location is required.";
    if (!form.year.trim()) errs.year = "Year is required.";
    if (!form.description.trim()) errs.description = "Description is required.";
    return errs;
  };

  // ── save / delete ─────────────────────────────────────────────────────────

  const handleSave = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (modal === "add") {
      const newId = Date.now();
      setAwardsList((prev) => [...prev, { ...form, id: newId }]);
      setActiveId(newId);
    } else {
      setAwardsList((prev) =>
        prev.map((a) => (a.id === form.id ? { ...form } : a)),
      );
      setActiveId(form.id);
    }
    closeModal();
  };

  const handleDelete = () => {
    const remaining = awardsList.filter((a) => a.id !== deleteTarget.id);
    setAwardsList(remaining);
    if (activeId === deleteTarget.id && remaining.length > 0) {
      setActiveId(remaining[0].id);
    }
    setDeleteTarget(null);
  };

  // ── featured images grid (modal) ──────────────────────────────────────────

  const renderFeaturedImagesGrid = () => (
    <div>
      <FormLabel>
        Featured Images ({form.featuredImages.length}/4)
        <span className="text-red-400 ml-0.5">*</span>
      </FormLabel>

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
            className={`border-2 border-dashed rounded-xl aspect-square flex flex-col items-center justify-center hover:border-[#F97316] hover:bg-[#FFF7ED] transition-all cursor-pointer group p-2 ${
              errors.featuredImages
                ? "border-red-400 bg-red-50"
                : "border-[#E2E8F0]"
            }`}
          >
            <div className="w-9 h-9 bg-[#F1F5F9] group-hover:bg-[#FFF7ED] rounded-lg flex items-center justify-center mb-2 transition-colors">
              <Upload
                size={15}
                className="text-[#94A3B8] group-hover:text-[#F97316] transition-colors"
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
        title="Awards & Recognition"
        subtitle="Showcase your industry awards and recognition milestones."
        action={
          <Btn icon={Plus} onClick={() => openModal("add")}>
            Add Award
          </Btn>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        {/* ── Detail Panel (left, col-span-2) ── */}
        <div className="col-span-2">
          <Card className="overflow-hidden">
            {/* Cover image — displayed at 800:700 aspect ratio */}
            {activeAward.image ? (
              <img
                src={activeAward.image}
                className="w-full object-cover"
                style={{ aspectRatio: "800 / 700" }}
                alt={activeAward.name}
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
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#FFF7ED] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy size={20} className="text-[#F97316]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#0F172A]">
                      {activeAward.name || "—"}
                    </h2>
                    <p className="text-sm text-[#64748B] mt-0.5">
                      {activeAward.type || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Btn
                    small
                    icon={Edit2}
                    variant="secondary"
                    onClick={() => openModal("edit", activeAward)}
                  >
                    Edit
                  </Btn>
                  <Btn
                    small
                    icon={Trash2}
                    variant="danger"
                    onClick={() => setDeleteTarget(activeAward)}
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
                    {activeAward.location || "—"}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Year
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {activeAward.year || "—"}
                  </p>
                </div>
                <div className="bg-[#F8FAFC] rounded-xl p-4">
                  <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                    Type
                  </p>
                  <p className="text-sm font-medium text-[#0F172A]">
                    {activeAward.type || "—"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="bg-[#F8FAFC] rounded-xl p-4">
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Description
                </p>
                <p className="text-sm text-[#0F172A] leading-relaxed">
                  {activeAward.description || "No description provided."}
                </p>
              </div>

              {/* Featured images (view-only) */}
              {activeAward.featuredImages?.length > 0 && (
                <div>
                  <FormLabel>Featured Images</FormLabel>
                  <div className="grid grid-cols-4 gap-3">
                    {activeAward.featuredImages.map((img, i) => (
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
            Awards Carousel
          </p>
          <div className="space-y-3">
            {awardsList.map((a) => (
              <Card
                key={a.id}
                className={`overflow-hidden cursor-pointer transition-all ${
                  a.id === activeId
                    ? "ring-2 ring-[#F97316]"
                    : "hover:border-[#F97316]/30"
                }`}
                onClick={() => setActiveId(a.id)}
              >
                <div className="flex gap-3 p-3">
                  {a.image ? (
                    <img
                      src={a.image}
                      alt={a.name}
                      className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-14 rounded-lg bg-[#FFF7ED] flex-shrink-0 flex items-center justify-center text-xs text-[#94A3B8]">
                      No img
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0F172A] leading-snug line-clamp-2">
                      {a.name}
                    </p>
                    <p className="text-[10px] text-[#F97316] font-medium mt-1">
                      {a.type}
                    </p>
                    <p className="text-[10px] text-[#94A3B8]">
                      {a.location} · {a.year}
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
        title={modal === "add" ? "Add Award" : "Edit Award"}
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
                onClick={() => imageRef.current?.click()}
              />
            )}

            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <FieldError message={errors.image} />
          </div>

          {/* Featured Images */}
          {renderFeaturedImagesGrid()}

          {/* Award Name */}
          <div>
            <HMInput
              label={
                <>
                  Award Name <span className="text-red-400">*</span>
                </>
              }
              placeholder="e.g. Best Experiential Marketing Campaign"
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

          {/* Type / Location / Year */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <HMInput
                label={
                  <>
                    Award Type <span className="text-red-400">*</span>
                  </>
                }
                placeholder="e.g. Gold Winner"
                value={form.type}
                hasError={!!errors.type}
                onChange={(v) => {
                  setForm((prev) => ({ ...prev, type: v }));
                  if (v.trim())
                    setErrors((p) => {
                      const n = { ...p };
                      delete n.type;
                      return n;
                    });
                }}
              />
              <FieldError message={errors.type} />
            </div>

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
              placeholder="Describe the award..."
              className={`w-full border rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] resize-none ${
                errors.description ? "border-red-400" : "border-[#E2E8F0]"
              }`}
            />
            <FieldError message={errors.description} />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Btn variant="secondary" onClick={closeModal}>
              Cancel
            </Btn>
            <Btn icon={modal === "add" ? Plus : undefined} onClick={handleSave}>
              {modal === "add" ? "Save Award" : "Save Changes"}
            </Btn>
          </div>
        </div>
      </Modal>

      {/* ── MODAL: Delete Confirm ── */}
      {deleteTarget && (
        <Modal
          title="Delete Award"
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

// ─── MESSAGES PAGE ────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// MessagesPage.tsx
//
// Changes from original:
//   • Delete button added to each row — removes message from list with confirm modal
//   • Send reply button (in row) opens the message detail modal pre-focused on reply
//   • Send Reply button (in modal) validates reply is not empty, marks message as
//     "Replied", clears the reply textarea, and closes the modal
//   • Archive button marks message status as "Archived" and closes modal
//   • Active filter tab state wired up — All / New / Replied tabs now filter the list
//   • replyText state per modal open so it resets each time
// ─────────────────────────────────────────────────────────────────────────────

const MessagesPage = () => {
  const [messages, setMessages] = useState(messagesData);
  const [viewMsg, setViewMsg] = useState<(typeof messagesData)[0] | null>(null);
  const [replyText, setReplyText] = useState("");
  const [replyError, setReplyError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<
    (typeof messagesData)[0] | null
  >(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const replyRef = useRef<HTMLTextAreaElement>(null);

  // ── derived list ────────────────────────────────────────────────────────────

  const filteredMessages = messages.filter((m) => {
    if (activeFilter === "All") return m.status !== "Archived";
    return m.status === activeFilter;
  });

  const counts = {
    All: messages.filter((m) => m.status !== "Archived").length,
    New: messages.filter((m) => m.status === "New").length,
    Replied: messages.filter((m) => m.status === "Replied").length,
  };

  // ── handlers ────────────────────────────────────────────────────────────────

  const openView = (msg: (typeof messagesData)[0], focusReply = false) => {
    setViewMsg(msg);
    setReplyText("");
    setReplyError("");
    if (focusReply) {
      // focus after modal renders
      setTimeout(() => replyRef.current?.focus(), 150);
    }
  };

  const closeView = () => {
    setViewMsg(null);
    setReplyText("");
    setReplyError("");
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      setReplyError("Reply cannot be empty.");
      replyRef.current?.focus();
      return;
    }
    // Mark as Replied
    setMessages((prev) =>
      prev.map((m) => (m.id === viewMsg!.id ? { ...m, status: "Replied" } : m)),
    );
    closeView();
  };

  const handleArchive = (id: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Archived" } : m)),
    );
    closeView();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setMessages((prev) => prev.filter((m) => m.id !== deleteTarget.id));
    if (viewMsg?.id === deleteTarget.id) closeView();
    setDeleteTarget(null);
  };

  // ── render ──────────────────────────────────────────────────────────────────

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Manage incoming leads, inquiries, and partnership requests."
      />

      {/* Filter tabs */}
      <div className="flex gap-3 mb-6">
        {(["All", "New", "Replied"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors flex items-center gap-2 ${
              activeFilter === f
                ? "border-[#0F4C81] text-[#0F4C81] bg-[#EFF6FF]"
                : "border-[#E2E8F0] bg-white hover:border-[#0F4C81] hover:text-[#0F4C81]"
            }`}
          >
            {f}
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                activeFilter === f
                  ? "bg-[#0F4C81] text-white"
                  : "bg-[#F1F5F9] text-[#64748B]"
              }`}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <Th>Sender</Th>
                <Th>Subject</Th>
                <Th>Message</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-10 text-center text-sm text-[#94A3B8]"
                  >
                    No messages found.
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => (
                  <tr
                    key={m.id}
                    className={`hover:bg-[#F8FAFC] transition-colors ${
                      m.status === "New" ? "bg-[#FAFBFF]" : ""
                    }`}
                  >
                    <Td>
                      <div>
                        <p
                          className={`font-medium text-[#0F172A] ${
                            m.status === "New" ? "font-semibold" : ""
                          }`}
                        >
                          {m.name}
                        </p>
                        <p className="text-[#94A3B8] text-xs">{m.email}</p>
                      </div>
                    </Td>
                    <Td className="font-medium">{m.subject}</Td>
                    <Td className="text-[#64748B] max-w-xs">
                      <p className="truncate">{m.message}</p>
                    </Td>
                    <Td className="text-[#64748B] text-xs">{m.date}</Td>
                    <Td>
                      <StatusBadge status={m.status} />
                    </Td>
                    <Td>
                      <div className="flex items-center gap-1">
                        {/* View */}
                        <button
                          onClick={() => openView(m)}
                          title="View message"
                          className="p-1.5 rounded-md hover:bg-[#EFF6FF] text-[#94A3B8] hover:text-[#0F4C81] transition-colors"
                        >
                          <Eye size={14} />
                        </button>

                        {/* Send reply — opens modal focused on reply box */}

                        {/* Delete */}
                      </div>
                    </Td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Message Detail Modal ── */}
      {viewMsg && (
        <Modal title="Message Details" isOpen={!!viewMsg} onClose={closeView}>
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#0F172A]">{viewMsg.name}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <Mail size={11} />
                    {viewMsg.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone size={11} />
                    {viewMsg.phone}
                  </span>
                </div>
              </div>
              <StatusBadge status={viewMsg.status} />
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] mb-1">
                SUBJECT
              </p>
              <p className="font-semibold text-[#0F172A] text-sm">
                {viewMsg.subject}
              </p>
            </div>

            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#64748B] mb-2">
                MESSAGE
              </p>
              <p className="text-sm text-[#0F172A] leading-relaxed">
                {viewMsg.message}
              </p>
            </div>

            <p className="text-xs text-[#94A3B8]">Received: {viewMsg.date}</p>

            {/* Reply section */}
            <div className="space-y-2 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Your Reply
                </label>
                <textarea
                  ref={replyRef}
                  rows={4}
                  value={replyText}
                  onChange={(e) => {
                    setReplyText(e.target.value);
                    if (e.target.value.trim()) setReplyError("");
                  }}
                  placeholder="Type your reply here..."
                  className={`w-full border rounded-lg px-3 py-2 text-sm text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] resize-none ${
                    replyError ? "border-red-400" : "border-[#E2E8F0]"
                  }`}
                />
                {replyError && (
                  <p className="text-xs text-red-500 mt-1">{replyError}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Btn icon={Send} onClick={handleSendReply}>
                  Send Reply
                </Btn>
                <Btn
                  variant="secondary"
                  icon={Archive}
                  onClick={() => handleArchive(viewMsg.id)}
                >
                  Archive
                </Btn>
                <Btn
                  variant="danger"
                  icon={Trash2}
                  onClick={() => {
                    setDeleteTarget(viewMsg);
                    closeView();
                  }}
                >
                  Delete
                </Btn>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <Modal
          title="Delete Message"
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
        >
          <div className="space-y-4">
            <p className="text-sm text-[#64748B]">
              Are you sure you want to delete the message from{" "}
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
    </div>
  );
};

// ─── MEDIA LIBRARY PAGE ───────────────────────────────────────────────────────

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────

const SettingsPage = () => {
  const [seo, setSeo] = useState({
    title: "APEX Brand Activation | Event Marketing Agency",
    description:
      "APEX is a leading event marketing and brand activation agency with offices across 8 global cities. Specialists in experiential marketing, exhibitions, and digital campaigns.",
    keywords:
      "event marketing, brand activation, exhibitions, experiential, MENA",
  });

  const [social, setSocial] = useState({
    instagram: "@apexbrandactivation",
    twitter: "@apexevents",
    linkedin: "company/apex-brand-activation",
    facebook: "apexbrandactivation",
  });

  // ── logo state ─────────────────────────────────────────────────────────────
  const [logo, setLogo] = useState<string>("");
  const [logoError, setLogoError] = useState<string>("");
  const logoRef = useRef<HTMLInputElement>(null);

  // ── logo upload handler ────────────────────────────────────────────────────

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. File size check — must be ≤ 500 KB
    const maxBytes = 500 * 1024; // 500 KB
    if (file.size > maxBytes) {
      setLogoError(
        `File too large (${(file.size / 1024).toFixed(0)} KB). Maximum allowed size is 500 KB.`,
      );
      e.target.value = "";
      return;
    }

    // 2. Resolution check — must be exactly 500×500 px
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth !== 500 || img.naturalHeight !== 500) {
          setLogoError(
            `Image must be exactly 500×500 px (uploaded: ${img.naturalWidth}×${img.naturalHeight} px).`,
          );
          return;
        }
        // All checks passed
        setLogoError("");
        setLogo(ev.target!.result as string);
      };
      img.src = ev.target!.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const removeLogo = () => {
    setLogo("");
    setLogoError("");
  };

  // ── render ─────────────────────────────────────────────────────────────────

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Configure your website, SEO, social media presence, and legal content."
      />

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* ── Website Branding ── */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#EFF6FF] rounded-lg flex items-center justify-center">
                <ImageIcon size={13} className="text-[#0F4C81]" />
              </div>
              Website Branding
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Company Logo */}
              <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-2">
                  Company Logo
                </p>

                {logo ? (
                  /* ── Preview state ── */
                  <div className="border border-[#E2E8F0] rounded-xl p-4 flex items-center gap-3 bg-[#F8FAFC]">
                    <img
                      src={logo}
                      alt="Company logo"
                      className="w-16 h-16 object-contain rounded-lg border border-[#E2E8F0] bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#0F172A]">
                        Logo uploaded
                      </p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5">
                        500×500 px · PNG/SVG
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeLogo}
                      title="Remove logo"
                      className="w-6 h-6 rounded-full bg-[#F1F5F9] hover:bg-red-50 flex items-center justify-center text-[#94A3B8] hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : (
                  /* ── Upload zone ── */
                  <div
                    onClick={() => logoRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer group ${
                      logoError
                        ? "border-red-400 bg-red-50 hover:border-red-500"
                        : "border-[#E2E8F0] hover:border-[#0F4C81]"
                    }`}
                  >
                    <Upload
                      size={20}
                      className={`mx-auto mb-2 transition-colors ${
                        logoError
                          ? "text-red-400"
                          : "text-[#94A3B8] group-hover:text-[#0F4C81]"
                      }`}
                    />
                    <p className="text-xs text-[#64748B]">
                      Click to upload Company Logo
                    </p>
                    <p className="text-[10px] text-[#94A3B8] mt-0.5">
                      PNG, SVG · Exactly 500×500 px · Max 500 KB
                    </p>
                  </div>
                )}

                {/* Hidden file input */}
                <input
                  ref={logoRef}
                  type="file"
                  accept="image/png,image/svg+xml"
                  className="hidden"
                  onChange={handleLogoChange}
                />

                {/* Inline error */}
                {logoError && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-start gap-1">
                    <span className="flex-shrink-0 mt-0.5">⚠</span>
                    {logoError}
                  </p>
                )}

                {/* Requirement hint (only when no error and no logo) */}
                {!logoError && !logo && (
                  <p className="text-[10px] text-[#94A3B8] mt-1.5">
                    Required: 500×500 px resolution, max 500 KB
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* ── SEO Settings ── */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#ECFDF5] rounded-lg flex items-center justify-center">
                <Globe size={13} className="text-emerald-600" />
              </div>
              SEO Settings
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Page Title
                </label>
                <input
                  value={seo.title}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, title: e.target.value }))
                  }
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]"
                />
                <p className="text-[10px] text-[#94A3B8] mt-1">
                  {seo.title.length}/60 characters recommended
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Meta Description
                </label>
                <textarea
                  value={seo.description}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, description: e.target.value }))
                  }
                  rows={3}
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81] resize-none"
                />
                <p className="text-[10px] text-[#94A3B8] mt-1">
                  {seo.description.length}/160 characters recommended
                </p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">
                  Keywords
                </label>
                <input
                  value={seo.keywords}
                  onChange={(e) =>
                    setSeo((s) => ({ ...s, keywords: e.target.value }))
                  }
                  className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]"
                />
              </div>
            </div>
          </Card>

          {/* ── Social Media Links ── */}
          <Card className="p-6">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-5 flex items-center gap-2">
              <div className="w-6 h-6 bg-[#FFF7ED] rounded-lg flex items-center justify-center">
                <Instagram size={13} className="text-[#F97316]" />
              </div>
              Social Media Links
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  key: "instagram",
                  color: "text-pink-500",
                  prefix: "instagram.com/",
                },
                {
                  icon: Twitter,
                  label: "Twitter / X",
                  key: "twitter",
                  color: "text-sky-500",
                  prefix: "x.com/",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  key: "linkedin",
                  color: "text-blue-600",
                  prefix: "linkedin.com/",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  key: "facebook",
                  color: "text-blue-700",
                  prefix: "facebook.com/",
                },
              ].map((s) => (
                <div key={s.key}>
                  <label
                    className={`block text-xs font-semibold uppercase tracking-wide mb-1.5 flex items-center gap-1.5 ${s.color}`}
                  >
                    <s.icon size={11} />
                    {s.label}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] text-xs">
                      {s.prefix}
                    </span>
                    <input
                      value={(social as any)[s.key]}
                      onChange={(e) =>
                        setSocial((prev) => ({
                          ...prev,
                          [s.key]: e.target.value,
                        }))
                      }
                      className="w-full border border-[#E2E8F0] rounded-lg pl-[4.5rem] pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/30 focus:border-[#0F4C81]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="flex gap-3 pb-8">
            <Btn>Save All Settings</Btn>
            <Btn variant="secondary">Reset to Defaults</Btn>
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          <Card className="p-5 border-l-4 border-l-[#0F4C81]">
            <p className="text-xs font-semibold text-[#0F4C81] mb-2">
              SEO Best Practices
            </p>
            <ul className="space-y-2">
              {[
                "Keep page titles under 60 characters",
                "Meta descriptions should be 120-160 chars",
                "Use primary keywords naturally in content",
                "Add alt text to all images for accessibility",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-[#64748B]"
                >
                  <Check
                    size={11}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 border-l-4 border-l-[#F97316]">
            <p className="text-xs font-semibold text-[#F97316] mb-2">
              Social Media Tips
            </p>
            <ul className="space-y-2">
              {[
                "Post consistently across all platforms",
                "Use branded hashtags for campaigns",
                "Engage with comments within 2 hours",
                "Track performance with platform analytics",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-[#64748B]"
                >
                  <Star
                    size={11}
                    className="text-[#F97316] mt-0.5 flex-shrink-0 fill-[#F97316]"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          {/* Logo requirements card */}
          <Card className="p-5 border-l-4 border-l-emerald-500">
            <p className="text-xs font-semibold text-emerald-600 mb-2">
              Logo Requirements
            </p>
            <ul className="space-y-2">
              {[
                "Exactly 500×500 px resolution",
                "Maximum file size: 500 KB",
                "Formats accepted: PNG or SVG",
                "Use transparent background for best results",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex items-start gap-2 text-xs text-[#64748B]"
                >
                  <Check
                    size={11}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  {tip}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-semibold text-[#0F172A] mb-3">
              Quick Actions
            </p>
            <div className="space-y-2">
              {[
                "Clear Cache",
                "Rebuild Sitemap",
                "Export Backup",
                "Preview Website",
              ].map((a) => (
                <button
                  key={a}
                  className="w-full text-left text-xs text-[#64748B] hover:text-[#0F4C81] py-2 px-3 rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center justify-between group"
                >
                  {a}
                  <ChevronRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────

const Sidebar = ({
  active,
  setActive,
  collapsed,
  setCollapsed,
}: {
  active: SectionId;
  setActive: (s: SectionId) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) => (
  <aside
    className={`flex-shrink-0 bg-lime-800 flex flex-col transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"} h-full overflow-hidden`}
  >
    <div
      className={`flex items-center gap-3 px-4 py-5 border-b border-white/10 ${collapsed ? "justify-center" : ""}`}
    >
      <div className="w-8 h-8 bg-[#F97316] rounded-xl flex items-center justify-center flex-shrink-0">
        <Star size={16} className="text-white fill-white" />
      </div>
      {!collapsed && (
        <div className="min-w-0">
          <p className="text-white font-bold text-sm leading-none">APEX</p>
          <p className="text-blue-200 text-[10px]">Brand Activation</p>
        </div>
      )}
    </div>
    <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
      {NAV.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            title={collapsed ? item.label : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left group relative ${isActive ? "bg-white/15 text-white" : "text-blue-200 hover:bg-white/8 hover:text-white"} ${collapsed ? "justify-center" : ""}`}
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F97316] rounded-r-full" />
            )}
            <item.icon size={17} className="flex-shrink-0" />
            {!collapsed && (
              <span className="text-xs font-medium truncate">{item.label}</span>
            )}
          </button>
        );
      })}
    </nav>
    <div className="border-t border-white/10 p-3 space-y-2">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-blue-200 hover:text-white hover:bg-white/10 transition-all text-xs font-medium ${collapsed ? "justify-center" : ""}`}
      >
        {collapsed ? (
          <ChevronRight size={15} />
        ) : (
          <>
            <ChevronLeft size={15} />
            <span>Collapse</span>
          </>
        )}
      </button>
      {!collapsed && (
        <div className="flex items-center gap-3 px-3 py-2">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="User"
            className="w-7 h-7 rounded-full border border-white/20 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">
              Alex Morgan
            </p>
            <p className="text-blue-300 text-[10px] truncate">Super Admin</p>
          </div>
          <button className="text-blue-300 hover:text-white transition-colors flex-shrink-0">
            <LogOut size={13} />
          </button>
        </div>
      )}
    </div>
  </aside>
);

// ─── TOP NAV ──────────────────────────────────────────────────────────────────

const TopNav = ({
  section,
  onMenuClick,
}: {
  section: SectionId;
  onMenuClick: () => void;
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  return (
    <header className="h-14 bg-white border-b border-[#E2E8F0] flex items-center px-5 gap-4 flex-shrink-0 z-20 relative">
      <button
        onClick={onMenuClick}
        className="p-1.5 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]"
      >
        <Menu size={18} />
      </button>
      <h1 className="text-sm font-semibold text-[#0F172A] hidden md:block">
        {SECTION_TITLES[section]}
      </h1>
      {/* <div className="flex-1 max-w-sm mx-4"> */}
      {/* <div className="relative"> */}
      {/* <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          /> */}
      {/* <input
            placeholder="Search anything..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20 focus:border-[#0F4C81] focus:bg-white transition-all"
          /> */}
      {/* </div> */}
      {/* </div> */}
      <div className="ml-auto flex items-center gap-2">
        <button className="relative p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors text-[#64748B]">
          <Bell size={17} />
          <span className="absolute top-1 right-1 w-4 h-4 bg-[#F97316] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 hover:bg-[#F1F5F9] rounded-xl transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
              alt="Profile"
              className="w-7 h-7 rounded-full border border-[#E2E8F0]"
            />
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-[#0F172A] leading-none">
                Alex Morgan
              </p>
              <p className="text-[10px] text-[#94A3B8]">Super Admin</p>
            </div>
            <ChevronDown size={13} className="text-[#94A3B8] hidden lg:block" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#E2E8F0] z-50 py-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-[#F1F5F9]">
                <p className="text-xs font-semibold text-[#0F172A]">
                  Alex Morgan
                </p>
                <p className="text-[10px] text-[#94A3B8]">
                  admin@apexevents.com
                </p>
              </div>
              {[
                { icon: User, label: "My Profile" },
                { icon: Settings, label: "Account Settings" },
                { icon: BarChart2, label: "Analytics" },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A] transition-colors"
                >
                  <item.icon size={13} />
                  {item.label}
                </button>
              ))}
              <div className="border-t border-[#F1F5F9] mt-1">
                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={13} />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// ─── APP ─────────────────────────────────────────────────────────────────────

const PAGE_MAP: Record<SectionId, React.ComponentType> = {
  "home-management": HomeManagementPage,
  events: EventsPage,
  campaigns: CampaignsPage,
  activations: ActivationsPage,
  exhibitions: ExhibitionsPage,
  profile: ProfilePage,
  "case-studies": CaseStudiesPage,
  awards: AwardsPage,
  messages: MessagesPage,
  settings: SettingsPage,
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [section, setSection] = useState<SectionId>("home-management");
  const [collapsed, setCollapsed] = useState(false);

  if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

  const PageComponent = PAGE_MAP[section];

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <TopNav section={section} onMenuClick={() => setCollapsed((c) => !c)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          active={section}
          setActive={setSection}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <PageComponent />
        </main>
      </div>
    </div>
  );
}
