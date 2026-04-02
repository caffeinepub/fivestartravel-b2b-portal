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
  Bell,
  CheckCircle,
  Circle,
  ClipboardList,
  Clock,
  CreditCard,
  FileText,
  InboxIcon,
  LogOut,
  Moon,
  Phone,
  Plus,
  Search,
  Sun,
  Ticket,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";

type StaffPage =
  | "overview"
  | "manual-booking"
  | "offline-queue"
  | "task-board"
  | "supplier-tracker"
  | "payments"
  | "quotation"
  | "tickets";

const STAFF_NAV: {
  icon: React.ElementType;
  label: string;
  key: StaffPage;
  section: string;
  badge?: string;
}[] = [
  { section: "Overview", icon: TrendingUp, label: "Overview", key: "overview" },
  {
    section: "Operations",
    icon: Wrench,
    label: "Manual Booking",
    key: "manual-booking",
  },
  {
    section: "Operations",
    icon: InboxIcon,
    label: "Offline Queue",
    key: "offline-queue",
    badge: "4",
  },
  {
    section: "Operations",
    icon: ClipboardList,
    label: "Task Board",
    key: "task-board",
  },
  {
    section: "Operations",
    icon: Phone,
    label: "Supplier Tracker",
    key: "supplier-tracker",
  },
  {
    section: "Finance",
    icon: CreditCard,
    label: "Payment Recording",
    key: "payments",
  },
  {
    section: "Documents",
    icon: FileText,
    label: "Quotation Builder",
    key: "quotation",
  },
  {
    section: "Support",
    icon: Ticket,
    label: "Support Tickets",
    key: "tickets",
    badge: "2",
  },
];

const QUEUE_DATA = [
  {
    id: "REQ-001",
    agent: "Rahul Sharma",
    service: "Hotel",
    destination: "Dubai",
    checkIn: "2024-04-01",
    pax: 4,
    notes: "Family suite preferred",
    submitted: "2024-03-15 09:30",
    status: "Pending",
  },
  {
    id: "REQ-002",
    agent: "Priya Patel",
    service: "Tour",
    destination: "Bali",
    checkIn: "2024-03-25",
    pax: 2,
    notes: "Private tour, no groups",
    submitted: "2024-03-15 10:15",
    status: "Pending",
  },
  {
    id: "REQ-003",
    agent: "Amit Kumar",
    service: "Transfer",
    destination: "Bangkok",
    checkIn: "2024-03-20",
    pax: 2,
    notes: "Airport to hotel",
    submitted: "2024-03-15 11:00",
    status: "Contacted",
  },
  {
    id: "REQ-004",
    agent: "Sunita Verma",
    service: "Visa",
    destination: "USA",
    checkIn: "",
    pax: 1,
    notes: "Tourist visa, 10-year",
    submitted: "2024-03-14 16:20",
    status: "Pending",
  },
];

const SUPPLIER_TRACKER_DATA = [
  {
    supplier: "Dubai Oasis DMC",
    booking: "FST-2024-001",
    service: "Desert Safari - 2024-03-20",
    contact: "+971 4 123 4567",
    status: "Awaiting Confirmation",
    dueIn: "5 days",
  },
  {
    supplier: "Ubud Retreat Hotel",
    booking: "FST-2024-003",
    service: "Hotel Stay - 2024-04-01",
    contact: "+62 361 123456",
    status: "Confirmed",
    dueIn: "—",
  },
  {
    supplier: "Bangkok City Tours",
    booking: "FST-2024-011",
    service: "City Tour - 2024-03-28",
    contact: "+66 2 123 4567",
    status: "Not Responded",
    dueIn: "Overdue",
  },
];

const TASKS_TODO = [
  {
    id: 1,
    title: "Confirm Desert Safari booking with Dubai Oasis",
    priority: "High",
    due: "Today",
  },
  {
    id: 2,
    title: "Process Visa application for Sunita Verma",
    priority: "High",
    due: "Today",
  },
  {
    id: 3,
    title: "Send hotel voucher to Rahul Sharma",
    priority: "Medium",
    due: "Tomorrow",
  },
];
const TASKS_IN_PROGRESS = [
  {
    id: 4,
    title: "Follow up with Bangkok City Tours on payment",
    priority: "High",
    due: "Today",
  },
  {
    id: 5,
    title: "Prepare group quotation for LuxeTrip",
    priority: "Medium",
    due: "2024-03-17",
  },
];
const TASKS_DONE = [
  {
    id: 6,
    title: "Issued flight voucher FST-2024-007",
    priority: "Low",
    due: "2024-03-14",
  },
  {
    id: 7,
    title: "Updated commission rates for Dubai packages",
    priority: "Low",
    due: "2024-03-13",
  },
];

const PAYMENTS_DATA = [
  {
    ref: "PAY-001",
    agent: "Rahul Sharma",
    amount: "₹42,500",
    type: "Bank Transfer",
    booking: "FST-2024-001",
    date: "2024-03-15",
    status: "Recorded",
  },
  {
    ref: "PAY-002",
    agent: "Priya Patel",
    amount: "₹18,200",
    type: "NEFT",
    booking: "FST-2024-002",
    date: "2024-03-14",
    status: "Recorded",
  },
  {
    ref: "PAY-003",
    agent: "Sunita Verma",
    amount: "₹95,000",
    type: "Cash",
    booking: "FST-2024-003",
    date: "2024-03-13",
    status: "Pending Verification",
  },
];

const TICKET_DATA = [
  {
    id: "TKT-A001",
    from: "Rahul Sharma",
    subject: "Booking confirmation delayed",
    priority: "High",
    status: "Assigned to Me",
    date: "2024-03-15",
  },
  {
    id: "TKT-A002",
    from: "Priya Patel",
    subject: "Hotel voucher not received",
    priority: "Medium",
    status: "Open",
    date: "2024-03-14",
  },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Confirmed: { bg: "#16A34A", color: "#fff" },
    Recorded: { bg: "#16A34A", color: "#fff" },
    Resolved: { bg: "#16A34A", color: "#fff" },
    Pending: { bg: "#F59E0B", color: "#fff" },
    "Pending Verification": { bg: "#F59E0B", color: "#fff" },
    Contacted: { bg: "#2563EB", color: "#fff" },
    "Awaiting Confirmation": { bg: "#2563EB", color: "#fff" },
    "Assigned to Me": { bg: "#0891B2", color: "#fff" },
    Open: { bg: "#F97316", color: "#fff" },
    "Not Responded": { bg: "#DC2626", color: "#fff" },
    Overdue: { bg: "#DC2626", color: "#fff" },
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

export function StaffDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const [activePage, setActivePage] = useState<StaffPage>("overview");
  const { theme, toggleTheme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;
  const TEAL = "#0891B2";

  // Manual booking form state
  const [mbService, setMbService] = useState("Flight");
  const [mbAgent, setMbAgent] = useState("");
  const [mbDest, setMbDest] = useState("");
  const [mbDate, setMbDate] = useState("");
  const [mbPax, setMbPax] = useState("");
  const [mbNotes, setMbNotes] = useState("");
  const [mbBookingId, setMbBookingId] = useState("");

  // Quotation line items
  const [quotItems, setQuotItems] = useState([
    {
      desc: "Return Flights (2 pax) — Mumbai to Dubai",
      cost: 28000,
      markup: 10,
    },
    { desc: "Hotel (3 nights) — Radisson Blu Dubai", cost: 18000, markup: 15 },
    { desc: "Desert Safari (2 pax)", cost: 9000, markup: 20 },
  ]);
  const [quotClient, setQuotClient] = useState("Mr. Rahul Sharma");
  const [quotRef] = useState(`QT-${Date.now().toString().slice(-6)}`);

  // Payment form
  const [payAgent, setPayAgent] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [payType, setPayType] = useState("Bank Transfer");
  const [payRef, setPayRef] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);

  const sections: string[] = [];
  const sectionMap: Record<string, typeof STAFF_NAV> = {};
  for (const item of STAFF_NAV) {
    if (!sections.includes(item.section)) {
      sections.push(item.section);
      sectionMap[item.section] = [];
    }
    sectionMap[item.section].push(item);
  }

  const quotTotal = quotItems.reduce(
    (sum, item) => sum + item.cost + (item.cost * item.markup) / 100,
    0,
  );

  const renderContent = () => {
    switch (activePage) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Tasks Due Today",
                  value: "5",
                  color: TEAL,
                  icon: ClipboardList,
                },
                {
                  label: "Pending Manual Bookings",
                  value: "4",
                  color: t.warning,
                  icon: InboxIcon,
                },
                {
                  label: "Supplier Confirmations Due",
                  value: "3",
                  color: t.error,
                  icon: Phone,
                },
                {
                  label: "Payments to Record",
                  value: "2",
                  color: t.primary,
                  icon: CreditCard,
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
                  Today’s Priority Tasks
                </h3>
                <div className="space-y-2">
                  {[
                    ...TASKS_TODO.filter((t) => t.due === "Today"),
                    ...TASKS_IN_PROGRESS.filter((t) => t.due === "Today"),
                  ].map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-lg"
                      style={{ background: t.inputBg }}
                    >
                      <Circle
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: t.muted }}
                      />
                      <span
                        className="text-sm flex-1"
                        style={{ color: t.text }}
                      >
                        {task.title}
                      </span>
                      <StatusBadge status={task.priority} />
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
                  Pending Offline Queue
                </h3>
                <div className="space-y-2">
                  {QUEUE_DATA.filter((q) => q.status === "Pending")
                    .slice(0, 3)
                    .map((q) => (
                      <div
                        key={q.id}
                        className="flex items-center justify-between p-3 rounded-lg"
                        style={{ background: t.inputBg }}
                      >
                        <div>
                          <p
                            className="text-sm font-medium"
                            style={{ color: t.text }}
                          >
                            {q.service} — {q.destination}
                          </p>
                          <p className="text-xs" style={{ color: t.muted }}>
                            {q.agent} · {q.pax} pax
                          </p>
                        </div>
                        <StatusBadge status={q.status} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "manual-booking":
        return (
          <div className="space-y-4">
            <div
              className="rounded-xl border p-6"
              style={{
                background: t.cardBg,
                borderColor: t.border,
                boxShadow: t.shadow,
              }}
            >
              <h3 className="font-semibold mb-5" style={{ color: t.text }}>
                Create Manual Booking
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: t.text }}>Service Type</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                    value={mbService}
                    onChange={(e) => setMbService(e.target.value)}
                  >
                    {[
                      "Flight",
                      "Hotel",
                      "Tour",
                      "Transfer",
                      "Visa",
                      "Package",
                      "Cruise",
                      "Railway",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Assign to Agent</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                    value={mbAgent}
                    onChange={(e) => setMbAgent(e.target.value)}
                  >
                    <option value="">Select Agent</option>
                    <option>Rahul Sharma — TravelPlus</option>
                    <option>Priya Patel — GoTravel</option>
                    <option>Sunita Verma — LuxeTrip</option>
                    <option>Amit Kumar — DreamVoyage</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Destination / Route</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. Mumbai to Dubai"
                    value={mbDest}
                    onChange={(e) => setMbDest(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Travel Date</Label>
                  <Input
                    type="date"
                    className="mt-1"
                    value={mbDate}
                    onChange={(e) => setMbDate(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Number of Pax</Label>
                  <Input
                    className="mt-1"
                    type="number"
                    placeholder="2"
                    value={mbPax}
                    onChange={(e) => setMbPax(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Total Amount (₹)</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. 45000"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div className="col-span-2">
                  <Label style={{ color: t.text }}>
                    Special Instructions / Notes
                  </Label>
                  <Textarea
                    className="mt-1"
                    rows={3}
                    value={mbNotes}
                    onChange={(e) => setMbNotes(e.target.value)}
                    placeholder="Any special requirements..."
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
              </div>
              {mbBookingId && (
                <div
                  className="mt-4 p-4 rounded-lg"
                  style={{
                    background: "#DCFCE7",
                    border: "1px solid #16A34A40",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle
                      className="w-5 h-5"
                      style={{ color: "#16A34A" }}
                    />
                    <div>
                      <p className="font-semibold" style={{ color: "#16A34A" }}>
                        Manual Booking Created!
                      </p>
                      <p className="text-sm" style={{ color: "#16A34A" }}>
                        Booking ID: <strong>{mbBookingId}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex gap-3 mt-5">
                <Button
                  style={{ background: TEAL, color: "#fff" }}
                  onClick={() => {
                    const id = `FST-MAN-${Date.now().toString().slice(-6)}`;
                    setMbBookingId(id);
                  }}
                >
                  Generate Booking ID
                </Button>
                <Button variant="outline">Save as Draft</Button>
              </div>
            </div>
          </div>
        );

      case "offline-queue":
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
              <div>
                <h3 className="font-semibold" style={{ color: t.text }}>
                  Offline Booking Requests
                </h3>
                <p className="text-xs mt-0.5" style={{ color: t.muted }}>
                  Requests from agents awaiting manual confirmation
                </p>
              </div>
              <span
                className="px-2 py-1 rounded text-xs font-bold"
                style={{ background: t.warning, color: "#fff" }}
              >
                4 Pending
              </span>
            </div>
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: t.border }}>
                  <TableHead style={{ color: t.muted }}>Request ID</TableHead>
                  <TableHead style={{ color: t.muted }}>Agent</TableHead>
                  <TableHead style={{ color: t.muted }}>Service</TableHead>
                  <TableHead style={{ color: t.muted }}>Destination</TableHead>
                  <TableHead style={{ color: t.muted }}>Pax</TableHead>
                  <TableHead style={{ color: t.muted }}>Notes</TableHead>
                  <TableHead style={{ color: t.muted }}>Submitted</TableHead>
                  <TableHead style={{ color: t.muted }}>Status</TableHead>
                  <TableHead style={{ color: t.muted }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {QUEUE_DATA.map((q) => (
                  <TableRow
                    key={q.id}
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
                      style={{ color: TEAL }}
                    >
                      {q.id}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {q.agent}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {q.service}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {q.destination}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {q.pax}
                    </TableCell>
                    <TableCell
                      className="text-xs max-w-[160px] truncate"
                      style={{ color: t.muted }}
                    >
                      {q.notes}
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.muted }}>
                      {q.submitted}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={q.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="text-xs h-7 px-2"
                          style={{ background: TEAL, color: "#fff" }}
                        >
                          Confirm
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
        );

      case "task-board":
        return (
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                title: "To Do",
                tasks: TASKS_TODO,
                color: t.muted,
                bg: t.inputBg,
              },
              {
                title: "In Progress",
                tasks: TASKS_IN_PROGRESS,
                color: t.primary,
                bg: "#EFF6FF",
              },
              {
                title: "Done",
                tasks: TASKS_DONE,
                color: "#16A34A",
                bg: "#DCFCE7",
              },
            ].map((col) => (
              <div
                key={col.title}
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
                  <h3
                    className="font-semibold text-sm"
                    style={{ color: t.text }}
                  >
                    {col.title}
                  </h3>
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${col.color}20`, color: col.color }}
                  >
                    {col.tasks.length}
                  </span>
                </div>
                <div className="p-3 space-y-2">
                  {col.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border"
                      style={{
                        background:
                          col.bg === t.inputBg
                            ? t.inputBg
                            : theme === "dark"
                              ? t.inputBg
                              : col.bg,
                        borderColor: t.border,
                      }}
                    >
                      <div className="flex items-start gap-2">
                        {col.title === "Done" ? (
                          <CheckCircle
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: "#16A34A" }}
                          />
                        ) : (
                          <Circle
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: t.muted }}
                          />
                        )}
                        <p className="text-xs flex-1" style={{ color: t.text }}>
                          {task.title}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <StatusBadge status={task.priority} />
                        <span
                          className="text-[10px]"
                          style={{ color: t.muted }}
                        >
                          {task.due}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 py-2 text-xs rounded-lg"
                    style={{ color: t.muted }}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Task
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case "supplier-tracker":
        return (
          <div className="space-y-4">
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
                  Supplier Confirmations Due
                </h3>
                <p className="text-xs mt-0.5" style={{ color: t.muted }}>
                  Track and follow up on pending supplier confirmations
                </p>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Supplier</TableHead>
                    <TableHead style={{ color: t.muted }}>Booking</TableHead>
                    <TableHead style={{ color: t.muted }}>Service</TableHead>
                    <TableHead style={{ color: t.muted }}>Contact</TableHead>
                    <TableHead style={{ color: t.muted }}>Due In</TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                    <TableHead style={{ color: t.muted }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {SUPPLIER_TRACKER_DATA.map((s) => (
                    <TableRow
                      key={s.booking}
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
                        {s.supplier}
                      </TableCell>
                      <TableCell
                        className="font-mono text-xs"
                        style={{ color: TEAL }}
                      >
                        {s.booking}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {s.service}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.text }}>
                        {s.contact}
                      </TableCell>
                      <TableCell>
                        <span
                          className="text-xs font-semibold"
                          style={{
                            color: s.dueIn === "Overdue" ? t.error : t.text,
                          }}
                        >
                          {s.dueIn}
                        </span>
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
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs h-7 px-2"
                          >
                            Email
                          </Button>
                          <Button
                            size="sm"
                            className="text-xs h-7 px-2"
                            style={{ background: "#25D366", color: "#fff" }}
                          >
                            WhatsApp
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

      case "payments":
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
                Record Offline Payment
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: t.text }}>Agent</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                    value={payAgent}
                    onChange={(e) => setPayAgent(e.target.value)}
                  >
                    <option value="">Select Agent</option>
                    <option>Rahul Sharma</option>
                    <option>Priya Patel</option>
                    <option>Sunita Verma</option>
                    <option>Amit Kumar</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>Amount (₹)</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. 45000"
                    value={payAmount}
                    onChange={(e) => setPayAmount(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Payment Type</Label>
                  <select
                    className="w-full mt-1 px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: t.inputBg,
                      border: `1px solid ${t.border}`,
                      color: t.text,
                    }}
                    value={payType}
                    onChange={(e) => setPayType(e.target.value)}
                  >
                    <option>Bank Transfer</option>
                    <option>NEFT</option>
                    <option>RTGS</option>
                    <option>Cash</option>
                    <option>Cheque</option>
                    <option>UPI</option>
                  </select>
                </div>
                <div>
                  <Label style={{ color: t.text }}>
                    Reference / UTR Number
                  </Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. UTR123456789"
                    value={payRef}
                    onChange={(e) => setPayRef(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Booking Reference</Label>
                  <Input
                    className="mt-1"
                    placeholder="e.g. FST-2024-001"
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Payment Date</Label>
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
              </div>
              {paySuccess && (
                <div
                  className="mt-3 px-3 py-2 rounded text-sm"
                  style={{ background: "#DCFCE7", color: "#16A34A" }}
                >
                  ✓ Payment recorded successfully!
                </div>
              )}
              <Button
                className="mt-4"
                style={{ background: TEAL, color: "#fff" }}
                onClick={() => {
                  setPaySuccess(true);
                  setTimeout(() => setPaySuccess(false), 3000);
                }}
              >
                Record Payment
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
              <div className="p-4 border-b" style={{ borderColor: t.border }}>
                <h3 className="font-semibold" style={{ color: t.text }}>
                  Recent Offline Payments
                </h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow style={{ borderColor: t.border }}>
                    <TableHead style={{ color: t.muted }}>Reference</TableHead>
                    <TableHead style={{ color: t.muted }}>Agent</TableHead>
                    <TableHead style={{ color: t.muted }}>Amount</TableHead>
                    <TableHead style={{ color: t.muted }}>Type</TableHead>
                    <TableHead style={{ color: t.muted }}>Booking</TableHead>
                    <TableHead style={{ color: t.muted }}>Date</TableHead>
                    <TableHead style={{ color: t.muted }}>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PAYMENTS_DATA.map((p) => (
                    <TableRow key={p.ref} style={{ borderColor: t.border }}>
                      <TableCell
                        className="font-mono text-xs"
                        style={{ color: TEAL }}
                      >
                        {p.ref}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {p.agent}
                      </TableCell>
                      <TableCell
                        className="text-sm font-semibold"
                        style={{ color: "#16A34A" }}
                      >
                        {p.amount}
                      </TableCell>
                      <TableCell className="text-sm" style={{ color: t.text }}>
                        {p.type}
                      </TableCell>
                      <TableCell
                        className="font-mono text-xs"
                        style={{ color: t.muted }}
                      >
                        {p.booking}
                      </TableCell>
                      <TableCell className="text-xs" style={{ color: t.muted }}>
                        {p.date}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={p.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        );

      case "quotation":
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
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold" style={{ color: t.text }}>
                    Quotation Builder
                  </h3>
                  <p className="text-xs mt-0.5" style={{ color: t.muted }}>
                    Ref: {quotRef}
                  </p>
                </div>
                <Button style={{ background: TEAL, color: "#fff" }}>
                  Export PDF
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <Label style={{ color: t.text }}>Client Name</Label>
                  <Input
                    className="mt-1"
                    value={quotClient}
                    onChange={(e) => setQuotClient(e.target.value)}
                    style={{
                      background: t.inputBg,
                      borderColor: t.border,
                      color: t.text,
                    }}
                  />
                </div>
                <div>
                  <Label style={{ color: t.text }}>Valid Until</Label>
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
              </div>
              <div
                className="rounded-lg overflow-hidden border mb-4"
                style={{ borderColor: t.border }}
              >
                <Table>
                  <TableHeader>
                    <TableRow
                      style={{ borderColor: t.border, background: t.inputBg }}
                    >
                      <TableHead style={{ color: t.muted }}>
                        Description
                      </TableHead>
                      <TableHead style={{ color: t.muted }}>Cost (₹)</TableHead>
                      <TableHead style={{ color: t.muted }}>Markup %</TableHead>
                      <TableHead style={{ color: t.muted }}>
                        Total (₹)
                      </TableHead>
                      <TableHead style={{ color: t.muted }}>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotItems.map((item, i) => (
                      <TableRow
                        key={item.desc || `quot-${i}`}
                        style={{ borderColor: t.border }}
                      >
                        <TableCell>
                          <input
                            className="bg-transparent text-sm outline-none w-full"
                            value={item.desc}
                            onChange={(e) =>
                              setQuotItems((prev) =>
                                prev.map((it, idx) =>
                                  idx === i
                                    ? { ...it, desc: e.target.value }
                                    : it,
                                ),
                              )
                            }
                            style={{ color: t.text }}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            className="bg-transparent text-sm outline-none w-20"
                            value={item.cost}
                            onChange={(e) =>
                              setQuotItems((prev) =>
                                prev.map((it, idx) =>
                                  idx === i
                                    ? { ...it, cost: Number(e.target.value) }
                                    : it,
                                ),
                              )
                            }
                            style={{ color: t.text }}
                          />
                        </TableCell>
                        <TableCell>
                          <input
                            type="number"
                            className="bg-transparent text-sm outline-none w-16"
                            value={item.markup}
                            onChange={(e) =>
                              setQuotItems((prev) =>
                                prev.map((it, idx) =>
                                  idx === i
                                    ? { ...it, markup: Number(e.target.value) }
                                    : it,
                                ),
                              )
                            }
                            style={{ color: t.text }}
                          />
                        </TableCell>
                        <TableCell
                          className="font-semibold text-sm"
                          style={{ color: TEAL }}
                        >
                          ₹
                          {(
                            item.cost +
                            (item.cost * item.markup) / 100
                          ).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            className="text-xs"
                            style={{ color: t.error }}
                            onClick={() =>
                              setQuotItems((prev) =>
                                prev.filter((_, idx) => idx !== i),
                              )
                            }
                          >
                            Remove
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setQuotItems((prev) => [
                      ...prev,
                      { desc: "New Item", cost: 0, markup: 10 },
                    ])
                  }
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Line Item
                </Button>
                <div className="text-right">
                  <p className="text-xs" style={{ color: t.muted }}>
                    Grand Total
                  </p>
                  <p className="text-2xl font-bold" style={{ color: TEAL }}>
                    ₹{quotTotal.toLocaleString()}
                  </p>
                </div>
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
                Assigned Support Tickets
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
                {TICKET_DATA.map((tk) => (
                  <TableRow
                    key={tk.id}
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
                      style={{ color: TEAL }}
                    >
                      {tk.id}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {tk.from}
                    </TableCell>
                    <TableCell className="text-sm" style={{ color: t.text }}>
                      {tk.subject}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={tk.priority} />
                    </TableCell>
                    <TableCell className="text-xs" style={{ color: t.muted }}>
                      {tk.date}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={tk.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          className="text-xs h-7 px-2"
                          style={{ background: TEAL, color: "#fff" }}
                        >
                          Resolve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                        >
                          Escalate
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        );

      default:
        return null;
    }
  };

  const pageTitle: Record<StaffPage, string> = {
    overview: "Staff Operations",
    "manual-booking": "Manual Booking",
    "offline-queue": "Offline Queue",
    "task-board": "Task Board",
    "supplier-tracker": "Supplier Tracker",
    payments: "Payment Recording",
    quotation: "Quotation Builder",
    tickets: "Support Tickets",
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
                background: `linear-gradient(135deg, ${TEAL}, #0E7490)`,
                color: "#fff",
              }}
            >
              STAFF PORTAL
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
                      background: isActive ? `${TEAL}15` : "transparent",
                      borderLeft: isActive
                        ? `3px solid ${TEAL}`
                        : "3px solid transparent",
                      color: isActive ? TEAL : t.sidebarText,
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
                    data-ocid={`staff.nav.item.${idx + 1}`}
                  >
                    <item.icon
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: isActive ? TEAL : t.muted }}
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
              style={{ background: `${TEAL}20`, color: TEAL }}
            >
              OP
            </div>
            <div className="min-w-0">
              <p
                className="text-xs font-semibold truncate"
                style={{ color: t.text }}
              >
                Operations Staff
              </p>
              <p className="text-[10px]" style={{ color: t.muted }}>
                Staff Account
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
            data-ocid="staff.logout.button"
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
              Staff Portal
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
                placeholder="Search bookings, tasks, agents..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: t.text }}
                data-ocid="staff.search_input"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ background: t.inputBg, border: `1px solid ${t.border}` }}
              data-ocid="staff.theme.toggle"
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
              data-ocid="staff.notifications.button"
            >
              <Bell className="w-4 h-4" style={{ color: t.muted }} />
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                style={{ background: t.error, color: "#fff" }}
              >
                2
              </span>
            </button>
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
              style={{ background: `${TEAL}15`, border: `1px solid ${TEAL}40` }}
            >
              <Clock className="w-4 h-4" style={{ color: TEAL }} />
              <span className="text-sm font-semibold" style={{ color: TEAL }}>
                Staff
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-5 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
}
