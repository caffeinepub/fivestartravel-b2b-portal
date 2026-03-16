import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  Eye,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Send,
  Settings,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ── Mock data ──────────────────────────────────────────────────────────────
const upcomingReminders = [
  {
    id: "FST-87234",
    service: "Grand Palace Hotel Bangkok",
    client: "Rahul Sharma",
    serviceDate: "20 Mar 2026",
    serviceType: "Hotel",
    reminderType: "Client",
    channel: "WhatsApp",
    status: "Scheduled",
  },
  {
    id: "FST-87235",
    service: "Safari World Tour",
    client: "Priya Mehta",
    serviceDate: "20 Mar 2026",
    serviceType: "Tour",
    reminderType: "Client",
    channel: "WhatsApp",
    status: "Sent",
  },
  {
    id: "FST-87235",
    service: "Safari World Tour",
    client: "Priya Mehta",
    serviceDate: "20 Mar 2026",
    serviceType: "Tour",
    reminderType: "Supplier",
    channel: "Email",
    status: "Sent",
  },
  {
    id: "FST-87236",
    service: "Airport Transfer DEL",
    client: "Amit Kapoor",
    serviceDate: "21 Mar 2026",
    serviceType: "Transfer",
    reminderType: "Client",
    channel: "SMS",
    status: "Scheduled",
  },
  {
    id: "FST-87237",
    service: "Dubai Visa Sticker",
    client: "Sneha Gupta",
    serviceDate: "22 Mar 2026",
    serviceType: "Visa",
    reminderType: "Passport",
    channel: "WhatsApp",
    status: "Failed",
  },
  {
    id: "FST-87238",
    service: "Royal Caribbean Cruise",
    client: "Vikram Singh",
    serviceDate: "25 Mar 2026",
    serviceType: "Cruise",
    reminderType: "Client",
    channel: "Email",
    status: "Scheduled",
  },
  {
    id: "FST-87238",
    service: "Royal Caribbean Cruise",
    client: "Vikram Singh",
    serviceDate: "25 Mar 2026",
    serviceType: "Cruise",
    reminderType: "Supplier",
    channel: "Email",
    status: "Scheduled",
  },
  {
    id: "FST-87239",
    service: "Pattaya City Tour",
    client: "Anita Joshi",
    serviceDate: "22 Mar 2026",
    serviceType: "Tour",
    reminderType: "Client",
    channel: "WhatsApp",
    status: "Sent",
  },
  {
    id: "FST-87240",
    service: "Siam City Hotel",
    client: "Ravi Patel",
    serviceDate: "23 Mar 2026",
    serviceType: "Hotel",
    reminderType: "Client",
    channel: "WhatsApp",
    status: "Sent",
  },
  {
    id: "FST-87241",
    service: "Private Sedan Transfer",
    client: "Deepak Kumar",
    serviceDate: "24 Mar 2026",
    serviceType: "Transfer",
    reminderType: "Supplier",
    channel: "WhatsApp",
    status: "Scheduled",
  },
  {
    id: "FST-87242",
    service: "Thailand eVisa",
    client: "Kavya Reddy",
    serviceDate: "26 Mar 2026",
    serviceType: "Visa",
    reminderType: "Passport",
    channel: "Email",
    status: "Scheduled",
  },
  {
    id: "FST-87243",
    service: "Coral Island Tour",
    client: "Nikhil Sharma",
    serviceDate: "23 Mar 2026",
    serviceType: "Tour",
    reminderType: "Client",
    channel: "WhatsApp",
    status: "Failed",
  },
  {
    id: "FST-87244",
    service: "Dinner Cruise Bangkok",
    client: "Meena Nair",
    serviceDate: "21 Mar 2026",
    serviceType: "Tour",
    reminderType: "Client",
    channel: "WhatsApp",
    status: "Sent",
  },
  {
    id: "FST-87245",
    service: "Luxury Hotel Dubai",
    client: "Arjun Rao",
    serviceDate: "28 Mar 2026",
    serviceType: "Hotel",
    reminderType: "Supplier",
    channel: "Email",
    status: "Scheduled",
  },
  {
    id: "FST-87246",
    service: "Euro Rail Pass",
    client: "Sunita Verma",
    serviceDate: "30 Mar 2026",
    serviceType: "Railway",
    reminderType: "Client",
    channel: "Email",
    status: "Scheduled",
  },
];

const passportReminders = [
  {
    id: "FST-87234",
    guest: "Rahul Sharma",
    service: "Grand Palace Hotel Bangkok",
    checkIn: "20 Mar 2026",
    passportStatus: "Missing",
    reminderSent: "2 days ago",
  },
  {
    id: "FST-87237",
    guest: "Sneha Gupta",
    service: "Dubai Visa Sticker",
    checkIn: "22 Mar 2026",
    passportStatus: "Missing",
    reminderSent: "1 day ago",
  },
  {
    id: "FST-87248",
    guest: "Pooja Sharma",
    service: "Singapore eVisa",
    checkIn: "24 Mar 2026",
    passportStatus: "Partial",
    reminderSent: "Today",
  },
  {
    id: "FST-87249",
    guest: "Kiran Mehta",
    service: "Bali Hotel Resort",
    checkIn: "25 Mar 2026",
    passportStatus: "Missing",
    reminderSent: "Not sent",
  },
  {
    id: "FST-87250",
    guest: "Anup Jain",
    service: "Thailand eVisa",
    checkIn: "26 Mar 2026",
    passportStatus: "Missing",
    reminderSent: "Today",
  },
  {
    id: "FST-87251",
    guest: "Divya Pillai",
    service: "Maldives Resort",
    checkIn: "28 Mar 2026",
    passportStatus: "Partial",
    reminderSent: "Yesterday",
  },
  {
    id: "FST-87252",
    guest: "Sanjay Gupta",
    service: "Dubai Hotel Burj",
    checkIn: "29 Mar 2026",
    passportStatus: "Missing",
    reminderSent: "Not sent",
  },
  {
    id: "FST-87253",
    guest: "Rekha Nair",
    service: "Europe Rail Tour",
    checkIn: "01 Apr 2026",
    passportStatus: "Received",
    reminderSent: "3 days ago",
  },
  {
    id: "FST-87254",
    guest: "Tarun Bose",
    service: "Hong Kong Hotel",
    checkIn: "02 Apr 2026",
    passportStatus: "Missing",
    reminderSent: "Not sent",
  },
  {
    id: "FST-87255",
    guest: "Madhuri Rao",
    service: "Malaysia eVisa",
    checkIn: "03 Apr 2026",
    passportStatus: "Received",
    reminderSent: "2 days ago",
  },
  {
    id: "FST-87256",
    guest: "Vijay Sharma",
    service: "Japan Hotel Tokyo",
    checkIn: "05 Apr 2026",
    passportStatus: "Partial",
    reminderSent: "Today",
  },
  {
    id: "FST-87257",
    guest: "Neha Agarwal",
    service: "UK Visa Sticker",
    checkIn: "10 Apr 2026",
    passportStatus: "Received",
    reminderSent: "1 week ago",
  },
];

const automationRules = [
  {
    name: "1-Day Before Service",
    desc: "Send client + supplier reminder 24h before service date",
    channels: ["W", "E", "S"],
    lastTriggered: "Today 09:00",
    active: true,
  },
  {
    name: "Booking Confirmation Auto-Send",
    desc: "Send confirmation to client immediately after booking confirmed",
    channels: ["W", "E"],
    lastTriggered: "Today 11:30",
    active: true,
  },
  {
    name: "Passport Missing Reminder",
    desc: "Send passport reminder every 24h until received",
    channels: ["W", "E"],
    lastTriggered: "Today 08:00",
    active: true,
  },
  {
    name: "Payment Due Reminder",
    desc: "Remind agent 2 days before payment deadline",
    channels: ["W", "E", "S"],
    lastTriggered: "Yesterday 10:00",
    active: true,
  },
  {
    name: "Supplier Non-Confirmation Alert",
    desc: "Alert admin if supplier hasn't confirmed after 3h",
    channels: ["E", "S"],
    lastTriggered: "2 hours ago",
    active: true,
  },
  {
    name: "Departure Day Reminder",
    desc: "Send departure-day reminder to client",
    channels: ["W", "S"],
    lastTriggered: "Never",
    active: false,
  },
];

const clientTemplate1 = `Dear {guest_name},

This is a reminder for your upcoming booking.

Service: {service_name}
Date: {service_date}
Pickup Time: {pickup_time}
Passengers: {passengers}

Please be ready at the hotel lobby.
For assistance contact our support.

Thank you.
FiveStar Travel`;

const supplierTemplate1 = `Dear Supplier,

Reminder for tomorrow's service.

Service: {service_name}
Date: {service_date}
Passengers: {passengers}
Pickup: {pickup_location}

Please confirm driver and vehicle details.

Thank you.
FiveStar Travel`;

const passportTemplate = `Dear Client,

Please share passport copy to complete your booking.

Without passport entry the hotel cannot confirm the reservation.

Kindly send passport copy as soon as possible.

Thank you.
FiveStar Travel`;

const clientTemplate2 = `Dear {guest_name},

Your booking is confirmed!

Booking ID: {booking_id}
Service: {service_name}
Date: {service_date}
Total: {total_amount}

Please find your voucher attached.

Thank you.
FiveStar Travel`;

const clientTemplate3 = `Dear {guest_name},

Your booking has been cancelled.

Booking ID: {booking_id}
Service: {service_name}
Refund: {refund_amount}

For assistance please contact support.

Thank you.
FiveStar Travel`;

const supplierTemplate2 = `Dear {supplier_name},

New booking received!

Booking ID: {booking_id}
Service: {service_name}
Date: {service_date}
Passengers: {passengers}
Pickup: {pickup_location}

Please confirm availability.

Thank you.
FiveStar Travel`;

// ── Status badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  if (status === "Sent")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
        <CheckCircle className="w-3 h-3" />
        Sent
      </span>
    );
  if (status === "Scheduled")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400">
        <Clock className="w-3 h-3" />
        Scheduled
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
      <AlertTriangle className="w-3 h-3" />
      Failed
    </span>
  );
}

function ChannelBadge({ channel }: { channel: string }) {
  if (channel === "WhatsApp")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#25D366]/15 text-[#25D366]">
        <MessageCircle className="w-2.5 h-2.5" />
        WA
      </span>
    );
  if (channel === "Email")
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400">
        <Mail className="w-2.5 h-2.5" />
        Email
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400">
      <Phone className="w-2.5 h-2.5" />
      SMS
    </span>
  );
}

function PassportStatusBadge({ status }: { status: string }) {
  if (status === "Received")
    return (
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
        Received
      </span>
    );
  if (status === "Partial")
    return (
      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400">
        Partial
      </span>
    );
  return (
    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-400">
      Missing
    </span>
  );
}

// ── Template Card ─────────────────────────────────────────────────────────────
function TemplateCard({
  title,
  template,
  hours = 24,
  scope,
}: { title: string; template: string; hours?: number; scope: string }) {
  const [text, setText] = useState(template);
  const [hrs, setHrs] = useState(hours);
  const [waEnabled, setWaEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);

  return (
    <Card className="bg-slate-800/60 border-slate-700/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-white">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setWaEnabled((v) => !v)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${waEnabled ? "bg-[#25D366]/20 text-[#25D366] border-[#25D366]/40" : "bg-slate-700 text-slate-500 border-slate-600"}`}
            >
              WA
            </button>
            <button
              type="button"
              onClick={() => setEmailEnabled((v) => !v)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${emailEnabled ? "bg-blue-500/20 text-blue-400 border-blue-500/40" : "bg-slate-700 text-slate-500 border-slate-600"}`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => setSmsEnabled((v) => !v)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${smsEnabled ? "bg-purple-500/20 text-purple-400 border-purple-500/40" : "bg-slate-700 text-slate-500 border-slate-600"}`}
            >
              SMS
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-400">Send</span>
          <input
            type="number"
            value={hrs}
            onChange={(e) => setHrs(Number(e.target.value))}
            className="w-14 text-center text-xs bg-slate-700 border border-slate-600 rounded px-2 py-0.5 text-white"
          />
          <span className="text-xs text-slate-400">hours before service</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-slate-900/60 border-slate-600 text-slate-200 text-xs font-mono min-h-[180px] resize-none"
          data-ocid={`${scope}.textarea`}
        />
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-teal-600 hover:bg-teal-500 text-white text-xs"
            data-ocid={`${scope}.save_button`}
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Save
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
            data-ocid={`${scope}.secondary_button`}
          >
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 text-xs"
            data-ocid={`${scope}.primary_button`}
          >
            <Send className="w-3 h-3 mr-1" />
            Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function RemindersCenter() {
  const [filter, setFilter] = useState<"All" | "Scheduled" | "Sent" | "Failed">(
    "All",
  );
  const [rules, setRules] = useState(automationRules.map((r) => ({ ...r })));

  const filtered =
    filter === "All"
      ? upcomingReminders
      : upcomingReminders.filter((r) => r.status === filter);

  const toggleRule = (i: number) => {
    setRules((prev) =>
      prev.map((r, idx) => (idx === i ? { ...r, active: !r.active } : r)),
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">
            Reminders & Automation Center
          </h2>
          <p className="text-sm text-slate-400">
            Automated service reminders for clients, suppliers, and passport
            collection
          </p>
        </div>
        <Button
          className="bg-teal-600 hover:bg-teal-500 text-white"
          data-ocid="reminders.send_all.primary_button"
        >
          <Zap className="w-4 h-4 mr-2" />
          Run All Pending
        </Button>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList className="bg-slate-800/80 border border-slate-700/50 p-1">
          <TabsTrigger
            value="upcoming"
            className="text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            data-ocid="reminders.upcoming.tab"
          >
            Upcoming Reminders
          </TabsTrigger>
          <TabsTrigger
            value="client-templates"
            className="text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            data-ocid="reminders.client_templates.tab"
          >
            Client Templates
          </TabsTrigger>
          <TabsTrigger
            value="supplier-templates"
            className="text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            data-ocid="reminders.supplier_templates.tab"
          >
            Supplier Templates
          </TabsTrigger>
          <TabsTrigger
            value="passport"
            className="text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            data-ocid="reminders.passport.tab"
          >
            Passport Reminders
          </TabsTrigger>
          <TabsTrigger
            value="automation"
            className="text-xs data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            data-ocid="reminders.automation.tab"
          >
            Automation Rules
          </TabsTrigger>
        </TabsList>

        {/* ── Tab 1: Upcoming ── */}
        <TabsContent value="upcoming" className="mt-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "Sent Today",
                value: "47",
                color: "text-teal-400",
                bg: "bg-teal-500/10",
              },
              {
                label: "Pending",
                value: "12",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
              },
              {
                label: "Failed",
                value: "2",
                color: "text-red-400",
                bg: "bg-red-500/10",
              },
              {
                label: "Success Rate",
                value: "96%",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
            ].map((stat, i) => (
              <Card
                key={stat.label}
                className={`${stat.bg} border-slate-700/50`}
                data-ocid={`reminders.stat.card.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3">
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters + bulk action */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2">
              {(["All", "Scheduled", "Sent", "Failed"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${filter === f ? "bg-teal-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"}`}
                  data-ocid="reminders.filter.tab"
                >
                  {f}
                </button>
              ))}
            </div>
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs"
              data-ocid="reminders.bulk_send.primary_button"
            >
              <Send className="w-3 h-3 mr-1.5" />
              Send All Pending
            </Button>
          </div>

          {/* Table */}
          <Card className="bg-slate-800/60 border-slate-700/50">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    {[
                      "Booking ID",
                      "Service",
                      "Client",
                      "Service Date",
                      "Type",
                      "Reminder",
                      "Channel",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left text-slate-400 font-medium px-4 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r, i) => (
                    <tr
                      key={`${r.id}-${r.reminderType}-${i}`}
                      className="border-b border-slate-700/30 hover:bg-slate-700/20"
                      data-ocid={`reminders.item.${i + 1}`}
                    >
                      <td className="px-4 py-2.5 text-teal-400 font-mono font-semibold">
                        {r.id}
                      </td>
                      <td className="px-4 py-2.5 text-slate-200 max-w-[160px] truncate">
                        {r.service}
                      </td>
                      <td className="px-4 py-2.5 text-slate-300">{r.client}</td>
                      <td className="px-4 py-2.5 text-slate-400">
                        {r.serviceDate}
                      </td>
                      <td className="px-4 py-2.5">
                        <Badge
                          variant="outline"
                          className="text-[10px] border-slate-600 text-slate-400"
                        >
                          {r.serviceType}
                        </Badge>
                      </td>
                      <td className="px-4 py-2.5">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${r.reminderType === "Client" ? "bg-blue-500/15 text-blue-400" : r.reminderType === "Supplier" ? "bg-orange-500/15 text-orange-400" : "bg-purple-500/15 text-purple-400"}`}
                        >
                          {r.reminderType}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <ChannelBadge channel={r.channel} />
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={r.status} />
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex gap-1">
                          <button
                            type="button"
                            className="text-slate-400 hover:text-teal-400 transition-colors"
                            data-ocid={`reminders.preview.button.${i + 1}`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            className="text-slate-400 hover:text-teal-400 transition-colors"
                            data-ocid={`reminders.send.button.${i + 1}`}
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* ── Tab 2: Client Templates ── */}
        <TabsContent value="client-templates" className="mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TemplateCard
              title="Service Reminder (1 Day Before)"
              template={clientTemplate1}
              hours={24}
              scope="client.service_reminder"
            />
            <TemplateCard
              title="Booking Confirmation"
              template={clientTemplate2}
              hours={0}
              scope="client.booking_confirmation"
            />
            <TemplateCard
              title="Cancellation Notice"
              template={clientTemplate3}
              hours={0}
              scope="client.cancellation"
            />
          </div>
        </TabsContent>

        {/* ── Tab 3: Supplier Templates ── */}
        <TabsContent value="supplier-templates" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <TemplateCard
              title="Service Reminder (1 Day Before)"
              template={supplierTemplate1}
              hours={24}
              scope="supplier.service_reminder"
            />
            <TemplateCard
              title="Booking Confirmation to Supplier"
              template={supplierTemplate2}
              hours={0}
              scope="supplier.booking_confirmation"
            />
          </div>
        </TabsContent>

        {/* ── Tab 4: Passport Reminders ── */}
        <TabsContent value="passport" className="mt-4 space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Missing Passports",
                value: "23",
                color: "text-red-400",
                bg: "bg-red-500/10",
              },
              {
                label: "Reminded Today",
                value: "11",
                color: "text-yellow-400",
                bg: "bg-yellow-500/10",
              },
              {
                label: "Received",
                value: "8",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
            ].map((stat, i) => (
              <Card
                key={stat.label}
                className={`${stat.bg} border-slate-700/50`}
                data-ocid={`reminders.passport.stat.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3">
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Table */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-white">
                  Bookings Missing Passport
                </h3>
                <Button
                  size="sm"
                  className="bg-teal-600 hover:bg-teal-500 text-white text-xs"
                  data-ocid="reminders.passport.send_all.primary_button"
                >
                  <Send className="w-3 h-3 mr-1.5" />
                  Send Reminders to All Missing
                </Button>
              </div>
              <Card className="bg-slate-800/60 border-slate-700/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        {[
                          "Booking ID",
                          "Guest",
                          "Service",
                          "Check-in",
                          "Passport",
                          "Last Reminder",
                          "Actions",
                        ].map((h) => (
                          <th
                            key={h}
                            className="text-left text-slate-400 font-medium px-4 py-3"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {passportReminders.map((r, i) => (
                        <tr
                          key={r.id}
                          className="border-b border-slate-700/30 hover:bg-slate-700/20"
                          data-ocid={`reminders.passport.item.${i + 1}`}
                        >
                          <td className="px-4 py-2.5 text-teal-400 font-mono font-semibold">
                            {r.id}
                          </td>
                          <td className="px-4 py-2.5 text-slate-200">
                            {r.guest}
                          </td>
                          <td className="px-4 py-2.5 text-slate-400 max-w-[120px] truncate">
                            {r.service}
                          </td>
                          <td className="px-4 py-2.5 text-slate-400">
                            {r.checkIn}
                          </td>
                          <td className="px-4 py-2.5">
                            <PassportStatusBadge status={r.passportStatus} />
                          </td>
                          <td className="px-4 py-2.5 text-slate-500">
                            {r.reminderSent}
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex gap-1">
                              {r.passportStatus !== "Received" && (
                                <button
                                  type="button"
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded bg-teal-500/15 text-teal-400 hover:bg-teal-500/30"
                                  data-ocid={`reminders.passport.send.button.${i + 1}`}
                                >
                                  Send
                                </button>
                              )}
                              <button
                                type="button"
                                className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/30"
                                data-ocid={`reminders.passport.mark.button.${i + 1}`}
                              >
                                Received
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Template preview */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-3">
                Passport Reminder Template
              </h3>
              <Card className="bg-slate-800/60 border-slate-700/50">
                <CardContent className="pt-4">
                  <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                    {passportTemplate}
                  </pre>
                  <div className="flex gap-2 mt-4">
                    <button
                      type="button"
                      className="flex-1 text-xs font-semibold py-1.5 rounded bg-teal-600/20 text-teal-400 border border-teal-600/40 hover:bg-teal-600/30 transition-colors"
                      data-ocid="reminders.passport.template.edit_button"
                    >
                      Edit Template
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── Tab 5: Automation Rules ── */}
        <TabsContent value="automation" className="mt-4 space-y-4">
          {/* Timeline visualizer */}
          <Card className="bg-slate-800/60 border-slate-700/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-teal-400" />
                Reminder Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span>Booking Created</span>
                  <span>-7 days</span>
                  <span>-2 days</span>
                  <span>-1 day</span>
                  <span>Service Day</span>
                </div>
                <div className="relative h-8 bg-slate-900/60 rounded-lg overflow-hidden">
                  <div className="absolute inset-y-0 left-[0%] w-0.5 bg-blue-500/60" />
                  <div className="absolute inset-y-0 left-[30%] w-0.5 bg-yellow-500/40" />
                  <div className="absolute inset-y-0 left-[65%] w-0.5 bg-orange-500/60" />
                  <div className="absolute inset-y-0 left-[82%] w-0.5 bg-teal-500/80" />
                  <div className="absolute inset-y-0 left-[100%] w-0.5 bg-emerald-500/60" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[0%] w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-800 -translate-x-1.5"
                    title="Booking Confirmation"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[30%] w-3 h-3 rounded-full bg-yellow-500 border-2 border-slate-800 -translate-x-1.5"
                    title="Payment Reminder"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[65%] w-3 h-3 rounded-full bg-orange-500 border-2 border-slate-800 -translate-x-1.5"
                    title="Passport Reminder"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[82%] w-3 h-3 rounded-full bg-teal-500 border-2 border-slate-800 -translate-x-1.5"
                    title="1-Day Service Reminder"
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[99%] w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-800 -translate-x-1.5"
                    title="Departure Day"
                  />
                  <div className="absolute inset-0 flex items-center px-2">
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-500/40 via-teal-500/40 to-emerald-500/40 rounded" />
                  </div>
                </div>
                <div className="flex items-start justify-between mt-1 text-[9px] text-slate-500">
                  <span className="text-blue-400">✉ Confirmation</span>
                  <span className="text-yellow-400">💳 Payment</span>
                  <span className="text-orange-400">🛂 Passport</span>
                  <span className="text-teal-400">🔔 Service</span>
                  <span className="text-emerald-400">✈ Departure</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automation rule cards */}
          <div className="grid md:grid-cols-2 gap-3">
            {rules.map((rule, i) => (
              <Card
                key={rule.name}
                className={`border-slate-700/50 transition-colors ${rule.active ? "bg-slate-800/60" : "bg-slate-800/30 opacity-60"}`}
                data-ocid={`reminders.automation.card.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap
                          className={`w-4 h-4 flex-shrink-0 ${rule.active ? "text-teal-400" : "text-slate-500"}`}
                        />
                        <h4 className="text-sm font-semibold text-white truncate">
                          {rule.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-2">
                        {rule.desc}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {rule.channels.map((ch) => (
                            <span
                              key={ch}
                              className={`text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded ${ch === "W" ? "bg-[#25D366]/20 text-[#25D366]" : ch === "E" ? "bg-blue-500/20 text-blue-400" : "bg-purple-500/20 text-purple-400"}`}
                            >
                              {ch}
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          Last: {rule.lastTriggered}
                        </span>
                      </div>
                    </div>
                    <Switch
                      checked={rule.active}
                      onCheckedChange={() => toggleRule(i)}
                      className="data-[state=checked]:bg-teal-600"
                      data-ocid={`reminders.automation.switch.${i + 1}`}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
