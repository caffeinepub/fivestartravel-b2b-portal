import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock,
  Facebook,
  FileText,
  Globe,
  HeadphonesIcon,
  Hotel,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Package,
  Phone,
  Plane,
  Shield,
  Ship,
  Sparkles,
  Star,
  Sun,
  Target,
  Train,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HeroSection } from "./HeroSection";
import { NewServicesSection } from "./ServicesSection";

export type Page =
  | "home"
  | "about"
  | "contact"
  | "login"
  | "register"
  | "dashboard"
  | "flights"
  | "hotels"
  | "tours"
  | "transfers"
  | "visa"
  | "cruises"
  | "railway"
  | "packages"
  | "bookings"
  | "wallet"
  | "reports"
  | "support"
  | "supplier-login"
  | "admin-login"
  | "gds"
  | "dmc-login"
  | "dmc-dashboard"
  | "admin-dashboard"
  | "supplier-dashboard"
  | "crm";

// ── Scroll Animation Hook ─────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useScrollReveal();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref}>
      {count >= 1000
        ? `${(count / 1000).toFixed(count >= 10000 ? 0 : 1)}K`
        : count}
      {suffix}
    </span>
  );
}

// ── Top Bar ───────────────────────────────────────────────────────────────────
export function TopBar() {
  return (
    <div className="bg-[#0f172a] text-white text-xs py-2 hidden md:block border-b border-white/10">
      <div className="container flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-white/50">
          <Shield className="w-3 h-3" />
          IATA Accredited · ISO 9001:2015 Certified
        </span>
        <div className="flex items-center gap-5">
          <a
            href="tel:+911725000004"
            className="flex items-center gap-1.5 text-white/50 hover:text-[#00e5a8] transition-colors"
          >
            <Phone className="w-3 h-3" /> +91-1725000004
          </a>
          <span className="opacity-20">|</span>
          <a
            href="mailto:customerservice@fivestartravel.in"
            className="flex items-center gap-1.5 text-white/50 hover:text-[#00e5a8] transition-colors"
          >
            <Mail className="w-3 h-3" /> customerservice@fivestartravel.in
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
const SERVICE_MENU = [
  { icon: Plane, label: "Flights", page: "flights" as Page },
  { icon: Hotel, label: "Hotels", page: "hotels" as Page },
  { icon: FileText, label: "Visa", page: "visa" as Page },
  { icon: Car, label: "Transfers", page: "transfers" as Page },
  { icon: Package, label: "Tours", page: "tours" as Page },
  { icon: Ship, label: "Cruises", page: "cruises" as Page },
  { icon: Train, label: "Railway", page: "railway" as Page },
  { icon: Shield, label: "Insurance", page: "packages" as Page },
];

export function Header({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    if (next) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0f172a]/95 backdrop-blur-md shadow-premium-blue"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2"
          data-ocid="nav.home_link"
        >
          <img
            src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
            alt="FiveStarTravel.in"
            className="h-10 w-auto rounded-lg"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Services <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-[480px] glass-card rounded-2xl p-4 grid grid-cols-2 gap-2"
                style={{ background: "rgba(15,23,42,0.95)" }}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {SERVICE_MENU.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onClick={() => {
                      onNavigate(s.page);
                      setServicesOpen(false);
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#2563eb]/20 flex items-center justify-center">
                      <s.icon className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <span className="text-white/80 text-sm font-medium">
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => onNavigate("about")}
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="text-white/70 hover:text-white text-sm font-medium transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {/* Dark/Light Toggle */}
          <button
            type="button"
            onClick={toggleDark}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all"
            data-ocid="nav.dark_mode_toggle"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate("login")}
            className="text-white/80 hover:text-white hover:bg-white/10 rounded-xl"
            data-ocid="nav.login_button"
          >
            Login
          </Button>
          <Button
            size="sm"
            onClick={() => onNavigate("register")}
            className="btn-premium rounded-xl px-5 font-semibold"
            data-ocid="nav.register_button"
          >
            Join Free
          </Button>
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleDark}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/70"
            data-ocid="nav.dark_mode_toggle"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden"
          style={{ background: "rgba(15,23,42,0.98)" }}
        >
          <div className="container py-4 space-y-2">
            {SERVICE_MENU.map((s) => (
              <button
                key={s.label}
                type="button"
                onClick={() => {
                  onNavigate(s.page);
                  setMobileOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-white/80 hover:bg-white/5 transition-colors text-sm"
              >
                <s.icon className="w-4 h-4 text-[#2563eb]" /> {s.label}
              </button>
            ))}
            <div className="pt-3 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  onNavigate("login");
                  setMobileOpen(false);
                }}
                className="flex-1 text-white border border-white/20"
                data-ocid="nav.login_button"
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onNavigate("register");
                  setMobileOpen(false);
                }}
                className="flex-1 btn-premium"
                data-ocid="nav.register_button"
              >
                Join Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────
const SEARCH_TABS = ["Flights", "Hotels", "Visa", "Tours", "Transfers"];

export function Hero({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="hero-gradient grain-overlay relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* 3D Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="blob-1 absolute top-[-10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(ellipse, rgba(37,99,235,0.6) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="blob-2 absolute bottom-[-5%] left-[5%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(ellipse, rgba(0,229,168,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="blob-3 absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(ellipse, rgba(250,204,21,0.4) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Floating Orbs */}
      {[
        { s: 12, t: "15%", l: "20%", d: 0 },
        { s: 8, t: "70%", l: "75%", d: 1.5 },
        { s: 16, t: "30%", l: "80%", d: 0.8 },
        { s: 6, t: "55%", l: "10%", d: 2.2 },
        { s: 10, t: "85%", l: "40%", d: 1 },
      ].map((o, oi) => (
        <div
          key={`${o.t}-${o.l}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${o.s}px`,
            height: `${o.s}px`,
            top: o.t,
            left: o.l,
            background:
              oi % 2 === 0 ? "rgba(37,99,235,0.4)" : "rgba(0,229,168,0.3)",
            filter: "blur(1px)",
            animation: `float ${6 + oi}s ease-in-out ${o.d}s infinite`,
          }}
        />
      ))}

      {/* Airplane */}
      <div
        className="absolute pointer-events-none"
        style={{ top: "18%", animation: "airplane 18s linear 3s infinite" }}
      >
        <span
          style={{
            fontSize: "28px",
            filter: "drop-shadow(0 0 8px rgba(0,229,168,0.6))",
          }}
        >
          ✈
        </span>
      </div>

      <div className="container relative z-10 pt-20 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-[#facc15]" />
            <span className="text-white/80 text-sm font-medium">
              India's #1 B2B Travel Technology Platform
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl font-heading font-bold text-white leading-tight mb-6"
            style={{ animationDelay: "0.1s" }}
          >
            Book Smarter.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #2563eb, #00e5a8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Earn More.
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
            One platform for flights, hotels, visa, transfers, tours and
            cruises. Trusted by 50,000+ travel agents worldwide.
          </p>

          {/* AI Search Box */}
          <div
            className="search-glow rounded-2xl p-1 mb-6"
            style={{
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(37,99,235,0.4)",
            }}
          >
            {/* Tabs */}
            <div className="flex">
              {SEARCH_TABS.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`flex-1 py-3 text-sm font-semibold rounded-xl transition-all ${
                    activeTab === i
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  style={
                    activeTab === i
                      ? {
                          background:
                            "linear-gradient(135deg, rgba(37,99,235,0.6), rgba(0,229,168,0.3))",
                        }
                      : {}
                  }
                  data-ocid={`hero.search.tab.${i + 1}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Fields */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2563eb]" />
                <input
                  className="w-full pl-9 pr-3 py-3 rounded-xl text-sm text-white placeholder-white/40 border border-white/10 focus:outline-none focus:border-[#2563eb]/60"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  placeholder={activeTab === 0 ? "From City" : "Destination"}
                  data-ocid="hero.search_input"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00e5a8]" />
                <input
                  className="w-full pl-9 pr-3 py-3 rounded-xl text-sm text-white placeholder-white/40 border border-white/10 focus:outline-none focus:border-[#00e5a8]/60"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  placeholder={activeTab === 0 ? "To City" : "Check-in"}
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#facc15]" />
                <input
                  type="date"
                  className="w-full pl-9 pr-3 py-3 rounded-xl text-sm text-white/80 border border-white/10 focus:outline-none focus:border-[#facc15]/60"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    colorScheme: "dark",
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const pages: Page[] = [
                    "flights",
                    "hotels",
                    "visa",
                    "tours",
                    "transfers",
                  ];
                  onNavigate(pages[activeTab]);
                }}
                className="btn-premium rounded-xl py-3 px-4 text-sm font-bold flex items-center justify-center gap-2"
                data-ocid="hero.search_button"
              >
                <Sparkles className="w-4 h-4" /> Search Deals
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
            {["No setup fee", "Instant approval", "24×7 support"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e5a8]" />
                <span className="text-white/80">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
const STATS = [
  { target: 50000, suffix: "+", label: "Agents Worldwide" },
  { target: 2000000, suffix: "+", label: "Total Bookings" },
  { target: 190, suffix: "+", label: "Countries Covered" },
  { target: 500, suffix: "+", label: "Hotel Partners" },
];

export function StatsBar() {
  return (
    <div
      style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a)" }}
      className="border-y border-white/10 py-10"
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="text-center stat-animate"
              style={{ animationDelay: `${i * 0.15}s` }}
              data-ocid={`stats.item.${i + 1}`}
            >
              <p
                className="font-heading text-3xl md:text-4xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #00e5a8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <Counter target={s.target} suffix={s.suffix} />
              </p>
              <p className="text-white/50 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Trust Logos Marquee ───────────────────────────────────────────────────────
const TRUST_LOGOS = [
  "IATA",
  "Amadeus",
  "Galileo",
  "Sabre",
  "NDC Alliance",
  "UFTAA",
  "PATA",
  "TAAI",
  "ADTOI",
];

export function TrustLogos() {
  return (
    <div className="bg-background border-y border-border py-8">
      <div className="container">
        <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-6 font-semibold">
          Trusted By Leading Industry Partners
        </p>
      </div>
      <div className="relative flex overflow-x-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[
            ...TRUST_LOGOS.map((l) => `${l}-a`),
            ...TRUST_LOGOS.map((l) => `${l}-b`),
          ].map((logo) => (
            <div
              key={logo}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #00e5a8)",
                }}
              />
              <span className="text-foreground/70 font-bold text-sm tracking-wide">
                {logo.replace(/-[ab]$/, "")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Services Section ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Global flights via Amadeus, Sabre & Travelport GDS with fare compare, seat selection & baggage.",
    page: "flights" as Page,
    color: "#2563eb",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    desc: "1M+ properties worldwide with real-time pricing, instant confirmation, and room-level details.",
    page: "hotels" as Page,
    color: "#00e5a8",
  },
  {
    icon: Package,
    title: "Holiday Packages",
    desc: "Curated packages for honeymoon, family & corporate with markup control and B2C resell.",
    page: "packages" as Page,
    color: "#facc15",
  },
  {
    icon: Car,
    title: "Transfers",
    desc: "Airport, city, and hotel transfers with real-time availability and instant booking confirmation.",
    page: "transfers" as Page,
    color: "#a78bfa",
  },
  {
    icon: FileText,
    title: "Visa Services",
    desc: "eVisa and sticker visa for 190+ countries with document checklist, OCR scan & status tracking.",
    page: "visa" as Page,
    color: "#f472b6",
  },
  {
    icon: Ship,
    title: "Cruise Booking",
    desc: "Premium cruise inventory from leading lines with cabin class selection and real-time pricing.",
    page: "cruises" as Page,
    color: "#38bdf8",
  },
  {
    icon: Train,
    title: "Railway Booking",
    desc: "Indian Railways with PNR status, berth selection, and tatkal booking support.",
    page: "railway" as Page,
    color: "#34d399",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    desc: "Comprehensive travel protection plans for individuals, families, and groups worldwide.",
    page: "packages" as Page,
    color: "#fb923c",
  },
];

export function ServicesSection({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="services" className="py-24 bg-background" ref={ref}>
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Our Services
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything for Your Travel Business
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete suite of B2B travel products — all in one platform with
            agent-exclusive pricing.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => onNavigate(s.page)}
              className="glass-card glass-card-hover text-left p-6 group"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease ${i * 0.07}s`,
              }}
              data-ocid={`services.item.${i + 1}`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                style={{ background: `${s.color}20` }}
              >
                <s.icon className="w-6 h-6" style={{ color: s.color }} />
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {s.desc}
              </p>
              <div
                className="mt-4 flex items-center gap-1 text-xs font-semibold"
                style={{ color: s.color }}
              >
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Choose Us ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast Search",
    desc: "Sub-2-second flight and hotel searches powered by distributed API infrastructure.",
    color: "#facc15",
  },
  {
    icon: Globe,
    title: "Global Inventory",
    desc: "Access 500+ airlines, 1M+ hotels, and tours across 190+ countries from a single login.",
    color: "#2563eb",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    desc: "PCI-DSS compliant payments, IATA accreditation, and ISO 9001:2015 certified operations.",
    color: "#00e5a8",
  },
  {
    icon: Users,
    title: "Agent-First Design",
    desc: "Built by travel agents for travel agents — with markup control, client management & reports.",
    color: "#a78bfa",
  },
  {
    icon: HeadphonesIcon,
    title: "24×7 Support",
    desc: "Dedicated agent support team available around the clock via phone, email, and chat.",
    color: "#fb923c",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Pricing",
    desc: "Smart price alerts, demand forecasting, and automated itinerary builder powered by AI.",
    color: "#38bdf8",
  },
];

export function WhyChooseUs() {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
      }}
      ref={ref}
    >
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            Why Choose Us
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Built for Serious Travel Agents
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to run a profitable, professional travel
            business at scale.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="glass-card glass-card-hover p-7"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease ${i * 0.08}s`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: `${f.color}18` }}
              >
                <f.icon className="w-6 h-6" style={{ color: f.color }} />
              </div>
              <h3 className="font-heading font-bold text-white text-lg mb-2">
                {f.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Deal Cards ────────────────────────────────────────────────────────────────
const DEALS = [
  {
    dest: "Dubai City Tour",
    nights: "5 Nights",
    original: 35000,
    price: 28900,
    discount: 17,
    gradient: "from-amber-600 to-orange-800",
    flag: "🇦🇪",
  },
  {
    dest: "Bangkok + Phuket",
    nights: "7 Nights",
    original: 38000,
    price: 27900,
    discount: 27,
    gradient: "from-emerald-600 to-teal-800",
    flag: "🇹🇭",
  },
  {
    dest: "Singapore Discovery",
    nights: "6 Nights",
    original: 42000,
    price: 32500,
    discount: 23,
    gradient: "from-blue-600 to-indigo-800",
    flag: "🇸🇬",
  },
  {
    dest: "Maldives Luxury",
    nights: "5 Nights",
    original: 85000,
    price: 65000,
    discount: 24,
    gradient: "from-cyan-500 to-sky-800",
    flag: "🇲🇻",
  },
  {
    dest: "Europe Explorer",
    nights: "10 Nights",
    original: 120000,
    price: 89000,
    discount: 26,
    gradient: "from-violet-600 to-purple-800",
    flag: "🇪🇺",
  },
  {
    dest: "Sri Lanka Escape",
    nights: "4 Nights",
    original: 24000,
    price: 18500,
    discount: 23,
    gradient: "from-green-600 to-emerald-800",
    flag: "🇱🇰",
  },
];

export function AgentDeals({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="deals" className="py-24 bg-background" ref={ref}>
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
            Agent-Exclusive Deals
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Top Deals for Your Clients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pre-negotiated B2B rates not available to the public. Add your
            markup and earn more.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.map((deal, i) => (
            <button
              key={deal.dest}
              className="rounded-2xl overflow-hidden border border-border bg-card card-lift cursor-pointer text-left w-full"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `all 0.5s ease ${i * 0.1}s`,
              }}
              data-ocid={`deals.item.${i + 1}`}
              type="button"
              onClick={() => onNavigate("packages")}
            >
              {/* Image area */}
              <div
                className={`relative h-44 bg-gradient-to-br ${deal.gradient} flex items-end p-4`}
              >
                <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  -{deal.discount}%
                </span>
                <div className="text-4xl">{deal.flag}</div>
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-foreground text-lg">
                  {deal.dest}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {deal.nights}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm line-through">
                      ₹{deal.original.toLocaleString("en-IN")}
                    </p>
                    <p
                      className="font-heading text-2xl font-bold"
                      style={{ color: "#facc15" }}
                    >
                      ₹{deal.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-premium rounded-xl px-4 py-2 text-sm font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("packages");
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Dashboard Preview ─────────────────────────────────────────────────────────
// ── Platform Features ─────────────────────────────────────────────────────────
const PLATFORM_FEATURES = [
  {
    icon: "Zap",
    title: "Smart Booking Engine",
    desc: "Fast and reliable booking for flights, hotels and holiday packages.",
    color: "#2563eb",
  },
  {
    icon: "Shield",
    title: "Automated Wallet & Payments",
    desc: "Secure payments with UPI, net banking, credit cards and instant wallet transactions.",
    color: "#00e5a8",
  },
  {
    icon: "Globe",
    title: "API Integration",
    desc: "Integrate our travel inventory into your system with advanced API and XML connectivity.",
    color: "#f97316",
  },
  {
    icon: "Target",
    title: "Business Dashboard",
    desc: "Monitor bookings, track revenue, and analyze your business performance in real time.",
    color: "#facc15",
  },
  {
    icon: "FileText",
    title: "Instant Amendments",
    desc: "Modify or cancel bookings quickly with our automated amendment system.",
    color: "#a78bfa",
  },
  {
    icon: "Award",
    title: "Agent Pricing Advantage",
    desc: "Exclusive B2B pricing designed to maximize your profit margins.",
    color: "#f43f5e",
  },
];

const FEATURE_ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  Zap,
  Shield,
  Globe,
  Target,
  FileText,
  Award,
};

export function PlatformFeatures() {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #0b1324 100%)",
      }}
    >
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            Platform Features
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Tools to Grow Your{" "}
            <span style={{ color: "#f97316" }}>Travel Business</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything a modern travel agency needs — bookings, payments,
            analytics, and more — in one unified platform.
          </p>
        </div>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLATFORM_FEATURES.map((f, i) => {
            const Icon = FEATURE_ICON_MAP[f.icon];
            return (
              <div
                key={f.title}
                className="group rounded-2xl p-7 cursor-default transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
                data-ocid={`platform_features.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${f.color}18`,
                    boxShadow: `0 0 0 0 ${f.color}40`,
                  }}
                >
                  {Icon && (
                    <Icon
                      className="w-6 h-6 transition-colors duration-300"
                      style={{ color: f.color }}
                    />
                  )}
                </div>
                <h3 className="font-heading font-bold text-white text-lg mb-2">
                  {f.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DashboardPreview({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const { ref } = useScrollReveal();
  return (
    <section
      className="py-24"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
      }}
    >
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            Agent Dashboard
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Powerful Booking Dashboard Built for Agents
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Everything you need to manage flights, hotels, visa, and more — in
            one place.
          </p>
        </div>
        <div
          ref={ref}
          className="max-w-4xl mx-auto rounded-2xl p-1 animate-pulse-glow"
          style={{
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.4), rgba(0,229,168,0.2))",
            transition: "all 0.6s ease",
          }}
        >
          {/* Mock Dashboard */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#0f172a" }}
          >
            {/* Top bar */}
            <div className="flex items-center gap-3 px-5 py-3 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="flex-1 ml-4 h-6 rounded bg-white/5 flex items-center px-3">
                <span className="text-white/30 text-xs">
                  fivestartravel.in/dashboard
                </span>
              </div>
            </div>
            {/* Content */}
            <div className="p-5 grid grid-cols-4 gap-3">
              {/* Sidebar */}
              <div className="col-span-1 space-y-2">
                {[
                  "Flights",
                  "Hotels",
                  "Visa",
                  "Transfers",
                  "Tours",
                  "Reports",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="rounded-lg px-3 py-2 text-xs flex items-center gap-2"
                    style={{
                      background:
                        i === 0
                          ? "rgba(37,99,235,0.3)"
                          : "rgba(255,255,255,0.04)",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background:
                          i === 0 ? "#2563eb" : "rgba(255,255,255,0.2)",
                      }}
                    />
                    <span
                      style={{
                        color: i === 0 ? "#60a5fa" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              {/* Main area */}
              <div className="col-span-3 space-y-3">
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Bookings", val: "247", color: "#2563eb" },
                    { label: "Revenue", val: "₹8.4L", color: "#00e5a8" },
                    { label: "Pending", val: "12", color: "#facc15" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl p-3"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <p
                        className="text-[10px] mb-1"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {s.label}
                      </p>
                      <p
                        className="text-base font-bold font-heading"
                        style={{ color: s.color }}
                      >
                        {s.val}
                      </p>
                      <div
                        className="mt-2 h-1 rounded-full"
                        style={{ background: "rgba(255,255,255,0.1)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: "65%", background: s.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Table */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-white/5">
                    {["Booking ID", "Route", "Status", "Amount"].map((h) => (
                      <span
                        key={h}
                        className="text-[9px] font-semibold"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  {[
                    {
                      id: "FST-001",
                      route: "DEL-DXB",
                      status: "Confirmed",
                      amt: "₹24,500",
                      c: "#00e5a8",
                    },
                    {
                      id: "FST-002",
                      route: "BOM-LHR",
                      status: "Processing",
                      amt: "₹82,000",
                      c: "#facc15",
                    },
                    {
                      id: "FST-003",
                      route: "MAA-SIN",
                      status: "Confirmed",
                      amt: "₹31,200",
                      c: "#00e5a8",
                    },
                  ].map((r) => (
                    <div
                      key={r.id}
                      className="grid grid-cols-4 gap-2 px-3 py-2 border-b border-white/5"
                    >
                      <span className="text-[9px]" style={{ color: "#60a5fa" }}>
                        {r.id}
                      </span>
                      <span
                        className="text-[9px]"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {r.route}
                      </span>
                      <span
                        className="text-[9px] font-semibold"
                        style={{ color: r.c }}
                      >
                        {r.status}
                      </span>
                      <span className="text-[9px]" style={{ color: "#facc15" }}>
                        {r.amt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-10">
          <Button
            size="lg"
            onClick={() => onNavigate("register")}
            className="btn-premium rounded-2xl px-8 py-4 font-bold text-lg"
            data-ocid="dashboard_preview.cta.primary_button"
          >
            Start for Free <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Travel Agency Owner",
    city: "Delhi",
    text: "This platform helped us expand our travel business with competitive pricing and reliable booking tools.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Tour Operator",
    city: "Mumbai",
    text: "Excellent hotel inventory and seamless booking system. Highly recommended for travel professionals.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Corporate Travel Consultant",
    city: "Ahmedabad",
    text: "Fast booking confirmations and powerful reporting tools make it ideal for our agency.",
    rating: 5,
  },
];

export function Testimonials() {
  const { ref, visible } = useScrollReveal();
  return (
    <section className="py-24" style={{ background: "#0b1324" }} ref={ref}>
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            Testimonials
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Travel Agents{" "}
            <span style={{ color: "#f97316" }}>Worldwide</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Join thousands of travel professionals who rely on FiveStarTravel.in
            every day.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
              }}
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }, (_, si) => si + 1).map(
                  (starNum) => (
                    <Star
                      key={`star-${starNum}`}
                      className="w-4 h-4 fill-[#f97316] text-[#f97316]"
                    />
                  ),
                )}
              </div>
              <p className="text-white/75 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #1e3a8a, #f97316)",
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/45 text-xs">
                    {t.role} · {t.city}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────────
export function CTASection({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #f97316 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          transform: "translate(-30%, 30%)",
        }}
      />
      <div className="container text-center relative z-10">
        <Badge className="bg-white/15 text-white border-white/25 mb-6">
          Join Our Network
        </Badge>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-6">
          Start Growing Your Travel{" "}
          <span className="block">Business Today</span>
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
          Join our global network of travel professionals and unlock access to
          powerful booking technology.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <Button
            size="lg"
            onClick={() => onNavigate("register")}
            className="rounded-2xl px-10 py-4 text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: "white",
              color: "#1e3a8a",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
            data-ocid="cta.register_button"
          >
            Create Agent Account <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={() => onNavigate("contact")}
            className="rounded-2xl px-10 py-4 text-lg font-semibold text-white border-2 border-white/40 hover:bg-white/15 hover:border-white/60 transition-all duration-300"
          >
            Schedule Demo
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm">
          {[
            "Free Registration",
            "No Credit Card Required",
            "Instant Approval",
            "24×7 Support",
          ].map((t) => (
            <span key={t} className="flex items-center gap-2 text-white/80">
              <CheckCircle2 className="w-4 h-4 text-white" /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Floating Action Menu ──────────────────────────────────────────────────────
export function FloatingActionMenu({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [open, setOpen] = useState(false);
  const items = [
    {
      icon: Plane,
      label: "Flights",
      page: "flights" as Page,
      color: "#2563eb",
    },
    { icon: Hotel, label: "Hotels", page: "hotels" as Page, color: "#00e5a8" },
    {
      icon: Package,
      label: "Packages",
      page: "packages" as Page,
      color: "#facc15",
    },
    {
      icon: HeadphonesIcon,
      label: "Support",
      page: "support" as Page,
      color: "#a78bfa",
    },
  ];
  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {open &&
        items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              onNavigate(item.page);
              setOpen(false);
            }}
            className="flex items-center gap-3 glass-card px-4 py-2.5 rounded-2xl border border-white/20 hover:scale-105 transition-all group"
            style={{ animationDelay: `${i * 0.05}s` }}
            data-ocid={`floating_menu.${item.label.toLowerCase()}_button`}
          >
            <span className="text-sm font-semibold text-white/80 group-hover:text-white">
              {item.label}
            </span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `${item.color}20` }}
            >
              <item.icon className="w-4 h-4" style={{ color: item.color }} />
            </div>
          </button>
        ))}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #2563eb, #00e5a8)",
          boxShadow: "0 8px 30px rgba(37,99,235,0.5)",
        }}
        data-ocid="floating_menu.flight_button"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Plane className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
const SERVICE_LINKS = [
  { label: "Flights", page: "flights" as Page },
  { label: "Hotels", page: "hotels" as Page },
  { label: "Holiday Packages", page: "packages" as Page },
  { label: "Visa Services", page: "visa" as Page },
  { label: "Transfers", page: "transfers" as Page },
  { label: "Cruises", page: "cruises" as Page },
  { label: "Railway", page: "railway" as Page },
  { label: "Tours", page: "tours" as Page },
];

const COMPANY_LINKS = [
  { label: "About Us", page: "about" as Page },
  { label: "API Integration", page: "dashboard" as Page },
  { label: "Agent Registration", page: "register" as Page },
  { label: "Supplier Portal", page: "login" as Page },
  { label: "Careers", page: "about" as Page },
  { label: "Blog", page: "about" as Page },
];

const SUPPORT_LINKS = [
  { label: "Contact Us", page: "contact" as Page },
  { label: "Help Center", page: "support" as Page },
  { label: "Terms & Conditions", page: "contact" as Page },
  { label: "Privacy Policy", page: "contact" as Page },
];

export function Footer({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{ background: "#0b1324" }}
      className="text-white border-t border-white/10"
    >
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Column 1: Logo + Description */}
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={() => onNavigate?.("home")}
              className="mb-4 block"
              data-ocid="footer.home.link"
            >
              <img
                src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
                alt="FiveStarTravel.in"
                className="h-10 w-auto rounded-xl"
              />
            </button>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              India's leading B2B travel technology platform for modern travel
              agencies.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Linkedin, name: "linkedin" },
                { Icon: Facebook, name: "facebook" },
                { Icon: Instagram, name: "instagram" },
                { Icon: X, name: "twitter" },
              ].map(({ Icon, name }) => (
                <a
                  key={name}
                  href={`https://www.${name}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/40 hover:text-[#f97316] hover:border-[#f97316]/30 transition-all duration-300"
                  data-ocid={`footer.${name}.link`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map(({ label, page }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(page)}
                    className="text-white/50 hover:text-[#f97316] text-sm transition-colors duration-200"
                    data-ocid={`footer.services.${label.toLowerCase().replace(/\s/g, "_")}.link`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(({ label, page }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(page)}
                    className="text-white/50 hover:text-[#f97316] text-sm transition-colors duration-200"
                    data-ocid={`footer.company.${label.toLowerCase().replace(/\s/g, "_")}.link`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support & Contact */}
          <div>
            <h4 className="font-heading font-bold text-white mb-5 text-sm uppercase tracking-wider">
              Support & Contact
            </h4>
            <ul className="space-y-2.5 mb-6">
              {SUPPORT_LINKS.map(({ label, page }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => onNavigate?.(page)}
                    className="text-white/50 hover:text-[#f97316] text-sm transition-colors duration-200"
                    data-ocid={`footer.support.${label.toLowerCase().replace(/\s/g, "_")}.link`}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="space-y-2.5">
              <a
                href="mailto:customerservice@fivestartravel.in"
                className="flex items-center gap-2 text-white/50 hover:text-[#f97316] text-sm transition-colors duration-200"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                customerservice@fivestartravel.in
              </a>
              <a
                href="tel:+911725000004"
                className="flex items-center gap-2 text-white/50 hover:text-[#f97316] text-sm transition-colors duration-200"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91-1725000004
              </a>
              <p className="flex items-start gap-2 text-white/40 text-xs leading-relaxed">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                SCO 48 Sector 30C Chandigarh, India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-sm">
            © {year} FiveStarTravel.in. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">CIN: U63030MH2018PTC314938</p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "fivestartravel.in")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 text-xs hover:text-white/50 transition-colors"
          >
            Built with ❤ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <HeroSection onNavigate={onNavigate} />
      <NewServicesSection onNavigate={onNavigate} />
      <WhyChooseUs />
      <AgentDeals onNavigate={onNavigate} />
      <PlatformFeatures />
      <DashboardPreview onNavigate={onNavigate} />
      <Testimonials />
      <CTASection onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
      <FloatingActionMenu onNavigate={onNavigate} />
    </>
  );
}

// ── About Page ────────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: "2018",
    title: "Founded",
    desc: "FiveStarTravel.in incorporated in Chandigarh. Started with hotel and flight booking APIs.",
  },
  {
    year: "2019",
    title: "First 1,000 Agents",
    desc: "Reached milestone of 1,000 registered travel agents across India within 12 months.",
  },
  {
    year: "2021",
    title: "Pan-India Expansion",
    desc: "Expanded to 50+ cities. Launched visa module and transfer services.",
  },
  {
    year: "2023",
    title: "API Integrations",
    desc: "Connected 50+ global suppliers for real-time hotel and flight inventory with live pricing.",
  },
  {
    year: "2025",
    title: "AI Features",
    desc: "Launched AI-powered price prediction, smart packaging, and automated itinerary builder.",
  },
  {
    year: "2026",
    title: "Global Launch",
    desc: "Opened platform to international agents. Now serving 50,000+ agents in 40+ countries.",
  },
];

const TEAM = [
  {
    name: "Vikram Singh",
    role: "Chief Executive Officer",
    initials: "VS",
    color: "bg-blue-600",
    bio: "20+ years in travel technology. Former VP at Amadeus India.",
  },
  {
    name: "Ananya Kapoor",
    role: "Chief Technology Officer",
    initials: "AK",
    color: "bg-emerald-600",
    bio: "Ex-Google engineer. Built the core booking engine and API integrations.",
  },
  {
    name: "Rohit Mehta",
    role: "Head of Operations",
    initials: "RM",
    color: "bg-purple-600",
    bio: "IATA certified. Manages 24/7 support team and supplier relationships.",
  },
];

export function AboutPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  return (
    <div>
      <section className="hero-gradient grain-overlay py-20">
        <div className="container relative z-10 text-center">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            About FiveStarTravel.in
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Powering India's Travel Industry
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Founded in 2018 in Chandigarh, we've grown to become India's most
            trusted B2B travel technology platform serving agents across the
            country.
          </p>
        </div>
      </section>

      <section
        style={{ background: "linear-gradient(135deg, #0f172a, #1e3a8a)" }}
        className="py-10"
      >
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-white/20">
            {[
              { value: "2018", label: "Founded" },
              { value: "50K+", label: "Active Agents" },
              { value: "50+", label: "Global Suppliers" },
              { value: "190+", label: "Countries" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center px-4"
                data-ocid={`about.stats.item.${i + 1}`}
              >
                <span className="font-heading text-3xl font-bold text-white">
                  {s.value}
                </span>
                <span className="text-white/60 text-sm mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              FiveStarTravel.in was incorporated in 2018 (CIN:
              U63030MH2018PTC314938) with a singular mission: to democratize
              travel technology for Indian travel agents. What started as a
              small team in Chandigarh has grown into a platform trusted by
              agents processing over ₹500 Crore in bookings annually.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe every travel agent deserves access to the same
              world-class inventory and technology that the big OTAs use. Fair
              pricing, real-time inventory, and technology that works for you.
            </p>
          </div>

          <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-10">
            Our Journey
          </h3>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {TIMELINE.map((t, i) => (
                <div
                  key={t.year}
                  className={`flex flex-col md:flex-row items-center gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  data-ocid={`about.timeline.item.${i + 1}`}
                >
                  <div className="md:w-1/2">
                    {i % 2 === 0 && (
                      <div className="bg-card border border-border rounded-2xl p-5 md:mr-8">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                          {t.year}
                        </Badge>
                        <h4 className="font-heading font-bold text-foreground mb-1">
                          {t.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {t.desc}
                        </p>
                      </div>
                    )}
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 z-10"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #00e5a8)",
                    }}
                  >
                    {t.year.slice(2)}
                  </div>
                  <div className="md:w-1/2">
                    {i % 2 !== 0 && (
                      <div className="bg-card border border-border rounded-2xl p-5 md:ml-8">
                        <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                          {t.year}
                        </Badge>
                        <h4 className="font-heading font-bold text-foreground mb-1">
                          {t.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {t.desc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
        }}
      >
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
              Leadership Team
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-white">
              Meet the Team
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {TEAM.map((member, i) => (
              <div
                key={member.name}
                className="glass-card rounded-2xl p-7 text-center"
                data-ocid={`about.team.item.${i + 1}`}
              >
                <div
                  className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}
                >
                  {member.initials}
                </div>
                <h3 className="font-heading font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-[#00e5a8] text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-white/60 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Awards &amp; Certifications
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              {
                icon: Award,
                title: "IATA Accredited",
                desc: "International Air Transport Association",
              },
              {
                icon: Shield,
                title: "ISO 9001:2015",
                desc: "Quality Management System",
              },
              {
                icon: Target,
                title: "CIN Registered",
                desc: "U63030MH2018PTC314938",
              },
              {
                icon: Star,
                title: "Best B2B Platform 2025",
                desc: "Travel Technology Awards",
              },
            ].map((cert, i) => (
              <div
                key={cert.title}
                className="glass-card rounded-2xl p-6 text-center w-48"
                data-ocid={`about.cert.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(37,99,235,0.2)" }}
                >
                  <cert.icon className="w-6 h-6" style={{ color: "#2563eb" }} />
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm mb-1">
                  {cert.title}
                </h3>
                <p className="text-muted-foreground text-xs">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ── Contact Page ──────────────────────────────────────────────────────────────
const OFFICES = [
  {
    city: "Chandigarh HQ",
    address: "SCO 48 Sector 30C, Chandigarh, India",
    phone: "+91-1725000004",
    email: "customerservice@fivestartravel.in",
    icon: Building2,
  },
  {
    city: "Mumbai Office",
    address: "Level 5, BKC Tower, Bandra Kurla Complex, Mumbai 400051",
    phone: "+91-2240000008",
    email: "mumbai@fivestartravel.in",
    icon: Building2,
  },
  {
    city: "Delhi Office",
    address: "Floor 3, Connaught Place, New Delhi 110001",
    phone: "+91-1140000012",
    email: "delhi@fivestartravel.in",
    icon: Building2,
  },
];

export function ContactPage({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <section className="hero-gradient grain-overlay py-16">
        <div className="container relative z-10 text-center">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            Get in Touch
          </Badge>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            We're Here to Help
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Reach out for sales, technical support, or partnership
            opportunities.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {OFFICES.map((office, i) => (
              <div
                key={office.city}
                className="bg-card border border-border rounded-2xl p-6 card-lift"
                data-ocid={`contact.office.item.${i + 1}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(37,99,235,0.15)" }}
                >
                  <office.icon
                    className="w-5 h-5"
                    style={{ color: "#2563eb" }}
                  />
                </div>
                <h3 className="font-heading font-bold text-foreground mb-3">
                  {office.city}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: "#2563eb" }}
                    />
                    {office.address}
                  </div>
                  <a
                    href={`tel:${office.phone.replace(/[^+0-9]/g, "")}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="w-4 h-4" style={{ color: "#00e5a8" }} />{" "}
                    {office.phone}
                  </a>
                  <a
                    href={`mailto:${office.email}`}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail className="w-4 h-4" style={{ color: "#facc15" }} />{" "}
                    {office.email}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              {submitted ? (
                <div
                  className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center"
                  data-ocid="contact.success_state"
                >
                  <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Our team will get back to you within 2 business hours.
                  </p>
                  <Button
                    className="mt-4 btn-premium rounded-xl"
                    onClick={() => setSubmitted(false)}
                    data-ocid="contact.send_another.button"
                  >
                    Send Another
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  data-ocid="contact.form.panel"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="cname"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="cname"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        required
                        data-ocid="contact.name.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cemail"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="cemail"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        required
                        data-ocid="contact.email.input"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="cphone"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="cphone"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        data-ocid="contact.phone.input"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="csubject"
                        className="mb-1.5 block text-sm font-medium"
                      >
                        Subject *
                      </Label>
                      <Input
                        id="csubject"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, subject: e.target.value }))
                        }
                        required
                        data-ocid="contact.subject.input"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="cmessage"
                      className="mb-1.5 block text-sm font-medium"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="cmessage"
                      placeholder="Describe your inquiry in detail..."
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      data-ocid="contact.message.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-premium rounded-xl font-semibold"
                    data-ocid="contact.submit.submit_button"
                  >
                    Send Message <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-foreground mb-4">
                  Support Hours
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      icon: Clock,
                      label: "General Support",
                      value: "Mon–Sat, 9:00 AM – 8:00 PM IST",
                    },
                    {
                      icon: Zap,
                      label: "Emergency Bookings",
                      value: "24×7 · 365 days a year",
                    },
                    {
                      icon: HeadphonesIcon,
                      label: "Agent Helpline",
                      value: "+91-1725000004",
                    },
                    {
                      icon: Mail,
                      label: "Email Support",
                      value: "customerservice@fivestartravel.in",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(37,99,235,0.15)" }}
                      >
                        <item.icon
                          className="w-4 h-4"
                          style={{ color: "#2563eb" }}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {item.label}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="rounded-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
                }}
              >
                <h3 className="font-heading font-bold text-white mb-2">
                  Become an Agent Today
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Register for free and start booking flights, hotels, visa, and
                  more for your clients.
                </p>
                <Button
                  className="w-full btn-premium rounded-xl font-semibold"
                  onClick={() => onNavigate("register")}
                  data-ocid="contact.register.primary_button"
                >
                  Register Free <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-heading font-bold text-foreground mb-3">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Agent Login", page: "login" as Page },
                    { label: "Register as Agent", page: "register" as Page },
                    { label: "About Us", page: "about" as Page },
                  ].map((link) => (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => onNavigate(link.page)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-sm text-foreground"
                      data-ocid={`contact.quicklink.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
                    >
                      {link.label} <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
