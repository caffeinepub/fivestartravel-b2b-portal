import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bath,
  Bed,
  Building2,
  ChevronRight,
  Clock,
  Image,
  Info,
  MapPin,
  Maximize2,
  Users,
  Wifi,
  Wind,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const TJ_API_KEY = "7114315c476d94-4ef2-4e21-83e8-527d56a0c529";

// ── Types ─────────────────────────────────────────────────────────────────────
interface StaticImage {
  caption?: string;
  is_hero_image?: boolean;
  category?: number;
  hero_image?: boolean;
  links?: Record<string, { href: string }>;
  url?: string;
  sz?: string;
}

interface StaticAmenity {
  id: string;
  name: string;
}

interface RoomData {
  id: string;
  name: string;
  room_count?: number;
  descriptions?: { overview?: string };
  amenities?: Record<string, StaticAmenity>;
  images?: StaticImage[];
  bed_config?: {
    bed_count?: number;
    bedroom_count?: number;
    description?: string;
    configuration?: Record<
      string,
      { type: string; size: string; quantity: number }
    >;
  };
  area?: { square_meters?: number; square_feet?: number };
  occupancy?: {
    max_allowed?: { total?: number; adults?: number; children?: number };
  };
  views?: Record<string, { id: string; name: string }>;
}

interface StaticHotelData {
  tjHotelId: string;
  name: string;
  star_rating?: string;
  property_type?: { id: string; name: string };
  chain?: {
    id?: number;
    name?: string;
    brand?: { id?: number; name?: string };
  };
  locale?: {
    address?: {
      fulladdr?: string;
      city?: string;
      statename?: string;
      countryname?: string;
      postal_code?: string;
    };
    coordinates?: { lat: number; long: number };
    phone?: string[];
    email?: string[];
  };
  policies?: {
    checkInCheckOut?: {
      checkin_from?: string;
      checkin_till?: string;
      checkout_from?: string;
      checkout_till?: string;
      checkin_min_age?: string;
    };
    instructions?: string;
    mandatory_fees?: string;
    know_before_you_go?: string;
    houseRules?: Record<string, string>;
  };
  amenities?: Record<string, StaticAmenity>;
  images?: StaticImage[];
  descriptions?: Record<string, string>;
  rooms?: Record<string, RoomData>;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getBestImageUrl(
  links?: Record<string, { href: string }>,
): string | null {
  if (!links) return null;
  const sizeOrder = ["1000px", "500px", "350px", "200px", "100px", "70px"];
  for (const size of sizeOrder) {
    if (links[size]?.href) return links[size].href;
  }
  const keys = Object.keys(links);
  return keys.length > 0 ? links[keys[0]].href : null;
}

function amenityIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("wifi") || n.includes("internet"))
    return <Wifi className="w-3.5 h-3.5" />;
  if (n.includes("pool") || n.includes("bath"))
    return <Bath className="w-3.5 h-3.5" />;
  if (n.includes("fitness") || n.includes("gym"))
    return <Wind className="w-3.5 h-3.5" />;
  if (n.includes("bed") || n.includes("room"))
    return <Bed className="w-3.5 h-3.5" />;
  return <ChevronRight className="w-3.5 h-3.5" />;
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function StaticDetailSkeleton() {
  return (
    <div className="space-y-4" data-ocid="hotel.static.loading_state">
      <Skeleton className="h-52 w-full rounded-xl" />
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-16 w-20 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-6 w-40" />
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-8 rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function HotelStaticDetail({ hid }: { hid: string }) {
  const [data, setData] = useState<StaticHotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [expandedRoom, setExpandedRoom] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("https://apitest.tripjack.com/hms/v3/hotel/static-detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: TJ_API_KEY,
      },
      body: JSON.stringify({ hid }),
    })
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        if (json?.status?.success === false || json?.error) {
          setError(json?.error?.message ?? "Failed to load hotel details.");
        } else {
          setData(json as StaticHotelData);
        }
      })
      .catch(() => {
        if (!cancelled)
          setError("Network error. Could not load hotel details.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hid]);

  if (loading) return <StaticDetailSkeleton />;

  if (error) {
    return (
      <div
        className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
        data-ocid="hotel.static.error_state"
      >
        <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <div>
          <p className="font-medium">Failed to load hotel information</p>
          <p className="text-xs mt-0.5 text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const images = data.images ?? [];
  const heroImages = images.filter((i) => i.is_hero_image || i.hero_image);
  const allImages = heroImages.length > 0 ? heroImages : images;
  const amenitiesList = Object.values(data.amenities ?? {});
  const roomsList = Object.entries(data.rooms ?? {});

  return (
    <div className="space-y-5" data-ocid="hotel.static.panel">
      {/* Image Gallery */}
      {allImages.length > 0 && (
        <div className="space-y-2" data-ocid="hotel.static.card">
          <div className="relative h-52 rounded-xl overflow-hidden bg-muted">
            {(() => {
              const img = allImages[activeImg];
              const url = img ? (getBestImageUrl(img.links) ?? img.url) : null;
              return url ? (
                <img
                  src={url}
                  alt={img?.caption ?? "Hotel photo"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-12 h-12 text-muted-foreground/30" />
                </div>
              );
            })()}
            {allImages[activeImg]?.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-1.5">
                {allImages[activeImg].caption}
              </div>
            )}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {allImages.slice(0, 8).map((img, idx) => {
                const url = getBestImageUrl(img.links) ?? img.url;
                const imgKey = url ?? img.caption ?? String(idx);
                return (
                  <button
                    key={imgKey}
                    type="button"
                    onClick={() => setActiveImg(idx)}
                    className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImg === idx
                        ? "border-primary"
                        : "border-transparent hover:border-border"
                    }`}
                    data-ocid={`hotel.static.button.${idx + 1}`}
                  >
                    {url ? (
                      <img
                        src={url}
                        alt={img.caption ?? ""}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement)
                            .parentElement!.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Image className="w-4 h-4 text-muted-foreground/30" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Location & Chain */}
      {(data.locale?.address || data.chain) && (
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          {data.locale?.address?.fulladdr && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {data.locale.address.fulladdr}
            </span>
          )}
          {data.chain?.name && (
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {data.chain.name}
              {data.chain.brand?.name ? ` · ${data.chain.brand.name}` : ""}
            </span>
          )}
        </div>
      )}

      {/* Description */}
      {data.descriptions?.default && (
        <div className="text-sm text-muted-foreground leading-relaxed bg-muted/50 rounded-xl p-4">
          {data.descriptions.default}
        </div>
      )}

      {/* Amenities */}
      {amenitiesList.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-primary" />
            Amenities ({amenitiesList.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {amenitiesList.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/60 rounded-lg text-xs text-foreground"
              >
                <span className="text-primary">{amenityIcon(a.name)}</span>
                {a.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Policies */}
      {data.policies && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-primary" />
            Policies
          </h4>
          <div className="space-y-2">
            {data.policies.checkInCheckOut && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-muted/60 rounded-lg p-3">
                  <p className="font-medium text-foreground mb-1">Check-in</p>
                  <p className="text-muted-foreground">
                    {data.policies.checkInCheckOut.checkin_from} –
                    {data.policies.checkInCheckOut.checkin_till}
                  </p>
                  {data.policies.checkInCheckOut.checkin_min_age && (
                    <p className="text-muted-foreground mt-0.5">
                      Min age: {data.policies.checkInCheckOut.checkin_min_age}
                    </p>
                  )}
                </div>
                <div className="bg-muted/60 rounded-lg p-3">
                  <p className="font-medium text-foreground mb-1">Check-out</p>
                  <p className="text-muted-foreground">
                    {data.policies.checkInCheckOut.checkout_from} –
                    {data.policies.checkInCheckOut.checkout_till}
                  </p>
                </div>
              </div>
            )}
            {data.policies.mandatory_fees && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-xs font-medium text-amber-800 mb-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> Mandatory Fees
                </p>
                <div
                  className="text-xs text-amber-700"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML from API
                  dangerouslySetInnerHTML={{
                    __html: data.policies.mandatory_fees,
                  }}
                />
              </div>
            )}
            {data.policies.know_before_you_go && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-medium text-blue-800 mb-1">
                  Know Before You Go
                </p>
                <div
                  className="text-xs text-blue-700"
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML from API
                  dangerouslySetInnerHTML={{
                    __html: data.policies.know_before_you_go,
                  }}
                />
              </div>
            )}
            {data.policies.houseRules &&
              Object.keys(data.policies.houseRules).length > 0 && (
                <div className="bg-muted/60 rounded-lg p-3">
                  <p className="text-xs font-medium text-foreground mb-2">
                    House Rules
                  </p>
                  <div className="space-y-1">
                    {Object.entries(data.policies.houseRules).map(([k, v]) => (
                      <p key={k} className="text-xs text-muted-foreground">
                        <span className="font-medium capitalize">
                          {k.replace(/_/g, " ")}:{" "}
                        </span>
                        {v}
                      </p>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Room Types */}
      {roomsList.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-primary" />
            Room Types ({roomsList.length})
          </h4>
          <div className="space-y-2">
            {roomsList.map(([key, room], idx) => (
              <div
                key={key}
                className="border border-border rounded-xl overflow-hidden"
                data-ocid={`hotel.static.item.${idx + 1}`}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                  onClick={() =>
                    setExpandedRoom(expandedRoom === key ? null : key)
                  }
                  data-ocid={`hotel.static.toggle.${idx + 1}`}
                >
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">
                      {room.name}
                    </span>
                    {room.bed_config?.description && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] hidden sm:inline-flex"
                      >
                        {room.bed_config.description}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {room.area?.square_feet && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" />
                        {room.area.square_feet} sqft
                      </span>
                    )}
                    {room.occupancy?.max_allowed?.total && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Max {room.occupancy.max_allowed.total}
                      </span>
                    )}
                    <ChevronRight
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        expandedRoom === key ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </button>

                {expandedRoom === key && (
                  <div className="px-3 pb-3 space-y-3 border-t border-border">
                    {/* Room images */}
                    {(room.images ?? []).length > 0 && (
                      <div className="flex gap-1.5 overflow-x-auto pt-3">
                        {(room.images ?? []).slice(0, 4).map((img, i) => {
                          const url = getBestImageUrl(img.links) ?? img.url;
                          const rImgKey = url ?? img.caption ?? String(i);
                          return url ? (
                            <img
                              key={rImgKey}
                              src={url}
                              alt={img.caption ?? room.name}
                              className="flex-shrink-0 h-20 w-28 object-cover rounded-lg"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          ) : null;
                        })}
                      </div>
                    )}

                    {/* Room overview */}
                    {room.descriptions?.overview && (
                      <div
                        className="text-xs text-muted-foreground leading-relaxed"
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML from API
                        dangerouslySetInnerHTML={{
                          __html: room.descriptions.overview,
                        }}
                      />
                    )}

                    {/* Room amenities */}
                    {Object.keys(room.amenities ?? {}).length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {Object.values(room.amenities ?? {}).map((a) => (
                          <span
                            key={a.id}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted rounded text-[10px] text-muted-foreground"
                          >
                            {amenityIcon(a.name)}
                            {a.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Views */}
                    {Object.keys(room.views ?? {}).length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {Object.values(room.views ?? {}).map((v) => (
                          <Badge
                            key={v.id}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {v.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
