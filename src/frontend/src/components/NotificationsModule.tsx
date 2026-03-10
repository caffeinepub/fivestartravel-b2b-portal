import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, BellOff, CheckCheck, X } from "lucide-react";
import { useState } from "react";

type NotifType = "booking" | "payment" | "alert" | "promotion" | "cancelled";
type FilterTab = "all" | "bookings" | "payments" | "alerts" | "promotions";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const INITIAL_NOTIFS: Notification[] = [
  {
    id: 1,
    type: "booking",
    title: "Booking Confirmed",
    description:
      "Flight DEL → DXB · IndiGo 6E-201 · ₹24,500 — Ref: FST-FLT-2403",
    timestamp: "2 min ago",
    read: false,
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Received",
    description: "₹18,200 credited to your wallet from HDFC Bank transfer.",
    timestamp: "15 min ago",
    read: false,
  },
  {
    id: 3,
    type: "booking",
    title: "Hotel Booking Confirmed",
    description:
      "Atlantis The Palm, Dubai · 3 nights · ₹54,600 — Ref: FST-HTL-1892",
    timestamp: "1 hr ago",
    read: false,
  },
  {
    id: 4,
    type: "alert",
    title: "Price Alert",
    description:
      "Dubai flight prices dropped by 12% for March 15–22. Act fast!",
    timestamp: "2 hrs ago",
    read: false,
  },
  {
    id: 5,
    type: "promotion",
    title: "Exclusive Deal Unlocked",
    description:
      "Bangkok 5N package at ₹27,900 — available for next 24 hours only.",
    timestamp: "3 hrs ago",
    read: false,
  },
  {
    id: 6,
    type: "cancelled",
    title: "Booking Cancelled",
    description:
      "Hotel booking FST-HTL-1744 cancelled. Refund of ₹12,000 initiated.",
    timestamp: "5 hrs ago",
    read: false,
  },
  {
    id: 7,
    type: "payment",
    title: "Commission Credited",
    description: "₹2,450 commission for booking FST-FLT-2280 added to wallet.",
    timestamp: "6 hrs ago",
    read: true,
  },
  {
    id: 8,
    type: "booking",
    title: "Tour Booking Confirmed",
    description: "Desert Safari Dubai · 2 adults · ₹5,570 — Ref: FST-TOUR-0091",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 9,
    type: "alert",
    title: "System Maintenance",
    description: "Scheduled maintenance on 14 Mar 2026 from 2:00–4:00 AM IST.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 10,
    type: "promotion",
    title: "Refer & Earn Bonus",
    description:
      "Earn ₹1,000 for every agent you refer. Campaign active until 31 Mar.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 11,
    type: "booking",
    title: "Visa Application Submitted",
    description:
      "UAE eVisa for Priya Sharma · Ref: FST-VISA-0443 · Processing 3–5 days.",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: 12,
    type: "cancelled",
    title: "Transfer Cancelled",
    description: "Airport transfer booking FST-TRF-0312 cancelled by user.",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: 13,
    type: "alert",
    title: "API Rate Limit Warning",
    description:
      "You are approaching 80% of your monthly API quota. Upgrade plan?",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: 14,
    type: "promotion",
    title: "New Cruise Routes Added",
    description:
      "Mediterranean & Caribbean cruise packages now available on FiveStar.",
    timestamp: "4 days ago",
    read: true,
  },
  {
    id: 15,
    type: "payment",
    title: "Monthly Statement Ready",
    description:
      "Your February 2026 statement is ready. Total bookings: ₹3,42,500.",
    timestamp: "5 days ago",
    read: true,
  },
];

const TYPE_CONFIG: Record<
  NotifType,
  { emoji: string; color: string; bg: string; label: string }
> = {
  booking: {
    emoji: "✅",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.12)",
    label: "Booking",
  },
  payment: {
    emoji: "💰",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.12)",
    label: "Payment",
  },
  cancelled: {
    emoji: "❌",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.12)",
    label: "Cancelled",
  },
  alert: {
    emoji: "⚠️",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    label: "Alert",
  },
  promotion: {
    emoji: "🎁",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.12)",
    label: "Promo",
  },
};

const FILTER_MAP: Record<FilterTab, NotifType[] | null> = {
  all: null,
  bookings: ["booking"],
  payments: ["payment"],
  alerts: ["alert", "cancelled"],
  promotions: ["promotion"],
};

export function NotificationsModule() {
  const [notifs, setNotifs] = useState<Notification[]>(INITIAL_NOTIFS);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");

  const unreadCount = notifs.filter((n) => !n.read).length;

  const filtered = FILTER_MAP[activeFilter]
    ? notifs.filter((n) =>
        (FILTER_MAP[activeFilter] as NotifType[]).includes(n.type),
      )
    : notifs;

  function markRead(id: number) {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  }

  function markAllRead() {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function dismiss(id: number) {
    setNotifs((prev) => prev.filter((n) => n.id !== id));
  }

  const TABS: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All" },
    { key: "bookings", label: "Bookings" },
    { key: "payments", label: "Payments" },
    { key: "alerts", label: "Alerts" },
    { key: "promotions", label: "Promotions" },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Header */}
      <div
        className="rounded-2xl p-5"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#F97316,#FB923C)" }}
            >
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">Notifications</h2>
              <p className="text-slate-500 text-xs">
                {unreadCount > 0 ? (
                  <span data-ocid="notifications.error_state">
                    {unreadCount} unread notification
                    {unreadCount > 1 ? "s" : ""}
                  </span>
                ) : (
                  "All caught up!"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge
                className="bg-orange-500 text-white border-0 text-xs font-bold"
                data-ocid="notifications.toast"
              >
                {unreadCount}
              </Badge>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={markAllRead}
              className="text-slate-400 hover:text-white text-xs"
              data-ocid="notifications.button"
            >
              <CheckCheck className="w-4 h-4 mr-1.5" />
              Mark all read
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mt-4 flex-wrap">
          {TABS.map((tab) => {
            const count =
              tab.key === "all"
                ? notifs.filter((n) => !n.read).length
                : notifs.filter(
                    (n) =>
                      !n.read &&
                      (FILTER_MAP[tab.key] as NotifType[])?.includes(n.type),
                  ).length;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all border-0 cursor-pointer"
                style={{
                  background:
                    activeFilter === tab.key
                      ? "linear-gradient(135deg,#F97316,#FB923C)"
                      : "rgba(255,255,255,0.05)",
                  color: activeFilter === tab.key ? "#fff" : "#94A3B8",
                }}
                data-ocid="notifications.tab"
              >
                {tab.label}
                {count > 0 && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background:
                        activeFilter === tab.key
                          ? "rgba(255,255,255,0.25)"
                          : "rgba(249,115,22,0.25)",
                      color: activeFilter === tab.key ? "#fff" : "#F97316",
                    }}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notification list */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16"
            data-ocid="notifications.empty_state"
          >
            <BellOff className="w-10 h-10 text-slate-600 mb-3" />
            <p className="text-slate-500 font-medium">No notifications here</p>
            <p className="text-slate-600 text-sm mt-1">
              Try switching to a different filter
            </p>
          </div>
        ) : (
          <ScrollArea className="max-h-[600px]">
            <div
              className="divide-y"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              {filtered.map((notif, idx) => {
                const cfg = TYPE_CONFIG[notif.type];
                return (
                  <button
                    key={notif.id}
                    type="button"
                    className="flex items-start gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-white/[0.02] w-full text-left border-0 bg-transparent"
                    onClick={() => markRead(notif.id)}
                    style={{
                      background: notif.read
                        ? "transparent"
                        : "rgba(249,115,22,0.04)",
                    }}
                    data-ocid={`notifications.item.${idx + 1}`}
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                      style={{ background: cfg.bg }}
                    >
                      {cfg.emoji}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: notif.read ? "#94A3B8" : "#F1F5F9" }}
                        >
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: cfg.color }}
                          />
                        )}
                        <Badge
                          className="ml-auto text-xs border-0 flex-shrink-0"
                          style={{ background: cfg.bg, color: cfg.color }}
                        >
                          {cfg.label}
                        </Badge>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {notif.description}
                      </p>
                      <p className="text-slate-600 text-xs mt-1">
                        {notif.timestamp}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {!notif.read && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            markRead(notif.id);
                          }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-green-400 bg-transparent border-0 cursor-pointer transition-colors"
                          title="Mark read"
                          data-ocid={`notifications.toggle.${idx + 1}`}
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismiss(notif.id);
                        }}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 bg-transparent border-0 cursor-pointer transition-colors"
                        title="Dismiss"
                        data-ocid={`notifications.delete_button.${idx + 1}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
