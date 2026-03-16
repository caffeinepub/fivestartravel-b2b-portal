import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
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
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileText,
  Plane,
  Send,
  Settings2,
  ShieldCheck,
  Ship,
  Star,
  Store,
  Train,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ── Types ────────────────────────────────────────────────────────────────────
interface SupplierRow {
  id: number;
  label: string; // always "Provider A", "Provider B", etc.
  price: number;
  availability: number; // percent 0-100
  rating: number; // 1-5
  priority: number; // 1-5 (admin contract priority)
  commission: number; // percent
  respSpeed: number; // seconds
}

interface WeightConfig {
  price: number;
  rating: number;
  commission: number;
  speed: number;
}

type ServiceTab =
  | "flights"
  | "hotels"
  | "tours"
  | "transfers"
  | "visa"
  | "cruises"
  | "insurance";

// ── Mock Inventory Data ───────────────────────────────────────────────────────
const MOCK_DATA: Record<ServiceTab, SupplierRow[]> = {
  flights: [
    {
      id: 1,
      label: "Provider A",
      price: 18500,
      availability: 92,
      rating: 4.7,
      priority: 5,
      commission: 8,
      respSpeed: 1.2,
    },
    {
      id: 2,
      label: "Provider B",
      price: 22000,
      availability: 85,
      rating: 4.2,
      priority: 3,
      commission: 6,
      respSpeed: 2.5,
    },
    {
      id: 3,
      label: "Provider C",
      price: 19800,
      availability: 78,
      rating: 4.5,
      priority: 4,
      commission: 7,
      respSpeed: 1.8,
    },
    {
      id: 4,
      label: "Provider D",
      price: 35000,
      availability: 95,
      rating: 4.9,
      priority: 5,
      commission: 10,
      respSpeed: 0.8,
    },
    {
      id: 5,
      label: "Provider E",
      price: 21500,
      availability: 60,
      rating: 3.8,
      priority: 2,
      commission: 5,
      respSpeed: 4.1,
    },
    {
      id: 6,
      label: "Provider F",
      price: 20000,
      availability: 88,
      rating: 4.3,
      priority: 3,
      commission: 7,
      respSpeed: 2.0,
    },
  ],
  hotels: [
    {
      id: 1,
      label: "Provider A",
      price: 8500,
      availability: 90,
      rating: 4.6,
      priority: 5,
      commission: 12,
      respSpeed: 1.0,
    },
    {
      id: 2,
      label: "Provider B",
      price: 12000,
      availability: 75,
      rating: 4.1,
      priority: 3,
      commission: 9,
      respSpeed: 2.8,
    },
    {
      id: 3,
      label: "Provider C",
      price: 9800,
      availability: 82,
      rating: 4.4,
      priority: 4,
      commission: 10,
      respSpeed: 1.5,
    },
    {
      id: 4,
      label: "Provider D",
      price: 24000,
      availability: 95,
      rating: 4.9,
      priority: 5,
      commission: 15,
      respSpeed: 0.9,
    },
    {
      id: 5,
      label: "Provider E",
      price: 10500,
      availability: 68,
      rating: 3.2,
      priority: 2,
      commission: 7,
      respSpeed: 5.0,
    },
    {
      id: 6,
      label: "Provider F",
      price: 15000,
      availability: 88,
      rating: 4.7,
      priority: 4,
      commission: 11,
      respSpeed: 1.2,
    },
  ],
  tours: [
    {
      id: 1,
      label: "Provider A",
      price: 2800,
      availability: 95,
      rating: 4.8,
      priority: 5,
      commission: 14,
      respSpeed: 1.1,
    },
    {
      id: 2,
      label: "Provider B",
      price: 4200,
      availability: 80,
      rating: 4.3,
      priority: 3,
      commission: 10,
      respSpeed: 2.3,
    },
    {
      id: 3,
      label: "Provider C",
      price: 3500,
      availability: 88,
      rating: 4.5,
      priority: 4,
      commission: 12,
      respSpeed: 1.6,
    },
    {
      id: 4,
      label: "Provider D",
      price: 8500,
      availability: 72,
      rating: 4.9,
      priority: 5,
      commission: 18,
      respSpeed: 0.7,
    },
    {
      id: 5,
      label: "Provider E",
      price: 5000,
      availability: 65,
      rating: 3.6,
      priority: 2,
      commission: 8,
      respSpeed: 4.5,
    },
    {
      id: 6,
      label: "Provider F",
      price: 3800,
      availability: 92,
      rating: 4.2,
      priority: 3,
      commission: 11,
      respSpeed: 2.1,
    },
  ],
  transfers: [
    {
      id: 1,
      label: "Provider A",
      price: 1200,
      availability: 98,
      rating: 4.7,
      priority: 5,
      commission: 10,
      respSpeed: 0.9,
    },
    {
      id: 2,
      label: "Provider B",
      price: 1800,
      availability: 85,
      rating: 4.2,
      priority: 3,
      commission: 8,
      respSpeed: 2.0,
    },
    {
      id: 3,
      label: "Provider C",
      price: 1500,
      availability: 90,
      rating: 4.5,
      priority: 4,
      commission: 9,
      respSpeed: 1.4,
    },
    {
      id: 4,
      label: "Provider D",
      price: 2800,
      availability: 95,
      rating: 4.8,
      priority: 5,
      commission: 13,
      respSpeed: 0.6,
    },
    {
      id: 5,
      label: "Provider E",
      price: 2200,
      availability: 70,
      rating: 3.9,
      priority: 2,
      commission: 6,
      respSpeed: 3.8,
    },
    {
      id: 6,
      label: "Provider F",
      price: 1650,
      availability: 88,
      rating: 4.3,
      priority: 3,
      commission: 9,
      respSpeed: 1.8,
    },
  ],
  visa: [
    {
      id: 1,
      label: "Provider A",
      price: 4500,
      availability: 95,
      rating: 4.6,
      priority: 5,
      commission: 8,
      respSpeed: 2.0,
    },
    {
      id: 2,
      label: "Provider B",
      price: 6200,
      availability: 88,
      rating: 4.3,
      priority: 4,
      commission: 6,
      respSpeed: 3.5,
    },
    {
      id: 3,
      label: "Provider C",
      price: 5000,
      availability: 80,
      rating: 4.1,
      priority: 3,
      commission: 7,
      respSpeed: 4.0,
    },
    {
      id: 4,
      label: "Provider D",
      price: 7800,
      availability: 92,
      rating: 4.8,
      priority: 5,
      commission: 10,
      respSpeed: 1.5,
    },
    {
      id: 5,
      label: "Provider E",
      price: 5500,
      availability: 72,
      rating: 3.7,
      priority: 2,
      commission: 5,
      respSpeed: 6.0,
    },
    {
      id: 6,
      label: "Provider F",
      price: 5200,
      availability: 85,
      rating: 4.4,
      priority: 4,
      commission: 8,
      respSpeed: 2.8,
    },
  ],
  cruises: [
    {
      id: 1,
      label: "Provider A",
      price: 45000,
      availability: 88,
      rating: 4.7,
      priority: 5,
      commission: 12,
      respSpeed: 1.5,
    },
    {
      id: 2,
      label: "Provider B",
      price: 62000,
      availability: 75,
      rating: 4.4,
      priority: 3,
      commission: 9,
      respSpeed: 2.8,
    },
    {
      id: 3,
      label: "Provider C",
      price: 52000,
      availability: 82,
      rating: 4.5,
      priority: 4,
      commission: 11,
      respSpeed: 2.0,
    },
    {
      id: 4,
      label: "Provider D",
      price: 95000,
      availability: 92,
      rating: 4.9,
      priority: 5,
      commission: 15,
      respSpeed: 0.9,
    },
    {
      id: 5,
      label: "Provider E",
      price: 58000,
      availability: 65,
      rating: 3.8,
      priority: 2,
      commission: 7,
      respSpeed: 4.5,
    },
    {
      id: 6,
      label: "Provider F",
      price: 72000,
      availability: 90,
      rating: 4.6,
      priority: 4,
      commission: 13,
      respSpeed: 1.2,
    },
  ],
  insurance: [
    {
      id: 1,
      label: "Provider A",
      price: 1800,
      availability: 100,
      rating: 4.5,
      priority: 5,
      commission: 15,
      respSpeed: 0.5,
    },
    {
      id: 2,
      label: "Provider B",
      price: 2500,
      availability: 100,
      rating: 4.2,
      priority: 3,
      commission: 12,
      respSpeed: 0.8,
    },
    {
      id: 3,
      label: "Provider C",
      price: 2100,
      availability: 100,
      rating: 4.4,
      priority: 4,
      commission: 13,
      respSpeed: 0.6,
    },
    {
      id: 4,
      label: "Provider D",
      price: 3200,
      availability: 100,
      rating: 4.8,
      priority: 5,
      commission: 18,
      respSpeed: 0.4,
    },
    {
      id: 5,
      label: "Provider E",
      price: 2800,
      availability: 98,
      rating: 3.9,
      priority: 2,
      commission: 10,
      respSpeed: 1.2,
    },
    {
      id: 6,
      label: "Provider F",
      price: 2200,
      availability: 100,
      rating: 4.6,
      priority: 4,
      commission: 14,
      respSpeed: 0.5,
    },
  ],
};

const SERVICE_NAMES: Record<ServiceTab, string> = {
  flights: "International Flight",
  hotels: "Hotel Stay",
  tours: "City Tour Package",
  transfers: "Airport Transfer",
  visa: "Tourist Visa Processing",
  cruises: "Cruise Cabin",
  insurance: "Travel Insurance Policy",
};

const SERVICE_DESTINATIONS: Record<ServiceTab, string> = {
  flights: "New Delhi → London (DEL-LHR)",
  hotels: "Dubai, UAE",
  tours: "Paris, France",
  transfers: "Dubai International Airport",
  visa: "Schengen Visa (Europe)",
  cruises: "Mediterranean Cruise",
  insurance: "Global Coverage",
};

// ── Score Calculation ─────────────────────────────────────────────────────────
function computeScores(
  rows: SupplierRow[],
  weights: WeightConfig,
): (SupplierRow & { score: number })[] {
  const prices = rows.map((r) => r.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);
  const maxSpeed = Math.max(...rows.map((r) => r.respSpeed));

  return rows
    .map((r) => {
      const priceScore =
        maxPrice === minPrice
          ? 100
          : ((maxPrice - r.price) / (maxPrice - minPrice)) * 100;
      const ratingScore = (r.rating / 5) * 100;
      const commissionScore = r.commission * 5; // higher commission = better for agent
      const speedScore = ((maxSpeed - r.respSpeed) / maxSpeed) * 100;
      const priorityBoost = r.priority * 4; // contract priority adds up to 20 pts

      const total =
        (weights.price / 100) * priceScore +
        (weights.rating / 100) * ratingScore +
        (weights.commission / 100) * commissionScore +
        (weights.speed / 100) * speedScore +
        priorityBoost;

      return { ...r, score: Math.round(total) };
    })
    .sort((a, b) => b.score - a.score);
}

// ── Star Rating Display ───────────────────────────────────────────────────────
function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3 h-3 ${
            s <= Math.round(value)
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
      <span className="ml-1 text-xs text-muted-foreground">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

// ── Booking Sheet ─────────────────────────────────────────────────────────────
function BookingSheet({
  open,
  onClose,
  supplier,
  serviceTab,
}: {
  open: boolean;
  onClose: () => void;
  supplier: SupplierRow & { score: number };
  serviceTab: ServiceTab;
}) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [paymentMode, setPaymentMode] = useState<"full" | "partial" | "wallet">(
    "full",
  );
  const [addons, setAddons] = useState<Record<string, boolean>>({
    insurance: false,
    baggage: false,
    lounge: false,
    tour: false,
  });
  const [paxName, setPaxName] = useState("");
  const [paxEmail, setPaxEmail] = useState("");
  const [paxPhone, setPaxPhone] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const addonPrices: Record<string, number> = {
    insurance: 1200,
    baggage: 800,
    lounge: 1500,
    tour: 2500,
  };
  const addonTotal = Object.entries(addons).reduce(
    (sum, [key, checked]) => sum + (checked ? addonPrices[key] : 0),
    0,
  );
  const tax = Math.round(supplier.price * 0.05);
  const serviceFee = 250;
  const markup = Math.round(supplier.price * 0.08);
  const total = supplier.price + tax + serviceFee + markup + addonTotal;
  const bookingId = `FST-MKT${Math.floor(10000 + Math.random() * 90000)}`;

  function handleConfirm() {
    if (!paxName || !travelDate) {
      toast.error("Please fill in passenger name and travel date.");
      return;
    }
    setStep("success");
    toast.success(`Booking confirmed! ID: ${bookingId}`);
  }

  function handleClose() {
    setStep("form");
    setPaxName("");
    setPaxEmail("");
    setPaxPhone("");
    setTravelDate("");
    setAddons({ insurance: false, baggage: false, lounge: false, tour: false });
    onClose();
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[600px] overflow-y-auto p-0"
        data-ocid="marketplace.booking.sheet"
      >
        <SheetHeader className="px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
          <SheetTitle className="flex items-center gap-2 text-base">
            <Store className="w-4 h-4 text-primary" />
            {step === "form" ? "Complete Booking" : "Booking Confirmed"}
          </SheetTitle>
        </SheetHeader>

        {step === "success" ? (
          <div
            className="p-6 flex flex-col items-center text-center gap-4"
            data-ocid="marketplace.booking.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">
                Booking Confirmed!
              </h3>
              <p className="text-muted-foreground text-sm">
                Your booking has been successfully created.
              </p>
            </div>
            <div className="w-full bg-muted/40 rounded-xl p-4 border border-border text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Booking ID</span>
                <span className="font-bold text-primary font-mono">
                  {bookingId}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{SERVICE_NAMES[serviceTab]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Passenger</span>
                <span className="font-medium">{paxName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-bold text-green-500">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 gap-2"
                data-ocid="marketplace.invoice.download_button"
              >
                <Download className="w-4 h-4" /> Invoice
              </Button>
              <Button
                variant="outline"
                className="flex-1 gap-2"
                data-ocid="marketplace.voucher.download_button"
              >
                <FileText className="w-4 h-4" /> Voucher
              </Button>
            </div>
            <Button
              className="w-full"
              onClick={handleClose}
              data-ocid="marketplace.booking.close_button"
            >
              Done
            </Button>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Service Details */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" /> Service Details
              </h4>
              <div className="bg-muted/30 rounded-xl p-4 border border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">
                    {SERVICE_NAMES[serviceTab]}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-medium">
                    {SERVICE_DESTINATIONS[serviceTab]}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="font-medium">{supplier.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Inclusions</span>
                  <span className="text-right font-medium text-green-600">
                    Standard + Taxes
                  </span>
                </div>
              </div>
            </div>

            {/* Date & Availability */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Travel Date
              </h4>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm"
                data-ocid="marketplace.booking.date.input"
              />
            </div>

            {/* Traveler Information */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Traveler Information
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <Label className="text-xs">Passenger Name *</Label>
                  <input
                    type="text"
                    placeholder="Full Name as on Passport"
                    value={paxName}
                    onChange={(e) => setPaxName(e.target.value)}
                    className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                    data-ocid="marketplace.booking.name.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Date of Birth</Label>
                  <input
                    type="date"
                    className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                    data-ocid="marketplace.booking.dob.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Passport No.</Label>
                  <input
                    type="text"
                    placeholder="P1234567"
                    className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                    data-ocid="marketplace.booking.passport.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Email</Label>
                  <input
                    type="email"
                    placeholder="traveler@email.com"
                    value={paxEmail}
                    onChange={(e) => setPaxEmail(e.target.value)}
                    className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                    data-ocid="marketplace.booking.email.input"
                  />
                </div>
                <div>
                  <Label className="text-xs">Phone</Label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={paxPhone}
                    onChange={(e) => setPaxPhone(e.target.value)}
                    className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                    data-ocid="marketplace.booking.phone.input"
                  />
                </div>
              </div>
            </div>

            {/* Add-on Services */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Add-on Services
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "insurance", label: "Travel Insurance", price: 1200 },
                  { key: "baggage", label: "Extra Baggage", price: 800 },
                  { key: "lounge", label: "Airport Lounge", price: 1500 },
                  { key: "tour", label: "Extra Tour", price: 2500 },
                ].map((addon) => (
                  <div
                    key={addon.key}
                    className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/20 cursor-pointer hover:bg-muted/40 transition-colors"
                  >
                    <Checkbox
                      checked={addons[addon.key]}
                      onCheckedChange={(v) =>
                        setAddons((prev) => ({ ...prev, [addon.key]: !!v }))
                      }
                      data-ocid={`marketplace.addon.${addon.key}.checkbox`}
                    />
                    <div>
                      <p className="text-xs font-medium">{addon.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        +₹{addon.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Price Summary
              </h4>
              <div className="bg-muted/30 rounded-xl p-4 border border-border space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Base Price</span>
                  <span>₹{supplier.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes (5%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>₹{serviceFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Markup</span>
                  <span>₹{markup.toLocaleString("en-IN")}</span>
                </div>
                {addonTotal > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Add-ons</span>
                    <span>₹{addonTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-border flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span className="text-primary">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                Payment Method
              </h4>
              <div className="flex gap-2">
                {(["full", "partial", "wallet"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
                      paymentMode === mode
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                    data-ocid={`marketplace.payment.${mode}.toggle`}
                  >
                    {mode === "full"
                      ? "Full Payment"
                      : mode === "partial"
                        ? "Partial"
                        : "Agent Wallet"}
                  </button>
                ))}
              </div>
            </div>

            <Button
              className="w-full h-11 font-semibold"
              onClick={handleConfirm}
              data-ocid="marketplace.confirm.button"
            >
              Confirm Booking — ₹{total.toLocaleString("en-IN")}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function SupplierMarketplace() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("hotels");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [pax, setPax] = useState("2");
  const [hasSearched, setHasSearched] = useState(true); // show results by default
  const [weights, setWeights] = useState<WeightConfig>({
    price: 40,
    rating: 25,
    commission: 20,
    speed: 15,
  });
  const [liveWeights, setLiveWeights] = useState<WeightConfig>(weights);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<
    (SupplierRow & { score: number }) | null
  >(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Offline form state
  const [offlineDest, setOfflineDest] = useState("");
  const [offlineService, setOfflineService] = useState("");
  const [offlineFrom, setOfflineFrom] = useState("");
  const [offlineTo, setOfflineTo] = useState("");
  const [offlinePax, setOfflinePax] = useState("");
  const [offlineNotes, setOfflineNotes] = useState("");
  const [offlineSuccess, setOfflineSuccess] = useState(false);
  const [offlineRef, setOfflineRef] = useState("");

  const rankedSuppliers = computeScores(MOCK_DATA[activeTab], liveWeights);
  const bestScore = rankedSuppliers[0]?.score ?? 0;

  function handleSearch() {
    setHasSearched(true);
    toast.success("Fetching real-time supplier inventory…");
  }

  function handleBookNow(s: SupplierRow & { score: number }) {
    setSelectedSupplier(s);
    setSheetOpen(true);
  }

  function handleRerank() {
    setLiveWeights(weights);
    toast.success("Suppliers re-ranked with updated priority rules.");
  }

  function handleOfflineSubmit() {
    if (!offlineDest || !offlineService) {
      toast.error("Please fill destination and service type.");
      return;
    }
    const ref = `OFR-${Math.floor(10000 + Math.random() * 90000)}`;
    setOfflineRef(ref);
    setOfflineSuccess(true);
    toast.success(`Offline request submitted! Reference: ${ref}`);
  }

  const tabIcons: Record<ServiceTab, React.ElementType> = {
    flights: Plane,
    hotels: Building2,
    tours: Star,
    transfers: Train,
    visa: FileText,
    cruises: Ship,
    insurance: ShieldCheck,
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-blue-700 p-5 text-white shadow-lg">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">
              Supplier Marketplace
            </h2>
            <p className="text-white/70 text-sm mt-0.5">
              Search, rank, and book from verified supplier inventory in real
              time
            </p>
          </div>
          <div className="ml-auto hidden lg:flex items-center gap-2">
            <Badge className="bg-white/20 text-white border-white/30 text-xs">
              🔴 LIVE
            </Badge>
            <Badge className="bg-green-500/30 text-green-200 border-green-400/30 text-xs">
              {rankedSuppliers.length} Suppliers Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Service Type Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as ServiceTab)}
      >
        <TabsList
          className="flex flex-wrap h-auto gap-1 bg-muted/40 p-1.5 rounded-xl"
          data-ocid="marketplace.service.tab"
        >
          {(Object.keys(tabIcons) as ServiceTab[]).map((tab, i) => {
            const Icon = tabIcons[tab];
            return (
              <TabsTrigger
                key={tab}
                value={tab}
                className="gap-1.5 text-xs px-3 py-2 rounded-lg"
                data-ocid={`marketplace.tab.${i + 1}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {(Object.keys(tabIcons) as ServiceTab[]).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4 space-y-4">
            {/* Search Panel */}
            <Card className="border-border">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="col-span-2 md:col-span-2">
                    <Label className="text-xs text-muted-foreground">
                      Destination
                    </Label>
                    <input
                      type="text"
                      placeholder={SERVICE_DESTINATIONS[tab]}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                      data-ocid="marketplace.search.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Check-in
                    </Label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                      data-ocid="marketplace.checkin.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-muted-foreground">
                      Check-out
                    </Label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                      data-ocid="marketplace.checkout.input"
                    />
                  </div>
                  <div className="flex flex-col justify-end">
                    <Select value={pax} onValueChange={setPax}>
                      <SelectTrigger
                        className="h-10"
                        data-ocid="marketplace.pax.select"
                      >
                        <SelectValue placeholder="Pax" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n} {n === 1 ? "Passenger" : "Passengers"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    className="gap-2 h-10 px-6"
                    onClick={handleSearch}
                    data-ocid="marketplace.search.button"
                  >
                    <Zap className="w-4 h-4" />
                    Search & Compare Suppliers
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Auto Supplier Selection Engine */}
            {hasSearched && (
              <Card className="border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="w-5 h-5 text-amber-400" />
                        Auto Supplier Selection Engine
                      </CardTitle>
                      <p className="text-xs text-muted-foreground mt-1">
                        System automatically ranks and selects the best supplier
                        based on price, rating, commission & response speed
                      </p>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs flex-shrink-0">
                      {rankedSuppliers.length} Results
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/30">
                          <TableHead className="w-8 text-xs">#</TableHead>
                          <TableHead className="text-xs">
                            Service / Provider
                          </TableHead>
                          <TableHead className="text-xs">Price</TableHead>
                          <TableHead className="text-xs">Avail.</TableHead>
                          <TableHead className="text-xs">Rating</TableHead>
                          <TableHead className="text-xs">Priority</TableHead>
                          <TableHead className="text-xs">Comm.</TableHead>
                          <TableHead className="text-xs">Speed</TableHead>
                          <TableHead className="text-xs">Score</TableHead>
                          <TableHead className="text-xs">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rankedSuppliers.map((s, idx) => {
                          const isBest = s.score === bestScore;
                          return (
                            <TableRow
                              key={s.id}
                              className={`text-sm transition-colors ${
                                isBest
                                  ? "bg-green-500/5 border-l-2 border-l-green-500"
                                  : "hover:bg-muted/20"
                              }`}
                              data-ocid={`marketplace.results.row.${idx + 1}`}
                            >
                              <TableCell className="font-bold text-muted-foreground text-xs">
                                {idx + 1}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Building2 className="w-3.5 h-3.5 text-primary" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-xs">
                                      {s.label}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                      {SERVICE_NAMES[tab]}
                                    </p>
                                  </div>
                                  {isBest && (
                                    <Badge className="bg-green-500/15 text-green-600 border-green-500/20 text-[9px] px-1.5 py-0.5 ml-1">
                                      ✦ Best Value
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="font-bold text-sm">
                                ₹{s.price.toLocaleString("en-IN")}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <div
                                    className={`w-1.5 h-1.5 rounded-full ${s.availability > 80 ? "bg-green-500" : s.availability > 50 ? "bg-amber-500" : "bg-red-500"}`}
                                  />
                                  <span className="text-xs">
                                    {s.availability}%
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <StarRating value={s.rating} />
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-0.5">
                                  {[1, 2, 3, 4, 5].map((p) => (
                                    <div
                                      key={p}
                                      className={`w-2 h-2 rounded-sm ${p <= s.priority ? "bg-primary" : "bg-muted"}`}
                                    />
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-xs font-medium text-green-600">
                                {s.commission}%
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1 text-xs">
                                  <Clock className="w-3 h-3 text-muted-foreground" />
                                  {s.respSpeed}s
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <div className="w-16 h-1.5 rounded-full bg-muted overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                                      style={{
                                        width: `${Math.min(100, s.score)}%`,
                                      }}
                                    />
                                  </div>
                                  <span className="text-xs font-bold text-primary">
                                    {s.score}
                                  </span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="sm"
                                  className={`h-7 text-xs px-3 ${isBest ? "bg-green-600 hover:bg-green-700" : ""}`}
                                  onClick={() => handleBookNow(s)}
                                  data-ocid={`marketplace.book.button.${idx + 1}`}
                                >
                                  Book Now
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Admin Priority Rules Panel */}
      <Collapsible open={rulesOpen} onOpenChange={setRulesOpen}>
        <Card className="border-border">
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="w-full"
              data-ocid="marketplace.rules.toggle"
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Settings2 className="w-4 h-4 text-muted-foreground" />
                    Supplier Priority Rules
                    <Badge variant="outline" className="text-[10px]">
                      Admin Configured
                    </Badge>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted-foreground transition-transform ${rulesOpen ? "rotate-180" : ""}`}
                  />
                </CardTitle>
              </CardHeader>
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0 space-y-4">
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                These weight rules control how suppliers are ranked. Changes
                apply to all agent searches.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  {
                    key: "price" as const,
                    label: "Price Weight",
                    color: "text-blue-500",
                  },
                  {
                    key: "rating" as const,
                    label: "Rating Weight",
                    color: "text-amber-500",
                  },
                  {
                    key: "commission" as const,
                    label: "Commission Weight",
                    color: "text-green-500",
                  },
                  {
                    key: "speed" as const,
                    label: "Response Speed Weight",
                    color: "text-purple-500",
                  },
                ].map(({ key, label, color }) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <Label className={`text-xs font-medium ${color}`}>
                        {label}
                      </Label>
                      <span className="text-xs font-bold tabular-nums">
                        {weights[key]}%
                      </span>
                    </div>
                    <Slider
                      min={0}
                      max={100}
                      step={5}
                      value={[weights[key]]}
                      onValueChange={([v]) =>
                        setWeights((prev) => ({ ...prev, [key]: v }))
                      }
                      data-ocid={`marketplace.rules.${key}.slider`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs text-muted-foreground">
                  Total:{" "}
                  {weights.price +
                    weights.rating +
                    weights.commission +
                    weights.speed}
                  % (recommend 100%)
                </p>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={handleRerank}
                  data-ocid="marketplace.rules.rerank_button"
                >
                  <Zap className="w-3.5 h-3.5" />
                  Re-rank Suppliers
                </Button>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Offline / Group Booking Request */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Send className="w-4 h-4 text-primary" />
            Submit Offline / Group Booking Request
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            For group bookings, special requirements, or requests received via
            phone/WhatsApp/email.
          </p>
        </CardHeader>
        <CardContent>
          {offlineSuccess ? (
            <div
              className="flex flex-col items-center text-center py-6 gap-3"
              data-ocid="marketplace.offline.success_state"
            >
              <div className="w-12 h-12 rounded-full bg-green-500/15 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-sm">
                  Request Submitted Successfully
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Reference:{" "}
                  <span className="font-mono font-bold text-primary">
                    {offlineRef}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Our team will contact you within 2 hours.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setOfflineSuccess(false);
                  setOfflineDest("");
                  setOfflineService("");
                  setOfflineFrom("");
                  setOfflineTo("");
                  setOfflinePax("");
                  setOfflineNotes("");
                }}
                data-ocid="marketplace.offline.new_button"
              >
                Submit Another Request
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Destination *</Label>
                <input
                  type="text"
                  placeholder="e.g. Bangkok, Thailand"
                  value={offlineDest}
                  onChange={(e) => setOfflineDest(e.target.value)}
                  className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                  data-ocid="marketplace.offline.destination.input"
                />
              </div>
              <div>
                <Label className="text-xs">Service Type *</Label>
                <Select
                  value={offlineService}
                  onValueChange={setOfflineService}
                >
                  <SelectTrigger
                    className="mt-1 h-10"
                    data-ocid="marketplace.offline.service.select"
                  >
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flights">Flights</SelectItem>
                    <SelectItem value="hotels">Hotels</SelectItem>
                    <SelectItem value="tours">Tours & Activities</SelectItem>
                    <SelectItem value="transfers">Transfers</SelectItem>
                    <SelectItem value="visa">Visa Services</SelectItem>
                    <SelectItem value="cruises">Cruises</SelectItem>
                    <SelectItem value="insurance">Insurance</SelectItem>
                    <SelectItem value="package">Full Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Travel From Date</Label>
                <input
                  type="date"
                  value={offlineFrom}
                  onChange={(e) => setOfflineFrom(e.target.value)}
                  className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                  data-ocid="marketplace.offline.from.input"
                />
              </div>
              <div>
                <Label className="text-xs">Travel To Date</Label>
                <input
                  type="date"
                  value={offlineTo}
                  onChange={(e) => setOfflineTo(e.target.value)}
                  className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                  data-ocid="marketplace.offline.to.input"
                />
              </div>
              <div>
                <Label className="text-xs">Number of Passengers</Label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 25"
                  value={offlinePax}
                  onChange={(e) => setOfflinePax(e.target.value)}
                  className="w-full h-10 px-3 mt-1 rounded-lg border border-input bg-background text-sm"
                  data-ocid="marketplace.offline.pax.input"
                />
              </div>
              <div className="md:col-span-2">
                <Label className="text-xs">Special Requirements</Label>
                <Textarea
                  placeholder="e.g. Group booking for 25 pax, corporate travel, special meal requirements, twin-sharing rooms..."
                  value={offlineNotes}
                  onChange={(e) => setOfflineNotes(e.target.value)}
                  className="mt-1 text-sm resize-none"
                  rows={3}
                  data-ocid="marketplace.offline.notes.textarea"
                />
              </div>
              <div className="md:col-span-2">
                <Button
                  className="gap-2 h-10"
                  onClick={handleOfflineSubmit}
                  data-ocid="marketplace.offline.submit_button"
                >
                  <Send className="w-4 h-4" />
                  Submit Offline Request
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Booking Sheet */}
      {selectedSupplier && (
        <BookingSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          supplier={selectedSupplier}
          serviceTab={activeTab}
        />
      )}
    </div>
  );
}
