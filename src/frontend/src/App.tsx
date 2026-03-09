import { FileText, Package, Ship, Train, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import { AgentLoginPage, AgentRegisterPage } from "./components/AuthPages";
import type { DashboardPage } from "./components/DashboardLayout";
import { ComingSoonPage, DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardPage";
import { FlightSearch } from "./components/FlightSearch";
import { HotelSearch } from "./components/HotelSearch";
import {
  Footer,
  Header,
  HomePage,
  type Page,
  TopBar,
} from "./components/PublicPages";
import { TourSearch } from "./components/TourSearch";
import { TransferBooking } from "./components/TransferBooking";

// ── App Root ──────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [dashNav, setDashNav] = useState<DashboardPage>("dashboard");

  function navigate(p: Page) {
    setPage(p);
    if (
      p === "flights" ||
      p === "hotels" ||
      p === "tours" ||
      p === "transfers" ||
      p === "visa" ||
      p === "cruises" ||
      p === "railway" ||
      p === "packages" ||
      p === "bookings" ||
      p === "wallet" ||
      p === "reports" ||
      p === "support"
    ) {
      setDashNav(p as DashboardPage);
    } else if (p === "dashboard") {
      setDashNav("dashboard");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDashNav(nav: DashboardPage) {
    setDashNav(nav);
    setPage(nav as Page);
  }

  function handleLogout() {
    navigate("home");
  }

  // ── Public pages ──────────────────────────────────────────────────────────────────
  if (page === "home") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <HomePage onNavigate={navigate} />
        </main>
        <Footer />
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AgentLoginPage onNavigate={navigate} />
        </main>
        <Footer />
      </div>
    );
  }

  if (page === "register") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AgentRegisterPage onNavigate={navigate} />
        </main>
        <Footer />
      </div>
    );
  }

  // ── Agent Dashboard ───────────────────────────────────────────────────────────────────
  const dashboardTitles: Record<DashboardPage, string> = {
    dashboard: "Agent Dashboard",
    flights: "Flight Booking",
    hotels: "Hotel Booking",
    tours: "Tour Packages",
    transfers: "Transfers & Cabs",
    visa: "Visa Services",
    cruises: "Cruise Booking",
    railway: "Railway Booking",
    packages: "Package Builder",
    bookings: "My Bookings",
    wallet: "Wallet",
    reports: "Reports",
    support: "Support",
  };

  return (
    <DashboardLayout
      activeNav={dashNav}
      onNavChange={handleDashNav}
      onLogout={handleLogout}
      title={dashboardTitles[dashNav]}
      subtitle="Welcome back, Rahul Sharma"
    >
      {dashNav === "dashboard" && <DashboardHome onNavChange={handleDashNav} />}
      {dashNav === "flights" && <FlightSearch />}
      {dashNav === "hotels" && <HotelSearch />}
      {dashNav === "tours" && <TourSearch />}
      {dashNav === "transfers" && <TransferBooking />}
      {dashNav === "visa" && (
        <ComingSoonPage
          title="Visa Services"
          icon={FileText}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "cruises" && (
        <ComingSoonPage
          title="Cruise Booking"
          icon={Ship}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "railway" && (
        <ComingSoonPage
          title="Railway Booking"
          icon={Train}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "packages" && (
        <ComingSoonPage
          title="Package Builder"
          icon={Package}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "bookings" && (
        <ComingSoonPage
          title="My Bookings"
          icon={FileText}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "wallet" && (
        <ComingSoonPage
          title="Wallet"
          icon={TrendingUp}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "reports" && (
        <ComingSoonPage
          title="Reports"
          icon={TrendingUp}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "support" && (
        <ComingSoonPage
          title="Support"
          icon={User}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
    </DashboardLayout>
  );
}
