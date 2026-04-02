import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  BarChart2,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  FileText,
  LogOut,
  Moon,
  Package,
  Plus,
  Search,
  Sun,
  Ticket,
  TrendingUp,
  Upload,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";

type SupplierPage =
  | "overview"
  | "inventory"
  | "bookings"
  | "contracts"
  | "pricing"
  | "payouts"
  | "reports"
  | "profile"
  | "support";

const SUPPLIER_NAV: {
  icon: React.ElementType;
  label: string;
  key: SupplierPage;
  section: string;
}[] = [
  { section: "Overview", icon: TrendingUp, label: "Overview", key: "overview" },
  {
    section: "Products",
    icon: Package,
    label: "My Inventory",
    key: "inventory",
  },
  { section: "Products", icon: BookOpen, label: "Bookings", key: "bookings" },
  { section: "Products", icon: FileText, label: "Contracts", key: "contracts" },
  {
    section: "Products",
    icon: CalendarDays,
    label: "Pricing Calendar",
    key: "pricing",
  },
  {
    section: "Finance",
    icon: Wallet,
    label: "Payouts & Wallet",
    key: "payouts",
  },
  { section: "Finance", icon: BarChart2, label: "Reports", key: "reports" },
  {
    section: "Account",
    icon: Building2,
    label: "Company Profile",
    key: "profile",
  },
  { section: "Account", icon: Ticket, label: "Support", key: "support" },
];

const INVENTORY_DATA = [
  {
    id: "INV-001",
    name: "Desert Safari Deluxe",
    type: "Tour",
    destination: "Dubai",
    price: "₹4,500",
    available: 50,
    status: "Active",
  },
  {
    id: "INV-002",
    name: "Burj Al Arab City View",
    type: "Hotel",
    destination: "Dubai",
    price: "₹18,000/night",
    available: 10,
    status: "Active",
  },
  {
    id: "INV-003",
    name: "Dhow Cruise Dinner",
    type: "Activity",
    destination: "Dubai",
    price: "₹2,200",
    available: 100,
    status: "Active",
  },
  {
    id: "INV-004",
    name: "Dubai City Tour",
    type: "Tour",
    destination: "Dubai",
    price: "₹3,500",
    available: 30,
    status: "Pending",
  },
  {
    id: "INV-005",
    name: "Airport Transfer Premium",
    type: "Transfer",
    destination: "Dubai",
    price: "₹1,800",
    available: 20,
    status: "Active",
  },
];

const BOOKINGS_DATA = [
  {
    ref: "FST-2024-001",
    agent: "Rahul Sharma",
    product: "Desert Safari Deluxe",
    pax: 4,
    amount: "₹18,000",
    date: "2024-03-15",
    service: "2024-03-20",
    status: "Confirmed",
  },
  {
    ref: "FST-2024-003",
    agent: "Sunita Verma",
    product: "Burj Al Arab City View",
    pax: 2,
    amount: "₹36,000",
    date: "2024-03-13",
    service: "2024-04-01",
    status: "Confirmed",
  },
  {
    ref: "FST-2024-007",
    agent: "Priya Patel",
    product: "Dhow Cruise Dinner",
    pax: 6,
    amount: "₹13,200",
    date: "2024-03-12",
    service: "2024-03-18",
    status: "Pending",
  },
];

const CONTRACTS_DATA = [
  {
    name: "Hotel Rate Sheet 2024",
    type: "Hotel",
    validity: "Jan 2024 – Dec 2024",
    status: "Active",
    uploaded: "2024-01-05",
  },
  {
    name: "Tour Package Rates Q1",
    type: "Tour",
    validity: "Jan 2024 – Mar 2024",
    status: "Expired",
    uploaded: "2024-01-01",
  },
  {
    name: "Transfer Rates 2024",
    type: "Transfer",
    validity: "Jan 2024 – Dec 2024",
    status: "Active",
    uploaded: "2024-01-10",
  },
];

const PAYOUTS_DATA = [
  {
    month: "March 2024",
    bookings: 12,
    gross: "₹2,40,000",
    commission: "₹24,000",
    net: "₹2,16,000",
    status: "Processing",
  },
  {
    month: "February 2024",
    bookings: 18,
    gross: "₹3,60,000",
    commission: "₹36,000",
    net: "₹3,24,000",
    status: "Paid",
  },
  {
    month: "January 2024",
    bookings: 15,
    gross: "₹3,00,000",
    commission: "₹30,000",
    net: "₹2,70,000",
    status: "Paid",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#16A34A", color: "#fff" },
    Confirmed: { bg: "#16A34A", color: "#fff" },
    Paid: { bg: "#16A34A", color: "#fff" },
    Pending: { bg: "#F59E0B", color: "#fff" },
    Processing: { bg: "#2563EB", color: "#fff" },
    Expired: { bg: "#DC2626", color: "#fff" },
    Cancelled: { bg: "#DC2626", color: "#fff" },
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

export function SupplierDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const [activePage, setActivePage] = useState<SupplierPage>("overview");
  const [activeInventoryTab, setActiveInventoryTab] = useState("All");
  const { theme, toggleTheme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;

  // Profile state
  const [companyName, setCompanyName] = useState("Dubai Oasis DMC");
  const [gst, setGst] = useState("29AABCU9603R1ZM");

  // Ticket state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const sections: string[] = [];
  const sectionMap: Record<string, typeof SUPPLIER_NAV> = {};
  for (const item of SUPPLIER_NAV) {
    if (!sections.includes(item.section)) {
      sections.push(item.section);
      sectionMap[item.section] = [];
    }
    sectionMap[item.section].push(item);
  }

  const EMERALD = "#059669";

  const renderContent = () => {
    switch (activePage) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Active Inventory",
                  value: "45",
                  color: EMERALD,
                  icon: Package,
                },
                {
                  label: "Bookings This Month",
                  value: "27",
                  color: t.primary,
                  icon: BookOpen,
                },
                {
                  label: "Pending Approvals",
                  value: "3",
                  color: t.warning,
                  icon: Bell,
                },
                {
                  label: "Total Earnings",
                  value: "₹8.1L",
                  color: EMERALD,
                  icon: Wallet,
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
                  Recent Bookings
                </h3>
                <div className="space-y-3">
                  {BOOKINGS_DATA.map((b) => (
                    <div
                      key={b.ref}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                      style={{ borderColor: t.border }}
                    >
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: t.text }}
                        >
                          {b.product}
                        </p>
                        <p className="text-xs" style={{ color: t.muted }}>
                          {b.agent} · {b.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: EMERALD }}
                        >
                          {b.amount}
                        </p>
                        <StatusBadge status={b.status} />
                      </div>
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
                  Payout Summary
                </h3>
                <div className="space-y-3">
                  <div
                    className="p-3 rounded-lg"
                    style={{
                      background: `${EMERALD}10`,
                      border: `1px solid ${EMERALD}30`,
                    }}
                  >
                    <p className="text-xs" style={{ color: t.muted }}>
                      Next Payout (March 2024)
                    </p>
                    <p
                      className="text-2xl font-bold mt-1"
                      style={{ color: EMERALD }}
                    >
                      ₹2,16,000
                    </p>
                    <p className="text-xs mt-1" style={{ color: t.muted }}>
                      Expected: April 5, 2024
                    </p>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: t.muted }}>Commission deducted</span>
                    <span style={{ color: t.error }}>-₹24,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: t.muted }}>Gross amount</span>
                    <span style={{ color: t.text }}>₹2,40,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "inventory":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {["All", "Hotel", "Tour", "Activity", "Transfer"].map((tab) => (
                  <button
                    type="button"
                    key={tab}
                    className="px-3 py-1.5 rounded text-sm font-medium"
                    style={{
                      background:
                        activeInventoryTab === tab ? EMERALD : t.inputBg,
                      color: activeInventoryTab === tab ? "#fff" : t.muted,
                      border: `1px solid ${t.border}`,
                    }}
                    onClick={() => setActiveInventoryTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <Button style={{ background: EMERALD, color: "#fff" }}>
                <Plus className="w-4 h-4 mr-1" /> Add Inventory
              </Button>
            </div>
            <div
              className="rounded-xl border overflow-hidden"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>ID</TableHead>
                    <TableHead style={{ color: t.muted }}>Name</TableHead>
                    <TableHead style={{ color: t.muted }}>Type</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Destination
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Price</TableHead>
                    <TableHead style={{ color: t.muted }}>Available</TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {INVENTORY_DATA.filter(
                    (i) =>
                      activeInventoryTab === "All" ||
                      i.type === activeInventoryTab,
                  ).map((item) => (
                    <TableRow
                      key={item.id}
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
                        {item.id}
                      </TableCell>
                      <TableCell
                        className="font-medium text-sm"
                        style={{ color: t.text }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: `${EMERALD}15`, color: EMERALD }}
                        >
                          {item.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {item.destination}
                      </TableCell>
                      <TableCell
                        className="text-sm font-semibold"
                        style={{ color: t.text }}
                      >
                        {item.price}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {item.available}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status} />
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
                          >
                            Remove
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
            <div className="p-4 border-b" style={{ borderColor: t.border }}>
              <h3 className="font-semibold" style={{ color: t.text }}>
                Agent Bookings for My Inventory
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Booking Ref</TableHead>
                  <TableHead style={{ color: t.muted }}>Agent</TableHead>
                  <TableHead style={{ color: t.muted }}>Product</TableHead>
                  <TableHead style={{ color: t.muted }}>Pax</TableHead>
                  <TableHead style={{ color: t.muted }}>Amount</TableHead>
                  <TableHead style={{ color: t.muted }}>Booked</TableHead>
                  <TableHead style={{ color: t.muted }}>Service Date</TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
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
                      {b.product}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.pax}
                    </TableCell>
                    <TableCell
                      className="text-sm font-semibold"
                      style={{ color: EMERALD }}
                    >
                      {b.amount}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.muted }}>
                      {b.date}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.muted }}>
                      {b.service}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "contracts":
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
                Upload New Contract
              </h3>
              <div
                className="border-2 border-dashed rounded-xl p-8 text-center"
                style={{ borderColor: `${EMERALD}60` }}
              >
                <Upload
                  className="w-10 h-10 mx-auto mb-3"
                  style={{ color: EMERALD }}
                />
                <p className="font-medium" style={{ color: t.text }}>
                  Drag & drop contract files here
                </p>
                <p className="text-sm mt-1" style={{ color: t.muted }}>
                  Supports PDF, Excel, XML — Max 10MB
                </p>
                <Button
                  className="mt-4"
                  style={{ background: EMERALD, color: "#fff" }}
                >
                  Browse Files
                </Button>
              </div>
            </div>
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
                  My Contracts
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>
                      Contract Name
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Type</TableHead>
                    <TableHead style={{ color: t.muted }}>Validity</TableHead>
                    <TableHead style={{ color: t.muted }}>Uploaded</TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CONTRACTS_DATA.map((c) => (
                    <TableRow key={c.name} style={{ borderColor: t.border }}>
                      <TableCell
                        className="font-medium text-sm"
                        style={{ color: t.text }}
                      >
                        {c.name}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {c.type}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {c.validity}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {c.uploaded}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={c.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ color: t.error, borderColor: t.error }}
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
          </div>
        );

      case "pricing":
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
                Seasonal Pricing Calendar
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label style={{ color: t.text }}>Product</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                  >
                    <option>Desert Safari Deluxe</option>
                    <option>Burj Al Arab City View</option>
                    <option>Dhow Cruise Dinner</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Season</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                  >
                    <option>Peak Season (Dec–Feb)</option>
                    <option>Regular Season (Mar–Oct)</option>
                    <option>Low Season (Jun–Aug)</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>From Date</Label>
                  <Input
                    type="date"
                    className="mt-1"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>To Date</Label>
                  <Input
                    type="date"
                    className="mt-1"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Price per Adult (₹)</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. 5500"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Price per Child (₹)</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. 3500"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
              </div>
              <Button style={{ background: EMERALD, color: "#fff" }}>
                Add Pricing Rule
              </Button>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: t.text }}>
                Active Pricing Rules
              </h3>
              <div className="space-y-2">
                {[
                  {
                    product: "Desert Safari Deluxe",
                    season: "Peak Season",
                    dates: "Dec 1 – Feb 28",
                    adult: "₹6,500",
                    child: "₹4,200",
                  },
                  {
                    product: "Dhow Cruise Dinner",
                    season: "Regular Season",
                    dates: "Mar 1 – Nov 30",
                    adult: "₹2,200",
                    child: "₹1,500",
                  },
                ].map((rule) => (
                  <div
                    key={rule.product + rule.season}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: t.inputBg }}
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: t.text }}
                      >
                        {rule.product}
                      </p>
                      <p className="text-xs" style={{ color: t.muted }}>
                        {rule.season} · {rule.dates}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm" style={{ color: t.text }}>
                        Adult: <strong>{rule.adult}</strong>
                      </p>
                      <p className="text-xs" style={{ color: t.muted }}>
                        Child: {rule.child}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "payouts":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl p-5 border"
              style={{
                background: `linear-gradient(135deg, ${EMERALD}15, ${t.cardBg})`,
                borderColor: `${EMERALD}40`,
                boxShadow: t.shadow,
              }}
            >
              <p className="text-sm" style={{ color: t.muted }}>
                Total Earnings (All Time)
              </p>
              <p className="text-4xl font-bold mt-1" style={{ color: EMERALD }}>
                ₹28,40,000
              </p>
              <div className="flex gap-6 mt-3">
                <div>
                  <p className="text-xs" style={{ color: t.muted }}>
                    Pending
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: t.warning }}
                  >
                    ₹2,16,000
                  </p>
                </div>
                <div>
                  <p className="text-xs" style={{ color: t.muted }}>
                    Paid Out
                  </p>
                  <p
                    className="text-lg font-semibold"
                    style={{ color: EMERALD }}
                  >
                    ₹24,00,000
                  </p>
                </div>
              </div>
            </div>
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
                  Payout History
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Month</TableHead>
                    <TableHead style={{ color: t.muted }}>Bookings</TableHead>
                    <TableHead style={{ color: t.muted }}>Gross</TableHead>
                    <TableHead style={{ color: t.muted }}>Commission</TableHead>
                    <TableHead style={{ color: t.muted }}>Net Payout</TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PAYOUTS_DATA.map((p) => (
                    <TableRow key={p.month} style={{ borderColor: t.border }}>
                      <TableCell
                        className="font-medium text-sm"
                        style={{ color: t.text }}
                      >
                        {p.month}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {p.bookings}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {p.gross}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.error }}>
                        {p.commission}
                      </TableCell>
                      <TableCell
                        className="text-sm font-semibold"
                        style={{ color: EMERALD }}
                      >
                        {p.net}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={p.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-4" style={{ color: t.text }}>
                Bank Account Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label style={{ color: t.text }}>Account Holder Name</Label>
                  <Input
                    className="mt-1"
                    defaultValue="Dubai Oasis DMC LLC"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Bank Name</Label>
                  <Input
                    className="mt-1"
                    defaultValue="Emirates NBD"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Account Number</Label>
                  <Input
                    className="mt-1"
                    defaultValue="****3847"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>IFSC / SWIFT</Label>
                  <Input
                    className="mt-1"
                    defaultValue="EBILAEAD"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
              </div>
              <Button
                className="mt-3"
                style={{ background: EMERALD, color: "#fff" }}
              >
                Update Bank Details
              </Button>
            </div>
          </div>
        );

      case "reports":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Best Selling Product",
                  value: "Desert Safari Deluxe",
                },
                { label: "Top Agent", value: "Sunita Verma" },
                { label: "Avg Booking Value", value: "₹16,200" },
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
                  <p className="text-xs" style={{ color: t.muted }}>
                    {c.label}
                  </p>
                  <p
                    className="text-lg font-bold mt-1"
                    style={{ color: t.text }}
                  >
                    {c.value}
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
                Monthly Revenue
              </h3>
              <div className="flex items-end gap-2 h-28">
                {[55, 70, 60, 80, 75, 90].map((h) => (
                  <div
                    key={h}
                    className="flex-1 rounded-t"
                    style={{
                      height: `${h}%`,
                      background: `linear-gradient(to top, ${EMERALD}, ${EMERALD}80)`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map((m) => (
                  <span
                    key={m}
                    className="text-[10px]"
                    style={{ color: t.muted }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div
            className="rounded-xl border p-6"
            style={{
              background: t.cardBg,
              borderColor: t.border,
              boxShadow: t.shadow,
            }}
          >
            <h3 className="font-semibold mb-5" style={{ color: t.text }}>
              Company Profile
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label style={{ color: t.text }}>Company Name</Label>
                <Input
                  className="mt-1"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  style={{
                    background: t.inputBg,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>
              <div>
                <Label style={{ color: t.text }}>GST Number</Label>
                <Input
                  className="mt-1"
                  value={gst}
                  onChange={(e) => setGst(e.target.value)}
                  style={{
                    background: t.inputBg,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>
              <div>
                <Label style={{ color: t.text }}>Contact Email</Label>
                <Input
                  className="mt-1"
                  defaultValue="info@dubaioasis.ae"
                  style={{
                    background: t.inputBg,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>
              <div>
                <Label style={{ color: t.text }}>Phone</Label>
                <Input
                  className="mt-1"
                  defaultValue="+971 4 123 4567"
                  style={{
                    background: t.inputBg,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>
              <div className="col-span-2">
                <Label style={{ color: t.text }}>Address</Label>
                <Textarea
                  className="mt-1"
                  defaultValue="Office 512, Business Bay, Dubai, UAE"
                  style={{
                    background: t.inputBg,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>
              <div>
                <Label style={{ color: t.text }}>Country</Label>
                <Input
                  className="mt-1"
                  defaultValue="United Arab Emirates"
                  style={{
                    background: t.inputBg,
                    borderColor: t.border,
                    color: t.text,
                  }}
                />
              </div>
              <div>
                <Label style={{ color: t.text }}>Company Logo</Label>
                <div className="mt-1 flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-lg flex items-center justify-center"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                    }}
                  >
                    <Building2 className="w-8 h-8" style={{ color: t.muted }} />
                  </div>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-1" /> Upload Logo
                  </Button>
                </div>
              </div>
            </div>
            <Button
              className="mt-5"
              style={{ background: EMERALD, color: "#fff" }}
            >
              Save Profile
            </Button>
          </div>
        );

      case "support":
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
                Submit Support Ticket
              </h3>
              <div className="space-y-3">
                <div>
                  <Label style={{ color: t.text }}>Subject</Label>
                  <Input
                    className="mt-1"
                    placeholder="Briefly describe your issue"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Message</Label>
                  <Textarea
                    className="mt-1"
                    placeholder="Describe your issue in detail..."
                    rows={4}
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                {ticketSubmitted && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm"
                    style={{ background: "#DCFCE7", color: "#16A34A" }}
                  >
                    ✓ Ticket submitted! Our team will respond within 24 hours.
                  </div>
                )}
                <Button
                  style={{ background: EMERALD, color: "#fff" }}
                  onClick={() => {
                    setTicketSubmitted(true);
                    setTicketSubject("");
                    setTicketMsg("");
                  }}
                >
                  Submit Ticket
                </Button>
              </div>
            </div>
            <div
              className="rounded-xl border p-5"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-3" style={{ color: t.text }}>
                My Tickets
              </h3>
              <div className="space-y-2">
                {[
                  {
                    id: "TKT-S001",
                    subject: "Inventory upload failing",
                    status: "In Progress",
                    date: "2024-03-14",
                  },
                ].map((tk) => (
                  <div
                    key={tk.id}
                    className="flex items-center justify-between p-3 rounded-lg"
                    style={{ background: t.inputBg }}
                  >
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: t.text }}
                      >
                        {tk.subject}
                      </p>
                      <p className="text-xs" style={{ color: t.muted }}>
                        {tk.id} · {tk.date}
                      </p>
                    </div>
                    <StatusBadge status={tk.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const pageTitle: Record<SupplierPage, string> = {
    overview: "Supplier Overview",
    inventory: "My Inventory",
    bookings: "Agent Bookings",
    contracts: "Contracts",
    pricing: "Pricing Calendar",
    payouts: "Payouts & Wallet",
    reports: "Reports",
    profile: "Company Profile",
    support: "Support",
  };

  return (
    <div className="min-h-screen flex" style={{ background: t.pageBg }}>
      <aside
        className="w-64 flex-shrink-0 hidden md:flex flex-col border-r"
        style={{ background: t.sidebarBg, borderColor: t.border }}
      >
        <div className="px-4 py-4 border-b" style={{ borderColor: t.border }}>
          <div className="bg-white rounded-lg px-2 py-1.5 inline-flex items-center shadow-sm">
            <img
              src="/assets/uploads/image-3-1.png"
              alt="FiveStar Travel"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="mt-2 px-1">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{
                background: `linear-gradient(135deg, ${EMERALD}, #16A34A)`,
                color: "#fff",
              }}
            >
              SUPPLIER PORTAL
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
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150"
                    style={{
                      background: isActive ? `${EMERALD}15` : "transparent",
                      borderLeft: isActive
                        ? `3px solid ${EMERALD}`
                        : "3px solid transparent",
                      color: isActive ? EMERALD : t.sidebarText,
                      fontWeight: isActive ? 600 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.background =
                          t.sidebarHoverBg;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        (e.currentTarget as HTMLElement).style.background =
                          "transparent";
                    }}
                    onClick={() => setActivePage(item.key)}
                    data-ocid={`supplier.nav.item.${idx + 1}`}
                  >
                    <item.icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isActive ? EMERALD : t.muted }}
                    />
                    <span className="flex-1 truncate text-left">
                      {item.label}
                    </span>
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
              style={{ background: `${EMERALD}20`, color: EMERALD }}
            >
              DO
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold truncate"
                style={{ color: t.text }}
              >
                Dubai Oasis DMC
              </p>
              <p className="text-[10px]" style={{ color: t.muted }}>
                Supplier Account
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium"
            style={{ color: t.error }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(220,38,38,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            onClick={() => onNavigate("logout")}
            data-ocid="supplier.logout.button"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

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
              Supplier Portal
            </p>
          </div>
          <div className="flex-1 max-w-md mx-6 hidden sm:block">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
            >
              <Search className="w-4 h-4" style={{ color: t.muted }} />
              <input
                type="text"
                placeholder="Search inventory, bookings..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: t.text }}
                data-ocid="supplier.search_input"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
              data-ocid="supplier.theme.toggle"
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
              data-ocid="supplier.notifications.button"
            >
              <Bell className="w-4 h-4" style={{ color: t.muted }} />
            </button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: `${EMERALD}15`,
                border: `1px solid ${EMERALD}40`,
              }}
            >
              <Building2 className="w-4 h-4" style={{ color: EMERALD }} />
              <span
                className="text-sm font-semibold"
                style={{ color: EMERALD }}
              >
                Supplier
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
