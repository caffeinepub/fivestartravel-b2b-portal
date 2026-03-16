import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Code,
  Cpu,
  DollarSign,
  FileText,
  Globe,
  HeadphonesIcon,
  Heart,
  Hotel,
  Lock,
  Mail,
  MapPin,
  Phone,
  Plane,
  Search,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import type { Page } from "./PublicPages";
import { Footer } from "./PublicPages";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

// ── Shared Scroll Reveal ─────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          o.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return { ref, v };
}

const BRAND = {
  dark: "#0F172A",
  blue: "#2563EB",
  orange: "#F97316",
  green: "#10B981",
};

function PageHero({
  badge,
  title,
  subtitle,
  gradient,
}: {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  gradient?: string;
}) {
  return (
    <section
      className="py-20 grain-overlay"
      style={{
        background:
          gradient || `linear-gradient(135deg, ${BRAND.dark} 0%, #1E3A8A 100%)`,
      }}
    >
      <div className="container relative z-10 text-center">
        <div
          className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
          style={{
            background: "rgba(249,115,22,0.15)",
            border: "1px solid rgba(249,115,22,0.3)",
            color: BRAND.orange,
          }}
        >
          {badge}
        </div>
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          {title}
        </h1>
        <p
          className="text-white/65 text-lg max-w-2xl mx-auto"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// API INTEGRATION PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function ApiIntegrationPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const ENDPOINTS = [
    {
      method: "GET",
      path: "/fms/v1/air-search-all",
      desc: "Search flights across all suppliers",
      tag: "Flights",
    },
    {
      method: "POST",
      path: "/hms/v3/hotel/listing",
      desc: "Hotel availability and pricing",
      tag: "Hotels",
    },
    {
      method: "POST",
      path: "/oms/v1/air/book",
      desc: "Book a flight itinerary",
      tag: "Flights",
    },
    {
      method: "POST",
      path: "/oms/v3/hotel/book",
      desc: "Book a hotel room",
      tag: "Hotels",
    },
    {
      method: "GET",
      path: "/visa/v1/country-list",
      desc: "Get visa requirements by country",
      tag: "Visa",
    },
    {
      method: "POST",
      path: "/transfers/v1/search",
      desc: "Search transfer options",
      tag: "Transfers",
    },
  ];
  const FEATURES = [
    {
      icon: Zap,
      title: "REST API",
      desc: "Modern RESTful JSON API with OpenAPI 3.0 spec and comprehensive documentation.",
      color: BRAND.blue,
    },
    {
      icon: Code,
      title: "XML Feed",
      desc: "Legacy XML feed for seamless integration with existing travel software.",
      color: BRAND.orange,
    },
    {
      icon: Globe,
      title: "Real-time Pricing",
      desc: "Live pricing from 50+ global suppliers refreshed every 15 minutes.",
      color: BRAND.green,
    },
    {
      icon: Shield,
      title: "Sandbox Environment",
      desc: "Full sandbox with test credentials to develop and validate without risk.",
      color: "#8B5CF6",
    },
    {
      icon: Clock,
      title: "Rate Limits",
      desc: "Flexible rate limits: 1,000/day free, 50,000/day on Business plan.",
      color: "#F59E0B",
    },
    {
      icon: Lock,
      title: "Secure Auth",
      desc: "API key + HMAC authentication with IP whitelisting and audit logs.",
      color: "#EF4444",
    },
  ];
  const STEPS = [
    {
      n: "01",
      title: "Get API Key",
      desc: "Register your account and get your API key from the developer dashboard instantly.",
    },
    {
      n: "02",
      title: "Test in Sandbox",
      desc: "Use our sandbox environment with test data to build and validate your integration.",
    },
    {
      n: "03",
      title: "Go Live",
      desc: "Switch to production credentials. Our team reviews and activates your live access.",
    },
    {
      n: "04",
      title: "24/7 Support",
      desc: "Dedicated API support team and Slack channel for enterprise integrations.",
    },
  ];
  const { ref, v } = useReveal();
  return (
    <div>
      <PageHero
        badge="Developer API"
        title={
          <>
            Integrate Global Travel{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Inventory
            </span>
          </>
        }
        subtitle="Connect your system to flights, hotels, visa, transfers & more through a single unified API."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
            >
              API Features
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" ref={ref}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-200 transition-all"
                style={{
                  opacity: v ? 1 : 0,
                  transform: v ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.5s ease ${i * 0.08}s`,
                }}
                data-ocid={`api.feature.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18` }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: BRAND.dark }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" style={{ background: BRAND.dark }}>
        <div className="container">
          <h2
            className="text-2xl font-bold text-white mb-8"
            style={{ fontFamily: "'Sora',sans-serif" }}
          >
            API Endpoints
          </h2>
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full" data-ocid="api.endpoints.table">
              <thead>
                <tr style={{ background: "rgba(37,99,235,0.3)" }}>
                  <th className="text-left p-4 text-white/80 text-sm">
                    Method
                  </th>
                  <th className="text-left p-4 text-white/80 text-sm">
                    Endpoint
                  </th>
                  <th className="text-left p-4 text-white/80 text-sm">
                    Description
                  </th>
                  <th className="text-left p-4 text-white/80 text-sm">
                    Module
                  </th>
                </tr>
              </thead>
              <tbody>
                {ENDPOINTS.map((ep, i) => (
                  <tr
                    key={ep.path}
                    className="border-t border-white/10 hover:bg-white/5"
                    data-ocid={`api.endpoint.item.${i + 1}`}
                  >
                    <td className="p-4">
                      <span
                        className="px-2 py-1 rounded text-xs font-bold"
                        style={{
                          background:
                            ep.method === "GET" ? "#10B98120" : "#F9731620",
                          color: ep.method === "GET" ? "#10B981" : "#F97316",
                        }}
                      >
                        {ep.method}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-sm text-blue-300">
                      {ep.path}
                    </td>
                    <td className="p-4 text-white/60 text-sm">{ep.desc}</td>
                    <td className="p-4">
                      <Badge className="bg-white/10 text-white/70 border-white/20">
                        {ep.tag}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="mt-8 rounded-2xl p-6 border border-white/10"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <p className="text-white/60 text-sm mb-3 font-semibold">
              Sample Request: Flight Search
            </p>
            <pre
              className="text-green-400 text-xs overflow-x-auto"
              style={{ fontFamily: "monospace" }}
            >{`POST /fms/v1/air-search-all
Authorization: ApiKey YOUR_API_KEY
Content-Type: application/json

{
  "searchQuery": {
    "cabinClass": "ECONOMY",
    "paxInfo": { "ADULT": 1, "CHILD": 0, "INFANT": 0 },
    "routeInfos": [
      { "fromCityOrAirport": { "code": "DEL" }, "toCityOrAirport": { "code": "BOM" }, "travelDate": "2026-04-15" }
    ]
  }
}`}</pre>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container">
          <h2
            className="text-3xl font-bold text-center mb-12"
            style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
          >
            Integration Steps
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                className="text-center"
                data-ocid={`api.step.item.${i + 1}`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-black"
                  style={{
                    background: `linear-gradient(135deg,${BRAND.blue},${BRAND.orange})`,
                    color: "white",
                    fontFamily: "'Sora',sans-serif",
                  }}
                >
                  {s.n}
                </div>
                <h3 className="font-bold mb-2" style={{ color: BRAND.dark }}>
                  {s.title}
                </h3>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              size="lg"
              className="rounded-xl font-bold px-8"
              style={{
                background: `linear-gradient(135deg,${BRAND.blue},#1E40AF)`,
                color: "white",
                border: "none",
              }}
              onClick={() => onNavigate("register")}
              data-ocid="api.register.primary_button"
            >
              Get Your API Key <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AGENT REGISTRATION PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function AgentRegistrationPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    iata: "",
    gst: "",
    pan: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name) e.name = "Required";
    if (!form.company) e.company = "Required";
    if (!form.email || !form.email.includes("@"))
      e.email = "Valid email required";
    if (!form.phone || form.phone.length < 10) e.phone = "Valid phone required";
    if (!form.password || form.password.length < 8)
      e.password = "Min 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    if (!form.agree) e.agree = "Please accept terms";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length === 0) setSubmitted(true);
  }

  const BENEFITS = [
    {
      icon: TrendingUp,
      title: "Up to 12% Commission",
      desc: "Earn highest margins on flights, hotels, and packages.",
    },
    {
      icon: Globe,
      title: "Global Inventory",
      desc: "500+ airlines, 1M+ hotels, visa for 190+ countries.",
    },
    {
      icon: Zap,
      title: "Instant Confirmation",
      desc: "Real-time booking with instant voucher delivery.",
    },
    {
      icon: HeadphonesIcon,
      title: "24×7 Support",
      desc: "Dedicated helpline and email support for all agents.",
    },
  ];

  return (
    <div>
      <PageHero
        badge="Join FiveStarTravel"
        title={
          <>
            Register as{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Travel Agent
            </span>
          </>
        }
        subtitle="Start booking global travel inventory with exclusive B2B rates. Free registration, instant access."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {submitted ? (
                <div
                  className="bg-white rounded-2xl p-10 text-center border-2 border-green-200"
                  data-ocid="agent_reg.success_state"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2
                    className="text-2xl font-bold mb-3"
                    style={{ color: BRAND.dark }}
                  >
                    Registration Submitted!
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Our team will verify your account within 24 hours. You'll
                    receive your login credentials by email.
                  </p>
                  <Button
                    onClick={() => onNavigate("home")}
                    data-ocid="agent_reg.home.button"
                  >
                    Back to Home
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white rounded-2xl p-8 border border-gray-200"
                  data-ocid="agent_reg.form"
                >
                  <h2
                    className="text-xl font-bold mb-6"
                    style={{ color: BRAND.dark }}
                  >
                    Agent Registration Form
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        key: "name",
                        label: "Full Name *",
                        placeholder: "Rahul Sharma",
                      },
                      {
                        key: "company",
                        label: "Company / Agency Name *",
                        placeholder: "Sharma Travels",
                      },
                      {
                        key: "iata",
                        label: "IATA / TIDS Number",
                        placeholder: "Optional",
                      },
                      {
                        key: "gst",
                        label: "GST Number",
                        placeholder: "Optional",
                      },
                      {
                        key: "pan",
                        label: "PAN Number",
                        placeholder: "ABCDE1234F",
                      },
                      {
                        key: "email",
                        label: "Email Address *",
                        placeholder: "rahul@travels.com",
                      },
                      {
                        key: "phone",
                        label: "Phone Number *",
                        placeholder: "+91 9876543210",
                      },
                      { key: "city", label: "City *", placeholder: "Mumbai" },
                      {
                        key: "state",
                        label: "State",
                        placeholder: "Maharashtra",
                      },
                    ].map((field) => (
                      <div key={field.key}>
                        <p
                          className="block text-sm font-semibold mb-1"
                          style={{ color: BRAND.dark }}
                        >
                          {field.label}
                        </p>
                        <input
                          className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          style={{
                            borderColor: errors[field.key]
                              ? "#EF4444"
                              : "#E5E7EB",
                          }}
                          placeholder={field.placeholder}
                          value={
                            (form as Record<string, string | boolean>)[
                              field.key
                            ] as string
                          }
                          onChange={(e) =>
                            setForm((f) => ({
                              ...f,
                              [field.key]: e.target.value,
                            }))
                          }
                          data-ocid={`agent_reg.${field.key}.input`}
                        />
                        {errors[field.key] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[field.key]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div>
                      <p
                        className="block text-sm font-semibold mb-1"
                        style={{ color: BRAND.dark }}
                      >
                        Password *
                      </p>
                      <input
                        type="password"
                        className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                          borderColor: errors.password ? "#EF4444" : "#E5E7EB",
                        }}
                        placeholder="Min 8 characters"
                        value={form.password}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, password: e.target.value }))
                        }
                        data-ocid="agent_reg.password.input"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>
                    <div>
                      <p
                        className="block text-sm font-semibold mb-1"
                        style={{ color: BRAND.dark }}
                      >
                        Confirm Password *
                      </p>
                      <input
                        type="password"
                        className="w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        style={{
                          borderColor: errors.confirm ? "#EF4444" : "#E5E7EB",
                        }}
                        placeholder="Repeat password"
                        value={form.confirm}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, confirm: e.target.value }))
                        }
                        data-ocid="agent_reg.confirm.input"
                      />
                      {errors.confirm && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.confirm}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agree"
                      checked={form.agree}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, agree: e.target.checked }))
                      }
                      className="mt-1"
                      data-ocid="agent_reg.terms.checkbox"
                    />
                    <label htmlFor="agree" className="text-sm text-gray-600">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-blue-600 underline"
                        onClick={() => onNavigate("terms")}
                      >
                        Terms & Conditions
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-blue-600 underline"
                        onClick={() => onNavigate("privacy")}
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </div>
                  {errors.agree && (
                    <p className="text-red-500 text-xs mt-1">{errors.agree}</p>
                  )}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-6 rounded-xl font-bold"
                    style={{
                      background: `linear-gradient(135deg,${BRAND.blue},#1E40AF)`,
                      color: "white",
                      border: "none",
                    }}
                    data-ocid="agent_reg.submit_button"
                  >
                    Register as Agent <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <p className="text-center text-sm text-gray-500 mt-4">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-600 font-semibold"
                      onClick={() => onNavigate("login")}
                      data-ocid="agent_reg.login.link"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </div>
            <div className="space-y-4">
              <div
                className="rounded-2xl p-6"
                style={{
                  background: `linear-gradient(135deg,${BRAND.dark},#1E3A8A)`,
                }}
              >
                <h3 className="text-white font-bold text-lg mb-4">
                  Agent Benefits
                </h3>
                <div className="space-y-4">
                  {BENEFITS.map((b) => (
                    <div key={b.title} className="flex gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(249,115,22,0.2)" }}
                      >
                        <b.icon
                          className="w-4 h-4"
                          style={{ color: BRAND.orange }}
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">
                          {b.title}
                        </p>
                        <p className="text-white/60 text-xs">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-6 border border-gray-200 bg-white">
                <h3 className="font-bold mb-3" style={{ color: BRAND.dark }}>
                  Already a member?
                </h3>
                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => onNavigate("login")}
                  data-ocid="agent_reg.login.button"
                >
                  Agent Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPPLIER PORTAL PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function SupplierPortalPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({
    company: "",
    type: "",
    contact: "",
    email: "",
    phone: "",
    website: "",
    desc: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const TYPES = [
    "Hotel / Resort",
    "Tour Operator",
    "Transfer Company",
    "Cruise Line",
    "Visa Services",
    "Insurance Provider",
  ];
  const BENEFITS = [
    {
      icon: Users,
      title: "50,000+ Active Agents",
      desc: "Instant access to verified travel agents across India and 40+ countries.",
    },
    {
      icon: Zap,
      title: "Real-time Booking Sync",
      desc: "Automated inventory sync via API or manual extranet upload.",
    },
    {
      icon: DollarSign,
      title: "Automated Payouts",
      desc: "Weekly payouts directly to your bank account with detailed settlement reports.",
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      desc: "Live dashboard showing bookings, revenue, and conversion rates by channel.",
    },
  ];

  return (
    <div>
      <PageHero
        badge="Supplier Portal"
        title={
          <>
            List Your Services{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#10B981,#34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              on FiveStarTravel
            </span>
          </>
        }
        subtitle="Reach 50,000+ verified travel agents. List your hotels, tours, transfers, and more."
        gradient="linear-gradient(135deg,#0F172A 0%,#064E3B 100%)"
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2
                className="text-2xl font-bold mb-6"
                style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
              >
                Why Become a Supplier?
              </h2>
              <div className="space-y-4">
                {BENEFITS.map((b) => (
                  <div
                    key={b.title}
                    className="flex gap-4 bg-white rounded-xl p-4 border border-gray-200"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(16,185,129,0.15)" }}
                    >
                      <b.icon
                        className="w-5 h-5"
                        style={{ color: BRAND.green }}
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: BRAND.dark }}
                      >
                        {b.title}
                      </p>
                      <p className="text-gray-500 text-sm">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              {submitted ? (
                <div
                  className="bg-white rounded-2xl p-10 text-center border-2 border-green-200"
                  data-ocid="supplier.success_state"
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: BRAND.dark }}
                  >
                    Application Received!
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Our supplier onboarding team will contact you within 48
                    hours.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="bg-white rounded-2xl p-8 border border-gray-200"
                  data-ocid="supplier.form"
                >
                  <h2
                    className="text-xl font-bold mb-6"
                    style={{ color: BRAND.dark }}
                  >
                    Supplier Application
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        key: "company",
                        label: "Company Name *",
                        placeholder: "Your Company",
                      },
                      {
                        key: "contact",
                        label: "Contact Person *",
                        placeholder: "Full Name",
                      },
                      {
                        key: "email",
                        label: "Business Email *",
                        placeholder: "info@company.com",
                      },
                      {
                        key: "phone",
                        label: "Phone Number *",
                        placeholder: "+91 9876543210",
                      },
                      {
                        key: "website",
                        label: "Website",
                        placeholder: "https://",
                      },
                    ].map((f) => (
                      <div key={f.key}>
                        <p
                          className="block text-sm font-semibold mb-1"
                          style={{ color: BRAND.dark }}
                        >
                          {f.label}
                        </p>
                        <input
                          className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder={f.placeholder}
                          value={(form as Record<string, string>)[f.key]}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, [f.key]: e.target.value }))
                          }
                          data-ocid={`supplier.${f.key}.input`}
                        />
                      </div>
                    ))}
                    <div>
                      <p
                        className="block text-sm font-semibold mb-1"
                        style={{ color: BRAND.dark }}
                      >
                        Business Type *
                      </p>
                      <select
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={form.type}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, type: e.target.value }))
                        }
                        data-ocid="supplier.type.select"
                      >
                        <option value="">Select type...</option>
                        {TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p
                        className="block text-sm font-semibold mb-1"
                        style={{ color: BRAND.dark }}
                      >
                        Brief Description
                      </p>
                      <textarea
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                        rows={3}
                        placeholder="Tell us about your services..."
                        value={form.desc}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, desc: e.target.value }))
                        }
                        data-ocid="supplier.desc.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full rounded-xl font-bold"
                      style={{
                        background: `linear-gradient(135deg,${BRAND.green},#059669)`,
                        color: "white",
                        border: "none",
                      }}
                      data-ocid="supplier.submit_button"
                    >
                      Submit Application <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREERS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function CareersPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    letter: "",
  });
  const [appSubmitted, setAppSubmitted] = useState(false);

  const JOBS = [
    {
      title: "Senior React Developer",
      dept: "Engineering",
      location: "Chandigarh",
      type: "Full-time",
      desc: "Build and maintain our agent portal frontend using React, TypeScript, and Tailwind CSS. 4+ years React experience required.",
    },
    {
      title: "Travel API Integration Engineer",
      dept: "Engineering",
      location: "Remote",
      type: "Full-time",
      desc: "Integrate global travel supplier APIs (flights, hotels, visa). Strong Node.js and REST API knowledge required.",
    },
    {
      title: "Business Development Manager",
      dept: "Sales",
      location: "Delhi / Mumbai",
      type: "Full-time",
      desc: "Drive agent acquisition and revenue growth across North/West India. 5+ years B2B travel sales experience.",
    },
    {
      title: "Customer Support Executive",
      dept: "Operations",
      location: "Chandigarh",
      type: "Full-time",
      desc: "24/7 support for agents on bookings, cancellations, and account issues. Fluent Hindi and English required.",
    },
    {
      title: "UI/UX Designer",
      dept: "Design",
      location: "Chandigarh / Remote",
      type: "Full-time",
      desc: "Design premium travel portal interfaces. Proficiency in Figma and experience with SaaS products required.",
    },
    {
      title: "Travel Operations Executive",
      dept: "Operations",
      location: "Chandigarh",
      type: "Full-time",
      desc: "Handle hotel, flight, and visa operations, supplier coordination, and booking management.",
    },
  ];
  const DEPT_COLORS: Record<string, string> = {
    Engineering: BRAND.blue,
    Sales: BRAND.orange,
    Operations: BRAND.green,
    Design: "#8B5CF6",
  };
  const PERKS = [
    {
      icon: Heart,
      title: "Health Insurance",
      desc: "Comprehensive medical cover for you and family",
    },
    {
      icon: Globe,
      title: "Travel Perks",
      desc: "Annual travel allowance and discounted bookings",
    },
    {
      icon: BookOpen,
      title: "Learning Budget",
      desc: "₹30,000/year for courses, certifications, conferences",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      desc: "Remote-friendly with flexible work timings",
    },
  ];

  return (
    <div>
      <PageHero
        badge="Careers"
        title={
          <>
            Join the{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              FiveStarTravel
            </span>{" "}
            Team
          </>
        }
        subtitle="Help us build the future of B2B travel technology in India and beyond."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <h2
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
          >
            Open Positions
          </h2>
          <div className="space-y-4">
            {JOBS.map((job, i) => (
              <div
                key={job.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                data-ocid={`careers.job.item.${i + 1}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge
                        style={{
                          background: `${DEPT_COLORS[job.dept]}20`,
                          color: DEPT_COLORS[job.dept],
                          border: "none",
                        }}
                      >
                        {job.dept}
                      </Badge>
                      <Badge variant="outline">{job.location}</Badge>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ color: BRAND.dark }}
                    >
                      {job.title}
                    </h3>
                    <p className="text-sm text-gray-500">{job.desc}</p>
                  </div>
                  <Button
                    onClick={() => {
                      setSelectedJob(i);
                      setAppSubmitted(false);
                    }}
                    data-ocid={`careers.apply.button.${i + 1}`}
                    style={{
                      background: `linear-gradient(135deg,${BRAND.blue},#1E40AF)`,
                      color: "white",
                      border: "none",
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedJob !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)" }}
          data-ocid="careers.apply.modal"
        >
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: BRAND.dark }}>
                Apply: {JOBS[selectedJob].title}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="text-gray-400 hover:text-gray-700"
                data-ocid="careers.apply.close_button"
              >
                ✕
              </button>
            </div>
            {appSubmitted ? (
              <div
                className="text-center py-8"
                data-ocid="careers.apply.success_state"
              >
                <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">
                  Application Submitted!
                </h3>
                <p className="text-gray-500 text-sm">
                  Our HR team will review your application and reach out within
                  5 business days.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => setSelectedJob(null)}
                  data-ocid="careers.apply.done.button"
                >
                  Close
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAppSubmitted(true);
                }}
                data-ocid="careers.apply.form"
              >
                <div className="space-y-4">
                  {[
                    {
                      key: "name",
                      label: "Full Name *",
                      placeholder: "Your name",
                    },
                    {
                      key: "email",
                      label: "Email *",
                      placeholder: "you@example.com",
                    },
                    {
                      key: "phone",
                      label: "Phone *",
                      placeholder: "+91 9876543210",
                    },
                    {
                      key: "linkedin",
                      label: "LinkedIn URL",
                      placeholder: "https://linkedin.com/in/",
                    },
                  ].map((f) => (
                    <div key={f.key}>
                      <p
                        className="block text-sm font-semibold mb-1"
                        style={{ color: BRAND.dark }}
                      >
                        {f.label}
                      </p>
                      <input
                        className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={f.placeholder}
                        value={(appForm as Record<string, string>)[f.key]}
                        onChange={(e) =>
                          setAppForm((p) => ({ ...p, [f.key]: e.target.value }))
                        }
                        data-ocid={`careers.apply.${f.key}.input`}
                      />
                    </div>
                  ))}
                  <div>
                    <p
                      className="block text-sm font-semibold mb-1"
                      style={{ color: BRAND.dark }}
                    >
                      Cover Letter
                    </p>
                    <textarea
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={4}
                      placeholder="Why do you want to join FiveStarTravel?"
                      value={appForm.letter}
                      onChange={(e) =>
                        setAppForm((p) => ({ ...p, letter: e.target.value }))
                      }
                      data-ocid="careers.apply.letter.textarea"
                    />
                  </div>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400">
                      Upload Resume (PDF, DOC)
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      data-ocid="careers.apply.upload_button"
                    >
                      Choose File
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-xl font-bold"
                    style={{
                      background: `linear-gradient(135deg,${BRAND.blue},#1E40AF)`,
                      color: "white",
                      border: "none",
                    }}
                    data-ocid="careers.apply.submit_button"
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="container">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: BRAND.dark }}
          >
            Employee Perks
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="text-center p-6 rounded-2xl border border-gray-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{ background: "rgba(249,115,22,0.12)" }}
                >
                  <p.icon className="w-6 h-6" style={{ color: BRAND.orange }} />
                </div>
                <h3 className="font-bold mb-1" style={{ color: BRAND.dark }}>
                  {p.title}
                </h3>
                <p className="text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BLOG PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function BlogPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const CATEGORIES = [
    "All",
    "Technology",
    "Industry News",
    "Agent Tips",
    "Destination Guides",
    "API Updates",
  ];
  const ARTICLES = [
    {
      id: 0,
      cat: "Technology",
      title: "TripJack API v3 Integration Guide",
      excerpt:
        "A complete guide to integrating TripJack's latest API for hotel and flight bookings, covering authentication, endpoints, and error handling.",
      author: "Dev Team",
      date: "Mar 10, 2026",
      readTime: "8 min read",
      gradient: "linear-gradient(135deg,#2563EB,#1E40AF)",
    },
    {
      id: 1,
      cat: "Agent Tips",
      title: "Top 10 Strategies for Travel Agents in 2026",
      excerpt:
        "Discover how top-performing agents are using technology, markup tools, and package bundling to increase margins by up to 30%.",
      author: "Rohit Mehta",
      date: "Mar 5, 2026",
      readTime: "6 min read",
      gradient: "linear-gradient(135deg,#F97316,#EA580C)",
    },
    {
      id: 2,
      cat: "Technology",
      title: "GDS vs Direct API: What's Best for Your Business?",
      excerpt:
        "We break down the pros and cons of using GDS providers (Amadeus, Sabre) vs direct airline APIs for your travel agency.",
      author: "Dev Team",
      date: "Feb 28, 2026",
      readTime: "7 min read",
      gradient: "linear-gradient(135deg,#8B5CF6,#7C3AED)",
    },
    {
      id: 3,
      cat: "Destination Guides",
      title: "Maldives: Top Packages for Indian Travellers",
      excerpt:
        "The Maldives is more accessible than ever. Here are the best B2B package deals with commission structures for Indian travel agents.",
      author: "Ananya Kapoor",
      date: "Feb 20, 2026",
      readTime: "5 min read",
      gradient: "linear-gradient(135deg,#06B6D4,#0891B2)",
    },
    {
      id: 4,
      cat: "Industry News",
      title: "New eVisa Countries Added in 2026",
      excerpt:
        "India has expanded its eVisa program to 20 new countries. Here's what travel agents need to know about the updated visa requirements.",
      author: "Operations Team",
      date: "Feb 15, 2026",
      readTime: "4 min read",
      gradient: "linear-gradient(135deg,#10B981,#059669)",
    },
    {
      id: 5,
      cat: "Agent Tips",
      title: "How to Maximize Commission with Package Bundling",
      excerpt:
        "Learn how to combine flights, hotels, and activities into high-margin packages using FiveStarTravel's Package Builder module.",
      author: "Vikram Singh",
      date: "Feb 10, 2026",
      readTime: "5 min read",
      gradient: "linear-gradient(135deg,#EF4444,#DC2626)",
    },
    {
      id: 6,
      cat: "API Updates",
      title: "New Viator API Integration for Tour Bookings",
      excerpt:
        "FiveStarTravel now supports Viator Partner API v2 for real-time tour and activity bookings across 190+ countries.",
      author: "Dev Team",
      date: "Feb 1, 2026",
      readTime: "6 min read",
      gradient: "linear-gradient(135deg,#F59E0B,#D97706)",
    },
    {
      id: 7,
      cat: "Industry News",
      title: "India B2B Travel Market to Reach $50B by 2028",
      excerpt:
        "A new report highlights the massive growth opportunity in India's B2B travel market, driven by digital adoption and Tier-2 city expansion.",
      author: "Editorial",
      date: "Jan 25, 2026",
      readTime: "4 min read",
      gradient: "linear-gradient(135deg,#0F172A,#1E3A8A)",
    },
  ];

  const filtered =
    activeCategory === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.cat === activeCategory);
  const article =
    selectedArticle !== null
      ? ARTICLES.find((a) => a.id === selectedArticle)
      : null;

  return (
    <div>
      <PageHero
        badge="Blog"
        title={
          <>
            Travel Industry{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Insights & News
            </span>
          </>
        }
        subtitle="Stay updated with the latest in travel technology, industry trends, and agent success strategies."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          {article ? (
            <div className="max-w-3xl mx-auto">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-blue-600 font-semibold mb-6 hover:gap-3 transition-all"
                data-ocid="blog.back.button"
              >
                ← Back to Blog
              </button>
              <div
                className="rounded-2xl overflow-hidden mb-6"
                style={{ height: 240, background: article.gradient }}
              />
              <Badge
                style={{
                  background: `${BRAND.blue}20`,
                  color: BRAND.blue,
                  border: "none",
                }}
              >
                {article.cat}
              </Badge>
              <h1
                className="text-3xl font-bold mt-3 mb-4"
                style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
              >
                {article.title}
              </h1>
              <div className="flex gap-4 text-sm text-gray-400 mb-6">
                <span>By {article.author}</span>
                <span>{article.date}</span>
                <span>{article.readTime}</span>
              </div>
              <div className="prose prose-lg text-gray-700 leading-relaxed">
                <p>{article.excerpt}</p>
                <p className="mt-4">
                  This is a detailed article about {article.title.toLowerCase()}
                  . Our expert team has compiled comprehensive insights to help
                  travel agents and technology partners make informed decisions.
                  The travel industry is rapidly evolving, and staying ahead of
                  the curve is essential for business growth.
                </p>
                <p className="mt-4">
                  Whether you're a new agent just starting out or an established
                  agency looking to scale, these insights will help you navigate
                  the complex landscape of modern travel technology and business
                  development strategies.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2 mb-8">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                    style={{
                      background: activeCategory === cat ? BRAND.blue : "white",
                      color: activeCategory === cat ? "white" : "#64748B",
                      border: `1px solid ${activeCategory === cat ? BRAND.blue : "#E5E7EB"}`,
                    }}
                    data-ocid="blog.category.tab"
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((a, i) => (
                  <div
                    key={a.id}
                    className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                    data-ocid={`blog.article.item.${i + 1}`}
                  >
                    <div style={{ height: 160, background: a.gradient }} />
                    <div className="p-5">
                      <Badge
                        style={{
                          background: `${BRAND.blue}20`,
                          color: BRAND.blue,
                          border: "none",
                          marginBottom: 8,
                        }}
                      >
                        {a.cat}
                      </Badge>
                      <h3
                        className="font-bold text-base mb-2"
                        style={{ color: BRAND.dark }}
                      >
                        {a.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {a.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>
                          {a.date} · {a.readTime}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedArticle(a.id)}
                          className="font-semibold"
                          style={{ color: BRAND.blue }}
                          data-ocid={`blog.read_more.button.${i + 1}`}
                        >
                          Read More →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELP CENTER PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function HelpCenterPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const [tab, setTab] = useState("Getting Started");
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const FAQS: Record<string, { q: string; a: string }[]> = {
    "Getting Started": [
      {
        q: "How do I register as a travel agent?",
        a: "Visit the Agent Registration page, fill in your company details, and submit. Our team verifies accounts within 24 hours. You'll receive login credentials by email.",
      },
      {
        q: "How do I add funds to my wallet?",
        a: "Go to Wallet in your dashboard. Click Add Funds, choose UPI, NetBanking, or Card, enter the amount, and complete payment. Funds reflect instantly.",
      },
      {
        q: "What documents are needed for KYC?",
        a: "You need: PAN card (mandatory), GST certificate (if applicable), business registration proof, and a selfie with PAN card. Upload in Profile > KYC section.",
      },
      {
        q: "How do I book my first flight?",
        a: "From your dashboard, click Flights. Enter route, date, and passengers. Select a fare, review details, and confirm with your wallet balance.",
      },
      {
        q: "How do I set up agent markup?",
        a: "Go to Dashboard > White Label > Commission Settings. Set markup as a flat amount or percentage per service type (flights, hotels, etc.).",
      },
    ],
    Bookings: [
      {
        q: "How do I cancel a booking?",
        a: "Go to My Bookings, find the booking, click Cancel. You'll see the cancellation policy and penalty before confirming. Refund goes to your wallet within 2-4 hours.",
      },
      {
        q: "Can I book on hold and pay later?",
        a: "Yes, for flights that support hold bookings. On the booking confirmation screen, select 'Hold Booking'. You'll have 24 hours to confirm with payment.",
      },
      {
        q: "How do I download the e-ticket or voucher?",
        a: "In My Bookings, click on the booking reference. At the top right, click 'Download Voucher' or 'E-Ticket PDF'. The file downloads automatically.",
      },
      {
        q: "What is session timeout and how to handle it?",
        a: "Search results expire after 15–30 minutes due to live pricing. If you see a session timeout error, simply search again to get fresh pricing.",
      },
      {
        q: "How quickly is the ticket delivered?",
        a: "Instant confirmation tickets are delivered within 30 seconds. Airline-issued tickets may take 5–15 minutes. Hotel vouchers are instant.",
      },
    ],
    Payments: [
      {
        q: "What payment methods are accepted?",
        a: "UPI (Google Pay, PhonePe, BHIM), Net Banking (50+ banks), Credit/Debit Cards (Visa, Mastercard, RuPay), and wallet balance.",
      },
      {
        q: "How long do refunds take?",
        a: "Wallet refunds are instant. For credit card refunds, it takes 5–7 business days depending on your bank. Net Banking refunds take 3–5 days.",
      },
      {
        q: "Can I get a GST invoice?",
        a: "Yes. All bookings generate a GST invoice automatically. Download from My Bookings > Invoice. Monthly consolidated invoices available in Reports.",
      },
      {
        q: "How do I transfer wallet balance to a sub-agent?",
        a: "Go to Wallet > Transfer Funds. Enter the sub-agent's registered email or agent code, amount, and confirm. Transfer is instant.",
      },
      {
        q: "Is my payment information secure?",
        a: "Yes. All payments are processed through PCI-DSS Level 1 certified payment gateways. We never store card details on our servers.",
      },
    ],
    API: [
      {
        q: "How do I get an API key?",
        a: "Register as an agent. Once your account is verified, go to Profile > Developer Settings > API Keys. Generate your key and note down the secret.",
      },
      {
        q: "Is there a sandbox for testing?",
        a: "Yes. Use the base URL https://apitest.tripjack.com/ with your sandbox API key for all testing. Sandbox data doesn't affect live bookings.",
      },
      {
        q: "What are the API rate limits?",
        a: "Free tier: 1,000 calls/day. Business plan: 50,000 calls/day. Enterprise: unlimited with SLA. Contact api@fivestartravel.in for enterprise plans.",
      },
      {
        q: "XML vs REST API — which should I use?",
        a: "Use REST API for new integrations — it's faster, better documented, and supports all modules. XML feed is available for legacy systems that require it.",
      },
      {
        q: "Do you support webhooks?",
        a: "Yes. Webhooks are available for booking status changes (confirmed, cancelled, amended). Configure webhook URLs in your API settings dashboard.",
      },
    ],
    Account: [
      {
        q: "How do I change my password?",
        a: "Go to Profile > Security > Change Password. Enter your current password, then your new password twice, and confirm.",
      },
      {
        q: "How do I update company details?",
        a: "Go to Profile > Company Details. Update your company name, address, GST, and contact info. Changes take effect immediately.",
      },
      {
        q: "How do I add sub-agents?",
        a: "Go to White Label > Sub-Agents > Add New Agent. Enter their name, email, and commission structure. They receive an invite email to complete registration.",
      },
      {
        q: "How long does KYC verification take?",
        a: "KYC verification typically takes 2–4 business hours. You'll receive an email confirmation once your account is fully verified.",
      },
      {
        q: "What happens if my account is suspended?",
        a: "You'll receive an email with the reason. Contact our support team at customerservice@fivestartravel.in with your account details to resolve the issue.",
      },
    ],
    Cancellations: [
      {
        q: "What is the cancellation policy?",
        a: "Cancellation policies vary by supplier and booking type. Always check the specific policy shown during booking before confirming.",
      },
      {
        q: "How are penalty charges calculated?",
        a: "Penalties are specified in slabs based on how far in advance you cancel. For example, 10% before 7 days, 25% within 7 days, 100% within 24 hours (varies by supplier).",
      },
      {
        q: "How long do cancellation refunds take?",
        a: "Wallet refunds are processed within 2–4 hours of cancellation. The net refund (after penalties) is credited to your agent wallet automatically.",
      },
      {
        q: "How do I raise a dispute for a cancellation?",
        a: "Go to My Bookings > find the booking > Raise Dispute. Describe the issue and attach any screenshots. Our team responds within 4 business hours.",
      },
      {
        q: "Can I partially cancel a multi-passenger booking?",
        a: "Partial cancellations depend on the airline/supplier policy. For flights, you can typically cancel individual passengers from the amendment section.",
      },
    ],
  };

  const TABS = Object.keys(FAQS);
  const allFaqs = Object.values(FAQS).flat();
  const displayFaqs = search
    ? allFaqs.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase()),
      )
    : FAQS[tab] || [];

  return (
    <div>
      <PageHero
        badge="Help Center"
        title={
          <>
            How can we{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              help you?
            </span>
          </>
        }
        subtitle="Find answers to common questions or contact our support team."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container max-w-4xl">
          <div className="relative mb-8">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search help articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="help.search_input"
            />
          </div>
          {!search && (
            <div className="flex flex-wrap gap-2 mb-8">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
                  style={{
                    background: tab === t ? BRAND.blue : "white",
                    color: tab === t ? "white" : "#64748B",
                    border: `1px solid ${tab === t ? BRAND.blue : "#E5E7EB"}`,
                  }}
                  data-ocid="help.category.tab"
                >
                  {t}
                </button>
              ))}
            </div>
          )}
          <div className="space-y-3">
            {displayFaqs.map((faq, i) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden"
                data-ocid={`help.faq.item.${i + 1}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenFaq(openFaq === faq.q ? null : faq.q)}
                  data-ocid={`help.faq.toggle.${i + 1}`}
                >
                  <span
                    className="font-semibold text-sm"
                    style={{ color: BRAND.dark }}
                  >
                    {faq.q}
                  </span>
                  {openFaq === faq.q ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === faq.q && (
                  <div className="px-5 pb-5 text-sm text-gray-600 border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
            {displayFaqs.length === 0 && (
              <p className="text-center text-gray-400 py-8">
                No results found for "{search}"
              </p>
            )}
          </div>
          <div
            className="mt-12 rounded-2xl p-8 text-center"
            style={{
              background: `linear-gradient(135deg,${BRAND.dark},#1E3A8A)`,
            }}
          >
            <HeadphonesIcon
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: BRAND.orange }}
            />
            <h3 className="text-xl font-bold text-white mb-2">
              Still need help?
            </h3>
            <p className="text-white/60 text-sm mb-4">
              Our support team is available 24×7 via phone and email.
            </p>
            <Button
              onClick={() => onNavigate("contact")}
              style={{
                background: `linear-gradient(135deg,${BRAND.orange},#EA580C)`,
                color: "white",
                border: "none",
              }}
              data-ocid="help.contact.button"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function TermsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const SECTIONS = [
    {
      n: "1",
      title: "Definitions",
      content: `"Platform" refers to FiveStarTravel.in and all associated web portals, APIs, and mobile applications. "Agent" refers to any registered travel agent or business entity accessing the platform. "Booking" refers to any flight, hotel, visa, transfer, tour, cruise, or railway reservation made through the platform. "Wallet" refers to the prepaid credit balance maintained in the agent's account.`,
    },
    {
      n: "2",
      title: "Acceptance of Terms",
      content:
        "By registering and using the FiveStarTravel platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use the platform. These terms may be updated periodically, and continued use constitutes acceptance of the updated terms.",
    },
    {
      n: "3",
      title: "User Registration & Account",
      content:
        "Registration is open to verified travel agents and businesses only. All information provided during registration must be accurate and current. Each account is for a single business entity. Account sharing with unregistered parties is prohibited. FiveStarTravel reserves the right to suspend accounts that violate these terms.",
    },
    {
      n: "4",
      title: "Booking & Payment Terms",
      content:
        "All bookings are subject to real-time availability and pricing. Prices displayed are in Indian Rupees (INR) unless stated otherwise. Payment is deducted from the agent wallet at the time of booking confirmation. Wallet must have sufficient balance to complete a booking. FiveStarTravel is not responsible for price changes between search and booking.",
    },
    {
      n: "5",
      title: "Cancellation & Refund Policy",
      content:
        "Cancellation policies are determined by the respective supplier (airline, hotel, etc.) and displayed at the time of booking. Refunds, net of applicable penalties, are credited to the agent wallet. FiveStarTravel does not guarantee refunds beyond what the supplier permits. Processing time for refunds is 2–7 business days depending on the payment method.",
    },
    {
      n: "6",
      title: "Agent Responsibilities",
      content:
        "Agents are responsible for verifying all booking details before confirmation. Agents must ensure passenger details, travel dates, and document requirements are accurate. FiveStarTravel is not liable for bookings made with incorrect information. Agents must comply with all applicable laws, including data protection and consumer rights regulations.",
    },
    {
      n: "7",
      title: "API Usage Terms",
      content:
        "API access is granted for integration purposes only and may not be resold or sublicensed. Rate limits must be respected. Automated scraping, excessive polling, or API abuse may result in immediate access termination. API keys must be kept confidential and must not be shared publicly.",
    },
    {
      n: "8",
      title: "Intellectual Property",
      content:
        "All platform content, including logos, design, code, documentation, and data, is the exclusive property of FiveStarTravel.in (CIN: U63030MH2018PTC314938). Unauthorized reproduction, distribution, or commercial use of any platform content is strictly prohibited and may result in legal action.",
    },
    {
      n: "9",
      title: "Limitation of Liability",
      content:
        "FiveStarTravel's liability is limited to the booking value. We are not liable for indirect, consequential, or incidental damages. Service disruptions due to third-party supplier issues, force majeure events, or internet outages are outside our control. In all cases, our maximum liability shall not exceed the transaction value.",
    },
    {
      n: "10",
      title: "Governing Law",
      content:
        "These terms are governed by the laws of India. Any disputes arising from platform use shall be subject to the exclusive jurisdiction of courts in Chandigarh, India. For dispute resolution, contact legal@fivestartravel.in before initiating legal proceedings.",
    },
  ];
  return (
    <div>
      <PageHero
        badge="Legal"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using the FiveStarTravel platform."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container max-w-4xl">
          <p className="text-sm text-gray-400 mb-8 text-right">
            Last updated: March 2026
          </p>
          <div className="space-y-6">
            {SECTIONS.map((s, i) => (
              <div
                key={s.n}
                className="bg-white rounded-2xl p-8 border border-gray-200"
                data-ocid={`terms.section.item.${i + 1}`}
              >
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
                >
                  {s.n}. {s.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Questions about our terms?{" "}
              <button
                type="button"
                className="text-blue-600 font-semibold"
                onClick={() => onNavigate("contact")}
                data-ocid="terms.contact.link"
              >
                Contact us
              </button>
            </p>
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIVACY PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function PrivacyPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const SECTIONS = [
    {
      n: "1",
      title: "Information We Collect",
      content:
        "We collect: (a) Account information — name, email, phone, company details, PAN, GST provided during registration. (b) Booking data — passenger details, travel preferences, payment records. (c) Usage data — IP address, browser type, pages visited, search queries, and interaction logs. (d) Device information — device type, OS, and app version for mobile users.",
    },
    {
      n: "2",
      title: "How We Use Your Information",
      content:
        "Your data is used to: process bookings and payments, send booking confirmations and invoices, provide customer support, send important platform updates and promotional offers (with opt-out), improve platform performance and personalization, comply with legal and regulatory requirements, and prevent fraud and unauthorized access.",
    },
    {
      n: "3",
      title: "Data Sharing",
      content:
        "We share your data with: (a) Travel suppliers (airlines, hotels, etc.) to fulfill bookings. (b) Payment gateways for secure transaction processing. (c) KYC and identity verification providers. (d) Analytics and performance monitoring tools. We do not sell your personal data to third parties. All data sharing is governed by strict data processing agreements.",
    },
    {
      n: "4",
      title: "Cookies Policy",
      content:
        "We use essential cookies for authentication and session management, and analytics cookies to understand platform usage. You can control cookie preferences in your browser settings. Disabling essential cookies may affect platform functionality. Third-party analytics tools (e.g., Google Analytics) may also set cookies on your device.",
    },
    {
      n: "5",
      title: "Data Retention",
      content:
        "Account data is retained for the duration of your account and for 7 years post-closure for legal and financial compliance. Booking records are retained for 10 years as required by Indian accounting and GST laws. You may request deletion of non-essential personal data by contacting privacy@fivestartravel.in.",
    },
    {
      n: "6",
      title: "Your Rights",
      content:
        "Under applicable data protection laws, you have the right to: access your personal data, correct inaccurate information, request deletion of your data (subject to legal retention requirements), object to data processing, data portability, and withdraw consent for marketing communications. Submit requests to privacy@fivestartravel.in.",
    },
    {
      n: "7",
      title: "Security",
      content:
        "We implement industry-standard security measures including: SSL/TLS encryption for all data transmission, PCI-DSS Level 1 compliance for payment data, role-based access controls for internal staff, regular security audits and penetration testing, and multi-factor authentication for admin accounts. Despite these measures, no system is 100% secure.",
    },
    {
      n: "8",
      title: "Contact for Privacy",
      content:
        "For privacy-related requests or concerns, contact our Data Protection Officer at: privacy@fivestartravel.in. You can also write to: Data Protection Officer, FiveStarTravel.in, SCO 48 Sector 30C, Chandigarh 160020, India. We respond to all privacy requests within 30 days.",
    },
  ];
  return (
    <div>
      <PageHero
        badge="Privacy"
        title="Privacy Policy"
        subtitle="We are committed to protecting your personal data and your privacy rights."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container max-w-4xl">
          <p className="text-sm text-gray-400 mb-8 text-right">
            Last updated: March 2026
          </p>
          <div className="space-y-6">
            {SECTIONS.map((s, i) => (
              <div
                key={s.n}
                className="bg-white rounded-2xl p-8 border border-gray-200"
                data-ocid={`privacy.section.item.${i + 1}`}
              >
                <h2
                  className="text-lg font-bold mb-3"
                  style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
                >
                  {s.n}. {s.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {s.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DISTRIBUTORS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function DistributorsPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const [form, setForm] = useState({
    company: "",
    contact: "",
    phone: "",
    email: "",
    agents: "",
    volume: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const BENEFITS = [
    {
      icon: Users,
      title: "Sub-Agent Management",
      desc: "Manage unlimited sub-agents with individual wallets, access controls, and performance tracking.",
    },
    {
      icon: DollarSign,
      title: "Override Commissions",
      desc: "Set custom markup levels per sub-agent type, route, or supplier for maximum profitability.",
    },
    {
      icon: Globe,
      title: "Branded Portal",
      desc: "White-label the booking portal with your own logo, colors, and domain name.",
    },
    {
      icon: HeadphonesIcon,
      title: "Priority Support",
      desc: "Dedicated account manager and priority support queue with 1-hour response SLA.",
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      desc: "Real-time reports on sub-agent performance, bookings, revenue, and commission payouts.",
    },
    {
      icon: Award,
      title: "Exclusive Deals",
      desc: "Early access to negotiated rates and exclusive inventory not available to individual agents.",
    },
  ];
  const TESTIMONIALS = [
    {
      name: "Suresh Patel",
      company: "SP Travel Network, Gujarat",
      quote:
        "Managing 50+ agents from a single platform has transformed our business. The override commission feature alone doubled our margins.",
      rating: 5,
      since: "2021",
    },
    {
      name: "Meena Iyer",
      company: "Iyer Tours Distribution, Chennai",
      quote:
        "The white-label portal lets us present a premium brand to our agents. Highly recommend FiveStarTravel for serious distributors.",
      rating: 5,
      since: "2022",
    },
  ];

  return (
    <div>
      <PageHero
        badge="Distributors"
        title={
          <>
            Become a{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Distribution Partner
            </span>
          </>
        }
        subtitle="Scale your travel business by managing a network of sub-agents with our powerful distribution platform."
        gradient="linear-gradient(135deg,#0F172A 0%,#4C1D95 100%)"
      />
      <section className="py-8" style={{ background: BRAND.dark }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Active Distributors" },
              { value: "25,000+", label: "Sub-Agents Managed" },
              { value: "₹500Cr+", label: "Annual GMV" },
              { value: "40+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p
                  className="text-3xl font-black"
                  style={{
                    color: BRAND.orange,
                    fontFamily: "'Sora',sans-serif",
                  }}
                >
                  {s.value}
                </p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
          >
            Distributor Benefits
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div
                key={b.title}
                className="bg-white rounded-2xl p-6 border border-gray-200"
                data-ocid={`distributors.benefit.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(139,92,246,0.12)" }}
                >
                  <b.icon className="w-6 h-6" style={{ color: "#8B5CF6" }} />
                </div>
                <h3 className="font-bold mb-2" style={{ color: BRAND.dark }}>
                  {b.title}
                </h3>
                <p className="text-sm text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container max-w-2xl">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
          >
            Apply as Distributor
          </h2>
          {submitted ? (
            <div
              className="text-center py-10"
              data-ocid="distributors.success_state"
            >
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3
                className="text-xl font-bold mb-2"
                style={{ color: BRAND.dark }}
              >
                Application Received!
              </h3>
              <p className="text-gray-500">
                Our partnerships team will reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
              data-ocid="distributors.form"
            >
              {[
                {
                  key: "company",
                  label: "Company Name *",
                  placeholder: "Your Distribution Company",
                },
                {
                  key: "contact",
                  label: "Contact Person *",
                  placeholder: "Full Name",
                },
                {
                  key: "email",
                  label: "Email *",
                  placeholder: "contact@company.com",
                },
                {
                  key: "phone",
                  label: "Phone *",
                  placeholder: "+91 9876543210",
                },
                {
                  key: "agents",
                  label: "Current Number of Sub-Agents",
                  placeholder: "e.g., 20",
                },
                {
                  key: "volume",
                  label: "Expected Monthly Booking Volume",
                  placeholder: "e.g., ₹50 Lakhs",
                },
              ].map((f) => (
                <div key={f.key}>
                  <p
                    className="block text-sm font-semibold mb-1"
                    style={{ color: BRAND.dark }}
                  >
                    {f.label}
                  </p>
                  <input
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder={f.placeholder}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, [f.key]: e.target.value }))
                    }
                    data-ocid={`distributors.${f.key}.input`}
                  />
                </div>
              ))}
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl font-bold"
                style={{
                  background: "linear-gradient(135deg,#8B5CF6,#7C3AED)",
                  color: "white",
                  border: "none",
                }}
                data-ocid="distributors.submit_button"
              >
                Submit Application <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </section>
      <section className="py-16" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <h2
            className="text-2xl font-bold text-center mb-8"
            style={{ color: BRAND.dark }}
          >
            What Our Distributors Say
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-200"
                data-ocid={`distributors.testimonial.item.${i + 1}`}
              >
                <div className="flex gap-1 mb-3">
                  <span className="flex gap-1">
                    {t.rating >= 1 && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {t.rating >= 2 && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {t.rating >= 3 && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {t.rating >= 4 && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {t.rating >= 5 && (
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </span>
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{t.quote}"</p>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ color: BRAND.dark }}
                  >
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {t.company} · Member since {t.since}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUPPLIERS PUBLIC PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function SuppliersPublicPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const CATEGORIES = [
    {
      icon: Hotel,
      title: "Hotels & Resorts",
      count: "850,000+",
      color: BRAND.blue,
    },
    { icon: Plane, title: "Airlines", count: "500+", color: BRAND.orange },
    {
      icon: Globe,
      title: "Tour Operators",
      count: "2,000+",
      color: BRAND.green,
    },
    {
      icon: Building2,
      title: "Transfer Companies",
      count: "300+",
      color: "#8B5CF6",
    },
    { icon: Shield, title: "Visa Services", count: "50+", color: "#06B6D4" },
    {
      icon: FileText,
      title: "Insurance Providers",
      count: "20+",
      color: "#F59E0B",
    },
  ];
  const INTEGRATIONS = [
    {
      method: "Direct API",
      desc: "REST or XML API for real-time inventory sync. Best for large suppliers.",
      icon: Cpu,
    },
    {
      method: "XML Feed",
      desc: "Daily or weekly XML feed for static inventory. Simple to implement.",
      icon: Code,
    },
    {
      method: "Manual Upload",
      desc: "CSV or Excel upload for small catalogs. No technical setup required.",
      icon: FileText,
    },
    {
      method: "Extranet",
      desc: "Browser-based portal for managing availability and pricing manually.",
      icon: Globe,
    },
  ];
  return (
    <div>
      <PageHero
        badge="For Suppliers"
        title={
          <>
            Supply Your Inventory to{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#10B981,#34D399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              50,000+ Agents
            </span>
          </>
        }
        subtitle="Connect your travel inventory to India's fastest-growing B2B travel distribution network."
        gradient="linear-gradient(135deg,#0F172A 0%,#064E3B 100%)"
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ color: BRAND.dark }}
          >
            Supplier Categories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((c, i) => (
              <div
                key={c.title}
                className="bg-white rounded-2xl p-6 border border-gray-200 flex items-center gap-4"
                data-ocid={`suppliers.category.item.${i + 1}`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}18` }}
                >
                  <c.icon className="w-7 h-7" style={{ color: c.color }} />
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: BRAND.dark }}>
                    {c.title}
                  </h3>
                  <p className="text-2xl font-black" style={{ color: c.color }}>
                    {c.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container">
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ color: BRAND.dark }}
          >
            Integration Methods
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INTEGRATIONS.map((int, i) => (
              <div
                key={int.method}
                className="text-center p-6 rounded-2xl border border-gray-200"
                data-ocid={`suppliers.integration.item.${i + 1}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${BRAND.green}18` }}
                >
                  <int.icon
                    className="w-6 h-6"
                    style={{ color: BRAND.green }}
                  />
                </div>
                <h3 className="font-bold mb-2" style={{ color: BRAND.dark }}>
                  {int.method}
                </h3>
                <p className="text-sm text-gray-500">{int.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="py-16 text-center"
        style={{ background: `linear-gradient(135deg,${BRAND.dark},#064E3B)` }}
      >
        <div className="container">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to list your inventory?
          </h2>
          <p className="text-white/60 mb-6">
            Join 3,000+ suppliers already on FiveStarTravel
          </p>
          <Button
            size="lg"
            className="rounded-xl font-bold px-8"
            style={{
              background: `linear-gradient(135deg,${BRAND.green},#059669)`,
              color: "white",
              border: "none",
            }}
            onClick={() => onNavigate("supplier-portal")}
            data-ocid="suppliers.apply.primary_button"
          >
            Apply as Supplier <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// API/XML PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function ApiXmlPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [tab, setTab] = useState<"rest" | "xml">("rest");

  const REST_ENDPOINTS = [
    {
      module: "Flights",
      endpoints: 12,
      desc: "Search, book, amend, and cancel flights",
    },
    {
      module: "Hotels",
      endpoints: 8,
      desc: "Availability, pricing, book, and manage hotel stays",
    },
    {
      module: "Visa",
      endpoints: 6,
      desc: "Country info, requirements, and application submission",
    },
    {
      module: "Transfers",
      endpoints: 5,
      desc: "Search and book airport and city transfers",
    },
    {
      module: "Tours",
      endpoints: 7,
      desc: "Tour search, details, booking, and cancellation",
    },
    {
      module: "Cruise",
      endpoints: 4,
      desc: "Cruise search, cabin selection, and booking",
    },
  ];
  const SDKS = [
    {
      lang: "JavaScript/Node.js",
      icon: "🟨",
      npm: "npm install @fivestar/travel-sdk",
    },
    { lang: "Python", icon: "🐍", npm: "pip install fivestar-travel" },
    { lang: "PHP", icon: "🐘", npm: "composer require fivestar/travel-api" },
    { lang: "Java", icon: "☕", npm: "Maven: com.fivestar:travel-api:1.4.0" },
  ];
  const PLANS = [
    {
      name: "Starter",
      price: "Free",
      calls: "1,000/day",
      features: ["Sandbox access", "REST API", "Basic support", "5 modules"],
    },
    {
      name: "Business",
      price: "₹5,000/mo",
      calls: "50,000/day",
      features: [
        "Production access",
        "REST + XML",
        "Priority support",
        "All modules",
        "Webhooks",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      calls: "Unlimited",
      features: [
        "Custom SLA",
        "Dedicated infra",
        "24/7 support",
        "Custom integration",
        "IP whitelisting",
      ],
    },
  ];

  return (
    <div>
      <PageHero
        badge="Developer Hub"
        title={
          <>
            API & XML{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Integration Hub
            </span>
          </>
        }
        subtitle="Connect to the FiveStarTravel platform via REST API or XML feed. Build faster with our SDKs."
      />
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="flex gap-2 mb-8 bg-white rounded-2xl p-1 w-fit border border-gray-200">
            <button
              type="button"
              onClick={() => setTab("rest")}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: tab === "rest" ? BRAND.blue : "transparent",
                color: tab === "rest" ? "white" : "#64748B",
              }}
              data-ocid="apixml.rest.tab"
            >
              REST API
            </button>
            <button
              type="button"
              onClick={() => setTab("xml")}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: tab === "xml" ? BRAND.blue : "transparent",
                color: tab === "xml" ? "white" : "#64748B",
              }}
              data-ocid="apixml.xml.tab"
            >
              XML Feed
            </button>
          </div>
          {tab === "rest" ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {REST_ENDPOINTS.map((ep, i) => (
                  <div
                    key={ep.module}
                    className="bg-white rounded-2xl p-5 border border-gray-200"
                    data-ocid={`apixml.endpoint.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold" style={{ color: BRAND.dark }}>
                        {ep.module}
                      </h3>
                      <Badge
                        style={{
                          background: `${BRAND.blue}20`,
                          color: BRAND.blue,
                          border: "none",
                        }}
                      >
                        {ep.endpoints} endpoints
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{ep.desc}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: BRAND.dark }}
                >
                  Available SDKs
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {SDKS.map((sdk, i) => (
                    <div
                      key={sdk.lang}
                      className="bg-white rounded-2xl p-4 border border-gray-200"
                      data-ocid={`apixml.sdk.item.${i + 1}`}
                    >
                      <div className="text-2xl mb-2">{sdk.icon}</div>
                      <p
                        className="font-semibold text-sm mb-1"
                        style={{ color: BRAND.dark }}
                      >
                        {sdk.lang}
                      </p>
                      <p className="text-xs font-mono text-gray-400 bg-gray-50 rounded-lg p-2">
                        {sdk.npm}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-gray-200">
                <h3
                  className="text-lg font-bold mb-4"
                  style={{ color: BRAND.dark }}
                >
                  XML Feed Structure
                </h3>
                <pre className="bg-gray-900 text-green-400 text-xs rounded-xl p-6 overflow-x-auto">{`<?xml version="1.0" encoding="UTF-8"?>
<FiveStarFeed version="2.1" generated="2026-03-15T10:00:00Z">
  <Hotels total="850000" updated="2026-03-15">
    <Hotel id="HTL001" supplier="Hotelbeds">
      <Name>The Grand Chandigarh</Name>
      <City>Chandigarh</City>
      <Country>IN</Country>
      <StarRating>5</StarRating>
      <Rooms available="12">
        <Room type="DELUXE" price="4500" currency="INR" />
        <Room type="SUITE" price="9800" currency="INR" />
      </Rooms>
    </Hotel>
  </Hotels>
</FiveStarFeed>`}</pre>
                <div className="mt-4 grid md:grid-cols-3 gap-4">
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.08)" }}
                  >
                    <p
                      className="font-bold text-sm"
                      style={{ color: BRAND.green }}
                    >
                      Update Frequency
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      Every 15 minutes for availability, daily for static data
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(37,99,235,0.08)" }}
                  >
                    <p
                      className="font-bold text-sm"
                      style={{ color: BRAND.blue }}
                    >
                      Compression
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      GZIP compressed for fast download
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-xl"
                    style={{ background: "rgba(249,115,22,0.08)" }}
                  >
                    <p
                      className="font-bold text-sm"
                      style={{ color: BRAND.orange }}
                    >
                      Authentication
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      API key in header or query param
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container">
          <h2
            className="text-2xl font-bold text-center mb-10"
            style={{ color: BRAND.dark }}
          >
            API Pricing Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 border-2 ${i === 1 ? "border-blue-500" : "border-gray-200"} ${i === 1 ? "bg-blue-50" : "bg-white"}`}
                data-ocid={`apixml.plan.item.${i + 1}`}
              >
                {i === 1 && (
                  <Badge
                    className="mb-3"
                    style={{
                      background: BRAND.blue,
                      color: "white",
                      border: "none",
                    }}
                  >
                    Most Popular
                  </Badge>
                )}
                <h3
                  className="text-xl font-black mb-1"
                  style={{ color: BRAND.dark, fontFamily: "'Sora',sans-serif" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-3xl font-black mb-1"
                  style={{ color: i === 1 ? BRAND.blue : BRAND.dark }}
                >
                  {plan.price}
                </p>
                <p className="text-sm text-gray-500 mb-6">
                  {plan.calls} API calls
                </p>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: BRAND.green }}
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full mt-6 rounded-xl"
                  style={{
                    background:
                      i === 1
                        ? `linear-gradient(135deg,${BRAND.blue},#1E40AF)`
                        : undefined,
                    color: i === 1 ? "white" : undefined,
                    border: i === 1 ? "none" : undefined,
                  }}
                  variant={i === 1 ? "default" : "outline"}
                  onClick={() => onNavigate("register")}
                  data-ocid={`apixml.plan.button.${i + 1}`}
                >
                  {i === 2 ? "Contact Sales" : "Get Started"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function TestimonialsPage({
  onNavigate,
}: { onNavigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");

  const ALL_TESTIMONIALS = [
    {
      name: "Rajesh Kumar",
      company: "RK Tours & Travels, Delhi",
      role: "Agent",
      quote:
        "FiveStarTravel has completely transformed how I run my agency. The flight booking speed is unmatched and the commission structure is excellent.",
      rating: 5,
      since: "2020",
    },
    {
      name: "Priya Nair",
      company: "Nair Holidays, Kochi",
      role: "Agent",
      quote:
        "The hotel module with TripJack integration gives me real-time availability I can trust. My clients love the instant confirmation.",
      rating: 5,
      since: "2021",
    },
    {
      name: "Amit Sharma",
      company: "Sharma Distribution Network, Jaipur",
      role: "Distributor",
      quote:
        "As a distributor with 80+ sub-agents, the white-label and override commission features are game-changers for our business model.",
      rating: 5,
      since: "2021",
    },
    {
      name: "Sneha Reddy",
      company: "Reddy Travels, Hyderabad",
      role: "Agent",
      quote:
        "The visa module saves me hours of paperwork. The OCR passport scan and automated document checklist is brilliant.",
      rating: 5,
      since: "2022",
    },
    {
      name: "Vikram Malhotra",
      company: "VM Global Hotels, Chandigarh",
      role: "Supplier",
      quote:
        "Since listing our hotel on FiveStarTravel, occupancy has increased by 35%. The agent network is huge and bookings are always instant.",
      rating: 5,
      since: "2022",
    },
    {
      name: "Farah Shaikh",
      company: "Shaikh Tours, Mumbai",
      role: "Agent",
      quote:
        "The wallet system and instant refunds make managing cash flow so much easier. Best B2B platform I've used in 15 years.",
      rating: 5,
      since: "2020",
    },
    {
      name: "Ravi Gupta",
      company: "Gupta Distribution Co., Lucknow",
      role: "Distributor",
      quote:
        "FiveStarTravel's analytics dashboard helps me track which sub-agents are performing and where to focus coaching efforts.",
      rating: 4,
      since: "2023",
    },
    {
      name: "Anita Bose",
      company: "Bose Travel Solutions, Kolkata",
      role: "Agent",
      quote:
        "The package builder module lets me create customized itineraries in minutes. My clients are always impressed with the professional vouchers.",
      rating: 5,
      since: "2022",
    },
    {
      name: "Deepak Tiwari",
      company: "Tiwari Resorts, Goa",
      role: "Supplier",
      quote:
        "The API integration was seamless. Our availability syncs automatically and we receive bookings from agents across the country 24/7.",
      rating: 5,
      since: "2023",
    },
    {
      name: "Kavita Singh",
      company: "Singh Holidays, Pune",
      role: "Agent",
      quote:
        "I switched from another platform and the difference in support quality is night and day. The 24/7 helpline actually works!",
      rating: 5,
      since: "2023",
    },
    {
      name: "Sanjay Mehta",
      company: "Mehta Travel Network, Ahmedabad",
      role: "Distributor",
      quote:
        "The sub-agent portal is incredibly intuitive. Even my agents who aren't tech-savvy adapted within a day.",
      rating: 4,
      since: "2023",
    },
    {
      name: "Lakshmi Iyer",
      company: "Chennai Holidays, Chennai",
      role: "Agent",
      quote:
        "Railway booking integration is a huge win. Now I can book trains and flights from the same platform for complete trip packages.",
      rating: 5,
      since: "2021",
    },
  ];

  const FILTERS = ["All", "Agents", "Distributors", "Suppliers"];
  const filtered =
    filter === "All"
      ? ALL_TESTIMONIALS
      : ALL_TESTIMONIALS.filter((t) => `${t.role}s` === filter);
  const ROLE_COLORS: Record<string, string> = {
    Agent: BRAND.blue,
    Distributor: "#8B5CF6",
    Supplier: BRAND.green,
  };

  return (
    <div>
      <PageHero
        badge="Testimonials"
        title={
          <>
            What Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#F97316,#FDBA74)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Partners Say
            </span>
          </>
        }
        subtitle="Trusted by 50,000+ travel agents, distributors, and suppliers across India and 40+ countries."
      />
      <section className="py-8" style={{ background: BRAND.dark }}>
        <div className="container">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center">
            {[
              { v: "50,000+", l: "Active Agents" },
              { v: "98%", l: "Satisfaction Rate" },
              { v: "4.8/5", l: "Average Rating" },
            ].map((s) => (
              <div key={s.l}>
                <p
                  className="text-3xl font-black"
                  style={{
                    color: BRAND.orange,
                    fontFamily: "'Sora',sans-serif",
                  }}
                >
                  {s.v}
                </p>
                <p className="text-white/60 text-sm mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20" style={{ background: "#F8FAFC" }}>
        <div className="container">
          <div className="flex gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: filter === f ? BRAND.blue : "white",
                  color: filter === f ? "white" : "#64748B",
                  border: `1px solid ${filter === f ? BRAND.blue : "#E5E7EB"}`,
                }}
                data-ocid="testimonials.filter.tab"
              >
                {f}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex gap-1">
                    <span className="flex gap-1">
                      {t.rating >= 1 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      {t.rating >= 2 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      {t.rating >= 3 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      {t.rating >= 4 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                      {t.rating >= 5 && (
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </span>
                  </div>
                  <Badge
                    style={{
                      background: `${ROLE_COLORS[t.role]}20`,
                      color: ROLE_COLORS[t.role],
                      border: "none",
                    }}
                  >
                    {t.role}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 italic mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white"
                    style={{ background: ROLE_COLORS[t.role] }}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p
                      className="font-bold text-sm"
                      style={{ color: BRAND.dark }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-400">
                      {t.company} · Since {t.since}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="py-16 text-center"
        style={{ background: `linear-gradient(135deg,${BRAND.dark},#1E3A8A)` }}
      >
        <div className="container">
          <h2 className="text-2xl font-bold text-white mb-4">
            Join 50,000+ travel professionals
          </h2>
          <Button
            size="lg"
            className="rounded-xl font-bold px-8"
            style={{
              background: `linear-gradient(135deg,${BRAND.orange},#EA580C)`,
              color: "white",
              border: "none",
            }}
            onClick={() => onNavigate("register")}
            data-ocid="testimonials.register.primary_button"
          >
            Register Free Today <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
