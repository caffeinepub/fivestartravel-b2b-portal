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
  Building2,
  CheckCircle,
  Clock,
  DollarSign,
  LogOut,
  Search,
  Settings,
  Shield,
  Ticket,
  TrendingUp,
  Users,
  XCircle,
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
          <TabsList className="mb-6 bg-white/5 border border-white/10">
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
        </Tabs>
      </div>
    </div>
  );
}
