import { useState } from "react";
import type { BookingFormData } from "./rayna/TourBookingForm";
import { TourBookingForm } from "./rayna/TourBookingForm";
import { TourResultsScreen } from "./rayna/TourResultsScreen";
import { TourConfirmation, TourReviewConfirm } from "./rayna/TourReviewConfirm";
import { TourSearchScreen } from "./rayna/TourSearchScreen";
import type { CartItem } from "./rayna/tourData";

type Screen = "search" | "results" | "booking" | "review" | "confirmation";

interface SearchParams {
  destination: string;
  date: Date;
  adults: number;
  children: number;
  nights: number;
}

export function RaynaTourModule() {
  const [screen, setScreen] = useState<Screen>("search");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    destination: "UAE / Dubai",
    date: new Date(),
    adults: 2,
    children: 0,
    nights: 3,
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [emailFlyers, setEmailFlyers] = useState<number[]>([]);
  const [walletBalance, setWalletBalance] = useState(45250);
  const [formData, setFormData] = useState<BookingFormData | null>(null);
  const [bookingRef, setBookingRef] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params);
    setScreen("results");
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const handleToggleFlyer = (id: number) => {
    setEmailFlyers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleProceedToBook = () => {
    if (cart.length > 0) setScreen("booking");
  };

  const handleReview = (fd: BookingFormData) => {
    setFormData(fd);
    setScreen("review");
  };

  const handleConfirm = (ref: string, newBalance: number) => {
    const subtotal = cart.reduce((s, i) => s + i.totalPrice, 0);
    const paid = subtotal * 1.05;
    setBookingRef(ref);
    setAmountPaid(paid);
    setWalletBalance(newBalance);
    setCart([]);
    setScreen("confirmation");
  };

  const handleBackToTours = () => {
    setScreen("search");
    setFormData(null);
  };

  if (screen === "search") {
    return <TourSearchScreen onSearch={handleSearch} />;
  }

  if (screen === "results") {
    return (
      <TourResultsScreen
        searchParams={searchParams}
        onModify={() => setScreen("search")}
        cart={cart}
        emailFlyers={emailFlyers}
        onToggleFlyer={handleToggleFlyer}
        onAddToCart={handleAddToCart}
        onProceedToBook={handleProceedToBook}
        walletBalance={walletBalance}
      />
    );
  }

  if (screen === "booking") {
    return (
      <TourBookingForm
        cart={cart}
        onBack={() => setScreen("results")}
        onReview={handleReview}
      />
    );
  }

  if (screen === "review" && formData) {
    return (
      <TourReviewConfirm
        cart={cart}
        formData={formData}
        walletBalance={walletBalance}
        onBack={() => setScreen("booking")}
        onConfirm={handleConfirm}
      />
    );
  }

  if (screen === "confirmation" && formData) {
    return (
      <TourConfirmation
        cart={[]}
        formData={formData}
        bookingRef={bookingRef}
        amountPaid={amountPaid}
        newBalance={walletBalance}
        onBackToTours={handleBackToTours}
      />
    );
  }

  return <TourSearchScreen onSearch={handleSearch} />;
}
