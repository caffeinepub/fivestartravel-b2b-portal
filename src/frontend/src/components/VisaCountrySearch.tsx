import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, Clock, Globe, Search, Star } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export interface ChecklistItem {
  id: string;
  category: string;
  document: string;
  mandatory: boolean;
  notes?: string;
}

export interface VisaCountry {
  code: string;
  name: string;
  flag: string;
  region: string;
  visaType: "e-Visa" | "Sticker Visa" | "Visa on Arrival" | "Visa Free";
  fee: number;
  processing: string;
  validity: string;
  maxStay: string;
  evisaChecklist: ChecklistItem[];
  offlineChecklist: ChecklistItem[];
}

interface VisaCountrySearchProps {
  onSelectCountry: (country: VisaCountry) => void;
  visaTab?: "evisa" | "offline";
}

const COUNTRIES: VisaCountry[] = [
  {
    code: "AE",
    name: "UAE (Dubai)",
    flag: "🇦🇪",
    region: "Middle East",
    visaType: "e-Visa",
    fee: 90,
    processing: "3–5 business days",
    validity: "30 days / single entry",
    maxStay: "30 days",
    evisaChecklist: [
      {
        id: "ae-ev-1",
        category: "Identity",
        document: "Passport scan (first & last page)",
        mandatory: true,
        notes: "Valid for 6+ months",
      },
      {
        id: "ae-ev-2",
        category: "Photo",
        document: "Passport-size photo (white background)",
        mandatory: true,
        notes: "Recent 3 months",
      },
      {
        id: "ae-ev-3",
        category: "Financial",
        document: "Bank statement (last 3 months)",
        mandatory: true,
        notes: "Min balance USD 1,000",
      },
      {
        id: "ae-ev-4",
        category: "Travel",
        document: "Confirmed flight booking",
        mandatory: true,
      },
      {
        id: "ae-ev-5",
        category: "Travel",
        document: "Hotel booking confirmation",
        mandatory: true,
      },
      {
        id: "ae-ev-6",
        category: "Insurance",
        document: "Travel insurance (min $50,000 cover)",
        mandatory: false,
      },
      {
        id: "ae-ev-7",
        category: "Employment",
        document: "Employment letter / NOC",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "ae-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "ae-off-2",
        category: "Identity",
        document: "Passport copy (all pages)",
        mandatory: true,
      },
      {
        id: "ae-off-3",
        category: "Photo",
        document: "2 passport-size photos",
        mandatory: true,
      },
      {
        id: "ae-off-4",
        category: "Financial",
        document: "Bank statement (3 months)",
        mandatory: true,
      },
      {
        id: "ae-off-5",
        category: "Travel",
        document: "Flight itinerary",
        mandatory: true,
      },
      {
        id: "ae-off-6",
        category: "Travel",
        document: "Hotel booking",
        mandatory: true,
      },
      {
        id: "ae-off-7",
        category: "Employment",
        document: "Employment letter / NOC",
        mandatory: true,
      },
      {
        id: "ae-off-8",
        category: "Financial",
        document: "ITR / Income proof (last 2 years)",
        mandatory: false,
      },
      {
        id: "ae-off-9",
        category: "Cover",
        document: "Cover letter explaining purpose of visit",
        mandatory: false,
      },
    ],
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    region: "Americas",
    visaType: "Sticker Visa",
    fee: 185,
    processing: "60–90 business days",
    validity: "10 years / multiple entry",
    maxStay: "180 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "us-off-1",
        category: "Identity",
        document: "Original passport (valid 6+ months)",
        mandatory: true,
      },
      {
        id: "us-off-2",
        category: "Photo",
        document: "2 US visa photos (2x2 inch)",
        mandatory: true,
      },
      {
        id: "us-off-3",
        category: "Form",
        document: "DS-160 confirmation page",
        mandatory: true,
      },
      {
        id: "us-off-4",
        category: "Financial",
        document: "Bank statement (last 6 months)",
        mandatory: true,
      },
      {
        id: "us-off-5",
        category: "Employment",
        document: "Employment letter with salary",
        mandatory: true,
      },
      {
        id: "us-off-6",
        category: "Financial",
        document: "ITR (last 3 years)",
        mandatory: true,
      },
      {
        id: "us-off-7",
        category: "Travel",
        document: "Flight itinerary",
        mandatory: false,
      },
      {
        id: "us-off-8",
        category: "Travel",
        document: "Hotel booking",
        mandatory: false,
      },
      {
        id: "us-off-9",
        category: "Property",
        document: "Property documents / ties to home country",
        mandatory: false,
      },
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    visaType: "Sticker Visa",
    fee: 160,
    processing: "15 business days",
    validity: "6 months / single or multiple entry",
    maxStay: "180 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "gb-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "gb-off-2",
        category: "Photo",
        document: "2 UK-standard photos",
        mandatory: true,
      },
      {
        id: "gb-off-3",
        category: "Financial",
        document: "Bank statement (6 months)",
        mandatory: true,
      },
      {
        id: "gb-off-4",
        category: "Employment",
        document: "Employment letter & leave approval",
        mandatory: true,
      },
      {
        id: "gb-off-5",
        category: "Travel",
        document: "Flight booking confirmation",
        mandatory: true,
      },
      {
        id: "gb-off-6",
        category: "Travel",
        document: "Hotel / accommodation proof",
        mandatory: true,
      },
      {
        id: "gb-off-7",
        category: "Financial",
        document: "ITR last 3 years",
        mandatory: false,
      },
      {
        id: "gb-off-8",
        category: "Insurance",
        document: "Travel insurance",
        mandatory: false,
      },
    ],
  },
  {
    code: "FR",
    name: "France (Schengen)",
    flag: "🇫🇷",
    region: "Europe",
    visaType: "Sticker Visa",
    fee: 90,
    processing: "15 business days",
    validity: "90 days / single or multiple entry",
    maxStay: "90 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "fr-off-1",
        category: "Identity",
        document: "Original passport (valid 3 months beyond stay)",
        mandatory: true,
      },
      {
        id: "fr-off-2",
        category: "Photo",
        document: "2 Schengen-standard photos",
        mandatory: true,
      },
      {
        id: "fr-off-3",
        category: "Financial",
        document: "Bank statement (last 3 months)",
        mandatory: true,
      },
      {
        id: "fr-off-4",
        category: "Employment",
        document: "Employment letter / NOC",
        mandatory: true,
      },
      {
        id: "fr-off-5",
        category: "Travel",
        document: "Round-trip flight booking",
        mandatory: true,
      },
      {
        id: "fr-off-6",
        category: "Travel",
        document: "Hotel booking for entire stay",
        mandatory: true,
      },
      {
        id: "fr-off-7",
        category: "Insurance",
        document: "Travel insurance (min €30,000 Schengen cover)",
        mandatory: true,
      },
      {
        id: "fr-off-8",
        category: "Financial",
        document: "ITR / income proof",
        mandatory: false,
      },
      {
        id: "fr-off-9",
        category: "Cover",
        document: "Schengen cover letter",
        mandatory: false,
      },
    ],
  },
  {
    code: "TH",
    name: "Thailand",
    flag: "🇹🇭",
    region: "Asia",
    visaType: "Visa on Arrival",
    fee: 35,
    processing: "1 day",
    validity: "15 days / single entry",
    maxStay: "15 days",
    evisaChecklist: [
      {
        id: "th-ev-1",
        category: "Identity",
        document: "Passport scan (6+ months validity)",
        mandatory: true,
      },
      {
        id: "th-ev-2",
        category: "Photo",
        document: "Recent passport photo",
        mandatory: true,
      },
      {
        id: "th-ev-3",
        category: "Travel",
        document: "Return flight booking",
        mandatory: true,
      },
      {
        id: "th-ev-4",
        category: "Travel",
        document: "Hotel / accommodation proof",
        mandatory: true,
      },
      {
        id: "th-ev-5",
        category: "Financial",
        document: "Bank statement showing sufficient funds",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "th-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "th-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "th-off-3",
        category: "Form",
        document: "Arrival card (TM6)",
        mandatory: true,
      },
      {
        id: "th-off-4",
        category: "Travel",
        document: "Onward / return ticket",
        mandatory: true,
      },
      {
        id: "th-off-5",
        category: "Financial",
        document: "Cash THB 10,000 per person or proof of funds",
        mandatory: true,
      },
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Asia",
    visaType: "e-Visa",
    fee: 30,
    processing: "2–3 business days",
    validity: "30 days / single entry",
    maxStay: "30 days",
    evisaChecklist: [
      {
        id: "sg-ev-1",
        category: "Identity",
        document: "Passport scan",
        mandatory: true,
      },
      {
        id: "sg-ev-2",
        category: "Photo",
        document: "Digital passport photo",
        mandatory: true,
      },
      {
        id: "sg-ev-3",
        category: "Financial",
        document: "Bank statement (3 months)",
        mandatory: true,
      },
      {
        id: "sg-ev-4",
        category: "Travel",
        document: "Return flight booking",
        mandatory: true,
      },
      {
        id: "sg-ev-5",
        category: "Travel",
        document: "Hotel booking",
        mandatory: true,
      },
      {
        id: "sg-ev-6",
        category: "Employment",
        document: "Employment letter",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "sg-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "sg-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "sg-off-3",
        category: "Financial",
        document: "Bank statement",
        mandatory: true,
      },
      {
        id: "sg-off-4",
        category: "Travel",
        document: "Flight + hotel bookings",
        mandatory: true,
      },
      {
        id: "sg-off-5",
        category: "Employment",
        document: "NOC from employer",
        mandatory: true,
      },
      {
        id: "sg-off-6",
        category: "Financial",
        document: "ITR",
        mandatory: false,
      },
    ],
  },
  {
    code: "MY",
    name: "Malaysia",
    flag: "🇲🇾",
    region: "Asia",
    visaType: "Visa Free",
    fee: 0,
    processing: "No visa required",
    validity: "30 days",
    maxStay: "30 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "my-off-1",
        category: "Identity",
        document: "Valid passport (6+ months validity)",
        mandatory: true,
      },
      {
        id: "my-off-2",
        category: "Travel",
        document: "Return flight ticket",
        mandatory: true,
      },
      {
        id: "my-off-3",
        category: "Financial",
        document: "Proof of sufficient funds",
        mandatory: false,
      },
    ],
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    visaType: "Sticker Visa",
    fee: 20,
    processing: "10 business days",
    validity: "90 days / single entry",
    maxStay: "15 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "jp-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "jp-off-2",
        category: "Photo",
        document: "2 passport photos (4.5x4.5cm)",
        mandatory: true,
      },
      {
        id: "jp-off-3",
        category: "Form",
        document: "Japan visa application form",
        mandatory: true,
      },
      {
        id: "jp-off-4",
        category: "Financial",
        document: "Bank statement (3 months)",
        mandatory: true,
      },
      {
        id: "jp-off-5",
        category: "Employment",
        document: "Employment certificate",
        mandatory: true,
      },
      {
        id: "jp-off-6",
        category: "Travel",
        document: "Detailed itinerary",
        mandatory: true,
      },
      {
        id: "jp-off-7",
        category: "Travel",
        document: "Flight + hotel bookings",
        mandatory: false,
      },
      {
        id: "jp-off-8",
        category: "Financial",
        document: "ITR (last 2 years)",
        mandatory: false,
      },
    ],
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    visaType: "e-Visa",
    fee: 20,
    processing: "1 day",
    validity: "1 year / multiple entry",
    maxStay: "90 days per visit",
    evisaChecklist: [
      {
        id: "au-ev-1",
        category: "Identity",
        document: "Passport scan (biometric)",
        mandatory: true,
      },
      {
        id: "au-ev-2",
        category: "Photo",
        document: "Digital photo (recent)",
        mandatory: true,
      },
      {
        id: "au-ev-3",
        category: "Financial",
        document: "Bank statement",
        mandatory: true,
      },
      {
        id: "au-ev-4",
        category: "Travel",
        document: "Return flight booking",
        mandatory: false,
      },
      {
        id: "au-ev-5",
        category: "Insurance",
        document: "Travel insurance",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "au-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "au-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "au-off-3",
        category: "Financial",
        document: "Bank statement (6 months)",
        mandatory: true,
      },
      {
        id: "au-off-4",
        category: "Employment",
        document: "Employment letter",
        mandatory: true,
      },
      {
        id: "au-off-5",
        category: "Travel",
        document: "Flight + hotel booking",
        mandatory: true,
      },
      {
        id: "au-off-6",
        category: "Financial",
        document: "ITR (2 years)",
        mandatory: true,
      },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    region: "Americas",
    visaType: "Sticker Visa",
    fee: 150,
    processing: "45 business days",
    validity: "10 years / multiple entry",
    maxStay: "180 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "ca-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "ca-off-2",
        category: "Photo",
        document: "2 Canada-standard photos",
        mandatory: true,
      },
      {
        id: "ca-off-3",
        category: "Form",
        document: "IMM5257 application form",
        mandatory: true,
      },
      {
        id: "ca-off-4",
        category: "Financial",
        document: "Bank statement (6 months)",
        mandatory: true,
      },
      {
        id: "ca-off-5",
        category: "Employment",
        document: "Employment letter with salary",
        mandatory: true,
      },
      {
        id: "ca-off-6",
        category: "Financial",
        document: "ITR (last 3 years)",
        mandatory: true,
      },
      {
        id: "ca-off-7",
        category: "Travel",
        document: "Flight + hotel booking",
        mandatory: false,
      },
      {
        id: "ca-off-8",
        category: "Cover",
        document: "Purpose of visit letter",
        mandatory: false,
      },
    ],
  },
  {
    code: "TR",
    name: "Turkey",
    flag: "🇹🇷",
    region: "Middle East",
    visaType: "e-Visa",
    fee: 50,
    processing: "5 minutes",
    validity: "180 days / multiple entry",
    maxStay: "90 days",
    evisaChecklist: [
      {
        id: "tr-ev-1",
        category: "Identity",
        document: "Passport scan",
        mandatory: true,
      },
      {
        id: "tr-ev-2",
        category: "Financial",
        document: "Valid credit/debit card for payment",
        mandatory: true,
      },
      {
        id: "tr-ev-3",
        category: "Travel",
        document: "Return flight booking (recommended)",
        mandatory: false,
      },
      {
        id: "tr-ev-4",
        category: "Travel",
        document: "Hotel booking",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "tr-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "tr-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "tr-off-3",
        category: "Financial",
        document: "Bank statement",
        mandatory: true,
      },
      {
        id: "tr-off-4",
        category: "Travel",
        document: "Flight + hotel confirmation",
        mandatory: true,
      },
    ],
  },
  {
    code: "ID",
    name: "Indonesia (Bali)",
    flag: "🇮🇩",
    region: "Asia",
    visaType: "Visa on Arrival",
    fee: 35,
    processing: "1 day",
    validity: "30 days / single entry",
    maxStay: "30 days",
    evisaChecklist: [
      {
        id: "id-ev-1",
        category: "Identity",
        document: "Passport scan (6+ months validity)",
        mandatory: true,
      },
      {
        id: "id-ev-2",
        category: "Photo",
        document: "Digital passport photo",
        mandatory: true,
      },
      {
        id: "id-ev-3",
        category: "Travel",
        document: "Return flight booking",
        mandatory: true,
      },
      {
        id: "id-ev-4",
        category: "Travel",
        document: "Hotel booking",
        mandatory: true,
      },
    ],
    offlineChecklist: [
      {
        id: "id-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "id-off-2",
        category: "Travel",
        document: "Return ticket",
        mandatory: true,
      },
      {
        id: "id-off-3",
        category: "Financial",
        document: "Cash USD 35 for VOA fee",
        mandatory: true,
      },
      {
        id: "id-off-4",
        category: "Financial",
        document: "Proof of sufficient funds",
        mandatory: false,
      },
    ],
  },
  {
    code: "LK",
    name: "Sri Lanka",
    flag: "🇱🇰",
    region: "Asia",
    visaType: "e-Visa",
    fee: 20,
    processing: "2 days",
    validity: "180 days / double entry",
    maxStay: "30 days",
    evisaChecklist: [
      {
        id: "lk-ev-1",
        category: "Identity",
        document: "Passport scan",
        mandatory: true,
      },
      {
        id: "lk-ev-2",
        category: "Photo",
        document: "Digital photo",
        mandatory: true,
      },
      {
        id: "lk-ev-3",
        category: "Travel",
        document: "Return flight booking",
        mandatory: true,
      },
      {
        id: "lk-ev-4",
        category: "Travel",
        document: "Accommodation proof",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "lk-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "lk-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "lk-off-3",
        category: "Travel",
        document: "Return flight + hotel",
        mandatory: true,
      },
    ],
  },
  {
    code: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    region: "Asia",
    visaType: "e-Visa",
    fee: 25,
    processing: "3 business days",
    validity: "90 days / single or multiple entry",
    maxStay: "90 days",
    evisaChecklist: [
      {
        id: "vn-ev-1",
        category: "Identity",
        document: "Passport scan (6+ months)",
        mandatory: true,
      },
      {
        id: "vn-ev-2",
        category: "Photo",
        document: "Digital passport photo",
        mandatory: true,
      },
      {
        id: "vn-ev-3",
        category: "Travel",
        document: "Flight booking (entry & exit)",
        mandatory: true,
      },
      {
        id: "vn-ev-4",
        category: "Travel",
        document: "Accommodation address in Vietnam",
        mandatory: true,
      },
      {
        id: "vn-ev-5",
        category: "Insurance",
        document: "Travel insurance",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "vn-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "vn-off-2",
        category: "Photo",
        document: "2 photos (4x6cm)",
        mandatory: true,
      },
      {
        id: "vn-off-3",
        category: "Form",
        document: "NA1 application form",
        mandatory: true,
      },
      {
        id: "vn-off-4",
        category: "Financial",
        document: "Bank statement",
        mandatory: true,
      },
      {
        id: "vn-off-5",
        category: "Employment",
        document: "Employment letter",
        mandatory: false,
      },
    ],
  },
  {
    code: "EG",
    name: "Egypt",
    flag: "🇪🇬",
    region: "Africa",
    visaType: "Visa on Arrival",
    fee: 25,
    processing: "1 day",
    validity: "30 days / single entry",
    maxStay: "30 days",
    evisaChecklist: [
      {
        id: "eg-ev-1",
        category: "Identity",
        document: "Passport scan",
        mandatory: true,
      },
      {
        id: "eg-ev-2",
        category: "Photo",
        document: "Digital photo",
        mandatory: true,
      },
      {
        id: "eg-ev-3",
        category: "Travel",
        document: "Return ticket",
        mandatory: true,
      },
      {
        id: "eg-ev-4",
        category: "Travel",
        document: "Hotel booking",
        mandatory: true,
      },
    ],
    offlineChecklist: [
      {
        id: "eg-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "eg-off-2",
        category: "Financial",
        document: "USD 25 cash for VOA fee",
        mandatory: true,
      },
      {
        id: "eg-off-3",
        category: "Travel",
        document: "Return ticket",
        mandatory: true,
      },
    ],
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    region: "Africa",
    visaType: "e-Visa",
    fee: 51,
    processing: "3 business days",
    validity: "90 days / single entry",
    maxStay: "90 days",
    evisaChecklist: [
      {
        id: "ke-ev-1",
        category: "Identity",
        document: "Passport scan (6+ months)",
        mandatory: true,
      },
      {
        id: "ke-ev-2",
        category: "Photo",
        document: "Digital passport photo",
        mandatory: true,
      },
      {
        id: "ke-ev-3",
        category: "Travel",
        document: "Return flight booking",
        mandatory: true,
      },
      {
        id: "ke-ev-4",
        category: "Travel",
        document: "Hotel / accommodation",
        mandatory: true,
      },
      {
        id: "ke-ev-5",
        category: "Financial",
        document: "Bank statement",
        mandatory: false,
      },
      {
        id: "ke-ev-6",
        category: "Insurance",
        document: "Yellow fever vaccination certificate",
        mandatory: true,
        notes: "Required for India nationals",
      },
    ],
    offlineChecklist: [
      {
        id: "ke-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "ke-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "ke-off-3",
        category: "Travel",
        document: "Flight + accommodation booking",
        mandatory: true,
      },
      {
        id: "ke-off-4",
        category: "Insurance",
        document: "Yellow fever certificate",
        mandatory: true,
      },
      {
        id: "ke-off-5",
        category: "Financial",
        document: "Bank statement",
        mandatory: false,
      },
    ],
  },
  {
    code: "NZ",
    name: "New Zealand",
    flag: "🇳🇿",
    region: "Oceania",
    visaType: "e-Visa",
    fee: 17,
    processing: "1 day",
    validity: "2 years / multiple entry",
    maxStay: "90 days per visit",
    evisaChecklist: [
      {
        id: "nz-ev-1",
        category: "Identity",
        document: "Passport scan",
        mandatory: true,
      },
      {
        id: "nz-ev-2",
        category: "Photo",
        document: "Digital photo",
        mandatory: true,
      },
      {
        id: "nz-ev-3",
        category: "Travel",
        document: "Return flight booking",
        mandatory: false,
      },
      {
        id: "nz-ev-4",
        category: "Insurance",
        document: "Travel insurance",
        mandatory: false,
      },
    ],
    offlineChecklist: [
      {
        id: "nz-off-1",
        category: "Identity",
        document: "Original passport",
        mandatory: true,
      },
      {
        id: "nz-off-2",
        category: "Photo",
        document: "2 passport photos",
        mandatory: true,
      },
      {
        id: "nz-off-3",
        category: "Financial",
        document: "Bank statement (3 months)",
        mandatory: true,
      },
      {
        id: "nz-off-4",
        category: "Employment",
        document: "Employment letter",
        mandatory: true,
      },
      {
        id: "nz-off-5",
        category: "Travel",
        document: "Flight + hotel booking",
        mandatory: true,
      },
    ],
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    region: "Africa",
    visaType: "Visa Free",
    fee: 0,
    processing: "No visa required",
    validity: "30 days",
    maxStay: "30 days",
    evisaChecklist: [],
    offlineChecklist: [
      {
        id: "za-off-1",
        category: "Identity",
        document: "Valid passport (30+ days beyond stay)",
        mandatory: true,
      },
      {
        id: "za-off-2",
        category: "Travel",
        document: "Return ticket",
        mandatory: true,
      },
      {
        id: "za-off-3",
        category: "Financial",
        document: "Proof of accommodation",
        mandatory: false,
      },
    ],
  },
];

const POPULAR_CODES = ["AE", "US", "TH", "FR", "AU"];
const REGIONS = [
  "All",
  "Asia",
  "Europe",
  "Americas",
  "Middle East",
  "Africa",
  "Oceania",
];
const VISA_TYPES = [
  "All",
  "e-Visa",
  "Sticker Visa",
  "Visa on Arrival",
  "Visa Free",
];

const visaTypeBadge: Record<string, string> = {
  "e-Visa": "bg-blue-100 text-blue-700 border-blue-200",
  "Sticker Visa": "bg-orange-100 text-orange-700 border-orange-200",
  "Visa on Arrival": "bg-green-100 text-green-700 border-green-200",
  "Visa Free": "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function CountrySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {["s1", "s2", "s3", "s4", "s5", "s6"].map((sk) => (
        <Card key={sk} className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-28 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-3 w-full mb-2" />
            <Skeleton className="h-3 w-3/4 mb-4" />
            <Skeleton className="h-9 w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function CountryCard({
  country,
  index,
  onSelect,
}: {
  country: VisaCountry;
  index: number;
  onSelect: () => void;
  isOnline?: boolean;
}) {
  const isEvisa =
    country.visaType === "e-Visa" || country.visaType === "Visa on Arrival";
  return (
    <Card
      className="group overflow-hidden border border-border hover:border-primary/40 hover:shadow-lg transition-all duration-200 cursor-pointer bg-card"
      data-ocid={`visa.country.item.${index}`}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-4xl leading-none">{country.flag}</span>
            <div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {country.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border mt-1 ${visaTypeBadge[country.visaType]}`}
              >
                {country.visaType}
              </span>
            </div>
          </div>
          <div className="text-right">
            {country.fee === 0 ? (
              <span className="text-emerald-600 font-bold text-sm">FREE</span>
            ) : (
              <span className="text-foreground font-bold text-sm">
                ${country.fee}
              </span>
            )}
            <p className="text-muted-foreground text-xs">fee</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-4">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span>{country.processing}</span>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          <span className="font-medium text-foreground">Validity:</span>{" "}
          {country.validity}
        </div>

        <Button
          size="sm"
          className={`w-full ${isEvisa ? "bg-emerald-600 hover:bg-emerald-700" : "bg-[#0B5ED7] hover:bg-blue-700"} text-white`}
          onClick={onSelect}
          data-ocid={`visa.apply.button.${index}`}
        >
          {isEvisa ? "Apply eVisa" : "Apply Offline"}{" "}
          <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function VisaCountrySearch({
  onSelectCountry,
  visaTab = "evisa",
}: VisaCountrySearchProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [visaType, setVisaType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return COUNTRIES.filter((c) => {
      const matchQuery =
        query === "" || c.name.toLowerCase().includes(query.toLowerCase());
      const matchRegion = region === "All" || c.region === region;
      const matchType = visaType === "All" || c.visaType === visaType;
      const isOnline =
        c.visaType === "e-Visa" || c.visaType === "Visa on Arrival";
      const matchTab = visaTab === "evisa" ? isOnline : !isOnline;
      return matchQuery && matchRegion && matchType && matchTab;
    });
  }, [query, region, visaType, visaTab]);

  const popular = COUNTRIES.filter((c) => POPULAR_CODES.includes(c.code));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0B5ED7] via-[#1044a3] to-[#1E293B] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe className="w-7 h-7 text-white/80" />
            <span className="text-white/80 text-sm font-medium tracking-widest uppercase">
              Visa Services
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Where do you want to go?
          </h1>
          <p className="text-white/70 mb-8 text-base">
            Fast, hassle-free visa processing for 180+ countries
          </p>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              className="pl-12 h-13 text-base rounded-xl border-0 shadow-xl"
              placeholder="Search country, e.g. Dubai, USA, Thailand…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-ocid="visa.search.input"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Popular destinations */}
        {query === "" && region === "All" && visaType === "All" && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-500" />
              <h2 className="font-semibold text-foreground">
                Popular Destinations
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {popular.map((c) => (
                <button
                  type="button"
                  key={c.code}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-sm font-medium text-foreground"
                  onClick={() => onSelectCountry(c)}
                  data-ocid="visa.popular.button"
                >
                  <span className="text-xl">{c.flag}</span>
                  <span>{c.name}</span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full border ${visaTypeBadge[c.visaType]}`}
                  >
                    {c.visaType}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Region tabs */}
        <div className="flex gap-2 flex-wrap mb-4" role="tablist">
          {REGIONS.map((r) => (
            <button
              type="button"
              key={r}
              role="tab"
              aria-selected={region === r}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                region === r
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/50"
              }`}
              onClick={() => setRegion(r)}
              data-ocid="visa.region.tab"
            >
              {r}
            </button>
          ))}
        </div>

        {/* Visa type pills */}
        <div className="flex gap-2 flex-wrap mb-6" role="tablist">
          {VISA_TYPES.map((v) => (
            <button
              type="button"
              key={v}
              role="tab"
              aria-selected={visaType === v}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                visaType === v
                  ? "bg-[#1E293B] text-white border-[#1E293B]"
                  : "bg-card text-muted-foreground border-border hover:border-[#1E293B]/50"
              }`}
              onClick={() => setVisaType(v)}
              data-ocid="visa.type.tab"
            >
              {v}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-muted-foreground mb-4">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filtered.length}
            </span>{" "}
            destinations
          </p>
        )}

        {/* Grid or skeleton */}
        {loading ? (
          <CountrySkeleton />
        ) : filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="visa.empty_state">
            <Globe className="w-14 h-14 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No destinations found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try adjusting your search or filters
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setRegion("All");
                setVisaType("All");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((country, idx) => (
              <CountryCard
                key={country.code}
                country={country}
                index={idx + 1}
                onSelect={() => onSelectCountry(country)}
                isOnline={
                  country.visaType === "e-Visa" ||
                  country.visaType === "Visa on Arrival"
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
