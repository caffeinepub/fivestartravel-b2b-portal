import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart2,
  Calendar,
  CheckCircle,
  Globe,
  MessageCircle,
  Plus,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

// ── Platform Config ──────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    id: "facebook",
    name: "Facebook",
    icon: "📘",
    color: "bg-blue-600",
    followers: "12,400",
    connected: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "📸",
    color: "bg-gradient-to-br from-purple-500 to-orange-400",
    followers: "8,920",
    connected: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "💬",
    color: "bg-green-500",
    followers: "3,210 contacts",
    connected: true,
  },
  {
    id: "telegram",
    name: "Telegram",
    icon: "✈️",
    color: "bg-sky-500",
    followers: "1,850",
    connected: false,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "💼",
    color: "bg-blue-700",
    followers: "4,100",
    connected: true,
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "▶️",
    color: "bg-red-600",
    followers: "2,300 subscribers",
    connected: false,
  },
];

const INBOX_MESSAGES = [
  {
    id: 1,
    name: "Arun Kumar",
    platform: "WhatsApp",
    avatar: "AK",
    preview: "I want to book a package to Dubai for 5 people...",
    time: "2m ago",
    unread: 3,
    platformColor: "bg-green-500",
  },
  {
    id: 2,
    name: "Meera Shah",
    platform: "Facebook",
    avatar: "MS",
    preview: "Hi, do you have Maldives tour packages?",
    time: "15m ago",
    unread: 1,
    platformColor: "bg-blue-600",
  },
  {
    id: 3,
    name: "Raj Patel",
    platform: "Instagram",
    avatar: "RP",
    preview: "Loved your post! What is the price for Europe?",
    time: "1h ago",
    unread: 0,
    platformColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Sunita Singh",
    platform: "Telegram",
    avatar: "SS",
    preview: "Can you share visa requirements for Canada?",
    time: "2h ago",
    unread: 2,
    platformColor: "bg-sky-500",
  },
  {
    id: 5,
    name: "Vikram Reddy",
    platform: "LinkedIn",
    avatar: "VR",
    preview: "Interested in B2B partnership for corporate travel",
    time: "3h ago",
    unread: 0,
    platformColor: "bg-blue-700",
  },
  {
    id: 6,
    name: "Neha Sharma",
    platform: "WhatsApp",
    avatar: "NS",
    preview: "What is the cancellation policy for tour packages?",
    time: "4h ago",
    unread: 1,
    platformColor: "bg-green-500",
  },
  {
    id: 7,
    name: "Amit Verma",
    platform: "Facebook",
    avatar: "AV",
    preview: "Please send me the itinerary for Thailand trip",
    time: "5h ago",
    unread: 0,
    platformColor: "bg-blue-600",
  },
  {
    id: 8,
    name: "Kavya Nair",
    platform: "Instagram",
    avatar: "KN",
    preview: "Do you offer group discounts? We are 15 people",
    time: "6h ago",
    unread: 1,
    platformColor: "bg-purple-500",
  },
];

const CAMPAIGNS = [
  {
    name: "Summer Europe Sale",
    platforms: ["FB", "IG", "LN"],
    status: "Active",
    reach: "45,200",
    clicks: "1,830",
    leads: "92",
    budget: "₹15,000",
  },
  {
    name: "Maldives Honeymoon",
    platforms: ["IG", "WA"],
    status: "Active",
    reach: "28,100",
    clicks: "960",
    leads: "44",
    budget: "₹8,000",
  },
  {
    name: "Dubai Winter Special",
    platforms: ["FB", "WA", "TG"],
    status: "Paused",
    reach: "12,300",
    clicks: "410",
    leads: "21",
    budget: "₹5,000",
  },
  {
    name: "New Year Bangkok",
    platforms: ["IG", "FB"],
    status: "Completed",
    reach: "67,800",
    clicks: "3,210",
    leads: "156",
    budget: "₹20,000",
  },
  {
    name: "Corporate Travel B2B",
    platforms: ["LN"],
    status: "Active",
    reach: "9,400",
    clicks: "320",
    leads: "18",
    budget: "₹6,000",
  },
];

const SCHEDULED_POSTS = [
  {
    platform: "Instagram",
    content:
      "✈️ Discover the magic of Maldives! 7 nights package starting ₹85,000. Book now!",
    scheduled: "16 Mar 2026, 10:00 AM",
    status: "Scheduled",
  },
  {
    platform: "Facebook",
    content:
      "🌍 Europe Summer Sale — Up to 30% off on all packages. Limited seats!",
    scheduled: "17 Mar 2026, 12:00 PM",
    status: "Scheduled",
  },
  {
    platform: "WhatsApp",
    content:
      "🎉 Special offer for our existing customers — Dubai 4N/5D @ ₹42,000!",
    scheduled: "18 Mar 2026, 9:00 AM",
    status: "Scheduled",
  },
  {
    platform: "LinkedIn",
    content:
      "FiveStar Travel is now accepting B2B partnerships. Join 500+ agents!",
    scheduled: "19 Mar 2026, 11:00 AM",
    status: "Draft",
  },
];

const CAMPAIGN_STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Paused: "bg-yellow-100 text-yellow-700",
  Completed: "bg-gray-100 text-gray-700",
};

// ── Subcomponents ────────────────────────────────────────────────────────────
function PlatformToggle({
  platform,
  index,
}: { platform: (typeof PLATFORMS)[0]; index: number }) {
  const [connected, setConnected] = useState(platform.connected);
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 ${platform.color} rounded-xl flex items-center justify-center text-xl`}
            >
              {platform.icon}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">
                {platform.name}
              </p>
              <p className="text-xs text-gray-500">{platform.followers}</p>
            </div>
          </div>
          <button
            type="button"
            data-ocid={`social.platform.toggle.${index}`}
            onClick={() => setConnected(!connected)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              connected
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {connected ? "✓ Connected" : "Connect"}
          </button>
        </div>
        {connected && (
          <div className="text-xs text-gray-400 border-t pt-2">
            Last sync: 2 minutes ago
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function SocialMediaModule() {
  const [selectedConversation, setSelectedConversation] = useState(
    INBOX_MESSAGES[0],
  );
  const [leadConverted, setLeadConverted] = useState<number[]>([]);
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState("All");

  const overviewStats = [
    {
      label: "Total Reach",
      value: "161,750",
      icon: Globe,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Messages Today",
      value: "38",
      icon: MessageCircle,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "New Leads",
      value: "14",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Posts Scheduled",
      value: "4",
      icon: Calendar,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  const filteredMessages =
    platformFilter === "All"
      ? INBOX_MESSAGES
      : INBOX_MESSAGES.filter((m) =>
          m.platform.toLowerCase().includes(platformFilter.toLowerCase()),
        );

  const PLATFORM_FILTERS = [
    "All",
    "Facebook",
    "Instagram",
    "WhatsApp",
    "Telegram",
    "LinkedIn",
  ];

  function handleConvertLead(id: number) {
    setLeadConverted((prev) => [...prev, id]);
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Social Media Hub</h2>
        <p className="text-gray-500 text-sm">
          Manage all social platforms, messages, leads, and campaigns in one
          place
        </p>
      </div>

      <Tabs defaultValue="dashboard">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            data-ocid="social.dashboard.tab"
            value="dashboard"
            className="text-xs"
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger
            data-ocid="social.inbox.tab"
            value="inbox"
            className="text-xs"
          >
            Inbox{" "}
            <Badge className="ml-1 bg-red-500 text-white border-0 text-xs px-1">
              8
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            data-ocid="social.campaigns.tab"
            value="campaigns"
            className="text-xs"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            data-ocid="social.scheduler.tab"
            value="scheduler"
            className="text-xs"
          >
            Post Scheduler
          </TabsTrigger>
          <TabsTrigger
            data-ocid="social.analytics.tab"
            value="analytics"
            className="text-xs"
          >
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* ── Dashboard ── */}
        <TabsContent value="dashboard" className="space-y-5 mt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {overviewStats.map((s) => (
              <Card key={s.label} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}
                  >
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLATFORMS.map((p, i) => (
              <PlatformToggle key={p.id} platform={p} index={i + 1} />
            ))}
          </div>
        </TabsContent>

        {/* ── Inbox ── */}
        <TabsContent value="inbox" className="mt-5">
          <div className="flex gap-2 mb-4 flex-wrap">
            {PLATFORM_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setPlatformFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  platformFilter === f
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-500 hover:border-blue-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-4 h-[500px]">
            {/* Conversation list */}
            <div className="w-72 flex-shrink-0 border rounded-xl overflow-y-auto">
              {filteredMessages.map((msg) => (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => setSelectedConversation(msg)}
                  className={`w-full p-3 text-left hover:bg-gray-50 border-b transition-colors ${
                    selectedConversation.id === msg.id
                      ? "bg-blue-50 border-l-2 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 flex-shrink-0">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-gray-800 truncate">
                          {msg.name}
                        </span>
                        <span className="text-xs text-gray-400 flex-shrink-0">
                          {msg.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white ${msg.platformColor}`}
                        >
                          {msg.platform.slice(0, 2).toUpperCase()}
                        </span>
                        {msg.unread > 0 && (
                          <span className="text-[9px] font-bold bg-red-500 text-white rounded-full px-1.5">
                            {msg.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {msg.preview}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {/* Conversation thread */}
            <div className="flex-1 border rounded-xl flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700">
                    {selectedConversation.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {selectedConversation.name}
                    </p>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${selectedConversation.platformColor}`}
                    >
                      {selectedConversation.platform}
                    </span>
                  </div>
                </div>
                {leadConverted.includes(selectedConversation.id) ? (
                  <Badge className="bg-green-100 text-green-700 border-0 text-xs flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Lead Created in CRM
                  </Badge>
                ) : (
                  <Button
                    data-ocid="social.lead_convert.button"
                    size="sm"
                    onClick={() => handleConvertLead(selectedConversation.id)}
                    className="h-8 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <Users className="w-3 h-3 mr-1" /> Convert to Lead
                  </Button>
                )}
              </div>
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs">
                    <p className="text-sm text-gray-700">
                      {selectedConversation.preview}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {selectedConversation.time}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                    <p className="text-sm text-white">
                      Thank you for reaching out! I would be happy to help you
                      with our travel packages. Could you please share your
                      travel dates and budget?
                    </p>
                    <p className="text-xs text-blue-200 mt-1">Just now</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t flex gap-2">
                <Input placeholder="Type a reply..." className="h-9" />
                <Button
                  size="sm"
                  className="h-9 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Campaigns ── */}
        <TabsContent value="campaigns" className="space-y-4 mt-5">
          <div className="flex justify-end">
            <Button
              data-ocid="social.new_campaign.open_modal_button"
              onClick={() => setCampaignOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> New Campaign
            </Button>
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Campaign",
                      "Platforms",
                      "Status",
                      "Reach",
                      "Clicks",
                      "Leads",
                      "Budget",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {CAMPAIGNS.map((c, i) => (
                    <tr
                      key={c.name}
                      data-ocid={`social.campaigns.row.item.${i + 1}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {c.name}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          {c.platforms.map((p) => (
                            <Badge
                              key={p}
                              variant="outline"
                              className="text-[10px] px-1"
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${CAMPAIGN_STATUS_COLORS[c.status]} border-0 text-xs`}
                        >
                          {c.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{c.reach}</td>
                      <td className="py-3 px-4 text-gray-600">{c.clicks}</td>
                      <td className="py-3 px-4 text-gray-600">{c.leads}</td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        {c.budget}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="text-xs text-red-500 hover:underline"
                          >
                            Pause
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Post Scheduler ── */}
        <TabsContent value="scheduler" className="space-y-4 mt-5">
          <div className="flex justify-end">
            <Button
              data-ocid="social.schedule_post.open_modal_button"
              onClick={() => setPostOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" /> Schedule Post
            </Button>
          </div>
          <div className="space-y-3">
            {SCHEDULED_POSTS.map((post) => (
              <Card
                key={post.platform + post.scheduled}
                className="border-0 shadow-sm"
              >
                <CardContent className="p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        post.platform === "Facebook"
                          ? "bg-blue-100"
                          : post.platform === "Instagram"
                            ? "bg-purple-100"
                            : post.platform === "WhatsApp"
                              ? "bg-green-100"
                              : "bg-blue-100"
                      }`}
                    >
                      {post.platform === "Facebook"
                        ? "📘"
                        : post.platform === "Instagram"
                          ? "📸"
                          : post.platform === "WhatsApp"
                            ? "💬"
                            : "💼"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          {post.platform}
                        </Badge>
                        <Badge
                          className={`text-xs border-0 ${
                            post.status === "Scheduled"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-700">{post.content}</p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {post.scheduled}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      type="button"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── Analytics ── */}
        <TabsContent value="analytics" className="space-y-5 mt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total Impressions",
                value: "485,200",
                trend: "+12%",
                color: "text-blue-600",
              },
              {
                label: "Total Reach",
                value: "161,750",
                trend: "+8%",
                color: "text-green-600",
              },
              {
                label: "Avg Engagement",
                value: "4.2%",
                trend: "+0.5%",
                color: "text-orange-600",
              },
              {
                label: "Link Clicks",
                value: "6,720",
                trend: "+18%",
                color: "text-purple-600",
              },
            ].map((stat) => (
              <Card key={stat.label} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 font-semibold mt-1 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> {stat.trend} this month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600" /> Engagement by
                Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    platform: "Facebook",
                    impressions: "210,400",
                    reach: "75,200",
                    leads: "92",
                    rate: "4.8%",
                    cost: "₹163",
                  },
                  {
                    platform: "Instagram",
                    impressions: "145,800",
                    reach: "52,100",
                    leads: "74",
                    rate: "5.1%",
                    cost: "₹108",
                  },
                  {
                    platform: "WhatsApp",
                    impressions: "84,200",
                    reach: "28,900",
                    leads: "44",
                    rate: "6.2%",
                    cost: "₹182",
                  },
                  {
                    platform: "LinkedIn",
                    impressions: "31,400",
                    reach: "8,400",
                    leads: "18",
                    rate: "3.4%",
                    cost: "₹333",
                  },
                  {
                    platform: "YouTube",
                    impressions: "13,400",
                    reach: "5,100",
                    leads: "8",
                    rate: "2.1%",
                    cost: "₹750",
                  },
                ].map((row) => (
                  <div
                    key={row.platform}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-24 text-sm font-semibold text-gray-700">
                      {row.platform}
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.min(100, Number.parseInt(row.impressions.replace(/,/g, "")) / 3000)}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 w-20 text-right">
                      {row.impressions}
                    </div>
                    <div className="text-xs text-green-600 w-10 font-semibold">
                      {row.rate}
                    </div>
                    <div className="text-xs text-gray-500 w-16 text-right">
                      {row.leads} leads
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Campaign Modal */}
      <Dialog open={campaignOpen} onOpenChange={setCampaignOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>New Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                Campaign Name
              </Label>
              <Input placeholder="e.g. Summer Europe Sale" className="h-10" />
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                Platforms
              </Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Facebook",
                  "Instagram",
                  "WhatsApp",
                  "Telegram",
                  "LinkedIn",
                ].map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-1.5 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={p !== "Telegram"}
                      className="accent-blue-600"
                    />
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Budget (₹)
                </Label>
                <Input placeholder="15000" className="h-10" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Target Audience
                </Label>
                <Input placeholder="Travel enthusiasts" className="h-10" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Start Date
                </Label>
                <Input type="date" className="h-10" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                  End Date
                </Label>
                <Input type="date" className="h-10" />
              </div>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setCampaignOpen(false)}
            >
              Create Campaign
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Post Modal */}
      <Dialog open={postOpen} onOpenChange={setPostOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Schedule New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                Platforms
              </Label>
              <div className="flex flex-wrap gap-2">
                {["Facebook", "Instagram", "WhatsApp", "LinkedIn"].map((p) => (
                  <label
                    key={p}
                    className="flex items-center gap-1.5 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-blue-600"
                    />{" "}
                    {p}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                Post Content
              </Label>
              <Textarea
                rows={4}
                placeholder="Write your post content here..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Date
                </Label>
                <Input type="date" className="h-10" />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                  Time
                </Label>
                <Input type="time" className="h-10" />
              </div>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-300">
              <p className="text-sm text-gray-400">+ Attach Image / Video</p>
            </div>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setPostOpen(false)}
            >
              Schedule Post
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
