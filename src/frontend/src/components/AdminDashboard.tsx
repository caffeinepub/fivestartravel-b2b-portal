import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  Bell,
  Building2,
  CheckCircle,
  CreditCard,
  FileText,
  Globe,
  Info,
  LogOut,
  Moon,
  Package,
  Plus,
  Search,
  Settings,
  Shield,
  Sliders,
  Sun,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";

type AdminPage =
  | "overview"
  | "agents"
  | "suppliers"
  | "bookings"
  | "inventory"
  | "markup"
  | "wallet"
  | "reports"
  | "users"
  | "automation"
  | "logs"
  | "notifications"
  | "tickets"
  | "settings";

const ADMIN_NAV: {
  icon: React.ElementType;
  label: string;
  key: AdminPage;
  section: string;
  badge?: string;
}[] = [
  { section: "Overview", icon: TrendingUp, label: "Overview", key: "overview" },
  { section: "Management", icon: Users, label: "Agents", key: "agents" },
  {
    section: "Management",
    icon: Building2,
    label: "Suppliers & DMCs",
    key: "suppliers",
  },
  {
    section: "Management",
    icon: FileText,
    label: "All Bookings",
    key: "bookings",
  },
  {
    section: "Management",
    icon: Package,
    label: "Inventory Control",
    key: "inventory",
  },
  { section: "Finance", icon: Sliders, label: "Markup Rules", key: "markup" },
  {
    section: "Finance",
    icon: Wallet,
    label: "Wallet & Payments",
    key: "wallet",
  },
  {
    section: "Finance",
    icon: BarChart2,
    label: "Reports & Analytics",
    key: "reports",
  },
  { section: "System", icon: Shield, label: "Users & Roles", key: "users" },
  {
    section: "System",
    icon: Zap,
    label: "Automation Rules",
    key: "automation",
  },
  { section: "System", icon: Activity, label: "System Logs", key: "logs" },
  {
    section: "Communication",
    icon: Bell,
    label: "Notifications",
    key: "notifications",
  },
  {
    section: "Communication",
    icon: Ticket,
    label: "Support Tickets",
    key: "tickets",
    badge: "5",
  },
  {
    section: "Configuration",
    icon: Settings,
    label: "Settings",
    key: "settings",
  },
];

const AGENTS_DATA = [
  {
    name: "Rahul Sharma",
    email: "rahul@travelplus.com",
    company: "TravelPlus",
    bookings: 142,
    wallet: "₹45,200",
    status: "Active",
  },
  {
    name: "Priya Patel",
    email: "priya@gotravel.in",
    company: "GoTravel",
    bookings: 98,
    wallet: "₹28,900",
    status: "Active",
  },
  {
    name: "Amit Kumar",
    email: "amit@dreamvoyage.com",
    company: "DreamVoyage",
    bookings: 67,
    wallet: "₹12,400",
    status: "Pending",
  },
  {
    name: "Sunita Verma",
    email: "sunita@luxetrip.in",
    company: "LuxeTrip",
    bookings: 201,
    wallet: "₹89,000",
    status: "Active",
  },
  {
    name: "Rajesh Singh",
    email: "rajesh@quickflight.com",
    company: "QuickFlight",
    bookings: 0,
    wallet: "₹0",
    status: "Blocked",
  },
];

const SUPPLIERS_DATA = [
  {
    name: "Dubai Oasis DMC",
    type: "DMC",
    country: "UAE",
    products: 45,
    bookings: 312,
    status: "Active",
    priority: "High",
  },
  {
    name: "Hotelbeds India",
    type: "Supplier",
    country: "India",
    products: 1200,
    bookings: 890,
    status: "Active",
    priority: "High",
  },
  {
    name: "Rayna Tours",
    type: "Supplier",
    country: "UAE",
    products: 280,
    bookings: 450,
    status: "Active",
    priority: "Medium",
  },
  {
    name: "Bali Bliss DMC",
    type: "DMC",
    country: "Indonesia",
    products: 78,
    bookings: 123,
    status: "Pending",
    priority: "Low",
  },
  {
    name: "EuroRail Connect",
    type: "Supplier",
    country: "Europe",
    products: 15,
    bookings: 34,
    status: "Active",
    priority: "Medium",
  },
];

const BOOKINGS_DATA = [
  {
    ref: "FST-2024-001",
    agent: "Rahul Sharma",
    service: "Flight",
    destination: "Dubai",
    amount: "₹42,500",
    date: "2024-03-15",
    status: "Confirmed",
  },
  {
    ref: "FST-2024-002",
    agent: "Priya Patel",
    service: "Hotel",
    destination: "Bangkok",
    amount: "₹18,200",
    date: "2024-03-14",
    status: "Pending",
  },
  {
    ref: "FST-2024-003",
    agent: "Sunita Verma",
    service: "Tour",
    destination: "Bali",
    amount: "₹95,000",
    date: "2024-03-13",
    status: "Confirmed",
  },
  {
    ref: "FST-2024-004",
    agent: "Amit Kumar",
    service: "Transfer",
    destination: "Maldives",
    amount: "₹8,500",
    date: "2024-03-12",
    status: "Processing",
  },
  {
    ref: "FST-2024-005",
    agent: "Rahul Sharma",
    service: "Visa",
    destination: "USA",
    amount: "₹12,000",
    date: "2024-03-11",
    status: "Cancelled",
  },
];

const LOGS_DATA = [
  {
    time: "2024-03-15 14:32",
    user: "admin@fivestartravel.in",
    action: "Approved agent: Rahul Sharma",
    severity: "Info",
  },
  {
    time: "2024-03-15 13:20",
    user: "system",
    action: "Auto-confirmed booking FST-2024-001",
    severity: "Info",
  },
  {
    time: "2024-03-15 12:05",
    user: "rahul@travelplus.com",
    action: "Failed login attempt (3 times)",
    severity: "Warning",
  },
  {
    time: "2024-03-15 11:45",
    user: "admin@fivestartravel.in",
    action: "Markup rule updated: Hotels +2%",
    severity: "Info",
  },
  {
    time: "2024-03-15 10:30",
    user: "system",
    action: "Payment gateway error: timeout",
    severity: "Error",
  },
];

const TICKETS_DATA = [
  {
    id: "TKT-001",
    from: "Rahul Sharma",
    subject: "Booking not confirmed after payment",
    priority: "High",
    status: "Open",
    date: "2024-03-15",
  },
  {
    id: "TKT-002",
    from: "Dubai Oasis DMC",
    subject: "Inventory upload failing",
    priority: "Medium",
    status: "In Progress",
    date: "2024-03-14",
  },
  {
    id: "TKT-003",
    from: "Priya Patel",
    subject: "Wallet balance discrepancy",
    priority: "High",
    status: "Open",
    date: "2024-03-13",
  },
  {
    id: "TKT-004",
    from: "Amit Kumar",
    subject: "Cannot access GDS terminal",
    priority: "Low",
    status: "Resolved",
    date: "2024-03-12",
  },
  {
    id: "TKT-005",
    from: "Sunita Verma",
    subject: "Visa module not loading",
    priority: "Medium",
    status: "Open",
    date: "2024-03-11",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#16A34A", color: "#fff" },
    Confirmed: { bg: "#16A34A", color: "#fff" },
    Resolved: { bg: "#16A34A", color: "#fff" },
    Pending: { bg: "#F59E0B", color: "#fff" },
    "In Progress": { bg: "#2563EB", color: "#fff" },
    Processing: { bg: "#2563EB", color: "#fff" },
    Blocked: { bg: "#DC2626", color: "#fff" },
    Cancelled: { bg: "#DC2626", color: "#fff" },
    Open: { bg: "#F97316", color: "#fff" },
    Info: { bg: "#2563EB", color: "#fff" },
    Warning: { bg: "#F59E0B", color: "#fff" },
    Error: { bg: "#DC2626", color: "#fff" },
    High: { bg: "#DC2626", color: "#fff" },
    Medium: { bg: "#F59E0B", color: "#fff" },
    Low: { bg: "#6B7280", color: "#fff" },
  };
  const s = map[status] || { bg: "#6B7280", color: "#fff" };
  return (
    <span
      className="px-2 py-0.5 rounded text-xs font-semibold"
      style={{ background: s.bg, color: s.color }}
    >
      {status}
    </span>
  );
}

export function AdminDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const [activePage, setActivePage] = useState<AdminPage>("overview");
  const { theme, toggleTheme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;

  // Automation toggles
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [autoReminders, setAutoReminders] = useState(true);
  const [autoInvoice, setAutoInvoice] = useState(true);
  const [autoWhatsApp, setAutoWhatsApp] = useState(false);
  const [autoMarkup, setAutoMarkup] = useState(true);

  // Markup rules
  const [markupRules, setMarkupRules] = useState([
    {
      id: 1,
      type: "Global",
      service: "All Services",
      markup: "5%",
      agent: "-",
      destination: "-",
    },
    {
      id: 2,
      type: "Per-Agent",
      service: "Flights",
      markup: "3%",
      agent: "Rahul Sharma",
      destination: "-",
    },
    {
      id: 3,
      type: "Per-Destination",
      service: "Hotels",
      markup: "7%",
      agent: "-",
      destination: "Dubai",
    },
    {
      id: 4,
      type: "Seasonal",
      service: "Tours",
      markup: "10%",
      agent: "-",
      destination: "Bali",
    },
  ]);

  // Announcement
  const [announcement, setAnnouncement] = useState("");
  const [announcementSent, setAnnouncementSent] = useState(false);

  // Settings state
  const [gstRate, setGstRate] = useState("18");
  const [defaultCurrency, setDefaultCurrency] = useState("INR");

  const sections: string[] = [];
  const sectionMap: Record<string, typeof ADMIN_NAV> = {};
  for (const item of ADMIN_NAV) {
    if (!sections.includes(item.section)) {
      sections.push(item.section);
      sectionMap[item.section] = [];
    }
    sectionMap[item.section].push(item);
  }

  const renderContent = () => {
    switch (activePage) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Total Bookings",
                  value: "3,842",
                  change: "+12%",
                  color: "#2563EB",
                  icon: FileText,
                },
                {
                  label: "Total Revenue",
                  value: "₹2.4Cr",
                  change: "+18%",
                  color: "#16A34A",
                  icon: TrendingUp,
                },
                {
                  label: "Active Agents",
                  value: "248",
                  change: "+5",
                  color: "#F97316",
                  icon: Users,
                },
                {
                  label: "Active Suppliers",
                  value: "67",
                  change: "+3",
                  color: "#7C3AED",
                  icon: Building2,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl p-5 border"
                  style={{
                    background: t.cardBg,
                    borderColor: t.border,
                    boxShadow: t.shadow,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${card.color}18` }}
                    >
                      <card.icon
                        className="w-5 h-5"
                        style={{ color: card.color }}
                      />
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: t.success }}
                    >
                      {card.change}
                    </span>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: t.text }}>
                    {card.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: t.muted }}>
                    {card.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                className="rounded-xl p-5 border"
                style={{
                  background: t.cardBg,
                  borderColor: t.border,
                  boxShadow: t.shadow,
                }}
              >
                <h3 className="font-semibold mb-4" style={{ color: t.text }}>
                  Top Performing Agents
                </h3>
                <div className="space-y-3">
                  {AGENTS_DATA.filter((a) => a.status === "Active")
                    .slice(0, 3)
                    .map((agent, i) => (
                      <div key={agent.name} className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{ background: "#EFF6FF", color: "#2563EB" }}
                        >
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p
                            className="text-sm font-medium"
                            style={{ color: t.text }}
                          >
                            {agent.name}
                          </p>
                          <p className="text-xs" style={{ color: t.muted }}>
                            {agent.company}
                          </p>
                        </div>
                        <span
                          className="text-sm font-semibold"
                          style={{ color: t.primary }}
                        >
                          {agent.bookings} bookings
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div
                className="rounded-xl p-5 border"
                style={{
                  background: t.cardBg,
                  borderColor: t.border,
                  boxShadow: t.shadow,
                }}
              >
                <h3 className="font-semibold mb-4" style={{ color: t.text }}>
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {LOGS_DATA.slice(0, 4).map((log) => (
                    <div key={log.time} className="flex items-start gap-2">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                        style={{
                          background:
                            log.severity === "Error"
                              ? t.error
                              : log.severity === "Warning"
                                ? t.warning
                                : t.primary,
                        }}
                      />
                      <div>
                        <p className="text-xs" style={{ color: t.text }}>
                          {log.action}
                        </p>
                        <p className="text-[10px]" style={{ color: t.muted }}>
                          {log.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "agents":
        return (
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: t.cardBg,
              borderColor: t.border,
              boxShadow: t.shadow,
            }}
          >
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: t.border }}
            >
              <h3 className="font-semibold" style={{ color: t.text }}>
                All Agents ({AGENTS_DATA.length})
              </h3>
              <div className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{
                    background: t.inputBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <Search className="w-3.5 h-3.5" style={{ color: t.muted }} />
                  <input
                    placeholder="Search agents..."
                    className="bg-transparent text-sm outline-none w-40"
                    style={{ color: t.text }}
                  />
                </div>
                <Button
                  size="sm"
                  style={{ background: t.primary, color: "#fff" }}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Agent
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Agent Name</TableHead>
                  <TableHead style={{ color: t.muted }}>Company</TableHead>
                  <TableHead style={{ color: t.muted }}>Bookings</TableHead>
                  <TableHead style={{ color: t.muted }}>
                    Wallet Balance
                  </TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
                  <TableHead style={{ color: t.muted }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGENTS_DATA.map((agent) => (
                  <TableRow
                    key={agent.email}
                    className="transition-colors"
                    style={{ borderColor: t.border }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                  >
                    <TableCell>
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: t.text }}
                        >
                          {agent.name}
                        </p>
                        <p className="text-xs" style={{ color: t.muted }}>
                          {agent.email}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {agent.company}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {agent.bookings}
                    </TableCell>
                    <TableCell
                      className="text-sm font-medium"
                      style={{ color: t.success }}
                    >
                      {agent.wallet}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={agent.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          View
                        </Button>
                        {agent.status === "Active" ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ color: t.error, borderColor: t.error }}
                          >
                            Block
                          </Button>
                        ) : agent.status === "Pending" ? (
                          <Button
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ background: t.success, color: "#fff" }}
                          >
                            Approve
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ color: t.success, borderColor: t.success }}
                          >
                            Unblock
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "suppliers":
        return (
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: t.cardBg,
              borderColor: t.border,
              boxShadow: t.shadow,
            }}
          >
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: t.border }}
            >
              <h3 className="font-semibold" style={{ color: t.text }}>
                Suppliers & DMCs
              </h3>
              <Button
                size="sm"
                style={{ background: t.primary, color: "#fff" }}
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Supplier
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Name</TableHead>
                  <TableHead style={{ color: t.muted }}>Type</TableHead>
                  <TableHead style={{ color: t.muted }}>Country</TableHead>
                  <TableHead style={{ color: t.muted }}>Products</TableHead>
                  <TableHead style={{ color: t.muted }}>Bookings</TableHead>
                  <TableHead style={{ color: t.muted }}>Priority</TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
                  <TableHead style={{ color: t.muted }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {SUPPLIERS_DATA.map((s) => (
                  <TableRow
                    key={s.name}
                    style={{ borderColor: t.border }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                  >
                    <TableCell
                      className="font-medium text-sm"
                      style={{ color: t.text }}
                    >
                      {s.name}
                    </TableCell>
                    <TableCell>
                      <span
                        className="px-2 py-0.5 rounded text-xs"
                        style={{
                          background:
                            s.type === "DMC" ? "#7C3AED18" : "#2563EB18",
                          color: s.type === "DMC" ? "#7C3AED" : t.primary,
                        }}
                      >
                        {s.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {s.country}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {s.products}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {s.bookings}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={s.priority} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={s.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          style={{ color: t.error, borderColor: t.error }}
                        >
                          Block
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "bookings":
        return (
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: t.cardBg,
              borderColor: t.border,
              boxShadow: t.shadow,
            }}
          >
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: t.border }}
            >
              <h3 className="font-semibold" style={{ color: t.text }}>
                All Bookings
              </h3>
              <div className="flex gap-2">
                {["All", "Confirmed", "Pending", "Processing", "Cancelled"].map(
                  (f) => (
                    <button
                      type="button"
                      key={f}
                      className="px-3 py-1 rounded text-xs font-medium"
                      style={{
                        background: f === "All" ? t.primary : t.inputBg,
                        color: f === "All" ? "#fff" : t.muted,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      {f}
                    </button>
                  ),
                )}
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Booking Ref</TableHead>
                  <TableHead style={{ color: t.muted }}>Agent</TableHead>
                  <TableHead style={{ color: t.muted }}>Service</TableHead>
                  <TableHead style={{ color: t.muted }}>Destination</TableHead>
                  <TableHead style={{ color: t.muted }}>Amount</TableHead>
                  <TableHead style={{ color: t.muted }}>Date</TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
                  <TableHead style={{ color: t.muted }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {BOOKINGS_DATA.map((b) => (
                  <TableRow
                    key={b.ref}
                    style={{ borderColor: t.border }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                  >
                    <TableCell
                      className="font-mono text-xs font-semibold"
                      style={{ color: t.primary }}
                    >
                      {b.ref}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.agent}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.service}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.destination}
                    </TableCell>
                    <TableCell
                      className="text-sm font-semibold"
                      style={{ color: t.text }}
                    >
                      {b.amount}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.muted }}>
                      {b.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-2"
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "inventory":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Pending Approvals", value: 12, color: t.warning },
                { label: "Approved Today", value: 34, color: t.success },
                { label: "Rejected", value: 3, color: t.error },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl p-5 border"
                  style={{
                    background: t.cardBg,
                    borderColor: t.border,
                    boxShadow: t.shadow,
                  }}
                >
                  <p className="text-3xl font-bold" style={{ color: c.color }}>
                    {c.value}
                  </p>
                  <p className="text-sm mt-1" style={{ color: t.muted }}>
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl border"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: t.border }}>
                <h3 className="font-semibold" style={{ color: t.text }}>
                  Pending Inventory Submissions
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Supplier</TableHead>
                    <TableHead style={{ color: t.muted }}>Type</TableHead>
                    <TableHead style={{ color: t.muted }}>Item Name</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Destination
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Submitted</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      supplier: "Dubai Oasis DMC",
                      type: "Tour",
                      name: "Desert Safari Deluxe",
                      dest: "Dubai",
                      date: "2024-03-15",
                    },
                    {
                      supplier: "Bali Bliss DMC",
                      type: "Hotel",
                      name: "Ubud Jungle Resort",
                      dest: "Bali",
                      date: "2024-03-14",
                    },
                    {
                      supplier: "Rayna Tours",
                      type: "Activity",
                      name: "Burj Khalifa At the Top",
                      dest: "Dubai",
                      date: "2024-03-13",
                    },
                  ].map((item) => (
                    <TableRow key={item.name} style={{ borderColor: t.border }}>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {item.supplier}
                      </TableCell>
                      <TableCell>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: t.inputBg, color: t.muted }}
                        >
                          {item.type}
                        </span>
                      </TableCell>
                      <TableCell
                        className="text-sm font-medium"
                        style={{ color: t.text }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {item.dest}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {item.date}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ background: t.success, color: "#fff" }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ color: t.error, borderColor: t.error }}
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "markup":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl border"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <div
                className="p-4 border-b flex items-center justify-between"
                style={{ borderColor: t.border }}
              >
                <h3 className="font-semibold" style={{ color: t.text }}>
                  Markup Rules
                </h3>
                <Button
                  size="sm"
                  style={{ background: t.primary, color: "#fff" }}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Rule
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Rule Type</TableHead>
                    <TableHead style={{ color: t.muted }}>Service</TableHead>
                    <TableHead style={{ color: t.muted }}>Markup %</TableHead>
                    <TableHead style={{ color: t.muted }}>Agent</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Destination
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {markupRules.map((rule) => (
                    <TableRow key={rule.id} style={{ borderColor: t.border }}>
                      <TableCell>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-semibold"
                          style={{ background: "#EFF6FF", color: t.primary }}
                        >
                          {rule.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {rule.service}
                      </TableCell>
                      <TableCell
                        className="text-sm font-bold"
                        style={{ color: t.success }}
                      >
                        {rule.markup}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {rule.agent}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {rule.destination}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ color: t.error, borderColor: t.error }}
                            onClick={() =>
                              setMarkupRules((prev) =>
                                prev.filter((r) => r.id !== rule.id),
                              )
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Flights", value: "3%" },
                { label: "Hotels", value: "5%" },
                { label: "Tours", value: "7%" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl p-4 border"
                  style={{ background: t.cardBg, borderColor: t.border }}
                >
                  <p className="text-sm" style={{ color: t.muted }}>
                    {c.label} Default Markup
                  </p>
                  <p
                    className="text-2xl font-bold mt-1"
                    style={{ color: t.primary }}
                  >
                    {c.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case "wallet":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Agent Wallets",
                  value: "₹4.2L",
                  color: t.success,
                },
                {
                  label: "Total Credit Issued",
                  value: "₹12.5L",
                  color: t.primary,
                },
                { label: "Overdue Payments", value: "₹45,000", color: t.error },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl p-5 border"
                  style={{
                    background: t.cardBg,
                    borderColor: t.border,
                    boxShadow: t.shadow,
                  }}
                >
                  <p className="text-2xl font-bold" style={{ color: c.color }}>
                    {c.value}
                  </p>
                  <p className="text-sm mt-1" style={{ color: t.muted }}>
                    {c.label}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl border"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <div
                className="p-4 border-b flex items-center justify-between"
                style={{ borderColor: t.border }}
              >
                <h3 className="font-semibold" style={{ color: t.text }}>
                  Agent Wallets
                </h3>
                <Button
                  size="sm"
                  style={{ background: t.primary, color: "#fff" }}
                >
                  Add Funds
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Agent</TableHead>
                    <TableHead style={{ color: t.muted }}>Balance</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Credit Limit
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Last Transaction
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {AGENTS_DATA.map((agent) => (
                    <TableRow
                      key={agent.email}
                      style={{ borderColor: t.border }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = t.sidebarHoverBg;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "";
                      }}
                    >
                      <TableCell
                        className="text-sm font-medium"
                        style={{ color: t.text }}
                      >
                        {agent.name}
                      </TableCell>
                      <TableCell
                        className="text-sm font-semibold"
                        style={{ color: t.success }}
                      >
                        {agent.wallet}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        ₹1,00,000
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        2024-03-15
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={agent.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Add
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            History
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {[
                {
                  label: "This Month Revenue",
                  value: "₹28.4L",
                  change: "+22%",
                },
                { label: "Bookings This Month", value: "342", change: "+15%" },
                { label: "Avg Booking Value", value: "₹8,304", change: "+4%" },
                { label: "Cancellation Rate", value: "3.2%", change: "-0.8%" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="rounded-xl p-4 border"
                  style={{
                    background: t.cardBg,
                    borderColor: t.border,
                    boxShadow: t.shadow,
                  }}
                >
                  <p className="text-xl font-bold" style={{ color: t.text }}>
                    {c.value}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: t.muted }}>
                    {c.label}
                  </p>
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{
                      color: c.change.startsWith("-") ? t.success : t.success,
                    }}
                  >
                    {c.change}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl p-5 border"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: t.text }}>
                Monthly Revenue Trend
              </h3>
              <div className="flex items-end gap-2 h-32">
                {[40, 55, 48, 70, 65, 85, 92, 78, 88, 95, 82, 100].map((h) => (
                  <div
                    key={h}
                    className="flex-1 rounded-t transition-all"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${t.primary}, ${t.primary}88)`,
                      minWidth: 0,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {[
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                  "Jan",
                  "Feb",
                  "Mar",
                ].map((m) => (
                  <span
                    key={m}
                    className="text-[9px]"
                    style={{ color: t.muted }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl border"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <div
                className="p-4 border-b flex items-center justify-between"
                style={{ borderColor: t.border }}
              >
                <h3 className="font-semibold" style={{ color: t.text }}>
                  System Users & Roles
                </h3>
                <Button
                  size="sm"
                  style={{ background: t.primary, color: "#fff" }}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Create Sub-Admin
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>User</TableHead>
                    <TableHead style={{ color: t.muted }}>Role</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Permissions
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Last Login</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Super Admin",
                      email: "admin@fivestartravel.in",
                      role: "Super Admin",
                      permissions: "All",
                      last: "Just now",
                    },
                    {
                      name: "Ops Manager",
                      email: "ops@fivestartravel.in",
                      role: "Sub Admin",
                      permissions: "Bookings, Reports",
                      last: "1 hour ago",
                    },
                    {
                      name: "Finance Team",
                      email: "finance@fivestartravel.in",
                      role: "Finance Admin",
                      permissions: "Wallet, Reports",
                      last: "3 hours ago",
                    },
                  ].map((u) => (
                    <TableRow key={u.email} style={{ borderColor: t.border }}>
                      <TableCell>
                        <p
                          className="text-sm font-medium"
                          style={{ color: t.text }}
                        >
                          {u.name}
                        </p>
                        <p className="text-xs" style={{ color: t.muted }}>
                          {u.email}
                        </p>
                      </TableCell>
                      <TableCell>
                        <span
                          className="px-2 py-0.5 rounded text-xs font-semibold"
                          style={{ background: "#EFF6FF", color: t.primary }}
                        >
                          {u.role}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {u.permissions}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {u.last}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Permissions
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "automation":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl border"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <div className="p-4 border-b" style={{ borderColor: t.border }}>
                <h3 className="font-semibold" style={{ color: t.text }}>
                  Automation Rules
                </h3>
                <p className="text-xs mt-1" style={{ color: t.muted }}>
                  Control automated system behaviors
                </p>
              </div>
              <div className="divide-y" style={{ borderColor: t.border }}>
                {[
                  {
                    label: "Auto-Confirm Bookings",
                    desc: "Automatically confirm bookings when payment is received",
                    value: autoConfirm,
                    set: setAutoConfirm,
                  },
                  {
                    label: "Auto-Send Reminders",
                    desc: "Send automated reminders 1 day before service",
                    value: autoReminders,
                    set: setAutoReminders,
                  },
                  {
                    label: "Auto-Generate Invoice",
                    desc: "Generate GST invoice automatically on booking confirmation",
                    value: autoInvoice,
                    set: setAutoInvoice,
                  },
                  {
                    label: "WhatsApp Notifications",
                    desc: "Send booking updates via WhatsApp Business API",
                    value: autoWhatsApp,
                    set: setAutoWhatsApp,
                  },
                  {
                    label: "Auto Markup Application",
                    desc: "Apply markup rules automatically to all bookings",
                    value: autoMarkup,
                    set: setAutoMarkup,
                  },
                ].map((rule) => (
                  <div
                    key={rule.label}
                    className="flex items-center justify-between p-4"
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: t.text }}
                      >
                        {rule.label}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: t.muted }}>
                        {rule.desc}
                      </p>
                    </div>
                    <Switch checked={rule.value} onCheckedChange={rule.set} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "logs":
        return (
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: t.cardBg,
              borderColor: t.border,
              boxShadow: t.shadow,
            }}
          >
            <div
              className="p-4 border-b flex items-center justify-between"
              style={{ borderColor: t.border }}
            >
              <h3 className="font-semibold" style={{ color: t.text }}>
                System Activity Logs
              </h3>
              <div className="flex gap-2">
                {["All", "Info", "Warning", "Error"].map((f) => (
                  <button
                    type="button"
                    key={f}
                    className="px-3 py-1 rounded text-xs"
                    style={{
                      background: f === "All" ? t.primary : t.inputBg,
                      color: f === "All" ? "#fff" : t.muted,
                      border: `1px solid ${t.border}`,
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Timestamp</TableHead>
                  <TableHead style={{ color: t.muted }}>User</TableHead>
                  <TableHead style={{ color: t.muted }}>Action</TableHead>
                  <TableHead style={{ color: t.muted }}>Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {LOGS_DATA.map((log) => (
                  <TableRow
                    key={`${log.time}-${log.user}`}
                    style={{ borderColor: t.border }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                  >
                    <TableCell
                      className="font-mono text-xs"
                      style={{ color: t.muted }}
                    >
                      {log.time}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.text }}>
                      {log.user}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {log.action}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={log.severity} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl border p-5"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: t.text }}>
                Broadcast Announcement
              </h3>
              <div className="space-y-3">
                <div>
                  <Label style={{ color: t.text }}>Target Audience</Label>
                  <div className="flex gap-2 mt-1">
                    {["All Users", "Agents Only", "Suppliers Only"].map(
                      (opt) => (
                        <button
                          type="button"
                          key={opt}
                          className="px-3 py-1.5 rounded text-sm"
                          style={{
                            background:
                              opt === "All Users" ? t.primary : t.inputBg,
                            color: opt === "All Users" ? "#fff" : t.text,
                            border: `1px solid ${t.border}`,
                          }}
                        >
                          {opt}
                        </button>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Announcement Message</Label>
                  <Textarea
                    className="mt-1"
                    placeholder="Write your announcement here..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    rows={4}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                {announcementSent && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded"
                    style={{ background: "#DCFCE7" }}
                  >
                    <CheckCircle
                      className="w-4 h-4"
                      style={{ color: t.success }}
                    />
                    <span className="text-sm" style={{ color: t.success }}>
                      Announcement sent successfully!
                    </span>
                  </div>
                )}
                <Button
                  style={{ background: t.primary, color: "#fff" }}
                  onClick={() => {
                    setAnnouncementSent(true);
                    setTimeout(() => setAnnouncementSent(false), 3000);
                  }}
                >
                  Send Announcement
                </Button>
              </div>
            </div>
          </div>
        );

      case "tickets":
        return (
          <div
            className="rounded-xl border overflow-hidden"
            style={{
              background: t.cardBg,
              borderColor: t.border,
              boxShadow: t.shadow,
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: t.border }}>
              <h3 className="font-semibold" style={{ color: t.text }}>
                Support Tickets
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Ticket ID</TableHead>
                  <TableHead style={{ color: t.muted }}>From</TableHead>
                  <TableHead style={{ color: t.muted }}>Subject</TableHead>
                  <TableHead style={{ color: t.muted }}>Priority</TableHead>
                  <TableHead style={{ color: t.muted }}>Date</TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
                  <TableHead style={{ color: t.muted }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {TICKETS_DATA.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    style={{ borderColor: t.border }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "";
                    }}
                  >
                    <TableCell
                      className="font-mono text-xs font-semibold"
                      style={{ color: t.primary }}
                    >
                      {ticket.id}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {ticket.from}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {ticket.subject}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.priority} />
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.muted }}>
                      {ticket.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={ticket.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs h-7 px-2"
                          style={{ background: t.success, color: "#fff" }}
                        >
                          Resolve
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl border p-5"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: t.text }}>
                Platform Settings
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: t.text }}>GST Rate (%)</Label>
                  <Input
                    className="mt-1"
                    value={gstRate}
                    onChange={(e) => setGstRate(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Default Currency</Label>
                  <Input
                    className="mt-1"
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Platform Name</Label>
                  <Input
                    className="mt-1"
                    defaultValue="FiveStar Travel"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Support Email</Label>
                  <Input
                    className="mt-1"
                    defaultValue="customerservice@fivestartravel.in"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label style={{ color: t.text }}>API Key (Internal)</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    defaultValue="7114315c476d94-4ef2-4e21-83e8-527d56a0c529"
                    type="password"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                  <Button variant="outline">Show</Button>
                </div>
              </div>
              <Button
                className="mt-4"
                style={{ background: t.primary, color: "#fff" }}
              >
                Save Settings
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const pageTitle: Record<AdminPage, string> = {
    overview: "Admin Overview",
    agents: "Agents Management",
    suppliers: "Suppliers & DMCs",
    bookings: "All Bookings",
    inventory: "Inventory Control",
    markup: "Markup Rules",
    wallet: "Wallet & Payments",
    reports: "Reports & Analytics",
    users: "Users & Roles",
    automation: "Automation Rules",
    logs: "System Logs",
    notifications: "Notifications",
    tickets: "Support Tickets",
    settings: "Settings",
  };

  return (
    <div className="min-h-screen flex" style={{ background: t.pageBg }}>
      {/* Sidebar */}
      <aside
        className="w-64 flex-shrink-0 hidden md:flex flex-col border-r"
        style={{ background: t.sidebarBg, borderColor: t.border }}
      >
        <div className="px-4 py-4 border-b" style={{ borderColor: t.border }}>
          <div className="rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg px-2 py-1.5 inline-flex items-center shadow-sm">
              <img
                src="/assets/uploads/image-3-1.png"
                alt="FiveStar Travel"
                className="h-8 w-auto object-contain"
              />
            </div>
          </div>
          <div className="mt-2 px-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{
                background: "linear-gradient(135deg, #F97316, #DC2626)",
                color: "#fff",
              }}
            >
              ADMIN PANEL
            </span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {sections.map((section) => (
            <div key={section} className="mb-1">
              <div className="px-3 pt-3 pb-1.5">
                <span
                  className="text-[9px] font-bold tracking-widest uppercase"
                  style={{ color: t.sectionLabel }}
                >
                  {section}
                </span>
              </div>
              {sectionMap[section].map((item, idx) => {
                const isActive = activePage === item.key;
                return (
                  <button
                    type="button"
                    key={item.key}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 relative"
                    style={{
                      background: isActive ? t.sidebarActiveBg : "transparent",
                      borderLeft: isActive
                        ? t.sidebarActiveBorder
                        : "3px solid transparent",
                      color: isActive ? t.sidebarActiveColor : t.sidebarText,
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          t.sidebarHoverBg;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                      }
                    }}
                    onClick={() => setActivePage(item.key)}
                    data-ocid={`admin.nav.item.${idx + 1}`}
                  >
                    <item.icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isActive ? t.primary : t.muted }}
                    />
                    <span className="flex-1 truncate text-left">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: "rgba(220,38,38,0.15)",
                          color: t.error,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div
          className="px-3 pb-4 border-t pt-3"
          style={{ borderColor: t.border }}
        >
          <div className="flex items-center gap-3 px-3 py-2 mb-1">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
              style={{ background: "rgba(249,115,22,0.15)", color: "#F97316" }}
            >
              SA
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold truncate"
                style={{ color: t.text }}
              >
                Super Admin
              </p>
              <p className="text-[10px]" style={{ color: t.muted }}>
                Administrator
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
            style={{ color: t.error }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(220,38,38,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            onClick={() => onNavigate("logout")}
            data-ocid="admin.logout.button"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header
          className="h-16 flex items-center justify-between px-5 flex-shrink-0 border-b"
          style={{
            background: t.topbarBg,
            borderColor: t.border,
            boxShadow: t.shadow,
          }}
        >
          <div className="flex-shrink-0">
            <h1 className="font-semibold text-sm" style={{ color: t.text }}>
              {pageTitle[activePage]}
            </h1>
            <p className="text-xs" style={{ color: t.muted }}>
              FiveStar Travel Admin
            </p>
          </div>
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
            >
              <Search
                className="w-4 h-4 flex-shrink-0"
                style={{ color: t.muted }}
              />
              <input
                type="text"
                placeholder="Search agents, bookings, suppliers..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: t.text }}
                data-ocid="admin.search_input"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
              data-ocid="admin.theme.toggle"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4" style={{ color: t.muted }} />
              ) : (
                <Sun className="w-4 h-4" style={{ color: t.muted }} />
              )}
            </button>
            <button
              type="button"
              className="relative w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
              data-ocid="admin.notifications.button"
            >
              <Bell className="w-4 h-4" style={{ color: t.muted }} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: t.error, color: "#fff" }}
              >
                5
              </span>
            </button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: "linear-gradient(135deg, #F9731618, #DC262618)",
                border: "1px solid #F9731640",
              }}
            >
              <Globe className="w-4 h-4" style={{ color: "#F97316" }} />
              <span
                className="text-sm font-semibold"
                style={{ color: "#F97316" }}
              >
                Admin
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
