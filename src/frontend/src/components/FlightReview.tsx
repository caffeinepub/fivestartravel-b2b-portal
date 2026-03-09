import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  CreditCard,
  Plane,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FlightFareRules } from "./FlightFareRules";
import { FlightSeatMap } from "./FlightSeatMap";
import type { SelectedSeat } from "./FlightSeatMap";
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

export interface FlightReviewFlight {
  id: string;
  priceId: string;
  airline: string;
  airlineCode: string;
  flightNo: string;
  departure: string;
  depTime: string;
  arrival: string;
  arrTime: string;
  duration: string;
  stops: number;
  price: number;
  baseFare: number;
  taxes: number;
  refundable: boolean;
  cabinClass: string;
  mf?: number;
  mft?: number;
  fareIdentifier?: string;
  checkInBaggage?: string;
  cabinBaggage?: string;
  rT?: number;
}

interface Passenger {
  type: "ADULT" | "CHILD" | "INFANT";
  ti: string;
  fN: string;
  lN: string;
  dob: string;
  pan: string;
  pNum: string;
  eD: string;
  pNat: string;
  pid: string;
  di: string;
  ssrBaggage: Array<{ key: string; code: string }>;
  ssrMeal: Array<{ key: string; code: string }>;
}

interface Conditions {
  passportMandatory: boolean;
  passportExpiry: boolean;
  passportIssue: boolean;
  adobr: boolean;
  cdobr: boolean;
  idobr: boolean;
  gstMandatory: boolean;
  gstApplicable: boolean;
  emergencyContactRequired: boolean;
  holdAllowed: boolean;
  seatApplicable: boolean;
  documentIdApplicable: boolean;
  documentIdMandatory: boolean;
  sessionTime: number;
}

interface SsrOption {
  code: string;
  desc: string;
  amount?: number;
}
interface SegmentSsr {
  segmentId: string;
  label: string;
  baggage: SsrOption[];
  meal: SsrOption[];
}

interface FlightReviewProps {
  flight: FlightReviewFlight;
  passengers: { adults: number; children: number; infants: number };
  onBack: () => void;
  onConfirmed: (bookingId: string) => void;
}

const API = "https://apitest.tripjack.com";
const KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";
const hdr = { "Content-Type": "application/json", apikey: KEY };
const DIAL = ["+91", "+1", "+44", "+971", "+65", "+60"];

export function FlightReview({
  flight,
  passengers,
  onBack,
  onConfirmed,
}: FlightReviewProps) {
  const totalPax = passengers.adults + passengers.children + passengers.infants;

  const [reviewLoading, setReviewLoading] = useState(true);
  const [reviewError, setReviewError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [conditions, setConditions] = useState<Conditions | null>(null);
  const [segmentSsrs, setSegmentSsrs] = useState<SegmentSsr[]>([]);
  const [paxList, setPaxList] = useState<Passenger[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dialCode, setDialCode] = useState("+91");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyEmail, setEmergencyEmail] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstName, setGstName] = useState("");
  const [gstEmail, setGstEmail] = useState("");
  const [gstMobile, setGstMobile] = useState("");
  const [gstAddress, setGstAddress] = useState("");
  const [showGst, setShowGst] = useState(false);
  const [holdBooking, setHoldBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [confirmedBookingId, setConfirmedBookingId] = useState("");
  const [bookLoading, setBookLoading] = useState(false);
  const [bookError, setBookError] = useState("");
  const [pnrs, setPnrs] = useState<string[]>([]);
  const [timeLimit, setTimeLimit] = useState("");
  const [confirmHoldLoading, setConfirmHoldLoading] = useState(false);
  const [unholdLoading, setUnholdLoading] = useState(false);
  const [sessionCountdown, setSessionCountdown] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);
  const [seatConfirmed, setSeatConfirmed] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    async function doReview() {
      try {
        const res = await fetch(`${API}/fms/v1/review`, {
          method: "POST",
          headers: hdr,
          body: JSON.stringify({ priceIds: [flight.priceId || flight.id] }),
        });
        const json = await res.json();
        if (!json?.bookingId)
          throw new Error(json?.errors?.[0]?.message ?? "Review failed");
        setBookingId(json.bookingId);
        const cond = json.conditions ?? {};
        const pcs = cond.pcs ?? {};
        const dob = cond.dob ?? {};
        const gst = cond.gst ?? {};
        const dc = cond.dc ?? {};
        const c: Conditions = {
          passportMandatory: pcs.pm ?? false,
          passportExpiry: pcs.pped ?? false,
          passportIssue: pcs.pid ?? false,
          adobr: dob.adobr ?? false,
          cdobr: dob.cdobr ?? false,
          idobr: dob.idobr ?? false,
          gstMandatory: gst.igm ?? false,
          gstApplicable: gst.gstappl ?? false,
          emergencyContactRequired: cond.iecr ?? false,
          holdAllowed: cond.isBA ?? true,
          seatApplicable: cond.isa ?? false,
          documentIdApplicable: dc.ida ?? false,
          documentIdMandatory: dc.idm ?? false,
          sessionTime: cond.st ?? 900,
        };
        setConditions(c);
        setSessionCountdown(c.sessionTime);
        const empty = (): Passenger => ({
          type: "ADULT",
          ti: "Mr",
          fN: "",
          lN: "",
          dob: "",
          pan: "",
          pNum: "",
          eD: "",
          pNat: "",
          pid: "",
          di: "",
          ssrBaggage: [],
          ssrMeal: [],
        });
        const list: Passenger[] = [];
        for (let i = 0; i < passengers.adults; i++)
          list.push({ ...empty(), type: "ADULT", ti: "Mr" });
        for (let i = 0; i < passengers.children; i++)
          list.push({ ...empty(), type: "CHILD", ti: "Master" });
        for (let i = 0; i < passengers.infants; i++)
          list.push({ ...empty(), type: "INFANT", ti: "Master" });
        setPaxList(list);
        const ssrs: SegmentSsr[] = [];
        for (const trip of json.tripInfos ?? []) {
          for (const seg of trip.sI ?? []) {
            const si = seg.ssrInfo ?? {};
            const bag = (si.BAGGAGE ?? []).map(
              (b: { code: string; desc: string; amount?: number }) => ({
                code: b.code,
                desc: b.desc,
                amount: b.amount,
              }),
            );
            const meal = (si.MEAL ?? []).map(
              (m: { code: string; desc: string; amount?: number }) => ({
                code: m.code,
                desc: m.desc,
                amount: m.amount,
              }),
            );
            if (bag.length > 0 || meal.length > 0)
              ssrs.push({
                segmentId: seg.id ?? `${seg.da?.code}-${seg.aa?.code}`,
                label: `${seg.da?.code ?? ""} \u2192 ${seg.aa?.code ?? ""}`,
                baggage: bag,
                meal,
              });
          }
        }
        setSegmentSsrs(ssrs);
      } catch (err) {
        setReviewError((err as Error).message);
      } finally {
        setReviewLoading(false);
      }
    }
    doReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // biome-ignore lint/correctness/useExhaustiveDependencies: boolean dep triggers timer
  useEffect(() => {
    if (sessionCountdown <= 0) return;
    const t = setInterval(
      () => setSessionCountdown((p) => Math.max(0, p - 1)),
      1000,
    );
    return () => clearInterval(t);
  }, [sessionCountdown > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  function updatePax(idx: number, field: keyof Passenger, value: unknown) {
    setPaxList((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p)),
    );
  }
  function updateSsr(
    idx: number,
    segId: string,
    type: "ssrBaggage" | "ssrMeal",
    code: string,
  ) {
    setPaxList((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;
        const filtered = p[type].filter((s) => s.key !== segId);
        return {
          ...p,
          [type]: code ? [...filtered, { key: segId, code }] : filtered,
        };
      }),
    );
  }

  async function handleBook() {
    setBookLoading(true);
    setBookError("");
    try {
      const travellerInfo = paxList.map((p, idx) => ({
        ti: p.ti,
        pt: p.type,
        fN: p.fN,
        lN: p.lN,
        ...(p.dob ? { dob: p.dob } : {}),
        ...(p.pNum ? { pNum: p.pNum } : {}),
        ...(p.eD ? { eD: p.eD } : {}),
        ...(p.pNat ? { pNat: p.pNat } : {}),
        ...(p.pid ? { pid: p.pid } : {}),
        ...(p.di ? { di: p.di } : {}),
        ...(p.ssrBaggage.length > 0 ? { ssrBaggageInfos: p.ssrBaggage } : {}),
        ...(p.ssrMeal.length > 0 ? { ssrMealInfos: p.ssrMeal } : {}),
        // Attach seat selection if available for this pax index
        ...(selectedSeats.length > 0
          ? {
              ssrSeatInfos: selectedSeats
                .filter((_, si) => si === idx)
                .map((s) => ({
                  key: s.segmentKey,
                  code: s.seatCode,
                  seatNo: s.seatNo,
                })),
            }
          : {}),
      }));
      const body: Record<string, unknown> = {
        bookingId,
        travellerInfo,
        deliveryInfo: { emails: [email], contacts: [`${dialCode}${phone}`] },
        type: "AIR",
      };
      if (!holdBooking)
        body.paymentInfos = [{ amount: flight.price * totalPax }];
      if (gstNumber)
        body.gstInfo = {
          gstNumber,
          registeredName: gstName,
          email: gstEmail,
          mobile: gstMobile,
          address: gstAddress,
        };
      if (conditions?.emergencyContactRequired || emergencyName)
        body.contactInfo = {
          ecn: emergencyName,
          emails: [emergencyEmail],
          contacts: [`${dialCode}${emergencyPhone}`],
        };
      const bookRes = await fetch(`${API}/oms/v1/air/book`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify(body),
      });
      const bookJson = await bookRes.json();
      if (!bookJson?.status?.success)
        throw new Error("Booking API returned failure");
      const finalId = bookJson.bookingId ?? bookingId;
      setConfirmedBookingId(finalId);
      const TERMINAL = ["SUCCESS", "ON_HOLD", "FAILED", "ABORTED", "CANCELLED"];
      let status = "";
      for (let i = 0; i < 36; i++) {
        await new Promise((r) => setTimeout(r, 5000));
        try {
          const d = await fetch(`${API}/oms/v1/booking-details`, {
            method: "POST",
            headers: hdr,
            body: JSON.stringify({ bookingId: finalId }),
          });
          const dj = await d.json();
          status = dj?.order?.status ?? "";
          if (dj?.itemInfos?.AIR?.travellerInfos) {
            const pnrMap = dj.itemInfos.AIR.travellerInfos[0]?.pnrDetails ?? {};
            setPnrs(Object.values(pnrMap) as string[]);
          }
          if (dj?.itemInfos?.AIR)
            setTimeLimit(dj.itemInfos.AIR.timeLimit ?? "");
          if (TERMINAL.includes(status)) break;
        } catch {
          /* ignore */
        }
      }
      setBookingStatus(status || (holdBooking ? "ON_HOLD" : "SUCCESS"));
    } catch (err) {
      setBookError(
        (err as Error).message || "Booking failed. Please try again.",
      );
    } finally {
      setBookLoading(false);
    }
  }

  async function handleConfirmHold() {
    setConfirmHoldLoading(true);
    try {
      const vRes = await fetch(`${API}/oms/v1/air/fare-validate`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify({ bookingId: confirmedBookingId }),
      });
      const vJson = await vRes.json();
      if (!vJson?.status?.success) {
        alert("Fare is no longer available.");
        return;
      }
      const cRes = await fetch(`${API}/oms/v1/air/confirm-book`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify({
          bookingId: confirmedBookingId,
          paymentInfos: [{ amount: flight.price * totalPax }],
        }),
      });
      const cJson = await cRes.json();
      if (cJson?.status?.success) setBookingStatus("SUCCESS");
    } catch {
      /* ignore */
    } finally {
      setConfirmHoldLoading(false);
    }
  }

  async function handleUnhold() {
    setUnholdLoading(true);
    try {
      await fetch(`${API}/oms/v1/air/unhold`, {
        method: "POST",
        headers: hdr,
        body: JSON.stringify({ bookingId: confirmedBookingId, pnrs }),
      });
      setBookingStatus("UNCONFIRMED");
    } catch {
      /* ignore */
    } finally {
      setUnholdLoading(false);
    }
  }

  const fmt = (n: number) => `\u20b9${n.toLocaleString("en-IN")}`;
  const fmtTime = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  // --- CONFIRMATION SCREEN ---
  if (bookingStatus !== null) {
    const isSuccess = bookingStatus === "SUCCESS";
    const isHold = bookingStatus === "ON_HOLD";
    const isFailed = bookingStatus === "FAILED" || bookingStatus === "ABORTED";
    const isUnconfirmed = bookingStatus === "UNCONFIRMED";
    return (
      <div
        className="bg-card border border-border rounded-2xl p-8 text-center max-w-lg mx-auto"
        data-ocid="flight.confirm.panel"
      >
        {isSuccess && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Flight Booked!
            </h2>
          </>
        )}
        {isHold && (
          <>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Booking On Hold
            </h2>
          </>
        )}
        {isFailed && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Booking Failed
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              We could not confirm your booking. Please try again.
            </p>
          </>
        )}
        {isUnconfirmed && (
          <>
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              PNR Released
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Your hold booking has been released.
            </p>
          </>
        )}
        {!isFailed && !isUnconfirmed && (
          <>
            <p className="text-muted-foreground text-sm mb-1">
              Booking Reference
            </p>
            <p
              className="text-2xl font-mono font-bold text-primary mb-4"
              data-ocid="flight.confirm.panel"
            >
              {confirmedBookingId}
            </p>
            {pnrs.length > 0 && (
              <p className="text-sm text-muted-foreground mb-2">
                PNR(s):{" "}
                <span className="font-semibold text-foreground">
                  {pnrs.join(", ")}
                </span>
              </p>
            )}
            {isHold && timeLimit && (
              <p className="text-xs text-amber-600 mb-4">
                Confirm by: {timeLimit}
              </p>
            )}
            <div className="bg-muted/40 rounded-xl p-4 text-left mb-6">
              <div className="flex items-center gap-3">
                <Plane className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">
                    {flight.airline} \u00b7 {flight.flightNo}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {flight.departure} \u2192 {flight.arrival} \u00b7{" "}
                    {flight.depTime} \u2192 {flight.arrTime}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col gap-3">
          {isHold && (
            <>
              <Button
                className="w-full bg-primary text-primary-foreground"
                disabled={confirmHoldLoading}
                onClick={handleConfirmHold}
                data-ocid="flight.confirm.confirm_button"
              >
                {confirmHoldLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
                    Confirming...
                  </>
                ) : (
                  "Confirm Hold Booking"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={unholdLoading}
                onClick={handleUnhold}
                data-ocid="flight.confirm.cancel_button"
              >
                {unholdLoading ? "Releasing..." : "Release PNR"}
              </Button>
            </>
          )}
          {(isSuccess || isUnconfirmed) && (
            <Button
              className="w-full bg-primary text-primary-foreground"
              onClick={() => onConfirmed(confirmedBookingId)}
              data-ocid="flight.confirm.primary_button"
            >
              Done
            </Button>
          )}
          {isFailed && (
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setBookingStatus(null)}
              data-ocid="flight.confirm.secondary_button"
            >
              Try Again
            </Button>
          )}
        </div>
      </div>
    );
  }

  // --- LOADING / ERROR ---
  if (reviewLoading)
    return (
      <div
        className="flex flex-col items-center justify-center py-20 gap-4"
        data-ocid="flight.review.loading_state"
      >
        <span className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-muted-foreground text-sm">
          Validating flight availability...
        </p>
      </div>
    );
  if (reviewError)
    return (
      <div
        className="flex flex-col items-center justify-center py-16 gap-4"
        data-ocid="flight.review.error_state"
      >
        <AlertCircle className="w-10 h-10 text-destructive" />
        <p className="text-destructive font-semibold">{reviewError}</p>
        <Button
          variant="outline"
          onClick={onBack}
          data-ocid="flight.review.back.button"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );

  const showDob = (p: Passenger) =>
    p.type === "INFANT" ||
    (p.type === "ADULT" && (conditions?.adobr ?? false)) ||
    (p.type === "CHILD" && (conditions?.cdobr ?? false));
  const adultTitles = ["Mr", "Mrs", "Ms", "Miss"];
  const childTitles = ["Master", "Miss"];
  const getTitles = (p: Passenger) =>
    p.type === "ADULT" ? adultTitles : childTitles;

  return (
    <div className="space-y-5" data-ocid="flight.review.panel">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
          onClick={onBack}
          data-ocid="flight.review.back.button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </button>
        {sessionCountdown > 0 && (
          <span className="flex items-center gap-1 text-xs font-mono font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {fmtTime(sessionCountdown)}
          </span>
        )}
        {sessionCountdown === 0 && (
          <span
            className="text-xs text-amber-700 bg-amber-50 border border-amber-200 px-2 py-1 rounded-full"
            data-ocid="flight.session.error_state"
          >
            Session expired \u2014 please search again
          </span>
        )}
      </div>

      {/* Flight Summary */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plane className="w-4 h-4 text-primary" />
          Flight Summary
        </h3>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-center">
            <p className="text-2xl font-bold">{flight.depTime}</p>
            <p className="text-sm text-muted-foreground">{flight.departure}</p>
          </div>
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground">{flight.duration}</p>
            <div className="border-t border-dashed border-border my-1" />
            <p className="text-xs text-muted-foreground">
              {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop`}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{flight.arrTime}</p>
            <p className="text-sm text-muted-foreground">{flight.arrival}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xs text-muted-foreground">{flight.airline}</p>
            <p className="font-semibold">{flight.flightNo}</p>
            <div className="flex gap-1 justify-end mt-1 flex-wrap">
              <Badge variant="outline" className="text-xs">
                {flight.cabinClass}
              </Badge>
              {flight.fareIdentifier && (
                <Badge className="text-[10px] bg-amber-100 text-amber-700 border-amber-200">
                  {flight.fareIdentifier}
                </Badge>
              )}
            </div>
          </div>
        </div>
        {/* Fare Rules button below flight summary */}
        {bookingId && (
          <div className="mt-4 pt-3 border-t border-border">
            <FlightFareRules
              bookingId={bookingId}
              priceId={flight.priceId}
              flowType="REVIEW"
            />
          </div>
        )}
      </div>

      {/* Price Breakup */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-primary" />
          Price Breakup
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Base Fare \u00d7 {totalPax}
            </span>
            <span>{fmt(flight.baseFare * totalPax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Taxes & Fees \u00d7 {totalPax}
            </span>
            <span>{fmt(flight.taxes * totalPax)}</span>
          </div>
          {(flight.mf ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Management Fee \u00d7 {totalPax}
              </span>
              <span>{fmt((flight.mf ?? 0) * totalPax)}</span>
            </div>
          )}
          {(flight.mft ?? 0) > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                MF Tax \u00d7 {totalPax}
              </span>
              <span>{fmt((flight.mft ?? 0) * totalPax)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t border-border pt-2">
            <span>Total</span>
            <span className="text-primary">{fmt(flight.price * totalPax)}</span>
          </div>
        </div>
      </div>

      {/* Seat Map (shown when seatApplicable and bookingId available, before confirmed) */}
      {conditions?.seatApplicable && bookingId && !seatConfirmed && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">Seat Selection</h3>
          <FlightSeatMap
            bookingId={bookingId}
            onSeatsSelected={(seats) => {
              setSelectedSeats(seats);
              setSeatConfirmed(true);
            }}
          />
        </div>
      )}

      {/* Seat selection summary after confirmed */}
      {seatConfirmed && selectedSeats.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Selected Seats</h3>
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={() => setSeatConfirmed(false)}
            >
              Change
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {selectedSeats
              .map((s) => `${s.segmentKey}: ${s.seatNo}`)
              .join(" | ")}
          </p>
        </div>
      )}

      {/* Traveller Info */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold text-foreground mb-4">
          Traveller Information
        </h3>
        <div className="space-y-6">
          {paxList.map((pax, idx) => (
            <div
              key={`${pax.type}-${idx}`}
              className="space-y-3 pb-4 border-b border-border last:border-0 last:pb-0"
              data-ocid={`flight.traveller.item.${idx + 1}`}
            >
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                {pax.type} {idx + 1}
              </p>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <Label className="text-xs">Title</Label>
                  <Select
                    value={pax.ti}
                    onValueChange={(v) => updatePax(idx, "ti", v)}
                  >
                    <SelectTrigger
                      className="h-10"
                      data-ocid={`flight.traveller.title.select.${idx + 1}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getTitles(pax).map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">First Name</Label>
                  <Input
                    placeholder="First name"
                    value={pax.fN}
                    onChange={(e) => updatePax(idx, "fN", e.target.value)}
                    className="h-10"
                    data-ocid={`flight.traveller.input.${idx + 1}`}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Last Name</Label>
                  <Input
                    placeholder="Last name"
                    value={pax.lN}
                    onChange={(e) => updatePax(idx, "lN", e.target.value)}
                    className="h-10"
                    data-ocid={`flight.traveller.input.${idx + 1}`}
                  />
                </div>
              </div>
              {showDob(pax) && (
                <div className="space-y-1">
                  <Label className="text-xs">Date of Birth</Label>
                  <Input
                    type="date"
                    value={pax.dob}
                    onChange={(e) => updatePax(idx, "dob", e.target.value)}
                    className="h-10 max-w-xs"
                    data-ocid={`flight.traveller.input.${idx + 1}`}
                  />
                </div>
              )}
              {conditions?.passportMandatory && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Passport Number *</Label>
                    <Input
                      placeholder="A1234567"
                      value={pax.pNum}
                      onChange={(e) => updatePax(idx, "pNum", e.target.value)}
                      className="h-10"
                      data-ocid={`flight.traveller.input.${idx + 1}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Nationality (2-letter) *</Label>
                    <Input
                      placeholder="IN"
                      maxLength={2}
                      value={pax.pNat}
                      onChange={(e) =>
                        updatePax(idx, "pNat", e.target.value.toUpperCase())
                      }
                      className="h-10"
                      data-ocid={`flight.traveller.input.${idx + 1}`}
                    />
                  </div>
                  {conditions.passportExpiry && (
                    <div className="space-y-1">
                      <Label className="text-xs">Passport Expiry *</Label>
                      <Input
                        type="date"
                        value={pax.eD}
                        onChange={(e) => updatePax(idx, "eD", e.target.value)}
                        className="h-10"
                        data-ocid={`flight.traveller.input.${idx + 1}`}
                      />
                    </div>
                  )}
                  {conditions.passportIssue && (
                    <div className="space-y-1">
                      <Label className="text-xs">Passport Issue Date *</Label>
                      <Input
                        type="date"
                        value={pax.pid}
                        onChange={(e) => updatePax(idx, "pid", e.target.value)}
                        className="h-10"
                        data-ocid={`flight.traveller.input.${idx + 1}`}
                      />
                    </div>
                  )}
                </div>
              )}
              {conditions?.documentIdApplicable && (
                <div className="space-y-1">
                  <Label className="text-xs">
                    Document ID
                    {conditions.documentIdMandatory ? " *" : " (optional)"}
                  </Label>
                  <Input
                    placeholder="Document ID"
                    value={pax.di}
                    onChange={(e) => updatePax(idx, "di", e.target.value)}
                    className="h-10 max-w-xs"
                    data-ocid={`flight.traveller.input.${idx + 1}`}
                  />
                </div>
              )}
              {segmentSsrs.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground">
                    SSR Options
                  </p>
                  {segmentSsrs.map((seg) => (
                    <div key={seg.segmentId} className="grid grid-cols-2 gap-3">
                      {seg.baggage.length > 0 && (
                        <div className="space-y-1">
                          <Label className="text-xs">{seg.label} Baggage</Label>
                          <Select
                            value={
                              pax.ssrBaggage.find(
                                (s) => s.key === seg.segmentId,
                              )?.code ?? ""
                            }
                            onValueChange={(v) =>
                              updateSsr(idx, seg.segmentId, "ssrBaggage", v)
                            }
                          >
                            <SelectTrigger
                              className="h-9 text-xs"
                              data-ocid={`flight.traveller.select.${idx + 1}`}
                            >
                              <SelectValue placeholder="No extra baggage" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">No extra baggage</SelectItem>
                              {seg.baggage.map((b) => (
                                <SelectItem key={b.code} value={b.code}>
                                  {b.desc}
                                  {b.amount ? ` (+\u20b9${b.amount})` : ""}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {seg.meal.length > 0 && (
                        <div className="space-y-1">
                          <Label className="text-xs">{seg.label} Meal</Label>
                          <Select
                            value={
                              pax.ssrMeal.find((s) => s.key === seg.segmentId)
                                ?.code ?? ""
                            }
                            onValueChange={(v) =>
                              updateSsr(idx, seg.segmentId, "ssrMeal", v)
                            }
                          >
                            <SelectTrigger
                              className="h-9 text-xs"
                              data-ocid={`flight.traveller.select.${idx + 1}`}
                            >
                              <SelectValue placeholder="No meal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">No meal</SelectItem>
                              {seg.meal.map((m) => (
                                <SelectItem key={m.code} value={m.code}>
                                  {m.desc}
                                  {m.amount ? ` (+\u20b9${m.amount})` : ""}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Contact Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs">Email *</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10"
              data-ocid="flight.contact.input"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Phone *</Label>
            <div className="flex gap-2">
              <select
                className="h-10 rounded-md border border-input bg-background px-2 text-sm w-20 flex-shrink-0"
                value={dialCode}
                onChange={(e) => setDialCode(e.target.value)}
                data-ocid="flight.contact.select"
              >
                {DIAL.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Input
                type="tel"
                placeholder="9876543210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-10"
                data-ocid="flight.contact.input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      {conditions?.emergencyContactRequired && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4">
            Emergency Contact *
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <Label className="text-xs">Name</Label>
              <Input
                placeholder="Contact name"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="h-10"
                data-ocid="flight.emergency.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Email</Label>
              <Input
                type="email"
                placeholder="emergency@email.com"
                value={emergencyEmail}
                onChange={(e) => setEmergencyEmail(e.target.value)}
                className="h-10"
                data-ocid="flight.emergency.input"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Phone</Label>
              <Input
                type="tel"
                placeholder="9876543210"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="h-10"
                data-ocid="flight.emergency.input"
              />
            </div>
          </div>
        </div>
      )}

      {/* GST Details */}
      {(conditions?.gstMandatory || conditions?.gstApplicable) && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">
              GST Details{!conditions.gstMandatory && " (Optional)"}
            </h3>
            {!conditions.gstMandatory && (
              <button
                type="button"
                className={`w-10 h-5 rounded-full transition-colors relative ${showGst ? "bg-primary" : "bg-muted"}`}
                onClick={() => setShowGst((v) => !v)}
                data-ocid="flight.gst.toggle"
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow absolute top-0.5 transition-transform ${showGst ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            )}
          </div>
          {(conditions.gstMandatory || showGst) && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs">GST Number (15 chars)</Label>
                <Input
                  placeholder="22AAAAA0000A1Z5"
                  maxLength={15}
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  className="h-10"
                  data-ocid="flight.gst.input"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Registered Name</Label>
                <Input
                  placeholder="Company Name"
                  value={gstName}
                  onChange={(e) => setGstName(e.target.value)}
                  className="h-10"
                  data-ocid="flight.gst.input"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">GST Email</Label>
                <Input
                  type="email"
                  placeholder="gst@company.com"
                  value={gstEmail}
                  onChange={(e) => setGstEmail(e.target.value)}
                  className="h-10"
                  data-ocid="flight.gst.input"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">GST Mobile</Label>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={gstMobile}
                  onChange={(e) => setGstMobile(e.target.value)}
                  className="h-10"
                  data-ocid="flight.gst.input"
                />
              </div>
              <div className="space-y-1 col-span-2">
                <Label className="text-xs">GST Address</Label>
                <Input
                  placeholder="Registered address"
                  value={gstAddress}
                  onChange={(e) => setGstAddress(e.target.value)}
                  className="h-10"
                  data-ocid="flight.gst.input"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Booking Type Toggle */}
      {conditions?.holdAllowed && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">Booking Type</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {holdBooking
                  ? "Hold \u2014 confirm within deadline"
                  : "Instant \u2014 immediate confirmation"}
              </p>
            </div>
            <button
              type="button"
              className={`w-12 h-6 rounded-full transition-colors relative ${holdBooking ? "bg-amber-500" : "bg-primary"}`}
              onClick={() => setHoldBooking((v) => !v)}
              data-ocid="flight.hold.toggle"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow absolute top-0.5 transition-transform ${holdBooking ? "translate-x-6" : "translate-x-0.5"}`}
              />
            </button>
          </div>
        </div>
      )}

      {bookError && (
        <div
          className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2"
          data-ocid="flight.review.error_state"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {bookError}
        </div>
      )}

      <Button
        size="lg"
        className="w-full bg-primary text-primary-foreground font-semibold"
        disabled={bookLoading || !email || paxList.some((p) => !p.fN || !p.lN)}
        onClick={handleBook}
        data-ocid="flight.review.submit_button"
      >
        {bookLoading ? (
          <span
            className="flex items-center gap-2"
            data-ocid="flight.review.loading_state"
          >
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            {holdBooking ? "Placing Hold..." : "Booking..."}
          </span>
        ) : (
          <span>
            {holdBooking ? "Hold Booking" : "Confirm & Book"} \u2014{" "}
            {fmt(flight.price * totalPax)}
          </span>
        )}
      </Button>
    </div>
  );
}
