import HotelStaticDetail from "@/components/HotelStaticDetail";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Hotel,
  Info,
  MapPin,
  ShieldCheck,
  Star,
  XCircle,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface CancellationPenalty {
  from: string;
  to: string;
  amount: number;
}

export interface HotelOption {
  optionId: string;
  optionType: "SRSM" | "SRCM" | "CRSM" | "CRCM";
  roomInfo: { id: string; name: string }[];
  inclusions: string[];
  mealBasis: string;
  bookingNotes: string;
  pricing: {
    totalPrice: number;
    basePrice: number;
    taxes: number;
    discount: number;
    mf: number;
    mft: number;
    currency: string;
    strikethrough?: number;
  };
  commercial: { type: string; commission: number };
  compliance: {
    gstType: string;
    panRequired: boolean;
    passportRequired: boolean;
  };
  cancellation: { isRefundable: boolean; penalties: CancellationPenalty[] };
  roomLeft: number;
}

interface HotelDetailProps {
  hotelId: string;
  hotelName: string;
  correlationId: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  onBack: () => void;
  onSelectOption: (option: HotelOption, reviewHash: string) => void;
}

// ── Mock Data ───────────────────────────────────────────────────────────────────
function getMockOptions(_hotelName: string): HotelOption[] {
  return [
    {
      optionId: "db35a71a-4577-4740-8706-7d32e4c2ca4e",
      optionType: "SRSM",
      roomInfo: [
        { id: "10019446051", name: "Deluxe King Room" },
        { id: "10019446051", name: "Deluxe King Room" },
      ],
      inclusions: ["Free WiFi", "Airport Transfer"],
      mealBasis: "Breakfast",
      bookingNotes: "Print booking voucher at check-in. Must present valid ID.",
      pricing: {
        totalPrice: 27806.62,
        basePrice: 23566.62,
        taxes: 3840.0,
        discount: 500,
        mf: 300,
        mft: 100,
        currency: "INR",
        strikethrough: 32000,
      },
      commercial: { type: "COMMISSIONABLE", commission: 1500 },
      compliance: {
        gstType: "PASSTHROUGH",
        panRequired: false,
        passportRequired: false,
      },
      cancellation: {
        isRefundable: true,
        penalties: [
          { from: "2026-03-09T00:00:00", to: "2026-05-18T23:59:59", amount: 0 },
          {
            from: "2026-05-18T23:59:59",
            to: "2026-05-26T00:00:00",
            amount: 27759.42,
          },
        ],
      },
      roomLeft: 3,
    },
    {
      optionId: "c1a2b3c4-1234-5678-abcd-ef0123456789",
      optionType: "SRSM",
      roomInfo: [
        { id: "10019446052", name: "Premium Suite" },
        { id: "10019446052", name: "Premium Suite" },
      ],
      inclusions: ["Free WiFi", "Breakfast", "Spa Access"],
      mealBasis: "Full Board",
      bookingNotes: "Early check-in subject to availability.",
      pricing: {
        totalPrice: 45600.0,
        basePrice: 38640.0,
        taxes: 6360.0,
        discount: 1000,
        mf: 450,
        mft: 150,
        currency: "INR",
      },
      commercial: { type: "NET", commission: 0 },
      compliance: {
        gstType: "RESELLER",
        panRequired: true,
        passportRequired: false,
      },
      cancellation: {
        isRefundable: false,
        penalties: [
          {
            from: "2026-03-09T00:00:00",
            to: "2026-05-26T00:00:00",
            amount: 45600.0,
          },
        ],
      },
      roomLeft: 1,
    },
    {
      optionId: "a9b8c7d6-9876-5432-dcba-fedcba987654",
      optionType: "CRSM",
      roomInfo: [
        { id: "10019446051", name: "Standard Twin Room" },
        { id: "10019446053", name: "Deluxe Double Room" },
      ],
      inclusions: ["Free WiFi"],
      mealBasis: "Room Only",
      bookingNotes: "Different room types. No meals included.",
      pricing: {
        totalPrice: 18900.0,
        basePrice: 16017.0,
        taxes: 2583.0,
        discount: 0,
        mf: 200,
        mft: 100,
        currency: "INR",
        strikethrough: 21000,
      },
      commercial: { type: "NET", commission: 0 },
      compliance: {
        gstType: "NA",
        panRequired: false,
        passportRequired: false,
      },
      cancellation: {
        isRefundable: true,
        penalties: [
          { from: "2026-03-09T00:00:00", to: "2026-05-20T23:59:59", amount: 0 },
          {
            from: "2026-05-20T23:59:59",
            to: "2026-05-26T00:00:00",
            amount: 9450.0,
          },
        ],
      },
      roomLeft: 5,
    },
  ];
}

const MOCK_REVIEW_HASH = "abc123def456xyz789";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatINR(n: number) {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 2 });
}

const OPTION_TYPE_LABEL: Record<string, string> = {
  SRSM: "Same Room · Same Meal",
  SRCM: "Same Room · Mixed Meal",
  CRSM: "Mixed Rooms · Same Meal",
  CRCM: "Mixed Rooms · Mixed Meal",
};

function FreeCancelBadge({ until }: { until: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 font-medium">
      <CheckCircle className="w-3 h-3" />
      Free cancel until{" "}
      {new Date(until).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })}
    </span>
  );
}

function ComplianceBadges({
  compliance,
}: { compliance: HotelOption["compliance"] }) {
  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5">
      {compliance.panRequired && (
        <span className="inline-flex items-center gap-1 text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5">
          <ShieldCheck className="w-3 h-3" /> PAN Required
        </span>
      )}
      {compliance.passportRequired && (
        <span className="inline-flex items-center gap-1 text-[10px] bg-red-50 text-red-700 border border-red-200 rounded-full px-2 py-0.5">
          <ShieldCheck className="w-3 h-3" /> Passport Required
        </span>
      )}
      {compliance.gstType !== "NA" && (
        <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-0.5">
          GST: {compliance.gstType}
        </span>
      )}
    </div>
  );
}

function CancellationInfo({
  cancellation,
}: { cancellation: HotelOption["cancellation"] }) {
  const now = new Date();
  const freeSlab = cancellation.penalties.find(
    (p) => p.amount === 0 && new Date(p.from) <= now && now <= new Date(p.to),
  );
  if (!cancellation.isRefundable) {
    return (
      <div className="flex items-center gap-1 text-[11px] text-red-600 mt-1">
        <XCircle className="w-3.5 h-3.5" />
        <span>Non-refundable</span>
      </div>
    );
  }
  return (
    <div>
      {freeSlab ? (
        <FreeCancelBadge until={freeSlab.to} />
      ) : (
        <span className="inline-flex items-center gap-1 text-[10px] bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5">
          <CheckCircle className="w-3 h-3" /> Refundable
        </span>
      )}
      <div className="mt-1.5 space-y-0.5">
        {cancellation.penalties.map((p, i) => (
          <p
            key={`${p.from}-${i}`}
            className="text-[10px] text-muted-foreground"
          >
            {new Date(p.from).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
            {" – "}
            {new Date(p.to).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            })}
            {" : "}
            <span
              className={
                p.amount === 0
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {p.amount === 0 ? "Free" : `₹${formatINR(p.amount)} penalty`}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

function OptionCard({
  option,
  index,
  onSelect,
  soldOut,
}: {
  option: HotelOption;
  index: number;
  onSelect: () => void;
  soldOut: boolean;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const { pricing, compliance, cancellation } = option;

  return (
    <div
      className="border border-border rounded-xl p-4 bg-card hover:border-orange-400/50 hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/60"
      data-ocid={`hotel.detail.option.item.${index + 1}`}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="text-[10px] bg-slate-100 text-slate-700 border-slate-200">
              {option.optionType} · {OPTION_TYPE_LABEL[option.optionType]}
            </Badge>
            {option.commercial.type === "COMMISSIONABLE" && (
              <Badge className="text-[10px] bg-green-50 text-green-700 border-green-200">
                Commission: ₹{formatINR(option.commercial.commission)}
              </Badge>
            )}
          </div>
          <div className="mt-2 space-y-0.5">
            {option.roomInfo.map((r, i) => (
              <p
                key={`${r.id}-${i}`}
                className="text-sm font-medium text-foreground"
              >
                Room {i + 1}:{" "}
                <span className="font-normal text-muted-foreground">
                  {r.name}
                </span>
              </p>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            🍽 {option.mealBasis}
            {option.inclusions.length > 0 && (
              <span className="ml-2 text-primary">
                · {option.inclusions.join(" · ")}
              </span>
            )}
          </p>
          <ComplianceBadges compliance={compliance} />
          <div className="mt-2">
            <CancellationInfo cancellation={cancellation} />
          </div>
          {option.bookingNotes && (
            <div className="mt-2">
              <button
                type="button"
                className="text-[10px] text-primary flex items-center gap-1 hover:underline"
                onClick={() => setShowNotes((v) => !v)}
                data-ocid={`hotel.detail.notes.toggle.${index + 1}`}
              >
                <Info className="w-3 h-3" />
                {showNotes ? "Hide" : "View"} booking notes
              </button>
              {showNotes && (
                <p className="text-[11px] text-muted-foreground mt-1 bg-muted/50 rounded p-2 whitespace-pre-line">
                  {option.bookingNotes}
                </p>
              )}
            </div>
          )}
          <p className="text-[10px] text-muted-foreground mt-1.5">
            {option.roomLeft} room{option.roomLeft !== 1 ? "s" : ""} left at
            this rate
          </p>
        </div>

        <div className="md:text-right md:min-w-[180px] flex-shrink-0">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-3 border border-slate-200 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide mb-1">
              Price Breakup
            </p>
            {pricing.strikethrough && (
              <p className="text-xs text-muted-foreground line-through">
                ₹{formatINR(pricing.strikethrough)}
              </p>
            )}
            <div className="text-[11px] text-muted-foreground space-y-0.5">
              <div className="flex justify-between gap-4">
                <span>Base</span>
                <span>₹{formatINR(pricing.basePrice)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span>Taxes</span>
                <span>₹{formatINR(pricing.taxes)}</span>
              </div>
              {pricing.discount > 0 && (
                <div className="flex justify-between gap-4 text-green-600">
                  <span>Discount</span>
                  <span>-₹{formatINR(pricing.discount)}</span>
                </div>
              )}
              {pricing.mf > 0 && (
                <div className="flex justify-between gap-4 text-amber-600">
                  <span>Mgmt Fee</span>
                  <span>₹{formatINR(pricing.mf)}</span>
                </div>
              )}
              {pricing.mft > 0 && (
                <div className="flex justify-between gap-4 text-amber-600">
                  <span>MF Tax</span>
                  <span>₹{formatINR(pricing.mft)}</span>
                </div>
              )}
              <div className="flex justify-between gap-4 font-bold text-foreground text-xs border-t border-border pt-1 mt-1">
                <span>Total</span>
                <span>₹{formatINR(pricing.totalPrice)}</span>
              </div>
            </div>
            <Button
              size="sm"
              className="mt-3 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-xs shadow-md shadow-orange-500/25 border-0"
              onClick={onSelect}
              disabled={soldOut}
              data-ocid={`hotel.detail.select.button.${index + 1}`}
            >
              {soldOut ? "Unavailable" : "Select This Room"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export function HotelDetail({
  hotelId,
  hotelName,
  correlationId,
  checkIn,
  checkOut,
  rooms,
  adults,
  onBack,
  onSelectOption,
}: HotelDetailProps) {
  const options = getMockOptions(hotelName);
  const [soldOutOptionId, setSoldOutOptionId] = useState<string | null>(null);
  const [sessionExpiredError, setSessionExpiredError] = useState(false);
  const [showStaticInfo, setShowStaticInfo] = useState(false);

  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000,
    ),
  );

  function handleSelectOption(option: HotelOption, reviewHash: string) {
    // Simulate OPTION_SOLD_OUT for demonstration (remove in production)
    // onSelectOption(option, reviewHash);
    // For real usage:
    onSelectOption(option, reviewHash);
    setSoldOutOptionId(null);
  }

  return (
    <div className="space-y-4" data-ocid="hotel.detail.page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-600/50 hover:border-slate-400/50"
          data-ocid="hotel.detail.back.button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </button>
      </div>

      {/* OPTION_SOLD_OUT banner */}
      {soldOutOptionId && (
        <div
          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
          data-ocid="hotel.detail.error_state"
        >
          <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
          <div className="flex-1">
            <p className="font-semibold">This option is no longer available.</p>
            <p className="text-xs mt-0.5 text-red-600">
              Please choose another room from the options below.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSoldOutOptionId(null)}
            className="text-red-400 hover:text-red-600"
            data-ocid="hotel.detail.close_button"
          >
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SEARCH_SESSION_EXPIRED banner */}
      {sessionExpiredError && (
        <div
          className="flex items-center justify-between gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700"
          data-ocid="hotel.detail.session_expired.panel"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium">
              Search session expired. Please start a new search.
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-amber-300 text-amber-700 hover:bg-amber-100 text-xs px-3 h-7"
            onClick={onBack}
            data-ocid="hotel.detail.session_back.button"
          >
            Back to Search
          </Button>
        </div>
      )}

      {/* Hotel header card */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-700/60 rounded-xl overflow-hidden shadow-xl">
        <div className="flex gap-4 p-4 text-white">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-lg flex-shrink-0 flex items-center justify-center border border-white/20">
            <Hotel className="w-10 h-10 text-white/40" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold text-lg text-white">
              {hotelName}
            </h2>
            <div className="flex items-center gap-1 mt-0.5">
              {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                <Star
                  key={k}
                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <p className="text-xs text-white/60 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" /> New Delhi, India
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">
                {checkIn} → {checkOut}
              </Badge>
              <Badge className="text-[10px] bg-muted text-muted-foreground border-border">
                {nights} night{nights !== 1 ? "s" : ""} · {rooms} room
                {rooms !== 1 ? "s" : ""} · {adults} adult
                {adults !== 1 ? "s" : ""}
              </Badge>
              <Badge className="text-[10px] font-mono bg-slate-100 text-slate-600 border-slate-200">
                corr: {correlationId.slice(0, 8)}…
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Options list */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          {options.length} rate option{options.length !== 1 ? "s" : ""}{" "}
          available
          <span className="text-xs font-normal text-muted-foreground ml-2">
            (Step 2 of 4 — Dynamic Pricing)
          </span>
        </h3>
        <div className="space-y-3">
          {options.map((option, i) => (
            <OptionCard
              key={option.optionId}
              option={option}
              index={i}
              soldOut={soldOutOptionId === option.optionId}
              onSelect={() => handleSelectOption(option, MOCK_REVIEW_HASH)}
            />
          ))}
        </div>
      </div>

      {/* Hotel Information (Static Detail) collapsible */}
      <div className="border border-border rounded-xl overflow-hidden">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-colors text-left"
          onClick={() => setShowStaticInfo((v) => !v)}
          data-ocid="hotel.static.toggle"
        >
          <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Building2 className="w-4 h-4 text-primary" />
            Hotel Information
            <Badge variant="outline" className="text-[10px] ml-1">
              Photos · Amenities · Policies · Rooms
            </Badge>
          </span>
          {showStaticInfo ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {showStaticInfo && (
          <div className="p-4" data-ocid="hotel.static.panel">
            <HotelStaticDetail hid={hotelId} />
          </div>
        )}
      </div>

      {/* Dev helpers (hidden from UI — for testing sold-out and session-expired) */}
      <div className="flex gap-2 flex-wrap">
        <button
          type="button"
          className="text-[10px] text-muted-foreground underline"
          onClick={() =>
            setSoldOutOptionId("db35a71a-4577-4740-8706-7d32e4c2ca4e")
          }
          data-ocid="hotel.detail.secondary_button"
        >
          [Test] Simulate sold-out
        </button>
        <button
          type="button"
          className="text-[10px] text-muted-foreground underline"
          onClick={() => setSessionExpiredError((v) => !v)}
          data-ocid="hotel.detail.toggle"
        >
          [Test] Toggle session-expired
        </button>
      </div>

      {/* Session note */}
      <p className="text-[10px] text-muted-foreground text-center pb-2">
        Hotel ID: {hotelId} · Pricing is real-time. Session expires in ~15 min
        from initial search.
      </p>
    </div>
  );
}
