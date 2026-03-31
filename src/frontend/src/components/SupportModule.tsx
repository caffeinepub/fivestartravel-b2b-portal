import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Clock3,
  Eye,
  HeadphonesIcon,
  Mail,
  MapPin,
  MessageSquare,
  Paperclip,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useTheme } from "../ThemeContext";
import { DARK, LIGHT } from "../design-tokens";

const TICKETS = [
  {
    id: "TKT-2847",
    subject: "Flight booking refund not credited",
    category: "Flight Issue",
    priority: "High",
    status: "In Progress",
    date: "28 Mar 2026",
  },
  {
    id: "TKT-2831",
    subject: "Hotel voucher not received after payment",
    category: "Hotel Issue",
    priority: "Urgent",
    status: "Open",
    date: "27 Mar 2026",
  },
  {
    id: "TKT-2809",
    subject: "Wallet top-up not reflecting in balance",
    category: "Payment",
    priority: "Medium",
    status: "Open",
    date: "25 Mar 2026",
  },
  {
    id: "TKT-2780",
    subject: "Unable to download booking invoice PDF",
    category: "Technical",
    priority: "Low",
    status: "Resolved",
    date: "21 Mar 2026",
  },
  {
    id: "TKT-2754",
    subject: "Passenger name correction on flight PNR",
    category: "Flight Issue",
    priority: "High",
    status: "Resolved",
    date: "18 Mar 2026",
  },
];

const FAQS = [
  {
    id: "faq-cancel",
    q: "How do I cancel a booking?",
    a: "Go to My Bookings, find the booking you want to cancel, and click the Cancel button. Cancellation charges may apply as per the supplier's policy. Refunds are processed within 5-7 business days to your wallet.",
  },
  {
    id: "faq-wallet",
    q: "How long does a wallet top-up take?",
    a: "Wallet top-ups via NEFT/RTGS are processed within 4-6 business hours. IMPS transfers reflect within 30 minutes. Credit/debit card top-ups are instant subject to bank approval.",
  },
  {
    id: "faq-processing",
    q: "Why is my flight booking showing 'Processing'?",
    a: "Processing status means the booking request is sent to the airline/GDS and we are awaiting confirmation. This usually takes 5-15 minutes. If the status persists beyond 2 hours, please raise a support ticket.",
  },
  {
    id: "faq-gst",
    q: "How do I get a GST invoice for my booking?",
    a: "GST invoices are auto-generated for all confirmed bookings. Go to My Bookings > View Booking > Download Invoice. The invoice includes your company's GSTIN if registered in your profile.",
  },
  {
    id: "faq-amend",
    q: "Can I amend passenger details after booking?",
    a: "Name corrections are allowed on select airlines with an amendment fee. Date changes depend on the fare class. Go to My Bookings > Amend Booking, or contact support for assistance.",
  },
  {
    id: "faq-supplier-cancel",
    q: "What happens if a supplier cancels my booking?",
    a: "If a supplier cancels your booking, you will receive an immediate email/WhatsApp notification and the full amount will be credited back to your wallet within 24 hours. You can then rebook with an alternative supplier.",
  },
];

const priorityConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  Low: { label: "Low", color: "#16A34A", bg: "#DCFCE7" },
  Medium: { label: "Medium", color: "#D97706", bg: "#FEF3C7" },
  High: { label: "High", color: "#EA580C", bg: "#FFEDD5" },
  Urgent: { label: "Urgent", color: "#DC2626", bg: "#FEE2E2" },
};

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string; icon: typeof CheckCircle2 }
> = {
  Open: { label: "Open", color: "#2563EB", bg: "#DBEAFE", icon: AlertCircle },
  "In Progress": {
    label: "In Progress",
    color: "#D97706",
    bg: "#FEF3C7",
    icon: Clock3,
  },
  Resolved: {
    label: "Resolved",
    color: "#16A34A",
    bg: "#DCFCE7",
    icon: CheckCircle2,
  },
};

export function SupportModule() {
  const { theme } = useTheme();
  const t = theme === "light" ? LIGHT : DARK;

  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ subject: "", category: "", priority: "", description: "" });
  }

  const card = {
    background: t.cardBg,
    border: `1px solid ${t.border}`,
    boxShadow: t.shadow,
    borderRadius: "12px",
    padding: "24px",
  };

  return (
    <div style={{ background: t.pageBg, minHeight: "100vh", padding: "24px" }}>
      {/* Header Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            label: "Open Tickets",
            value: "3",
            color: t.primary,
            bg: theme === "light" ? "#DBEAFE" : "rgba(59,130,246,0.15)",
            icon: AlertCircle,
          },
          {
            label: "Avg Response Time",
            value: "2h",
            color: t.warning,
            bg: theme === "light" ? "#FEF3C7" : "rgba(251,191,36,0.15)",
            icon: Clock3,
          },
          {
            label: "Resolved (30 days)",
            value: "47",
            color: t.success,
            bg: theme === "light" ? "#DCFCE7" : "rgba(34,197,94,0.15)",
            icon: CheckCircle2,
          },
        ].map((stat) => (
          <div key={stat.label} style={card} data-ocid="support.card">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "10px",
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <stat.icon size={20} color={stat.color} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: t.text,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: "13px", color: t.muted, marginTop: 2 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "24px",
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Submit Ticket Form */}
          <div style={card}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: t.text,
                marginBottom: "20px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <HeadphonesIcon size={18} color={t.primary} />
              Submit New Ticket
            </h2>

            {submitted && (
              <div
                style={{
                  background:
                    theme === "light" ? "#DCFCE7" : "rgba(34,197,94,0.15)",
                  border: `1px solid ${t.success}`,
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: t.success,
                  fontWeight: 600,
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                data-ocid="support.success_state"
              >
                <CheckCircle2 size={16} />
                Ticket submitted successfully! Our team will respond within 2
                hours.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <Label
                    style={{
                      color: t.text,
                      fontSize: "13px",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Category
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, category: v }))
                    }
                  >
                    <SelectTrigger
                      style={{
                        background: t.inputBg,
                        border: `1px solid ${t.border}`,
                        color: t.text,
                      }}
                      data-ocid="support.select"
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Flight Issue">Flight Issue</SelectItem>
                      <SelectItem value="Hotel Issue">Hotel Issue</SelectItem>
                      <SelectItem value="Payment">Payment</SelectItem>
                      <SelectItem value="Technical">Technical</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    style={{
                      color: t.text,
                      fontSize: "13px",
                      marginBottom: "6px",
                      display: "block",
                    }}
                  >
                    Priority
                  </Label>
                  <Select
                    value={form.priority}
                    onValueChange={(v) =>
                      setForm((f) => ({ ...f, priority: v }))
                    }
                  >
                    <SelectTrigger
                      style={{
                        background: t.inputBg,
                        border: `1px solid ${t.border}`,
                        color: t.text,
                      }}
                      data-ocid="support.select"
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Label
                  style={{
                    color: t.text,
                    fontSize: "13px",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Subject
                </Label>
                <Input
                  value={form.subject}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subject: e.target.value }))
                  }
                  placeholder="Brief description of your issue"
                  style={{
                    background: t.inputBg,
                    border: `1px solid ${t.border}`,
                    color: t.text,
                  }}
                  data-ocid="support.input"
                  required
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <Label
                  style={{
                    color: t.text,
                    fontSize: "13px",
                    marginBottom: "6px",
                    display: "block",
                  }}
                >
                  Description
                </Label>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Please provide full details including Booking ID, dates, and any error messages..."
                  rows={4}
                  style={{
                    background: t.inputBg,
                    border: `1px solid ${t.border}`,
                    color: t.text,
                    resize: "vertical",
                  }}
                  data-ocid="support.textarea"
                  required
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Button
                  type="button"
                  variant="outline"
                  style={{
                    border: `1px solid ${t.border}`,
                    color: t.muted,
                    background: "transparent",
                    gap: "6px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  data-ocid="support.upload_button"
                >
                  <Paperclip size={14} />
                  Attach File
                </Button>
                <Button
                  type="submit"
                  style={{
                    background: t.primary,
                    color: "#fff",
                    border: "none",
                    fontWeight: 600,
                    padding: "8px 24px",
                  }}
                  data-ocid="support.submit_button"
                >
                  Submit Ticket
                </Button>
              </div>
            </form>
          </div>

          {/* My Tickets Table */}
          <div style={card}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: t.text,
                marginBottom: "20px",
              }}
            >
              My Tickets
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "13px",
                }}
                data-ocid="support.table"
              >
                <thead>
                  <tr
                    style={{
                      background:
                        theme === "light"
                          ? "#F9FAFB"
                          : "rgba(255,255,255,0.03)",
                      borderBottom: `1px solid ${t.border}`,
                    }}
                  >
                    {[
                      "Ticket ID",
                      "Subject",
                      "Category",
                      "Priority",
                      "Status",
                      "Date",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "10px 14px",
                          textAlign: "left",
                          fontWeight: 600,
                          color: t.muted,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TICKETS.map((ticket, i) => {
                    const pri = priorityConfig[ticket.priority];
                    const sta = statusConfig[ticket.status];
                    const StatusIcon = sta.icon;
                    return (
                      <tr
                        key={ticket.id}
                        style={{
                          borderBottom: `1px solid ${t.border}`,
                          transition: "background 0.15s",
                        }}
                        data-ocid={`support.row.item.${i + 1}`}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background =
                            theme === "light"
                              ? "#F9FAFB"
                              : "rgba(255,255,255,0.03)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLTableRowElement
                          ).style.background = "transparent";
                        }}
                      >
                        <td
                          style={{
                            padding: "12px 14px",
                            color: t.primary,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ticket.id}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            color: t.text,
                            maxWidth: "220px",
                          }}
                        >
                          {ticket.subject}
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            color: t.muted,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ticket.category}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span
                            style={{
                              background: pri.bg,
                              color: pri.color,
                              padding: "3px 10px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {pri.label}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span
                            style={{
                              background: sta.bg,
                              color: sta.color,
                              padding: "3px 10px",
                              borderRadius: "20px",
                              fontSize: "11px",
                              fontWeight: 700,
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <StatusIcon size={11} />
                            {sta.label}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "12px 14px",
                            color: t.muted,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ticket.date}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <Button
                            size="sm"
                            variant="outline"
                            style={{
                              border: `1px solid ${t.border}`,
                              color: t.primary,
                              background: "transparent",
                              padding: "4px 12px",
                              fontSize: "12px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                            data-ocid={`support.edit_button.${i + 1}`}
                          >
                            <Eye size={12} />
                            View
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div style={card}>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: t.text,
                marginBottom: "20px",
              }}
            >
              Frequently Asked Questions
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {FAQS.map((faq, i) => (
                <div
                  key={faq.id}
                  style={{
                    border: `1px solid ${
                      openFaqId === faq.id ? t.primary : t.border
                    }`,
                    borderRadius: "8px",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                  data-ocid={`support.panel.${i + 1}`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                    }
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "14px 16px",
                      background:
                        openFaqId === faq.id
                          ? theme === "light"
                            ? "#EFF6FF"
                            : "rgba(59,130,246,0.08)"
                          : "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      gap: "12px",
                      transition: "background 0.2s",
                    }}
                    data-ocid={`support.toggle.${i + 1}`}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "14px",
                        color: openFaqId === faq.id ? t.primary : t.text,
                      }}
                    >
                      {faq.q}
                    </span>
                    {openFaqId === faq.id ? (
                      <ChevronUp
                        size={16}
                        color={t.primary}
                        style={{ flexShrink: 0 }}
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        color={t.muted}
                        style={{ flexShrink: 0 }}
                      />
                    )}
                  </button>
                  {openFaqId === faq.id && (
                    <div
                      style={{
                        padding: "12px 16px 16px",
                        fontSize: "14px",
                        color: t.muted,
                        lineHeight: 1.6,
                        borderTop: `1px solid ${t.border}`,
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Contact Info */}
          <div style={card}>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: t.text,
                marginBottom: "20px",
              }}
            >
              Contact & Support
            </h2>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  icon: Mail,
                  label: "Email Support",
                  value: "customerservice@fivestartravel.in",
                  color: t.primary,
                  bg: theme === "light" ? "#DBEAFE" : "rgba(59,130,246,0.15)",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+91-1725000004",
                  color: t.success,
                  bg: theme === "light" ? "#DCFCE7" : "rgba(34,197,94,0.15)",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: "SCO 48 Sector 30C, Chandigarh, India",
                  color: t.accent,
                  bg: theme === "light" ? "#FFEDD5" : "rgba(251,146,60,0.15)",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Mon-Sat, 9:00 AM - 7:00 PM IST",
                  color: t.warning,
                  bg: theme === "light" ? "#FEF3C7" : "rgba(251,191,36,0.15)",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "8px",
                      background: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <item.icon size={16} color={item.color} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: t.muted,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 2,
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: t.text,
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chat CTA */}
          <div
            style={{
              ...card,
              background:
                theme === "light"
                  ? "linear-gradient(135deg, #16A34A 0%, #15803D 100%)"
                  : "linear-gradient(135deg, #166534 0%, #14532D 100%)",
              border: "none",
              textAlign: "center" as const,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#4ADE80",
                  boxShadow: "0 0 0 3px rgba(74,222,128,0.3)",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#4ADE80",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                }}
              >
                Online
              </span>
            </div>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#FFFFFF",
                marginBottom: "6px",
              }}
            >
              Live Chat Support
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.75)",
                marginBottom: "20px",
                lineHeight: 1.5,
              }}
            >
              Chat with our support team in real-time. Average wait: under 2 min
            </div>
            <Button
              style={{
                background: "#FFFFFF",
                color: "#16A34A",
                border: "none",
                fontWeight: 700,
                width: "100%",
                padding: "10px",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
              data-ocid="support.primary_button"
            >
              <MessageSquare size={16} />
              Start Live Chat
            </Button>
          </div>

          {/* Quick Links */}
          <div style={card}>
            <h3
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: t.muted,
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
                marginBottom: "14px",
              }}
            >
              Quick Actions
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              {[
                "Track existing ticket",
                "Request callback",
                "Download invoice",
                "Escalate to manager",
              ].map((action) => (
                <button
                  key={action}
                  type="button"
                  style={{
                    width: "100%",
                    textAlign: "left" as const,
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: "transparent",
                    border: `1px solid ${t.border}`,
                    color: t.text,
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background 0.15s, border-color 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      theme === "light" ? "#F9FAFB" : "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      t.primary;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      t.border;
                  }}
                  data-ocid="support.secondary_button"
                >
                  {"-> "}
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
