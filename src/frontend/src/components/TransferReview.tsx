import {
  AlertCircle,
  Car,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  MapPin,
  Shield,
  User,
} from "lucide-react";
import { useState } from "react";
import type { Vehicle } from "./TransferVehicleCard";

const WALLET_BALANCE = 45250;

interface ReviewProps {
  tripType: string;
  transferCategory: string;
  from: string;
  to: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  passengers: number;
  bags: number;
  vehicle: Vehicle;
  passengerData: {
    title: string;
    name: string;
    phone: string;
    email: string;
    altPhone: string;
    notes: string;
    gstEnabled: boolean;
    gstNumber: string;
    gstCompany: string;
    pickupConfirm: string;
    terminal: string;
    flightNumber: string;
    hotelName: string;
    hotelAddress: string;
    cityLocality: string;
    landmark: string;
  };
  onBack: () => void;
  onConfirm: () => void;
}

const TERMS = [
  "Free cancellation up to the time specified on your selected vehicle. Cancellations after the allowed period will incur a charge equal to 50% of the booking amount.",
  "The driver will arrive 10 minutes before the scheduled pickup time. Please be at the pickup point on time.",
  "Luggage limits apply as specified on the vehicle card. Excess luggage may incur additional charges.",
  "Toll, parking, and state taxes are billed as per actuals unless marked 'included' on the vehicle card.",
  "In case of flight delays for airport transfers, please contact support to reschedule at no additional cost.",
  "FiveStarTravel.in acts as an intermediary and is not liable for driver behaviour or vehicle condition beyond agreed standards.",
  "Booking confirmation is subject to vehicle availability at the time of confirmation.",
];

export function TransferReview({
  tripType,
  transferCategory,
  from,
  to,
  pickupDate,
  pickupTime,
  returnDate,
  returnTime,
  passengers,
  bags,
  vehicle,
  passengerData,
  onBack,
  onConfirm,
}: ReviewProps) {
  const [agreed, setAgreed] = useState(false);

  const base = vehicle.price;
  const toll = vehicle.toll ? 0 : Math.round(base * 0.04);
  const driverAllowance = Math.round(base * 0.03);
  const gst = Math.round((base + toll + driverAllowance) * 0.05);
  const total = base + toll + driverAllowance + gst;
  const remaining = WALLET_BALANCE - total;
  const sufficient = remaining >= 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-ocid="transfer.review_back.button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-[#0B5ED7] hover:text-orange-500 font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Details
        </button>
        <div className="h-4 w-px bg-gray-300" />
        <h2 className="text-xl font-extrabold text-gray-900">
          Review Your Booking
        </h2>
      </div>

      {/* Trip Details card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B1629] to-[#0B3E8A] px-5 py-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-400" />
          <h3 className="font-bold text-white text-sm tracking-wide">
            TRIP DETAILS
          </h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm">
            <Detail label="Trip Type" value={tripType} />
            <Detail label="Transfer Category" value={transferCategory} />
            <Detail label="From" value={from} />
            <Detail label="To" value={to} />
            <Detail label="Pickup Date" value={pickupDate} />
            <Detail label="Pickup Time" value={pickupTime} />
            {returnDate && <Detail label="Return Date" value={returnDate} />}
            {returnTime && <Detail label="Return Time" value={returnTime} />}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <Detail label="Vehicle" value={vehicle.name} />
            <Detail label="Type" value={vehicle.type} />
            <Detail label="Plate" value={vehicle.plate} />
            <Detail label="Supplier" value={vehicle.supplier} />
            <Detail label="Capacity" value={`${vehicle.capacity} seats`} />
            <Detail label="Bags" value={`${vehicle.bags} bags`} />
            <Detail label="Passengers" value={`${passengers}`} />
            <Detail label="Your Bags" value={`${bags}`} />
          </div>
        </div>
      </div>

      {/* Passenger Info card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B1629] to-[#0B3E8A] px-5 py-3 flex items-center gap-2">
          <User className="w-4 h-4 text-orange-400" />
          <h3 className="font-bold text-white text-sm tracking-wide">
            PASSENGER INFORMATION
          </h3>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm">
            <Detail
              label="Name"
              value={`${passengerData.title} ${passengerData.name}`}
            />
            <Detail label="Mobile" value={`+91 ${passengerData.phone}`} />
            <Detail label="Email" value={passengerData.email || "—"} />
            <Detail
              label="Alt. Contact"
              value={passengerData.altPhone || "—"}
            />
            {passengerData.gstEnabled && (
              <>
                <Detail
                  label="GST Number"
                  value={passengerData.gstNumber || "—"}
                />
                <Detail
                  label="Company"
                  value={passengerData.gstCompany || "—"}
                />
              </>
            )}
          </div>
          {passengerData.notes && (
            <div className="mt-3 p-3 bg-[#0B5ED7]/5 border border-[#0B5ED7]/20 rounded-xl text-sm">
              <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">
                Pickup Notes:{" "}
              </span>
              <span className="text-gray-700">{passengerData.notes}</span>
            </div>
          )}
          {transferCategory === "Airport Transfer" && (
            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <Detail
                label="Airport"
                value={passengerData.pickupConfirm || "—"}
              />
              <Detail label="Terminal" value={passengerData.terminal || "—"} />
              <Detail
                label="Flight No."
                value={passengerData.flightNumber || "—"}
              />
            </div>
          )}
          {transferCategory === "Hotel Transfer" && (
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Detail
                label="Hotel Name"
                value={passengerData.hotelName || "—"}
              />
              <Detail
                label="Hotel Address"
                value={passengerData.hotelAddress || "—"}
              />
            </div>
          )}
          {transferCategory === "City Transfer" && (
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <Detail
                label="City/Locality"
                value={passengerData.cityLocality || "—"}
              />
              <Detail label="Landmark" value={passengerData.landmark || "—"} />
            </div>
          )}
        </div>
      </div>

      {/* Price Breakup card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B1629] to-[#0B3E8A] px-5 py-3 flex items-center gap-2">
          <Car className="w-4 h-4 text-orange-400" />
          <h3 className="font-bold text-white text-sm tracking-wide">
            PRICE BREAKUP
          </h3>
        </div>
        <div className="p-5 space-y-2 text-sm">
          <PriceLine label="Base Fare" amount={base} />
          {toll > 0 && <PriceLine label="Toll & Parking" amount={toll} />}
          <PriceLine label="Driver Allowance" amount={driverAllowance} />
          <PriceLine label="GST (5%)" amount={gst} />
          <div className="flex justify-between font-extrabold text-base pt-3 mt-1 border-t-2 border-gray-200">
            <span className="text-gray-900">Total Payable</span>
            <span className="text-orange-500">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Wallet panel */}
      <div className="rounded-2xl shadow-md overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-[#0B1629] to-[#0B3E8A] px-5 py-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-orange-400" />
          <h3 className="font-bold text-white text-sm tracking-wide">
            WALLET PAYMENT
          </h3>
        </div>
        <div className={`p-5 ${sufficient ? "bg-green-50" : "bg-red-50"}`}>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Current Wallet Balance</span>
              <span className="font-semibold text-gray-900">
                ₹{WALLET_BALANCE.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between font-bold text-[#0B5ED7]">
              <span>Amount to be Deducted</span>
              <span>− ₹{total.toLocaleString()}</span>
            </div>
            <div
              className={`flex justify-between font-extrabold text-base pt-2 mt-1 border-t ${
                sufficient
                  ? "border-green-200 text-green-800"
                  : "border-red-200 text-red-700"
              }`}
            >
              <span>Balance After Booking</span>
              <span>₹{remaining.toLocaleString()}</span>
            </div>
          </div>
          {sufficient ? (
            <div className="mt-3 flex items-center gap-2 text-green-700 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              Sufficient wallet balance
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-red-600 text-sm font-semibold">
              <AlertCircle className="w-4 h-4" />
              Insufficient balance. Please top up your wallet.
            </div>
          )}
        </div>
      </div>

      {/* Terms */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-[#0B1629] to-[#0B3E8A] px-5 py-3 flex items-center gap-2">
          <Shield className="w-4 h-4 text-orange-400" />
          <h3 className="font-bold text-white text-sm tracking-wide">
            TERMS & CONDITIONS
          </h3>
        </div>
        <div className="p-5">
          <div className="h-36 overflow-y-auto bg-gray-50 rounded-xl p-4 text-xs text-gray-600 space-y-2.5 border border-gray-200">
            {TERMS.map((t) => (
              <p key={t.slice(0, 20)} className="leading-relaxed flex gap-2">
                <span className="text-orange-500 font-bold mt-0.5">•</span>
                {t}
              </p>
            ))}
          </div>
          <label
            data-ocid="transfer.terms.checkbox"
            className="flex items-start gap-3 mt-4 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-orange-500 rounded accent-orange-500"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              I have read and agree to the{" "}
              <span className="text-[#0B5ED7] font-semibold">
                Terms and Conditions
              </span>{" "}
              of this booking
            </span>
          </label>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        data-ocid="transfer.confirm.primary_button"
        onClick={onConfirm}
        disabled={!agreed || !sufficient}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:shadow-none text-white py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_28px_rgba(249,115,22,0.6)] disabled:cursor-not-allowed"
      >
        Confirm & Pay ₹{total.toLocaleString()} from Wallet
      </button>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-400 uppercase tracking-wide font-semibold mb-0.5">
        {label}
      </div>
      <div className="font-semibold text-gray-900">{value}</div>
    </div>
  );
}

function PriceLine({
  label,
  amount,
}: { label: string; amount: number; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium text-gray-800">
        ₹{amount.toLocaleString()}
      </span>
    </div>
  );
}
