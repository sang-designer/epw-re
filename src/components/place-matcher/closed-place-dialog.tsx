"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Candidate {
  id: string;
  name: string;
  address: string;
}

interface ClosedPlaceDialogProps {
  open: boolean;
  candidates: Candidate[];
  onConfirm: (matchingPlaceIds?: string[]) => void;
  onCancel: () => void;
}

export function ClosedPlaceDialog({
  open,
  candidates,
  onConfirm,
  onCancel,
}: ClosedPlaceDialogProps) {
  const [step, setStep] = useState<"initial" | "select">("initial");
  const [selectedPlaces, setSelectedPlaces] = useState<Set<string>>(new Set());

  const handleClose = () => {
    setStep("initial");
    setSelectedPlaces(new Set());
    onCancel();
  };

  const handleNoMatch = () => {
    onConfirm();
  };

  const handleMatchesExisting = () => {
    setStep("select");
  };

  const togglePlace = (placeId: string) => {
    const newSelected = new Set(selectedPlaces);
    if (newSelected.has(placeId)) {
      newSelected.delete(placeId);
    } else {
      newSelected.add(placeId);
    }
    setSelectedPlaces(newSelected);
  };

  const handleConfirmSelection = () => {
    onConfirm(Array.from(selectedPlaces));
    setStep("initial");
    setSelectedPlaces(new Set());
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-[500px]">
        {step === "initial" ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between gap-4 pr-8">
                <DialogTitle className="text-[18px] leading-[24px] font-semibold">
                  Is this place closed?
                </DialogTitle>
                <span className="text-[12px] leading-[16px] text-muted-foreground font-medium whitespace-nowrap">
                  Step 1 of 2
                </span>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-3 pt-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full"
              >
                No
              </Button>
              <Button
                variant="outline"
                onClick={handleMatchesExisting}
                className="w-full"
              >
                Yes, matches existing place
              </Button>
              <Button onClick={handleNoMatch} className="w-full">
                Yes, and it does not match
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between gap-4 pr-8">
                <DialogTitle className="text-[18px] leading-[24px] font-semibold">
                  Select the matching place
                </DialogTitle>
                <span className="text-[12px] leading-[16px] text-muted-foreground font-medium whitespace-nowrap">
                  Step 2 of 2
                </span>
              </div>
            </DialogHeader>

            <div className="space-y-3 pt-2 max-h-[400px] overflow-y-auto">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className={cn(
                    "flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                    selectedPlaces.has(candidate.id) && "bg-muted border-primary"
                  )}
                  onClick={() => togglePlace(candidate.id)}
                >
                  <Checkbox
                    checked={selectedPlaces.has(candidate.id)}
                    onCheckedChange={() => togglePlace(candidate.id)}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] leading-[20px] font-semibold text-foreground">
                      {candidate.name}
                    </p>
                    <p className="text-[12px] leading-[16px] text-muted-foreground">
                      {candidate.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={handleConfirmSelection}
                disabled={selectedPlaces.size === 0}
              >
                Confirm Selection
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
