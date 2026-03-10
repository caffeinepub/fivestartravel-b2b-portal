import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  CheckCircle,
  Download,
  MapPin,
  RotateCcw,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import type { BookingFormData } from "./TourBookingForm";
import { INR } from "./tourData";
import type { CartItem } from "./tourData";

interface ReviewProps {
  cart: CartItem[];
  formData: BookingFormData;
  walletBalance: number;
  onBack: () => void;
  onConfirm: (ref: string, newBalance: number) => void;
}

const TERMS = `BOOKING TERMS & CONDITIONS — FiveStar Travel (FiveStarTravel.in)

1. GENERAL CONDITIONS
All bookings are subject to availability and confirmation. FiveStar Travel acts as an intermediary between the traveller and the tour operator. Once confirmed, the booking is governed by the individual operator's terms and conditions.

2. PAYMENT
Payment is deducted from your FiveStar Travel wallet at the time of booking confirmation. All prices are inclusive of applicable taxes (GST 5%) as displayed. The wallet balance must be sufficient at the time of booking.

3. CANCELLATION POLICY
Cancellation charges depend on the specific tour and are shown on each tour card. Free cancellation is available only within the specified window. Non-refundable tours cannot be cancelled or amended after booking confirmation. For refundable tours, amounts will be credited back to your wallet within 7 working days.

4. MODIFICATIONS
Changes to tour dates, participant counts, or options must be requested 24 hours in advance (unless otherwise specified). Modification fees may apply. Some tours do not permit changes after confirmation.

5. VOUCHERS
Booking vouchers are issued electronically to the registered email. Mobile vouchers must be presented at the entry point. Physical printouts may be required for select operators — check your voucher for details.

6. LIABILITY
FiveStar Travel is not liable for changes or cancellations made by tour operators due to weather, safety concerns, force majeure, or operational reasons. In such cases, we will facilitate full refunds where applicable.

7. CHILD POLICY
Children aged 2 and under typically enter free but must be declared. Children aged 3 and above require paid tickets. Age requirements vary by attraction — refer to individual tour details.

8. HEALTH & SAFETY
Participants must comply with all health, safety, and conduct guidelines set by the operator. FiveStar Travel and its partners reserve the right to refuse entry or participation if safety conditions are not met.

9. PRIVACY
Personal data collected during booking is used solely for booking fulfilment and customer support. Data is not shared with third parties except as required to complete the booking.

10. GOVERNING LAW
These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Chandigarh, India.

By confirming this booking, you acknowledge that you have read, understood, and agree to these terms and conditions.`;

export function TourReviewConfirm({
  cart,
  formData,
  walletBalance,
  onBack,
  onConfirm,
}: ReviewProps) {
  const [agreed, setAgreed] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.totalPrice, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;
  const balanceAfter = walletBalance - total;

  const handleConfirm = () => {
    const ref = `FST-TOUR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
    onConfirm(ref, balanceAfter);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-6 transition-colors"
        data-ocid="tour.review.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Booking Form
      </button>
      <h1
        className="text-2xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
      >
        Review & Confirm
      </h1>

      <div className="space-y-5">
        {/* Tour Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">
            Tour Details
          </h3>
          {cart.map((item, i) => (
            <div
              key={`${item.tourId}-${item.optionName}`}
              className="py-3 border-b border-gray-100 last:border-0"
              data-ocid={
                `tour.review.item.${i + 1}` as `tour.review.item.${number}`
              }
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold text-gray-800">
                    {item.tourName}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {item.optionName}
                  </div>
                  <div className="text-sm text-gray-500">
                    Transfer: {item.transferOption} · Date: {item.date}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.adults} Adult(s), {item.children} Child(ren),{" "}
                    {item.infants} Infant(s)
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">
                    {INR(item.totalPrice)}
                  </div>
                  {item.rPoints > 0 && (
                    <div className="text-xs text-yellow-600 mt-1">
                      🏅 Earn {item.rPoints} R Points
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Traveller Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">
            Traveller Details
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-gray-500">Name:</span>{" "}
              <span className="font-medium">{formData.name}</span>
            </div>
            <div>
              <span className="text-gray-500">Mobile:</span>{" "}
              <span className="font-medium">{formData.mobile}</span>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500">Email:</span>{" "}
              <span className="font-medium">{formData.email}</span>
            </div>
            {formData.hotelName && (
              <div className="col-span-2 flex items-start gap-1">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <span className="text-gray-600">
                  {formData.hotelName}, {formData.area}{" "}
                  {formData.roomNumber && `Room ${formData.roomNumber}`}
                </span>
              </div>
            )}
            {formData.notes && (
              <div className="col-span-2">
                <span className="text-gray-500">Notes:</span>{" "}
                <span className="font-medium">{formData.notes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">
            Price Breakdown
          </h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b">
                <th className="text-left pb-2">Tour</th>
                <th className="text-right pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr
                  key={`${item.tourId}-${item.optionName}-price`}
                  className="border-b border-gray-100"
                >
                  <td className="py-2">
                    {item.tourName} ({item.optionName})
                  </td>
                  <td className="py-2 text-right font-medium">
                    {INR(item.totalPrice)}
                  </td>
                </tr>
              ))}
              <tr className="text-gray-600">
                <td className="py-2">GST (5%)</td>
                <td className="py-2 text-right">{INR(gst)}</td>
              </tr>
              <tr className="font-bold text-base">
                <td className="pt-2 border-t border-gray-200">Total</td>
                <td className="pt-2 border-t border-gray-200 text-right text-orange-600">
                  {INR(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">Terms & Conditions</h3>
          <ScrollArea className="h-48 border border-gray-100 rounded-lg p-3 mb-4">
            <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
              {TERMS}
            </pre>
          </ScrollArea>
          <label
            className="flex items-center gap-3 cursor-pointer"
            data-ocid="tour.review.checkbox"
          >
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-700">
              I agree to the Terms & Conditions and Cancellation Policy
            </span>
          </label>
        </div>

        {/* Wallet Section */}
        <div className="rounded-xl border-2 border-orange-200 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-3 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-orange-400" />
            <span className="text-white font-semibold">Wallet Payment</span>
          </div>
          <div className="bg-white p-5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">
                  Current Balance
                </div>
                <div className="font-bold text-gray-800">
                  {INR(walletBalance)}
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">
                  Amount to Deduct
                </div>
                <div className="font-bold text-red-600">- {INR(total)}</div>
              </div>
              <div
                className={`rounded-lg p-3 ${balanceAfter < 0 ? "bg-red-50" : "bg-green-50"}`}
              >
                <div className="text-xs text-gray-500 mb-1">Balance After</div>
                <div
                  className={`font-bold ${balanceAfter < 0 ? "text-red-600" : "text-green-600"}`}
                >
                  {INR(balanceAfter)}
                </div>
              </div>
            </div>
            {balanceAfter < 0 && (
              <p
                className="text-red-600 text-sm mt-3 text-center"
                data-ocid="tour.review.error_state"
              >
                ⚠️ Insufficient wallet balance. Please add funds before
                proceeding.
              </p>
            )}
          </div>
        </div>

        <Button
          onClick={handleConfirm}
          disabled={!agreed || balanceAfter < 0}
          className="w-full h-14 text-lg font-bold text-white rounded-xl disabled:opacity-40"
          style={{
            background:
              agreed && balanceAfter >= 0
                ? "linear-gradient(135deg, #F97316, #ea580c)"
                : undefined,
          }}
          data-ocid="tour.review.confirm_button"
        >
          Confirm & Pay from Wallet
        </Button>
      </div>
    </div>
  );
}

// ─── Confirmation Screen ───────────────────────────────────────────────────────
interface ConfirmProps {
  cart: CartItem[];
  formData: BookingFormData;
  bookingRef: string;
  amountPaid: number;
  newBalance: number;
  onBackToTours: () => void;
}

export function TourConfirmation({
  cart,
  formData,
  bookingRef,
  amountPaid,
  newBalance,
  onBackToTours,
}: ConfirmProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        <h1
          className="text-3xl font-bold text-gray-900 mb-2"
          style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
        >
          Booking Confirmed!
        </h1>
        <p className="text-gray-500">
          Your tour booking has been confirmed successfully.
        </p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-4 mb-5">
        <div className="text-sm opacity-80 mb-1">Booking Reference</div>
        <div className="text-2xl font-bold tracking-wide">{bookingRef}</div>
      </div>

      <div
        className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-left mb-5"
        data-ocid="tour.confirm.card"
      >
        <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">
          Booking Details
        </h3>
        {cart.map((item, i) => (
          <div
            key={`${item.tourId}-${item.optionName}-confirm`}
            className="py-2 border-b border-gray-100 last:border-0 text-sm"
            data-ocid={
              `tour.confirm.item.${i + 1}` as `tour.confirm.item.${number}`
            }
          >
            <div className="font-semibold text-gray-800">{item.tourName}</div>
            <div className="text-gray-500">
              {item.optionName} · {item.transferOption} · {item.date}
            </div>
            <div className="text-gray-500">
              {item.adults}A {item.children}C · {INR(item.totalPrice)}
            </div>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t border-gray-100 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Traveller:</span>
            <span className="font-medium">{formData.name}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-gray-600">Mobile:</span>
            <span className="font-medium">{formData.mobile}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-gray-600">Email:</span>
            <span className="font-medium">{formData.email}</span>
          </div>
        </div>
      </div>

      {/* Payment Receipt */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-left mb-5">
        <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b">
          Payment Receipt
        </h3>
        <div className="flex justify-between text-sm py-1">
          <span className="text-gray-600">Amount Paid</span>
          <span className="font-bold text-orange-600">{INR(amountPaid)}</span>
        </div>
        <div className="flex justify-between text-sm py-1">
          <span className="text-gray-600">Payment Method</span>
          <span className="font-medium">FiveStar Wallet</span>
        </div>
        <div className="flex justify-between text-sm py-1">
          <span className="text-gray-600">Remaining Balance</span>
          <span className="font-medium text-green-600">{INR(newBalance)}</span>
        </div>
        <div className="flex justify-between text-sm py-1">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-medium text-gray-500">
            TXN-{Date.now().toString().slice(-8)}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 h-12"
          data-ocid="tour.confirm.secondary_button"
        >
          <Download className="w-4 h-4 mr-2" /> Download Voucher
        </Button>
        <Button
          onClick={onBackToTours}
          className="flex-1 h-12 text-white font-bold"
          style={{ background: "linear-gradient(135deg, #F97316, #ea580c)" }}
          data-ocid="tour.confirm.primary_button"
        >
          <RotateCcw className="w-4 h-4 mr-2" /> Back to Tours
        </Button>
      </div>
    </div>
  );
}
