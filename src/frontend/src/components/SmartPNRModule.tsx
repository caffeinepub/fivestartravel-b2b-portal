import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  Clock,
  Download,
  Eye,
  FileText,
  Mail,
  MessageCircle,
  Plane,
  Search,
  Send,
  Upload,
  Users,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const MOCK_PNR_DATA = {
  pnr: "ABC123",
  passenger: "Rahul Sharma",
  flight: "AI 101",
  airline: "Air India",
  date: "15 Mar 2026",
  from: "Delhi (DEL)",
  to: "Mumbai (BOM)",
  ticket: "098-1234567890",
  bookingClass: "Economy (Y)",
  baggage: "15kg Check-in + 7kg Cabin",
  fare: "₹6,540",
  status: "Confirmed",
  seat: "14A",
  depart: "06:30",
  arrive: "08:45",
};

const BULK_PNRS = [
  {
    pnr: "XK9821",
    passenger: "Priya Patel",
    flight: "6E 234",
    date: "18 Mar 2026",
    status: "Imported",
  },
  {
    pnr: "TY4512",
    passenger: "Amit Kumar",
    flight: "SG 110",
    date: "19 Mar 2026",
    status: "Imported",
  },
  {
    pnr: "MN3304",
    passenger: "Sunita Rao",
    flight: "AI 505",
    date: "20 Mar 2026",
    status: "Pending",
  },
  {
    pnr: "QW8821",
    passenger: "Ravi Verma",
    flight: "UK 935",
    date: "21 Mar 2026",
    status: "Failed",
  },
  {
    pnr: "ZX1190",
    passenger: "Deepa Singh",
    flight: "6E 890",
    date: "22 Mar 2026",
    status: "Imported",
  },
];

const MONITORED_PNRS = [
  {
    pnr: "ABC123",
    route: "DEL→BOM",
    flight: "AI 101",
    dep: "15 Mar 06:30",
    status: "On Time",
    checked: "2 min ago",
  },
  {
    pnr: "XK9821",
    route: "BOM→DEL",
    flight: "6E 234",
    dep: "18 Mar 10:15",
    status: "Delayed",
    checked: "5 min ago",
  },
  {
    pnr: "TY4512",
    route: "DEL→HYD",
    flight: "SG 110",
    dep: "19 Mar 14:00",
    status: "On Time",
    checked: "8 min ago",
  },
  {
    pnr: "MN3304",
    route: "MAA→DEL",
    flight: "AI 505",
    dep: "20 Mar 08:45",
    status: "Cancelled",
    checked: "12 min ago",
  },
  {
    pnr: "ZX1190",
    route: "BLR→PNQ",
    flight: "6E 890",
    dep: "22 Mar 07:20",
    status: "On Time",
    checked: "15 min ago",
  },
];

const BOOKING_HISTORY = [
  {
    id: "FSP001",
    pnr: "ABC123",
    passenger: "Rahul Sharma",
    route: "DEL→BOM",
    created: "10 Mar 2026",
    status: "Confirmed",
  },
  {
    id: "FSP002",
    pnr: "XK9821",
    passenger: "Priya Patel",
    route: "BOM→DEL",
    created: "09 Mar 2026",
    status: "Confirmed",
  },
  {
    id: "FSP003",
    pnr: "TY4512",
    passenger: "Amit Kumar",
    route: "DEL→HYD",
    created: "08 Mar 2026",
    status: "Pending",
  },
  {
    id: "FSP004",
    pnr: "MN3304",
    passenger: "Sunita Rao",
    route: "MAA→DEL",
    created: "07 Mar 2026",
    status: "Cancelled",
  },
  {
    id: "FSP005",
    pnr: "QW8821",
    passenger: "Ravi Verma",
    route: "HYD→BLR",
    created: "06 Mar 2026",
    status: "Confirmed",
  },
  {
    id: "FSP006",
    pnr: "ZX1190",
    passenger: "Deepa Singh",
    route: "BLR→PNQ",
    created: "05 Mar 2026",
    status: "Confirmed",
  },
  {
    id: "FSP007",
    pnr: "RT5631",
    passenger: "Kiran Mehta",
    route: "AMD→DEL",
    created: "04 Mar 2026",
    status: "Confirmed",
  },
  {
    id: "FSP008",
    pnr: "PQ2287",
    passenger: "Nisha Jain",
    route: "DEL→JAI",
    created: "03 Mar 2026",
    status: "Pending",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Imported: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Failed: "bg-red-100 text-red-700",
  "On Time": "bg-green-100 text-green-700",
  Delayed: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Confirmed: "bg-blue-100 text-blue-700",
};

// ── Share Modal ────────────────────────────────────────────────────────────────
function ShareModal({
  open,
  onClose,
  pnr,
}: { open: boolean; onClose: () => void; pnr: typeof MOCK_PNR_DATA }) {
  const [shareTab, setShareTab] = useState<"email" | "whatsapp">("email");
  const [sent, setSent] = useState(false);

  function handleSend() {
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Share Itinerary — PNR {pnr.pnr}</DialogTitle>
        </DialogHeader>
        {sent ? (
          <div className="py-10 text-center">
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-3" />
            <p className="font-semibold text-gray-800">Sent successfully!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShareTab("email")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  shareTab === "email"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-200 text-gray-500 hover:border-blue-300"
                }`}
              >
                <Mail className="w-4 h-4 inline mr-1" /> Email
              </button>
              <button
                type="button"
                onClick={() => setShareTab("whatsapp")}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition-all ${
                  shareTab === "whatsapp"
                    ? "bg-green-600 text-white border-green-600"
                    : "border-gray-200 text-gray-500 hover:border-green-300"
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-1" /> WhatsApp
              </button>
            </div>
            {shareTab === "email" && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                    To
                  </Label>
                  <Input placeholder="customer@email.com" className="h-10" />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                    Subject
                  </Label>
                  <Input
                    defaultValue={`Your Flight Itinerary — ${pnr.pnr}`}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                    Message
                  </Label>
                  <Textarea
                    rows={5}
                    defaultValue={`Dear ${pnr.passenger},\n\nYour booking is confirmed.\n\nFlight: ${pnr.flight} | ${pnr.from} → ${pnr.to}\nDate: ${pnr.date} | Depart: ${pnr.depart} | Arrive: ${pnr.arrive}\nSeat: ${pnr.seat} | Baggage: ${pnr.baggage}\n\nPNR: ${pnr.pnr}\nTicket: ${pnr.ticket}\n\nRegards,\nFiveStar Travel`}
                  />
                </div>
                <Button
                  data-ocid="smart-pnr.share.email.submit_button"
                  onClick={handleSend}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" /> Send Email
                </Button>
              </div>
            )}
            {shareTab === "whatsapp" && (
              <div className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                    WhatsApp Number
                  </Label>
                  <Input placeholder="+91 98765 43210" className="h-10" />
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-gray-700 whitespace-pre-line">
                  {`✈️ *Flight Itinerary — ${pnr.pnr}*

Dear ${pnr.passenger},

🛫 ${pnr.flight} | ${pnr.airline}
📍 ${pnr.from} → ${pnr.to}
📅 ${pnr.date} | ${pnr.depart} - ${pnr.arrive}
💺 Seat: ${pnr.seat} | ${pnr.baggage}

✅ Status: ${pnr.status}
📋 PNR: ${pnr.pnr}

Booked by FiveStar Travel
📞 +91-1725000004`}
                </div>
                <Button
                  data-ocid="smart-pnr.share.whatsapp.submit_button"
                  onClick={handleSend}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Send WhatsApp
                </Button>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export function SmartPNRModule() {
  const [pnrInput, setPnrInput] = useState("");
  const [fetched, setFetched] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);

  function handleFetch() {
    setFetched(true);
  }

  const stats = [
    {
      label: "Total Active PNRs",
      value: "142",
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Schedule Changes",
      value: "3",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Cancellations",
      value: "1",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Departing in 24h",
      value: "8",
      icon: Plane,
      color: "text-green-600",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Smart PNR Import</h2>
        <p className="text-gray-500 text-sm">
          Import PNRs from GDS / airline systems and manage all bookings
          automatically
        </p>
      </div>

      <Tabs defaultValue="import">
        <TabsList className="flex flex-wrap h-auto gap-1 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger
            data-ocid="smart-pnr.import.tab"
            value="import"
            className="text-xs"
          >
            Import PNR
          </TabsTrigger>
          <TabsTrigger
            data-ocid="smart-pnr.bulk.tab"
            value="bulk"
            className="text-xs"
          >
            Bulk Import
          </TabsTrigger>
          <TabsTrigger
            data-ocid="smart-pnr.monitoring.tab"
            value="monitoring"
            className="text-xs"
          >
            PNR Monitoring
          </TabsTrigger>
          <TabsTrigger
            data-ocid="smart-pnr.history.tab"
            value="history"
            className="text-xs"
          >
            Booking History
          </TabsTrigger>
          <TabsTrigger
            data-ocid="smart-pnr.docs.tab"
            value="docs"
            className="text-xs"
          >
            Passenger Docs
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Import PNR ── */}
        <TabsContent value="import" className="space-y-5 mt-5">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Enter PNR Number</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    data-ocid="smart-pnr.pnr.input"
                    value={pnrInput}
                    onChange={(e) => setPnrInput(e.target.value)}
                    placeholder="Enter PNR (e.g. ABC123) or try any value"
                    className="pl-9 h-11"
                  />
                </div>
                <Button
                  data-ocid="smart-pnr.fetch.primary_button"
                  onClick={handleFetch}
                  className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Fetch Details
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="font-semibold">GDS Sources:</span>
                {[
                  "Amadeus",
                  "Galileo/Travelport",
                  "Sabre",
                  "IndiGo Direct",
                  "Air India API",
                ].map((s) => (
                  <Badge key={s} variant="outline" className="text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {fetched && (
            <div className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      PNR Details Auto-Fetched
                    </CardTitle>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      CONFIRMED
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      ["PNR Number", MOCK_PNR_DATA.pnr],
                      ["Passenger", MOCK_PNR_DATA.passenger],
                      ["Flight", MOCK_PNR_DATA.flight],
                      ["Airline", MOCK_PNR_DATA.airline],
                      ["Travel Date", MOCK_PNR_DATA.date],
                      ["From", MOCK_PNR_DATA.from],
                      ["To", MOCK_PNR_DATA.to],
                      ["Depart", MOCK_PNR_DATA.depart],
                      ["Arrive", MOCK_PNR_DATA.arrive],
                      ["Ticket No.", MOCK_PNR_DATA.ticket],
                      ["Booking Class", MOCK_PNR_DATA.bookingClass],
                      ["Seat", MOCK_PNR_DATA.seat],
                      ["Baggage", MOCK_PNR_DATA.baggage],
                      ["Fare", MOCK_PNR_DATA.fare],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                        <p className="font-semibold text-gray-800 text-sm">
                          {val}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {bookingCreated && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Booking File Created — #FSP-
                      {Math.floor(Math.random() * 9000 + 1000)}
                    </p>
                    <p className="text-xs text-green-700">
                      Linked to CRM customer profile. Invoice generated
                      automatically.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => setBookingCreated(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" /> Create Booking File
                </Button>
                <Button
                  data-ocid="smart-pnr.share.open_modal_button"
                  onClick={() => setShareOpen(true)}
                  variant="outline"
                  className="border-green-300 text-green-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Send via WhatsApp
                </Button>
                <Button
                  onClick={() => setShareOpen(true)}
                  variant="outline"
                  className="border-blue-300 text-blue-700"
                >
                  <Mail className="w-4 h-4 mr-2" /> Send via Email
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700"
                >
                  <FileText className="w-4 h-4 mr-2" /> Generate Invoice
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── Tab 2: Bulk Import ── */}
        <TabsContent value="bulk" className="space-y-5 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Upload Excel / CSV</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div
                  data-ocid="smart-pnr.bulk.dropzone"
                  className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-700">
                    Drag & drop your file here
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supports .xlsx, .xls, .csv
                  </p>
                </div>
                {uploadDone ? (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> 5 PNRs imported
                    successfully
                  </p>
                ) : (
                  <Button
                    data-ocid="smart-pnr.bulk.upload_button"
                    onClick={() => setUploadDone(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-2" /> Browse & Upload
                  </Button>
                )}
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Import via API</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                    API Endpoint URL
                  </Label>
                  <Input
                    defaultValue="https://api.amadeus.com/v1/pnr/bulk"
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-gray-500 mb-1 block">
                    API Key
                  </Label>
                  <Input
                    type="password"
                    defaultValue="••••••••••••"
                    className="h-10"
                  />
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                  Connect & Import
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Recently Imported PNRs
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {[
                      "PNR",
                      "Passenger",
                      "Flight",
                      "Date",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {BULK_PNRS.map((row, i) => (
                    <tr
                      key={row.pnr}
                      data-ocid={`smart-pnr.bulk.row.item.${i + 1}`}
                      className="py-3"
                    >
                      <td className="py-3 pr-4 font-mono font-bold text-blue-700">
                        {row.pnr}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">
                        {row.passenger}
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{row.flight}</td>
                      <td className="py-3 pr-4 text-gray-600">{row.date}</td>
                      <td className="py-3 pr-4">
                        <Badge
                          className={`${STATUS_COLORS[row.status]} border-0 text-xs`}
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="text-xs text-green-600 hover:underline"
                          >
                            Share
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 3: PNR Monitoring ── */}
        <TabsContent value="monitoring" className="space-y-5 mt-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center`}
                  >
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-xs text-gray-500">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Live PNR Monitoring</CardTitle>
                <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                  Auto-refresh every 5min
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    {[
                      "PNR",
                      "Route",
                      "Flight",
                      "Departure",
                      "Status",
                      "Last Checked",
                      "Alert",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left pb-2 pr-4 text-xs font-semibold text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MONITORED_PNRS.map((row) => (
                    <tr key={row.pnr} className="hover:bg-gray-50">
                      <td className="py-3 pr-4 font-mono font-bold text-blue-700">
                        {row.pnr}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">{row.route}</td>
                      <td className="py-3 pr-4 text-gray-600">{row.flight}</td>
                      <td className="py-3 pr-4 text-gray-600 text-xs">
                        {row.dep}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          className={`${STATUS_COLORS[row.status]} border-0 text-xs`}
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-xs text-gray-400">
                        {row.checked}
                      </td>
                      <td className="py-3 pr-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs"
                        >
                          <Bell className="w-3 h-3 mr-1" /> Notify
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 4: Booking History ── */}
        <TabsContent value="history" className="space-y-5 mt-5">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-3">
                <Input
                  placeholder="Search by PNR, name..."
                  className="h-9 w-48"
                />
                <select className="border rounded-lg px-3 h-9 text-sm text-gray-600">
                  <option value="">All Status</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
                <Input
                  type="date"
                  className="h-9 w-36"
                  defaultValue="2026-03-01"
                />
                <Input
                  type="date"
                  className="h-9 w-36"
                  defaultValue="2026-03-31"
                />
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Booking ID",
                      "PNR",
                      "Passenger",
                      "Route",
                      "Created",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {BOOKING_HISTORY.map((row, i) => (
                    <tr
                      key={row.id}
                      data-ocid={`smart-pnr.history.row.item.${i + 1}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 font-semibold text-blue-700">
                        {row.id}
                      </td>
                      <td className="py-3 px-4 font-mono text-gray-700">
                        {row.pnr}
                      </td>
                      <td className="py-3 px-4 text-gray-700">
                        {row.passenger}
                      </td>
                      <td className="py-3 px-4 text-gray-600">{row.route}</td>
                      <td className="py-3 px-4 text-gray-500 text-xs">
                        {row.created}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${STATUS_COLORS[row.status]} border-0 text-xs`}
                        >
                          {row.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            className="text-xs text-blue-600 hover:underline flex items-center gap-0.5"
                          >
                            <Eye className="w-3 h-3" /> View
                          </button>
                          <button
                            type="button"
                            className="text-xs text-gray-500 hover:underline flex items-center gap-0.5"
                          >
                            <Download className="w-3 h-3" /> PDF
                          </button>
                          <button
                            type="button"
                            onClick={() => setShareOpen(true)}
                            className="text-xs text-green-600 hover:underline flex items-center gap-0.5"
                          >
                            <Send className="w-3 h-3" /> Share
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Tab 5: Passenger Docs ── */}
        <TabsContent value="docs" className="space-y-5 mt-5">
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  Passenger Document Storage
                </CardTitle>
                <Button
                  size="sm"
                  className="h-8 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  <Upload className="w-3 h-3 mr-1" /> Upload Document
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Rahul Sharma — Passport",
                  pnr: "ABC123",
                  date: "10 Mar 2026",
                  type: "Passport",
                  size: "2.1 MB",
                },
                {
                  name: "Rahul Sharma — Visa Copy",
                  pnr: "ABC123",
                  date: "10 Mar 2026",
                  type: "Visa",
                  size: "1.3 MB",
                },
                {
                  name: "Priya Patel — Passport",
                  pnr: "XK9821",
                  date: "09 Mar 2026",
                  type: "Passport",
                  size: "1.8 MB",
                },
                {
                  name: "Priya Patel — Insurance",
                  pnr: "XK9821",
                  date: "09 Mar 2026",
                  type: "Insurance",
                  size: "0.5 MB",
                },
                {
                  name: "Amit Kumar — Passport",
                  pnr: "TY4512",
                  date: "08 Mar 2026",
                  type: "Passport",
                  size: "2.0 MB",
                },
              ].map((doc, i) => (
                <div
                  key={doc.name}
                  data-ocid={`smart-pnr.docs.item.${i + 1}`}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        PNR: {doc.pnr} · {doc.date} · {doc.size}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Download className="w-3 h-3 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              ))}
              <div
                data-ocid="smart-pnr.docs.dropzone"
                className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mt-4 cursor-pointer hover:border-blue-300 transition-colors"
              >
                <Upload className="w-6 h-6 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  Drop documents here to upload
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  PDF, JPG, PNG supported
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        pnr={MOCK_PNR_DATA}
      />
    </div>
  );
}
