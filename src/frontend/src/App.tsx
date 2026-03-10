import { User } from "lucide-react";
import { useState } from "react";
import { AdminDashboard } from "./components/AdminDashboard";
import {
  AdminLoginPage,
  AgentLoginPage,
  AgentRegisterPage,
  DMCLoginPage,
  SupplierLoginPage,
} from "./components/AuthPages";
import { CrmModule } from "./components/CrmModule";
import { CruiseBooking } from "./components/CruiseBooking";
import { DMCDashboard } from "./components/DMCDashboard";
import type { DashboardPage } from "./components/DashboardLayout";
import { ComingSoonPage, DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardPage";
import { FlightSearch } from "./components/FlightSearch";
import { GDSModule } from "./components/GDSModule";
import { HotelSearch } from "./components/HotelSearch";
import { MyBookings } from "./components/MyBookings";
import { NotificationsModule } from "./components/NotificationsModule";
import { PackageBuilder } from "./components/PackageBuilder";
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
import { ReportsModule } from "./components/ReportsModule";
import { TransferBooking } from "./components/TransferBooking";
import VisaServices from "./components/VisaServices";
import { WalletModule } from "./components/WalletModule";
import { WhiteLabelSettings } from "./components/WhiteLabelSettings";

// ── App Root ───────────────────────────────────────────────────────────────────────
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
      p === "crm" ||
      p === "support" ||
      p === "gds"
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

  // ── Public: Home
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

  // ── Public: About
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

  // ── Public: Contact
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

  // ── Login pages
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

  if (page === "dmc-login") {
    return <DMCLoginPage onNavigate={navigate} />;
  }

  if (page === "dmc-dashboard") {
    return <DMCDashboard onNavigate={navigate as (page: string) => void} />;
  }

  if (page === "supplier-dashboard") {
    return (
      <div className="min-h-screen" style={{ background: "#0F172A" }}>
        <div className="p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Supplier Dashboard</h2>
          <p className="text-slate-400 mb-6">
            Full supplier portal — SD1 complete
          </p>
          <button
            type="button"
            onClick={() => navigate("home")}
            className="px-6 py-2 rounded-xl bg-orange-500 text-white"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (page === "admin-dashboard") {
    return <AdminDashboard onNavigate={navigate as (page: string) => void} />;
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
    crm: "CRM & Leads",
    support: "Support",
    gds: "GDS Integrations",
    whitelabel: "White Label Settings",
    notifications: "Notifications",
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
      {dashNav === "gds" && <GDSModule />}
      {dashNav === "packages" && <PackageBuilder />}
      {dashNav === "bookings" && <MyBookings />}
      {dashNav === "wallet" && <WalletModule />}
      {dashNav === "reports" && <ReportsModule />}
      {dashNav === "crm" && <CrmModule />}
      {dashNav === "whitelabel" && <WhiteLabelSettings />}
      {dashNav === "notifications" && <NotificationsModule />}
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
