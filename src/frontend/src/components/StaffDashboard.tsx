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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bell,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ClipboardList,
  Clock,
  DollarSign,
  Download,
  FileText,
  Hotel,
  LogOut,
  Mail,
  MessageSquare,
  Plane,
  Plus,
  Send,
  Star,
  TrendingUp,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";

// CARD styles now use theme tokens

const SERVICE_TYPES = ["Flight", "Hotel", "Tour", "Transfer", "Visa"];

const QUEUE_ROWS = [
  {
    id: "OFR-001",
    agent: "Rajiv Mehta",
    service: "Hotel",
    dest: "Bangkok",
    date: "22 Mar",
    priority: "High",
    status: "Pending",
    assigned: "Amit S.",
  },
  {
    id: "OFR-002",
    agent: "Priya Kapoor",
    service: "Flight",
    dest: "Dubai",
    date: "23 Mar",
    priority: "Medium",
    status: "In Progress",
    assigned: "Priya V.",
  },
  {
    id: "OFR-003",
    agent: "Suresh Nair",
    service: "Transfer",
    dest: "Singapore",
    date: "24 Mar",
    priority: "Low",
    status: "Confirmed",
    assigned: "Rajesh K.",
  },
  {
    id: "OFR-004",
    agent: "Anita Sharma",
    service: "Visa",
    dest: "UK",
    date: "25 Mar",
    priority: "High",
    status: "Pending",
    assigned: "Sneha P.",
  },
  {
    id: "OFR-005",
    agent: "Mohit Jain",
    service: "Tour",
    dest: "Bali",
    date: "26 Mar",
    priority: "Medium",
    status: "In Progress",
    assigned: "Amit S.",
  },
  {
    id: "OFR-006",
    agent: "Deepika Rao",
    service: "Hotel",
    dest: "Paris",
    date: "27 Mar",
    priority: "High",
    status: "Pending",
    assigned: "Priya V.",
  },
  {
    id: "OFR-007",
    agent: "Kiran Patel",
    service: "Flight",
    dest: "London",
    date: "28 Mar",
    priority: "Low",
    status: "Confirmed",
    assigned: "Rajesh K.",
  },
  {
    id: "OFR-008",
    agent: "Vivek Singh",
    service: "Cruise",
    dest: "Mediterranean",
    date: "29 Mar",
    priority: "Medium",
    status: "Pending",
    assigned: "Sneha P.",
  },
  {
    id: "OFR-009",
    agent: "Meena Verma",
    service: "Transfer",
    dest: "Maldives",
    date: "30 Mar",
    priority: "High",
    status: "In Progress",
    assigned: "Amit S.",
  },
  {
    id: "OFR-010",
    agent: "Ashish Gupta",
    service: "Hotel",
    dest: "Tokyo",
    date: "31 Mar",
    priority: "Medium",
    status: "Rejected",
    assigned: "Priya V.",
  },
  {
    id: "OFR-011",
    agent: "Sakshi Arora",
    service: "Visa",
    dest: "USA",
    date: "01 Apr",
    priority: "High",
    status: "Pending",
    assigned: "Rajesh K.",
  },
  {
    id: "OFR-012",
    agent: "Ramesh Tiwari",
    service: "Tour",
    dest: "Switzerland",
    date: "02 Apr",
    priority: "Low",
    status: "In Progress",
    assigned: "Sneha P.",
  },
];

const SUPPLIER_ROWS = [
  {
    id: "FST-4001",
    service: "Hotel",
    supplier: "Provider Alpha",
    sent: "10:20 AM",
    status: "Confirmed",
    response: "18 min",
  },
  {
    id: "FST-4002",
    service: "Transfer",
    supplier: "Provider Beta",
    sent: "09:45 AM",
    status: "Waiting",
    response: "—",
  },
  {
    id: "FST-4003",
    service: "Tour",
    supplier: "Provider Gamma",
    sent: "08:30 AM",
    status: "Overdue",
    response: "4 h",
  },
  {
    id: "FST-4004",
    service: "Visa",
    supplier: "Provider Delta",
    sent: "11:00 AM",
    status: "Confirmed",
    response: "22 min",
  },
  {
    id: "FST-4005",
    service: "Hotel",
    supplier: "Provider Epsilon",
    sent: "07:15 AM",
    status: "Overdue",
    response: "5 h",
  },
  {
    id: "FST-4006",
    service: "Flight",
    supplier: "Provider Zeta",
    sent: "12:05 PM",
    status: "Requested",
    response: "—",
  },
  {
    id: "FST-4007",
    service: "Cruise",
    supplier: "Provider Eta",
    sent: "01:30 PM",
    status: "Waiting",
    response: "—",
  },
  {
    id: "FST-4008",
    service: "Transfer",
    supplier: "Provider Theta",
    sent: "02:00 PM",
    status: "Confirmed",
    response: "10 min",
  },
  {
    id: "FST-4009",
    service: "Tour",
    supplier: "Provider Iota",
    sent: "03:15 PM",
    status: "Rejected",
    response: "45 min",
  },
  {
    id: "FST-4010",
    service: "Hotel",
    supplier: "Provider Kappa",
    sent: "04:00 PM",
    status: "Confirmed",
    response: "30 min",
  },
];

const PAYMENT_HISTORY = [
  {
    id: "PAY-101",
    agent: "Rajiv Mehta",
    booking: "FST-4001",
    amount: "₹45,000",
    method: "Bank Transfer",
    ref: "NEFT2024001",
    date: "16 Mar",
    status: "Verified",
  },
  {
    id: "PAY-102",
    agent: "Priya Kapoor",
    booking: "FST-4002",
    amount: "₹18,500",
    method: "UPI",
    ref: "UPI9876543210",
    date: "15 Mar",
    status: "Pending",
  },
  {
    id: "PAY-103",
    agent: "Suresh Nair",
    booking: "FST-4003",
    amount: "₹72,000",
    method: "Cheque",
    ref: "CHQ00445",
    date: "14 Mar",
    status: "Verified",
  },
  {
    id: "PAY-104",
    agent: "Anita Sharma",
    booking: "FST-4004",
    amount: "₹9,200",
    method: "Cash",
    ref: "CASH-016",
    date: "13 Mar",
    status: "Rejected",
  },
  {
    id: "PAY-105",
    agent: "Mohit Jain",
    booking: "FST-4005",
    amount: "₹33,000",
    method: "UPI",
    ref: "UPI1122334455",
    date: "12 Mar",
    status: "Verified",
  },
];

const STAFF_MEMBERS = [
  {
    name: "Amit Sharma",
    role: "Senior Operations",
    tasks: [
      { service: "Hotel", client: "Rajiv Mehta", status: "In Progress" },
      { service: "Flight", client: "Priya Kapoor", status: "New" },
      { service: "Transfer", client: "Meena Verma", status: "Done" },
    ],
  },
  {
    name: "Priya Verma",
    role: "Booking Executive",
    tasks: [
      { service: "Visa", client: "Suresh Nair", status: "In Progress" },
      { service: "Hotel", client: "Deepika Rao", status: "New" },
    ],
  },
  {
    name: "Rajesh Kumar",
    role: "Ticketing Staff",
    tasks: [
      { service: "Flight", client: "Kiran Patel", status: "Done" },
      { service: "Cruise", client: "Vivek Singh", status: "New" },
      { service: "Tour", client: "Ramesh Tiwari", status: "In Progress" },
    ],
  },
  {
    name: "Sneha Patel",
    role: "Visa Specialist",
    tasks: [
      { service: "Visa", client: "Sakshi Arora", status: "New" },
      { service: "Transfer", client: "Ashish Gupta", status: "Done" },
    ],
  },
];

const SAVED_QUOTES = [
  {
    id: "QT-001",
    client: "Global Corp",
    dest: "Bangkok",
    total: "₹1,20,000",
    date: "10 Mar",
    status: "Sent",
  },
  {
    id: "QT-002",
    client: "Rohan Travels",
    dest: "Dubai",
    total: "₹85,000",
    date: "12 Mar",
    status: "Draft",
  },
  {
    id: "QT-003",
    client: "Starlight Tours",
    dest: "Bali",
    total: "₹2,40,000",
    date: "14 Mar",
    status: "Converted",
  },
  {
    id: "QT-004",
    client: "Horizon Holidays",
    dest: "Switzerland",
    total: "₹3,60,000",
    date: "15 Mar",
    status: "Sent",
  },
];

function statusBadge(s: string) {
  const map: Record<string, string> = {
    Pending: "bg-yellow-500/20 text-yellow-400",
    "In Progress": "bg-blue-500/20 text-blue-400",
    Confirmed: "bg-green-500/20 text-green-400",
    Rejected: "bg-red-500/20 text-red-400",
    Overdue: "bg-red-600/30 text-red-300",
    Waiting: "bg-orange-500/20 text-orange-400",
    Requested: "bg-slate-500/20 text-slate-400",
    Verified: "bg-green-500/20 text-green-400",
    New: "bg-purple-500/20 text-purple-400",
    Done: "bg-green-500/20 text-green-400",
    Sent: "bg-blue-500/20 text-blue-400",
    Draft: "bg-slate-500/20 text-slate-400",
    Converted: "bg-green-500/20 text-green-400",
    High: "bg-red-500/20 text-red-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Low: "bg-slate-500/20 text-slate-400",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[s] ?? "bg-slate-500/20 text-slate-400"}`}
    >
      {s}
    </span>
  );
}

function serviceIcon(s: string) {
  if (s === "Flight") return <Plane className="w-3.5 h-3.5" />;
  if (s === "Hotel") return <Hotel className="w-3.5 h-3.5" />;
  return <Star className="w-3.5 h-3.5" />;
}

export function StaffDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const { theme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;

  const [queueFilter, setQueueFilter] = useState("All");
  const [bookingService, setBookingService] = useState("Flight");
  const [bookingForm, setBookingForm] = useState<Record<string, string>>({});
  const [generatedBooking, setGeneratedBooking] = useState("");
  const [assignForms, setAssignForms] = useState<Record<number, boolean>>({});
  const [quoteServices, setQuoteServices] = useState([
    {
      type: "Hotel",
      desc: "3 nights Bangkok",
      cost: 15000,
      markup: 15,
      sell: 17250,
    },
    {
      type: "Transfer",
      desc: "Airport transfers",
      cost: 2000,
      markup: 20,
      sell: 2400,
    },
  ]);
  const [quoteClient, setQuoteClient] = useState("");
  const [quoteDest, setQuoteDest] = useState("");
  const [quoteDates, setQuoteDates] = useState("");
  const [quotePax, setQuotePax] = useState("");
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const [payForm, setPayForm] = useState<Record<string, string>>({});
  const [taskStatuses, setTaskStatuses] = useState<Record<string, string>>({});

  function upd(k: string, v: string) {
    setBookingForm((p) => ({ ...p, [k]: v }));
  }

  function createBooking() {
    const id = `FST-${Math.floor(10000 + Math.random() * 90000)}`;
    setGeneratedBooking(id);
  }

  const filteredQueue =
    queueFilter === "All"
      ? QUEUE_ROWS
      : QUEUE_ROWS.filter(
          (r) => r.service === queueFilter.replace(" Queue", ""),
        );

  const grandTotal = quoteServices.reduce((a, s) => a + s.sell, 0);
  const totalCost = quoteServices.reduce((a, s) => a + s.cost, 0);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0F172A",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between px-6 py-4"
        style={{
          background: "linear-gradient(135deg, #064E3B, #059669)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">
              FiveStar Travel
            </h1>
            <p className="text-emerald-200 text-xs">Staff Operations Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <Button
            size="sm"
            onClick={() => onNavigate("home")}
            className="bg-white/20 text-white hover:bg-white/30 border-0"
            data-ocid="staff.logout_button"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="offline">
          <TabsList className="bg-white/5 border border-white/10 mb-6 flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="offline"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
              data-ocid="staff.offline_ops.tab"
            >
              <ClipboardList className="w-4 h-4 mr-1" /> Offline Ops
            </TabsTrigger>
            <TabsTrigger
              value="manual"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
              data-ocid="staff.manual_booking.tab"
            >
              <Plus className="w-4 h-4 mr-1" /> Manual Booking
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
              data-ocid="staff.task_board.tab"
            >
              <Users className="w-4 h-4 mr-1" /> Task Board
            </TabsTrigger>
            <TabsTrigger
              value="supplier"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
              data-ocid="staff.supplier_tracker.tab"
            >
              <Briefcase className="w-4 h-4 mr-1" /> Supplier Tracker
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
              data-ocid="staff.payments.tab"
            >
              <DollarSign className="w-4 h-4 mr-1" /> Payments
            </TabsTrigger>
            <TabsTrigger
              value="quotations"
              className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
              data-ocid="staff.quotations.tab"
            >
              <FileText className="w-4 h-4 mr-1" /> Quotations
            </TabsTrigger>
          </TabsList>

          {/* ── Offline Operations ── */}
          <TabsContent value="offline">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: "Offline Requests", value: 42, color: "#059669" },
                { label: "Supplier Pending", value: 16, color: "#F97316" },
                { label: "Payments Pending", value: 11, color: "#EAB308" },
                { label: "Ticketing Queue", value: 8, color: "#3B82F6" },
                { label: "Completed Today", value: 74, color: "#10B981" },
              ].map((k, i) => (
                <div
                  key={k.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                  data-ocid={`staff.ops.card.${i + 1}`}
                >
                  <p className="text-slate-400 text-xs mb-1">{k.label}</p>
                  <p className="text-3xl font-bold" style={{ color: k.color }}>
                    {k.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                "All",
                "Hotel Queue",
                "Flight Queue",
                "Transfer Queue",
                "Visa Queue",
              ].map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setQueueFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    queueFilter === f
                      ? "bg-emerald-600 text-white"
                      : "bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                  data-ocid={`staff.queue.filter.${f.toLowerCase().replace(/\s/g, "_")}.toggle`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: t.cardBg, border: `1px solid ${t.border}` }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: t.cardBg }}>
                    {[
                      "Request ID",
                      "Agent/Client",
                      "Service",
                      "Destination",
                      "Date",
                      "Priority",
                      "Status",
                      "Assigned",
                      "Action",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400 text-xs">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQueue.map((row, i) => (
                    <TableRow
                      key={row.id}
                      className="border-white/10"
                      data-ocid={`staff.queue.row.${i + 1}`}
                    >
                      <TableCell className="text-emerald-400 text-xs font-mono">
                        {row.id}
                      </TableCell>
                      <TableCell className="text-white text-sm">
                        {row.agent}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          {row.service}
                        </span>
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {row.dest}
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {row.date}
                      </TableCell>
                      <TableCell>{statusBadge(row.priority)}</TableCell>
                      <TableCell>{statusBadge(row.status)}</TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {row.assigned}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          className="bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50 h-7 text-xs border-0"
                          data-ocid={`staff.queue.handle_button.${i + 1}`}
                        >
                          Handle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ── Manual Booking ── */}
          <TabsContent value="manual">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Tabs value={bookingService} onValueChange={setBookingService}>
                  <TabsList className="bg-white/5 border border-white/10 mb-4">
                    {SERVICE_TYPES.map((s) => (
                      <TabsTrigger
                        key={s}
                        value={s}
                        className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white text-slate-400"
                        data-ocid="staff.booking.service_tab"
                      >
                        {s}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Common Fields */}
                  <div
                    className="rounded-2xl p-5 mb-4"
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.border}`,
                    }}
                  >
                    <h3 className="text-white font-semibold mb-4">
                      Client Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {["Client Name", "Email", "Phone", "Passengers"].map(
                        (f) => (
                          <div key={f}>
                            <Label className="text-slate-400 text-xs mb-1 block">
                              {f}
                            </Label>
                            <Input
                              className="bg-white/5 border-white/10 text-white"
                              value={bookingForm[f] ?? ""}
                              onChange={(e) => upd(f, e.target.value)}
                            />
                          </div>
                        ),
                      )}
                      <div>
                        <Label className="text-slate-400 text-xs mb-1 block">
                          Travel Date
                        </Label>
                        <Input
                          type="date"
                          className="bg-white/5 border-white/10 text-white"
                          style={{ colorScheme: "dark" }}
                          value={bookingForm["Travel Date"] ?? ""}
                          onChange={(e) => upd("Travel Date", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-slate-400 text-xs mb-1 block">
                          Payment Status
                        </Label>
                        <Select
                          value={bookingForm["Payment Status"] ?? ""}
                          onValueChange={(v) => upd("Payment Status", v)}
                        >
                          <SelectTrigger className="bg-white/5 border-white/10 text-white">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Paid">Paid</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Credit">Credit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Notes
                      </Label>
                      <Textarea
                        className="bg-white/5 border-white/10 text-white resize-none"
                        rows={2}
                        value={bookingForm.Notes ?? ""}
                        onChange={(e) => upd("Notes", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Service-specific fields */}
                  {bookingService === "Flight" && (
                    <div
                      className="rounded-2xl p-5 mb-4"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Plane className="w-4 h-4 text-blue-400" /> Flight
                        Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "From City",
                          "To City",
                          "Airline",
                          "PNR",
                          "Fare (₹)",
                          "Baggage",
                        ].map((f) => (
                          <div key={f}>
                            <Label className="text-slate-400 text-xs mb-1 block">
                              {f}
                            </Label>
                            <Input
                              className="bg-white/5 border-white/10 text-white"
                              value={bookingForm[f] ?? ""}
                              onChange={(e) => upd(f, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingService === "Hotel" && (
                    <div
                      className="rounded-2xl p-5 mb-4"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-orange-400" /> Hotel
                        Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {["Hotel Name", "City", "Room Type", "Rate (₹)"].map(
                          (f) => (
                            <div key={f}>
                              <Label className="text-slate-400 text-xs mb-1 block">
                                {f}
                              </Label>
                              <Input
                                className="bg-white/5 border-white/10 text-white"
                                value={bookingForm[f] ?? ""}
                                onChange={(e) => upd(f, e.target.value)}
                              />
                            </div>
                          ),
                        )}
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">
                            Check-in
                          </Label>
                          <Input
                            type="date"
                            className="bg-white/5 border-white/10 text-white"
                            style={{ colorScheme: "dark" }}
                            value={bookingForm["Check-in"] ?? ""}
                            onChange={(e) => upd("Check-in", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">
                            Check-out
                          </Label>
                          <Input
                            type="date"
                            className="bg-white/5 border-white/10 text-white"
                            style={{ colorScheme: "dark" }}
                            value={bookingForm["Check-out"] ?? ""}
                            onChange={(e) => upd("Check-out", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">
                            Meal Plan
                          </Label>
                          <Select
                            value={bookingForm["Meal Plan"] ?? ""}
                            onValueChange={(v) => upd("Meal Plan", v)}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Room Only",
                                "B&B",
                                "Half Board",
                                "Full Board",
                                "All Inclusive",
                              ].map((v) => (
                                <SelectItem key={v} value={v}>
                                  {v}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingService === "Tour" && (
                    <div
                      className="rounded-2xl p-5 mb-4"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      <h3 className="text-white font-semibold mb-4">
                        Tour Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Tour Name",
                          "Destination",
                          "Adults",
                          "Children",
                          "Adult Price (₹)",
                          "Child Price (₹)",
                        ].map((f) => (
                          <div key={f}>
                            <Label className="text-slate-400 text-xs mb-1 block">
                              {f}
                            </Label>
                            <Input
                              className="bg-white/5 border-white/10 text-white"
                              value={bookingForm[f] ?? ""}
                              onChange={(e) => upd(f, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {bookingService === "Transfer" && (
                    <div
                      className="rounded-2xl p-5 mb-4"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      <h3 className="text-white font-semibold mb-4">
                        Transfer Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Pickup Location",
                          "Drop Location",
                          "Driver Name",
                          "Price (₹)",
                        ].map((f) => (
                          <div key={f}>
                            <Label className="text-slate-400 text-xs mb-1 block">
                              {f}
                            </Label>
                            <Input
                              className="bg-white/5 border-white/10 text-white"
                              value={bookingForm[f] ?? ""}
                              onChange={(e) => upd(f, e.target.value)}
                            />
                          </div>
                        ))}
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">
                            Vehicle Type
                          </Label>
                          <Select
                            value={bookingForm["Vehicle Type"] ?? ""}
                            onValueChange={(v) => upd("Vehicle Type", v)}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue placeholder="Select..." />
                            </SelectTrigger>
                            <SelectContent>
                              {["Sedan", "SUV", "Van", "Bus"].map((v) => (
                                <SelectItem key={v} value={v}>
                                  {v}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-slate-400 text-xs mb-1 block">
                            Pickup Time
                          </Label>
                          <Input
                            type="time"
                            className="bg-white/5 border-white/10 text-white"
                            style={{ colorScheme: "dark" }}
                            value={bookingForm["Pickup Time"] ?? ""}
                            onChange={(e) => upd("Pickup Time", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingService === "Visa" && (
                    <div
                      className="rounded-2xl p-5 mb-4"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${t.border}`,
                      }}
                    >
                      <h3 className="text-white font-semibold mb-4">
                        Visa Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          "Country",
                          "Visa Type",
                          "Processing Days",
                          "Fee (₹)",
                        ].map((f) => (
                          <div key={f}>
                            <Label className="text-slate-400 text-xs mb-1 block">
                              {f}
                            </Label>
                            <Input
                              className="bg-white/5 border-white/10 text-white"
                              value={bookingForm[f] ?? ""}
                              onChange={(e) => upd(f, e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Tabs>

                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={createBooking}
                  data-ocid="staff.booking.create_button"
                >
                  <Plus className="w-4 h-4 mr-2" /> Create Booking
                </Button>
              </div>

              <div>
                {generatedBooking ? (
                  <div
                    className="rounded-2xl p-6"
                    style={{
                      background: t.cardBg,
                      border: "1px solid rgba(16,185,129,0.4)",
                    }}
                    data-ocid="staff.booking.success_panel"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-emerald-400 font-bold">
                        Booking Created!
                      </h3>
                    </div>
                    <div className="mb-4">
                      <p className="text-slate-400 text-xs mb-1">Booking ID</p>
                      <p className="text-white font-mono font-bold text-xl">
                        {generatedBooking}
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="text-slate-400 text-xs mb-1">Service</p>
                      <p className="text-white text-sm">{bookingService}</p>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Button
                        size="sm"
                        className="w-full bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 border-0"
                        data-ocid="staff.booking.invoice_button"
                      >
                        <FileText className="w-4 h-4 mr-2" /> Download Invoice
                      </Button>
                      <Button
                        size="sm"
                        className="w-full bg-purple-600/30 text-purple-400 hover:bg-purple-600/50 border-0"
                        data-ocid="staff.booking.voucher_button"
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Voucher
                      </Button>
                      <Button
                        size="sm"
                        className="w-full bg-green-600/30 text-green-400 hover:bg-green-600/50 border-0"
                        data-ocid="staff.booking.whatsapp_button"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" /> Send WhatsApp
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="rounded-2xl p-6 text-center"
                    style={{
                      background: t.cardBg,
                      border: `1px solid ${t.border}`,
                    }}
                  >
                    <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">
                      Fill the form and click &ldquo;Create Booking&rdquo; to
                      generate a booking reference, invoice, and voucher.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* ── Task Board ── */}
          <TabsContent value="tasks">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
              {STAFF_MEMBERS.map((staff, si) => (
                <div
                  key={staff.name}
                  className="rounded-2xl p-5"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {staff.name}
                      </p>
                      <p className="text-slate-400 text-xs">{staff.role}</p>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                      {staff.tasks.length} tasks
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {staff.tasks.map((task, ti) => (
                      <div
                        key={`${task.client}-${ti}`}
                        className="rounded-xl p-3"
                        style={{
                          background: t.cardBg,
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5 text-xs text-blue-400">
                            {serviceIcon(task.service)}
                            {task.service}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setTaskStatuses((p) => ({
                                ...p,
                                [`${si}-${ti}`]:
                                  p[`${si}-${ti}`] === "Done"
                                    ? "New"
                                    : p[`${si}-${ti}`] === "In Progress"
                                      ? "Done"
                                      : "In Progress",
                              }))
                            }
                            className="text-xs px-1.5 py-0.5 rounded-full bg-white/5 text-slate-400 hover:bg-white/10"
                          >
                            <ChevronDown className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-slate-300 text-xs">{task.client}</p>
                        {statusBadge(
                          taskStatuses[`${si}-${ti}`] ?? task.status,
                        )}
                      </div>
                    ))}
                  </div>

                  {!assignForms[si] ? (
                    <Button
                      size="sm"
                      className="w-full bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50 border-0 h-8 text-xs"
                      onClick={() =>
                        setAssignForms((p) => ({ ...p, [si]: true }))
                      }
                      data-ocid={`staff.task.assign_button.${si + 1}`}
                    >
                      <Plus className="w-3 h-3 mr-1" /> Assign Task
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-8 text-xs">
                          <SelectValue placeholder="Service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {SERVICE_TYPES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        className="bg-white/5 border-white/10 text-white h-8 text-xs"
                        placeholder="Client name"
                      />
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-8 text-xs">
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          {["High", "Medium", "Low"].map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 h-7 text-xs"
                          onClick={() =>
                            setAssignForms((p) => ({ ...p, [si]: false }))
                          }
                          data-ocid={`staff.task.save_button.${si + 1}`}
                        >
                          Assign
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs text-slate-400"
                          onClick={() =>
                            setAssignForms((p) => ({ ...p, [si]: false }))
                          }
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ── Supplier Tracker ── */}
          <TabsContent value="supplier">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              {[
                { label: "Total Requests", value: 24, color: "#3B82F6" },
                { label: "Confirmed", value: 14, color: "#10B981" },
                { label: "Pending", value: 8, color: "#EAB308" },
                { label: "Overdue", value: 2, color: "#EF4444" },
              ].map((k, i) => (
                <div
                  key={k.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                  data-ocid={`staff.supplier.stat.${i + 1}`}
                >
                  <p className="text-slate-400 text-xs mb-1">{k.label}</p>
                  <p className="text-2xl font-bold" style={{ color: k.color }}>
                    {k.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: t.cardBg, border: `1px solid ${t.border}` }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: t.cardBg }}>
                    {[
                      "Booking ID",
                      "Service",
                      "Supplier",
                      "Request Sent",
                      "Status",
                      "Response",
                      "Action",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400 text-xs">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SUPPLIER_ROWS.map((row, i) => (
                    <TableRow
                      key={row.id}
                      className={`border-white/10 ${row.status === "Overdue" ? "bg-red-900/10" : ""}`}
                      data-ocid={`staff.supplier.row.${i + 1}`}
                    >
                      <TableCell className="text-emerald-400 text-xs font-mono">
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                          {row.service}
                        </span>
                      </TableCell>
                      <TableCell className="text-white text-sm">
                        {row.supplier}
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {row.sent}
                      </TableCell>
                      <TableCell>{statusBadge(row.status)}</TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {row.response}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border-0 h-6 text-xs"
                            data-ocid={`staff.supplier.reminder_button.${i + 1}`}
                          >
                            <Bell className="w-3 h-3 mr-1" /> Remind
                          </Button>
                          {row.status !== "Confirmed" && (
                            <Button
                              size="sm"
                              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0 h-6 text-xs"
                              data-ocid={`staff.supplier.confirm_button.${i + 1}`}
                            >
                              <CheckCircle className="w-3 h-3 mr-1" /> Confirm
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* ── Payments ── */}
          <TabsContent value="payments">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Record Payment Form */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.border}`,
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Record
                  Offline Payment
                </h3>
                <div className="space-y-3">
                  {[
                    "Agent / Client Name",
                    "Booking ID",
                    "Amount (₹)",
                    "Reference Number",
                  ].map((f) => (
                    <div key={f}>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        {f}
                      </Label>
                      <Input
                        className="bg-white/5 border-white/10 text-white"
                        value={payForm[f] ?? ""}
                        onChange={(e) =>
                          setPayForm((p) => ({ ...p, [f]: e.target.value }))
                        }
                      />
                    </div>
                  ))}
                  <div>
                    <Label className="text-slate-400 text-xs mb-1 block">
                      Payment Method
                    </Label>
                    <Select
                      value={payForm.Method ?? ""}
                      onValueChange={(v) =>
                        setPayForm((p) => ({ ...p, Method: v }))
                      }
                    >
                      <SelectTrigger
                        className="bg-white/5 border-white/10 text-white"
                        data-ocid="staff.payment.method_select"
                      >
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Bank Transfer", "UPI", "Cash", "Cheque"].map((v) => (
                          <SelectItem key={v} value={v}>
                            {v}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-xs mb-1 block">
                      Payment Date
                    </Label>
                    <Input
                      type="date"
                      className="bg-white/5 border-white/10 text-white"
                      style={{ colorScheme: "dark" }}
                      value={payForm.Date ?? ""}
                      onChange={(e) =>
                        setPayForm((p) => ({ ...p, Date: e.target.value }))
                      }
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-dashed border-white/20 text-slate-400 hover:bg-white/5 hover:text-white"
                    data-ocid="staff.payment.upload_button"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Upload Payment
                    Screenshot
                  </Button>
                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    data-ocid="staff.payment.submit_button"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Record Payment
                  </Button>
                </div>
              </div>

              {/* Payment History */}
              <div>
                <div
                  className="rounded-2xl p-4 mb-4"
                  style={{
                    background: t.cardBg,
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" /> Profit
                    Monitor
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "Supplier Cost",
                        value: "₹38,000",
                        color: "#EF4444",
                      },
                      {
                        label: "Agent Price",
                        value: "₹45,000",
                        color: "#3B82F6",
                      },
                      { label: "Profit", value: "₹7,000", color: "#10B981" },
                    ].map((p) => (
                      <div key={p.label} className="text-center">
                        <p className="text-slate-400 text-xs mb-1">{p.label}</p>
                        <p
                          className="font-bold text-base"
                          style={{ color: p.color }}
                        >
                          {p.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <div className="px-4 py-3 border-b border-white/10">
                    <h4 className="text-white font-semibold text-sm">
                      Payment History
                    </h4>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: t.cardBg }}>
                        {[
                          "Agent",
                          "Booking",
                          "Amount",
                          "Method",
                          "Date",
                          "Status",
                        ].map((h) => (
                          <TableHead key={h} className="text-slate-400 text-xs">
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {PAYMENT_HISTORY.map((p, i) => (
                        <TableRow
                          key={p.id}
                          className="border-white/10"
                          data-ocid={`staff.payment.row.${i + 1}`}
                        >
                          <TableCell className="text-white text-xs">
                            {p.agent}
                          </TableCell>
                          <TableCell className="text-emerald-400 text-xs font-mono">
                            {p.booking}
                          </TableCell>
                          <TableCell className="text-orange-400 text-xs font-medium">
                            {p.amount}
                          </TableCell>
                          <TableCell className="text-slate-400 text-xs">
                            {p.method}
                          </TableCell>
                          <TableCell className="text-slate-400 text-xs">
                            {p.date}
                          </TableCell>
                          <TableCell>{statusBadge(p.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ── Quotations ── */}
          <TabsContent value="quotations">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Builder */}
              <div>
                <div
                  className="rounded-2xl p-5 mb-4"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <h3 className="text-white font-semibold mb-4">
                    Quick Quotation Builder
                  </h3>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Client Name
                      </Label>
                      <Input
                        className="bg-white/5 border-white/10 text-white"
                        value={quoteClient}
                        onChange={(e) => setQuoteClient(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Destination
                      </Label>
                      <Input
                        className="bg-white/5 border-white/10 text-white"
                        value={quoteDest}
                        onChange={(e) => setQuoteDest(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Travel Dates
                      </Label>
                      <Input
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="e.g. 20-25 Mar"
                        value={quoteDates}
                        onChange={(e) => setQuoteDates(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Pax
                      </Label>
                      <Input
                        className="bg-white/5 border-white/10 text-white"
                        placeholder="e.g. 2 Adults"
                        value={quotePax}
                        onChange={(e) => setQuotePax(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    {quoteServices.map((s, i) => (
                      <div
                        key={`${s.type}-${i}`}
                        className="grid grid-cols-4 gap-2 items-center"
                      >
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                          {s.type}
                        </span>
                        <span className="text-slate-300 text-xs col-span-1 truncate">
                          {s.desc}
                        </span>
                        <span className="text-slate-400 text-xs">
                          ₹{s.cost.toLocaleString()}
                        </span>
                        <span className="text-emerald-400 text-xs font-medium">
                          ₹{s.sell.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    className="border-dashed border-white/20 text-slate-400 hover:bg-white/5 w-full mb-4"
                    onClick={() =>
                      setQuoteServices((p) => [
                        ...p,
                        {
                          type: "Hotel",
                          desc: "New service",
                          cost: 5000,
                          markup: 10,
                          sell: 5500,
                        },
                      ])
                    }
                    data-ocid="staff.quotation.add_service_button"
                  >
                    <Plus className="w-3 h-3 mr-1" /> Add Service Row
                  </Button>

                  <div
                    className="rounded-xl p-3 mb-4"
                    style={{ background: t.cardBg }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Total Cost</span>
                      <span className="text-red-400 font-medium">
                        ₹{totalCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Total Markup</span>
                      <span className="text-orange-400 font-medium">
                        ₹{(grandTotal - totalCost).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-white/10 pt-2 mt-2">
                      <span className="text-white">Grand Total</span>
                      <span className="text-emerald-400">
                        ₹{grandTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => setQuoteGenerated(true)}
                    data-ocid="staff.quotation.generate_button"
                  >
                    <FileText className="w-4 h-4 mr-2" /> Generate Quote
                  </Button>

                  {quoteGenerated && (
                    <div
                      className="mt-4 rounded-xl p-4"
                      style={{
                        background: "rgba(16,185,129,0.1)",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                      data-ocid="staff.quotation.preview_panel"
                    >
                      <p className="text-emerald-400 font-semibold mb-3">
                        Quote Preview — QT-
                        {Math.floor(100 + Math.random() * 900)}
                      </p>
                      <p className="text-slate-300 text-sm">
                        Client: {quoteClient || "—"}
                      </p>
                      <p className="text-slate-300 text-sm">
                        Destination: {quoteDest || "—"}
                      </p>
                      <p className="text-slate-300 text-sm">
                        Dates: {quoteDates || "—"} | Pax: {quotePax || "—"}
                      </p>
                      <p className="text-emerald-400 font-bold mt-2">
                        Total: ₹{grandTotal.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-3">
                        {[
                          { label: "Email", icon: Mail },
                          { label: "WhatsApp", icon: MessageSquare },
                          { label: "PDF", icon: Download },
                        ].map((b) => (
                          <Button
                            key={b.label}
                            size="sm"
                            className="flex-1 bg-white/10 text-white hover:bg-white/20 border-0 h-8 text-xs"
                            data-ocid={`staff.quotation.send_${b.label.toLowerCase()}_button`}
                          >
                            <b.icon className="w-3 h-3 mr-1" /> {b.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Saved Quotes */}
              <div>
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.border}`,
                  }}
                >
                  <div className="px-5 py-4 border-b border-white/10">
                    <h4 className="text-white font-semibold">Saved Quotes</h4>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow style={{ background: t.cardBg }}>
                        {[
                          "Quote ID",
                          "Client",
                          "Destination",
                          "Total",
                          "Date",
                          "Status",
                        ].map((h) => (
                          <TableHead key={h} className="text-slate-400 text-xs">
                            {h}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SAVED_QUOTES.map((q, i) => (
                        <TableRow
                          key={q.id}
                          className="border-white/10"
                          data-ocid={`staff.quote.row.${i + 1}`}
                        >
                          <TableCell className="text-emerald-400 text-xs font-mono">
                            {q.id}
                          </TableCell>
                          <TableCell className="text-white text-sm">
                            {q.client}
                          </TableCell>
                          <TableCell className="text-slate-300 text-sm">
                            {q.dest}
                          </TableCell>
                          <TableCell className="text-orange-400 font-medium text-sm">
                            {q.total}
                          </TableCell>
                          <TableCell className="text-slate-400 text-xs">
                            {q.date}
                          </TableCell>
                          <TableCell>{statusBadge(q.status)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-slate-600 text-xs border-t border-white/5">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
