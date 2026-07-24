"use client";

import { Search, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlaceMatchCardProps {
  name: string;
  address: string;
  category: string;
  distance?: string;
  websiteUrl?: string;
  foursquareUrl?: string;
  matchScore: number;
  visitors: number;
  checkIns: number;
  last60DaysCheckIns: number;
  verified?: boolean;
  highlighted?: boolean;
  onMatch?: () => void;
  onMatchButClosed?: () => void;
  onSearchWeb?: () => void;
  className?: string;
}

function getScoreColor(score: number): string {
  if (score >= 50) return "text-[#16a34a]";
  if (score >= 30) return "text-[#fb923c]";
  return "text-[#dc2626]";
}

function CheckInDots({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={cn(
            "text-[14px]",
            i < count ? "opacity-100" : "opacity-25"
          )}
        >
          📍
        </span>
      ))}
    </div>
  );
}

export function PlaceMatchCard({
  name,
  address,
  category,
  distance,
  foursquareUrl,
  matchScore,
  checkIns,
  verified,
  highlighted,
  onMatch,
  onMatchButClosed,
  onSearchWeb,
  className,
}: PlaceMatchCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-all",
        highlighted && "ring-2 ring-primary shadow-md",
        className
      )}
    >
      <CardContent className="p-4 space-y-2">
        {/* Header row: Name + pin + actions */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <h3 className="text-[16px] leading-[24px] font-semibold text-foreground truncate">
              {name}
            </h3>
            <Image src="/icons/map-pin-blue.svg" alt="Candidate location" width={16} height={20} className="shrink-0" />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              className="text-[14px] leading-[20px] font-medium text-primary border-primary hover:bg-primary hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onMatch?.();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>

        {/* Address */}
        <p className="text-[14px] leading-[20px] font-normal text-foreground">
          {address}
        </p>

        {/* Category + Distance */}
        <p className="text-[14px] leading-[20px] font-normal text-[#646464]">
          {category}
          {distance && <span> | Distance: {distance}</span>}
        </p>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Button
            variant="link"
            size="sm"
            className="text-primary p-0 h-auto text-[14px] leading-[20px] font-normal"
            onClick={(e) => {
              e.stopPropagation();
              onSearchWeb?.();
            }}
          >
            <Search className="size-4 mr-1" />
            Search the web
          </Button>
          {foursquareUrl && (
            <a
              href={foursquareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] leading-[20px] font-normal text-primary hover:text-primary/80 inline-flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              See on Foursquare
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>

        {/* Inline stats row */}
        <div className="flex items-center gap-6 pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] leading-[20px] font-medium text-[#646464]">
              Similarity
            </span>
            <span
              className={cn(
                "text-[16px] leading-[24px] font-semibold",
                getScoreColor(matchScore)
              )}
            >
              {matchScore}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[14px] leading-[20px] font-medium text-[#646464]">
              Check-ins
            </span>
            <CheckInDots count={checkIns} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
