"use client";

import { useState, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { Info, Loader2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  PlaceSummaryCard,
  ManualVenueInput,
  Header,
  InstructionsDialog,
  MatchConfirmDialog,
  NewPlaceConfirmDialog,
  ClosedPlaceDialog,
} from "@/components/place-matcher";
import { PlaceMatchCard } from "@/components/place-matcher/place-match-card";

// Dynamically import the map to avoid SSR issues with Leaflet
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
      reportingUser: {
        name: "Craig",
        avatarUrl: "https://www.figma.com/api/mcp/asset/ac3dacf2-f874-4c42-bcca-a71c764a9a27",
      },
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
        websiteUrl: "",
        foursquareUrl: "https://foursquare.com",
        matchScore: 84,
        visitors: 0,
        checkIns: 4,
        last60DaysCheckIns: 0,
        verified: true,
        lat: 37.9158,
        lng: -122.3095,
      },
      {
        id: "c2",
        name: "Coffee Benu 1",
        address: "1265 65th St, Emeryville, CA, 94608 United States",
        category: "Coffee shop",
        distance: "3.2 meters",
        websiteUrl: "",
        foursquareUrl: "https://foursquare.com",
        matchScore: 25,
        visitors: 0,
        checkIns: 4,
        last60DaysCheckIns: 0,
        verified: true,
        lat: 37.9163,
        lng: -122.3101,
      },
      {
        id: "c3",
        name: "Samco Builders Inc",
        address: "2200 Powell St, Emeryville, CA, 94608 United States",
        category: "General Contractor",
        distance: "1.4 km",
        websiteUrl: "http://www.samcobuilders.com",
        foursquareUrl: "https://foursquare.com",
        matchScore: 52,
        visitors: 3,
        checkIns: 2,
        last60DaysCheckIns: 0,
        verified: true,
        lat: 37.9145,
        lng: -122.3120,
      },
      {
        id: "c4",
        name: "Bay Area Construction Co",
        address: "1100 San Pablo Ave, Albany, CA, 94706 United States",
        category: "Construction",
        distance: "2.1 km",
        websiteUrl: "",
        foursquareUrl: "https://foursquare.com",
        matchScore: 18,
        visitors: 0,
        checkIns: 1,
        last60DaysCheckIns: 0,
        verified: false,
        lat: 37.9180,
        lng: -122.3060,
      },
      {
        id: "c5",
        name: "El Cerrito Hardware & Build",
        address: "10200 San Pablo Ave, El Cerrito, CA, 94530 United States",
        category: "Hardware Store",
        distance: "850 meters",
        websiteUrl: "http://www.elcerritohardware.com",
        foursquareUrl: "https://foursquare.com",
        matchScore: 8,
        visitors: 12,
        checkIns: 5,
        last60DaysCheckIns: 2,
        verified: true,
        lat: 37.9172,
        lng: -122.3115,
      },
      {
        id: "c6",
        name: "Pacific Coast Contractors",
        address: "5900 Hollis St, Emeryville, CA, 94608 United States",
        category: "Construction",
        distance: "3.8 km",
        websiteUrl: "",
        foursquareUrl: "https://foursquare.com",
        matchScore: 15,
        visitors: 1,
        checkIns: 0,
        last60DaysCheckIns: 0,
        verified: true,
        lat: 37.9135,
        lng: -122.3080,
      },
    ],
  },
];

export default function PlaceMatcherPage() {
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [matchConfirmOpen, setMatchConfirmOpen] = useState(false);
  const [newPlaceConfirmOpen, setNewPlaceConfirmOpen] = useState(false);
  const [closedPlaceDialogOpen, setClosedPlaceDialogOpen] = useState(false);
  const [pendingMatchId, setPendingMatchId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hoveredCandidateId, setHoveredCandidateId] = useState<string | null>(null);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const currentPlace = samplePlaces[currentPlaceIndex];

  // The active highlight is either a hovered card or a clicked pin
  const activeCandidateId = hoveredCandidateId || selectedPinId;

  const handleMatchClick = useCallback((candidateId: string) => {
    setPendingMatchId(candidateId);
    setMatchConfirmOpen(true);
  }, []);

  const handleConfirmMatch = useCallback(() => {
    setMatchConfirmOpen(false);
    setPendingMatchId(null);
    setLoading(true);
    setTimeout(() => {
      setCurrentPlaceIndex((prev) => (prev + 1) % samplePlaces.length);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancelMatch = useCallback(() => {
    setMatchConfirmOpen(false);
    setPendingMatchId(null);
  }, []);

  const handleNewPlace = useCallback(() => {
    setNewPlaceConfirmOpen(true);
  }, []);

  const handleConfirmNewPlace = useCallback(() => {
    setNewPlaceConfirmOpen(false);
    setLoading(true);
    setTimeout(() => {
      setCurrentPlaceIndex((prev) => (prev + 1) % samplePlaces.length);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancelNewPlace = useCallback(() => {
    setNewPlaceConfirmOpen(false);
  }, []);

  const handleClosedPlace = useCallback(() => {
    setClosedPlaceDialogOpen(true);
  }, []);

  const handleConfirmClosedPlace = useCallback((matchingPlaceIds?: string[]) => {
    setClosedPlaceDialogOpen(false);
    setLoading(true);
    // If matchingPlaceIds is provided, the place was closed and matches existing places
    // Otherwise, it was closed and does not match
    setTimeout(() => {
      setCurrentPlaceIndex((prev) => (prev + 1) % samplePlaces.length);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCancelClosedPlace = useCallback(() => {
    setClosedPlaceDialogOpen(false);
  }, []);

  const handleSkip = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPlaceIndex((prev) => (prev + 1) % samplePlaces.length);
      setLoading(false);
    }, 1000);
  }, []);

  // Build map pins from current place (memoized to prevent marker re-creation on hover)
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header />

      {/* Main content */}
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

            {/* Color legend for first-time users */}
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

          {/* Sticky source card */}
          {!loading && (
            <div className="px-4 py-6 border-b border-border shrink-0">
              <PlaceSummaryCard
                name={currentPlace.source.name}
                address={currentPlace.source.address}
                category={currentPlace.source.category}
                externalReferenceId={
                  currentPlace.source.externalReferenceId
                }
                reportingUser={currentPlace.source.reportingUser}
                onSearchWeb={() =>
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(currentPlace.source.name + " " + currentPlace.source.address)}`,
                    "_blank"
                  )
                }
                onCopyReferenceId={() =>
                  navigator.clipboard.writeText(
                    currentPlace.source.externalReferenceId
                  )
                }
                onNewPlace={handleNewPlace}
                onClosedPlace={handleClosedPlace}
                onInvalidPlace={handleNewPlace}
                onSkip={handleSkip}
              />
            </div>
          )}

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="size-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Section heading with bold text */}
                <div className="flex items-center gap-4 pt-6">
                  <Separator className="flex-1" />
                  <span className="text-[14px] leading-[20px] font-semibold text-foreground whitespace-nowrap">
                    Is one of these the same place?
                  </span>
                  <Separator className="flex-1" />
                </div>

                {/* Candidates in 2-column grid */}
                {currentPlace.candidates.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {currentPlace.candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onMouseEnter={() => {
                          setHoveredCandidateId(candidate.id);
                          setSelectedPinId(null);
                        }}
                        onMouseLeave={() => setHoveredCandidateId(null)}
                      >
                        <PlaceMatchCard
                          name={candidate.name}
                          address={candidate.address}
                          category={candidate.category}
                          distance={candidate.distance}
                          foursquareUrl={candidate.foursquareUrl}
                          matchScore={candidate.matchScore}
                          visitors={candidate.visitors}
                          checkIns={candidate.checkIns}
                          last60DaysCheckIns={candidate.last60DaysCheckIns}
                          verified={candidate.verified}
                          highlighted={activeCandidateId === candidate.id}
                          onMatch={() => handleMatchClick(candidate.id)}
                          onMatchButClosed={() => {
                            setLoading(true);
                            setTimeout(() => setLoading(false), 1000);
                          }}
                          onSearchWeb={() =>
                            window.open(
                              `https://www.google.com/search?q=${encodeURIComponent(candidate.name + " " + candidate.address)}`,
                              "_blank"
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[14px] leading-[20px] text-[#646464]">
                    No matching places found. Use &quot;Search the web&quot; to
                    verify this place, then choose an action below.
                  </div>
                )}

                {/* Manual input */}
                <ManualVenueInput
                  onMatch={(venueId) => {
                    setPendingMatchId(venueId);
                    setMatchConfirmOpen(true);
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Right panel - Map */}
        <div className="w-[40%] relative shrink-0 z-0">
          <MapPanel
            pins={mapPins}
            highlightedPinId={activeCandidateId}
            onPinClick={(pinId) => setSelectedPinId(pinId)}
            center={[currentPlace.source.lat, currentPlace.source.lng]}
            zoom={15}
            locationLabel={currentPlace.source.address
              .replace(/,?\s*United States\s*$/i, "")
              .split(",")
              .map((part) => part.trim())
              .slice(1, 3)
              .map((part) => part.replace(/\d+/g, "").trim())
              .filter(Boolean)
              .join(", ")}
            className="absolute inset-0"
          />
        </div>
      </div>

      {/* Dialogs */}
      <InstructionsDialog
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />
      <MatchConfirmDialog
        open={matchConfirmOpen}
        onConfirm={handleConfirmMatch}
        onCancel={handleCancelMatch}
      />
      <NewPlaceConfirmDialog
        open={newPlaceConfirmOpen}
        onConfirm={handleConfirmNewPlace}
        onCancel={handleCancelNewPlace}
      />
      <ClosedPlaceDialog
        open={closedPlaceDialogOpen}
        candidates={currentPlace.candidates.map((c) => ({
          id: c.id,
          name: c.name,
          address: c.address,
        }))}
        onConfirm={handleConfirmClosedPlace}
        onCancel={handleCancelClosedPlace}
      />
    </div>
  );
}
