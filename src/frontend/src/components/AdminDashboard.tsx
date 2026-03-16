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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertTriangle,
  Bell,
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Globe,
  Info,
  List,
  LogOut,
  Plane,
  Plus,
  Search,
  Settings,
  Shield,
  Sliders,
  Star,
  Ticket,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

export function AdminDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const [agentFilter, setAgentFilter] = useState("all");
  const [txTypeFilter, setTxTypeFilter] = useState("all");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [newRegistrations, setNewRegistrations] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [announcementEnabled, setAnnouncementEnabled] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const [apiKey, setApiKey] = useState(
    "7114315c476d94-4ef2-4e21-83e8-527d56a0c529",
  );
  const [showKey, setShowKey] = useState(false);
  const [commissions, setCommissions] = useState({
    flight: "2",
    hotel: "3",
    tour: "5",
    visa: "4",
    transfer: "3",
  });

  const [agents, setAgents] = useState([
    {
      name: "Rahul Sharma",
      agency: "TravelPro India",
      city: "Mumbai",
      phone: "+91-9876543210",
      regDate: "2024-01-15",
      bookings: 248,
      balance: "₹45,250",
      status: "Active",
    },
    {
      name: "Priya Menon",
      agency: "Globe Trotters",
      city: "Bangalore",
      phone: "+91-9845123456",
      regDate: "2024-02-20",
      bookings: 182,
      balance: "₹32,100",
      status: "Active",
    },
    {
      name: "Arun Kumar",
      agency: "Dream Voyages",
      city: "Delhi",
      phone: "+91-9711234567",
      regDate: "2024-03-05",
      bookings: 145,
      balance: "₹28,750",
      status: "Active",
    },
    {
      name: "Sonal Patel",
      agency: "Sunrise Travel",
      city: "Pune",
      phone: "+91-9823456789",
      regDate: "2024-03-18",
      bookings: 98,
      balance: "₹18,200",
      status: "Active",
    },
    {
      name: "Vikram Singh",
      agency: "Nav Travel",
      city: "Chandigarh",
      phone: "+91-9814567890",
      regDate: "2024-04-01",
      bookings: 67,
      balance: "₹12,500",
      status: "Active",
    },
    {
      name: "Neha Joshi",
      agency: "Wanderlust Co",
      city: "Jaipur",
      phone: "+91-9765432109",
      regDate: "2025-01-10",
      bookings: 0,
      balance: "₹0",
      status: "Pending",
    },
    {
      name: "Karthik R",
      agency: "South Travels",
      city: "Chennai",
      phone: "+91-9944332211",
      regDate: "2025-01-22",
      bookings: 0,
      balance: "₹0",
      status: "Pending",
    },
    {
      name: "Meena Das",
      agency: "Bliss Holidays",
      city: "Kolkata",
      phone: "+91-9830123456",
      regDate: "2025-02-01",
      bookings: 0,
      balance: "₹0",
      status: "Pending",
    },
    {
      name: "Rajesh Verma",
      agency: "VR Tours",
      city: "Lucknow",
      phone: "+91-9792345678",
      regDate: "2024-11-14",
      bookings: 22,
      balance: "₹4,400",
      status: "Suspended",
    },
    {
      name: "Divya Nair",
      agency: "Kerala Trips",
      city: "Kochi",
      phone: "+91-9895678901",
      regDate: "2024-06-30",
      bookings: 55,
      balance: "₹9,800",
      status: "Active",
    },
    {
      name: "Suresh Babu",
      agency: "Deccan Travel",
      city: "Hyderabad",
      phone: "+91-9866789012",
      regDate: "2024-07-20",
      bookings: 41,
      balance: "₹7,200",
      status: "Active",
    },
    {
      name: "Anita Sharma",
      agency: "Pink City Tours",
      city: "Jaipur",
      phone: "+91-9929012345",
      regDate: "2024-09-05",
      bookings: 33,
      balance: "₹6,100",
      status: "Active",
    },
  ]);

  const activity = [
    {
      icon: CheckCircle,
      desc: "New booking confirmed — Flight DEL→DXB",
      user: "Rahul Sharma",
      time: "2 min ago",
      status: "Success",
    },
    {
      icon: Users,
      desc: "New agent registration request",
      user: "Neha Joshi",
      time: "15 min ago",
      status: "Pending",
    },
    {
      icon: DollarSign,
      desc: "Wallet top-up ₹25,000",
      user: "Priya Menon",
      time: "32 min ago",
      status: "Success",
    },
    {
      icon: XCircle,
      desc: "Hotel booking cancelled — Atlantis Dubai",
      user: "Arun Kumar",
      time: "1 hr ago",
      status: "Cancelled",
    },
    {
      icon: CheckCircle,
      desc: "Visa application approved — UAE",
      user: "Sonal Patel",
      time: "2 hr ago",
      status: "Success",
    },
    {
      icon: Users,
      desc: "New agent registration request",
      user: "Karthik R",
      time: "3 hr ago",
      status: "Pending",
    },
    {
      icon: TrendingUp,
      desc: "Commission payout processed",
      user: "System",
      time: "5 hr ago",
      status: "Success",
    },
    {
      icon: Activity,
      desc: "API rate limit warning — TripJack",
      user: "System",
      time: "6 hr ago",
      status: "Warning",
    },
    {
      icon: CheckCircle,
      desc: "Tour package booked — Yas Island",
      user: "Vikram Singh",
      time: "8 hr ago",
      status: "Success",
    },
    {
      icon: Users,
      desc: "New agent registration request",
      user: "Meena Das",
      time: "10 hr ago",
      status: "Pending",
    },
  ];

  const transactions = [
    {
      date: "10 Mar 2026",
      agent: "Rahul Sharma",
      type: "Booking",
      module: "Flight",
      amount: "₹24,500",
      status: "Success",
    },
    {
      date: "10 Mar 2026",
      agent: "Priya Menon",
      type: "Top-up",
      module: "Wallet",
      amount: "₹50,000",
      status: "Success",
    },
    {
      date: "09 Mar 2026",
      agent: "Arun Kumar",
      type: "Booking",
      module: "Hotel",
      amount: "₹18,200",
      status: "Success",
    },
    {
      date: "09 Mar 2026",
      agent: "Sonal Patel",
      type: "Refund",
      module: "Tour",
      amount: "₹8,500",
      status: "Refunded",
    },
    {
      date: "09 Mar 2026",
      agent: "Vikram Singh",
      type: "Commission",
      module: "Flight",
      amount: "₹1,200",
      status: "Paid",
    },
    {
      date: "08 Mar 2026",
      agent: "Rahul Sharma",
      type: "Booking",
      module: "Visa",
      amount: "₹6,200",
      status: "Success",
    },
    {
      date: "08 Mar 2026",
      agent: "Deepa Nair",
      type: "Booking",
      module: "Transfer",
      amount: "₹3,800",
      status: "Success",
    },
    {
      date: "08 Mar 2026",
      agent: "Priya Menon",
      type: "Commission",
      module: "Hotel",
      amount: "₹2,700",
      status: "Paid",
    },
    {
      date: "07 Mar 2026",
      agent: "Arun Kumar",
      type: "Top-up",
      module: "Wallet",
      amount: "₹25,000",
      status: "Success",
    },
    {
      date: "07 Mar 2026",
      agent: "Vikram Singh",
      type: "Booking",
      module: "Tour",
      amount: "₹12,400",
      status: "Success",
    },
    {
      date: "07 Mar 2026",
      agent: "Sonal Patel",
      type: "Refund",
      module: "Flight",
      amount: "₹24,500",
      status: "Refunded",
    },
    {
      date: "06 Mar 2026",
      agent: "Rahul Sharma",
      type: "Commission",
      module: "Tour",
      amount: "₹3,200",
      status: "Paid",
    },
    {
      date: "06 Mar 2026",
      agent: "Deepa Nair",
      type: "Booking",
      module: "Cruise",
      amount: "₹45,000",
      status: "Success",
    },
    {
      date: "05 Mar 2026",
      agent: "Priya Menon",
      type: "Booking",
      module: "Flight",
      amount: "₹22,000",
      status: "Success",
    },
    {
      date: "05 Mar 2026",
      agent: "Arun Kumar",
      type: "Top-up",
      module: "Wallet",
      amount: "₹10,000",
      status: "Success",
    },
  ];

  function approveAgent(i: number) {
    setAgents((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, status: "Active" } : a)),
    );
  }
  function suspendAgent(i: number) {
    setAgents((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, status: "Suspended" } : a)),
    );
  }

  const filteredAgents = agents.filter(
    (a) =>
      agentFilter === "all" ||
      a.status.toLowerCase() === agentFilter.toLowerCase(),
  );
  const filteredTx = transactions.filter(
    (t) =>
      txTypeFilter === "all" ||
      t.type.toLowerCase() === txTypeFilter.toLowerCase(),
  );

  const statusColor: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Suspended: "bg-red-100 text-red-700",
    Success: "bg-green-100 text-green-700",
    Refunded: "bg-blue-100 text-blue-700",
    Paid: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
    Warning: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="min-h-screen" style={{ background: "#0F172A" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(135deg,#7C3AED,#A78BFA)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">
              FiveStar Travel — Admin Portal
            </h1>
            <p className="text-purple-200 text-xs">
              Platform Administration Dashboard
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate("home")}
          className="border-white/30 text-white hover:bg-white/10"
          data-ocid="admin.logout_button"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-white/5 border border-white/10 flex flex-wrap h-auto gap-1 p-1">
            <TabsTrigger
              value="overview"
              data-ocid="admin.overview.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Activity className="w-4 h-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              data-ocid="admin.agents.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Users className="w-4 h-4 mr-2" /> Agents
            </TabsTrigger>
            <TabsTrigger
              value="financials"
              data-ocid="admin.financials.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <DollarSign className="w-4 h-4 mr-2" /> Financials
            </TabsTrigger>
            <TabsTrigger
              value="suppliers"
              data-ocid="admin.suppliers.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Building2 className="w-4 h-4 mr-2" /> Suppliers
            </TabsTrigger>
            <TabsTrigger
              value="markup"
              data-ocid="admin.markup.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Sliders className="w-4 h-4 mr-2" /> Markup Rules
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              data-ocid="admin.logs.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <List className="w-4 h-4 mr-2" /> System Logs
            </TabsTrigger>
            <TabsTrigger
              value="automation"
              data-ocid="admin.automation.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Zap className="w-4 h-4 mr-2" /> Automation
            </TabsTrigger>
            <TabsTrigger
              value="manual-booking"
              data-ocid="admin.manual_booking.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Plus className="w-4 h-4 mr-2" /> Manual Booking
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              data-ocid="admin.settings.tab"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-300"
            >
              <Settings className="w-4 h-4 mr-2" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: "Total Agents",
                  value: "1,247",
                  icon: Users,
                  color: "#1E3A8A",
                },
                {
                  label: "Total Bookings",
                  value: "48,320",
                  icon: TrendingUp,
                  color: "#F97316",
                },
                {
                  label: "Platform Revenue",
                  value: "₹2.4Cr",
                  icon: DollarSign,
                  color: "#16A34A",
                },
                {
                  label: "Pending Approvals",
                  value: "8",
                  icon: Clock,
                  color: "#D97706",
                },
                {
                  label: "Active Suppliers",
                  value: "34",
                  icon: Building2,
                  color: "#7C3AED",
                },
                {
                  label: "Support Tickets",
                  value: "12",
                  icon: Ticket,
                  color: "#DC2626",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`admin.stat.card.${i + 1}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: `${s.color}33` }}
                    >
                      <s.icon className="w-5 h-5" style={{ color: s.color }} />
                    </div>
                    <span className="text-slate-400 text-sm">{s.label}</span>
                  </div>
                  <p className="text-white text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div
                className="md:col-span-2 rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {activity.map((a, i) => (
                    <div
                      key={a.desc}
                      className="flex items-center gap-3 py-2 border-b border-white/5"
                      data-ocid={`admin.activity.row.${i + 1}`}
                    >
                      <a.icon
                        className="w-4 h-4 flex-shrink-0"
                        style={{
                          color:
                            a.status === "Success"
                              ? "#4ADE80"
                              : a.status === "Pending"
                                ? "#FBBF24"
                                : a.status === "Warning"
                                  ? "#FB923C"
                                  : "#F87171",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-sm truncate">
                          {a.desc}
                        </p>
                        <p className="text-slate-500 text-xs">{a.user}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-slate-500 text-xs">{a.time}</p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${statusColor[a.status]}`}
                        >
                          {a.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    style={{
                      background: "rgba(249,115,22,0.15)",
                      color: "#FB923C",
                      border: "1px solid rgba(249,115,22,0.3)",
                    }}
                    data-ocid="admin.approve_pending.button"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Approve Pending
                    Agents
                  </Button>
                  <Button
                    className="w-full justify-start"
                    style={{
                      background: "rgba(37,99,235,0.15)",
                      color: "#60A5FA",
                      border: "1px solid rgba(37,99,235,0.3)",
                    }}
                    data-ocid="admin.view_reports.button"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" /> View Reports
                  </Button>
                  <Button
                    className="w-full justify-start"
                    style={{
                      background: "rgba(124,58,237,0.15)",
                      color: "#A78BFA",
                      border: "1px solid rgba(124,58,237,0.3)",
                    }}
                    data-ocid="admin.manage_suppliers.button"
                  >
                    <Building2 className="w-4 h-4 mr-2" /> Manage Suppliers
                  </Button>
                  <Button
                    className="w-full justify-start"
                    style={{
                      background: "rgba(30,58,138,0.3)",
                      color: "#93C5FD",
                      border: "1px solid rgba(30,58,138,0.5)",
                    }}
                    data-ocid="admin.system_settings.button"
                  >
                    <Settings className="w-4 h-4 mr-2" /> System Settings
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Agents */}
          <TabsContent value="agents">
            <div className="flex gap-2 mb-4 flex-wrap">
              {["all", "Active", "Pending", "Suspended"].map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={agentFilter === f ? "default" : "outline"}
                  onClick={() => setAgentFilter(f)}
                  className={
                    agentFilter === f
                      ? "bg-purple-600"
                      : "border-white/20 text-slate-300 hover:bg-white/10"
                  }
                  data-ocid={"admin.agents.filter.tab"}
                >
                  {f === "all" ? "All" : f}
                </Button>
              ))}
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    <TableHead className="text-slate-400">Agent</TableHead>
                    <TableHead className="text-slate-400">City</TableHead>
                    <TableHead className="text-slate-400">Phone</TableHead>
                    <TableHead className="text-slate-400">Reg. Date</TableHead>
                    <TableHead className="text-slate-400">Bookings</TableHead>
                    <TableHead className="text-slate-400">Balance</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((a, i) => (
                    <TableRow
                      key={a.name}
                      className="border-white/10"
                      data-ocid={`admin.agents.row.${i + 1}`}
                    >
                      <TableCell>
                        <p className="text-white font-medium">{a.name}</p>
                        <p className="text-slate-400 text-xs">{a.agency}</p>
                      </TableCell>
                      <TableCell className="text-slate-400">{a.city}</TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {a.phone}
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {a.regDate}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {a.bookings}
                      </TableCell>
                      <TableCell className="text-green-400 font-medium">
                        {a.balance}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[a.status]}`}
                        >
                          {a.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {a.status === "Pending" && (
                            <Button
                              size="sm"
                              onClick={() => approveAgent(agents.indexOf(a))}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs h-7"
                              data-ocid={`admin.agents.approve_button.${i + 1}`}
                            >
                              Approve
                            </Button>
                          )}
                          {a.status === "Active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => suspendAgent(agents.indexOf(a))}
                              className="border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs h-7"
                              data-ocid={`admin.agents.suspend_button.${i + 1}`}
                            >
                              Suspend
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-slate-300 hover:bg-white/10 text-xs h-7"
                            data-ocid={`admin.agents.view_button.${i + 1}`}
                          >
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Financials */}
          <TabsContent value="financials">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Revenue", value: "₹2.4Cr", color: "#16A34A" },
                {
                  label: "Platform Fees",
                  value: "₹18,40,000",
                  color: "#F97316",
                },
                {
                  label: "Payouts Pending",
                  value: "₹3,20,000",
                  color: "#D97706",
                },
                {
                  label: "Wallet Balances",
                  value: "₹45,82,500",
                  color: "#7C3AED",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`admin.financial.card.${i + 1}`}
                >
                  <p className="text-slate-400 text-sm mb-2">{s.label}</p>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div
              className="rounded-2xl p-4 mb-4 flex gap-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Select value={txTypeFilter} onValueChange={setTxTypeFilter}>
                <SelectTrigger
                  className="w-44 bg-white/5 border-white/10 text-white"
                  data-ocid="admin.tx.type_select"
                >
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="commission">Commission</SelectItem>
                  <SelectItem value="top-up">Top-up</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    <TableHead className="text-slate-400">Date</TableHead>
                    <TableHead className="text-slate-400">Agent</TableHead>
                    <TableHead className="text-slate-400">Type</TableHead>
                    <TableHead className="text-slate-400">Module</TableHead>
                    <TableHead className="text-slate-400">Amount</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTx.map((t, i) => (
                    <TableRow
                      key={`${t.date}-${t.agent}-${t.type}`}
                      className="border-white/10"
                      data-ocid={`admin.tx.row.${i + 1}`}
                    >
                      <TableCell className="text-slate-400 text-xs">
                        {t.date}
                      </TableCell>
                      <TableCell className="text-white text-sm">
                        {t.agent}
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {t.type}
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {t.module}
                      </TableCell>
                      <TableCell className="text-orange-400 font-medium">
                        {t.amount}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[t.status]}`}
                        >
                          {t.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              {/* API Config */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-400" /> API
                  Configuration
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-400 text-sm">
                      TripJack API Key
                    </Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        type={showKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="bg-white/5 border-white/10 text-white"
                        data-ocid="admin.api.key_input"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowKey(!showKey)}
                        className="border-white/20 text-slate-300 hover:bg-white/10"
                        data-ocid="admin.api.toggle_key_button"
                      >
                        {showKey ? "Hide" : "Show"}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Base URL</Label>
                    <Input
                      defaultValue="https://apitest.tripjack.com/"
                      className="mt-1 bg-white/5 border-white/10 text-white"
                      data-ocid="admin.api.base_url_input"
                    />
                  </div>
                  <Button
                    style={{ background: "#7C3AED" }}
                    className="text-white hover:opacity-90"
                    data-ocid="admin.api.save_button"
                  >
                    Save API Config
                  </Button>
                </div>
              </div>

              {/* Commission Settings */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-orange-400" /> Commission
                  Settings
                </h3>
                <div className="space-y-3">
                  {(
                    ["flight", "hotel", "tour", "visa", "transfer"] as const
                  ).map((mod) => (
                    <div
                      key={mod}
                      className="flex items-center justify-between"
                    >
                      <Label className="text-slate-300 capitalize">{mod}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={commissions[mod]}
                          onChange={(e) =>
                            setCommissions((prev) => ({
                              ...prev,
                              [mod]: e.target.value,
                            }))
                          }
                          className="w-20 bg-white/5 border-white/10 text-white text-center"
                          data-ocid={`admin.commission.${mod}_input`}
                        />
                        <span className="text-slate-400">%</span>
                      </div>
                    </div>
                  ))}
                  <Button
                    style={{ background: "#F97316" }}
                    className="text-white hover:opacity-90 mt-2"
                    data-ocid="admin.commission.save_button"
                  >
                    Save Commissions
                  </Button>
                </div>
              </div>

              {/* Platform Settings */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-400" /> Platform Settings
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      label: "Maintenance Mode",
                      value: maintenanceMode,
                      setter: setMaintenanceMode,
                      id: "admin.settings.maintenance_switch",
                    },
                    {
                      label: "New Registrations",
                      value: newRegistrations,
                      setter: setNewRegistrations,
                      id: "admin.settings.registrations_switch",
                    },
                    {
                      label: "Email Notifications",
                      value: emailNotifications,
                      setter: setEmailNotifications,
                      id: "admin.settings.email_switch",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between"
                    >
                      <Label className="text-slate-300">{s.label}</Label>
                      <Switch
                        checked={s.value}
                        onCheckedChange={s.setter}
                        data-ocid={s.id}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Announcement */}
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" /> Announcement
                  Banner
                </h3>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Enter announcement text..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
                    rows={3}
                    data-ocid="admin.announcement.textarea"
                  />
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-300">Enable Banner</Label>
                    <Switch
                      checked={announcementEnabled}
                      onCheckedChange={setAnnouncementEnabled}
                      data-ocid="admin.announcement.switch"
                    />
                  </div>
                  <Button
                    style={{ background: "#16A34A" }}
                    className="text-white hover:opacity-90 w-full"
                    data-ocid="admin.announcement.save_button"
                  >
                    Save Announcement
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Suppliers */}
          <TabsContent value="suppliers">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Suppliers", value: 34, color: "#7C3AED" },
                { label: "Active", value: 28, color: "#16A34A" },
                { label: "Pending Approval", value: 4, color: "#D97706" },
                { label: "Blocked", value: 2, color: "#DC2626" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`admin.suppliers.stat.${i + 1}`}
                >
                  <p className="text-slate-400 text-xs mb-1">{s.label}</p>
                  <p className="text-3xl font-bold" style={{ color: s.color }}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    {[
                      "Company",
                      "Contact",
                      "City",
                      "Services",
                      "Rating",
                      "Priority",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400 text-xs">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Alpine Hotels Group",
                      contact: "Ravi Kumar",
                      city: "Mumbai",
                      services: ["Hotel", "Tour"],
                      rating: 4.8,
                      priority: 1,
                      status: "Active",
                    },
                    {
                      name: "SkyWings Aviation",
                      contact: "Neha Sharma",
                      city: "Delhi",
                      services: ["Flight"],
                      rating: 4.5,
                      priority: 2,
                      status: "Active",
                    },
                    {
                      name: "TransAsia Transfers",
                      contact: "Ali Hassan",
                      city: "Chennai",
                      services: ["Transfer"],
                      rating: 4.2,
                      priority: 3,
                      status: "Active",
                    },
                    {
                      name: "VisaXpress",
                      contact: "Priya Singh",
                      city: "Bangalore",
                      services: ["Visa"],
                      rating: 4.7,
                      priority: 1,
                      status: "Active",
                    },
                    {
                      name: "OceanBlue Cruises",
                      contact: "David Nair",
                      city: "Kochi",
                      services: ["Cruise"],
                      rating: 4.6,
                      priority: 2,
                      status: "Active",
                    },
                    {
                      name: "SecureTravel Insurance",
                      contact: "Anjali Patel",
                      city: "Ahmedabad",
                      services: ["Insurance"],
                      rating: 4.3,
                      priority: 3,
                      status: "Active",
                    },
                    {
                      name: "Heritage Tours India",
                      contact: "Mohan Das",
                      city: "Jaipur",
                      services: ["Tour", "Transfer"],
                      rating: 3.9,
                      priority: 4,
                      status: "Active",
                    },
                    {
                      name: "Pacific Hotel Network",
                      contact: "Chen Wei",
                      city: "Hyderabad",
                      services: ["Hotel"],
                      rating: 4.1,
                      priority: 3,
                      status: "Pending",
                    },
                    {
                      name: "FastTrack Visas",
                      contact: "Rahul Gupta",
                      city: "Pune",
                      services: ["Visa"],
                      rating: 3.5,
                      priority: 5,
                      status: "Pending",
                    },
                    {
                      name: "GlobalBus Transfers",
                      contact: "Sanjay Mehta",
                      city: "Kolkata",
                      services: ["Transfer"],
                      rating: 2.8,
                      priority: 5,
                      status: "Blocked",
                    },
                    {
                      name: "Sunset Beach Resorts",
                      contact: "Lisa D'Souza",
                      city: "Goa",
                      services: ["Hotel", "Tour"],
                      rating: 4.9,
                      priority: 1,
                      status: "Active",
                    },
                    {
                      name: "NorthStar Aviation",
                      contact: "Vikram Rao",
                      city: "Chandigarh",
                      services: ["Flight"],
                      rating: 4.0,
                      priority: 4,
                      status: "Pending",
                    },
                  ].map((sup, i) => (
                    <TableRow
                      key={sup.name}
                      className="border-white/10"
                      data-ocid={`admin.suppliers.row.${i + 1}`}
                    >
                      <TableCell className="text-white text-sm font-medium">
                        {sup.name}
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {sup.contact}
                      </TableCell>
                      <TableCell className="text-slate-400 text-xs">
                        {sup.city}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {sup.services.map((s) => (
                            <span
                              key={s}
                              className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-400 text-sm font-medium">
                          {"★".repeat(Math.floor(sup.rating))} {sup.rating}
                        </span>
                      </TableCell>
                      <TableCell>
                        <select
                          className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-2 py-1"
                          defaultValue={sup.priority}
                          data-ocid={`admin.suppliers.priority_select.${i + 1}`}
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option
                              key={n}
                              value={n}
                              style={{ background: "#1e293b" }}
                            >
                              {n}
                            </option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium ${sup.status === "Active" ? "bg-green-500/20 text-green-400" : sup.status === "Pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}
                        >
                          {sup.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {sup.status === "Pending" && (
                            <Button
                              size="sm"
                              className="bg-green-600/30 text-green-400 hover:bg-green-600/50 border-0 h-6 text-xs"
                              data-ocid={`admin.suppliers.approve_button.${i + 1}`}
                            >
                              Approve
                            </Button>
                          )}
                          {sup.status !== "Blocked" && (
                            <Button
                              size="sm"
                              className="bg-red-600/30 text-red-400 hover:bg-red-600/50 border-0 h-6 text-xs"
                              data-ocid={`admin.suppliers.block_button.${i + 1}`}
                            >
                              Block
                            </Button>
                          )}
                          {sup.status === "Blocked" && (
                            <Button
                              size="sm"
                              className="bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 border-0 h-6 text-xs"
                              data-ocid={`admin.suppliers.unblock_button.${i + 1}`}
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
          </TabsContent>

          {/* Markup Rules */}
          <TabsContent value="markup">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Global Markup */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-400" /> Global Markup
                </h3>
                <div className="space-y-3">
                  {[
                    "Flight",
                    "Hotel",
                    "Tour",
                    "Transfer",
                    "Visa",
                    "Cruise",
                    "Insurance",
                  ].map((svc) => (
                    <div
                      key={svc}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-300 text-sm w-20">{svc}</span>
                      <div className="flex items-center gap-1.5 flex-1">
                        <select
                          className="bg-white/5 border border-white/10 text-white text-xs rounded-lg px-2 py-1"
                          style={{ minWidth: 36 }}
                        >
                          <option style={{ background: "#1e293b" }}>%</option>
                          <option style={{ background: "#1e293b" }}>₹</option>
                        </select>
                        <input
                          className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1"
                          defaultValue="10"
                          type="number"
                          min="0"
                          data-ocid="admin.markup.global_input"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agent-Specific Markup */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-400" /> Agent-Specific
                  Markup
                </h3>
                <div className="mb-3">
                  <Select>
                    <SelectTrigger
                      className="bg-white/5 border-white/10 text-white mb-3"
                      data-ocid="admin.markup.agent_select"
                    >
                      <SelectValue placeholder="Select agent..." />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Rajiv Mehta Travels",
                        "Priya Tours",
                        "Global Holidays",
                        "Sunrise Travel",
                      ].map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  {["Flight", "Hotel", "Tour", "Transfer"].map((svc) => (
                    <div
                      key={svc}
                      className="flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-300 text-sm w-20">{svc}</span>
                      <input
                        className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1"
                        defaultValue="12"
                        type="number"
                        min="0"
                      />
                      <span className="text-slate-400 text-xs">%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Markup */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" /> Destination Markup
                </h3>
                <div className="space-y-2 mb-3">
                  {[
                    { dest: "Bangkok", markup: "15" },
                    { dest: "Dubai", markup: "12" },
                    { dest: "Singapore", markup: "10" },
                    { dest: "Bali", markup: "18" },
                  ].map((d, i) => (
                    <div key={d.dest} className="flex items-center gap-2">
                      <input
                        className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5"
                        defaultValue={d.dest}
                      />
                      <input
                        className="w-16 bg-white/5 border border-white/10 text-white text-sm rounded-lg px-2 py-1.5 text-center"
                        defaultValue={d.markup}
                        type="number"
                      />
                      <span className="text-slate-400 text-xs">%</span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300 text-xs"
                        data-ocid={`admin.markup.dest_delete_button.${i + 1}`}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-dashed border-white/20 text-slate-400 hover:bg-white/5 w-full text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add Destination
                </Button>
              </div>
            </div>

            {/* Seasonal Pricing */}
            <div
              className="rounded-2xl p-5 mb-5"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" /> Seasonal Pricing
                Rules
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Summer Peak",
                    from: "2026-04-01",
                    to: "2026-06-30",
                    svc: "Hotel",
                    markup: "20",
                  },
                  {
                    label: "Diwali Season",
                    from: "2026-10-15",
                    to: "2026-11-05",
                    svc: "Flight",
                    markup: "25",
                  },
                  {
                    label: "New Year Rush",
                    from: "2026-12-25",
                    to: "2027-01-05",
                    svc: "Tour",
                    markup: "30",
                  },
                ].map((r, i) => (
                  <div
                    key={r.label}
                    className="grid grid-cols-5 gap-3 items-center"
                  >
                    <input
                      className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5"
                      defaultValue={r.label}
                    />
                    <input
                      type="date"
                      className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5"
                      defaultValue={r.from}
                      style={{ colorScheme: "dark" }}
                    />
                    <input
                      type="date"
                      className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-1.5"
                      defaultValue={r.to}
                      style={{ colorScheme: "dark" }}
                    />
                    <select
                      className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-2 py-1.5"
                      defaultValue={r.svc}
                    >
                      {["Flight", "Hotel", "Tour", "Transfer"].map((s) => (
                        <option key={s} style={{ background: "#1e293b" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-1">
                      <input
                        className="flex-1 bg-white/5 border border-white/10 text-white text-sm rounded-lg px-2 py-1.5 text-center"
                        defaultValue={r.markup}
                        type="number"
                      />
                      <span className="text-slate-400 text-xs">%</span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-300"
                        data-ocid={`admin.markup.seasonal_delete.${i + 1}`}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              style={{ background: "#7C3AED" }}
              className="text-white hover:opacity-90"
              data-ocid="admin.markup.save_button"
            >
              <CheckCircle className="w-4 h-4 mr-2" /> Save All Rules
            </Button>
          </TabsContent>

          {/* System Logs */}
          <TabsContent value="logs">
            <div className="flex flex-wrap gap-3 mb-5 items-center">
              <Select defaultValue="all">
                <SelectTrigger
                  className="w-44 bg-white/5 border-white/10 text-white"
                  data-ocid="admin.logs.filter_select"
                >
                  <SelectValue placeholder="Log type" />
                </SelectTrigger>
                <SelectContent>
                  {["all", "Auth", "Booking", "Payment", "API", "Error"].map(
                    (t) => (
                      <SelectItem key={t} value={t}>
                        {t === "all" ? "All Types" : t}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <input
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 w-44 placeholder:text-slate-600"
                placeholder="Search user..."
              />
              <input
                type="date"
                className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2"
                style={{ colorScheme: "dark" }}
              />
              <div className="flex-1" />
              <Button
                variant="outline"
                className="border-white/20 text-slate-300 hover:bg-white/10"
                data-ocid="admin.logs.export_button"
              >
                <FileText className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>

            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    {[
                      "Timestamp",
                      "Level",
                      "Module",
                      "User",
                      "Message",
                      "IP",
                    ].map((h) => (
                      <TableHead key={h} className="text-slate-400 text-xs">
                        {h}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      ts: "16 Mar 10:42:31",
                      level: "Info",
                      module: "Auth",
                      user: "rajiv.mehta",
                      msg: "User login successful",
                      ip: "103.45.67.89",
                    },
                    {
                      ts: "16 Mar 10:41:55",
                      level: "Success",
                      module: "Booking",
                      user: "priya.kapoor",
                      msg: "Booking FST-4001 confirmed",
                      ip: "182.73.12.4",
                    },
                    {
                      ts: "16 Mar 10:40:20",
                      level: "Warning",
                      module: "Payment",
                      user: "suresh.nair",
                      msg: "Wallet balance below threshold",
                      ip: "49.207.88.11",
                    },
                    {
                      ts: "16 Mar 10:38:07",
                      level: "Error",
                      module: "API",
                      user: "system",
                      msg: "TripJack API timeout after 30s",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:36:44",
                      level: "Info",
                      module: "Auth",
                      user: "anita.sharma",
                      msg: "Password reset requested",
                      ip: "117.96.55.22",
                    },
                    {
                      ts: "16 Mar 10:35:11",
                      level: "Success",
                      module: "Payment",
                      user: "mohit.jain",
                      msg: "Wallet topped up ₹50,000",
                      ip: "106.215.33.70",
                    },
                    {
                      ts: "16 Mar 10:33:48",
                      level: "Info",
                      module: "Booking",
                      user: "deepika.rao",
                      msg: "Booking FST-4002 created",
                      ip: "59.88.44.155",
                    },
                    {
                      ts: "16 Mar 10:31:22",
                      level: "Warning",
                      module: "Auth",
                      user: "kiran.patel",
                      msg: "3 failed login attempts",
                      ip: "45.123.78.201",
                    },
                    {
                      ts: "16 Mar 10:29:05",
                      level: "Error",
                      module: "API",
                      user: "system",
                      msg: "Hotel search returned empty results",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:27:40",
                      level: "Info",
                      module: "Booking",
                      user: "vivek.singh",
                      msg: "Voucher FST-4003 downloaded",
                      ip: "103.21.55.88",
                    },
                    {
                      ts: "16 Mar 10:25:18",
                      level: "Success",
                      module: "Auth",
                      user: "meena.verma",
                      msg: "2FA verification passed",
                      ip: "122.183.44.9",
                    },
                    {
                      ts: "16 Mar 10:23:55",
                      level: "Info",
                      module: "API",
                      user: "system",
                      msg: "Viator API sync completed — 234 tours",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:22:10",
                      level: "Warning",
                      module: "Booking",
                      user: "ashish.gupta",
                      msg: "Booking amendment request pending",
                      ip: "49.88.23.167",
                    },
                    {
                      ts: "16 Mar 10:20:44",
                      level: "Error",
                      module: "Payment",
                      user: "system",
                      msg: "UPI payment callback timeout",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:18:32",
                      level: "Success",
                      module: "Booking",
                      user: "sakshi.arora",
                      msg: "Visa application FST-V001 submitted",
                      ip: "106.215.77.44",
                    },
                    {
                      ts: "16 Mar 10:17:11",
                      level: "Info",
                      module: "Auth",
                      user: "ramesh.tiwari",
                      msg: "User session expired, auto logout",
                      ip: "45.115.23.99",
                    },
                    {
                      ts: "16 Mar 10:15:30",
                      level: "Info",
                      module: "API",
                      user: "system",
                      msg: "TripJack PNR monitoring cycle complete",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:14:05",
                      level: "Warning",
                      module: "Auth",
                      user: "rajiv.mehta",
                      msg: "Login from new IP address",
                      ip: "199.45.77.21",
                    },
                    {
                      ts: "16 Mar 10:12:44",
                      level: "Success",
                      module: "Booking",
                      user: "priya.kapoor",
                      msg: "Supplier confirmed FST-4004",
                      ip: "182.73.12.4",
                    },
                    {
                      ts: "16 Mar 10:11:22",
                      level: "Error",
                      module: "API",
                      user: "system",
                      msg: "Amadeus rate limit exceeded",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:09:58",
                      level: "Info",
                      module: "Payment",
                      user: "suresh.nair",
                      msg: "Invoice INV-0892 generated",
                      ip: "49.207.88.11",
                    },
                    {
                      ts: "16 Mar 10:08:35",
                      level: "Success",
                      module: "Booking",
                      user: "admin",
                      msg: "Manual booking FST-4010 created",
                      ip: "192.168.1.1",
                    },
                    {
                      ts: "16 Mar 10:07:12",
                      level: "Info",
                      module: "Auth",
                      user: "anita.sharma",
                      msg: "Role updated: Agent → Senior Agent",
                      ip: "117.96.55.22",
                    },
                    {
                      ts: "16 Mar 10:05:49",
                      level: "Warning",
                      module: "API",
                      user: "system",
                      msg: "Slow response from Hotelbeds (4.2s)",
                      ip: "internal",
                    },
                    {
                      ts: "16 Mar 10:04:28",
                      level: "Success",
                      module: "Payment",
                      user: "mohit.jain",
                      msg: "Refund processed for FST-3998",
                      ip: "106.215.33.70",
                    },
                  ].map((log, i) => {
                    const levelColors: Record<string, string> = {
                      Info: "bg-blue-500/20 text-blue-400",
                      Warning: "bg-orange-500/20 text-orange-400",
                      Error: "bg-red-500/20 text-red-400",
                      Success: "bg-green-500/20 text-green-400",
                    };
                    return (
                      <TableRow
                        key={`${log.ts}-${i}`}
                        className="border-white/10"
                        data-ocid={`admin.logs.row.${i + 1}`}
                      >
                        <TableCell className="text-slate-400 text-xs font-mono">
                          {log.ts}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColors[log.level]}`}
                          >
                            {log.level}
                          </span>
                        </TableCell>
                        <TableCell className="text-slate-300 text-xs">
                          {log.module}
                        </TableCell>
                        <TableCell className="text-white text-xs">
                          {log.user}
                        </TableCell>
                        <TableCell className="text-slate-300 text-xs max-w-xs truncate">
                          {log.msg}
                        </TableCell>
                        <TableCell className="text-slate-500 text-xs font-mono">
                          {log.ip}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Automation */}
          <TabsContent value="automation">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-white font-semibold text-lg">
                Automation Rules
              </h3>
              <Button
                style={{ background: "#7C3AED" }}
                className="text-white hover:opacity-90"
                data-ocid="admin.automation.add_rule_button"
              >
                <Plus className="w-4 h-4 mr-2" /> Add New Rule
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  name: "Auto Voucher Generation",
                  desc: "Automatically generate PDF vouchers when booking is confirmed",
                  trigger: "Booking Confirmed",
                  lastRun: "5 min ago",
                  active: true,
                },
                {
                  name: "Auto Supplier Selection",
                  desc: "Select best supplier based on price, rating, and speed",
                  trigger: "Search Query",
                  lastRun: "2 min ago",
                  active: true,
                },
                {
                  name: "Auto Markup Calculation",
                  desc: "Apply agent-specific markup when fetching supplier prices",
                  trigger: "Price Fetch",
                  lastRun: "1 min ago",
                  active: true,
                },
                {
                  name: "Auto Payment Deduction",
                  desc: "Deduct wallet balance when booking is confirmed",
                  trigger: "Booking Confirmed",
                  lastRun: "8 min ago",
                  active: true,
                },
                {
                  name: "Auto Cancellation Policy Check",
                  desc: "Validate and enforce cancellation rules on every request",
                  trigger: "Cancellation Request",
                  lastRun: "25 min ago",
                  active: true,
                },
                {
                  name: "Auto Email Notification",
                  desc: "Send email to agent and customer on booking status change",
                  trigger: "Status Change",
                  lastRun: "3 min ago",
                  active: true,
                },
                {
                  name: "Auto WhatsApp Alert",
                  desc: "Send WhatsApp message when payment is received",
                  trigger: "Payment Received",
                  lastRun: "12 min ago",
                  active: false,
                },
                {
                  name: "PNR Monitoring",
                  desc: "Check for flight schedule changes and cancellations",
                  trigger: "Every 6 Hours",
                  lastRun: "2 h ago",
                  active: true,
                },
                {
                  name: "Supplier Confirmation Reminder",
                  desc: "Auto-remind supplier if no response in 3 hours",
                  trigger: "3h No Response",
                  lastRun: "1 h ago",
                  active: true,
                },
                {
                  name: "Wallet Low Balance Alert",
                  desc: "Notify agent when wallet drops below configured threshold",
                  trigger: "Balance < Threshold",
                  lastRun: "45 min ago",
                  active: false,
                },
              ].map((rule, i) => (
                <div
                  key={rule.name}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`admin.automation.rule.card.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${rule.active ? "bg-purple-500/20" : "bg-slate-700"}`}
                      >
                        <Zap
                          className={`w-4 h-4 ${rule.active ? "text-purple-400" : "text-slate-500"}`}
                        />
                      </div>
                      <h4 className="text-white text-sm font-semibold">
                        {rule.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.active}
                        data-ocid={`admin.automation.rule.toggle.${i + 1}`}
                      />
                    </div>
                  </div>
                  <p className="text-slate-400 text-xs mb-3">{rule.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {rule.trigger}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {rule.lastRun}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs text-slate-400 hover:text-white"
                        data-ocid={`admin.automation.rule.edit_button.${i + 1}`}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Manual Booking (Admin) */}
          <TabsContent value="manual-booking">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div
                  className="rounded-2xl p-5 mb-4"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <h3 className="text-white font-semibold mb-4">
                    Admin Manual Booking
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Service Type
                      </Label>
                      <Tabs defaultValue="Flight">
                        <TabsList
                          className="bg-white/5 border border-white/10"
                          data-ocid="admin.manual.service_tab"
                        >
                          {["Flight", "Hotel", "Tour", "Transfer", "Visa"].map(
                            (s) => (
                              <TabsTrigger
                                key={s}
                                value={s}
                                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 text-xs"
                              >
                                {s}
                              </TabsTrigger>
                            ),
                          )}
                        </TabsList>
                      </Tabs>
                    </div>
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Assign to Agent
                      </Label>
                      <Select>
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white"
                          data-ocid="admin.manual.agent_select"
                        >
                          <SelectValue placeholder="Select agent..." />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Rajiv Mehta Travels",
                            "Priya Tours & Travels",
                            "Global Holidays India",
                            "Sunrise Travel Agency",
                          ].map((a) => (
                            <SelectItem key={a} value={a}>
                              {a}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      "Client Name",
                      "Email",
                      "Phone",
                      "Travel Date",
                      "Passengers",
                    ].map((f) => (
                      <div key={f}>
                        <Label className="text-slate-400 text-xs mb-1 block">
                          {f}
                        </Label>
                        <Input className="bg-white/5 border-white/10 text-white" />
                      </div>
                    ))}
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Supplier
                      </Label>
                      <Select>
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white"
                          data-ocid="admin.manual.supplier_select"
                        >
                          <SelectValue placeholder="Select supplier..." />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Alpine Hotels Group",
                            "SkyWings Aviation",
                            "TransAsia Transfers",
                            "VisaXpress",
                          ].map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-400 text-xs mb-1 block">
                        Payment Status
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          {["Paid", "Pending", "Credit"].map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Label className="text-slate-400 text-xs mb-1 block">
                      Admin Override Reason
                    </Label>
                    <Textarea
                      className="bg-white/5 border-white/10 text-white resize-none placeholder:text-slate-600"
                      rows={2}
                      placeholder="Reason for manual booking..."
                      data-ocid="admin.manual.override_textarea"
                    />
                  </div>
                  <Button
                    className="w-full mt-4"
                    style={{ background: "#7C3AED" }}
                    onClick={() => {}}
                    data-ocid="admin.manual.create_button"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Create Booking
                  </Button>
                </div>
              </div>

              <div>
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <h4 className="text-white font-semibold mb-4">
                    Recent Manual Bookings
                  </h4>
                  <div className="space-y-3">
                    {[
                      {
                        id: "FST-M001",
                        svc: "Hotel",
                        client: "Raj Corp",
                        agent: "Priya Tours",
                        amount: "₹45,000",
                        by: "admin",
                        date: "16 Mar",
                        status: "Confirmed",
                      },
                      {
                        id: "FST-M002",
                        svc: "Flight",
                        client: "Singh Group",
                        agent: "Sunrise Travel",
                        amount: "₹28,500",
                        by: "admin",
                        date: "15 Mar",
                        status: "Pending",
                      },
                      {
                        id: "FST-M003",
                        svc: "Visa",
                        client: "Mehta Family",
                        agent: "Global Holidays",
                        amount: "₹12,000",
                        by: "staff",
                        date: "14 Mar",
                        status: "Confirmed",
                      },
                      {
                        id: "FST-M004",
                        svc: "Transfer",
                        client: "Gupta Tours",
                        agent: "Rajiv Mehta",
                        amount: "₹8,400",
                        by: "admin",
                        date: "13 Mar",
                        status: "Completed",
                      },
                    ].map((b, i) => (
                      <div
                        key={b.id}
                        className="rounded-xl p-3"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                        data-ocid={`admin.manual.booking.${i + 1}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-purple-400 font-mono text-xs">
                            {b.id}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === "Confirmed" || b.status === "Completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <p className="text-white text-sm">{b.client}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                            {b.svc}
                          </span>
                          <span className="text-orange-400 font-medium text-sm">
                            {b.amount}
                          </span>
                        </div>
                        <p className="text-slate-500 text-xs mt-1">
                          {b.date} · via {b.agent} · by {b.by}
                        </p>
                        <div className="flex gap-1 mt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-white/5 text-slate-400 hover:bg-white/10 border-0 h-6 text-xs"
                            data-ocid={`admin.manual.invoice_button.${i + 1}`}
                          >
                            Invoice
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-white/5 text-slate-400 hover:bg-white/10 border-0 h-6 text-xs"
                            data-ocid={`admin.manual.voucher_button.${i + 1}`}
                          >
                            Voucher
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
