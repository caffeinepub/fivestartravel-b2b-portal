import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Building2,
  Check,
  Rocket,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Page } from "./PublicPages";

interface PricingPageProps {
  onNavigate: (page: Page) => void;
}

// ── Scroll Reveal Hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

// ── Check / X / Coming Soon cells ─────────────────────────────────────────────
function Yes() {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30">
      <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
    </span>
  );
}
function No() {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800">
      <X className="w-3.5 h-3.5 text-gray-400" />
    </span>
  );
}
function Soon() {
  return (
    <span className="inline-block px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-medium whitespace-nowrap">
      Coming Soon
    </span>
  );
}
function Text({ children }: { children: string }) {
  return (
    <span className="text-sm text-gray-700 dark:text-gray-300">{children}</span>
  );
}

// ── Feature Comparison Data ────────────────────────────────────────────────────
type Cell = React.ReactNode;
interface FeatureRow {
  feature: string;
  pro: Cell;
  elite: Cell;
  enterprise: Cell;
}
interface TableSection {
  title: string;
  rows: FeatureRow[];
}

const TABLE_SECTIONS: TableSection[] = [
  {
    title: "👥 Team & Usage",
    rows: [
      {
        feature: "Employee Logins",
        pro: <Text>5 logins</Text>,
        elite: <Text>20 logins</Text>,
        enterprise: <Text>Unlimited</Text>,
      },
      {
        feature: "Sessions per Month",
        pro: <Text>2,500</Text>,
        elite: <Text>7,500</Text>,
        enterprise: <Text>Negotiated</Text>,
      },
      {
        feature: "Training Hours/Year",
        pro: <Text>2 hours</Text>,
        elite: <Text>15 hours</Text>,
        enterprise: <Text>50+ hours</Text>,
      },
      {
        feature: "Customer Support SLA",
        pro: <Text>2 business days</Text>,
        elite: <Text>Same-day</Text>,
        enterprise: <Text>365×24×7</Text>,
      },
    ],
  },
  {
    title: "📦 Dynamic Packages Inventory",
    rows: [
      { feature: "Flights", pro: <Yes />, elite: <Yes />, enterprise: <Yes /> },
      {
        feature: "Hotels",
        pro: <Text>Single API</Text>,
        elite: <Text>Up to 3 APIs</Text>,
        enterprise: <Text>Multiple APIs + Offline Contracts</Text>,
      },
      {
        feature: "Activities",
        pro: <Text>APIs</Text>,
        elite: <Text>APIs</Text>,
        enterprise: <Text>APIs + Offline Contracts</Text>,
      },
      {
        feature: "Ground Transport",
        pro: <Text>Airport Transfers</Text>,
        elite: (
          <Text>Airport + Intercity + Intracity + Multicity + Hourly</Text>
        ),
        enterprise: <Text>All types + Offline Contracts</Text>,
      },
      {
        feature: "RailEurope",
        pro: <No />,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      { feature: "Ferries", pro: <No />, elite: <Yes />, enterprise: <Yes /> },
      {
        feature: "Insurance – India Outbound",
        pro: <Yes />,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "Self-drive Car Rentals",
        pro: <No />,
        elite: <No />,
        enterprise: <Soon />,
      },
      { feature: "Cruises", pro: <No />, elite: <No />, enterprise: <Soon /> },
    ],
  },
  {
    title: "🔍 Standalone Search Capabilities",
    rows: [
      { feature: "Flights", pro: <Yes />, elite: <Yes />, enterprise: <Yes /> },
      {
        feature: "Hotels",
        pro: <Text>Single API</Text>,
        elite: <Text>Up to 3 APIs</Text>,
        enterprise: <Text>Multiple APIs + Offline Contracts</Text>,
      },
      {
        feature: "Activities",
        pro: <Text>APIs</Text>,
        elite: <Text>APIs</Text>,
        enterprise: <Text>APIs + Offline Contracts</Text>,
      },
      {
        feature: "Ground Transport",
        pro: <Text>Airport Transfers</Text>,
        elite: (
          <Text>Airport + Intercity + Intracity + Multicity + Hourly</Text>
        ),
        enterprise: <Text>All types + Offline Contracts</Text>,
      },
      { feature: "Ferries", pro: <No />, elite: <Yes />, enterprise: <Yes /> },
      {
        feature: "Self-drive Car Rentals",
        pro: <No />,
        elite: <No />,
        enterprise: <Soon />,
      },
      { feature: "Cruises", pro: <No />, elite: <No />, enterprise: <Soon /> },
    ],
  },
  {
    title: "💻 Platform Access",
    rows: [
      {
        feature: "Desktop & Mobile Site",
        pro: <Yes />,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "SSO Implementation",
        pro: <No />,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "Native Mobile Apps (Ionic)",
        pro: <No />,
        elite: <No />,
        enterprise: <Yes />,
      },
    ],
  },
  {
    title: "🤖 AI Features",
    rows: [
      {
        feature: "Itinerary Description AI",
        pro: <Text>Limited Trial</Text>,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "AI Trip Assistant",
        pro: <No />,
        elite: <No />,
        enterprise: <Yes />,
      },
      {
        feature: "AI Hotel/Activity Filters",
        pro: <No />,
        elite: <No />,
        enterprise: <Yes />,
      },
      {
        feature: "Voice Search",
        pro: <No />,
        elite: <No />,
        enterprise: <Text>Add-on</Text>,
      },
    ],
  },
  {
    title: "🔧 Integrations & Customization",
    rows: [
      {
        feature: "Featured Packages",
        pro: <No />,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "API & Product Level Markups",
        pro: <Text>Product level only</Text>,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "Mark 'Recommended' Hotels & Activities",
        pro: <No />,
        elite: <No />,
        enterprise: <Yes />,
      },
      {
        feature: "Consumer Journey Customization",
        pro: <No />,
        elite: <Text>Minor UI/UX</Text>,
        enterprise: <Yes />,
      },
      {
        feature: "Customized Quotation Design",
        pro: <Text>White-labeled only</Text>,
        elite: <Text>White-labeled only</Text>,
        enterprise: <Yes />,
      },
      {
        feature: "Customized Customer Email Design",
        pro: <Text>White-labeled only</Text>,
        elite: <Yes />,
        enterprise: <Yes />,
      },
      {
        feature: "CRM Integrations",
        pro: <No />,
        elite: <No />,
        enterprise: <Yes />,
      },
      {
        feature: "Accounting Integrations",
        pro: <No />,
        elite: <No />,
        enterprise: <Yes />,
      },
      {
        feature: "Custom API Development",
        pro: <No />,
        elite: <Text>API Credentials Swap only</Text>,
        enterprise: <Text>On-demand</Text>,
      },
      {
        feature: "White-label Solutions",
        pro: <Text>Basic</Text>,
        elite: <Yes />,
        enterprise: <Yes />,
      },
    ],
  },
  {
    title: "⚡ Deployment",
    rows: [
      {
        feature: "Time to Deployment",
        pro: <Text>Instant</Text>,
        elite: <Text>15 business days</Text>,
        enterprise: <Text>1.5 – 3 months</Text>,
      },
    ],
  },
];

// ── Pricing Card ───────────────────────────────────────────────────────────────
interface PlanCardProps {
  icon: React.ReactNode;
  name: string;
  badge: string;
  price: string;
  priceNote?: string;
  commitment?: string;
  highlights: string[];
  ctaLabel: string;
  ctaVariant: "solid" | "gradient" | "outline";
  popular?: boolean;
  delay?: string;
  visible: boolean;
  onCta: () => void;
}

function PlanCard({
  icon,
  name,
  badge,
  price,
  priceNote,
  commitment,
  highlights,
  ctaLabel,
  ctaVariant,
  popular,
  delay = "0ms",
  visible,
  onCta,
}: PlanCardProps) {
  return (
    <div
      className={[
        "relative flex flex-col rounded-2xl p-8 transition-all duration-700",
        popular
          ? "bg-white dark:bg-gray-900 shadow-2xl ring-2 ring-[#2563eb] scale-[1.03] z-10"
          : "bg-white dark:bg-gray-900 shadow-lg ring-1 ring-gray-200 dark:ring-gray-800",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      ].join(" ")}
      style={{ transitionDelay: delay }}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            <Star className="w-3 h-3 fill-white" /> Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <div
          className={[
            "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
            popular ? "bg-[#2563eb]/10" : "bg-gray-100 dark:bg-gray-800",
          ].join(" ")}
        >
          {icon}
        </div>
        <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#f97316]/10 text-[#f97316] mb-3">
          {badge}
        </span>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
          {name}
        </h3>
      </div>

      <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
          {price}
        </div>
        {priceNote && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {priceNote}
          </div>
        )}
        {commitment && (
          <div className="text-xs text-[#f97316] font-medium mt-2">
            {commitment}
          </div>
        )}
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {highlights.map((h) => (
          <li
            key={h}
            className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
          >
            <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onCta}
        className={[
          "w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2",
          ctaVariant === "solid"
            ? "bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
            : ctaVariant === "gradient"
              ? "bg-gradient-to-r from-[#2563eb] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] text-white shadow-md hover:shadow-lg hover:scale-[1.02]"
              : "border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white hover:scale-[1.02]",
        ].join(" ")}
        data-ocid={`pricing.${name.toLowerCase().replace(/\s+/g, "_")}.button`}
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export function PricingPage({ onNavigate }: PricingPageProps) {
  const heroReveal = useReveal();
  const cardsReveal = useReveal();
  const tableReveal = useReveal();

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #2563eb, transparent)",
            }}
          />
          <div
            className="absolute -top-16 right-0 w-80 h-80 rounded-full opacity-10"
            style={{
              background: "radial-gradient(circle, #f97316, transparent)",
            }}
          />
        </div>

        <div
          ref={heroReveal.ref}
          className={`max-w-4xl mx-auto text-center transition-all duration-700 ${
            heroReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {/* AI badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border cursor-pointer transition-all hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)",
                borderColor: "rgba(37,99,235,0.3)",
                color: "#2563eb",
                animation: "shimmer 3s ease-in-out infinite",
              }}
              onClick={() => onNavigate("contact")}
              data-ocid="pricing.ai_badge.button"
            >
              <Sparkles className="w-4 h-4" />✨ Let our AI analyzer suggest the
              best plan for you
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
            Choose Your{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #2563eb, #7c3aed)",
              }}
            >
              Perfect Plan
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Scalable travel technology solutions for every business size — from
            startups to enterprise organizations
          </p>
        </div>
      </section>

      {/* ── Pricing Cards ─────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div
          ref={cardsReveal.ref}
          className="grid md:grid-cols-3 gap-6 items-start"
        >
          <PlanCard
            icon={<Rocket className="w-6 h-6 text-[#2563eb]" />}
            name="Pathfndr Pro"
            badge="Ideal for &lt;5 employees"
            price="₹54,750"
            priceNote="+ GST, per annum"
            highlights={[
              "5 Employee Logins",
              "2,500 Sessions/month",
              "Dynamic Packages",
              "Instant Setup",
              "Basic Customization",
            ]}
            ctaLabel="Sign Up Now"
            ctaVariant="solid"
            delay="0ms"
            visible={cardsReveal.visible}
            onCta={() => onNavigate("agent-registration")}
          />
          <PlanCard
            icon={
              <Zap
                className="w-6 h-6 text-white"
                style={{ filter: "drop-shadow(0 0 6px #fff)" }}
              />
            }
            name="Pathfndr Elite"
            badge="Ideal for &lt;20 employees"
            price="₹15,00,000"
            priceNote="+ GST, per annum"
            commitment="2-year minimum commitment"
            highlights={[
              "20 Employee Logins",
              "7,500 Sessions/month",
              "Enhanced Inventory",
              "AI Features",
              "Same-day Support",
            ]}
            ctaLabel="Let's Talk"
            ctaVariant="gradient"
            popular
            delay="120ms"
            visible={cardsReveal.visible}
            onCta={() => onNavigate("contact")}
          />
          <PlanCard
            icon={
              <Building2 className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            }
            name="Pathfndr Enterprise"
            badge="Ideal for &gt;20 employees"
            price="Personalized"
            commitment="2-year minimum commitment"
            highlights={[
              "Unlimited Logins",
              "Negotiated Sessions",
              "Complete AI Suite",
              "Mobile Apps",
              "24/7 Support",
            ]}
            ctaLabel="Let's Talk"
            ctaVariant="outline"
            delay="240ms"
            visible={cardsReveal.visible}
            onCta={() => onNavigate("contact")}
          />
        </div>
      </section>

      {/* ── Feature Comparison Table ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div
          ref={tableReveal.ref}
          className={`transition-all duration-700 ${
            tableReveal.visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-3">
            Detailed Feature Comparison
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Every feature, every plan — transparent and side by side.
          </p>

          {/* Scrollable wrapper */}
          <div className="overflow-x-auto rounded-2xl shadow-lg ring-1 ring-gray-200 dark:ring-gray-800">
            <table className="w-full min-w-[640px] border-collapse bg-white dark:bg-gray-900">
              {/* Sticky plan header row */}
              <thead className="sticky top-0 z-20">
                <tr>
                  <th className="w-1/2 text-left px-6 py-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-sm font-semibold">
                    Feature
                  </th>
                  {(
                    [
                      "Pathfndr Pro",
                      "Pathfndr Elite",
                      "Pathfndr Enterprise",
                    ] as const
                  ).map((plan, i) => (
                    <th
                      key={plan}
                      className={[
                        "px-6 py-4 text-center border-b text-sm font-bold",
                        i === 1
                          ? "bg-[#2563eb]/5 dark:bg-[#2563eb]/10 border-[#2563eb]/30 text-[#2563eb]"
                          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200",
                      ].join(" ")}
                    >
                      {i === 1 && (
                        <span className="block text-xs font-normal text-[#7c3aed] mb-0.5">
                          ★ Most Popular
                        </span>
                      )}
                      {plan}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {TABLE_SECTIONS.map((section) => (
                  <>
                    {/* Section header row */}
                    <tr key={section.title}>
                      <td
                        colSpan={4}
                        className="px-6 py-3 bg-gray-50 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 text-sm font-semibold border-y border-gray-200 dark:border-gray-800"
                      >
                        {section.title}
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {section.rows.map((row, ri) => (
                      <tr
                        key={`${section.title}-${row.feature}`}
                        className={
                          ri % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50/50 dark:bg-gray-800/20"
                        }
                      >
                        <td className="px-6 py-3.5 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                          {row.feature}
                        </td>
                        <td className="px-6 py-3.5 text-center border-b border-gray-100 dark:border-gray-800">
                          {row.pro}
                        </td>
                        <td className="px-6 py-3.5 text-center border-b border-gray-100 dark:border-gray-800 bg-[#2563eb]/3 dark:bg-[#2563eb]/5">
                          {row.elite}
                        </td>
                        <td className="px-6 py-3.5 text-center border-b border-gray-100 dark:border-gray-800">
                          {row.enterprise}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA Footer ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
        <div
          className="rounded-2xl p-10 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #7c3aed 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-3">
              Not sure which plan fits?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Talk to our team. We'll analyze your business needs and recommend
              the right plan — or build a custom package.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#2563eb] font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 shadow-lg"
                data-ocid="pricing.talk_to_team.button"
              >
                Talk to Our Team <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("agent-registration")}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all hover:scale-105"
                data-ocid="pricing.register.button"
              >
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(37,99,235,0); }
          50% { opacity: 0.85; box-shadow: 0 0 12px 3px rgba(37,99,235,0.18); }
        }
      `}</style>
    </div>
  );
}
