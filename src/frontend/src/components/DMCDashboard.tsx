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
  Globe,
  Handshake,
  LogOut,
  MapPin,
  Moon,
  Package,
  Plus,
  Search,
  Sun,
  Ticket,
  TrendingUp,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";

type DMCPage =
  | "overview"
  | "packages"
  | "agent-bookings"
  | "destinations"
  | "partners"
  | "revenue"
  | "inventory"
  | "support";

const DMC_NAV: {
  icon: React.ElementType;
  label: string;
  key: DMCPage;
  section: string;
}[] = [
  { section: "Overview", icon: TrendingUp, label: "Overview", key: "overview" },
  { section: "Products", icon: Package, label: "Packages", key: "packages" },
  {
    section: "Products",
    icon: BookOpen,
    label: "Agent Bookings",
    key: "agent-bookings",
  },
  {
    section: "Operations",
    icon: MapPin,
    label: "Destinations",
    key: "destinations",
  },
  {
    section: "Operations",
    icon: Handshake,
    label: "Partner Agents",
    key: "partners",
  },
  {
    section: "Finance",
    icon: BarChart2,
    label: "Revenue Analytics",
    key: "revenue",
  },
  {
    section: "Products",
    icon: Upload,
    label: "Inventory Upload",
    key: "inventory",
  },
  { section: "Account", icon: Ticket, label: "Support", key: "support" },
];

const PACKAGES_DATA = [
  {
    id: "PKG-001",
    name: "Dubai Luxury 5N/6D",
    category: "Luxury",
    destinations: "Dubai",
    price: "₹85,000",
    bookings: 24,
    status: "Active",
  },
  {
    id: "PKG-002",
    name: "Bali Discovery 7N/8D",
    category: "Adventure",
    destinations: "Bali, Ubud",
    price: "₹72,000",
    bookings: 18,
    status: "Active",
  },
  {
    id: "PKG-003",
    name: "Thailand Trio 10N/11D",
    category: "Honeymoon",
    destinations: "Bangkok, Phuket, Krabi",
    price: "₹1,10,000",
    bookings: 11,
    status: "Active",
  },
  {
    id: "PKG-004",
    name: "Maldives Escape 4N/5D",
    category: "Beach",
    destinations: "Male, Maafushi",
    price: "₹1,55,000",
    bookings: 7,
    status: "Pending",
  },
];

const AGENT_BOOKINGS_DATA = [
  {
    ref: "FST-2024-003",
    agent: "Sunita Verma",
    package: "Bali Discovery 7N/8D",
    pax: 2,
    amount: "₹1,44,000",
    date: "2024-03-13",
    status: "Confirmed",
  },
  {
    ref: "FST-2024-008",
    agent: "Priya Patel",
    package: "Dubai Luxury 5N/6D",
    pax: 4,
    amount: "₹3,40,000",
    date: "2024-03-12",
    status: "Confirmed",
  },
  {
    ref: "FST-2024-011",
    agent: "Rahul Sharma",
    package: "Thailand Trio 10N/11D",
    pax: 2,
    amount: "₹2,20,000",
    date: "2024-03-10",
    status: "Pending",
  },
];

const DESTINATIONS_DATA = [
  {
    id: "DEST-001",
    country: "UAE",
    city: "Dubai",
    packages: 8,
    agents: 45,
    status: "Active",
  },
  {
    id: "DEST-002",
    country: "Indonesia",
    city: "Bali",
    packages: 6,
    agents: 32,
    status: "Active",
  },
  {
    id: "DEST-003",
    country: "Thailand",
    city: "Bangkok",
    packages: 5,
    agents: 28,
    status: "Active",
  },
  {
    id: "DEST-004",
    country: "Maldives",
    city: "Male",
    packages: 4,
    agents: 20,
    status: "Active",
  },
  {
    id: "DEST-005",
    country: "Singapore",
    city: "Singapore",
    packages: 3,
    agents: 15,
    status: "Draft",
  },
];

const PARTNERS_DATA = [
  {
    name: "Rahul Sharma",
    company: "TravelPlus",
    commission: "12%",
    bookings: 24,
    revenue: "₹8.1L",
    status: "Active",
  },
  {
    name: "Sunita Verma",
    company: "LuxeTrip",
    commission: "15%",
    bookings: 18,
    revenue: "₹6.2L",
    status: "Active",
  },
  {
    name: "Priya Patel",
    company: "GoTravel",
    commission: "10%",
    bookings: 11,
    revenue: "₹3.8L",
    status: "Active",
  },
  {
    name: "Amit Kumar",
    company: "DreamVoyage",
    commission: "8%",
    bookings: 3,
    revenue: "₹1.1L",
    status: "Inactive",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Active: { bg: "#16A34A", color: "#fff" },
    Confirmed: { bg: "#16A34A", color: "#fff" },
    Pending: { bg: "#F59E0B", color: "#fff" },
    Draft: { bg: "#6B7280", color: "#fff" },
    Inactive: { bg: "#6B7280", color: "#fff" },
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

export function DMCDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const [activePage, setActivePage] = useState<DMCPage>("overview");
  const { theme, toggleTheme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;
  const PURPLE = "#7C3AED";

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketMsg, setTicketMsg] = useState("");
  const [ticketSent, setTicketSent] = useState(false);

  const sections: string[] = [];
  const sectionMap: Record<string, typeof DMC_NAV> = {};
  for (const item of DMC_NAV) {
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
                  label: "Active Packages",
                  value: "14",
                  color: PURPLE,
                  icon: Package,
                },
                {
                  label: "Agent Bookings Today",
                  value: "7",
                  color: t.primary,
                  icon: BookOpen,
                },
                {
                  label: "Destinations Managed",
                  value: "5",
                  color: "#0891B2",
                  icon: MapPin,
                },
                {
                  label: "Monthly Revenue",
                  value: "₹14.2L",
                  color: "#16A34A",
                  icon: TrendingUp,
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
                <h3 className="font-semibold mb-3" style={{ color: t.text }}>
                  Top Packages This Month
                </h3>
                <div className="space-y-3">
                  {PACKAGES_DATA.slice(0, 3).map((pkg, i) => (
                    <div key={pkg.id} className="flex items-center gap-3">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ background: `${PURPLE}15`, color: PURPLE }}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <p
                          className="text-sm font-medium"
                          style={{ color: t.text }}
                        >
                          {pkg.name}
                        </p>
                        <p className="text-xs" style={{ color: t.muted }}>
                          {pkg.bookings} bookings
                        </p>
                      </div>
                      <span
                        className="text-sm font-semibold"
                        style={{ color: PURPLE }}
                      >
                        {pkg.price}
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
                <h3 className="font-semibold mb-3" style={{ color: t.text }}>
                  Recent Bookings
                </h3>
                <div className="space-y-3">
                  {AGENT_BOOKINGS_DATA.map((b) => (
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
                          {b.package}
                        </p>
                        <p className="text-xs" style={{ color: t.muted }}>
                          {b.agent} · {b.date}
                        </p>
                      </div>
                      <StatusBadge status={b.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "packages":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: t.text }}>
                Package Management
              </h3>
              <Button style={{ background: PURPLE, color: "#fff" }}>
                <Plus className="w-4 h-4 mr-1" /> Add New Package
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
                    <TableHead style={{ color: t.muted }}>
                      Package Name
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Category</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Destinations
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Price</TableHead>
                    <TableHead style={{ color: t.muted }}>Bookings</TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PACKAGES_DATA.map((pkg) => (
                    <TableRow
                      key={pkg.id}
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
                        {pkg.id}
                      </TableCell>
                      <TableCell
                        className="font-medium text-sm"
                        style={{ color: t.text }}
                      >
                        {pkg.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className="px-2 py-0.5 rounded text-xs"
                          style={{ background: `${PURPLE}15`, color: PURPLE }}
                        >
                          {pkg.category}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {pkg.destinations}
                      </TableCell>
                      <TableCell
                        className="text-sm font-semibold"
                        style={{ color: t.text }}
                      >
                        {pkg.price}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {pkg.bookings}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={pkg.status} />
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
                            Deactivate
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

      case "agent-bookings":
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
                Agent Bookings for DMC Packages
              </h3>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Booking Ref</TableHead>
                  <TableHead style={{ color: t.muted }}>Agent</TableHead>
                  <TableHead style={{ color: t.muted }}>Package</TableHead>
                  <TableHead style={{ color: t.muted }}>Pax</TableHead>
                  <TableHead style={{ color: t.muted }}>Amount</TableHead>
                  <TableHead style={{ color: t.muted }}>Date</TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
                  <TableHead style={{ color: t.muted }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {AGENT_BOOKINGS_DATA.map((b) => (
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
                      style={{ color: PURPLE }}
                    >
                      {b.ref}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.agent}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.package}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {b.pax}
                    </TableCell>
                    <TableCell
                      className="text-sm font-semibold"
                      style={{ color: "#16A34A" }}
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
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs h-7 px-2"
                          style={{ background: PURPLE, color: "#fff" }}
                        >
                          Confirm
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      case "destinations":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: t.text }}>
                Managed Destinations
              </h3>
              <Button style={{ background: PURPLE, color: "#fff" }}>
                <Plus className="w-4 h-4 mr-1" /> Add Destination
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
                    <TableHead style={{ color: t.muted }}>
                      Destination ID
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Country</TableHead>
                    <TableHead style={{ color: t.muted }}>City</TableHead>
                    <TableHead style={{ color: t.muted }}>Packages</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Connected Agents
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {DESTINATIONS_DATA.map((dest) => (
                    <TableRow
                      key={dest.id}
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
                        {dest.id}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {dest.country}
                      </TableCell>
                      <TableCell
                        className="font-medium text-sm"
                        style={{ color: t.text }}
                      >
                        {dest.city}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {dest.packages}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {dest.agents}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={dest.status} />
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
                            View Packages
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

      case "partners":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold" style={{ color: t.text }}>
                Partner Agents
              </h3>
              <Button style={{ background: PURPLE, color: "#fff" }}>
                <Plus className="w-4 h-4 mr-1" /> Add Partner Agent
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
                    <TableHead style={{ color: t.muted }}>Agent Name</TableHead>
                    <TableHead style={{ color: t.muted }}>Company</TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Commission Rate
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Total Bookings
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>
                      Total Revenue
                    </TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PARTNERS_DATA.map((p) => (
                    <TableRow
                      key={p.name}
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
                        {p.name}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {p.company}
                      </TableCell>
                      <TableCell
                        className="text-sm font-bold"
                        style={{ color: PURPLE }}
                      >
                        {p.commission}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {p.bookings}
                      </TableCell>
                      <TableCell
                        className="text-sm font-semibold"
                        style={{ color: "#16A34A" }}
                      >
                        {p.revenue}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={p.status} />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Edit Commission
                          </Button>
                          {p.status === "Active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 px-2"
                              style={{ color: t.error, borderColor: t.error }}
                            >
                              Deactivate
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              className="text-xs h-7 px-2"
                              style={{ background: "#16A34A", color: "#fff" }}
                            >
                              Activate
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "revenue":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  label: "Total Revenue (YTD)",
                  value: "₹1.42Cr",
                  change: "+28%",
                  color: PURPLE,
                },
                {
                  label: "This Month",
                  value: "₹14.2L",
                  change: "+12%",
                  color: "#16A34A",
                },
                {
                  label: "Avg Per Package",
                  value: "₹1,01,428",
                  change: "+5%",
                  color: t.primary,
                },
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
                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: "#16A34A" }}
                  >
                    {c.change} vs last month
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
                Monthly Revenue by Package
              </h3>
              <div className="space-y-3">
                {PACKAGES_DATA.map((pkg, i) => (
                  <div key={pkg.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: t.text }}>{pkg.name}</span>
                      <span style={{ color: PURPLE }} className="font-semibold">
                        {pkg.price}
                      </span>
                    </div>
                    <div
                      className="h-2 rounded-full"
                      style={{ background: t.border }}
                    >
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${[85, 70, 60, 40][i]}%`,
                          background: PURPLE,
                        }}
                      />
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
                Agent Performance
              </h3>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Agent</TableHead>
                    <TableHead style={{ color: t.muted }}>Bookings</TableHead>
                    <TableHead style={{ color: t.muted }}>Revenue</TableHead>
                    <TableHead style={{ color: t.muted }}>Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PARTNERS_DATA.filter((p) => p.status === "Active").map(
                    (p) => (
                      <TableRow key={p.name} style={{ borderColor: t.border }}>
                        <TableCell
                          className="text-sm"
                          style={{ color: t.text }}
                        >
                          {p.name} — {p.company}
                        </TableCell>
                        <TableCell
                          className="text-sm"
                          style={{ color: t.text }}
                        >
                          {p.bookings}
                        </TableCell>
                        <TableCell
                          className="text-sm font-semibold"
                          style={{ color: "#16A34A" }}
                        >
                          {p.revenue}
                        </TableCell>
                        <TableCell
                          className="text-sm"
                          style={{ color: PURPLE }}
                        >
                          {p.commission}
                        </TableCell>
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "inventory":
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
                Upload Destination Inventory
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label style={{ color: t.text }}>Service Type</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                  >
                    <option>Accommodation</option>
                    <option>Activities</option>
                    <option>Transport</option>
                    <option>Visa Assistance</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Destination</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                  >
                    <option>Dubai</option>
                    <option>Bali</option>
                    <option>Bangkok</option>
                    <option>Maldives</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Item Name</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. Desert Safari Premium"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Base Price (₹)</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. 4500"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <Label style={{ color: t.text }}>Description</Label>
                  <Textarea
                    className="mt-1"
                    placeholder="Detailed description of the service..."
                    rows={3}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
              </div>
              <div
                className="border-2 border-dashed rounded-xl p-5 text-center mb-4"
                style={{ borderColor: `${PURPLE}60` }}
              >
                <Upload
                  className="w-8 h-8 mx-auto mb-2"
                  style={{ color: PURPLE }}
                />
                <p className="text-sm" style={{ color: t.muted }}>
                  Upload images, rate sheets, or documents
                </p>
                <Button
                  variant="outline"
                  className="mt-2"
                  style={{ color: PURPLE, borderColor: PURPLE }}
                >
                  Browse Files
                </Button>
              </div>
              <Button style={{ background: PURPLE, color: "#fff" }}>
                Submit for Approval
              </Button>
            </div>
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
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="Briefly describe your issue"
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
                    rows={4}
                    value={ticketMsg}
                    onChange={(e) => setTicketMsg(e.target.value)}
                    placeholder="Describe the issue in detail..."
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                {ticketSent && (
                  <div
                    className="px-3 py-2 rounded text-sm"
                    style={{ background: "#DCFCE7", color: "#16A34A" }}
                  >
                    ✓ Ticket submitted! Expected response: 24 hours.
                  </div>
                )}
                <Button
                  style={{ background: PURPLE, color: "#fff" }}
                  onClick={() => {
                    setTicketSent(true);
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
                Recent Tickets
              </h3>
              <div className="space-y-2">
                {[
                  {
                    id: "TKT-D001",
                    subject: "Package pricing not updating",
                    status: "In Progress",
                    date: "2024-03-13",
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

  const pageTitle: Record<DMCPage, string> = {
    overview: "DMC Overview",
    packages: "Package Management",
    "agent-bookings": "Agent Bookings",
    destinations: "Destinations",
    partners: "Partner Agents",
    revenue: "Revenue Analytics",
    inventory: "Inventory Upload",
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
                background: `linear-gradient(135deg, ${PURPLE}, #9333EA)`,
                color: "#fff",
              }}
            >
              DMC PORTAL
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
                      background: isActive ? `${PURPLE}15` : "transparent",
                      borderLeft: isActive
                        ? `3px solid ${PURPLE}`
                        : "3px solid transparent",
                      color: isActive ? PURPLE : t.sidebarText,
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
                    data-ocid={`dmc.nav.item.${idx + 1}`}
                  >
                    <item.icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isActive ? PURPLE : t.muted }}
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
              style={{ background: `${PURPLE}20`, color: PURPLE }}
            >
              DM
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold truncate"
                style={{ color: t.text }}
              >
                Dubai Oasis DMC
              </p>
              <p className="text-[10px]" style={{ color: t.muted }}>
                DMC Account
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
            data-ocid="dmc.logout.button"
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
              DMC Portal
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
                placeholder="Search packages, bookings..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: t.text }}
                data-ocid="dmc.search_input"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
              data-ocid="dmc.theme.toggle"
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
              data-ocid="dmc.notifications.button"
            >
              <Bell className="w-4 h-4" style={{ color: t.muted }} />
            </button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{
                background: `${PURPLE}15`,
                border: `1px solid ${PURPLE}40`,
              }}
            >
              <Globe className="w-4 h-4" style={{ color: PURPLE }} />
              <span className="text-sm font-semibold" style={{ color: PURPLE }}>
                DMC
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
