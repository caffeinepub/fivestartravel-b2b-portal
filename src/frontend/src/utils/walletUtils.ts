const WALLET_KEY = "fstwallet";
const INITIAL_BALANCE = 124800;

export function getWalletBalance(): number {
  const stored = localStorage.getItem(WALLET_KEY);
  if (stored === null) {
    localStorage.setItem(WALLET_KEY, String(INITIAL_BALANCE));
    return INITIAL_BALANCE;
  }
  return Number.parseInt(stored, 10);
}

export function deductWalletBalance(amount: number): number {
  const current = getWalletBalance();
  const newBalance = Math.max(0, current - amount);
  localStorage.setItem(WALLET_KEY, String(newBalance));
  return newBalance;
}

export function addWalletBalance(amount: number): number {
  const current = getWalletBalance();
  const newBalance = current + amount;
  localStorage.setItem(WALLET_KEY, String(newBalance));
  return newBalance;
}

const TXN_KEY = "fsttxns";

export interface WalletTransaction {
  id: string;
  date: string;
  ref: string;
  type: "Credit" | "Debit";
  description: string;
  amount: number;
  balance: number;
  status: "Success" | "Pending" | "Failed";
  category: string;
}

export function getTransactions(): WalletTransaction[] {
  const stored = localStorage.getItem(TXN_KEY);
  if (stored) return JSON.parse(stored);
  const seed: WalletTransaction[] = [
    {
      id: "t1",
      date: "2026-03-09T10:23:00Z",
      ref: "FST-TXN-20260309-001",
      type: "Credit",
      description: "Wallet Top-up via UPI",
      amount: 50000,
      balance: 124800,
      status: "Success",
      category: "Top-up",
    },
    {
      id: "t2",
      date: "2026-03-09T11:00:00Z",
      ref: "FST-FLT-20260309-102",
      type: "Debit",
      description: "Flight DEL→DXB (2 PAX)",
      amount: 24500,
      balance: 100300,
      status: "Success",
      category: "Flight",
    },
    {
      id: "t3",
      date: "2026-03-08T09:15:00Z",
      ref: "FST-HTL-20260308-045",
      type: "Debit",
      description: "Atlantis The Palm – 2 nights",
      amount: 36400,
      balance: 124800,
      status: "Success",
      category: "Hotel",
    },
    {
      id: "t4",
      date: "2026-03-08T14:30:00Z",
      ref: "FST-TXN-20260308-002",
      type: "Credit",
      description: "Wallet Top-up via Net Banking",
      amount: 100000,
      balance: 161200,
      status: "Success",
      category: "Top-up",
    },
    {
      id: "t5",
      date: "2026-03-07T08:00:00Z",
      ref: "FST-VISA-20260307-012",
      type: "Debit",
      description: "UAE eVisa – 3 applicants",
      amount: 8400,
      balance: 61200,
      status: "Success",
      category: "Visa",
    },
    {
      id: "t6",
      date: "2026-03-07T16:45:00Z",
      ref: "FST-TRF-20260307-033",
      type: "Debit",
      description: "Airport Transfer – SUV (DXB)",
      amount: 3200,
      balance: 52800,
      status: "Success",
      category: "Transfer",
    },
    {
      id: "t7",
      date: "2026-03-06T12:10:00Z",
      ref: "FST-TOUR-20260306-007",
      type: "Debit",
      description: "Desert Safari – 4 adults",
      amount: 11140,
      balance: 56000,
      status: "Success",
      category: "Tour",
    },
    {
      id: "t8",
      date: "2026-03-06T09:00:00Z",
      ref: "FST-TXN-20260306-003",
      type: "Credit",
      description: "Refund – Hotel Cancellation",
      amount: 18200,
      balance: 67140,
      status: "Success",
      category: "Refund",
    },
    {
      id: "t9",
      date: "2026-03-05T11:30:00Z",
      ref: "FST-FLT-20260305-088",
      type: "Debit",
      description: "Flight BOM→SIN (1 PAX)",
      amount: 18750,
      balance: 48940,
      status: "Success",
      category: "Flight",
    },
    {
      id: "t10",
      date: "2026-03-05T15:00:00Z",
      ref: "FST-PKG-20260305-002",
      type: "Debit",
      description: "Bangkok Package – 2 PAX",
      amount: 62000,
      balance: 30190,
      status: "Success",
      category: "Package",
    },
    {
      id: "t11",
      date: "2026-03-04T10:00:00Z",
      ref: "FST-TXN-20260304-004",
      type: "Credit",
      description: "Wallet Top-up via Credit Card",
      amount: 200000,
      balance: 92190,
      status: "Success",
      category: "Top-up",
    },
    {
      id: "t12",
      date: "2026-03-04T14:00:00Z",
      ref: "FST-CRZ-20260304-003",
      type: "Debit",
      description: "Cruise Booking – Mediterranean",
      amount: 45000,
      balance: 292190,
      status: "Success",
      category: "Cruise",
    },
    {
      id: "t13",
      date: "2026-03-03T09:45:00Z",
      ref: "FST-RAIL-20260303-011",
      type: "Debit",
      description: "Railway DEL→MUM (4 PAX)",
      amount: 4800,
      balance: 247190,
      status: "Success",
      category: "Railway",
    },
    {
      id: "t14",
      date: "2026-03-03T16:20:00Z",
      ref: "FST-GDS-20260303-005",
      type: "Debit",
      description: "GDS Booking – Amadeus (3J456)",
      amount: 21000,
      balance: 242390,
      status: "Success",
      category: "GDS",
    },
    {
      id: "t15",
      date: "2026-03-02T11:00:00Z",
      ref: "FST-TXN-20260302-005",
      type: "Credit",
      description: "Refund – Flight Cancellation",
      amount: 12500,
      balance: 263390,
      status: "Success",
      category: "Refund",
    },
    {
      id: "t16",
      date: "2026-03-02T13:30:00Z",
      ref: "FST-HTL-20260302-031",
      type: "Debit",
      description: "JW Marriott Dubai – 3 nights",
      amount: 52200,
      balance: 250890,
      status: "Success",
      category: "Hotel",
    },
    {
      id: "t17",
      date: "2026-03-01T10:15:00Z",
      ref: "FST-VISA-20260301-008",
      type: "Debit",
      description: "Schengen Visa (offline) – 2 PAX",
      amount: 16800,
      balance: 198690,
      status: "Pending",
      category: "Visa",
    },
    {
      id: "t18",
      date: "2026-03-01T14:00:00Z",
      ref: "FST-TXN-20260301-006",
      type: "Credit",
      description: "Wallet Top-up via UPI",
      amount: 75000,
      balance: 215490,
      status: "Success",
      category: "Top-up",
    },
    {
      id: "t19",
      date: "2026-02-28T09:00:00Z",
      ref: "FST-FLT-20260228-077",
      type: "Debit",
      description: "Flight DEL→LHR – Business (1 PAX)",
      amount: 98000,
      balance: 140490,
      status: "Success",
      category: "Flight",
    },
    {
      id: "t20",
      date: "2026-02-28T17:00:00Z",
      ref: "FST-TXN-20260228-007",
      type: "Credit",
      description: "Wallet Top-up via Net Banking",
      amount: 150000,
      balance: 238490,
      status: "Success",
      category: "Top-up",
    },
  ];
  localStorage.setItem(TXN_KEY, JSON.stringify(seed));
  return seed;
}

export function addTransaction(txn: WalletTransaction) {
  const txns = getTransactions();
  txns.unshift(txn);
  localStorage.setItem(TXN_KEY, JSON.stringify(txns));
}
