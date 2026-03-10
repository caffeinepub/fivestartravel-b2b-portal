import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CreditCard,
  Hotel,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import type { HotelOption } from "./HotelDetail";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// Demo API key — in production proxy through backend to keep key secret
const TJ_API_KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";
const TJ_BASE = "https://apitest.tripjack.com";

const TERMINAL = ["SUCCESS", "ON_HOLD", "ABORTED", "FAILED"];

interface RoomGuest {
  adults: number;
  children: number;
  childAge: number[];
}

interface HotelReviewProps {
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  rooms: RoomGuest[];
  option: HotelOption;
  reviewHash: string;
  correlationId: string;
  onBack: () => void;
  onBookingConfirmed: (bookingId: string, status: string) => void;
}

interface TravellerInfo {
  ti: string;
  fN: string;
  lN: string;
  pan: string;
  pNum: string;
}

const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Master"];
const DIAL_CODES = ["+91", "+1", "+44", "+971", "+65", "+60", "+66", "+81"];

function GuestForm({
  guest,
  label,
  roomIdx,
  guestIdx,
  isLead,
  panRequired,
  passportRequired,
  onChange,
}: {
  guest: TravellerInfo;
  label: string;
  roomIdx: number;
  guestIdx: number;
  isLead: boolean;
  panRequired: boolean;
  passportRequired: boolean;
  onChange: (field: keyof TravellerInfo, value: string) => void;
}) {
  return (
    <div className="border border-border/50 rounded-lg p-3 space-y-3">
      <div className="text-xs font-semibold text-muted-foreground uppercase">
        {label}
        {isLead && (
          <Badge className="ml-2 bg-primary/10 text-primary border-primary/20 text-xs">
            Lead Guest
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <Label className="text-xs">Title</Label>
          <Select value={guest.ti} onValueChange={(v) => onChange("ti", v)}>
            <SelectTrigger
              className="h-8 text-xs"
              data-ocid={`hotel.review.title.select.${roomIdx + 1}.${guestIdx + 1}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TITLES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Label className="text-xs">First Name *</Label>
          <Input
            className="h-8 text-xs"
            placeholder="First name"
            value={guest.fN}
            onChange={(e) => onChange("fN", e.target.value)}
            data-ocid={`hotel.review.firstname.input.${roomIdx + 1}`}
          />
        </div>
        <div>
          <Label className="text-xs">Last Name *</Label>
          <Input
            className="h-8 text-xs"
            placeholder="Last"
            value={guest.lN}
            onChange={(e) => onChange("lN", e.target.value)}
            data-ocid={`hotel.review.lastname.input.${roomIdx + 1}`}
          />
        </div>
      </div>
      {panRequired && (
        <div>
          <Label className="text-xs">PAN Card Number *</Label>
          <Input
            className="h-8 text-xs uppercase"
            placeholder="AAAAA9999A"
            maxLength={10}
            value={guest.pan}
            onChange={(e) => onChange("pan", e.target.value.toUpperCase())}
            data-ocid={`hotel.review.pan.input.${roomIdx + 1}`}
          />
        </div>
      )}
      {passportRequired && (
        <div>
          <Label className="text-xs">Passport Number *</Label>
          <Input
            className="h-8 text-xs uppercase"
            placeholder="A1234567"
            value={guest.pNum}
            onChange={(e) => onChange("pNum", e.target.value.toUpperCase())}
            data-ocid={`hotel.review.passport.input.${roomIdx + 1}`}
          />
        </div>
      )}
    </div>
  );
}

// Booking status step indicator
function BookingProgress({ step, status }: { step: number; status: string }) {
  const steps = ["Review", "Booking", "Confirming", "Done"];
  return (
    <div
      className="bg-card border border-border rounded-xl p-4"
      data-ocid="hotel.review.progress.panel"
    >
      <div className="flex items-center justify-between mb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < step
                  ? "bg-green-500 text-white"
                  : i === step
                    ? "bg-primary text-white animate-pulse"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i < step ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span
              className={`text-xs ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-px w-8 mx-1 ${i < step ? "bg-green-400" : "bg-border"}`}
              />
            )}
          </div>
        ))}
      </div>
      {status && (
        <p className="text-xs text-center text-muted-foreground mt-1">
          {status}
        </p>
      )}
    </div>
  );
}

export function HotelReview({
  hotelId,
  hotelName,
  checkIn,
  checkOut,
  rooms,
  option,
  reviewHash,
  correlationId,
  onBack,
  onBookingConfirmed,
}: HotelReviewProps) {
  const [bookingType, setBookingType] = useState<"instant" | "hold">("instant");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [progressStep, setProgressStep] = useState(-1);
  const [progressStatus, setProgressStatus] = useState("");

  const initTravellers = rooms.map((room) => {
    const guests: TravellerInfo[] = [];
    for (let i = 0; i < room.adults; i++)
      guests.push({ ti: "Mr", fN: "", lN: "", pan: "", pNum: "" });
    for (let i = 0; i < (room.children || 0); i++)
      guests.push({ ti: "Master", fN: "", lN: "", pan: "", pNum: "" });
    return guests;
  });
  const [travellers, setTravellers] =
    useState<TravellerInfo[][]>(initTravellers);

  function updateTraveller(
    roomIdx: number,
    guestIdx: number,
    field: keyof TravellerInfo,
    value: string,
  ) {
    setTravellers((prev) => {
      const next = prev.map((r) => [...r]);
      next[roomIdx][guestIdx] = { ...next[roomIdx][guestIdx], [field]: value };
      return next;
    });
  }

  const nights = Math.max(
    1,
    Math.round(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000,
    ),
  );

  const { totalPrice, basePrice, taxes, mf, mft, discount, currency } =
    option.pricing;
  const { panRequired, passportRequired } = option.compliance;

  const freeCancelPenalty = option.cancellation.penalties.find(
    (p) => p.amount === 0 && new Date(p.to) > new Date(),
  );

  async function pollBookingStatus(bookingId: string): Promise<string> {
    const deadline = Date.now() + 180_000;
    let lastStatus = "IN_PROGRESS";
    while (Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 5000));
      try {
        const res = await fetch(`${TJ_BASE}/oms/v3/hotel/booking-details`, {
          method: "POST",
          headers: { apikey: TJ_API_KEY, "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId }),
        });
        const data = (await res.json()) as {
          order?: { status?: string };
          status?: { success: boolean };
        };
        const s = data?.order?.status ?? "";
        lastStatus = s;
        setProgressStatus(`Status: ${s}`);
        if (TERMINAL.includes(s)) return s;
      } catch {
        // network blip -- keep polling
      }
    }
    return lastStatus;
  }

  async function handleBook() {
    if (!email || !phone) {
      setErrorMsg("Please fill in email and phone.");
      return;
    }
    for (let ri = 0; ri < travellers.length; ri++) {
      for (let gi = 0; gi < travellers[ri].length; gi++) {
        const t = travellers[ri][gi];
        if (!t.fN || !t.lN) {
          setErrorMsg(`Fill name for Room ${ri + 1}, Guest ${gi + 1}.`);
          return;
        }
        if (panRequired && !t.pan) {
          setErrorMsg(`PAN required for Room ${ri + 1}, Guest ${gi + 1}.`);
          return;
        }
        if (passportRequired && !t.pNum) {
          setErrorMsg(`Passport required for Room ${ri + 1}, Guest ${gi + 1}.`);
          return;
        }
      }
    }
    setErrorMsg("");
    setLoading(true);

    try {
      // Step 1 — Review API
      setProgressStep(0);
      setProgressStatus("Validating availability...");
      const reviewRes = await fetch(`${TJ_BASE}/hms/v3/hotel/review`, {
        method: "POST",
        headers: { apikey: TJ_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          correlationId,
          optionId: option.optionId,
          reviewHash,
          hid: hotelId,
        }),
      });
      const reviewData = (await reviewRes.json()) as {
        bookingId?: string;
        status?: { success: boolean };
        error?: { code: string; message: string };
      };

      if (!reviewData?.status?.success || !reviewData.bookingId) {
        const code = reviewData?.error?.code ?? "";
        if (code === "OPTION_SOLD_OUT") {
          setErrorMsg(
            "This option is no longer available. Please go back and choose another room.",
          );
        } else if (code === "SEARCH_SESSION_EXPIRED") {
          setErrorMsg(
            "Your search session has expired. Please start a new search.",
          );
        } else {
          setErrorMsg(
            reviewData?.error?.message ?? "Review failed. Please try again.",
          );
        }
        setLoading(false);
        setProgressStep(-1);
        return;
      }

      const bookingId = reviewData.bookingId;

      // Step 2 — Book API
      setProgressStep(1);
      setProgressStatus("Submitting booking...");

      const roomTravellerInfo = travellers.map((roomGuests, ri) => ({
        travellerInfo: roomGuests.map((g) => {
          const pt =
            ri < rooms.length && rooms[ri] && ri < travellers.length
              ? travellers[ri].indexOf(g) < rooms[ri].adults
                ? "ADULT"
                : "CHILD"
              : "ADULT";
          const entry: Record<string, string> = {
            ti: g.ti,
            pt,
            fN: g.fN,
            lN: g.lN,
          };
          if (panRequired && g.pan) entry.pan = g.pan;
          if (passportRequired && g.pNum) entry.pNum = g.pNum;
          return entry;
        }),
      }));

      const bookBody: Record<string, unknown> = {
        bookingId,
        roomTravellerInfo,
        deliveryInfo: { emails: [email], contacts: [phone], code: [dialCode] },
        type: "HOTEL",
      };
      if (bookingType === "instant") {
        bookBody.paymentInfos = [{ amount: option.pricing.totalPrice }];
      }

      const bookRes = await fetch(`${TJ_BASE}/oms/v3/hotel/book`, {
        method: "POST",
        headers: { apikey: TJ_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify(bookBody),
      });
      const bookData = (await bookRes.json()) as {
        bookingId?: string;
        status?: { success: boolean };
        error?: { code: string; message: string };
      };

      if (!bookData?.status?.success) {
        setErrorMsg(
          bookData?.error?.message ?? "Booking failed. Please try again.",
        );
        setLoading(false);
        setProgressStep(-1);
        return;
      }

      // Step 3 — Poll for confirmation
      setProgressStep(2);
      setProgressStatus("Waiting for supplier confirmation (up to 3 min)...");
      const finalStatus = await pollBookingStatus(bookingId);

      setProgressStep(3);
      setProgressStatus("");
      setLoading(false);
      onBookingConfirmed(bookingId, finalStatus);
    } catch (err) {
      console.error(err);
      setErrorMsg("Network error. Please check your connection and try again.");
      setLoading(false);
      setProgressStep(-1);
    }
  }

  return (
    <div className="space-y-5" data-ocid="hotel.review.panel">
      {/* Breadcrumb */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          disabled={loading}
          className="border-slate-300 hover:border-slate-500 hover:bg-slate-50"
          data-ocid="hotel.review.back.button"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Rooms
        </Button>
        <div className="flex items-center gap-2 ml-auto text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" /> Search
          </span>
          <span className="text-muted-foreground/40">›</span>
          <span className="flex items-center gap-1">
            <CheckCircle className="w-3 h-3 text-green-500" /> Select Room
          </span>
          <span className="text-muted-foreground/40">›</span>
          <span className="font-semibold text-primary">Review &amp; Book</span>
          <span className="text-muted-foreground/40">›</span>
          <span>Confirmation</span>
        </div>
      </div>

      {/* Progress indicator (shown while booking) */}
      {progressStep >= 0 && (
        <BookingProgress step={progressStep} status={progressStatus} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Forms */}
        <div className="lg:col-span-2 space-y-5">
          {/* Booking type */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 border-b border-slate-600/50">
              <h3 className="font-semibold text-sm text-white">Booking Type</h3>
            </div>
            <div className="p-4">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setBookingType("instant")}
                  disabled={loading}
                  data-ocid="hotel.review.instant.toggle"
                  className={`flex-1 border rounded-xl p-3 text-sm font-medium transition-all duration-200 ${
                    bookingType === "instant"
                      ? "border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100 text-orange-700 shadow-md shadow-orange-200"
                      : "border-border text-muted-foreground hover:border-slate-400 hover:bg-muted/50"
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1" />
                  Instant Booking
                  <div className="text-xs font-normal mt-0.5">
                    Confirm &amp; pay now
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setBookingType("hold")}
                  disabled={loading}
                  data-ocid="hotel.review.hold.toggle"
                  className={`flex-1 border rounded-xl p-3 text-sm font-medium transition-all duration-200 ${
                    bookingType === "hold"
                      ? "border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 shadow-md shadow-amber-200"
                      : "border-border text-muted-foreground hover:border-slate-400 hover:bg-muted/50"
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  Hold Booking
                  <div className="text-xs font-normal mt-0.5">
                    Reserve now, pay later
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Traveller Info per room */}
          {rooms.map((room, ri) => (
            <div
              key={option.roomInfo[ri]?.id ?? `room-slot-${ri}`}
              className="bg-card border border-border rounded-xl p-4 space-y-4"
            >
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Hotel className="w-4 h-4 text-primary" />
                Room {ri + 1} — {option.roomInfo[ri]?.name ?? "Room"}
              </h3>
              {(travellers[ri] ?? []).map((guest, gi) => (
                <GuestForm
                  key={`${option.roomInfo[ri]?.id ?? ri}-guest-${gi}-${room.adults}`}
                  guest={guest}
                  label={
                    gi >= room.adults
                      ? `Child ${gi - room.adults + 1}`
                      : `Adult ${gi + 1}`
                  }
                  roomIdx={ri}
                  guestIdx={gi}
                  isLead={ri === 0 && gi === 0}
                  panRequired={panRequired}
                  passportRequired={passportRequired}
                  onChange={(field, value) =>
                    updateTraveller(ri, gi, field, value)
                  }
                />
              ))}
            </div>
          ))}

          {/* Delivery Info */}
          <div className="bg-card border border-border rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-sm">
              Booking Confirmation Delivery
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label className="text-xs">Email Address *</Label>
                <Input
                  type="email"
                  className="h-8 text-xs"
                  placeholder="agent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="hotel.review.email.input"
                />
              </div>
              <div>
                <Label className="text-xs">Dial Code</Label>
                <Select value={dialCode} onValueChange={setDialCode}>
                  <SelectTrigger
                    className="h-8 text-xs"
                    data-ocid="hotel.review.dialcode.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DIAL_CODES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Phone Number *</Label>
                <Input
                  className="h-8 text-xs"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  data-ocid="hotel.review.phone.input"
                />
              </div>
            </div>
          </div>

          {errorMsg && (
            <div
              className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg p-3"
              data-ocid="hotel.review.error_state"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          <Button
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg shadow-orange-500/30 border-0"
            size="lg"
            onClick={() => {
              void handleBook();
            }}
            disabled={loading}
            data-ocid="hotel.review.submit_button"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {progressStatus || "Processing..."}
              </span>
            ) : bookingType === "instant" ? (
              "Confirm & Book Now"
            ) : (
              "Hold This Room"
            )}
          </Button>
        </div>

        {/* Right: Price Summary */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg sticky top-4">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 px-4 py-3 border-b border-slate-700/60">
              <h3 className="font-semibold text-sm text-white">{hotelName}</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-muted-foreground space-y-1">
                <div>
                  {checkIn} → {checkOut} · {nights} night{nights > 1 ? "s" : ""}
                </div>
                <div>
                  {rooms.length} room{rooms.length > 1 ? "s" : ""} ·{" "}
                  {option.mealBasis}
                </div>
                <div>
                  <Badge variant="outline" className="text-xs">
                    {option.optionType}
                  </Badge>
                </div>
              </div>

              {option.cancellation.isRefundable && freeCancelPenalty && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-700 flex items-center gap-1.5">
                  Free cancellation until{" "}
                  {new Date(freeCancelPenalty.to).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              )}

              <div className="border-t border-border pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Base Price</span>
                  <span>
                    {currency}{" "}
                    {basePrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>
                      - {currency}{" "}
                      {discount.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>
                    {currency}{" "}
                    {taxes.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Management Fee</span>
                  <span>
                    {currency}{" "}
                    {mf.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>MF Tax</span>
                  <span>
                    {currency}{" "}
                    {mft.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm border-t border-border pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-orange-600 font-bold text-base">
                    {currency}{" "}
                    {totalPrice.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>

              {option.compliance.gstType !== "NA" && (
                <div className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1">
                  GST Type:{" "}
                  <span className="font-medium">
                    {option.compliance.gstType}
                  </span>
                </div>
              )}

              {option.bookingNotes && (
                <div className="border-t border-border pt-3">
                  <div className="text-xs font-semibold mb-1">
                    Booking Notes
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">
                    {option.bookingNotes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
