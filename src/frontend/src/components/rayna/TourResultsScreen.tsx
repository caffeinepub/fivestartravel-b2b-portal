import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import {
  ChevronLeft,
  Grid,
  List,
  Mail,
  Search,
  ShoppingCart,
  Star,
} from "lucide-react";
import { useMemo, useState } from "react";
import { TourCard } from "./TourCard";
import { CATEGORIES, INR, SUPER_SAVERS, TOURS } from "./tourData";
import type { CartItem } from "./tourData";

interface SearchParams {
  destination: string;
  date: Date;
  adults: number;
  children: number;
  nights: number;
}

interface Props {
  searchParams: SearchParams;
  onModify: () => void;
  cart: CartItem[];
  emailFlyers: number[];
  onToggleFlyer: (id: number) => void;
  onAddToCart: (item: CartItem) => void;
  onProceedToBook: () => void;
  walletBalance: number;
}

export function TourResultsScreen({
  searchParams,
  onModify,
  cart,
  emailFlyers,
  onToggleFlyer,
  onAddToCart,
  onProceedToBook,
  walletBalance,
}: Props) {
  const [priceRange, setPriceRange] = useState([506, 172145]);
  const [checkedCats, setCheckedCats] = useState<Set<string>>(
    new Set(CATEGORIES),
  );
  const [superSaverOnly, setSuperSaverOnly] = useState(false);
  const [discountedOnly, setDiscountedOnly] = useState(false);
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [cartOpen, setCartOpen] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);

  // suppress unused warning
  void discountedOnly;

  const toggleCat = (cat: string) => {
    setCheckedCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let list = TOURS.filter(
      (t) =>
        checkedCats.has(t.category) &&
        t.price >= priceRange[0] &&
        t.price <= priceRange[1] &&
        (searchQuery === "" ||
          t.name.toLowerCase().includes(searchQuery.toLowerCase())),
    );
    if (sortBy === "price_asc")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "reviews")
      list = [...list].sort((a, b) => b.reviews - a.reviews);
    else
      list = [...list].sort(
        (a, b) => (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0),
      );
    return list;
  }, [checkedCats, priceRange, searchQuery, sortBy]);

  const cartTotal = cart.reduce((s, i) => s + i.totalPrice, 0);
  const cartCount = cart.length;

  return (
    <div className="flex h-full" style={{ background: "#F8FAFC" }}>
      {/* Sidebar */}
      <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Price Range
          </div>
          <Slider
            min={506}
            max={172145}
            step={100}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
            data-ocid="tour.sidebar.toggle"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{INR(priceRange[0])}</span>
            <span>{INR(priceRange[1])}</span>
          </div>
        </div>

        <div className="p-4 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Tour Category
          </div>
          <ScrollArea className="h-72">
            <div className="space-y-2 pr-2">
              {CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={checkedCats.has(cat)}
                    onChange={() => toggleCat(cat)}
                    className="w-4 h-4 accent-orange-500"
                    data-ocid="tour.sidebar.checkbox"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                    {cat}
                  </span>
                </label>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Best Deals
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={superSaverOnly}
                onChange={(e) => setSuperSaverOnly(e.target.checked)}
                className="w-4 h-4 accent-orange-500"
                data-ocid="tour.sidebar.checkbox"
              />
              <span className="text-sm text-gray-700">Super Saver Deals</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={discountedOnly}
                onChange={(e) => setDiscountedOnly(e.target.checked)}
                className="w-4 h-4 accent-orange-500"
                data-ocid="tour.sidebar.checkbox"
              />
              <span className="text-sm text-gray-700">Discounted Deals</span>
            </label>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onModify}
              className="flex items-center gap-1 text-xs"
              data-ocid="tour.results.button"
            >
              <ChevronLeft className="w-3 h-3" /> Modify Search
            </Button>
            <div>
              <div className="font-bold text-gray-900 text-sm">
                Tours & Sightseeing — {searchParams.destination}
              </div>
              <div className="text-xs text-gray-500">
                {searchParams.date.toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                · {searchParams.adults}A {searchParams.children}C ·{" "}
                {searchParams.nights} Nights
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Cart */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs"
                onClick={() => {
                  setCartOpen(!cartOpen);
                  setFlyerOpen(false);
                }}
                data-ocid="tour.results.open_modal_button"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                My Cart |{" "}
                <span className="font-bold text-orange-600">{cartCount}</span>
              </Button>
              {cartOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4"
                  data-ocid="tour.cart.popover"
                >
                  <div className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-orange-500" /> My Cart
                  </div>
                  {cartCount === 0 ? (
                    <div
                      className="text-center py-6 text-gray-400"
                      data-ocid="tour.cart.empty_state"
                    >
                      <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <div className="text-sm">Shopping Cart is Empty</div>
                    </div>
                  ) : (
                    <>
                      {cart.map((item, i) => (
                        <div
                          key={`${item.tourId}-${item.optionName}`}
                          className="border-b border-gray-100 py-2 text-xs"
                          data-ocid={`tour.cart.item.${i + 1}`}
                        >
                          <div className="font-medium text-gray-800">
                            {item.tourName}
                          </div>
                          <div className="text-gray-500">
                            {item.optionName} · {item.transferOption}
                          </div>
                          <div className="font-bold text-orange-600 mt-1">
                            {INR(item.totalPrice)}
                          </div>
                        </div>
                      ))}
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="flex justify-between font-bold text-sm mb-3">
                          <span>Total</span>
                          <span className="text-orange-600">
                            {INR(cartTotal)}
                          </span>
                        </div>
                        <Button
                          className="w-full text-white text-sm"
                          style={{
                            background:
                              "linear-gradient(135deg, #F97316, #ea580c)",
                          }}
                          onClick={() => {
                            setCartOpen(false);
                            onProceedToBook();
                          }}
                          data-ocid="tour.cart.primary_button"
                        >
                          Proceed to Book
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Email Flyers */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1.5 text-xs"
                onClick={() => {
                  setFlyerOpen(!flyerOpen);
                  setCartOpen(false);
                }}
                data-ocid="tour.results.open_modal_button"
              >
                <Mail className="w-3.5 h-3.5" />
                My Email Flyers! |{" "}
                <span className="font-bold text-orange-600">
                  {emailFlyers.length}
                </span>
              </Button>
              {flyerOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4"
                  data-ocid="tour.flyer.popover"
                >
                  <div className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-orange-500" /> Email Flyers
                  </div>
                  {emailFlyers.length === 0 ? (
                    <div
                      className="text-center py-6 text-gray-400"
                      data-ocid="tour.flyer.empty_state"
                    >
                      <Mail className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <div className="text-sm">Email Flyer is Empty!</div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {emailFlyers.map((id, i) => {
                        const t = TOURS.find((x) => x.id === id);
                        return t ? (
                          <div
                            key={id}
                            className="text-xs text-gray-700 flex items-center gap-1"
                            data-ocid={`tour.flyer.item.${i + 1}`}
                          >
                            <Mail className="w-3 h-3 text-orange-400" />{" "}
                            {t.name}
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results header */}
        <div className="px-5 py-4 flex flex-wrap items-center gap-3">
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 text-lg">
              {filtered.length} Things to do in Dubai
            </h2>
            <p className="text-xs text-gray-500">
              Showing results for {searchParams.destination}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border rounded-lg px-3 py-1.5 bg-white"
              data-ocid="tour.results.select"
            >
              <option value="popular">Most Popular</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="reviews">Most Reviews</option>
            </select>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for your Tour"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-9 text-sm w-48"
                data-ocid="tour.results.search_input"
              />
            </div>
            <div className="flex border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-orange-500 text-white" : "bg-white text-gray-500"}`}
                data-ocid="tour.results.toggle"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-orange-500 text-white" : "bg-white text-gray-500"}`}
                data-ocid="tour.results.toggle"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Wallet bar */}
        <div className="mx-5 mb-3 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl flex items-center justify-between">
          <span className="text-white/70 text-xs">Wallet Balance</span>
          <span className="text-white font-bold">{INR(walletBalance)}</span>
        </div>

        {/* Tour Cards */}
        <div className="px-5 pb-4">
          {filtered.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="tour.results.empty_state"
            >
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <div className="text-lg font-medium">
                No tours match your filters
              </div>
              <div className="text-sm mt-1">
                Try adjusting the price range or category filters
              </div>
            </div>
          ) : (
            filtered.map((tour, i) => (
              <TourCard
                key={tour.id}
                tour={tour}
                searchDate={searchParams.date}
                searchAdults={searchParams.adults}
                searchChildren={searchParams.children}
                emailFlyers={emailFlyers}
                onToggleFlyer={onToggleFlyer}
                onAddToCart={onAddToCart}
                cardIndex={i + 1}
              />
            ))
          )}

          {/* Super Savers */}
          {!superSaverOnly && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-sm font-bold text-gray-600 px-3 bg-orange-50 border border-orange-200 rounded-full py-1">
                  🎯 Super Saver Combo Deals
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SUPER_SAVERS.map((ss, i) => (
                  <div
                    key={ss.id}
                    className="bg-white rounded-xl border border-orange-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                    data-ocid={`tour.supersaver.card.${i + 1}`}
                  >
                    <Badge className="bg-orange-500 text-white text-xs mb-2">
                      Super Saver
                    </Badge>
                    <h4 className="font-bold text-gray-800 text-sm mb-2">
                      {ss.name}
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{" "}
                        {ss.reviews.toLocaleString()} Reviews
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-400">from</div>
                        <div className="font-bold text-gray-900">
                          {INR(ss.price)}
                        </div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-3 text-white text-sm"
                      style={{
                        background: "linear-gradient(135deg, #F97316, #ea580c)",
                      }}
                      size="sm"
                      data-ocid={`tour.supersaver.button.${i + 1}`}
                    >
                      Select
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
