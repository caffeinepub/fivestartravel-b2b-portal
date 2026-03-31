import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart2,
  BarChart3,
  Building2,
  Copy,
  CreditCard,
  Download,
  Edit,
  Globe,
  LogOut,
  Package,
  PlusCircle,
  RefreshCw,
  Settings,
  TrendingUp,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";
import { SupplierBookingCreate } from "./SupplierBookingCreate";
import { SupplierCompanyProfile } from "./SupplierCompanyProfile";
import { SupplierInventoryHub } from "./SupplierInventoryHub";
import { SupplierPricingEngine } from "./SupplierPricingEngine";

interface Props {
  onNavigate: (page: string) => void;
}

const BOOKINGS = [
  {
    id: "FST-SUP-001",
    service: "Hotel",
    agent: "Rahul Sharma",
    amount: "18,200",
    status: "Confirmed",
  },
  {
    id: "FST-SUP-002",
    service: "Tour",
    agent: "Priya Menon",
    amount: "12,400",
    status: "Confirmed",
  },
  {
    id: "FST-SUP-003",
    service: "Transfer",
    agent: "Arun Kumar",
    amount: "3,800",
    status: "Pending",
  },
  {
    id: "FST-SUP-004",
    service: "Hotel",
    agent: "Sonal Patel",
    amount: "24,500",
    status: "Confirmed",
  },
  {
    id: "FST-SUP-005",
    service: "Tour",
    agent: "Vikram Singh",
    amount: "8,900",
    status: "Cancelled",
  },
  {
    id: "FST-SUP-006",
    service: "Hotel",
    agent: "Neha Joshi",
    amount: "15,600",
    status: "Confirmed",
  },
  {
    id: "FST-SUP-007",
    service: "Transfer",
    agent: "Karthik R",
    amount: "2,400",
    status: "Pending",
  },
  {
    id: "FST-SUP-008",
    service: "Hotel",
    agent: "Meena Das",
    amount: "32,000",
    status: "Confirmed",
  },
];

const PAYOUTS = [
  {
    month: "Oct 2025",
    bookings: 42,
    gross: "2,38,400",
    commission: "28,608",
    net: "2,09,792",
    status: "Paid",
  },
  {
    month: "Nov 2025",
    bookings: 35,
    gross: "1,96,500",
    commission: "23,580",
    net: "1,72,920",
    status: "Paid",
  },
  {
    month: "Dec 2025",
    bookings: 51,
    gross: "2,87,600",
    commission: "34,512",
    net: "2,53,088",
    status: "Paid",
  },
  {
    month: "Jan 2026",
    bookings: 44,
    gross: "2,48,200",
    commission: "29,784",
    net: "2,18,416",
    status: "Paid",
  },
  {
    month: "Feb 2026",
    bookings: 38,
    gross: "2,14,800",
    commission: "25,776",
    net: "1,89,024",
    status: "Processing",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  Paid: "bg-green-500/20 text-green-400 border-green-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Hotel: <Building2 className="w-3 h-3" />,
  Tour: <Package className="w-3 h-3" />,
  Transfer: <Truck className="w-3 h-3" />,
};

type SupplierPage =
  | "overview"
  | "bookings"
  | "inventory"
  | "create-booking"
  | "company-profile"
  | "pricing"
  | "analytics"
  | "payouts"
  | "settings";

const NAV_ITEMS: {
  key: SupplierPage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "overview", label: "Dashboard", icon: BarChart3 },
  { key: "company-profile", label: "Company Profile", icon: Building2 },
  { key: "inventory", label: "Inventory", icon: Package },
  { key: "create-booking", label: "Create Booking", icon: PlusCircle },
  { key: "bookings", label: "My Bookings", icon: TrendingUp },
  { key: "pricing", label: "Pricing Rules", icon: Globe },
  { key: "analytics", label: "Analytics", icon: BarChart2 },
  { key: "payouts", label: "Payouts", icon: Wallet },
  { key: "settings", label: "Settings", icon: Settings },
];

// glassBg is now inlined using theme tokens

export function SupplierDashboard({ onNavigate }: Props) {
  const { theme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;

  const [activePage, setActivePage] = useState<SupplierPage>("overview");
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifPayout, setNotifPayout] = useState(true);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredBookings = BOOKINGS.filter((b) => {
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    const matchSearch =
      !searchQ ||
      b.id.toLowerCase().includes(searchQ.toLowerCase()) ||
      b.agent.toLowerCase().includes(searchQ.toLowerCase());
    return matchStatus && matchSearch;
  });

  function copyApiKey() {
    navigator.clipboard
      .writeText("SUP-7114315c-4ef2-4e21-83e8-527d56a0c529")
      .catch(() => {});
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  }

  return (
    <div className="min-h-screen flex" style={{ background: t.pageBg }}>
      {/* Sidebar */}
      <div
        className={`flex-shrink-0 transition-all duration-300 ${sidebarOpen ? "w-56" : "w-14"}`}
        style={{
          background: t.sidebarBg,
          borderRight: `1px solid ${t.border}`,
        }}
      >
        {/* Logo area */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-white/10">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#C2410C,#F97316)" }}
          >
            <Building2 className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <p className="text-white text-xs font-bold">Supplier Portal</p>
              <p className="text-orange-400 text-xs">Active</p>
            </div>
          )}
        </div>
        {/* Nav */}
        <nav className="py-3 px-2 space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
            <button
              type="button"
              key={key}
              onClick={() => setActivePage(key)}
              data-ocid={`supplier.nav.${key}.link`}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                activePage === key
                  ? "text-white"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
              style={
                activePage === key
                  ? {
                      background:
                        "linear-gradient(135deg,rgba(194,65,12,0.3),rgba(249,115,22,0.15))",
                      borderLeft: "2px solid #F97316",
                    }
                  : {}
              }
            >
              <Icon
                className={`flex-shrink-0 ${sidebarOpen ? "w-4 h-4" : "w-5 h-5"}`}
              />
              {sidebarOpen && <span>{label}</span>}
            </button>
          ))}
        </nav>
        {/* Logout */}
        <div className="absolute bottom-4 px-2 w-56">
          {sidebarOpen && (
            <button
              type="button"
              onClick={() => onNavigate("home")}
              className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
              data-ocid="supplier.logout.button"
            >
              <LogOut className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-3"
          style={{
            background: t.topbarBg,
            borderBottom: `1px solid ${t.border}`,
          }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white"
              data-ocid="supplier.sidebar.toggle"
            >
              <BarChart3 className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold" style={{ color: t.text }}>
                {NAV_ITEMS.find((n) => n.key === activePage)?.label}
              </h1>
              <p className="text-xs" style={{ color: t.muted }}>
                Sunrise Hospitality Pvt Ltd
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
              Active Supplier
            </Badge>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-slate-300 hover:bg-white/5 h-8"
              onClick={() => setActivePage("create-booking")}
              data-ocid="supplier.topbar.create_booking.button"
            >
              <PlusCircle className="w-3.5 h-3.5 mr-1" /> Create Booking
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {/* ── Overview ─────────────────────────────── */}
          {activePage === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    label: "Total Bookings",
                    value: "248",
                    color: "#F97316",
                    icon: TrendingUp,
                  },
                  {
                    label: "Revenue This Month",
                    value: "12,45,000",
                    color: "#16A34A",
                    icon: Wallet,
                  },
                  {
                    label: "Inventory Items",
                    value: "32",
                    color: "#2563EB",
                    icon: Package,
                  },
                  {
                    label: "Pending Payouts",
                    value: "1,85,000",
                    color: "#D97706",
                    icon: CreditCard,
                  },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-5"
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.border}`,
                    }}
                    data-ocid={`supplier.stat.card.${i + 1}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${s.color}33` }}
                      >
                        <s.icon
                          className="w-5 h-5"
                          style={{ color: s.color }}
                        />
                      </div>
                      <span className="text-slate-400 text-sm">{s.label}</span>
                    </div>
                    <p className="text-white text-2xl font-bold">
                      &#8377;{s.value}
                    </p>
                  </div>
                ))}
              </div>
              <div
                className="rounded-2xl p-5"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                }}
              >
                <h3 className="text-white font-semibold mb-4">
                  Recent Bookings
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow style={{ background: t.cardBg }}>
                      {[
                        "Booking ID",
                        "Service",
                        "Agent Name",
                        "Amount",
                        "Status",
                      ].map((h) => (
                        <TableHead key={h} className="text-slate-400">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BOOKINGS.slice(0, 5).map((b, i) => (
                      <TableRow
                        key={b.id}
                        className="border-white/10"
                        data-ocid={`supplier.recent.row.${i + 1}`}
                      >
                        <TableCell className="text-orange-400 font-mono text-sm">
                          {b.id}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5 text-slate-300 text-sm">
                            {TYPE_ICONS[b.service]} {b.service}
                          </span>
                        </TableCell>
                        <TableCell className="text-white text-sm">
                          {b.agent}
                        </TableCell>
                        <TableCell className="text-green-400 font-medium">
                          &#8377;{b.amount}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLORS[b.status]}`}
                          >
                            {b.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  {
                    label: "Manage Inventory",
                    color: "#F97316",
                    page: "inventory" as SupplierPage,
                  },
                  {
                    label: "Create Booking",
                    color: "#16A34A",
                    page: "create-booking" as SupplierPage,
                  },
                  {
                    label: "Pricing Rules",
                    color: "#2563EB",
                    page: "pricing" as SupplierPage,
                  },
                  {
                    label: "Company Profile",
                    color: "#7C3AED",
                    page: "company-profile" as SupplierPage,
                  },
                ].map((a, i) => (
                  <Button
                    key={a.label}
                    className="h-12 text-white font-medium"
                    onClick={() => setActivePage(a.page)}
                    style={{
                      background: `${a.color}33`,
                      border: `1px solid ${a.color}55`,
                      color: a.color,
                    }}
                    data-ocid={`supplier.quickaction.button.${i + 1}`}
                  >
                    {a.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {activePage === "company-profile" && <SupplierCompanyProfile />}
          {activePage === "inventory" && <SupplierInventoryHub />}
          {activePage === "create-booking" && <SupplierBookingCreate />}
          {activePage === "pricing" && <SupplierPricingEngine />}

          {/* ── Analytics ────────────────────────────── */}
          {activePage === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Bookings", value: "248", color: "#F97316" },
                  {
                    label: "Revenue This Month",
                    value: "12,45,000",
                    color: "#16A34A",
                  },
                  {
                    label: "Pending Confirmations",
                    value: "12",
                    color: "#EF4444",
                  },
                  { label: "Active Inventory", value: "28", color: "#3B82F6" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-5"
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.border}`,
                    }}
                    data-ocid={`analytics.stat.card.${i + 1}`}
                  >
                    <p className="text-slate-400 text-sm">{s.label}</p>
                    <p
                      className="text-2xl font-bold mt-1"
                      style={{ color: s.color }}
                    >
                      {s.label.includes("Revenue") || s.label.includes("Payout")
                        ? "\u20B9"
                        : ""}
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <h3 className="text-white font-semibold mb-4">
                    Monthly Booking Trend
                  </h3>
                  <div className="flex items-end gap-2 h-32">
                    {[
                      { m: "Apr", v: 38 },
                      { m: "May", v: 42 },
                      { m: "Jun", v: 35 },
                      { m: "Jul", v: 51 },
                      { m: "Aug", v: 44 },
                      { m: "Sep", v: 38 },
                      { m: "Oct", v: 52 },
                      { m: "Nov", v: 48 },
                      { m: "Dec", v: 61 },
                      { m: "Jan", v: 55 },
                      { m: "Feb", v: 42 },
                      { m: "Mar", v: 58 },
                    ].map(({ m, v }) => (
                      <div
                        key={m}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${(v / 65) * 100}%`,
                          background: "linear-gradient(180deg,#F97316,#C2410C)",
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-slate-500 text-xs mt-2">
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
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <h3 className="text-white font-semibold mb-4">
                    Revenue by Service Type
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: "Hotel", pct: 42, color: "#8B5CF6" },
                      { label: "Tour", pct: 28, color: "#10B981" },
                      { label: "Package", pct: 18, color: "#F97316" },
                      { label: "Transfer", pct: 12, color: "#3B82F6" },
                    ].map((s) => (
                      <div key={s.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-300">{s.label}</span>
                          <span className="text-white font-medium">
                            {s.pct}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full"
                            style={{ width: `${s.pct}%`, background: s.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${t.border}` }}
              >
                <div
                  className="p-4"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <h3 className="text-white font-semibold">
                    Upcoming Services (Next 7 Days)
                  </h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow style={{ background: t.cardBg }}>
                      {["Service", "Customer", "Date", "Value", "Status"].map(
                        (h) => (
                          <TableHead key={h} className="text-slate-400">
                            {h}
                          </TableHead>
                        ),
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        service: "Grand Hyatt Check-in",
                        customer: "Rahul Sharma",
                        date: "17 Mar 2026",
                        value: "18,500",
                        status: "Confirmed",
                      },
                      {
                        service: "Desert Safari",
                        customer: "Priya Menon",
                        date: "18 Mar 2026",
                        value: "2,800",
                        status: "Confirmed",
                      },
                      {
                        service: "Airport Transfer",
                        customer: "Arun Kumar",
                        date: "19 Mar 2026",
                        value: "2,400",
                        status: "Pending",
                      },
                      {
                        service: "Dubai City Tour",
                        customer: "Sonal Patel",
                        date: "20 Mar 2026",
                        value: "1,200",
                        status: "Confirmed",
                      },
                    ].map((r, i) => (
                      <TableRow
                        key={r.service}
                        className="border-white/10"
                        data-ocid={`analytics.upcoming.row.${i + 1}`}
                      >
                        <TableCell className="text-white font-medium text-sm">
                          {r.service}
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {r.customer}
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {r.date}
                        </TableCell>
                        <TableCell className="text-green-400 font-medium">
                          &#8377;{r.value}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLORS[r.status]}`}
                          >
                            {r.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ── Bookings ─────────────────────────────── */}
          {activePage === "bookings" && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <div className="relative flex-1 min-w-48">
                  <Input
                    placeholder="Search booking ID or agent..."
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                    data-ocid="supplier.bookings.search_input"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger
                    className="w-40 bg-white/5 border-white/10 text-white"
                    data-ocid="supplier.bookings.status_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["All", "Confirmed", "Pending", "Cancelled"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${t.border}` }}
              >
                <Table>
                  <TableHeader>
                    <TableRow style={{ background: t.cardBg }}>
                      {[
                        "Booking ID",
                        "Service",
                        "Agent Name",
                        "Amount",
                        "Status",
                      ].map((h) => (
                        <TableHead key={h} className="text-slate-400">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((b, i) => (
                      <TableRow
                        key={b.id}
                        className="border-white/10"
                        data-ocid={`supplier.bookings.row.${i + 1}`}
                      >
                        <TableCell className="text-orange-400 font-mono text-sm">
                          {b.id}
                        </TableCell>
                        <TableCell>
                          <span className="flex items-center gap-1.5 text-slate-300 text-sm">
                            {TYPE_ICONS[b.service]} {b.service}
                          </span>
                        </TableCell>
                        <TableCell className="text-white text-sm">
                          {b.agent}
                        </TableCell>
                        <TableCell className="text-green-400 font-medium">
                          &#8377;{b.amount}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLORS[b.status]}`}
                          >
                            {b.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ── Payouts ──────────────────────────────── */}
          {activePage === "payouts" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Total Earned",
                    value: "12,32,264",
                    color: "#16A34A",
                  },
                  { label: "Commission Rate", value: "12%", color: "#F97316" },
                  {
                    label: "Next Payout Date",
                    value: "31 Mar 2026",
                    color: "#2563EB",
                  },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-5"
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.border}`,
                    }}
                    data-ocid={`supplier.payout.card.${i + 1}`}
                  >
                    <p className="text-slate-400 text-sm mb-2">{s.label}</p>
                    <p
                      className="text-2xl font-bold"
                      style={{ color: s.color }}
                    >
                      &#8377;{s.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold">Payout History</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-slate-300 hover:bg-white/10"
                  data-ocid="supplier.payouts.download_button"
                >
                  <Download className="w-4 h-4 mr-2" /> Download Statement
                </Button>
              </div>
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: `1px solid ${t.border}` }}
              >
                <Table>
                  <TableHeader>
                    <TableRow style={{ background: t.cardBg }}>
                      {[
                        "Month",
                        "Bookings",
                        "Gross Revenue",
                        "Commission",
                        "Net Payout",
                        "Status",
                      ].map((h) => (
                        <TableHead key={h} className="text-slate-400">
                          {h}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PAYOUTS.map((p, i) => (
                      <TableRow
                        key={p.month}
                        className="border-white/10"
                        data-ocid={`supplier.payouts.row.${i + 1}`}
                      >
                        <TableCell className="text-white font-medium">
                          {p.month}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          {p.bookings}
                        </TableCell>
                        <TableCell className="text-slate-300">
                          &#8377;{p.gross}
                        </TableCell>
                        <TableCell className="text-orange-400">
                          &#8377;{p.commission}
                        </TableCell>
                        <TableCell className="text-green-400 font-medium">
                          &#8377;{p.net}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLORS[p.status]}`}
                          >
                            {p.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {/* ── Settings ─────────────────────────────── */}
          {activePage === "settings" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-orange-400" /> Company
                  Information
                </h3>
                <div className="space-y-3">
                  {(
                    [
                      [
                        "Company Name",
                        "Sunrise Hospitality Pvt Ltd",
                        "supplier.settings.company.input",
                      ],
                      [
                        "Contact Person",
                        "Ramesh Gupta",
                        "supplier.settings.contact.input",
                      ],
                      [
                        "Email",
                        "ramesh@sunrisehospitality.in",
                        "supplier.settings.email.input",
                      ],
                      [
                        "Phone",
                        "+91-9812345678",
                        "supplier.settings.phone.input",
                      ],
                    ] as [string, string, string][]
                  ).map(([label, val, ocid]) => (
                    <div key={label}>
                      <Label className="text-slate-400 text-xs">{label}</Label>
                      <Input
                        defaultValue={val}
                        className="mt-1 bg-white/5 border-white/10 text-white"
                        data-ocid={ocid}
                      />
                    </div>
                  ))}
                  <Button
                    style={{ background: "#F97316" }}
                    className="text-white hover:opacity-90 w-full"
                    data-ocid="supplier.settings.save.button"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <h3 className="text-white font-semibold mb-4">API Key</h3>
                  <div className="flex gap-2 mb-3">
                    <Input
                      type="password"
                      value="SUP-7114315c-4ef2-4e21-83e8-527d56a0c529"
                      readOnly
                      className="bg-white/5 border-white/10 text-white font-mono text-xs"
                      data-ocid="supplier.api.key_input"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-slate-300 hover:bg-white/10 flex-shrink-0"
                      onClick={copyApiKey}
                      data-ocid="supplier.api.copy_button"
                    >
                      <Copy className="w-4 h-4" />
                      {apiKeyCopied ? " Copied!" : ""}
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-orange-500/40 text-orange-400 hover:bg-orange-500/10 w-full"
                    data-ocid="supplier.api.regenerate_button"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" /> Regenerate Key
                  </Button>
                </div>
                <div
                  className="rounded-2xl p-6"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <h3 className="text-white font-semibold mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        label: "New Booking Alert",
                        val: notifBooking,
                        setter: setNotifBooking,
                        id: "supplier.notif.booking_switch",
                      },
                      {
                        label: "Payout Notification",
                        val: notifPayout,
                        setter: setNotifPayout,
                        id: "supplier.notif.payout_switch",
                      },
                    ].map((n) => (
                      <div
                        key={n.label}
                        className="flex items-center justify-between"
                      >
                        <Label className="text-slate-300">{n.label}</Label>
                        <Switch
                          checked={n.val}
                          onCheckedChange={n.setter}
                          data-ocid={n.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
