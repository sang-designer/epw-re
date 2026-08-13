"use client";

// #region agent log
try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:3',message:'Module evaluation started',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),runId:'post-fix'})}).catch(()=>{});}catch(e){}
// #endregion

import { useState, useCallback, useMemo } from "react";
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
import { Info, Check } from "lucide-react";

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
const samplePlace = {
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
      id: "c1",
      name: "Coffee Benu 1",
      address: "1265 65th St, Emeryville, CA, 94608 United States",
      category: "Coffee shop",
      distance: "3.2 meters",
      matchScore: 84,
      lat: 37.9158,
      lng: -122.3095,
    },
    {
      id: "c2",
      name: "Coffee Benu 2",
      address: "1265 65th St, Emeryville, CA, 94608 United States",
      category: "Coffee shop",
      distance: "3.2 meters",
      matchScore: 25,
      lat: 37.9163,
      lng: -122.3101,
    },
    {
      id: "c3",
      name: "Samco Builders Inc",
      address: "2200 Powell St, Emeryville, CA, 94608 United States",
      category: "General Contractor",
      distance: "1.4 km",
      matchScore: 52,
      lat: 37.9145,
      lng: -122.3120,
    },
  ],
};

type PlaceStatus = "open" | "closed" | "invalid" | null;

export default function ReviewV2Page() {
  // #region agent log
  try{fetch('http://127.0.0.1:7517/ingest/f447d46f-6c78-42b3-93ec-b0c5eeb0d92a',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'2aa4cf'},body:JSON.stringify({sessionId:'2aa4cf',location:'review-v2/page.tsx:45',message:'Component function execution started - POST FIX',data:{hasWindow:typeof window!=='undefined'},timestamp:Date.now(),runId:'post-fix'})}).catch(()=>{});}catch(e){}
  // #endregion
  
  const [placeStatus, setPlaceStatus] = useState<PlaceStatus>(null);
  const [selectedMatches, setSelectedMatches] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [hoveredCandidateId, setHoveredCandidateId] = useState<string | null>(null);

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
      console.log("Skipped to next task");
      // Reset for demo - move to next task
      setPlaceStatus(null);
      setSelectedMatches(new Set());
      setLoading(false);
    }, 1000);
  }, []);

  const showMatches = placeStatus === "open" || placeStatus === "closed";

  // Build map pins
  const mapPins = useMemo(
    () => [
      {
        id: "source",
        lat: samplePlace.source.lat,
        lng: samplePlace.source.lng,
        label: samplePlace.source.name,
        type: "source" as const,
      },
      ...samplePlace.candidates.map((c) => ({
        id: c.id,
        lat: c.lat,
        lng: c.lng,
        label: c.name,
        type: "candidate" as const,
      })),
    ],
    []
  );

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page title + instructions */}
          <div className="px-4 pt-3 pb-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <h1 className="text-[20px] leading-[28px] font-semibold text-foreground">
                Review Pending Places
              </h1>
              <Button
                variant="link"
                className="text-primary p-0 h-auto text-[14px] leading-[20px] font-normal"
                onClick={() => setInstructionsOpen(true)}
              >
                <Info className="size-4 mr-1.5" />
                Instructions
              </Button>
            </div>

            {/* Color legend */}
            <div className="flex items-center gap-4 text-[12px] leading-[16px] text-[#646464]">
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

          {/* Top Section - Location Card */}
          <div className={cn(
            "px-4 py-6 border-b border-border shrink-0 transition-all duration-500 ease-out",
            !placeStatus && "flex-1 flex items-center justify-center"
          )}>
            <div className={cn(
              "transition-all duration-500 ease-out space-y-4",
              !placeStatus && "max-w-2xl w-full"
            )}>
            {/* Step Indicator */}
            <div className="flex items-center gap-2 text-[12px] leading-[16px] font-medium">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors",
                !placeStatus ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                <span className="flex items-center justify-center size-5 rounded-full bg-current/20 text-current font-semibold text-[10px]">
                  1
                </span>
                <span>Select Status</span>
              </div>
              <div className="h-px w-8 bg-border" />
              <div className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors",
                showMatches ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                <span className="flex items-center justify-center size-5 rounded-full bg-current/20 text-current font-semibold text-[10px]">
                  2
                </span>
                <span>Select Matches {!showMatches && "(if applicable)"}</span>
              </div>
            </div>
            
            <Card className="overflow-hidden bg-primary/5 border-primary/20">
              <CardContent className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <h2 className="text-[16px] leading-[24px] font-semibold text-[#171417] underline decoration-foreground/30 underline-offset-2">
                    {samplePlace.source.name}
                  </h2>
                  <Image
                    src="/icons/map-pin-red.svg"
                    alt="Source location"
                    width={16}
                    height={20}
                    className="shrink-0"
                  />
                </div>
                <p className="text-[14px] leading-[20px] font-normal text-foreground">
                  {samplePlace.source.address}
                </p>
                <p className="text-[14px] leading-[20px] font-normal text-[#646464]">
                  {samplePlace.source.category}
                </p>

                <div className="flex items-center gap-4 pt-1">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-primary p-0 h-auto text-[14px] leading-[20px] font-medium"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/search?q=${encodeURIComponent(samplePlace.source.name + " " + samplePlace.source.address)}`,
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

                <div className="flex items-center gap-2 pt-1">
                  <code className="text-[12px] leading-[16px] font-semibold font-mono text-[#646464]">
                    External Place Reference ID: {samplePlace.source.externalReferenceId}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        samplePlace.source.externalReferenceId
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
              <div className="px-4 pb-4 pt-3 grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className={cn(
                    "w-full relative",
                    placeStatus === "open" && "border-primary bg-primary/5"
                  )}
                  onClick={() => handleStatusSelect("open")}
                >
                  {placeStatus === "open" && (
                    <Check className="size-4 mr-2 text-primary" />
                  )}
                  Open
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full relative text-destructive border-destructive hover:bg-destructive/10",
                    placeStatus === "closed" && "bg-destructive/5"
                  )}
                  onClick={() => handleStatusSelect("closed")}
                >
                  {placeStatus === "closed" && (
                    <Check className="size-4 mr-2 text-destructive" />
                  )}
                  Closed
                </Button>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full relative text-destructive border-destructive hover:bg-destructive/10",
                    placeStatus === "invalid" && "bg-destructive/5"
                  )}
                  onClick={() => handleStatusSelect("invalid")}
                >
                  {placeStatus === "invalid" && (
                    <Check className="size-4 mr-2 text-destructive" />
                  )}
                  Invalid
                </Button>
              </div>
            </Card>

            {/* Helper text */}
            {!placeStatus && (
              <div className="text-center pt-2 space-y-2">
                <p className="text-[14px] leading-[20px] text-[#646464]">
                  Choose whether this location is Open, Closed, or Invalid to continue
                </p>
                <Button
                  variant="link"
                  onClick={handleSkip}
                  disabled={loading}
                  className="text-[14px] leading-[20px] h-auto p-0"
                >
                  {loading ? "Skipping..." : "Skip"}
                </Button>
              </div>
            )}
            </div>
          </div>

          {/* Middle Section - Potential Matches */}
          {showMatches && (
            <div className="flex-1 overflow-y-auto px-4 pb-20">
              <div className="py-4">
                <h3 className="text-[16px] leading-[24px] font-semibold text-foreground mb-4">
                  Select a matching location
                </h3>

                <div className="space-y-3">
                  {samplePlace.candidates.map((candidate) => (
                    <Card
                      key={candidate.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedMatches.has(candidate.id) && "ring-2 ring-primary shadow-md"
                      )}
                      onClick={() => toggleMatch(candidate.id)}
                      onMouseEnter={() => setHoveredCandidateId(candidate.id)}
                      onMouseLeave={() => setHoveredCandidateId(null)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={selectedMatches.has(candidate.id)}
                            onCheckedChange={() => toggleMatch(candidate.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-[16px] leading-[24px] font-semibold text-foreground">
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
                            <p className="text-[14px] leading-[20px] text-foreground">
                              {candidate.address}
                            </p>
                            <div className="flex items-center gap-4 text-[12px] leading-[16px] text-[#646464]">
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
              </div>
            </div>
          )}

          {!showMatches && placeStatus && (
            <div className="flex-1 flex items-center justify-center text-center px-4">
              <div>
                <p className="text-[16px] leading-[24px] font-semibold text-foreground mb-2">
                  Location marked as {placeStatus === "invalid" ? "Invalid" : "Closed"}
                </p>
                <p className="text-[14px] leading-[20px] text-[#646464]">
                  No matching required. Click Submit to continue.
                </p>
              </div>
            </div>
          )}

          {/* Bottom Section - Command Bar */}
          {placeStatus && (
            <div className="sticky bottom-0 border-t border-border bg-background px-4 py-4 shrink-0 shadow-lg">
              <Button
                className="w-full h-12 text-[16px] leading-[24px] font-medium"
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

        {/* Right panel - Map */}
        <div className="w-[40%] relative shrink-0 z-0">
          <MapPanel
            pins={mapPins}
            highlightedPinId={hoveredCandidateId}
            center={[samplePlace.source.lat, samplePlace.source.lng]}
            zoom={15}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Instructions Dialog */}
      <InstructionsDialog
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />
    </div>
  );
}
