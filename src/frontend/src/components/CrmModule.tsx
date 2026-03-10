import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Activity,
  AlertCircle,
  Bell,
  CalendarCheck,
  ChevronDown,
  ClipboardList,
  Clock,
  FileText,
  Mail,
  Pencil,
  Phone,
  Plus,
  Search,
  Send,
  Trash2,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";

type LeadStatus =
  | "New"
  | "Contacted"
  | "Qualified"
  | "Proposal"
  | "Closed Won"
  | "Closed Lost";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: string;
  destination: string;
  travelDate: string;
  pax: number;
  budget: string;
  status: LeadStatus;
  notes: string;
}

interface Enquiry {
  id: number;
  ref: string;
  clientName: string;
  phone: string;
  module: string;
  destination: string;
  travelDate: string;
  pax: number;
  budget: string;
  status: "Open" | "In Progress" | "Quoted" | "Closed";
  createdAt: string;
}

interface FollowUp {
  id: number;
  clientName: string;
  phone: string;
  type: "Call" | "Email" | "WhatsApp" | "Meeting";
  dueDate: string;
  dueTime: string;
  priority: "High" | "Medium" | "Low";
  notes: string;
  status: "Pending" | "Completed" | "Overdue";
}

interface Quotation {
  id: number;
  ref: string;
  clientName: string;
  email: string;
  destination: string;
  travelDate: string;
  pax: number;
  inclusions: string[];
  totalAmount: string;
  margin: string;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
  createdAt: string;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    name: "Rahul Verma",
    email: "rahul.verma@gmail.com",
    phone: "+91 98765 43210",
    source: "Website",
    destination: "Dubai Package",
    travelDate: "2026-04-15",
    pax: 2,
    budget: "₹1,20,000",
    status: "New",
    notes: "Interested in 7-night Dubai package",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@yahoo.com",
    phone: "+91 87654 32109",
    source: "Referral",
    destination: "Bali, Indonesia",
    travelDate: "2026-05-01",
    pax: 4,
    budget: "₹2,40,000",
    status: "Contacted",
    notes: "Family trip, needs hotel + tours",
  },
  {
    id: 3,
    name: "Amit Sharma",
    email: "amit.sharma@outlook.com",
    phone: "+91 76543 21098",
    source: "Social Media",
    destination: "Singapore",
    travelDate: "2026-06-10",
    pax: 2,
    budget: "₹1,80,000",
    status: "Qualified",
    notes: "Honeymoon trip, premium hotels preferred",
  },
  {
    id: 4,
    name: "Neha Patel",
    email: "neha.patel@gmail.com",
    phone: "+91 65432 10987",
    source: "Walk-in",
    destination: "Thailand",
    travelDate: "2026-04-20",
    pax: 3,
    budget: "₹1,50,000",
    status: "Proposal",
    notes: "Group travel, budget-conscious",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    email: "vikram.m@hotmail.com",
    phone: "+91 54321 09876",
    source: "Agent Referral",
    destination: "Maldives",
    travelDate: "2026-07-05",
    pax: 2,
    budget: "₹3,50,000",
    status: "Closed Won",
    notes: "Luxury resort booking confirmed",
  },
  {
    id: 6,
    name: "Sunita Joshi",
    email: "sunita.joshi@gmail.com",
    phone: "+91 43210 98765",
    source: "Website",
    destination: "Europe Tour",
    travelDate: "2026-08-15",
    pax: 2,
    budget: "₹4,80,000",
    status: "Closed Lost",
    notes: "Budget exceeded, went with competitor",
  },
  {
    id: 7,
    name: "Deepak Kumar",
    email: "deepak.kumar@gmail.com",
    phone: "+91 32109 87654",
    source: "Social Media",
    destination: "Sri Lanka",
    travelDate: "2026-04-25",
    pax: 2,
    budget: "₹90,000",
    status: "New",
    notes: "Short trip, 5 nights",
  },
  {
    id: 8,
    name: "Kavita Reddy",
    email: "kavita.reddy@yahoo.com",
    phone: "+91 21098 76543",
    source: "Referral",
    destination: "Malaysia",
    travelDate: "2026-05-20",
    pax: 5,
    budget: "₹2,20,000",
    status: "Contacted",
    notes: "Friends group trip",
  },
  {
    id: 9,
    name: "Rajesh Gupta",
    email: "rajesh.gupta@gmail.com",
    phone: "+91 10987 65432",
    source: "Walk-in",
    destination: "Japan",
    travelDate: "2026-09-10",
    pax: 2,
    budget: "₹3,20,000",
    status: "Qualified",
    notes: "Cherry blossom season interest",
  },
  {
    id: 10,
    name: "Meena Agarwal",
    email: "meena.agarwal@outlook.com",
    phone: "+91 98761 23456",
    source: "Agent Referral",
    destination: "Australia",
    travelDate: "2026-10-01",
    pax: 4,
    budget: "₹5,60,000",
    status: "Proposal",
    notes: "Family vacation, school holidays",
  },
  {
    id: 11,
    name: "Suresh Nair",
    email: "suresh.nair@gmail.com",
    phone: "+91 87652 34567",
    source: "Website",
    destination: "Mauritius",
    travelDate: "2026-06-25",
    pax: 2,
    budget: "₹2,80,000",
    status: "Closed Won",
    notes: "Anniversary trip, sea-facing villa",
  },
  {
    id: 12,
    name: "Ananya Chopra",
    email: "ananya.chopra@gmail.com",
    phone: "+91 76541 23456",
    source: "Social Media",
    destination: "Vietnam",
    travelDate: "2026-07-12",
    pax: 3,
    budget: "₹1,65,000",
    status: "New",
    notes: "Girls trip, backpacking style",
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: 1,
    ref: "ENQ-2026-0301",
    clientName: "Rohit Bansal",
    phone: "+91 98100 11111",
    module: "Flight",
    destination: "DEL → DXB",
    travelDate: "2026-04-10",
    pax: 2,
    budget: "₹80,000",
    status: "Open",
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    ref: "ENQ-2026-0302",
    clientName: "Sonia Arora",
    phone: "+91 98100 22222",
    module: "Hotel",
    destination: "Dubai",
    travelDate: "2026-04-12",
    pax: 2,
    budget: "₹60,000",
    status: "In Progress",
    createdAt: "2026-03-02",
  },
  {
    id: 3,
    ref: "ENQ-2026-0303",
    clientName: "Manish Tiwari",
    phone: "+91 98100 33333",
    module: "Tour",
    destination: "Bali",
    travelDate: "2026-05-01",
    pax: 4,
    budget: "₹2,40,000",
    status: "Quoted",
    createdAt: "2026-03-03",
  },
  {
    id: 4,
    ref: "ENQ-2026-0304",
    clientName: "Nidhi Bhatt",
    phone: "+91 98100 44444",
    module: "Visa",
    destination: "UK Visa",
    travelDate: "2026-06-15",
    pax: 1,
    budget: "₹12,000",
    status: "Closed",
    createdAt: "2026-03-04",
  },
  {
    id: 5,
    ref: "ENQ-2026-0305",
    clientName: "Arun Kapoor",
    phone: "+91 98100 55555",
    module: "Package",
    destination: "Thailand",
    travelDate: "2026-05-20",
    pax: 3,
    budget: "₹1,80,000",
    status: "Open",
    createdAt: "2026-03-05",
  },
  {
    id: 6,
    ref: "ENQ-2026-0306",
    clientName: "Pooja Mehta",
    phone: "+91 98100 66666",
    module: "Transfer",
    destination: "DXB Airport",
    travelDate: "2026-04-08",
    pax: 2,
    budget: "₹8,000",
    status: "In Progress",
    createdAt: "2026-03-06",
  },
  {
    id: 7,
    ref: "ENQ-2026-0307",
    clientName: "Kiran Desai",
    phone: "+91 98100 77777",
    module: "Cruise",
    destination: "Mediterranean",
    travelDate: "2026-07-10",
    pax: 2,
    budget: "₹4,50,000",
    status: "Quoted",
    createdAt: "2026-03-07",
  },
  {
    id: 8,
    ref: "ENQ-2026-0308",
    clientName: "Tarun Saxena",
    phone: "+91 98100 88888",
    module: "Hotel",
    destination: "Singapore",
    travelDate: "2026-06-01",
    pax: 3,
    budget: "₹1,20,000",
    status: "Open",
    createdAt: "2026-03-08",
  },
];

const INITIAL_FOLLOWUPS: FollowUp[] = [
  {
    id: 1,
    clientName: "Rahul Verma",
    phone: "+91 98765 43210",
    type: "Call",
    dueDate: "2026-03-11",
    dueTime: "10:00 AM",
    priority: "High",
    notes: "Follow up on Dubai 7-night package quote",
    status: "Pending",
  },
  {
    id: 2,
    clientName: "Priya Singh",
    phone: "+91 87654 32109",
    type: "WhatsApp",
    dueDate: "2026-03-10",
    dueTime: "02:00 PM",
    priority: "High",
    notes: "Share Bali hotel options",
    status: "Overdue",
  },
  {
    id: 3,
    clientName: "Amit Sharma",
    phone: "+91 76543 21098",
    type: "Email",
    dueDate: "2026-03-12",
    dueTime: "11:00 AM",
    priority: "Medium",
    notes: "Send honeymoon package PDF",
    status: "Pending",
  },
  {
    id: 4,
    clientName: "Neha Patel",
    phone: "+91 65432 10987",
    type: "Call",
    dueDate: "2026-03-09",
    dueTime: "04:00 PM",
    priority: "Medium",
    notes: "Confirm Thailand group booking",
    status: "Overdue",
  },
  {
    id: 5,
    clientName: "Rohit Bansal",
    phone: "+91 98100 11111",
    type: "Meeting",
    dueDate: "2026-03-13",
    dueTime: "03:00 PM",
    priority: "Low",
    notes: "Office visit to finalize flight booking",
    status: "Pending",
  },
  {
    id: 6,
    clientName: "Kiran Desai",
    phone: "+91 98100 77777",
    type: "Email",
    dueDate: "2026-03-08",
    dueTime: "09:00 AM",
    priority: "High",
    notes: "Send Mediterranean cruise itinerary",
    status: "Completed",
  },
  {
    id: 7,
    clientName: "Meena Agarwal",
    phone: "+91 98761 23456",
    type: "Call",
    dueDate: "2026-03-14",
    dueTime: "12:00 PM",
    priority: "Medium",
    notes: "Discuss Australia school holiday package",
    status: "Pending",
  },
  {
    id: 8,
    clientName: "Kavita Reddy",
    phone: "+91 21098 76543",
    type: "WhatsApp",
    dueDate: "2026-03-11",
    dueTime: "06:00 PM",
    priority: "Low",
    notes: "Share Malaysia group rates",
    status: "Pending",
  },
];

const INITIAL_QUOTATIONS: Quotation[] = [
  {
    id: 1,
    ref: "FST-QT-20260301-001",
    clientName: "Manish Tiwari",
    email: "manish.t@gmail.com",
    destination: "Bali, Indonesia",
    travelDate: "2026-05-01",
    pax: 4,
    inclusions: ["Return Flights", "5N Hotel", "Transfers", "Sightseeing"],
    totalAmount: "₹2,56,000",
    margin: "12%",
    status: "Sent",
    createdAt: "2026-03-03",
  },
  {
    id: 2,
    ref: "FST-QT-20260301-002",
    clientName: "Vikram Malhotra",
    email: "vikram.m@hotmail.com",
    destination: "Maldives",
    travelDate: "2026-07-05",
    pax: 2,
    inclusions: [
      "Return Flights",
      "6N Overwater Villa",
      "All Meals",
      "Snorkeling",
    ],
    totalAmount: "₹3,78,000",
    margin: "15%",
    status: "Accepted",
    createdAt: "2026-03-01",
  },
  {
    id: 3,
    ref: "FST-QT-20260302-003",
    clientName: "Kiran Desai",
    email: "kiran.d@yahoo.com",
    destination: "Mediterranean Cruise",
    travelDate: "2026-07-10",
    pax: 2,
    inclusions: [
      "7N Cruise",
      "All Meals",
      "Shore Excursions",
      "Return Flights",
    ],
    totalAmount: "₹4,82,000",
    margin: "10%",
    status: "Sent",
    createdAt: "2026-03-07",
  },
  {
    id: 4,
    ref: "FST-QT-20260303-004",
    clientName: "Sunita Joshi",
    email: "sunita.joshi@gmail.com",
    destination: "Europe Tour",
    travelDate: "2026-08-15",
    pax: 2,
    inclusions: ["Return Flights", "10N Hotel", "Bus Pass", "City Tours"],
    totalAmount: "₹5,20,000",
    margin: "18%",
    status: "Rejected",
    createdAt: "2026-03-02",
  },
  {
    id: 5,
    ref: "FST-QT-20260304-005",
    clientName: "Meena Agarwal",
    email: "meena.agarwal@outlook.com",
    destination: "Australia",
    travelDate: "2026-10-01",
    pax: 4,
    inclusions: [
      "Return Flights",
      "12N Hotel",
      "Theme Park Tickets",
      "Transfers",
    ],
    totalAmount: "₹6,10,000",
    margin: "14%",
    status: "Draft",
    createdAt: "2026-03-05",
  },
  {
    id: 6,
    ref: "FST-QT-20260305-006",
    clientName: "Arun Kapoor",
    email: "arun.k@gmail.com",
    destination: "Thailand",
    travelDate: "2026-05-20",
    pax: 3,
    inclusions: ["Return Flights", "7N Hotel", "Transfers", "Island Tours"],
    totalAmount: "₹1,94,000",
    margin: "11%",
    status: "Draft",
    createdAt: "2026-03-06",
  },
];

const STATUS_COLORS: Record<LeadStatus, string> = {
  New: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Qualified: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Proposal: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "Closed Won": "bg-green-500/20 text-green-400 border-green-500/30",
  "Closed Lost": "bg-red-500/20 text-red-400 border-red-500/30",
};

const ENQUIRY_STATUS_COLORS: Record<string, string> = {
  Open: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "In Progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Quoted: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  Closed: "bg-green-500/20 text-green-400 border-green-500/30",
};

const FOLLOWUP_PRIORITY_COLORS: Record<string, string> = {
  High: "bg-red-500/20 text-red-400 border-red-500/30",
  Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Low: "bg-green-500/20 text-green-400 border-green-500/30",
};

const FOLLOWUP_STATUS_COLORS: Record<string, string> = {
  Pending: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Completed: "bg-green-500/20 text-green-400 border-green-500/30",
  Overdue: "bg-red-500/20 text-red-400 border-red-500/30",
};

const QUOTATION_STATUS_COLORS: Record<string, string> = {
  Draft: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  Sent: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Accepted: "bg-green-500/20 text-green-400 border-green-500/30",
  Rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const RECENT_ACTIVITY = [
  {
    id: 1,
    color: "bg-blue-500",
    text: "New lead added: Rahul Verma — Dubai Package",
    time: "2 mins ago",
  },
  {
    id: 2,
    color: "bg-green-500",
    text: "Follow-up completed: Priya Singh",
    time: "18 mins ago",
  },
  {
    id: 3,
    color: "bg-orange-500",
    text: "Status updated to Proposal: Neha Patel — Thailand",
    time: "1 hr ago",
  },
  {
    id: 4,
    color: "bg-purple-500",
    text: "Qualified: Amit Sharma — Singapore Honeymoon",
    time: "3 hrs ago",
  },
  {
    id: 5,
    color: "bg-emerald-500",
    text: "Booking confirmed: Vikram Malhotra — Maldives Luxury",
    time: "Yesterday",
  },
  {
    id: 6,
    color: "bg-red-400",
    text: "Lead closed lost: Sunita Joshi — Europe Tour",
    time: "Yesterday",
  },
];

const ALL_STATUSES: LeadStatus[] = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal",
  "Closed Won",
  "Closed Lost",
];

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
};

export function CrmModule() {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [followUps, setFollowUps] = useState<FollowUp[]>(INITIAL_FOLLOWUPS);
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [enquirySearch, setEnquirySearch] = useState("");
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState("all");
  const [followUpFilter, setFollowUpFilter] = useState("all");
  const [quotationFilter, setQuotationFilter] = useState("all");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    destination: "",
    travelDate: "",
    pax: "",
    budget: "",
    notes: "",
  });
  const [fuForm, setFuForm] = useState({
    clientName: "",
    phone: "",
    type: "Call",
    dueDate: "",
    dueTime: "",
    priority: "Medium",
    notes: "",
  });
  const [qtForm, setQtForm] = useState({
    clientName: "",
    email: "",
    destination: "",
    travelDate: "",
    pax: "",
    inclusions: "",
    totalAmount: "",
    margin: "",
  });
  const [eqForm, setEqForm] = useState({
    clientName: "",
    phone: "",
    module: "Flight",
    destination: "",
    travelDate: "",
    pax: "",
    budget: "",
  });

  const filteredLeads = leads.filter((l) => {
    const matchSearch =
      search === "" ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search);
    const matchStatus = statusFilter === "all" || l.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredEnquiries = enquiries.filter((e) => {
    const matchSearch =
      enquirySearch === "" ||
      e.clientName.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.ref.toLowerCase().includes(enquirySearch.toLowerCase());
    const matchStatus =
      enquiryStatusFilter === "all" || e.status === enquiryStatusFilter;
    return matchSearch && matchStatus;
  });

  const filteredFollowUps = followUps.filter(
    (f) => followUpFilter === "all" || f.status === followUpFilter,
  );
  const filteredQuotations = quotations.filter(
    (q) => quotationFilter === "all" || q.status === quotationFilter,
  );

  function handleAddLead() {
    if (!form.name || !form.email || !form.phone) return;
    setLeads((prev) => [
      {
        id: Date.now(),
        name: form.name,
        email: form.email,
        phone: form.phone,
        source: form.source || "Website",
        destination: form.destination,
        travelDate: form.travelDate,
        pax: Number(form.pax) || 1,
        budget: form.budget ? `₹${form.budget}` : "—",
        status: "New",
        notes: form.notes,
      },
      ...prev,
    ]);
    setShowAddModal(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      source: "",
      destination: "",
      travelDate: "",
      pax: "",
      budget: "",
      notes: "",
    });
  }

  function handleStatusChange(id: number, status: LeadStatus) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  function handleDeleteLead(id: number) {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  function handleAddFollowUp() {
    if (!fuForm.clientName || !fuForm.dueDate) return;
    const newFU: FollowUp = {
      id: Date.now(),
      clientName: fuForm.clientName,
      phone: fuForm.phone,
      type: fuForm.type as FollowUp["type"],
      dueDate: fuForm.dueDate,
      dueTime: fuForm.dueTime || "10:00 AM",
      priority: fuForm.priority as FollowUp["priority"],
      notes: fuForm.notes,
      status: "Pending",
    };
    setFollowUps((prev) => [newFU, ...prev]);
    setShowFollowUpModal(false);
    setFuForm({
      clientName: "",
      phone: "",
      type: "Call",
      dueDate: "",
      dueTime: "",
      priority: "Medium",
      notes: "",
    });
  }

  function handleMarkFollowUp(id: number, status: FollowUp["status"]) {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status } : f)),
    );
  }

  function handleAddQuotation() {
    if (!qtForm.clientName || !qtForm.destination || !qtForm.totalAmount)
      return;
    const ref = `FST-QT-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(quotations.length + 1).padStart(3, "0")}`;
    const newQt: Quotation = {
      id: Date.now(),
      ref,
      clientName: qtForm.clientName,
      email: qtForm.email,
      destination: qtForm.destination,
      travelDate: qtForm.travelDate,
      pax: Number(qtForm.pax) || 1,
      inclusions: qtForm.inclusions
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      totalAmount: qtForm.totalAmount.startsWith("₹")
        ? qtForm.totalAmount
        : `₹${qtForm.totalAmount}`,
      margin: qtForm.margin ? `${qtForm.margin}%` : "10%",
      status: "Draft",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setQuotations((prev) => [newQt, ...prev]);
    setShowQuotationModal(false);
    setQtForm({
      clientName: "",
      email: "",
      destination: "",
      travelDate: "",
      pax: "",
      inclusions: "",
      totalAmount: "",
      margin: "",
    });
  }

  function handleAddEnquiry() {
    if (!eqForm.clientName || !eqForm.destination) return;
    const ref = `ENQ-${new Date().getFullYear()}-${String(enquiries.length + 1).padStart(4, "0")}`;
    const newEq: Enquiry = {
      id: Date.now(),
      ref,
      clientName: eqForm.clientName,
      phone: eqForm.phone,
      module: eqForm.module,
      destination: eqForm.destination,
      travelDate: eqForm.travelDate,
      pax: Number(eqForm.pax) || 1,
      budget: eqForm.budget ? `₹${eqForm.budget}` : "—",
      status: "Open",
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setEnquiries((prev) => [newEq, ...prev]);
    setShowEnquiryModal(false);
    setEqForm({
      clientName: "",
      phone: "",
      module: "Flight",
      destination: "",
      travelDate: "",
      pax: "",
      budget: "",
    });
  }

  function handleUpdateQuotationStatus(
    id: number,
    status: Quotation["status"],
  ) {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q)),
    );
  }

  function handleUpdateEnquiryStatus(id: number, status: Enquiry["status"]) {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e)),
    );
  }

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === "New").length;
  const closedWon = leads.filter((l) => l.status === "Closed Won").length;
  const conversionRate = totalLeads
    ? ((closedWon / totalLeads) * 100).toFixed(1)
    : "0.0";
  const overdueFollowUps = followUps.filter(
    (f) => f.status === "Overdue",
  ).length;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList className="bg-white/5 border border-white/10 flex-wrap gap-1">
          {[
            { value: "overview", label: "Overview" },
            { value: "leads", label: "Contacts & Leads" },
            { value: "enquiries", label: "Enquiries" },
            { value: "followups", label: "Follow-ups" },
            { value: "quotations", label: "Quotations" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              data-ocid={`crm.${tab.value}.tab`}
            >
              {tab.label}
              {tab.value === "followups" && overdueFollowUps > 0 && (
                <span className="ml-1.5 bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5">
                  {overdueFollowUps}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── Overview ─────────────────────────────────────── */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Users,
                label: "Total Contacts",
                value: totalLeads + 236,
                color: "#2563EB",
                bg: "rgba(37,99,235,0.15)",
              },
              {
                icon: UserPlus,
                label: "New Leads This Month",
                value: newLeads + 30,
                color: "#F97316",
                bg: "rgba(249,115,22,0.15)",
              },
              {
                icon: Activity,
                label: "Follow-ups Due",
                value: followUps.filter((f) => f.status === "Pending").length,
                color: "#A855F7",
                bg: "rgba(168,85,247,0.15)",
              },
              {
                icon: TrendingUp,
                label: "Conversion Rate",
                value: `${conversionRate}%`,
                color: "#22C55E",
                bg: "rgba(34,197,94,0.15)",
              },
            ].map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl p-5"
                style={cardStyle}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: kpi.bg }}
                >
                  <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <p className="text-2xl font-bold text-white">{kpi.value}</p>
                <p className="text-xs text-slate-400 mt-1">{kpi.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <div className="flex items-center gap-2 mb-5">
                <Activity className="w-4 h-4 text-orange-400" />
                <h3 className="font-semibold text-white">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                {RECENT_ACTIVITY.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color}`}
                    />
                    <p className="flex-1 text-sm text-slate-300">{item.text}</p>
                    <span className="text-xs text-slate-500 flex-shrink-0">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overdue Follow-ups */}
            <div className="rounded-2xl p-6" style={cardStyle}>
              <div className="flex items-center gap-2 mb-5">
                <Bell className="w-4 h-4 text-red-400" />
                <h3 className="font-semibold text-white">Overdue Follow-ups</h3>
                {overdueFollowUps > 0 && (
                  <span className="ml-auto bg-red-500/20 text-red-400 text-xs rounded-full px-2 py-0.5 border border-red-500/30">
                    {overdueFollowUps} overdue
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {followUps
                  .filter((f) => f.status === "Overdue")
                  .map((f) => (
                    <div
                      key={f.id}
                      className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">
                          {f.clientName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {f.notes}
                        </p>
                        <p className="text-xs text-red-400 mt-0.5">
                          Due: {f.dueDate} {f.dueTime}
                        </p>
                      </div>
                      <Badge
                        className={`text-xs border ${FOLLOWUP_PRIORITY_COLORS[f.priority]}`}
                      >
                        {f.priority}
                      </Badge>
                    </div>
                  ))}
                {overdueFollowUps === 0 && (
                  <p className="text-slate-500 text-sm text-center py-6">
                    No overdue follow-ups
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ── Contacts & Leads ─────────────────────────────── */}
        <TabsContent value="leads" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by name, email or phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.search.input"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-full sm:w-44 bg-white/5 border-white/10 text-white"
                data-ocid="crm.status_filter.select"
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Statuses</SelectItem>
                {ALL_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              data-ocid="crm.add_lead.button"
            >
              <Plus className="w-4 h-4" /> Add Lead
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  {[
                    "Name",
                    "Contact",
                    "Source",
                    "Destination",
                    "Travel Date",
                    "Budget",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-slate-400 text-xs font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-center text-slate-500 py-12"
                      data-ocid="crm.leads.empty_state"
                    >
                      No leads found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead, idx) => (
                    <TableRow
                      key={lead.id}
                      className="border-white/5 hover:bg-white/5"
                      data-ocid={`crm.lead.item.${idx + 1}`}
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue-400">
                              {lead.name[0]}
                            </span>
                          </div>
                          <span className="text-white text-sm font-medium">
                            {lead.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1 text-xs text-slate-400">
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-400">
                        {lead.source}
                      </TableCell>
                      <TableCell className="text-sm text-white">
                        {lead.destination}
                      </TableCell>
                      <TableCell className="text-sm text-slate-400">
                        {lead.travelDate || "—"}
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-orange-400">
                        {lead.budget}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs border ${STATUS_COLORS[lead.status]}`}
                        >
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-0.5"
                              >
                                <UserCheck className="w-3.5 h-3.5" />
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-900 border-white/10">
                              {ALL_STATUSES.map((s) => (
                                <DropdownMenuItem
                                  key={s}
                                  onClick={() => handleStatusChange(lead.id, s)}
                                  className="text-slate-300 hover:text-white cursor-pointer"
                                >
                                  {s}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                            onClick={() => handleDeleteLead(lead.id)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ── Enquiries ────────────────────────────────────── */}
        <TabsContent value="enquiries" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search by client name or ref…"
                value={enquirySearch}
                onChange={(e) => setEnquirySearch(e.target.value)}
                className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.enquiry_search.input"
              />
            </div>
            <Select
              value={enquiryStatusFilter}
              onValueChange={setEnquiryStatusFilter}
            >
              <SelectTrigger
                className="w-full sm:w-44 bg-white/5 border-white/10 text-white"
                data-ocid="crm.enquiry_status_filter.select"
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Statuses</SelectItem>
                {["Open", "In Progress", "Quoted", "Closed"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setShowEnquiryModal(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
              data-ocid="crm.add_enquiry.button"
            >
              <Plus className="w-4 h-4" /> Add Enquiry
            </Button>
          </div>

          <div className="rounded-2xl overflow-hidden" style={cardStyle}>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  {[
                    "Ref",
                    "Client",
                    "Module",
                    "Destination",
                    "Travel Date",
                    "Pax",
                    "Budget",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <TableHead
                      key={h}
                      className="text-slate-400 text-xs font-semibold uppercase tracking-wider"
                    >
                      {h}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className="text-center text-slate-500 py-12"
                      data-ocid="crm.enquiries.empty_state"
                    >
                      No enquiries found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enq, idx) => (
                    <TableRow
                      key={enq.id}
                      className="border-white/5 hover:bg-white/5"
                      data-ocid={`crm.enquiry.item.${idx + 1}`}
                    >
                      <TableCell className="text-xs font-mono text-blue-400">
                        {enq.ref}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-white">
                          {enq.clientName}
                        </div>
                        <div className="text-xs text-slate-400">
                          {enq.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-md">
                          {enq.module}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-white">
                        {enq.destination}
                      </TableCell>
                      <TableCell className="text-sm text-slate-400">
                        {enq.travelDate || "—"}
                      </TableCell>
                      <TableCell className="text-sm text-slate-400">
                        {enq.pax}
                      </TableCell>
                      <TableCell className="text-sm font-semibold text-orange-400">
                        {enq.budget}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs border ${ENQUIRY_STATUS_COLORS[enq.status]}`}
                        >
                          {enq.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex items-center gap-0.5"
                            >
                              <ClipboardList className="w-3.5 h-3.5" />
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-900 border-white/10">
                            {(
                              [
                                "Open",
                                "In Progress",
                                "Quoted",
                                "Closed",
                              ] as Enquiry["status"][]
                            ).map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() =>
                                  handleUpdateEnquiryStatus(enq.id, s)
                                }
                                className="text-slate-300 hover:text-white cursor-pointer"
                              >
                                {s}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* ── Follow-ups ───────────────────────────────────── */}
        <TabsContent value="followups" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Select value={followUpFilter} onValueChange={setFollowUpFilter}>
              <SelectTrigger
                className="w-full sm:w-44 bg-white/5 border-white/10 text-white"
                data-ocid="crm.followup_filter.select"
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Follow-ups</SelectItem>
                {["Pending", "Overdue", "Completed"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2 text-xs text-slate-400">
              <span className="bg-blue-500/20 border border-blue-500/30 text-blue-400 px-2 py-1 rounded-md">
                {followUps.filter((f) => f.status === "Pending").length} Pending
              </span>
              <span className="bg-red-500/20 border border-red-500/30 text-red-400 px-2 py-1 rounded-md">
                {followUps.filter((f) => f.status === "Overdue").length} Overdue
              </span>
              <span className="bg-green-500/20 border border-green-500/30 text-green-400 px-2 py-1 rounded-md">
                {followUps.filter((f) => f.status === "Completed").length} Done
              </span>
            </div>
            <div className="sm:ml-auto">
              <Button
                onClick={() => setShowFollowUpModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                data-ocid="crm.add_followup.button"
              >
                <Plus className="w-4 h-4" /> Add Follow-up
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            {filteredFollowUps.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center text-slate-500"
                style={cardStyle}
                data-ocid="crm.followups.empty_state"
              >
                No follow-ups found.
              </div>
            ) : (
              filteredFollowUps.map((fu, idx) => (
                <div
                  key={fu.id}
                  className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4"
                  style={cardStyle}
                  data-ocid={`crm.followup.item.${idx + 1}`}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background:
                        fu.type === "Call"
                          ? "rgba(37,99,235,0.2)"
                          : fu.type === "Email"
                            ? "rgba(168,85,247,0.2)"
                            : fu.type === "WhatsApp"
                              ? "rgba(34,197,94,0.2)"
                              : "rgba(249,115,22,0.2)",
                    }}
                  >
                    {fu.type === "Call" && (
                      <Phone className="w-5 h-5 text-blue-400" />
                    )}
                    {fu.type === "Email" && (
                      <Mail className="w-5 h-5 text-purple-400" />
                    )}
                    {fu.type === "WhatsApp" && (
                      <Send className="w-5 h-5 text-green-400" />
                    )}
                    {fu.type === "Meeting" && (
                      <CalendarCheck className="w-5 h-5 text-orange-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium text-sm">
                        {fu.clientName}
                      </span>
                      <Badge
                        className={`text-xs border ${FOLLOWUP_PRIORITY_COLORS[fu.priority]}`}
                      >
                        {fu.priority}
                      </Badge>
                      <Badge
                        className={`text-xs border ${FOLLOWUP_STATUS_COLORS[fu.status]}`}
                      >
                        {fu.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {fu.notes}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {fu.dueDate} · {fu.dueTime}
                      </span>
                      <span>{fu.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {fu.status !== "Completed" && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkFollowUp(fu.id, "Completed")}
                        className="bg-green-600/80 hover:bg-green-600 text-white text-xs h-7"
                        data-ocid={`crm.followup.complete_button.${idx + 1}`}
                      >
                        Mark Done
                      </Button>
                    )}
                    <button
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                      onClick={() =>
                        setFollowUps((prev) =>
                          prev.filter((f) => f.id !== fu.id),
                        )
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        {/* ── Quotations ───────────────────────────────────── */}
        <TabsContent value="quotations" className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={quotationFilter} onValueChange={setQuotationFilter}>
              <SelectTrigger
                className="w-full sm:w-44 bg-white/5 border-white/10 text-white"
                data-ocid="crm.quotation_filter.select"
              >
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-white/10">
                <SelectItem value="all">All Quotations</SelectItem>
                {["Draft", "Sent", "Accepted", "Rejected"].map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="sm:ml-auto">
              <Button
                onClick={() => setShowQuotationModal(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                data-ocid="crm.add_quotation.button"
              >
                <Plus className="w-4 h-4" /> Create Quotation
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {filteredQuotations.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center text-slate-500"
                style={cardStyle}
                data-ocid="crm.quotations.empty_state"
              >
                No quotations found.
              </div>
            ) : (
              filteredQuotations.map((qt, idx) => (
                <div
                  key={qt.id}
                  className="rounded-xl p-5"
                  style={cardStyle}
                  data-ocid={`crm.quotation.item.${idx + 1}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="font-mono text-xs text-blue-400">
                          {qt.ref}
                        </span>
                        <Badge
                          className={`text-xs border ${QUOTATION_STATUS_COLORS[qt.status]}`}
                        >
                          {qt.status}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {qt.createdAt}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold">
                        {qt.clientName}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {qt.destination} · {qt.travelDate || "TBD"} · {qt.pax}{" "}
                        pax
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {qt.inclusions.map((inc) => (
                          <span
                            key={inc}
                            className="text-xs bg-slate-700/50 text-slate-300 px-2 py-0.5 rounded-md border border-white/5"
                          >
                            {inc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-xl font-bold text-orange-400">
                          {qt.totalAmount}
                        </p>
                        <p className="text-xs text-green-400">
                          Margin: {qt.margin}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/10 text-slate-300 hover:bg-white/5 text-xs h-7 flex items-center gap-1"
                              data-ocid={`crm.quotation.status_button.${idx + 1}`}
                            >
                              Update <ChevronDown className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-900 border-white/10">
                            {(
                              [
                                "Draft",
                                "Sent",
                                "Accepted",
                                "Rejected",
                              ] as Quotation["status"][]
                            ).map((s) => (
                              <DropdownMenuItem
                                key={s}
                                onClick={() =>
                                  handleUpdateQuotationStatus(qt.id, s)
                                }
                                className="text-slate-300 hover:text-white cursor-pointer"
                              >
                                {s}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                          onClick={() =>
                            setQuotations((prev) =>
                              prev.filter((q) => q.id !== qt.id),
                            )
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* ── Add Lead Modal ──────────────────────────────────── */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent
          className="max-w-lg bg-slate-900 border-white/10 text-white"
          data-ocid="crm.add_lead.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              Add New Lead
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-slate-300 text-xs">Full Name *</Label>
              <Input
                placeholder="e.g. Rahul Verma"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_lead.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Email *</Label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_lead.email.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Phone *</Label>
              <Input
                placeholder="+91 98765 XXXXX"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_lead.phone.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Lead Source</Label>
              <Select
                value={form.source}
                onValueChange={(v) => setForm((f) => ({ ...f, source: v }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select source" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {[
                    "Website",
                    "Referral",
                    "Walk-in",
                    "Social Media",
                    "Agent Referral",
                  ].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Destination</Label>
              <Input
                placeholder="e.g. Dubai, Bali"
                value={form.destination}
                onChange={(e) =>
                  setForm((f) => ({ ...f, destination: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Travel Date</Label>
              <Input
                type="date"
                value={form.travelDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, travelDate: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Budget (₹)</Label>
              <Input
                placeholder="e.g. 120000"
                value={form.budget}
                onChange={(e) =>
                  setForm((f) => ({ ...f, budget: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-slate-300 text-xs">Notes</Label>
              <Textarea
                placeholder="Any additional notes…"
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowAddModal(false)}
              className="border-white/10 text-slate-300 hover:bg-white/5"
              data-ocid="crm.add_lead.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddLead}
              disabled={!form.name || !form.email || !form.phone}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              data-ocid="crm.add_lead.submit_button"
            >
              Add Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Enquiry Modal ──────────────────────────────── */}
      <Dialog open={showEnquiryModal} onOpenChange={setShowEnquiryModal}>
        <DialogContent
          className="max-w-lg bg-slate-900 border-white/10 text-white"
          data-ocid="crm.add_enquiry.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              Add New Enquiry
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-slate-300 text-xs">Client Name *</Label>
              <Input
                placeholder="e.g. Rahul Verma"
                value={eqForm.clientName}
                onChange={(e) =>
                  setEqForm((f) => ({ ...f, clientName: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_enquiry.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Phone</Label>
              <Input
                placeholder="+91 98765 XXXXX"
                value={eqForm.phone}
                onChange={(e) =>
                  setEqForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Module</Label>
              <Select
                value={eqForm.module}
                onValueChange={(v) => setEqForm((f) => ({ ...f, module: v }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {[
                    "Flight",
                    "Hotel",
                    "Tour",
                    "Transfer",
                    "Visa",
                    "Package",
                    "Cruise",
                    "Railway",
                  ].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Destination *</Label>
              <Input
                placeholder="e.g. Dubai"
                value={eqForm.destination}
                onChange={(e) =>
                  setEqForm((f) => ({ ...f, destination: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Travel Date</Label>
              <Input
                type="date"
                value={eqForm.travelDate}
                onChange={(e) =>
                  setEqForm((f) => ({ ...f, travelDate: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Pax</Label>
              <Input
                type="number"
                min="1"
                placeholder="2"
                value={eqForm.pax}
                onChange={(e) =>
                  setEqForm((f) => ({ ...f, pax: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Budget (₹)</Label>
              <Input
                placeholder="e.g. 80000"
                value={eqForm.budget}
                onChange={(e) =>
                  setEqForm((f) => ({ ...f, budget: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowEnquiryModal(false)}
              className="border-white/10 text-slate-300 hover:bg-white/5"
              data-ocid="crm.add_enquiry.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEnquiry}
              disabled={!eqForm.clientName || !eqForm.destination}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              data-ocid="crm.add_enquiry.submit_button"
            >
              Add Enquiry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Follow-up Modal ─────────────────────────────── */}
      <Dialog open={showFollowUpModal} onOpenChange={setShowFollowUpModal}>
        <DialogContent
          className="max-w-lg bg-slate-900 border-white/10 text-white"
          data-ocid="crm.add_followup.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              Add Follow-up
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-slate-300 text-xs">Client Name *</Label>
              <Input
                placeholder="e.g. Rahul Verma"
                value={fuForm.clientName}
                onChange={(e) =>
                  setFuForm((f) => ({ ...f, clientName: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_followup.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Phone</Label>
              <Input
                placeholder="+91 98765 XXXXX"
                value={fuForm.phone}
                onChange={(e) =>
                  setFuForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Type</Label>
              <Select
                value={fuForm.type}
                onValueChange={(v) => setFuForm((f) => ({ ...f, type: v }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {["Call", "Email", "WhatsApp", "Meeting"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Due Date *</Label>
              <Input
                type="date"
                value={fuForm.dueDate}
                onChange={(e) =>
                  setFuForm((f) => ({ ...f, dueDate: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white"
                data-ocid="crm.add_followup.date.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Time</Label>
              <Input
                placeholder="e.g. 10:00 AM"
                value={fuForm.dueTime}
                onChange={(e) =>
                  setFuForm((f) => ({ ...f, dueTime: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Priority</Label>
              <Select
                value={fuForm.priority}
                onValueChange={(v) => setFuForm((f) => ({ ...f, priority: v }))}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {["High", "Medium", "Low"].map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-slate-300 text-xs">Notes</Label>
              <Textarea
                placeholder="What to discuss or send…"
                value={fuForm.notes}
                onChange={(e) =>
                  setFuForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 resize-none"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFollowUpModal(false)}
              className="border-white/10 text-slate-300 hover:bg-white/5"
              data-ocid="crm.add_followup.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddFollowUp}
              disabled={!fuForm.clientName || !fuForm.dueDate}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              data-ocid="crm.add_followup.submit_button"
            >
              Add Follow-up
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Create Quotation Modal ──────────────────────────── */}
      <Dialog open={showQuotationModal} onOpenChange={setShowQuotationModal}>
        <DialogContent
          className="max-w-lg bg-slate-900 border-white/10 text-white"
          data-ocid="crm.add_quotation.modal"
        >
          <DialogHeader>
            <DialogTitle className="text-white text-lg font-bold">
              Create Quotation
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Client Name *</Label>
              <Input
                placeholder="e.g. Rahul Verma"
                value={qtForm.clientName}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, clientName: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_quotation.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Email</Label>
              <Input
                type="email"
                placeholder="client@email.com"
                value={qtForm.email}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, email: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Destination *</Label>
              <Input
                placeholder="e.g. Bali, Dubai"
                value={qtForm.destination}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, destination: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Travel Date</Label>
              <Input
                type="date"
                value={qtForm.travelDate}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, travelDate: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Pax</Label>
              <Input
                type="number"
                min="1"
                placeholder="2"
                value={qtForm.pax}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, pax: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">
                Total Amount (₹) *
              </Label>
              <Input
                placeholder="e.g. 256000"
                value={qtForm.totalAmount}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, totalAmount: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                data-ocid="crm.add_quotation.amount.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Margin (%)</Label>
              <Input
                placeholder="e.g. 12"
                value={qtForm.margin}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, margin: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label className="text-slate-300 text-xs">
                Inclusions (comma separated)
              </Label>
              <Input
                placeholder="Return Flights, 5N Hotel, Transfers, Tours"
                value={qtForm.inclusions}
                onChange={(e) =>
                  setQtForm((f) => ({ ...f, inclusions: e.target.value }))
                }
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowQuotationModal(false)}
              className="border-white/10 text-slate-300 hover:bg-white/5"
              data-ocid="crm.add_quotation.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddQuotation}
              disabled={
                !qtForm.clientName || !qtForm.destination || !qtForm.totalAmount
              }
              className="bg-orange-500 hover:bg-orange-600 text-white"
              data-ocid="crm.add_quotation.submit_button"
            >
              Create Quotation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
