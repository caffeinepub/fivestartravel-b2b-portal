import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import {
  type WalletTransaction,
  addTransaction,
  addWalletBalance,
  getTransactions,
  getWalletBalance,
} from "@/utils/walletUtils";
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Download,
  Send,
  Wallet,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

function fmt(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return `${d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}, ${d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })}`;
}

const QUICK_AMOUNTS = [10000, 25000, 50000, 100000];
const CATEGORIES = [
  "All",
  "Flight",
  "Hotel",
  "Tour",
  "Transfer",
  "Visa",
  "Package",
  "Cruise",
  "Railway",
  "GDS",
  "Top-up",
  "Refund",
];
const BANKS = [
  "SBI",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
];

export function WalletModule() {
  const [txns, setTxns] = useState<WalletTransaction[]>(() =>
    getTransactions(),
  );
  const [balance, setBalance] = useState(() => getWalletBalance());
  const [showModal, setShowModal] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Add Funds form
  const [payTab, setPayTab] = useState("upi");
  const [customAmt, setCustomAmt] = useState("");
  const [selectedAmt, setSelectedAmt] = useState<number | null>(null);
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const finalAmt = selectedAmt ?? (customAmt ? Number(customAmt) : 0);

  const totalCredited = useMemo(
    () =>
      txns.filter((t) => t.type === "Credit").reduce((s, t) => s + t.amount, 0),
    [txns],
  );
  const totalDebited = useMemo(
    () =>
      txns.filter((t) => t.type === "Debit").reduce((s, t) => s + t.amount, 0),
    [txns],
  );

  const filtered = useMemo(() => {
    return txns.filter((t) => {
      const matchSearch =
        !search ||
        t.ref.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "All" || t.type === typeFilter;
      const matchCat =
        categoryFilter === "All" || t.category === categoryFilter;
      const matchFrom = !fromDate || t.date >= fromDate;
      const matchTo = !toDate || t.date <= `${toDate}T23:59:59Z`;
      return matchSearch && matchType && matchCat && matchFrom && matchTo;
    });
  }, [txns, search, typeFilter, categoryFilter, fromDate, toDate]);

  // Monthly summary
  const monthlySummary = useMemo(() => {
    const map: Record<string, { credited: number; debited: number }> = {};
    for (const t of txns) {
      const key = new Date(t.date).toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric",
      });
      if (!map[key]) map[key] = { credited: 0, debited: 0 };
      if (t.type === "Credit") map[key].credited += t.amount;
      else map[key].debited += t.amount;
    }
    return Object.entries(map);
  }, [txns]);

  function handleAddFunds() {
    if (!finalAmt || finalAmt <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    const newBal = addWalletBalance(finalAmt);
    const txn: WalletTransaction = {
      id: `t${Date.now()}`,
      date: new Date().toISOString(),
      ref: `FST-TXN-${Date.now()}`,
      type: "Credit",
      description: `Wallet Top-up via ${{ upi: "UPI", netbanking: "Net Banking", card: "Credit/Debit Card" }[payTab] ?? payTab}`,
      amount: finalAmt,
      balance: newBal,
      status: "Success",
      category: "Top-up",
    };
    addTransaction(txn);
    setBalance(newBal);
    setTxns(getTransactions());
    setShowModal(false);
    setCustomAmt("");
    setSelectedAmt(null);
    toast.success(`₹${finalAmt.toLocaleString("en-IN")} added to your wallet!`);
  }

  return (
    <div className="space-y-6 p-1">
      {/* Balance Hero Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[#1E3A8A] to-[#2563EB] rounded-2xl p-6 text-white shadow-lg flex items-center gap-4">
          <div className="bg-white/20 rounded-xl p-3">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-sm text-blue-200 font-medium">Current Balance</p>
            <p
              className="text-3xl font-bold text-orange-300 mt-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {fmt(balance)}
            </p>
            <p className="text-xs text-blue-300 mt-1">Available to use</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 shadow">
          <div className="bg-green-500/10 rounded-xl p-3">
            <ArrowDownLeft className="w-7 h-7 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Total Credited
            </p>
            <p
              className="text-2xl font-bold text-green-500 mt-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {fmt(totalCredited)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All time top-ups & refunds
            </p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 flex items-center gap-4 shadow">
          <div className="bg-red-500/10 rounded-xl p-3">
            <ArrowUpRight className="w-7 h-7 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Total Debited
            </p>
            <p
              className="text-2xl font-bold text-red-500 mt-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {fmt(totalDebited)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              All time bookings & charges
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          data-ocid="wallet.add_funds.button"
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-semibold px-6 shadow-md"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Add Funds
        </Button>
        <Button
          data-ocid="wallet.download_statement.button"
          variant="outline"
          onClick={() => toast.success("Statement downloaded")}
          className="font-semibold px-6"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
        <Button
          data-ocid="wallet.transfer.button"
          variant="outline"
          onClick={() => toast.info("Feature coming soon")}
          className="font-semibold px-6"
        >
          <Send className="w-4 h-4 mr-2" />
          Transfer to Sub-Agent
        </Button>
      </div>

      {/* Add Funds Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent data-ocid="wallet.add_funds.modal" className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-bold">
                Add Funds to Wallet
              </DialogTitle>
              <Button
                data-ocid="wallet.add_funds.close_button"
                variant="ghost"
                size="icon"
                onClick={() => setShowModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {/* Quick amounts */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">
                Quick Select Amount
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {QUICK_AMOUNTS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => {
                      setSelectedAmt(a);
                      setCustomAmt("");
                    }}
                    className={`rounded-lg border py-2 text-sm font-semibold transition-all ${
                      selectedAmt === a
                        ? "bg-orange-500 text-white border-orange-500"
                        : "border-border hover:border-orange-400 hover:text-orange-500"
                    }`}
                  >
                    {a >= 100000 ? `₹${a / 100000}L` : `₹${a / 1000}K`}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="custom-amt" className="text-sm font-semibold">
                Or Enter Custom Amount
              </Label>
              <Input
                id="custom-amt"
                data-ocid="wallet.add_funds.amount_input"
                type="number"
                placeholder="Enter amount in ₹"
                value={customAmt}
                onChange={(e) => {
                  setCustomAmt(e.target.value);
                  setSelectedAmt(null);
                }}
                className="mt-1"
              />
            </div>

            <Tabs value={payTab} onValueChange={setPayTab}>
              <TabsList className="w-full">
                <TabsTrigger
                  data-ocid="wallet.upi_tab.tab"
                  value="upi"
                  className="flex-1"
                >
                  UPI
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="wallet.netbanking_tab.tab"
                  value="netbanking"
                  className="flex-1"
                >
                  Net Banking
                </TabsTrigger>
                <TabsTrigger
                  data-ocid="wallet.card_tab.tab"
                  value="card"
                  className="flex-1"
                >
                  Card
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upi" className="space-y-3 pt-3">
                <div>
                  <Label htmlFor="upi-id" className="text-sm font-semibold">
                    UPI ID
                  </Label>
                  <Input
                    id="upi-id"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </TabsContent>
              <TabsContent value="netbanking" className="space-y-3 pt-3">
                <div>
                  <Label className="text-sm font-semibold">Select Bank</Label>
                  <Select value={bank} onValueChange={setBank}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {BANKS.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="card" className="space-y-3 pt-3">
                <div>
                  <Label htmlFor="card-num" className="text-sm font-semibold">
                    Card Number
                  </Label>
                  <Input
                    id="card-num"
                    placeholder="1234 5678 9012 3456"
                    value={cardNum}
                    onChange={(e) => setCardNum(e.target.value)}
                    maxLength={19}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="card-exp" className="text-sm font-semibold">
                      Expiry
                    </Label>
                    <Input
                      id="card-exp"
                      placeholder="MM/YY"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      maxLength={5}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-cvv" className="text-sm font-semibold">
                      CVV
                    </Label>
                    <Input
                      id="card-cvv"
                      placeholder="•••"
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      maxLength={4}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {finalAmt > 0 && (
              <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg px-4 py-3 flex items-center justify-between">
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  Amount to Add
                </span>
                <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                  {fmt(finalAmt)}
                </span>
              </div>
            )}

            <Button
              data-ocid="wallet.add_funds.confirm_button"
              onClick={handleAddFunds}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-2.5"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Add {finalAmt > 0 ? fmt(finalAmt) : "Funds"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Filter Bar */}
      <div className="bg-card border border-border rounded-xl p-4 shadow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <Input
            data-ocid="wallet.search.input"
            placeholder="Search by ref or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="lg:col-span-2"
          />
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger data-ocid="wallet.type_filter.select">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Credit">Credit</SelectItem>
              <SelectItem value="Debit">Debit</SelectItem>
            </SelectContent>
          </Select>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger data-ocid="wallet.category_filter.select">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="flex-1 text-xs"
              title="From date"
            />
            <Input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="flex-1 text-xs"
              title="To date"
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {filtered.length} transaction{filtered.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* Transaction Table */}
      <div
        className="bg-card border border-border rounded-xl shadow overflow-hidden"
        data-ocid="wallet.transactions.table"
      >
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-base">Transaction History</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30">
                <TableHead className="whitespace-nowrap">Date</TableHead>
                <TableHead className="whitespace-nowrap">Reference</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right whitespace-nowrap">
                  Balance After
                </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-muted-foreground"
                    data-ocid="wallet.transactions.empty_state"
                  >
                    No transactions found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((t, i) => (
                  <TableRow
                    key={t.id}
                    data-ocid={`wallet.transaction.row.${i + 1}`}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                      {fmtDate(t.date)}
                    </TableCell>
                    <TableCell className="font-mono text-xs">{t.ref}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground border border-border">
                        {t.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-sm max-w-[200px] truncate"
                      title={t.description}
                    >
                      {t.description}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          t.type === "Credit"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-800"
                            : "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border-red-200 dark:border-red-800"
                        }
                        variant="outline"
                      >
                        {t.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-bold text-sm ${
                        t.type === "Credit"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {t.type === "Credit" ? "+" : "-"}
                      {fmt(t.amount)}
                    </TableCell>
                    <TableCell
                      className="text-right font-semibold text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {fmt(t.balance)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          {
                            Success:
                              "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-green-200",
                            Pending:
                              "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 border-amber-200",
                            Failed:
                              "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400 border-red-200",
                          }[t.status]
                        }
                      >
                        {t.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-card border border-border rounded-xl shadow overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-bold text-base">Monthly Summary</h2>
        </div>
        <div className="divide-y divide-border">
          {monthlySummary.map(([month, data]) => (
            <div
              key={month}
              className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 hover:bg-muted/20 transition-colors"
            >
              <p className="font-semibold text-sm">{month}</p>
              <div className="flex flex-wrap gap-6">
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Credited</p>
                  <p
                    className="font-bold text-green-600 dark:text-green-400 text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    +{fmt(data.credited)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Debited</p>
                  <p
                    className="font-bold text-red-600 dark:text-red-400 text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    -{fmt(data.debited)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">Net Change</p>
                  <p
                    className={`font-bold text-sm ${
                      data.credited - data.debited >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {data.credited - data.debited >= 0 ? "+" : ""}
                    {fmt(data.credited - data.debited)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
