import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Copy,
  Edit,
  Eye,
  Globe,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  PauseCircle,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

export function DMCDashboard({
  onNavigate,
}: { onNavigate: (page: string) => void }) {
  const [pkgSearch, setPkgSearch] = useState("");
  const [pkgStatus, setPkgStatus] = useState("all");
  const [agentSearch, setAgentSearch] = useState("");

  const stats = [
    { label: "Total Packages", value: "48", icon: Package, color: "#1E3A8A" },
    {
      label: "Active Destinations",
      value: "22",
      icon: Globe,
      color: "#F97316",
    },
    { label: "Partner Agents", value: "156", icon: Users, color: "#0F766E" },
    {
      label: "Monthly Revenue",
      value: "₹12,40,000",
      icon: TrendingUp,
      color: "#7C3AED",
    },
  ];

  const packages = [
    {
      name: "Dubai Luxury 7N/8D",
      dest: "Dubai",
      duration: "7N/8D",
      price: "₹65,000",
      pax: 120,
      services: ["Flight", "Hotel", "Transfer", "Tour"],
      status: "Active",
    },
    {
      name: "Bali Escape 5N/6D",
      dest: "Bali",
      duration: "5N/6D",
      price: "₹42,000",
      pax: 85,
      services: ["Hotel", "Transfer", "Tour"],
      status: "Active",
    },
    {
      name: "Singapore Explorer",
      dest: "Singapore",
      duration: "4N/5D",
      price: "₹55,000",
      pax: 60,
      services: ["Flight", "Hotel", "Transfer"],
      status: "Active",
    },
    {
      name: "Thailand Beach Bliss",
      dest: "Thailand",
      duration: "6N/7D",
      price: "₹38,000",
      pax: 200,
      services: ["Flight", "Hotel", "Tour"],
      status: "Active",
    },
    {
      name: "Maldives Overwater",
      dest: "Maldives",
      duration: "3N/4D",
      price: "₹1,20,000",
      pax: 30,
      services: ["Flight", "Hotel"],
      status: "Draft",
    },
    {
      name: "Europe Grand Tour",
      dest: "Europe",
      duration: "10N/11D",
      price: "₹1,85,000",
      pax: 45,
      services: ["Flight", "Hotel", "Transfer", "Tour", "Visa"],
      status: "Active",
    },
    {
      name: "Japan Cultural Trip",
      dest: "Japan",
      duration: "7N/8D",
      price: "₹95,000",
      pax: 0,
      services: ["Flight", "Hotel", "Tour"],
      status: "Draft",
    },
    {
      name: "Australia Adventure",
      dest: "Australia",
      duration: "8N/9D",
      price: "₹1,45,000",
      pax: 18,
      services: ["Flight", "Hotel", "Transfer"],
      status: "Paused",
    },
  ];

  const recentPackages = packages.slice(0, 5);

  const topAgents = [
    {
      name: "Rahul Sharma",
      agency: "TravelPro India",
      bookings: 48,
      commission: "₹96,000",
    },
    {
      name: "Priya Menon",
      agency: "Globe Trotters",
      bookings: 36,
      commission: "₹72,000",
    },
    {
      name: "Arun Kumar",
      agency: "Dream Voyages",
      bookings: 29,
      commission: "₹58,000",
    },
    {
      name: "Sonal Patel",
      agency: "Sunrise Travel",
      bookings: 22,
      commission: "₹44,000",
    },
    {
      name: "Vikram Singh",
      agency: "Nav Travel",
      bookings: 18,
      commission: "₹36,000",
    },
  ];

  const partnerAgents = [
    {
      name: "Rahul Sharma",
      agency: "TravelPro India",
      city: "Mumbai",
      bookings: 48,
      revenue: "₹3,12,000",
      commission: "8%",
      status: "Active",
    },
    {
      name: "Priya Menon",
      agency: "Globe Trotters",
      city: "Bangalore",
      bookings: 36,
      revenue: "₹2,34,000",
      commission: "8%",
      status: "Active",
    },
    {
      name: "Arun Kumar",
      agency: "Dream Voyages",
      city: "Delhi",
      bookings: 29,
      revenue: "₹1,88,500",
      commission: "7%",
      status: "Active",
    },
    {
      name: "Sonal Patel",
      agency: "Sunrise Travel",
      city: "Pune",
      bookings: 22,
      revenue: "₹1,43,000",
      commission: "7%",
      status: "Active",
    },
    {
      name: "Vikram Singh",
      agency: "Nav Travel",
      city: "Chandigarh",
      bookings: 18,
      revenue: "₹1,17,000",
      commission: "6%",
      status: "Active",
    },
    {
      name: "Deepa Nair",
      agency: "Horizon Trips",
      city: "Kochi",
      bookings: 14,
      revenue: "₹91,000",
      commission: "6%",
      status: "Active",
    },
    {
      name: "Manish Gupta",
      agency: "Sky Routes",
      city: "Hyderabad",
      bookings: 9,
      revenue: "₹58,500",
      commission: "5%",
      status: "Inactive",
    },
    {
      name: "Kavya Reddy",
      agency: "WanderMore",
      city: "Chennai",
      bookings: 7,
      revenue: "₹45,500",
      commission: "5%",
      status: "Active",
    },
    {
      name: "Arjun Malhotra",
      agency: "Elite Travels",
      city: "Jaipur",
      bookings: 5,
      revenue: "₹32,500",
      commission: "5%",
      status: "Inactive",
    },
    {
      name: "Sneha Iyer",
      agency: "TravelMate",
      city: "Ahmedabad",
      bookings: 3,
      revenue: "₹19,500",
      commission: "5%",
      status: "Active",
    },
  ];

  const destinations = [
    {
      name: "Dubai",
      flag: "🇦🇪",
      packages: 8,
      avgPrice: "₹68,000",
      bookings: 142,
    },
    {
      name: "Bali",
      flag: "🇮🇩",
      packages: 6,
      avgPrice: "₹44,000",
      bookings: 98,
    },
    {
      name: "Thailand",
      flag: "🇹🇭",
      packages: 7,
      avgPrice: "₹40,000",
      bookings: 210,
    },
    {
      name: "Singapore",
      flag: "🇸🇬",
      packages: 5,
      avgPrice: "₹57,000",
      bookings: 76,
    },
    {
      name: "Maldives",
      flag: "🇲🇻",
      packages: 4,
      avgPrice: "₹1,25,000",
      bookings: 34,
    },
    {
      name: "Europe",
      flag: "🇪🇺",
      packages: 9,
      avgPrice: "₹1,90,000",
      bookings: 55,
    },
    {
      name: "Australia",
      flag: "🇦🇺",
      packages: 5,
      avgPrice: "₹1,50,000",
      bookings: 28,
    },
    {
      name: "Japan",
      flag: "🇯🇵",
      packages: 4,
      avgPrice: "₹98,000",
      bookings: 42,
    },
  ];

  const statusColor: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Paused: "bg-slate-100 text-slate-600",
  };

  const filteredPackages = packages.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(pkgSearch.toLowerCase());
    const matchStatus =
      pkgStatus === "all" || p.status.toLowerCase() === pkgStatus;
    return matchSearch && matchStatus;
  });

  const filteredAgents = partnerAgents.filter(
    (a) =>
      a.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
      a.agency.toLowerCase().includes(agentSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen" style={{ background: "#0F172A" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ background: "linear-gradient(135deg,#1E3A8A,#2563EB)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">
              FiveStar Travel — DMC Portal
            </h1>
            <p className="text-blue-200 text-xs">
              Destination Management Dashboard
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate("home")}
          className="border-white/30 text-white hover:bg-white/10"
          data-ocid="dmc.logout_button"
        >
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </div>

      <div className="p-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6 bg-white/5 border border-white/10">
            <TabsTrigger
              value="overview"
              data-ocid="dmc.overview.tab"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" /> Overview
            </TabsTrigger>
            <TabsTrigger
              value="packages"
              data-ocid="dmc.packages.tab"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <Package className="w-4 h-4 mr-2" /> Packages
            </TabsTrigger>
            <TabsTrigger
              value="agents"
              data-ocid="dmc.agents.tab"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <Users className="w-4 h-4 mr-2" /> Partner Agents
            </TabsTrigger>
            <TabsTrigger
              value="destinations"
              data-ocid="dmc.destinations.tab"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-slate-300"
            >
              <MapPin className="w-4 h-4 mr-2" /> Destinations
            </TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`dmc.stat.card.${i + 1}`}
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

            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4">
                  Recent Packages
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-slate-400">Package</TableHead>
                      <TableHead className="text-slate-400">Duration</TableHead>
                      <TableHead className="text-slate-400">
                        Price/Pax
                      </TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentPackages.map((p, i) => (
                      <TableRow
                        key={p.name}
                        className="border-white/10"
                        data-ocid={`dmc.recent-packages.row.${i + 1}`}
                      >
                        <TableCell className="text-white text-sm">
                          {p.name}
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm">
                          {p.duration}
                        </TableCell>
                        <TableCell className="text-orange-400 text-sm font-medium">
                          {p.price}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[p.status]}`}
                          >
                            {p.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <h3 className="text-white font-semibold mb-4">
                  Top Partner Agents
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-slate-400">Agent</TableHead>
                      <TableHead className="text-slate-400">Bookings</TableHead>
                      <TableHead className="text-slate-400">
                        Commission
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topAgents.map((a, i) => (
                      <TableRow
                        key={a.name}
                        className="border-white/10"
                        data-ocid={`dmc.top-agents.row.${i + 1}`}
                      >
                        <TableCell>
                          <p className="text-white text-sm font-medium">
                            {a.name}
                          </p>
                          <p className="text-slate-400 text-xs">{a.agency}</p>
                        </TableCell>
                        <TableCell className="text-slate-300 text-sm">
                          {a.bookings}
                        </TableCell>
                        <TableCell className="text-green-400 text-sm font-medium">
                          {a.commission}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          {/* Packages */}
          <TabsContent value="packages">
            <div className="flex gap-3 mb-5">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search packages..."
                  value={pkgSearch}
                  onChange={(e) => setPkgSearch(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  data-ocid="dmc.packages.search_input"
                />
              </div>
              <Select value={pkgStatus} onValueChange={setPkgStatus}>
                <SelectTrigger
                  className="w-40 bg-white/5 border-white/10 text-white"
                  data-ocid="dmc.packages.status_select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {filteredPackages.map((p, i) => (
                <div
                  key={p.name}
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`dmc.packages.item.${i + 1}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white font-semibold">{p.name}</h4>
                      <p className="text-slate-400 text-sm">
                        {p.dest} · {p.duration} · {p.pax} pax booked
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${statusColor[p.status]}`}
                    >
                      {p.status}
                    </span>
                  </div>
                  <p className="text-orange-400 text-xl font-bold mb-3">
                    {p.price}
                    <span className="text-slate-400 text-sm font-normal">
                      /pax
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-slate-300 hover:bg-white/10 flex-1"
                      data-ocid={`dmc.packages.edit_button.${i + 1}`}
                    >
                      <Edit className="w-3 h-3 mr-1" /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-slate-300 hover:bg-white/10"
                      data-ocid={`dmc.packages.view_button.${i + 1}`}
                    >
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-slate-300 hover:bg-white/10"
                      data-ocid={`dmc.packages.duplicate_button.${i + 1}`}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-slate-300 hover:bg-white/10"
                      data-ocid={`dmc.packages.pause_button.${i + 1}`}
                    >
                      <PauseCircle className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Partner Agents */}
          <TabsContent value="agents">
            <div className="mb-4">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search agents..."
                  value={agentSearch}
                  onChange={(e) => setAgentSearch(e.target.value)}
                  className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                  data-ocid="dmc.agents.search_input"
                />
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Table>
                <TableHeader>
                  <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                    <TableHead className="text-slate-400">Agent Name</TableHead>
                    <TableHead className="text-slate-400">Agency</TableHead>
                    <TableHead className="text-slate-400">City</TableHead>
                    <TableHead className="text-slate-400">Bookings</TableHead>
                    <TableHead className="text-slate-400">Revenue</TableHead>
                    <TableHead className="text-slate-400">Commission</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAgents.map((a, i) => (
                    <TableRow
                      key={a.name}
                      className="border-white/10"
                      data-ocid={`dmc.agents.row.${i + 1}`}
                    >
                      <TableCell className="text-white font-medium">
                        {a.name}
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {a.agency}
                      </TableCell>
                      <TableCell className="text-slate-400">{a.city}</TableCell>
                      <TableCell className="text-slate-300">
                        {a.bookings}
                      </TableCell>
                      <TableCell className="text-green-400 font-medium">
                        {a.revenue}
                      </TableCell>
                      <TableCell className="text-orange-400">
                        {a.commission}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${a.status === "Active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}
                        >
                          {a.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-slate-300 hover:bg-white/10 text-xs h-7"
                            data-ocid={`dmc.agents.view_button.${i + 1}`}
                          >
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-slate-300 hover:bg-white/10 text-xs h-7"
                            data-ocid={`dmc.agents.message_button.${i + 1}`}
                          >
                            Message
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Destinations */}
          <TabsContent value="destinations">
            <div className="grid md:grid-cols-4 gap-4">
              {destinations.map((d, i) => (
                <div
                  key={d.name}
                  className="rounded-2xl p-5 group hover:scale-[1.02] transition-transform cursor-pointer"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  data-ocid={`dmc.destinations.card.${i + 1}`}
                >
                  <div className="text-4xl mb-3">{d.flag}</div>
                  <h4 className="text-white font-bold text-lg">{d.name}</h4>
                  <div className="space-y-1 my-3">
                    <p className="text-slate-400 text-xs">
                      {d.packages} active packages
                    </p>
                    <p className="text-orange-400 text-sm font-semibold">
                      Avg {d.avgPrice}/pax
                    </p>
                    <p className="text-slate-400 text-xs">
                      {d.bookings} bookings this month
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full mt-1 group-hover:bg-orange-500 transition-colors"
                    style={{ background: "#F97316" }}
                    data-ocid={`dmc.destinations.view_packages_button.${i + 1}`}
                  >
                    View Packages
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
