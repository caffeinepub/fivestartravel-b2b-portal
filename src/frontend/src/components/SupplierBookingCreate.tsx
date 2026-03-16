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
import {
  Building2,
  CheckCircle,
  Download,
  FileText,
  Mail,
  MessageSquare,
  PlusCircle,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";

const glassBg = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
};

const RECENT_BOOKINGS = [
  {
    id: "SUP-2026-00142",
    customer: "Ramesh Kumar",
    service: "Hotel - Grand Hyatt Dubai",
    amount: "74,000",
    status: "Confirmed",
    date: "14 Mar 2026",
  },
  {
    id: "SUP-2026-00141",
    customer: "Priya Singh",
    service: "Tour - Desert Safari",
    amount: "11,200",
    status: "Confirmed",
    date: "13 Mar 2026",
  },
  {
    id: "SUP-2026-00140",
    customer: "ABC Corp Ltd",
    service: "Transfer - Airport DXB",
    amount: "9,600",
    status: "Pending",
    date: "12 Mar 2026",
  },
  {
    id: "SUP-2026-00139",
    customer: "Anjali Verma",
    service: "Package - Dubai 5N Honeymoon",
    amount: "1,50,000",
    status: "Confirmed",
    date: "10 Mar 2026",
  },
];

const STATUS_COLORS: Record<string, string> = {
  Confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const BOOKING_TYPES = [
  { key: "walk-in", label: "Walk-in Customer", icon: Users, color: "#3B82F6" },
  {
    key: "offline",
    label: "Offline Booking",
    icon: FileText,
    color: "#8B5CF6",
  },
  {
    key: "corporate",
    label: "Corporate Booking",
    icon: Building2,
    color: "#10B981",
  },
  { key: "agent", label: "Agent Booking", icon: UserCheck, color: "#F59E0B" },
];

export function SupplierBookingCreate() {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState("walk-in");
  const [serviceType, setServiceType] = useState("hotel");
  const [confirmed, setConfirmed] = useState(false);
  const bookingId = "SUP-2026-00143";

  const steps = [
    "Booking Type",
    "Customer Details",
    "Service Selection",
    "Pricing",
    "Confirmation",
  ];

  if (confirmed) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl p-8 text-center" style={glassBg}>
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-slate-400 mb-4">
            Your booking has been created successfully
          </p>
          <div
            className="inline-block px-6 py-3 rounded-xl mb-6"
            style={{
              background: "rgba(249,115,22,0.2)",
              border: "1px solid rgba(249,115,22,0.4)",
            }}
          >
            <p className="text-orange-400 text-xs mb-1">Booking ID</p>
            <p className="text-white text-xl font-mono font-bold">
              {bookingId}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Customer", value: "Walk-in Guest" },
              { label: "Service", value: "Grand Hyatt Dubai - 4 Nights" },
              { label: "Total Amount", value: "74,000" },
            ].map((d) => (
              <div
                key={d.label}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <p className="text-slate-400 text-xs">{d.label}</p>
                <p className="text-white font-medium text-sm">
                  &#8377;{d.value}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              className="bg-blue-600 text-white"
              data-ocid="booking.download_invoice.button"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button
              className="bg-green-600 text-white"
              data-ocid="booking.download_voucher.button"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Voucher
            </Button>
            <Button
              className="bg-purple-600 text-white"
              data-ocid="booking.send_whatsapp.button"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Send via WhatsApp
            </Button>
            <Button
              className="bg-slate-600 text-white"
              data-ocid="booking.send_email.button"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send via Email
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-slate-300"
              data-ocid="booking.new_booking.button"
              onClick={() => {
                setStep(1);
                setConfirmed(false);
              }}
            >
              New Booking
            </Button>
          </div>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
            <h3 className="text-white font-semibold">Recent Bookings</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow style={{ background: "rgba(255,255,255,0.05)" }}>
                {[
                  "Booking ID",
                  "Customer",
                  "Service",
                  "Amount",
                  "Date",
                  "Status",
                ].map((h) => (
                  <TableHead key={h} className="text-slate-400">
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_BOOKINGS.map((b, i) => (
                <TableRow
                  key={b.id}
                  className="border-white/10"
                  data-ocid={`booking.recent.row.${i + 1}`}
                >
                  <TableCell className="text-orange-400 font-mono text-sm">
                    {b.id}
                  </TableCell>
                  <TableCell className="text-white text-sm">
                    {b.customer}
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">
                    {b.service}
                  </TableCell>
                  <TableCell className="text-green-400 font-medium">
                    &#8377;{b.amount}
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {b.date}
                  </TableCell>
                  <TableCell>
                    <Badge className={`text-xs ${STATUS_COLORS[b.status]}`}>
                      {b.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step > i + 1
                  ? "bg-green-500 text-white"
                  : step === i + 1
                    ? "bg-orange-500 text-white"
                    : "bg-white/10 text-slate-400"
              }`}
              data-ocid={`booking.step.${i + 1}`}
            >
              {step > i + 1 ? "\u2713" : i + 1}
            </div>
            <span
              className={`text-sm ${step === i + 1 ? "text-orange-400 font-medium" : "text-slate-500"}`}
            >
              {s}
            </span>
            {i < steps.length - 1 && <div className="w-6 h-px bg-white/20" />}
          </div>
        ))}
      </div>

      <div className="rounded-2xl p-6" style={glassBg}>
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Select Booking Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {BOOKING_TYPES.map(({ key, label, icon: Icon, color }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setBookingType(key)}
                  data-ocid={`booking.type.${key}.button`}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    bookingType === key
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                    style={{ background: `${color}22` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <p className="text-white text-sm font-medium">{label}</p>
                </button>
              ))}
            </div>
            <Button
              className="bg-orange-600 text-white w-full"
              onClick={() => setStep(2)}
              data-ocid="booking.step1.next.button"
            >
              Continue
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Customer Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["Full Name", "booking.customer.name.input"],
                  ["Email", "booking.customer.email.input"],
                  ["Phone", "booking.customer.phone.input"],
                  ["Nationality", "booking.customer.nationality.input"],
                  ["ID Type", "booking.customer.idtype.input"],
                  ["ID Number", "booking.customer.idnumber.input"],
                ] as [string, string][]
              ).map(([label, ocid]) => (
                <div key={label}>
                  <Label className="text-slate-400 text-xs">{label}</Label>
                  <Input
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid={ocid}
                  />
                </div>
              ))}
              {bookingType === "corporate" && (
                <div className="col-span-2">
                  <Label className="text-slate-400 text-xs">Company Name</Label>
                  <Input
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid="booking.customer.company.input"
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-slate-300"
                onClick={() => setStep(1)}
                data-ocid="booking.step2.back.button"
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-orange-600 text-white"
                onClick={() => setStep(3)}
                data-ocid="booking.step2.next.button"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Service Selection
            </h3>
            <div>
              <Label className="text-slate-400 text-xs">Service Type</Label>
              <Select value={serviceType} onValueChange={setServiceType}>
                <SelectTrigger
                  className="mt-1 bg-white/5 border-white/10 text-white"
                  data-ocid="booking.service.type.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "flight",
                    "hotel",
                    "tour",
                    "transfer",
                    "visa",
                    "cruise",
                    "insurance",
                    "package",
                  ].map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["Service Name", "booking.service.name.input"],
                  ["Destination", "booking.service.destination.input"],
                  ["Travel Date From", "booking.service.datefrom.input"],
                  ["Travel Date To", "booking.service.dateto.input"],
                  ["No. of Adults", "booking.service.adults.input"],
                  ["No. of Children", "booking.service.children.input"],
                ] as [string, string][]
              ).map(([label, ocid]) => (
                <div key={label}>
                  <Label className="text-slate-400 text-xs">{label}</Label>
                  <Input
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid={ocid}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-slate-300"
                onClick={() => setStep(2)}
                data-ocid="booking.step3.back.button"
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-orange-600 text-white"
                onClick={() => setStep(4)}
                data-ocid="booking.step3.next.button"
              >
                Continue
              </Button>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Pricing &amp; Payment
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  ["Base Price", "booking.pricing.base.input", "18500"],
                  ["Markup", "booking.pricing.markup.input", "2000"],
                  ["Taxes", "booking.pricing.taxes.input", "3330"],
                  ["Total", "booking.pricing.total.input", "74000"],
                ] as [string, string, string][]
              ).map(([label, ocid, val]) => (
                <div key={label}>
                  <Label className="text-slate-400 text-xs">
                    {label} (INR)
                  </Label>
                  <Input
                    defaultValue={val}
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid={ocid}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-slate-400 text-xs">Payment Status</Label>
                <Select defaultValue="paid">
                  <SelectTrigger
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid="booking.pricing.paymentstatus.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Paid", "Partial", "Pending"].map((s) => (
                      <SelectItem key={s} value={s.toLowerCase()}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-400 text-xs">Payment Method</Label>
                <Select defaultValue="bank">
                  <SelectTrigger
                    className="mt-1 bg-white/5 border-white/10 text-white"
                    data-ocid="booking.pricing.paymentmethod.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Bank Transfer", "Cash", "Card", "UPI"].map((s) => (
                      <SelectItem key={s} value={s.toLowerCase()}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-slate-300"
                onClick={() => setStep(3)}
                data-ocid="booking.step4.back.button"
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-orange-600 text-white"
                onClick={() => setStep(5)}
                data-ocid="booking.step4.next.button"
              >
                Review Booking
              </Button>
            </div>
          </div>
        )}
        {step === 5 && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Confirm Booking
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Booking Type",
                  value:
                    bookingType.charAt(0).toUpperCase() + bookingType.slice(1),
                },
                {
                  label: "Service",
                  value: `${
                    serviceType.charAt(0).toUpperCase() + serviceType.slice(1)
                  } - Selected Item`,
                },
                { label: "Travel Dates", value: "20 Mar - 24 Mar 2026" },
                { label: "Passengers", value: "2 Adults" },
                { label: "Total Amount", value: "INR 74,000" },
                { label: "Payment", value: "Paid via Bank Transfer" },
              ].map((d) => (
                <div
                  key={d.label}
                  className="flex justify-between items-center py-2"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="text-slate-400 text-sm">{d.label}</span>
                  <span className="text-white font-medium text-sm">
                    {d.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-white/20 text-slate-300"
                onClick={() => setStep(4)}
                data-ocid="booking.step5.back.button"
              >
                Back
              </Button>
              <Button
                className="flex-1 bg-green-600 text-white"
                onClick={() => setConfirmed(true)}
                data-ocid="booking.step5.confirm.button"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Confirm &amp; Create
                Booking
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
