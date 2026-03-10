import { Package, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import {
  AdminLoginPage,
  AgentLoginPage,
  AgentRegisterPage,
  SupplierLoginPage,
} from "./components/AuthPages";
import { CruiseBooking } from "./components/CruiseBooking";
import type { DashboardPage } from "./components/DashboardLayout";
import { ComingSoonPage, DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardPage";
import { FlightSearch } from "./components/FlightSearch";
import { HotelSearch } from "./components/HotelSearch";
import { MyBookings } from "./components/MyBookings";
import {
  AboutPage,
  ContactPage,
  Footer,
  Header,
  HomePage,
  type Page,
  TopBar,
} from "./components/PublicPages";
import { RailwayBooking } from "./components/RailwayBooking";
import { RaynaTourModule } from "./components/RaynaTourModule";
import { TransferBooking } from "./components/TransferBooking";
import VisaServices from "./components/VisaServices";

// ── App Root ──────────────────────────────────────────────────────────────────────────────
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

  // ── Public: Home ──────────────────────────────────────────────────────────────────────────────────
  if (page === "home") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <HomePage onNavigate={navigate} />
        </main>
        <Footer onNavigate={navigate} />
      </div>
    );
  }

  // ── Public: About ──────────────────────────────────────────────────────────────────────────────────
  if (page === "about") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AboutPage onNavigate={navigate} />
        </main>
      </div>
    );
  }

  // ── Public: Contact ──────────────────────────────────────────────────────────────────────────────────
  if (page === "contact") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <ContactPage onNavigate={navigate} />
        </main>
      </div>
    );
  }

  // ── Public: Login ──────────────────────────────────────────────────────────────────────────────────
  if (page === "login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AgentLoginPage onNavigate={navigate} />
        </main>
        <Footer onNavigate={navigate} />
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
        <Footer onNavigate={navigate} />
      </div>
    );
  }

  // ── Agent Dashboard ──────────────────────────────────────────────────────────────────────────────────────

  if (page === "supplier-login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <SupplierLoginPage onNavigate={navigate} />
        </main>
        <Footer onNavigate={navigate} />
      </div>
    );
  }

  if (page === "admin-login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AdminLoginPage onNavigate={navigate} />
        </main>
        <Footer onNavigate={navigate} />
      </div>
    );
  }
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
      {dashNav === "tours" && <RaynaTourModule />}
      {dashNav === "transfers" && <TransferBooking />}
      {dashNav === "visa" && <VisaServices />}
      {dashNav === "cruises" && <CruiseBooking />}
      {dashNav === "railway" && <RailwayBooking />}
      {dashNav === "packages" && (
        <ComingSoonPage
          title="Package Builder"
          icon={Package}
          onNavigateFlights={() => handleDashNav("flights")}
        />
      )}
      {dashNav === "bookings" && <MyBookings />}
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
