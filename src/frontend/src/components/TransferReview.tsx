import {
  AlertCircle,
  Car,
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  MapPin,
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
      <div className="flex items-center gap-3">
        <button
          type="button"
          data-ocid="transfer.review_back.button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Details
        </button>
        <h2 className="text-xl font-bold text-gray-900">Review Your Booking</h2>
      </div>

      {/* Trip Details */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-600" />
          Trip Details
        </h3>
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

      {/* Passenger Info */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          Passenger Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm">
          <Detail
            label="Name"
            value={`${passengerData.title} ${passengerData.name}`}
          />
          <Detail label="Mobile" value={`+91 ${passengerData.phone}`} />
          <Detail label="Email" value={passengerData.email || "—"} />
          <Detail label="Alt. Contact" value={passengerData.altPhone || "—"} />
          {passengerData.gstEnabled && (
            <>
              <Detail
                label="GST Number"
                value={passengerData.gstNumber || "—"}
              />
              <Detail label="Company" value={passengerData.gstCompany || "—"} />
            </>
          )}
        </div>
        {passengerData.notes && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
            <span className="text-gray-500 text-xs font-medium">
              Pickup Notes:{" "}
            </span>
            {passengerData.notes}
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
            <Detail label="Hotel Name" value={passengerData.hotelName || "—"} />
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

      {/* Price Breakup */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Car className="w-4 h-4 text-blue-600" />
          Price Breakup
        </h3>
        <div className="space-y-2 text-sm">
          <PriceLine label="Base Fare" amount={base} />
          {toll > 0 && <PriceLine label="Toll & Parking" amount={toll} />}
          <PriceLine label="Driver Allowance" amount={driverAllowance} />
          <PriceLine label="GST (5%)" amount={gst} />
          <div className="flex justify-between font-bold text-base pt-2 mt-2 border-t border-gray-200">
            <span>Total Payable</span>
            <span className="text-blue-700">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Wallet */}
      <div
        className={`rounded-2xl border p-5 ${sufficient ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
      >
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          Wallet Payment
        </h3>
        <div className="space-y-2 text-sm">
          <PriceLine label="Current Wallet Balance" amount={WALLET_BALANCE} />
          <PriceLine label="Amount to be Deducted" amount={total} highlight />
          <div
            className={`flex justify-between font-semibold pt-2 mt-1 border-t ${sufficient ? "border-green-200 text-green-800" : "border-red-200 text-red-700"}`}
          >
            <span>Balance After Booking</span>
            <span>₹{remaining.toLocaleString()}</span>
          </div>
        </div>
        {sufficient ? (
          <div className="mt-3 flex items-center gap-2 text-green-700 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            Sufficient wallet balance
          </div>
        ) : (
          <div className="mt-3 flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            Insufficient balance. Please top up your wallet.
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-800 mb-3">Terms & Conditions</h3>
        <div className="h-36 overflow-y-auto bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-2">
          {TERMS.map((t) => (
            <p key={t.slice(0, 20)} className="leading-relaxed">
              • {t}
            </p>
          ))}
        </div>
        <label className="flex items-start gap-3 mt-4 cursor-pointer">
          <input
            type="checkbox"
            data-ocid="transfer.terms.checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 text-blue-600 rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to the Terms and Conditions of this booking
          </span>
        </label>
      </div>

      <button
        type="button"
        data-ocid="transfer.confirm.primary_button"
        onClick={onConfirm}
        disabled={!agreed || !sufficient}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white py-4 rounded-xl font-semibold text-base transition-colors"
      >
        Confirm & Pay ₹{total.toLocaleString()} from Wallet
      </button>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-0.5">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}

function PriceLine({
  label,
  amount,
  highlight,
}: { label: string; amount: number; highlight?: boolean }) {
  return (
    <div className={`flex justify-between ${highlight ? "font-medium" : ""}`}>
      <span className="text-gray-600">{label}</span>
      <span>₹{amount.toLocaleString()}</span>
    </div>
  );
}
