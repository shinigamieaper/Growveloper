/**
 * Unified icon options for all Sanity schemas.
 * Single source of truth — use `ICON_OPTIONS` in any schema field
 * that needs an icon dropdown instead of duplicating lists.
 *
 * On the React side, the corresponding ICON_MAP lives in `@/lib/icons`.
 */

interface IconOption {
  title: string;
  value: string;
}

export const ICON_OPTIONS: IconOption[] = [
  // ── Performance & Growth ──
  { title: "\u26a1 Zap \u2014 Quick wins, speed, energy", value: "zap" },
  { title: "\ud83d\ude80 Rocket \u2014 Growth, launch, momentum", value: "rocket" },
  { title: "\ud83d\udd25 Flame \u2014 Urgency, heat, burning problems", value: "flame" },
  { title: "\ud83d\udcc8 Trending Up \u2014 Growth going up, positive momentum", value: "trending-up" },
  { title: "\ud83d\udcc9 Trending Down \u2014 Declining results, lost traction", value: "trending-down" },
  { title: "\u2198 Arrow Down Right \u2014 Falling numbers, poor performance", value: "arrow-down-right" },
  { title: "\u23f1 Gauge \u2014 Speed, performance score, load time", value: "gauge" },

  // ── Data & Analytics ──
  { title: "\ud83d\udcca Bar Chart \u2014 Analytics, reporting, data", value: "bar-chart" },
  { title: "\ud83d\udcca Bar Chart 2 \u2014 Comparison data, grouped stats", value: "bar-chart-2" },
  { title: "\ud83d\udcc8 Line Chart \u2014 Trends over time, growth curves", value: "line-chart" },
  { title: "\ud83d\uddc4 Database \u2014 Data storage, CRM, unorganised data", value: "database" },

  // ── Tech & Code ──
  { title: "\ud83d\udcbb Code \u2014 Tech debt, custom builds, dev work", value: "code" },
  { title: "\ud83d\udd27 Wrench \u2014 Broken systems, maintenance issues", value: "wrench" },
  { title: "\ud83d\uddc2 Layers \u2014 Stack complexity, too many layers", value: "layers" },
  { title: "\ud83d\udd04 Workflow \u2014 Automation gaps, process flow", value: "workflow" },
  { title: "\ud83d\udda5 Monitor \u2014 Screen, display, frontend", value: "monitor" },
  { title: "\ud83d\udd0c Plug \u2014 Integrations, connections, API", value: "plug" },
  { title: "\ud83c\udf10 Git Branch \u2014 Version control, branching", value: "git-branch" },
  { title: "\ud83d\udcf1 Smartphone \u2014 Mobile apps, responsive design", value: "smartphone" },

  // ── Marketing & Content ──
  { title: "\ud83d\udce3 Megaphone \u2014 Marketing, ads, broadcasting", value: "megaphone" },
  { title: "\ud83d\udd0d Search \u2014 SEO, discoverability, visibility", value: "search" },
  { title: "\ud83c\udf10 Globe \u2014 Online presence, website, web reach", value: "globe" },
  { title: "\u2709 Mail \u2014 Email marketing, outreach", value: "mail" },
  { title: "\ud83d\udce5 Inbox \u2014 Lead capture, unread messages", value: "inbox" },
  { title: "\ud83d\uddb1 Click \u2014 CRO, conversion, user interaction", value: "mouse-pointer-click" },
  { title: "\u270f Pen Tool \u2014 Design, content creation, branding", value: "pen-tool" },
  { title: "\ud83e\uddea Flask \u2014 Experiments, A/B testing, research", value: "flask" },
  { title: "\ud83d\udcdd File Text \u2014 Documents, reports, written content", value: "file-text" },

  // ── Automation & AI ──
  { title: "\ud83e\udd16 Bot \u2014 AI, chatbots, automated responses", value: "bot" },
  { title: "\ud83e\udde0 Brain \u2014 Strategy, thinking, AI intelligence", value: "brain" },
  { title: "\ud83d\udd01 Repeat \u2014 Repetitive tasks, loops, manual work", value: "repeat" },
  { title: "\ud83d\udd03 Refresh \u2014 Updating, rebuilding, fresh start", value: "refresh-cw" },
  { title: "\ud83d\udcac Message Circle \u2014 Chat, conversations, feedback", value: "message-circle" },
  { title: "\ud83d\udd14 Bell \u2014 Notifications, alerts, reminders", value: "bell" },
  { title: "\ud83d\udcbb Filter \u2014 Sorting, qualifying, screening", value: "filter" },

  // ── People & Leads ──
  { title: "\ud83d\udc65 Users \u2014 Team, audience, customer base", value: "users" },
  { title: "\ud83d\udeab User X \u2014 Churn, lost customers, disconnected leads", value: "user-x" },
  { title: "\ud83c\udfaf Target \u2014 Goals, precision, lead targeting", value: "target" },
  { title: "\ud83d\udc64 User \u2014 Single person, profile, account", value: "user" },

  // ── Trust & Visibility ──
  { title: "\ud83d\udee1 Shield Check \u2014 Security, trust, compliance", value: "shield" },
  { title: "\ud83d\udee1 Shield Plain \u2014 Protection, defence, basic security", value: "shield-plain" },
  { title: "\ud83d\udc41 Eye \u2014 Visibility, being seen, impressions", value: "eye" },
  { title: "\ud83d\ude48 Eye Off \u2014 Hidden, invisible, no organic reach", value: "eye-off" },
  { title: "\ud83d\udd12 Lock \u2014 Locked growth, barriers, restricted access", value: "lock" },
  { title: "\ud83d\udd13 Unlock \u2014 Unlocking potential, removing blockers", value: "unlock" },

  // ── Connectivity & Problems ──
  { title: "\ud83e\udde9 Puzzle \u2014 Disconnected tools, missing pieces", value: "puzzle" },
  { title: "\ud83d\udd17 Link \u2014 Integrations, connected systems", value: "link" },
  { title: "\ud83d\udd17 Unlink \u2014 Broken integrations, siloed tools", value: "unlink" },
  { title: "\u26a0 Alert Triangle \u2014 Warnings, critical issues, risk", value: "alert-triangle" },

  // ── Time, Cost & Planning ──
  { title: "\ud83d\udd50 Clock \u2014 Time wasted, slow processes, delays", value: "clock" },
  { title: "\ud83d\udcb0 Dollar Sign \u2014 Budget waste, ROI, revenue problems", value: "dollar-sign" },
  { title: "\ud83d\udcc5 Calendar \u2014 Scheduling, timeline, deadlines", value: "calendar" },

  // ── Deliverables & Media ──
  { title: "\ud83c\udfac Video \u2014 Video content, recordings, walkthroughs", value: "video" },
  { title: "\u25b6 Play Circle \u2014 Loom, playback, video recording", value: "play-circle" },
  { title: "\ud83d\udcca Presentation \u2014 Slides, pitch decks, showcases", value: "presentation" },
  { title: "\ud83d\uddfa Map \u2014 Roadmap, plan, navigation", value: "map" },
  { title: "\ud83d\udce6 Package \u2014 Deliverables, bundles, products", value: "package" },
  { title: "\ud83d\udcbe Download \u2014 Downloads, file access", value: "download" },
  { title: "\ud83d\udcf7 Image \u2014 Photos, screenshots, visuals", value: "image" },

  // ── Ideas & Light ──
  { title: "\ud83d\udca1 Lightbulb \u2014 Insights, ideas, strategy gaps", value: "lightbulb" },
  { title: "\u2728 Sparkles \u2014 New, shiny, premium features", value: "sparkles" },
  { title: "\u2b50 Star \u2014 Ratings, highlights, favourites", value: "star" },
  { title: "\u2764 Heart \u2014 Favourites, loved features", value: "heart" },

  // ── Industries ──
  { title: "\ud83c\udfe2 Building \u2014 Enterprise, office, B2B", value: "building" },
  { title: "\ud83c\udfdb Landmark \u2014 Government, institutions, fintech", value: "landmark" },
  { title: "\ud83d\udcbb CPU \u2014 SaaS, tech, hardware", value: "cpu" },
  { title: "\ud83d\uded2 Shopping Cart \u2014 E-commerce, retail", value: "shopping-cart" },
  { title: "\ud83c\udf93 Graduation Cap \u2014 Education, learning, courses", value: "graduation-cap" },
  { title: "\ud83e\ude7a Stethoscope \u2014 Health, medical, wellness", value: "stethoscope" },

  // ── Actions ──
  { title: "\u2705 Check Circle \u2014 Complete, verified, approved", value: "check-circle" },
  { title: "\u274c X Circle \u2014 Error, rejected, closed", value: "x-circle" },
  { title: "\u2795 Plus Circle \u2014 Add, create, expand", value: "plus-circle" },
  { title: "\ud83d\udcde Phone \u2014 Call, contact, support", value: "phone" },
  { title: "\ud83d\udd17 External Link \u2014 Open in new tab, external", value: "external-link" },
  { title: "\ud83d\udccc Map Pin \u2014 Location, local, place", value: "map-pin" },
  { title: "\u2699 Settings \u2014 Configuration, preferences, setup", value: "settings" },
  { title: "\ud83c\udf97 Tag \u2014 Labels, pricing, categories", value: "tag" },
  { title: "\ud83d\udccc Bookmark \u2014 Saved, pinned, reference", value: "bookmark" },
  { title: "\u21a9 Share \u2014 Sharing, social, distribution", value: "share-2" },
  { title: "\ud83d\udd04 Arrows Right Left \u2014 Exchange, swap, comparison", value: "arrows-right-left" },
  { title: "\ud83d\udcc4 Clipboard \u2014 Checklist, tasks, todo", value: "clipboard" },
  { title: "\ud83d\udce4 Send \u2014 Submit, dispatch, outgoing", value: "send" },
  { title: "\ud83c\udfc6 Trophy \u2014 Achievement, award, winner", value: "trophy" },
  { title: "\ud83d\udca4 Headphones \u2014 Support, audio, customer service", value: "headphones" },
  { title: "\ud83d\udd11 Credit Card \u2014 Payment, billing, transactions", value: "credit-card" },
];
