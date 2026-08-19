"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
  const [linkedId, setLinkedId] = useState<string | null>(null);

  const trimmedId = venueId.trim();
  const isLinked = linkedId !== null && linkedId === trimmedId;

  const handleLink = () => {
    if (!trimmedId || isLinked) return;
    onMatch?.(trimmedId);
    setLinkedId(trimmedId);
  };

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-[16px] leading-[24px] font-semibold text-center text-black">
        Not listed? Enter the Place ID manually:
      </h3>
      <div className="flex min-w-0 gap-2">
        <Input
          placeholder="Enter Place ID"
          value={venueId}
          onChange={(e) => setVenueId(e.target.value)}
          className="min-w-0 flex-1 text-[14px] leading-[20px]"
        />
        <Button
          variant="outline"
          className="shrink-0 text-[14px] leading-[20px] font-medium text-primary border-primary hover:bg-primary/10"
          disabled={!trimmedId}
          onClick={handleLink}
        >
          {isLinked && <Check className="size-4 text-primary" />}
          {isLinked ? "Linked" : "Link"}
        </Button>
      </div>
    </div>
  );
}
