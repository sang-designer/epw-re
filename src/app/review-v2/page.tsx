"use client";

// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:3',message:'Module evaluation started',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),runId:'post-fix'})}).catch(()=>{});}catch(e){}
// #endregion

import { useState, useCallback, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import Image from "next/image";

// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:13',message:'Before Button import',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});}catch(e){}
// #endregion
import { Button } from "@/components/ui/button";

// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:18',message:'Before Checkbox import',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});}catch(e){}
// #endregion
import { Checkbox } from "@/components/ui/checkbox";
import { Info, Check, ChevronLeft } from "lucide-react";

// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:23',message:'Before Card import',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),hypothesisId:'B'})}).catch(()=>{});}catch(e){}
// #endregion
import { Card, CardContent } from "@/components/ui/card";

// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:28',message:'Before cn import',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),hypothesisId:'E'})}).catch(()=>{});}catch(e){}
// #endregion
import { cn } from "@/lib/utils";

import { Header } from "@/components/place-matcher/header";
import { InstructionsDialog } from "@/components/place-matcher/instructions-dialog";
import { ManualVenueInput } from "@/components/place-matcher/manual-venue-input";

// Dynamically import the map to avoid SSR issues with Leaflet
// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:39',message:'Before MapPanel dynamic import',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});}catch(e){}
// #endregion
const MapPanel = dynamic(
  () =>
    import("@/components/place-matcher/map-panel").then((m) => ({
      default: m.MapPanel,
    })),
  { ssr: false, loading: () => <div className="bg-muted animate-pulse h-full" /> }
);

// Sample data
const samplePlaces = [
  {
    id: "place-1",
    source: {
      name: "Samco Construction",
      address: "11858 San Pablo Ave, El Cerrito, CA, 94530",
      category: "Construction",
      externalReferenceId: "685d210b474da66ab6a126ae",
      lat: 37.9161,
      lng: -122.3108,
    },
    candidates: [
      {
        id: "p1-c1",
        name: "Coffee Benu 1",
        address: "1265 65th St, Emeryville, CA, 94608 United States",
        category: "Coffee shop",
        distance: "3.2 meters",
        matchScore: 84,
        lat: 37.9158,
        lng: -122.3095,
      },
      {
        id: "p1-c2",
        name: "Coffee Benu 2",
        address: "1265 65th St, Emeryville, CA, 94608 United States",
        category: "Coffee shop",
        distance: "3.2 meters",
        matchScore: 25,
        lat: 37.9163,
        lng: -122.3101,
      },
      {
        id: "p1-c3",
        name: "Samco Builders Inc",
        address: "2200 Powell St, Emeryville, CA, 94608 United States",
        category: "General Contractor",
        distance: "1.4 km",
        matchScore: 52,
        lat: 37.9145,
        lng: -122.3120,
      },
    ],
  },
  {
    id: "place-2",
    source: {
      name: "Blue Bottle Coffee",
      address: "4270 Hollis St, Emeryville, CA, 94608",
      category: "Coffee shop",
      externalReferenceId: "71a9c4e28f3b12d90e55ab12",
      lat: 37.8312,
      lng: -122.2876,
    },
    candidates: [
      {
        id: "p2-c1",
        name: "Blue Bottle Coffee - Emeryville",
        address: "4270 Hollis St, Emeryville, CA, 94608 United States",
        category: "Coffee shop",
        distance: "12 meters",
        matchScore: 91,
        lat: 37.8310,
        lng: -122.2874,
      },
      {
        id: "p2-c2",
        name: "Peet's Coffee",
        address: "5959 Shellmound St, Emeryville, CA, 94608 United States",
        category: "Coffee shop",
        distance: "640 meters",
        matchScore: 38,
        lat: 37.8341,
        lng: -122.2920,
      },
      {
        id: "p2-c3",
        name: "Starbucks",
        address: "5750 Christie Ave, Emeryville, CA, 94608 United States",
        category: "Coffee shop",
        distance: "1.1 km",
        matchScore: 22,
        lat: 37.8365,
        lng: -122.2948,
      },
    ],
  },
  {
    id: "place-3",
    source: {
      name: "El Cerrito Natural Grocery",
      address: "10367 San Pablo Ave, El Cerrito, CA, 94530",
      category: "Grocery store",
      externalReferenceId: "5e2b91f04c88a17d3f6c2091",
      lat: 37.9064,
      lng: -122.3102,
    },
    candidates: [
      {
        id: "p3-c1",
        name: "El Cerrito Natural Grocery Co",
        address: "10367 San Pablo Ave, El Cerrito, CA, 94530 United States",
        category: "Grocery store",
        distance: "8 meters",
        matchScore: 88,
        lat: 37.9065,
        lng: -122.3100,
      },
      {
        id: "p3-c2",
        name: "Safeway",
        address: "11450 San Pablo Ave, El Cerrito, CA, 94530 United States",
        category: "Grocery store",
        distance: "1.2 km",
        matchScore: 41,
        lat: 37.9138,
        lng: -122.3095,
      },
      {
        id: "p3-c3",
        name: "Berkeley Bowl West",
        address: "920 Heinz Ave, Berkeley, CA, 94710 United States",
        category: "Grocery store",
        distance: "3.4 km",
        matchScore: 19,
        lat: 37.8536,
        lng: -122.2930,
      },
    ],
  },
];

type PlaceStatus = "open" | "closed" | "invalid" | null;

function formatMapLocation(address: string) {
  const parts = address
    .replace(/,?\s*United States\s*$/i, "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  if (parts.length >= 2) {
    const city = parts[1];
    const state = (parts[2] ?? "").replace(/\d+/g, "").trim();
    return state ? `${city}, ${state}` : city;
  }
  return address;
}

export default function ReviewV2Page() {
  // #region agent log
  try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:45',message:'Component function execution started - POST FIX',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),runId:'post-fix'})}).catch(()=>{});}catch(e){}
  // #endregion
  
  const [placeStatus, setPlaceStatus] = useState<PlaceStatus>(null);
  const [selectedMatches, setSelectedMatches] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [hoveredCandidateId, setHoveredCandidateId] = useState<string | null>(null);
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [mapExpanded, setMapExpanded] = useState(false);

  const currentPlace = samplePlaces[currentPlaceIndex];

  const handleStatusSelect = useCallback((status: PlaceStatus) => {
    setPlaceStatus(status);
    setSelectedMatches(new Set());
  }, []);

  const toggleMatch = useCallback((matchId: string) => {
    setSelectedMatches((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(matchId)) {
        newSet.delete(matchId);
      } else {
        newSet.add(matchId);
      }
      return newSet;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      console.log("Submitted:", {
        status: placeStatus,
        matches: Array.from(selectedMatches),
      });
      // Reset for demo
      setPlaceStatus(null);
      setSelectedMatches(new Set());
      setLoading(false);
    }, 1000);
  }, [placeStatus, selectedMatches]);

  const handleSkip = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPlaceIndex((prev) => (prev + 1) % samplePlaces.length);
      setPlaceStatus(null);
      setSelectedMatches(new Set());
      setHoveredCandidateId(null);
      setMapExpanded(false);
      setLoading(false);
    }, 1000);
  }, []);

  const showMatches = placeStatus !== null;

  useEffect(() => {
    if (!mapExpanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMapExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mapExpanded]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mediaQuery.matches) setMapExpanded(false);
    };
    mediaQuery.addEventListener("change", onChange);
    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  // Build map pins
  const mapPins = useMemo(
    () => [
      {
        id: "source",
        lat: currentPlace.source.lat,
        lng: currentPlace.source.lng,
        label: currentPlace.source.name,
        type: "source" as const,
      },
      ...currentPlace.candidates.map((c) => ({
        id: c.id,
        lat: c.lat,
        lng: c.lng,
        label: c.name,
        type: "candidate" as const,
      })),
    ],
    [currentPlace]
  );

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />

      <div className="grid min-h-0 flex-1 overflow-hidden grid-rows-[auto_11rem_minmax(0,1fr)] md:grid-cols-[minmax(0,1fr)_40%] md:grid-rows-[auto_minmax(0,1fr)]">
        {/* Page title + instructions */}
        <div className={cn("min-w-0 shrink-0 space-y-1.5 px-3 pt-3 pb-1 md:px-4", mapExpanded && "invisible md:visible")}>
            <div className="flex items-start justify-between gap-2">
              <h1 className="min-w-0 text-[18px] leading-[24px] font-semibold text-foreground md:text-[20px] md:leading-[28px]">
                Review Pending Places
              </h1>
              <Button
                variant="link"
                className="h-auto shrink-0 p-0 text-[14px] leading-[20px] font-normal text-primary"
                onClick={() => setInstructionsOpen(true)}
              >
                <Info className="size-4 mr-1.5" />
                <span className="hidden sm:inline">Instructions</span>
                <span className="sm:hidden">Help</span>
              </Button>
            </div>

            {/* Color legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] leading-[16px] text-[#646464]">
              <span className="inline-flex items-center gap-1">
                <Image src="/icons/map-pin-red.svg" alt="" width={14} height={18} className="shrink-0" />
                Place to match
              </span>
              <span className="inline-flex items-center gap-1">
                <Image src="/icons/map-pin-blue.svg" alt="" width={14} height={18} className="shrink-0" />
                Possible matches
              </span>
            </div>
          </div>

        {/* Map: compact strip on mobile, side panel on desktop */}
        <div className="relative z-0 min-h-0 border-b border-border md:col-start-2 md:row-span-2 md:row-start-1 md:border-b-0 md:border-l">
          <div
            className={cn(
              "absolute inset-0",
              mapExpanded &&
                "fixed inset-0 z-[200] bg-background md:static md:z-0"
            )}
          >
            <MapPanel
              pins={mapPins}
              highlightedPinId={hoveredCandidateId}
              center={[currentPlace.source.lat, currentPlace.source.lng]}
              zoom={15}
              locationLabel={formatMapLocation(currentPlace.source.address)}
              className="absolute inset-0"
            />
            {mapExpanded ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute top-[max(0.75rem,env(safe-area-inset-top))] left-3 z-[1100] size-9 rounded-full bg-background shadow-md md:hidden"
                onClick={() => setMapExpanded(false)}
                aria-label="Close map"
              >
                <ChevronLeft />
              </Button>
            ) : (
              <button
                type="button"
                className="absolute inset-0 z-[900] cursor-pointer md:hidden"
                onClick={() => setMapExpanded(true)}
                aria-label="Expand map"
              />
            )}
          </div>
        </div>

        {/* Review content */}
        <div className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden md:col-start-1 md:row-start-2", mapExpanded && "invisible md:visible")}>
          {/* Scrolls as one column on mobile; splits on desktop */}
          <div
            className={cn(
              "min-h-0 flex-1",
              placeStatus
                ? "overflow-y-auto md:flex md:flex-col md:overflow-hidden"
                : "flex flex-col overflow-y-auto md:overflow-hidden"
            )}
          >
          {/* Top Section - Location Card */}
          <div className={cn(
            "border-b border-border px-3 py-4 transition-all duration-500 ease-out md:px-4 md:py-6",
            !placeStatus && "flex flex-1 items-center justify-center",
            placeStatus && "md:shrink-0"
          )}>
            <div className={cn(
              "w-full space-y-4 transition-all duration-500 ease-out",
              !placeStatus && "max-w-2xl"
            )}>
            {/* Step Indicator */}
            <div className="flex flex-wrap items-center gap-1.5 text-[12px] leading-[16px] font-medium md:gap-2">
              <div className={cn(
                "flex items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors md:px-3",
                !placeStatus ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                <span className="flex size-5 items-center justify-center rounded-full bg-current/20 text-[10px] font-semibold text-current">
                  1
                </span>
                <span>Select Status</span>
              </div>
              <div className="hidden h-px w-8 bg-border sm:block" />
              <div className={cn(
                "flex items-center gap-2 rounded-full px-2.5 py-1.5 transition-colors md:px-3",
                showMatches ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                <span className="flex size-5 items-center justify-center rounded-full bg-current/20 text-[10px] font-semibold text-current">
                  2
                </span>
                <span>
                  Select Matches
                  {!showMatches && (
                    <span className="hidden sm:inline"> (if applicable)</span>
                  )}
                </span>
              </div>
            </div>
            
            <Card className="overflow-hidden bg-primary/5 border-primary/20">
              <CardContent className="space-y-0.5">
                <div className="flex min-w-0 items-center gap-2">
                  <h2 className="min-w-0 text-[16px] leading-[24px] font-semibold break-words text-[#171417] underline decoration-foreground/30 underline-offset-2">
                    {currentPlace.source.name}
                  </h2>
                  <Image
                    src="/icons/map-pin-red.svg"
                    alt="Source location"
                    width={16}
                    height={20}
                    className="shrink-0"
                  />
                </div>
                <p className="text-[14px] leading-[20px] font-normal break-words text-foreground">
                  {currentPlace.source.address}
                </p>
                <p className="text-[14px] leading-[20px] font-normal text-[#646464]">
                  {currentPlace.source.category}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
                  <Button
                    variant="link"
                    size="sm"
                    className="h-auto p-0 text-[14px] leading-[20px] font-medium text-primary"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(currentPlace.source.name + " " + currentPlace.source.address)}`,
                        "_blank"
                      )
                    }
                  >
                    <svg className="size-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                    Search the web
                  </Button>
                  <span className="text-[14px] leading-[20px] font-normal text-foreground">
                    Reporting user: C
                  </span>
                </div>

                <div className="flex min-w-0 items-start gap-2 pt-1">
                  <code className="min-w-0 text-[12px] leading-[16px] font-semibold font-mono break-all text-[#646464]">
                    External Place Reference ID: {currentPlace.source.externalReferenceId}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 shrink-0"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        currentPlace.source.externalReferenceId
                      )
                    }
                  >
                    <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  </Button>
                </div>
              </CardContent>

              {/* Toggle buttons */}
              <div
                className={cn(
                  "grid grid-cols-3 gap-2 px-3 pt-3 pb-4 md:gap-3 md:px-4",
                  mapExpanded && "hidden"
                )}
              >
                <Button
                  variant="outline"
                  className={cn(
                    "relative w-full px-1.5 md:px-2.5",
                    placeStatus === "open" && "border-primary bg-primary/5"
                  )}
                  onClick={() => handleStatusSelect("open")}
                >
                  {placeStatus === "open" && (
                    <Check className="size-4 shrink-0 text-primary md:mr-2" />
                  )}
                  Open
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "relative w-full px-1.5 text-destructive border-destructive hover:bg-destructive/10 md:px-2.5",
                    placeStatus === "closed" && "bg-destructive/5"
                  )}
                  onClick={() => handleStatusSelect("closed")}
                >
                  {placeStatus === "closed" && (
                    <Check className="size-4 shrink-0 text-destructive md:mr-2" />
                  )}
                  Closed
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "relative w-full px-1.5 text-destructive border-destructive hover:bg-destructive/10 md:px-2.5",
                    placeStatus === "invalid" && "bg-destructive/5"
                  )}
                  onClick={() => handleStatusSelect("invalid")}
                >
                  {placeStatus === "invalid" && (
                    <Check className="size-4 shrink-0 text-destructive md:mr-2" />
                  )}
                  Invalid
                </Button>
              </div>
            </Card>

            {/* Helper text */}
            {!placeStatus && (
              <div className="space-y-2 pt-2 text-center">
                <p className="text-[14px] leading-[20px] text-[#646464]">
                  Choose whether this location is Open, Closed, or Invalid to continue
                </p>
                <Button
                  variant="link"
                  onClick={handleSkip}
                  disabled={loading}
                  className="h-auto p-0 text-[14px] leading-[20px]"
                >
                  {loading ? "Skipping..." : "Skip"}
                </Button>
              </div>
            )}
            </div>
          </div>

          {/* Middle Section - Potential Matches */}
          {showMatches && (
            <div className="px-3 py-4 md:flex-1 md:overflow-y-auto md:px-4 md:pb-20">
              <h3 className="mb-4 text-[16px] leading-[24px] font-semibold text-foreground">
                Select a matching location
              </h3>

              <div className="space-y-3">
                {currentPlace.candidates.map((candidate) => (
                  <Card
                    key={candidate.id}
                    className={cn(
                      "cursor-pointer transition-all",
                      selectedMatches.has(candidate.id) && "ring-2 ring-primary shadow-md"
                    )}
                    onClick={() => {
                      toggleMatch(candidate.id);
                      setHoveredCandidateId(candidate.id);
                    }}
                    onMouseEnter={() => setHoveredCandidateId(candidate.id)}
                    onMouseLeave={() => setHoveredCandidateId(null)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedMatches.has(candidate.id)}
                          onClick={(e) => e.stopPropagation()}
                          onCheckedChange={() => {
                            toggleMatch(candidate.id);
                            setHoveredCandidateId(candidate.id);
                          }}
                          className="mt-1"
                        />
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex min-w-0 items-center gap-2">
                            <h4 className="min-w-0 text-[16px] leading-[24px] font-semibold break-words text-foreground">
                              {candidate.name}
                            </h4>
                            <Image
                              src="/icons/map-pin-blue.svg"
                              alt="Candidate location"
                              width={16}
                              height={20}
                              className="shrink-0"
                            />
                          </div>
                          <p className="text-[14px] leading-[20px] break-words text-foreground">
                            {candidate.address}
                          </p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] leading-[16px] text-[#646464]">
                            <span>{candidate.category}</span>
                            <span>Distance: {candidate.distance}</span>
                            <span className="font-semibold">
                              Match: {candidate.matchScore}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <ManualVenueInput
                key={placeStatus}
                className="pt-4 pb-4 md:pb-0"
                onMatch={(venueId) => {
                  setSelectedMatches((prev) => new Set(prev).add(venueId.trim()));
                }}
              />
            </div>
          )}
          </div>

          {/* Bottom Section - Command Bar */}
          {placeStatus && (
            <div className="shrink-0 border-t border-border bg-background px-3 py-3 shadow-lg md:px-4 md:py-4 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <Button
                className="h-12 w-full text-[16px] leading-[24px] font-medium"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : selectedMatches.size === 0 ? (
                  "Submit (No Matches)"
                ) : (
                  `Submit Selected Match${selectedMatches.size > 1 ? "es" : ""} (${selectedMatches.size})`
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Instructions Dialog */}
      <InstructionsDialog
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
        variant="two-step"
        activeStep={showMatches ? 2 : 1}
      />
    </div>
  );
}
