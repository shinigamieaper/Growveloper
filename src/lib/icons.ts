/**
 * Unified icon map — single source of truth for all Lucide icon rendering.
 * Every value in the Sanity `ICON_OPTIONS` list must have a matching entry here.
 *
 * Import: `import { ICON_MAP } from "@/lib/icons";`
 */

import type { LucideIcon } from "lucide-react";
import {
  // Performance & Growth
  Zap,
  Rocket,
  Flame,
  TrendingUp,
  TrendingDown,
  ArrowDownRight,
  Gauge,
  // Data & Analytics
  BarChart3,
  BarChart2,
  LineChart,
  Database,
  // Tech & Code
  Code2,
  Wrench,
  Layers,
  Workflow,
  Monitor,
  Plug2,
  GitBranch,
  Smartphone,
  // Marketing & Content
  Megaphone,
  Search,
  Globe,
  Mail,
  Inbox,
  MousePointerClick,
  PenTool,
  FlaskConical,
  FileText,
  // Automation & AI
  Bot,
  Brain,
  Repeat,
  RefreshCw,
  MessageCircle,
  Bell,
  Filter,
  // People & Leads
  Users,
  UserX,
  Target,
  User,
  // Trust & Visibility
  ShieldCheck,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  // Connectivity & Problems
  Puzzle,
  Link,
  Unlink,
  AlertTriangle,
  // Time, Cost & Planning
  Clock,
  DollarSign,
  Calendar,
  // Deliverables & Media
  Video,
  PlayCircle,
  Presentation,
  Map,
  Package,
  Download,
  Image,
  // Ideas & Light
  Lightbulb,
  Sparkles,
  Star,
  Heart,
  // Industries
  Building2,
  Landmark,
  Cpu,
  ShoppingCart,
  GraduationCap,
  Stethoscope,
  // Actions
  CheckCircle2,
  XCircle,
  PlusCircle,
  Phone,
  ExternalLink,
  MapPin,
  Settings,
  Tag,
  Bookmark,
  Share2,
  ArrowRightLeft,
  ClipboardList,
  Send,
  Trophy,
  Headphones,
  CreditCard,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  // Performance & Growth
  zap: Zap,
  rocket: Rocket,
  flame: Flame,
  "trending-up": TrendingUp,
  "trending-down": TrendingDown,
  "arrow-down-right": ArrowDownRight,
  gauge: Gauge,
  // Data & Analytics
  "bar-chart": BarChart3,
  "bar-chart-2": BarChart2,
  "line-chart": LineChart,
  database: Database,
  // Tech & Code
  code: Code2,
  wrench: Wrench,
  layers: Layers,
  workflow: Workflow,
  monitor: Monitor,
  plug: Plug2,
  "git-branch": GitBranch,
  smartphone: Smartphone,
  // Marketing & Content
  megaphone: Megaphone,
  search: Search,
  globe: Globe,
  mail: Mail,
  inbox: Inbox,
  "mouse-pointer-click": MousePointerClick,
  "pen-tool": PenTool,
  flask: FlaskConical,
  "file-text": FileText,
  // Automation & AI
  bot: Bot,
  brain: Brain,
  repeat: Repeat,
  "refresh-cw": RefreshCw,
  "message-circle": MessageCircle,
  bell: Bell,
  filter: Filter,
  // People & Leads
  users: Users,
  "user-x": UserX,
  target: Target,
  user: User,
  // Trust & Visibility
  shield: ShieldCheck,
  "shield-plain": Shield,
  eye: Eye,
  "eye-off": EyeOff,
  lock: Lock,
  unlock: Unlock,
  // Connectivity & Problems
  puzzle: Puzzle,
  link: Link,
  unlink: Unlink,
  "alert-triangle": AlertTriangle,
  // Time, Cost & Planning
  clock: Clock,
  "dollar-sign": DollarSign,
  calendar: Calendar,
  // Deliverables & Media
  video: Video,
  "play-circle": PlayCircle,
  presentation: Presentation,
  map: Map,
  package: Package,
  download: Download,
  image: Image,
  // Ideas & Light
  lightbulb: Lightbulb,
  sparkles: Sparkles,
  star: Star,
  heart: Heart,
  // Industries
  building: Building2,
  landmark: Landmark,
  cpu: Cpu,
  "shopping-cart": ShoppingCart,
  "graduation-cap": GraduationCap,
  stethoscope: Stethoscope,
  // Actions
  "check-circle": CheckCircle2,
  "x-circle": XCircle,
  "plus-circle": PlusCircle,
  phone: Phone,
  "external-link": ExternalLink,
  "map-pin": MapPin,
  settings: Settings,
  tag: Tag,
  bookmark: Bookmark,
  "share-2": Share2,
  "arrows-right-left": ArrowRightLeft,
  clipboard: ClipboardList,
  send: Send,
  trophy: Trophy,
  headphones: Headphones,
  "credit-card": CreditCard,
};

/** Helper to get a LucideIcon by key, returns undefined if not found */
export function getIcon(key: string | undefined | null): LucideIcon | undefined {
  if (!key) return undefined;
  return ICON_MAP[key];
}
