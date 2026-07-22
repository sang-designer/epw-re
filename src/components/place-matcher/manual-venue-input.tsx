"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ManualVenueInputProps {
  onMatch?: (venueId: string) => void;
  className?: string;
}

export function ManualVenueInput({
  onMatch,
  className,
}: ManualVenueInputProps) {
  const [venueId, setVenueId] = useState("");

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-[16px] leading-[24px] font-semibold text-center text-black">
        Not listed? Enter the Place ID manually:
      </h3>
      <div className="flex gap-2">
        <Input
          placeholder="Enter Place ID"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
          className="flex-1 text-[14px] leading-[20px]"
        />
        <Button
          variant="outline"
          className="text-[14px] leading-[20px] font-medium text-primary border-primary hover:bg-primary/10"
          disabled={!venueId.trim()}
          onClick={() => onMatch?.(venueId)}
        >
          Link
        </Button>
      </div>
    </div>
  );
}
