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
import {NavItem,SectionId,Client,ClientStory,FeedCard} from "./Type"
export const NAV: NavItem[] = [
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

export const SECTION_TITLES: Record<SectionId, string> = {
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
export const monthlyData = [
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

export const kpiData = [
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

export const recentActivities = [
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

export const topCampaigns = [
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

export const eventsData = [
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

export const campaignsData = [
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

export const activationsData = [
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

export const exhibitionsData = [
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

export const locationsData = [
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

export const profileGallery = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=350&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=320&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=260&fit=crop",
];

export const caseStudies = [
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

export const awardsData = [
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

export const messagesData = [
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

export const mediaItems = [
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
export const seedClients: Client[] = [
  { id: 1, name: "Samsung", logo: null, initials: "SA" },
  { id: 2, name: "Nike", logo: null, initials: "NK" },
  { id: 3, name: "Apple", logo: null, initials: "AP" },
];

export const seedStories: ClientStory[] = [
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

export const seedFeedCards: FeedCard[] = [
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