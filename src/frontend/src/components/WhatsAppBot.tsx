import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Check,
  CheckCheck,
  Clock,
  Globe,
  MessageCircle,
  Radio,
  Send,
  Settings,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ── Mock conversations ────────────────────────────────────────────────────────
const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    preview: "YES — booking confirmed ✅",
    time: "09:32",
    unread: 0,
  },
  {
    id: 2,
    name: "Priya Mehta",
    preview: "Bangkok hotel 3 nights 2 pax",
    time: "09:28",
    unread: 2,
  },
  {
    id: 3,
    name: "Amit Kapoor",
    preview: "Need airport transfer today",
    time: "09:15",
    unread: 1,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    preview: "voucher FST-87237",
    time: "08:55",
    unread: 0,
  },
  {
    id: 5,
    name: "Vikram Singh",
    preview: "delhi to dubai 25 mar 2 adults",
    time: "08:42",
    unread: 3,
  },
  {
    id: 6,
    name: "Anita Joshi",
    preview: "cancel FST-87239",
    time: "08:30",
    unread: 0,
  },
  {
    id: 7,
    name: "Ravi Patel",
    preview: "wallet balance",
    time: "08:12",
    unread: 0,
  },
  {
    id: 8,
    name: "Deepak Kumar",
    preview: "pattaya tours 22 mar",
    time: "07:55",
    unread: 1,
  },
];

const mockThread = [
  {
    id: "m1",
    from: "agent",
    text: "Bangkok hotel 20 Mar 2 pax 3 nights",
    time: "09:20",
    read: true,
  },
  {
    id: "m2",
    from: "bot",
    text: "🏨 Available Hotels in Bangkok:\n\n1️⃣ Grand Palace Hotel ₹4,200/night ⭐4.5\n2️⃣ Siam City Hotel ₹4,500/night ⭐4.3\n3️⃣ Royal Bangkok ₹4,700/night ⭐4.8\n\nReply with number to book or type 'more' for more options",
    time: "09:20",
    read: true,
  },
  { id: "m3", from: "agent", text: "1", time: "09:21", read: true },
  {
    id: "m4",
    from: "bot",
    text: "✅ Booking Grand Palace Hotel\nCheck-in: 20 Mar | Check-out: 23 Mar | 2 Pax\n\nTotal: ₹12,600\n\nReply YES to confirm or NO to cancel",
    time: "09:21",
    read: true,
  },
  { id: "m5", from: "agent", text: "YES", time: "09:22", read: true },
  {
    id: "m6",
    from: "bot",
    text: "🎉 Booking Confirmed!\nBooking ID: FST-87234\n\nVoucher sent to your email.",
    time: "09:22",
    read: true,
  },
  { id: "m7", from: "agent", text: "Thank you!", time: "09:32", read: false },
];

const commands = [
  {
    cmd: "Hotel search",
    example: "bangkok hotel 3 nights 2 pax",
    action: "Returns top 3 hotels with price",
    icon: "🏨",
  },
  {
    cmd: "Flight search",
    example: "delhi to dubai 20 mar 2 adults",
    action: "Returns available flights with fares",
    icon: "✈️",
  },
  {
    cmd: "Tour search",
    example: "pattaya tours 22 mar",
    action: "Returns available tours with timing",
    icon: "🎡",
  },
  {
    cmd: "Transfer",
    example: "airport transfer bangkok 8am",
    action: "Returns available vehicles & prices",
    icon: "🚗",
  },
  {
    cmd: "My bookings",
    example: "my bookings",
    action: "Lists recent bookings with status",
    icon: "📋",
  },
  {
    cmd: "Voucher",
    example: "voucher FST-87234",
    action: "Sends voucher PDF to WhatsApp",
    icon: "📄",
  },
  {
    cmd: "Cancel booking",
    example: "cancel FST-87234",
    action: "Initiates cancellation flow",
    icon: "❌",
  },
  {
    cmd: "Wallet balance",
    example: "wallet balance",
    action: "Shows current wallet balance",
    icon: "💰",
  },
  {
    cmd: "Visa check",
    example: "visa dubai indian passport",
    action: "Shows visa requirements & fees",
    icon: "🛂",
  },
  {
    cmd: "Cruise search",
    example: "cruise dubai 3 nights",
    action: "Returns available cruises",
    icon: "🚢",
  },
];

const broadcasts = [
  {
    id: "bc1",
    msg: "New Maldives packages available! Book now and get 10% off.",
    target: "All Agents",
    sent: 842,
    delivered: 831,
    readRate: "74%",
    date: "15 Mar 2026",
  },
  {
    id: "bc2",
    msg: "Reminder: Eid holiday package booking deadline is 20 Mar.",
    target: "Active Agents",
    sent: 524,
    delivered: 519,
    readRate: "81%",
    date: "12 Mar 2026",
  },
  {
    id: "bc3",
    msg: "Flash sale: Bangkok packages from ₹35,000. Valid 24 hours.",
    target: "Top Agents",
    sent: 156,
    delivered: 154,
    readRate: "92%",
    date: "10 Mar 2026",
  },
];

const apiFields = [
  {
    id: "wa-phone",
    label: "Phone Number ID",
    value: "1234567890",
    type: "text",
  },
  {
    id: "wa-token",
    label: "Access Token",
    value: "EAAxxxxx...",
    type: "password",
  },
  {
    id: "wa-webhook",
    label: "Webhook URL",
    value: "https://api.fivestartravel.in/whatsapp",
    type: "text",
  },
  {
    id: "wa-verify",
    label: "Verify Token",
    value: "fst_verify_2026",
    type: "password",
  },
];

// ── Chat bubble ───────────────────────────────────────────────────────────────
function ChatBubble({ msg }: { msg: (typeof mockThread)[0] }) {
  const isBot = msg.from === "bot";
  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}>
      {isBot && (
        <div className="w-7 h-7 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
          <Bot className="w-3.5 h-3.5 text-[#25D366]" />
        </div>
      )}
      <div
        className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed ${isBot ? "bg-slate-700/80 text-slate-200 rounded-tl-none" : "bg-[#25D366]/20 text-slate-200 rounded-tr-none border border-[#25D366]/20"}`}
      >
        {msg.text}
        <div
          className={`flex items-center gap-1 mt-1 ${isBot ? "justify-start" : "justify-end"}`}
        >
          <span className="text-[9px] text-slate-500">{msg.time}</span>
          {!isBot &&
            (msg.read ? (
              <CheckCheck className="w-2.5 h-2.5 text-[#25D366]" />
            ) : (
              <Check className="w-2.5 h-2.5 text-slate-500" />
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function WhatsAppBot() {
  const [activeConv, setActiveConv] = useState(0);
  const [botMode, setBotMode] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [targetGroup, setTargetGroup] = useState("All Agents");

  const serviceToggles = [
    { label: "Hotels", key: "hotels" },
    { label: "Flights", key: "flights" },
    { label: "Tours", key: "tours" },
    { label: "Transfers", key: "transfers" },
    { label: "Visa", key: "visa" },
  ];
  const [serviceEnabled, setServiceEnabled] = useState<Record<string, boolean>>(
    {
      hotels: true,
      flights: true,
      tours: true,
      transfers: true,
      visa: false,
    },
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">WhatsApp Bot Hub</h2>
            <p className="text-sm text-slate-400">
              Automated booking assistant for travel agents
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-xs font-semibold text-[#25D366]">
            Connected
          </span>
        </div>
      </div>

      <Tabs defaultValue="conversations">
        <TabsList className="bg-slate-800/80 border border-slate-700/50 p-1">
          <TabsTrigger
            value="conversations"
            className="text-xs data-[state=active]:bg-[#25D366] data-[state=active]:text-white"
            data-ocid="whatsapp.conversations.tab"
          >
            Live Conversations
          </TabsTrigger>
          <TabsTrigger
            value="commands"
            className="text-xs data-[state=active]:bg-[#25D366] data-[state=active]:text-white"
            data-ocid="whatsapp.commands.tab"
          >
            Bot Commands
          </TabsTrigger>
          <TabsTrigger
            value="broadcast"
            className="text-xs data-[state=active]:bg-[#25D366] data-[state=active]:text-white"
            data-ocid="whatsapp.broadcast.tab"
          >
            Broadcast
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-xs data-[state=active]:bg-[#25D366] data-[state=active]:text-white"
            data-ocid="whatsapp.settings.tab"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Conversations ── */}
        <TabsContent value="conversations" className="mt-4">
          <div className="grid grid-cols-[280px_1fr] gap-4 h-[600px]">
            {/* Conversation list */}
            <Card className="bg-slate-800/60 border-slate-700/50 flex flex-col overflow-hidden">
              <div className="p-3 border-b border-slate-700/50">
                <Input
                  placeholder="Search conversations..."
                  className="bg-slate-900/60 border-slate-600 text-slate-200 text-xs h-8 placeholder:text-slate-500"
                  data-ocid="whatsapp.search_input"
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv, i) => (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setActiveConv(i)}
                    className={`w-full flex items-center gap-3 px-3 py-3 border-b border-slate-700/30 hover:bg-slate-700/30 transition-colors ${activeConv === i ? "bg-[#25D366]/10 border-l-2 border-l-[#25D366]" : ""}`}
                    data-ocid={`whatsapp.conversation.item.${i + 1}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0 text-sm font-bold text-slate-300">
                      {conv.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {conv.name}
                        </span>
                        <span className="text-[10px] text-slate-500 flex-shrink-0 ml-1">
                          {conv.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {conv.preview}
                      </p>
                    </div>
                    {conv.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#25D366] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Chat window */}
            <Card className="bg-slate-800/60 border-slate-700/50 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-slate-300">
                    {conversations[activeConv].name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {conversations[activeConv].name}
                    </p>
                    <p className="text-[10px] text-[#25D366]">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    {botMode ? "Bot Active" : "Manual Mode"}
                  </span>
                  <Switch
                    checked={botMode}
                    onCheckedChange={setBotMode}
                    className="data-[state=checked]:bg-[#25D366]"
                    data-ocid="whatsapp.bot_mode.switch"
                  />
                  <Bot
                    className={`w-4 h-4 ${botMode ? "text-[#25D366]" : "text-slate-500"}`}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-1 bg-slate-900/30">
                {mockThread.map((msg) => (
                  <ChatBubble key={msg.id} msg={msg} />
                ))}
              </div>
              <div className="p-3 border-t border-slate-700/50">
                <div className="flex gap-2">
                  <Input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-slate-900/60 border-slate-600 text-slate-200 text-xs placeholder:text-slate-500"
                    data-ocid="whatsapp.reply.input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") setReplyText("");
                    }}
                  />
                  <Button
                    size="sm"
                    className="bg-[#25D366] hover:bg-[#20c55b] text-white"
                    onClick={() => setReplyText("")}
                    data-ocid="whatsapp.reply.primary_button"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab 2: Commands ── */}
        <TabsContent value="commands" className="mt-4">
          <Card className="bg-slate-800/60 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#25D366]" />
                Bot Command Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    {["Command", "Example", "Bot Action", "Test"].map((h) => (
                      <th
                        key={h}
                        className="text-left text-slate-400 font-medium px-4 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {commands.map((cmd, i) => (
                    <tr
                      key={cmd.cmd}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20"
                      data-ocid={`whatsapp.command.item.${i + 1}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{cmd.icon}</span>
                          <span className="font-semibold text-slate-200">
                            {cmd.cmd}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="bg-slate-900/80 text-[#25D366] px-2 py-0.5 rounded text-[11px] font-mono">
                          {cmd.example}
                        </code>
                      </td>
                      <td className="px-4 py-3 text-slate-400 max-w-[200px]">
                        {cmd.action}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          className="text-[10px] font-semibold px-2 py-1 rounded bg-[#25D366]/15 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                          data-ocid={`whatsapp.test.button.${i + 1}`}
                        >
                          Test
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 3: Broadcast ── */}
        <TabsContent value="broadcast" className="mt-4 space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#25D366]" />
                  Send Broadcast
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 mb-1.5 block">
                    Target Group
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "All Agents",
                      "Active Agents",
                      "Specific City",
                      "Top Agents",
                    ].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setTargetGroup(g)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium border transition-colors ${targetGroup === g ? "bg-[#25D366]/20 text-[#25D366] border-[#25D366]/40" : "bg-slate-700 text-slate-400 border-slate-600"}`}
                        data-ocid="whatsapp.target.toggle"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1.5">
                    Recipients:{" "}
                    <span className="text-[#25D366] font-semibold">
                      842 agents
                    </span>
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="broadcast-msg"
                    className="text-xs text-slate-400 mb-1.5 block"
                  >
                    Message
                  </label>
                  <Textarea
                    id="broadcast-msg"
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    placeholder="Type your broadcast message..."
                    className="bg-slate-900/60 border-slate-600 text-slate-200 text-xs min-h-[120px] resize-none placeholder:text-slate-600"
                    data-ocid="whatsapp.broadcast.textarea"
                  />
                  <p className="text-[10px] text-slate-500 mt-1">
                    {broadcastMsg.length}/1000 characters
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 mb-1.5 block">
                    Schedule
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 text-xs py-1.5 rounded-lg bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 font-semibold"
                      data-ocid="whatsapp.send_now.primary_button"
                    >
                      Send Now
                    </button>
                    <button
                      type="button"
                      className="flex-1 text-xs py-1.5 rounded-lg bg-slate-700 text-slate-400 border border-slate-600 font-semibold"
                      data-ocid="whatsapp.schedule.secondary_button"
                    >
                      Schedule
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-white">
                  Broadcast History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      {[
                        "Message",
                        "Target",
                        "Sent",
                        "Delivered",
                        "Read",
                        "Date",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left text-slate-400 font-medium px-3 py-2.5"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {broadcasts.map((b, i) => (
                      <tr
                        key={b.id}
                        className="border-b border-slate-700/30"
                        data-ocid={`whatsapp.broadcast.item.${i + 1}`}
                      >
                        <td className="px-3 py-2.5 text-slate-300 max-w-[160px]">
                          <p className="truncate">{b.msg}</p>
                        </td>
                        <td className="px-3 py-2.5">
                          <Badge
                            variant="outline"
                            className="text-[9px] border-slate-600 text-slate-400"
                          >
                            {b.target}
                          </Badge>
                        </td>
                        <td className="px-3 py-2.5 text-slate-300 font-semibold">
                          {b.sent}
                        </td>
                        <td className="px-3 py-2.5 text-emerald-400 font-semibold">
                          {b.delivered}
                        </td>
                        <td className="px-3 py-2.5 text-[#25D366] font-semibold">
                          {b.readRate}
                        </td>
                        <td className="px-3 py-2.5 text-slate-500">{b.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Tab 4: Settings ── */}
        <TabsContent value="settings" className="mt-4 space-y-4">
          <div className="grid lg:grid-cols-2 gap-4">
            <Card className="bg-slate-800/60 border-slate-700/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[#25D366]" />
                    WhatsApp Business API
                  </CardTitle>
                  <div className="flex items-center gap-1.5 bg-[#25D366]/10 border border-[#25D366]/30 rounded px-2 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span className="text-[10px] font-semibold text-[#25D366]">
                      Connected
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {apiFields.map((field) => (
                  <div key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="text-[11px] text-slate-400 mb-1 block"
                    >
                      {field.label}
                    </label>
                    <Input
                      id={field.id}
                      type={field.type}
                      defaultValue={field.value}
                      className="bg-slate-900/60 border-slate-600 text-slate-300 text-xs h-8"
                      data-ocid="whatsapp.api.input"
                    />
                  </div>
                ))}
                <Button
                  size="sm"
                  className="w-full bg-[#25D366] hover:bg-[#20c55b] text-white text-xs"
                  data-ocid="whatsapp.api.save_button"
                >
                  <Shield className="w-3 h-3 mr-1.5" />
                  Save API Configuration
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#25D366]" />
                    Bot Services
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {serviceToggles.map((svc) => (
                    <div
                      key={svc.key}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-slate-300">
                        {svc.label}
                      </span>
                      <Switch
                        checked={serviceEnabled[svc.key]}
                        onCheckedChange={(val) =>
                          setServiceEnabled((prev) => ({
                            ...prev,
                            [svc.key]: val,
                          }))
                        }
                        className="data-[state=checked]:bg-[#25D366]"
                        data-ocid="whatsapp.service.switch"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#25D366]" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Auto-response enabled
                    </span>
                    <Switch
                      defaultChecked
                      className="data-[state=checked]:bg-[#25D366]"
                      data-ocid="whatsapp.auto_response.switch"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        htmlFor="wa-start"
                        className="text-[11px] text-slate-400 mb-1 block"
                      >
                        Start Time
                      </label>
                      <Input
                        id="wa-start"
                        type="time"
                        defaultValue="09:00"
                        className="bg-slate-900/60 border-slate-600 text-slate-300 text-xs h-8"
                        data-ocid="whatsapp.start_time.input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wa-end"
                        className="text-[11px] text-slate-400 mb-1 block"
                      >
                        End Time
                      </label>
                      <Input
                        id="wa-end"
                        type="time"
                        defaultValue="22:00"
                        className="bg-slate-900/60 border-slate-600 text-slate-300 text-xs h-8"
                        data-ocid="whatsapp.end_time.input"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">
                      Auto-reply when offline
                    </span>
                    <Switch
                      defaultChecked
                      className="data-[state=checked]:bg-[#25D366]"
                      data-ocid="whatsapp.offline_reply.switch"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="wa-offline-msg"
                      className="text-[11px] text-slate-400 mb-1 block"
                    >
                      Offline Message
                    </label>
                    <Textarea
                      id="wa-offline-msg"
                      defaultValue="Thank you for contacting FiveStar Travel. Our team will respond within 2 hours. For urgent bookings call +91-1725000004"
                      className="bg-slate-900/60 border-slate-600 text-slate-300 text-xs min-h-[80px] resize-none"
                      data-ocid="whatsapp.offline_msg.textarea"
                    />
                  </div>
                  <Button
                    size="sm"
                    className="w-full bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs border border-slate-600"
                    data-ocid="whatsapp.hours.save_button"
                  >
                    <Globe className="w-3 h-3 mr-1.5" />
                    Save Business Hours
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
