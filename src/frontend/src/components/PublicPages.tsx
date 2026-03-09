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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2"
          data-ocid="nav.logo.link"
        >
          <img
            src="/assets/uploads/image-1.png"
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
              className="nav-link text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-150"
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
            className="border-primary/30 text-primary hover:bg-primary/5"
            onClick={() => onNavigate("login")}
            data-ocid="nav.login.button"
          >
            Agent Login
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
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
              className="block text-sm font-medium text-foreground/80 hover:text-primary py-1"
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
              className="w-full bg-primary text-primary-foreground"
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
          <Badge className="mb-5 bg-white/10 text-white border-white/20 text-xs font-medium px-3 py-1">
            <Star className="w-3 h-3 mr-1.5 fill-yellow-400 text-yellow-400" />
            India's #1 B2B Travel Distribution Platform
          </Badge>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            India's Leading{" "}
            <span className="text-accent">Travel Distribution</span> Platform
          </h1>

          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
            Our technology enables travel buyers and suppliers to come together
            and seamlessly create joyful experiences for travellers all over the
            world.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="font-semibold bg-accent text-white hover:bg-accent/90 shadow-lg"
              onClick={() => onNavigate("register")}
              data-ocid="hero.become_agent.primary_button"
            >
              Become an Agent
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="font-semibold border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent"
              data-ocid="hero.explore_services.secondary_button"
            >
              Explore Services
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-5 text-sm text-white/60">
            {["No setup fee", "Instant approval", "24x7 support"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 opacity-90">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white w-52">
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
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white w-52 ml-6">
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
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-white w-52">
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
              <stat.icon className="w-7 h-7 text-white/60 mb-2" />
              <span className="font-display text-3xl md:text-4xl font-bold text-white">
                {stat.value}
              </span>
              <span className="text-white/70 text-sm mt-1">{stat.label}</span>
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
    title: "Tour Packages",
    desc: "Group tours, private tours, sightseeing & holiday packages via Viator, GetYourGuide & Klook.",
  },
  {
    icon: Car,
    title: "Transfers",
    desc: "Airport & city transfers via HolidayTaxis, Jayride & Mozio. Reliable & comfortable rides.",
  },
  {
    icon: FileText,
    title: "Visa Services",
    desc: "End-to-end visa assistance with OCR passport reading, online e-Visa & offline checklist support.",
  },
  {
    icon: Ship,
    title: "Cruise Booking",
    desc: "Cruise routes, cabins & itineraries from top cruise lines. Luxury sailing experiences worldwide.",
  },
  {
    icon: Train,
    title: "Railway Booking",
    desc: "Indian Railways & international rail tickets. Fast, reliable train booking for all destinations.",
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    desc: "Comprehensive travel insurance covering medical, trip cancellation & baggage loss protection.",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Our Services
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything Your Agents Need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            One platform. All travel products. Seamlessly integrated with global
            suppliers for instant booking and maximum margins.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <div
              key={service.title}
              className="card-lift rounded-xl p-6 border border-border bg-card group cursor-pointer"
              data-ocid={`services.item.${i + 1}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-base text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Learn more <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Why Work With Us ──────────────────────────────────────────────────────────
const WHY_POINTS = [
  {
    icon: Zap,
    title: "Single XML Integration",
    desc: "Connect once to access all LCC & full-service domestic carriers through a single powerful API.",
  },
  {
    icon: Globe,
    title: "60+ Hotel Suppliers",
    desc: "Largest hotel supplier network in India with instant room availability and competitive rates.",
  },
  {
    icon: HeadphonesIcon,
    title: "24x7 Customer & Technical Support",
    desc: "Round-the-clock expert support for all your booking queries, technical issues and emergencies.",
  },
  {
    icon: Users,
    title: "2000+ API Customers Worldwide",
    desc: "Trusted by thousands of travel agents, OTAs and tour operators across the globe.",
  },
];

export function WhyWorkWithUs() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.23 0.03 255) 0%, oklch(0.30 0.06 260) 100%)",
      }}
    >
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-white/10 text-white border-white/20">
              Why Work With Us
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Empowering 147,000+ Travel Agents Across India
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              FiveStar Travel has built India's most comprehensive B2B travel
              distribution platform — connecting buyers and suppliers through
              cutting-edge technology with 21 offices across India.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Best Travel Technology 2023",
                "IATA Accredited",
                "ISO 9001:2015",
              ].map((award) => (
                <div
                  key={award}
                  className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs text-white/80"
                >
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  {award}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WHY_POINTS.map((point, i) => (
              <div
                key={point.title}
                className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-xl p-5 hover:bg-white/12 transition-colors duration-200"
                data-ocid={`why.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/30 flex items-center justify-center mb-3">
                  <point.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-white text-sm mb-2">
                  {point.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Platinum Banner ───────────────────────────────────────────────────────────
export function PlatinumBanner() {
  return (
    <section className="py-10 bg-muted border-y border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 p-7 md:p-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center flex-shrink-0">
              <Star className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-0.5">
                Exclusive
              </p>
              <h3 className="font-display text-xl font-bold text-foreground">
                The Platinum Collection
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Handpicked hotels offering world-class service, luxurious
                amenities &amp; unforgettable experiences.
              </p>
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow-lg flex-shrink-0"
            data-ocid="platinum.explore.primary_button"
          >
            Explore Collection
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
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
    <section id="destinations" className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="rounded-2xl bg-primary overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 20px, white 20px, white 21px)",
            }}
          />
          <div className="relative z-10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white max-w-xl">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Grow Your Travel Business?
              </h2>
              <p className="text-white/75 text-lg leading-relaxed">
                Join 147,000+ travel agents who trust FiveStar Travel for their
                booking needs. Get access to global inventory, competitive
                pricing and dedicated support.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-xl"
                onClick={() => onNavigate("register")}
                data-ocid="cta.register.primary_button"
              >
                Start Free — No Setup Fee
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 bg-transparent font-semibold"
                data-ocid="cta.contact.secondary_button"
              >
                Talk to Our Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Services: [
    "Flight Booking",
    "Hotel Booking",
    "Tour Packages",
    "Transfers",
    "Visa Services",
    "Cruise Booking",
  ],
  Company: [
    "About Us",
    "Careers",
    "News & Events",
    "Awards",
    "Contact Us",
    "Sitemap",
  ],
  Agents: [
    "Become an Agent",
    "Agent Login",
    "Agent Dashboard",
    "API Integration",
    "Supplier Login",
    "DMC Portal",
  ],
  Legal: [
    "Privacy Policy",
    "Terms & Conditions",
    "Refund Policy",
    "Payment Security",
    "Compliance",
    "CSR",
  ],
};

const SOCIAL_LINKS = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-secondary text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10">
          <div className="lg:col-span-2">
            <img
              src="/assets/uploads/image-1.png"
              alt="FiveStar Travel"
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              India's leading B2B travel distribution platform empowering
              147,000+ travel agents with global inventory and cutting-edge
              technology.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                <span>SCO 48, Sector 30C, Chandigarh, India</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 flex-shrink-0 text-accent" />
                <a
                  href="tel:01725000004"
                  className="hover:text-white transition-colors"
                  data-ocid="footer.phone.link"
                >
                  01725000004
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 flex-shrink-0 text-accent" />
                <a
                  href="mailto:customerservice@fivestartravel.in"
                  className="hover:text-white transition-colors"
                  data-ocid="footer.email.link"
                >
                  customerservice@fivestartravel.in
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href="/"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-150"
                  data-ocid={`footer.${social.label.toLowerCase()}.link`}
                >
                  <social.icon className="w-4 h-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-sm text-white mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                      className="text-sm text-white/55 hover:text-white transition-colors duration-150"
                      data-ocid={`footer.${link.toLowerCase().replace(/\s/g, "_")}.link`}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {year} FiveStar Travel. All rights reserved.</span>
            <span>CIN: U63030MH2018PTC314938</span>
          </div>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors"
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Home Page composite ───────────────────────────────────────────────────────
export function HomePage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <StatsBar />
      <ServicesSection />
      <WhyWorkWithUs />
      <PlatinumBanner />
      <CTASection onNavigate={onNavigate} />
    </>
  );
}
