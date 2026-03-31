import { useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import { AIItineraryGenerator } from "./components/AIItineraryGenerator";
import { AdminDashboard } from "./components/AdminDashboard";
import {
  AdminLoginPage,
  AgentLoginPage,
  AgentRegisterPage,
  DMCLoginPage,
  StaffLoginPage,
  SupplierLoginPage,
} from "./components/AuthPages";
import {
  AgentRegistrationPage,
  ApiIntegrationPage,
  ApiXmlPage,
  BlogPage,
  CareersPage,
  DistributorsPage,
  HelpCenterPage,
  PrivacyPage,
  SupplierPortalPage,
  SuppliersPublicPage,
  TermsPage,
  TestimonialsPage,
} from "./components/ContentPages";
import { CorporatePortal } from "./components/CorporatePortal";
import { CrmModule } from "./components/CrmModule";
import { CruiseBooking } from "./components/CruiseBooking";
import { DMCDashboard } from "./components/DMCDashboard";
import type { DashboardPage } from "./components/DashboardLayout";
import { DashboardLayout } from "./components/DashboardLayout";
import { DashboardHome } from "./components/DashboardPage";
import { FlightSearch } from "./components/FlightSearch";
import { GDSPNRAutomation } from "./components/GDSPNRAutomation";
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
import { RemindersCenter } from "./components/RemindersCenter";
import { ReportsModule } from "./components/ReportsModule";
import { SmartPNRModule } from "./components/SmartPNRModule";
import { SocialMediaModule } from "./components/SocialMediaModule";
import { StaffDashboard } from "./components/StaffDashboard";
import { SupplierDashboard } from "./components/SupplierDashboard";
import { SupplierMarketplace } from "./components/SupplierMarketplace";
import { SupportModule } from "./components/SupportModule";
import { TransferBooking } from "./components/TransferBooking";
import VisaServices from "./components/VisaServices";
import { WalletModule } from "./components/WalletModule";
import { WhatsAppBot } from "./components/WhatsAppBot";
import { WhiteLabelSettings } from "./components/WhiteLabelSettings";

// ── Auth State ────────────────────────────────────────────────────────────────
type AuthRole =
  | "agent"
  | "supplier"
  | "admin"
  | "dmc"
  | "staff"
  | "corporate"
  | null;

interface AuthState {
  role: AuthRole;
  name: string;
}

// Public pages (for reference)
const _PUBLIC_PAGES: Page[] = [
  "home",
  "about",
  "contact",
  "api-integration",
  "agent-registration",
  "supplier-portal",
  "careers",
  "blog",
  "help-center",
  "terms",
  "privacy",
  "distributors",
  "suppliers-page",
  "api-xml",
  "testimonials-page",
  "login",
  "register",
  "supplier-login",
  "admin-login",
  "staff-login",
  "dmc-login",
];

// ── Wrapper helper ────────────────────────────────────────────────────────────
function PublicPage({
  nav,
  children,
}: { nav: (p: Page) => void; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header onNavigate={nav} />
      <main className="flex-1">{children}</main>
    </div>
  );
}

// ── Login Required Gate ───────────────────────────────────────────────────────
function LoginRequiredPage({
  onNavigate,
  intendedPage,
}: {
  onNavigate: (p: Page) => void;
  intendedPage: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header onNavigate={onNavigate} />
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 px-4">
        <div className="max-w-md w-full text-center">
          {/* Lock icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-white/10 border-2 border-orange-400/60 flex items-center justify-center mb-6 shadow-xl">
            <svg
              aria-hidden="true"
              className="w-12 h-12 text-orange-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">Login Required</h1>
          <p className="text-blue-200 mb-8">
            Please log in to access{" "}
            <span className="text-orange-400 font-semibold">
              {intendedPage}
            </span>
            . This area is restricted to registered members only.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              data-ocid="login_gate.agent_login.button"
              type="button"
              onClick={() => onNavigate("login")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-lg transition-all hover:scale-105 border border-blue-400/30"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Agent Login
            </button>
            <button
              data-ocid="login_gate.supplier_login.button"
              type="button"
              onClick={() => onNavigate("supplier-login")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold shadow-lg transition-all hover:scale-105 border border-emerald-400/30"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Supplier Login
            </button>
            <button
              data-ocid="login_gate.dmc_login.button"
              type="button"
              onClick={() => onNavigate("dmc-login")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white font-semibold shadow-lg transition-all hover:scale-105 border border-purple-400/30"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                />
              </svg>
              DMC Login
            </button>
            <button
              data-ocid="login_gate.admin_login.button"
              type="button"
              onClick={() => onNavigate("admin-login")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-semibold shadow-lg transition-all hover:scale-105 border border-orange-400/30"
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Admin Login
            </button>
          </div>

          <p className="text-blue-300 text-sm">
            Not registered yet?{" "}
            <button
              data-ocid="login_gate.register.link"
              type="button"
              onClick={() => onNavigate("agent-registration")}
              className="text-orange-400 hover:text-orange-300 underline font-medium"
            >
              Register as an Agent
            </button>
          </p>

          <button
            data-ocid="login_gate.back_home.button"
            type="button"
            onClick={() => onNavigate("home")}
            className="mt-4 text-blue-300 hover:text-white text-sm underline"
          >
            ← Back to Home
          </button>
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ── App Root ───────────────────────────────────────────────────────────────────
function AppInner() {
  const [page, setPage] = useState<Page>("home");
  const [dashNav, setDashNav] = useState<DashboardPage>("dashboard");
  const [auth, setAuth] = useState<AuthState>({ role: null, name: "" });

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
    setAuth({ role: null, name: "" });
    navigate("home");
  }

  function handleAgentLogin() {
    setAuth({ role: "agent", name: "Rahul Sharma" });
    navigate("dashboard");
  }
  function handleSupplierLogin() {
    setAuth({ role: "supplier", name: "Supplier User" });
    setPage("supplier-dashboard" as Page);
  }
  function handleAdminLogin() {
    setAuth({ role: "admin", name: "Admin User" });
    setPage("admin-dashboard" as Page);
  }
  function handleDMCLogin() {
    setAuth({ role: "dmc", name: "DMC User" });
    setPage("dmc-dashboard" as Page);
  }
  function handleStaffLogin() {
    setAuth({ role: "staff", name: "Staff User" });
    setPage("staff-dashboard" as Page);
  }

  // ── Guard: protected pages require login ─────────────────────────────────────
  const PROTECTED_PAGES: Page[] = [
    "dashboard",
    "flights",
    "hotels",
    "tours",
    "transfers",
    "visa",
    "cruises",
    "railway",
    "packages",
    "bookings",
    "wallet",
    "reports",
    "crm",
    "support",
    "gds",
    "supplier-dashboard",
    "admin-dashboard",
    "dmc-dashboard",
    "staff-dashboard",
    "corporate-dashboard",
  ];

  const pageFriendlyNames: Partial<Record<Page, string>> = {
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
    "supplier-dashboard": "Supplier Portal",
    "admin-dashboard": "Admin Panel",
    "dmc-dashboard": "DMC Portal",
    "staff-dashboard": "Staff Operations",
    "corporate-dashboard": "Corporate Portal",
  };

  if (PROTECTED_PAGES.includes(page) && auth.role === null) {
    return (
      <LoginRequiredPage
        onNavigate={navigate}
        intendedPage={pageFriendlyNames[page] ?? page}
      />
    );
  }

  // ── Home
  if (page === "home") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <HomePage onNavigate={navigate} />
        </main>
      </div>
    );
  }

  // ── Company Pages
  if (page === "about")
    return (
      <PublicPage nav={navigate}>
        <AboutPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "api-integration")
    return (
      <PublicPage nav={navigate}>
        <ApiIntegrationPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "agent-registration")
    return (
      <PublicPage nav={navigate}>
        <AgentRegistrationPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "supplier-portal")
    return (
      <PublicPage nav={navigate}>
        <SupplierPortalPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "careers")
    return (
      <PublicPage nav={navigate}>
        <CareersPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "blog")
    return (
      <PublicPage nav={navigate}>
        <BlogPage onNavigate={navigate} />
      </PublicPage>
    );

  // ── Support & Legal Pages
  if (page === "contact")
    return (
      <PublicPage nav={navigate}>
        <ContactPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "help-center")
    return (
      <PublicPage nav={navigate}>
        <HelpCenterPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "terms")
    return (
      <PublicPage nav={navigate}>
        <TermsPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "privacy")
    return (
      <PublicPage nav={navigate}>
        <PrivacyPage onNavigate={navigate} />
      </PublicPage>
    );

  // ── Partner Pages
  if (page === "distributors")
    return (
      <PublicPage nav={navigate}>
        <DistributorsPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "suppliers-page")
    return (
      <PublicPage nav={navigate}>
        <SuppliersPublicPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "api-xml")
    return (
      <PublicPage nav={navigate}>
        <ApiXmlPage onNavigate={navigate} />
      </PublicPage>
    );
  if (page === "testimonials-page")
    return (
      <PublicPage nav={navigate}>
        <TestimonialsPage onNavigate={navigate} />
      </PublicPage>
    );

  // ── Login pages ───────────────────────────────────────────────────────────────
  if (page === "login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AgentLoginPage
            onNavigate={(p) => {
              if (p === "dashboard") {
                handleAgentLogin();
              } else {
                navigate(p);
              }
            }}
          />
        </main>
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
      </div>
    );
  }

  if (page === "supplier-login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <SupplierLoginPage
            onNavigate={(p) => {
              if (p === "supplier-dashboard") {
                handleSupplierLogin();
              } else {
                navigate(p);
              }
            }}
          />
        </main>
      </div>
    );
  }

  if (page === "admin-login") {
    return (
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header onNavigate={navigate} />
        <main className="flex-1">
          <AdminLoginPage
            onNavigate={(p) => {
              if (p === "admin-dashboard") {
                handleAdminLogin();
              } else {
                navigate(p);
              }
            }}
          />
        </main>
      </div>
    );
  }

  if (page === "staff-login") {
    return (
      <StaffLoginPage
        onNavigate={(p) => {
          if (p === "staff-dashboard") {
            handleStaffLogin();
          } else {
            navigate(p as Page);
          }
        }}
      />
    );
  }

  if (page === "dmc-login") {
    return (
      <DMCLoginPage
        onNavigate={(p) => {
          if (p === "dmc-dashboard") {
            handleDMCLogin();
          } else {
            navigate(p);
          }
        }}
      />
    );
  }

  // ── Authenticated Portals ─────────────────────────────────────────────────────
  if (page === "staff-dashboard") {
    return (
      <StaffDashboard
        onNavigate={(p) => {
          if (p === "logout") handleLogout();
          else navigate(p as Page);
        }}
      />
    );
  }

  if (page === "dmc-dashboard") {
    return (
      <DMCDashboard
        onNavigate={(p) => {
          if (p === "logout") handleLogout();
          else navigate(p as Page);
        }}
      />
    );
  }

  if (page === "supplier-dashboard") {
    return (
      <SupplierDashboard
        onNavigate={(p) => {
          if (p === "logout") handleLogout();
          else navigate(p as Page);
        }}
      />
    );
  }

  if (page === "admin-dashboard") {
    return (
      <AdminDashboard
        onNavigate={(p) => {
          if (p === "logout") handleLogout();
          else navigate(p as Page);
        }}
      />
    );
  }

  // ── Agent Dashboard (default fallback for authenticated agents) ───────────────
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
    gds: "GDS Terminal",
    whitelabel: "White Label Settings",
    notifications: "Notifications",
    "smart-pnr": "Smart PNR Import",
    "social-media": "Social Media Hub",
    "supplier-marketplace": "Supplier Marketplace",
    reminders: "Reminders & Automation",
    "whatsapp-bot": "WhatsApp Bot Hub",
    "ai-itinerary": "AI Itinerary Generator",
    corporate: "Corporate Travel Portal",
  };

  return (
    <DashboardLayout
      activeNav={dashNav}
      onNavChange={handleDashNav}
      onLogout={handleLogout}
      title={dashboardTitles[dashNav]}
      subtitle={`Welcome back, ${auth.name || "Agent"}`}
    >
      {dashNav === "dashboard" && <DashboardHome onNavChange={handleDashNav} />}
      {dashNav === "flights" && <FlightSearch />}
      {dashNav === "hotels" && <HotelSearch />}
      {dashNav === "tours" && <RaynaTourModule />}
      {dashNav === "transfers" && <TransferBooking />}
      {dashNav === "visa" && <VisaServices />}
      {dashNav === "cruises" && <CruiseBooking />}
      {dashNav === "railway" && <RailwayBooking />}
      {dashNav === "packages" && <PackageBuilder />}
      {dashNav === "supplier-marketplace" && <SupplierMarketplace />}
      {dashNav === "bookings" && <MyBookings />}
      {dashNav === "wallet" && <WalletModule />}
      {dashNav === "reports" && <ReportsModule />}
      {dashNav === "crm" && <CrmModule />}
      {dashNav === "smart-pnr" && <SmartPNRModule />}
      {dashNav === "social-media" && <SocialMediaModule />}
      {dashNav === "whitelabel" && <WhiteLabelSettings />}
      {dashNav === "notifications" && <NotificationsModule />}
      {dashNav === "reminders" && <RemindersCenter />}
      {dashNav === "whatsapp-bot" && <WhatsAppBot />}
      {dashNav === "gds" && <GDSPNRAutomation />}
      {dashNav === "ai-itinerary" && <AIItineraryGenerator />}
      {dashNav === "corporate" && <CorporatePortal />}
      {dashNav === "support" && <SupportModule />}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
