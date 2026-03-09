import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Building2,
  Car,
  CheckCircle2,
  ChevronRight,
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
  Package,
  Phone,
  Plane,
  Shield,
  Ship,
  Star,
  Train,
  TrendingUp,
  Twitter,
  Users,
  X,
  Youtube,
  Zap,
} from "lucide-react";
import { useState } from "react";

export type Page =
  | "home"
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
  | "support";

// ── Top Bar ──────────────────────────────────────────────────────────────────
export function TopBar() {
  return (
    <div className="bg-secondary text-white text-xs py-2 hidden md:block">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5 opacity-80">
            <Shield className="w-3 h-3" />
            IATA Accredited Travel Technology Platform
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="tel:+911725000004"
            className="flex items-center gap-1.5 hover:text-accent transition-colors duration-150"
            data-ocid="topbar.phone.link"
          >
            <Phone className="w-3 h-3" />
            +91-1725000004
          </a>
          <span className="opacity-30">|</span>
          <a
            href="mailto:customerservice@fivestartravel.in"
            className="flex items-center gap-1.5 hover:text-accent transition-colors duration-150"
            data-ocid="topbar.email.link"
          >
            <Mail className="w-3 h-3" />
            customerservice@fivestartravel.in
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Header / Nav ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-navy-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2"
          data-ocid="nav.logo.link"
        >
          <img
            src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
            alt="FiveStar Travel"
            className="h-10 w-auto object-contain"
          />
        </button>

        <nav
          className="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-150"
              onClick={() => onNavigate("home")}
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/30 text-primary hover:bg-primary/5 hover:border-accent/50"
            onClick={() => onNavigate("login")}
            data-ocid="nav.login.button"
          >
            Agent Login
          </Button>
          <Button
            size="sm"
            className="btn-orange rounded-full font-semibold px-5"
            onClick={() => onNavigate("register")}
            data-ocid="nav.signup.primary_button"
          >
            Register Free
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.mobile_menu.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 py-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-foreground/80 hover:text-accent py-1"
              onClick={() => {
                setMobileOpen(false);
                onNavigate("home");
              }}
              data-ocid={`nav.mobile.${link.label.toLowerCase().replace(/\s/g, "_")}.link`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-primary/30 text-primary"
              onClick={() => {
                setMobileOpen(false);
                onNavigate("login");
              }}
              data-ocid="nav.mobile_login.button"
            >
              Agent Login
            </Button>
            <Button
              size="sm"
              className="w-full btn-orange rounded-full"
              onClick={() => {
                setMobileOpen(false);
                onNavigate("register");
              }}
              data-ocid="nav.mobile_signup.primary_button"
            >
              Register Free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export function Hero({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section
      id="home"
      className="hero-gradient grain-overlay relative overflow-hidden py-20 md:py-28"
    >
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-white/90 text-xs font-medium tracking-wide">
              Trusted by 147,000+ Travel Agents Across India
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Power Your Travel Business with{" "}
            <span className="text-accent">India's #1</span> B2B Platform
          </h1>

          <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            Our technology enables travel buyers and suppliers to come together
            and seamlessly create joyful experiences for travellers all over the
            world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button
              size="lg"
              className="btn-orange font-semibold shadow-glow rounded-xl px-8"
              onClick={() => onNavigate("register")}
              data-ocid="hero.become_agent.primary_button"
            >
              Become an Agent
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent rounded-xl px-8"
              data-ocid="hero.explore_services.secondary_button"
            >
              Explore Platform
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm text-white/60">
            {["No setup fee", "Instant approval", "24x7 support"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span className="text-white/80">{t}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
        <div className="glass-card rounded-xl p-4 text-white w-52 float-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-200" />
            </div>
            <span className="text-xs font-medium text-white/70">
              Live Booking
            </span>
          </div>
          <p className="text-sm font-semibold">DEL → DXB</p>
          <p className="text-xs text-white/60 mt-0.5">
            ₹24,500 · Economy · IndiGo
          </p>
        </div>
        <div className="glass-card rounded-xl p-4 text-white w-52 ml-6 float-card-delayed">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/30 flex items-center justify-center">
              <Hotel className="w-4 h-4 text-green-200" />
            </div>
            <span className="text-xs font-medium text-white/70">Confirmed</span>
          </div>
          <p className="text-sm font-semibold">Atlantis, Dubai</p>
          <p className="text-xs text-white/60 mt-0.5">
            ₹18,200 / night · Deluxe
          </p>
        </div>
        <div className="glass-card rounded-xl p-4 text-white w-52 float-card">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/30 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-amber-200" />
            </div>
            <span className="text-xs font-medium text-white/70">
              Today's Earnings
            </span>
          </div>
          <p className="text-sm font-semibold text-accent">₹1,24,800</p>
          <p className="text-xs text-white/60 mt-0.5">+18% vs last week</p>
        </div>
      </div>
    </section>
  );
}

// ── Stats Bar ─────────────────────────────────────────────────────────────────
const STATS = [
  { value: "147,000+", label: "Travel Buyers", icon: Users },
  { value: "60+", label: "Hotel Suppliers", icon: Hotel },
  { value: "24x7", label: "Customer Support", icon: HeadphonesIcon },
  { value: "2000+", label: "API Customers Worldwide", icon: Globe },
];

export function StatsBar() {
  return (
    <section className="bg-primary py-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/20">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center px-4 stat-animate"
              style={{ animationDelay: `${i * 0.1}s` }}
              data-ocid={`stats.item.${i + 1}`}
            >
              <stat.icon className="w-6 h-6 text-accent mb-2" />
              <span className="font-display text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-white/60 text-sm mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Services Section ──────────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Plane,
    title: "Flight Booking",
    desc: "Global flights via Amadeus, Sabre & Travelport GDS. Fare comparison, seat selection & baggage add-ons.",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    desc: "60+ hotel suppliers including Hotelbeds, TBO, Expedia & WebBeds. Instant confirmation worldwide.",
  },
  {
    icon: Package,
    title: "Holiday Packages",
    desc: "Curated packages for honeymoon, family & corporate travel with markup control and B2C resell.",
  },
  {
    icon: Car,
    title: "Transfers",
    desc: "Airport, city, and hotel transfers with multiple vehicle options via HolidayTaxis, Jayride & Mozio.",
  },
  {
    icon: FileText,
    title: "Visa Services",
    desc: "eVisa and sticker visa processing for 190+ countries with document checklist and status tracking.",
  },
  {
    icon: Ship,
    title: "Cruise Booking",
    desc: "Premium cruise inventory from leading cruise lines with cabin selection and real-time pricing.",
  },
  {
    icon: Train,
    title: "Railway Booking",
    desc: "Indian Railways integration with PNR status, berth selection, and tatkal booking support.",
  },
  {
    icon: TrendingUp,
    title: "Wallet & Payments",
    desc: "Instant credit line, wallet top-up, multi-currency support, and automated reconciliation.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-accent/10 text-accent border-accent/20 mb-4">
            Our Services
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything Your Agency Needs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A complete travel technology stack — from booking engines to payment
            solutions, built for modern B2B travel agencies.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className="group card-lift bg-white border border-border rounded-2xl p-6 hover:border-accent/30"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <svc.icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                {svc.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Work With Us ──────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Zap,
    title: "Instant Bookings",
    desc: "Real-time inventory with sub-2 second response times across all modules.",
  },
  {
    icon: Shield,
    title: "IATA Accredited",
    desc: "Fully compliant with IATA standards and industry regulations for B2B travel.",
  },
  {
    icon: Award,
    title: "Best Commission",
    desc: "Highest agent margins in the industry with transparent markup controls.",
  },
  {
    icon: HeadphonesIcon,
    title: "24x7 Dedicated Support",
    desc: "Round-the-clock expert support with an average response time under 2 minutes.",
  },
  {
    icon: Globe,
    title: "Global Inventory",
    desc: "Access to 1M+ hotels, 1000+ airlines, and 190+ visa destinations worldwide.",
  },
  {
    icon: Building2,
    title: "White Label Ready",
    desc: "Launch your own branded portal in under 24 hours with custom domain & branding.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section
      id="about"
      className="py-20"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.14 0.07 262) 0%, oklch(0.18 0.08 258) 100%)",
      }}
    >
      <div className="container">
        <div className="text-center mb-14">
          <Badge className="bg-white/10 text-white/80 border-white/20 mb-4">
            Why Choose Us
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Built for Serious Travel Professionals
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Enterprise-grade technology that scales with your business — from
            solo agents to large agencies.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="glass-card rounded-2xl p-6 group hover:border-white/30 transition-all duration-200"
              data-ocid={`features.item.${i + 1}`}
            >
              <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                <feat.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-white mb-2">
                {feat.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Platinum Banner ───────────────────────────────────────────────────────────
export function PlatinumBanner({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  return (
    <section
      className="py-16"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.55 0.15 75) 0%, oklch(0.65 0.22 42) 60%, oklch(0.60 0.18 50) 100%)",
      }}
    >
      <div className="container text-center">
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-5">
          <Star className="w-7 h-7 text-white fill-white" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
          Become a Platinum Partner
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Unlock premium rates, dedicated account manager, priority support, and
          exclusive destination deals.
        </p>
        <Button
          size="lg"
          className="bg-white text-amber-700 hover:bg-white/90 font-semibold rounded-xl px-8 shadow-premium"
          onClick={() => onNavigate("register")}
          data-ocid="platinum.join.primary_button"
        >
          Apply for Platinum
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────────
export function CTASection({
  onNavigate,
}: { onNavigate: (page: Page) => void }) {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="bg-primary rounded-2xl px-8 py-14 text-center relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, oklch(0.65 0.22 42) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <Badge className="bg-white/10 text-white/80 border-white/20 mb-5">
              Get Started Today
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Travel Business?
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Join 147,000+ agents already booking with FiveStar Travel. No
              setup fee, instant approval.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="btn-orange rounded-xl font-semibold px-8 shadow-glow"
                onClick={() => onNavigate("register")}
                data-ocid="cta.register.primary_button"
              >
                Create Free Account
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 bg-transparent rounded-xl"
                onClick={() => onNavigate("login")}
                data-ocid="cta.login.secondary_button"
              >
                Agent Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export function Footer({ onNavigate }: { onNavigate?: (page: Page) => void }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-secondary text-white">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              type="button"
              onClick={() => onNavigate?.("home")}
              className="mb-4 block"
              data-ocid="footer.logo.link"
            >
              <div className="bg-white/90 rounded-lg px-2 py-1.5 inline-flex items-center">
                <img
                  src="/assets/uploads/Screenshot_20260310_040546_Samsung-Internet-1.jpg"
                  alt="FiveStar Travel"
                  className="h-7 w-auto object-contain"
                />
              </div>
            </button>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              India's leading B2B travel technology platform powering 147,000+
              travel agents worldwide.
            </p>
            <div className="flex items-center gap-3">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com",
                  name: "facebook",
                },
                { icon: Twitter, href: "https://twitter.com", name: "twitter" },
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  name: "instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  name: "linkedin",
                },
                { icon: Youtube, href: "https://youtube.com", name: "youtube" },
              ].map(({ icon: Icon, href, name }, i) => (
                <a
                  key={name}
                  href={href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors duration-150"
                  data-ocid={`footer.social.link.${i + 1}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "Flight Booking",
                "Hotel Booking",
                "Holiday Packages",
                "Visa Services",
                "Transfers",
                "Cruises",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-white/60 hover:text-accent transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                "About Us",
                "Careers",
                "Press",
                "Blog",
                "Partner Program",
                "Sitemap",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="/about"
                    className="text-white/60 hover:text-accent transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact">
            <h4 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                SCO 48 Sector 30C, Chandigarh, India
              </li>
              <li>
                <a
                  href="tel:+911725000004"
                  className="flex items-center gap-2.5 text-white/60 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  +91-1725000004
                </a>
              </li>
              <li>
                <a
                  href="mailto:customerservice@fivestartravel.in"
                  className="flex items-center gap-2.5 text-white/60 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  customerservice@fivestartravel.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="premium-divider" />

      <div className="container py-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>
            © {year} FiveStar Travel · CIN: U63030MH2018PTC314938 · All rights
            reserved.
          </p>
          <p>
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent/80 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
export function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <div>
      <TopBar />
      <Header onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <StatsBar />
      <ServicesSection />
      <WhyWorkWithUs />
      <PlatinumBanner onNavigate={onNavigate} />
      <CTASection onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
