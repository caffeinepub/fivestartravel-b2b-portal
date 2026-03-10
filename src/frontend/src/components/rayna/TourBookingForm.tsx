import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, Phone, User } from "lucide-react";
import { useState } from "react";
import { INR } from "./tourData";
import type { CartItem } from "./tourData";

export interface BookingFormData {
  name: string;
  mobile: string;
  email: string;
  notes: string;
  hotelName: string;
  area: string;
  roomNumber: string;
}

interface Props {
  cart: CartItem[];
  onBack: () => void;
  onReview: (formData: BookingFormData) => void;
}

export function TourBookingForm({ cart, onBack, onReview }: Props) {
  const [form, setForm] = useState<BookingFormData>({
    name: "",
    mobile: "",
    email: "",
    notes: "",
    hotelName: "",
    area: "",
    roomNumber: "",
  });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const needsTransfer = cart.some(
    (i) => i.transferOption !== "Without Transfers",
  );

  const subtotal = cart.reduce((s, i) => s + i.totalPrice, 0);
  const gst = subtotal * 0.05;
  const total = subtotal + gst;

  const validate = () => {
    const e: Partial<BookingFormData> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(form.mobile))
      e.mobile = "Enter a valid 10-digit Indian mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (needsTransfer && !form.hotelName.trim())
      e.hotelName = "Hotel name is required for transfer";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    onReview(form);
  };

  const set = (k: keyof BookingFormData, v: string) => {
    setForm((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 mb-6 transition-colors"
        data-ocid="tour.booking.button"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Results
      </button>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Complete Your Booking
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Tour Summary */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-3">Selected Tours</h3>
            {cart.map((item, i) => (
              <div
                key={`${item.tourId}-${item.optionName}`}
                className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0"
                data-ocid={`tour.booking.item.${i + 1}`}
              >
                <div>
                  <div className="font-medium text-sm text-gray-800">
                    {item.tourName}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {item.optionName} · {item.transferOption}
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.date} · {item.adults}A {item.children}C
                  </div>
                </div>
                <div className="text-sm font-bold text-orange-600">
                  {INR(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>

          {/* Traveller Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" /> Lead Traveller
              Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="booking-name"
                  className="text-xs font-semibold text-gray-600 mb-1.5 block"
                >
                  Full Name *
                </Label>
                <Input
                  id="booking-name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Enter full name"
                  className="h-11"
                  data-ocid="tour.booking.input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-red-500 mt-1"
                    data-ocid="tour.booking.error_state"
                  >
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <Label
                  htmlFor="booking-mobile"
                  className="text-xs font-semibold text-gray-600 mb-1.5 block"
                >
                  Mobile Number *
                </Label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="booking-mobile"
                    value={form.mobile}
                    onChange={(e) => set("mobile", e.target.value)}
                    placeholder="10-digit mobile"
                    className="h-11 pl-9"
                    data-ocid="tour.booking.input"
                  />
                </div>
                {errors.mobile && (
                  <p
                    className="text-xs text-red-500 mt-1"
                    data-ocid="tour.booking.error_state"
                  >
                    {errors.mobile}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label
                  htmlFor="booking-email"
                  className="text-xs font-semibold text-gray-600 mb-1.5 block"
                >
                  Email Address *
                </Label>
                <Input
                  id="booking-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="Enter email"
                  className="h-11"
                  data-ocid="tour.booking.input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-red-500 mt-1"
                    data-ocid="tour.booking.error_state"
                  >
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="md:col-span-2">
                <Label
                  htmlFor="booking-notes"
                  className="text-xs font-semibold text-gray-600 mb-1.5 block"
                >
                  Special Notes / Reference (Optional)
                </Label>
                <Textarea
                  id="booking-notes"
                  value={form.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  placeholder="Any special requests or booking reference"
                  rows={2}
                  data-ocid="tour.booking.textarea"
                />
              </div>
            </div>

            {needsTransfer && (
              <div className="mt-5 pt-5 border-t border-gray-100">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-orange-500" /> Pickup Location
                  (Transfer Required)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="booking-hotel"
                      className="text-xs font-semibold text-gray-600 mb-1.5 block"
                    >
                      Hotel Name *
                    </Label>
                    <Input
                      id="booking-hotel"
                      value={form.hotelName}
                      onChange={(e) => set("hotelName", e.target.value)}
                      placeholder="Hotel name"
                      className="h-11"
                      data-ocid="tour.booking.input"
                    />
                    {errors.hotelName && (
                      <p
                        className="text-xs text-red-500 mt-1"
                        data-ocid="tour.booking.error_state"
                      >
                        {errors.hotelName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label
                      htmlFor="booking-area"
                      className="text-xs font-semibold text-gray-600 mb-1.5 block"
                    >
                      Area / Landmark
                    </Label>
                    <Input
                      id="booking-area"
                      value={form.area}
                      onChange={(e) => set("area", e.target.value)}
                      placeholder="Area or landmark"
                      className="h-11"
                      data-ocid="tour.booking.input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="booking-room"
                      className="text-xs font-semibold text-gray-600 mb-1.5 block"
                    >
                      Room Number (Optional)
                    </Label>
                    <Input
                      id="booking-room"
                      value={form.roomNumber}
                      onChange={(e) => set("roomNumber", e.target.value)}
                      placeholder="Room number"
                      className="h-11"
                      data-ocid="tour.booking.input"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Price Summary Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm sticky top-4">
            <h3 className="font-bold text-gray-800 mb-3">Price Summary</h3>
            {cart.map((item) => (
              <div
                key={`${item.tourId}-${item.optionName}-summary`}
                className="text-xs text-gray-600 flex justify-between py-1"
              >
                <span>{item.tourName.substring(0, 24)}...</span>
                <span className="font-medium">{INR(item.totalPrice)}</span>
              </div>
            ))}
            <div className="border-t border-gray-100 mt-2 pt-2 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{INR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">GST (5%)</span>
                <span className="font-medium">{INR(gst)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-100 pt-2 mt-2">
                <span>Total</span>
                <span className="text-orange-600">{INR(total)}</span>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full mt-4 h-12 font-bold text-white rounded-xl"
              style={{
                background: "linear-gradient(135deg, #F97316, #ea580c)",
              }}
              data-ocid="tour.booking.submit_button"
            >
              Review Booking →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
