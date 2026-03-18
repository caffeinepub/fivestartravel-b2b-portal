import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  AlertTriangle,
  BarChart3,
  Briefcase,
  Building2,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Download,
  Hotel,
  Mail,
  MapPin,
  Phone,
  Plane,
  Plus,
  Settings,
  Shield,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  grade: "Executive" | "Manager" | "Staff" | "Intern";
  bookings: number;
  spend: number;
  status: "active" | "travel";
}

interface TravelRequest {
  id: number;
  employee: string;
  department: string;
  route: string;
  dates: string;
  purpose: string;
  estimatedCost: number;
  status: "pending" | "approved" | "rejected";
  urgency: "normal" | "urgent";
}

interface Booking {
  id: string;
  employee: string;
  route: string;
  dates: string;
  type: "flight" | "hotel" | "both";
  cost: number;
  status: "confirmed" | "in-transit" | "completed" | "cancelled";
}

const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    email: "arjun.mehta@corp.com",
    department: "Sales",
    grade: "Executive",
    bookings: 14,
    spend: 285000,
    status: "travel",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@corp.com",
    department: "HR",
    grade: "Manager",
    bookings: 8,
    spend: 142000,
    status: "active",
  },
  {
    id: 3,
    name: "Rahul Gupta",
    email: "rahul.gupta@corp.com",
    department: "Engineering",
    grade: "Staff",
    bookings: 3,
    spend: 48500,
    status: "active",
  },
  {
    id: 4,
    name: "Sneha Patel",
    email: "sneha.patel@corp.com",
    department: "Finance",
    grade: "Manager",
    bookings: 6,
    spend: 98000,
    status: "active",
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@corp.com",
    department: "Sales",
    grade: "Staff",
    bookings: 11,
    spend: 163000,
    status: "travel",
  },
  {
    id: 6,
    name: "Kavita Joshi",
    email: "kavita.joshi@corp.com",
    department: "Operations",
    grade: "Executive",
    bookings: 18,
    spend: 342000,
    status: "active",
  },
];

const REQUESTS: TravelRequest[] = [
  {
    id: 1,
    employee: "Rahul Gupta",
    department: "Engineering",
    route: "DEL → SFO",
    dates: "25–30 Mar",
    purpose: "Tech Conference",
    estimatedCost: 145000,
    status: "pending",
    urgency: "normal",
  },
  {
    id: 2,
    employee: "Sneha Patel",
    department: "Finance",
    route: "BOM → DXB",
    dates: "28 Mar",
    purpose: "Client Meeting",
    estimatedCost: 38000,
    status: "pending",
    urgency: "urgent",
  },
  {
    id: 3,
    employee: "Kavita Joshi",
    department: "Operations",
    route: "DEL → LON → DEL",
    dates: "1–8 Apr",
    purpose: "Partnership Summit",
    estimatedCost: 220000,
    status: "pending",
    urgency: "normal",
  },
  {
    id: 4,
    employee: "Arjun Mehta",
    department: "Sales",
    route: "BOM → SIN",
    dates: "5–7 Apr",
    purpose: "Sales Roadshow",
    estimatedCost: 62000,
    status: "approved",
    urgency: "normal",
  },
];

const BOOKINGS: Booking[] = [
  {
    id: "CB-1001",
    employee: "Arjun Mehta",
    route: "DEL → DXB → DEL",
    dates: "14–18 Mar",
    type: "both",
    cost: 96000,
    status: "in-transit",
  },
  {
    id: "CB-1002",
    employee: "Vikram Singh",
    route: "BOM → BKK",
    dates: "16–20 Mar",
    type: "both",
    cost: 72000,
    status: "in-transit",
  },
  {
    id: "CB-1003",
    employee: "Priya Sharma",
    route: "DEL → HYD",
    dates: "20 Mar",
    type: "flight",
    cost: 8500,
    status: "confirmed",
  },
  {
    id: "CB-1004",
    employee: "Kavita Joshi",
    route: "DEL → SIN → DEL",
    dates: "5–9 Mar",
    type: "both",
    cost: 114000,
    status: "completed",
  },
  {
    id: "CB-1005",
    employee: "Rahul Gupta",
    route: "BOM → PNQ",
    dates: "1 Mar",
    type: "flight",
    cost: 4200,
    status: "completed",
  },
];

const DEPT_SPEND = [
  { dept: "Sales", spend: 448000, trips: 25, color: "bg-blue-500" },
  { dept: "Engineering", spend: 48500, trips: 3, color: "bg-purple-500" },
  { dept: "Finance", spend: 98000, trips: 6, color: "bg-orange-500" },
  { dept: "Operations", spend: 342000, trips: 18, color: "bg-green-500" },
  { dept: "HR", spend: 142000, trips: 8, color: "bg-pink-500" },
];

const MAX_SPEND = Math.max(...DEPT_SPEND.map((d) => d.spend));

function StatusBadge({ status }: { status: string }) {
  const configs: Record<string, { cls: string; label: string }> = {
    confirmed: {
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      label: "Confirmed",
    },
    "in-transit": {
      cls: "bg-yellow-500/15 text-yellow-500 border-yellow-500/30",
      label: "In Transit",
    },
    completed: {
      cls: "bg-green-500/15 text-green-400 border-green-500/30",
      label: "Completed",
    },
    cancelled: {
      cls: "bg-red-500/15 text-red-400 border-red-500/30",
      label: "Cancelled",
    },
    pending: {
      cls: "bg-orange-500/15 text-orange-400 border-orange-500/30",
      label: "Pending",
    },
    approved: {
      cls: "bg-green-500/15 text-green-400 border-green-500/30",
      label: "Approved",
    },
    rejected: {
      cls: "bg-red-500/15 text-red-400 border-red-500/30",
      label: "Rejected",
    },
    active: {
      cls: "bg-green-500/15 text-green-400 border-green-500/30",
      label: "Active",
    },
    travel: {
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      label: "Travelling",
    },
  };
  const cfg = configs[status] || {
    cls: "bg-muted text-muted-foreground",
    label: status,
  };
  return <Badge className={`text-[10px] ${cfg.cls}`}>{cfg.label}</Badge>;
}

export function CorporatePortal() {
  const [requests, setRequests] = useState<TravelRequest[]>(REQUESTS);
  const [policy, setPolicy] = useState({
    execClass: "Business",
    managerClass: "Economy Plus",
    staffClass: "Economy",
    maxHotelExec: 15000,
    maxHotelManager: 8000,
    maxHotelStaff: 4000,
    advanceBookingDays: 14,
    requireApproval: true,
    autoApproveUnder: 25000,
    notifyHR: true,
    notifyFinance: true,
  });

  function handleApprove(id: number) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" } : r)),
    );
  }

  function handleReject(id: number) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r)),
    );
  }

  const totalSpendMonth = DEPT_SPEND.reduce((s, d) => s + d.spend, 0);
  const activeTrips = BOOKINGS.filter((b) => b.status === "in-transit").length;
  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const violations = 2; // mock

  return (
    <div className="space-y-4" data-ocid="corporate.panel">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="font-display font-bold text-foreground text-lg">
            Corporate Travel Portal
          </h2>
          <p className="text-xs text-muted-foreground">
            Manage employee travel, policies & approvals
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: "Monthly Spend",
            value: `₹${(totalSpendMonth / 100000).toFixed(1)}L`,
            icon: DollarSign,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
          },
          {
            label: "Active Trips",
            value: activeTrips,
            icon: Plane,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
          {
            label: "Pending Approvals",
            value: pendingCount,
            icon: Clock,
            color: "text-orange-400",
            bg: "bg-orange-500/10",
          },
          {
            label: "Policy Violations",
            value: violations,
            icon: AlertTriangle,
            color: "text-red-400",
            bg: "bg-red-500/10",
          },
        ].map((kpi) => (
          <Card
            key={kpi.label}
            className="bg-card/60"
            data-ocid={`corporate.kpi.${kpi.label.toLowerCase().replace(/ /g, "_")}.card`}
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center flex-shrink-0`}
              >
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">{kpi.label}</p>
                <p className="font-display font-bold text-xl">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="employees">
        <TabsList className="flex-wrap h-auto gap-1" data-ocid="corporate.tabs">
          <TabsTrigger value="employees" data-ocid="corporate.employees.tab">
            <Users className="w-3.5 h-3.5 mr-1" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="approvals" data-ocid="corporate.approvals.tab">
            Approvals
            {pendingCount > 0 && (
              <Badge className="ml-1 text-[9px] h-4 bg-orange-500 text-white border-0">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="policy" data-ocid="corporate.policy.tab">
            <Settings className="w-3.5 h-3.5 mr-1" />
            Policy
          </TabsTrigger>
          <TabsTrigger value="expenses" data-ocid="corporate.expenses.tab">
            <BarChart3 className="w-3.5 h-3.5 mr-1" />
            Expenses
          </TabsTrigger>
          <TabsTrigger value="bookings" data-ocid="corporate.bookings.tab">
            <Briefcase className="w-3.5 h-3.5 mr-1" />
            Bookings
          </TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees">
          <Card>
            <CardHeader className="py-3 px-4 flex-row items-center justify-between">
              <CardTitle className="text-sm">Employee Directory</CardTitle>
              <Button size="sm" data-ocid="corporate.add_employee.button">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Employee
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table data-ocid="corporate.employees.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {EMPLOYEES.map((emp, i) => (
                    <TableRow
                      key={emp.id}
                      data-ocid={`corporate.employee.row.${i + 1}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                            {emp.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{emp.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {emp.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {emp.department}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-[10px] ${
                            emp.grade === "Executive"
                              ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                              : emp.grade === "Manager"
                                ? "bg-blue-500/15 text-blue-400 border-blue-500/30"
                                : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {emp.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{emp.bookings}</TableCell>
                      <TableCell className="text-sm font-semibold">
                        ₹{emp.spend.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={emp.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Approvals Tab */}
        <TabsContent value="approvals">
          <div className="space-y-3">
            {requests.map((req, i) => (
              <Card
                key={req.id}
                className={`border ${
                  req.urgency === "urgent"
                    ? "border-orange-500/30 bg-orange-500/5"
                    : "border-border"
                }`}
                data-ocid={`corporate.approval.item.${i + 1}`}
              >
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{req.employee}</p>
                        <Badge className="text-[10px] bg-muted text-muted-foreground">
                          {req.department}
                        </Badge>
                        {req.urgency === "urgent" && (
                          <Badge className="text-[10px] bg-orange-500/15 text-orange-400 border-orange-500/30">
                            URGENT
                          </Badge>
                        )}
                        <StatusBadge status={req.status} />
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Plane className="w-3 h-3" />
                          {req.route}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {req.dates}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" />
                          {req.purpose}
                        </span>
                      </div>
                      <p className="font-bold text-sm">
                        ₹{req.estimatedCost.toLocaleString()}
                      </p>
                    </div>
                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-500 text-xs"
                          onClick={() => handleApprove(req.id)}
                          data-ocid={`corporate.approve.button.${i + 1}`}
                        >
                          <Check className="w-3.5 h-3.5 mr-1" /> Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-400 border-red-500/30 hover:bg-red-500/10 text-xs"
                          onClick={() => handleReject(req.id)}
                          data-ocid={`corporate.reject.button.${i + 1}`}
                        >
                          <X className="w-3.5 h-3.5 mr-1" /> Reject
                        </Button>
                      </div>
                    )}
                    {req.status === "approved" && (
                      <div className="flex items-center gap-1 text-green-400 text-sm">
                        <CheckCircle className="w-4 h-4" /> Approved
                      </div>
                    )}
                    {req.status === "rejected" && (
                      <div className="flex items-center gap-1 text-red-400 text-sm">
                        <X className="w-4 h-4" /> Rejected
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            {requests.filter((r) => r.status === "pending").length === 0 && (
              <div
                className="text-center py-12 text-muted-foreground"
                data-ocid="corporate.approvals.empty_state"
              >
                <CheckCircle className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p>All requests have been processed</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Travel Policy Tab */}
        <TabsContent value="policy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Plane className="w-4 h-4 text-blue-400" /> Flight Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                {(
                  [
                    { label: "Executive Class", key: "execClass" },
                    { label: "Manager Class", key: "managerClass" },
                    { label: "Staff Class", key: "staffClass" },
                  ] as { label: string; key: keyof typeof policy }[]
                ).map((item) => (
                  <div key={item.key} className="space-y-1">
                    <Label className="text-xs">{item.label}</Label>
                    <Select
                      value={String(policy[item.key])}
                      onValueChange={(v) =>
                        setPolicy({ ...policy, [item.key]: v })
                      }
                    >
                      <SelectTrigger
                        data-ocid={`corporate.policy.${item.key}.select`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Economy">Economy</SelectItem>
                        <SelectItem value="Economy Plus">
                          Economy Plus
                        </SelectItem>
                        <SelectItem value="Business">Business</SelectItem>
                        <SelectItem value="First Class">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <div className="space-y-1">
                  <Label className="text-xs">
                    Advance Booking Required (days)
                  </Label>
                  <Input
                    type="number"
                    value={policy.advanceBookingDays}
                    onChange={(e) =>
                      setPolicy({
                        ...policy,
                        advanceBookingDays: Number(e.target.value),
                      })
                    }
                    className="h-8"
                    data-ocid="corporate.policy.advance_booking.input"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Hotel className="w-4 h-4 text-orange-400" /> Hotel Budget
                  (₹/night)
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-4">
                {(
                  [
                    { label: "Executive Max Budget", key: "maxHotelExec" },
                    { label: "Manager Max Budget", key: "maxHotelManager" },
                    { label: "Staff Max Budget", key: "maxHotelStaff" },
                  ] as { label: string; key: keyof typeof policy }[]
                ).map((item) => (
                  <div key={item.key} className="space-y-1">
                    <Label className="text-xs">{item.label}</Label>
                    <Input
                      type="number"
                      value={Number(policy[item.key])}
                      onChange={(e) =>
                        setPolicy({
                          ...policy,
                          [item.key]: Number(e.target.value),
                        })
                      }
                      className="h-8"
                      data-ocid={`corporate.policy.${item.key}.input`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" /> Approval
                  Workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Require Approval for all trips",
                      key: "requireApproval",
                    },
                    { label: "Notify HR on booking", key: "notifyHR" },
                    {
                      label: "Notify Finance on booking",
                      key: "notifyFinance",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <Label className="text-sm">{item.label}</Label>
                      <Switch
                        checked={Boolean(
                          policy[item.key as keyof typeof policy],
                        )}
                        onCheckedChange={(v) =>
                          setPolicy({ ...policy, [item.key]: v })
                        }
                        data-ocid={`corporate.policy.${item.key}.switch`}
                      />
                    </div>
                  ))}
                  <div className="space-y-1">
                    <Label className="text-xs">
                      Auto-approve trips under (₹)
                    </Label>
                    <Input
                      type="number"
                      value={policy.autoApproveUnder}
                      onChange={(e) =>
                        setPolicy({
                          ...policy,
                          autoApproveUnder: Number(e.target.value),
                        })
                      }
                      className="h-8"
                      data-ocid="corporate.policy.auto_approve.input"
                    />
                  </div>
                </div>
                <Button
                  className="mt-4"
                  data-ocid="corporate.policy.save.button"
                >
                  Save Policy
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Expense Reports Tab */}
        <TabsContent value="expenses">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-3 px-4 flex-row items-center justify-between">
                <CardTitle className="text-sm">Department Spend</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  data-ocid="corporate.expenses.download.button"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Export
                </Button>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {DEPT_SPEND.map((dept, i) => (
                  <div
                    key={dept.dept}
                    data-ocid={`corporate.dept.item.${i + 1}`}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{dept.dept}</span>
                      <span className="text-muted-foreground">
                        ₹{dept.spend.toLocaleString()} · {dept.trips} trips
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${dept.color} transition-all`}
                        style={{ width: `${(dept.spend / MAX_SPEND) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3 px-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" /> Top Spenders
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2">
                {[...EMPLOYEES]
                  .sort((a, b) => b.spend - a.spend)
                  .slice(0, 5)
                  .map((emp, i) => (
                    <div
                      key={emp.id}
                      className="flex items-center gap-3"
                      data-ocid={`corporate.top_spender.item.${i + 1}`}
                    >
                      <span className="text-muted-foreground text-sm w-4">
                        #{i + 1}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                        {emp.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{emp.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {emp.department}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">
                          ₹{emp.spend.toLocaleString()}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          {emp.bookings} trips
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* My Bookings Tab */}
        <TabsContent value="bookings">
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-sm">Corporate Bookings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table data-ocid="corporate.bookings.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {BOOKINGS.map((bk, i) => (
                    <TableRow
                      key={bk.id}
                      data-ocid={`corporate.booking.row.${i + 1}`}
                    >
                      <TableCell className="font-mono text-xs text-primary">
                        {bk.id}
                      </TableCell>
                      <TableCell className="text-sm">{bk.employee}</TableCell>
                      <TableCell className="text-sm">{bk.route}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {bk.dates}
                      </TableCell>
                      <TableCell>
                        <Badge className="text-[10px] bg-muted text-muted-foreground capitalize">
                          {bk.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-semibold">
                        ₹{bk.cost.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={bk.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
