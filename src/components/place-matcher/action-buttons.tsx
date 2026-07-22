"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonsProps {
  onNewPlace?: () => void;
  onClosedPlace?: () => void;
  onInvalidPlace?: () => void;
  onSkip?: () => void;
  className?: string;
}

export function ActionButtons({
  onNewPlace,
  onClosedPlace,
  onInvalidPlace,
  onSkip,
  className,
}: ActionButtonsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 bg-background px-6 py-4",
        className
      )}
    >
      <Button
        className="min-w-[180px] text-[16px] leading-[24px] font-medium"
        title="This place is real but not in our database"
        onClick={onNewPlace}
      >
        New Place
      </Button>
      <Button
        variant="outline"
        className="min-w-[180px] text-[16px] leading-[24px] font-medium text-destructive border-destructive hover:bg-destructive/10"
        title="This place has permanently closed"
        onClick={onClosedPlace}
      >
        Closed Place
      </Button>
      <Button
        variant="outline"
        className="min-w-[170px] text-[16px] leading-[24px] font-medium text-destructive border-destructive hover:bg-destructive/10"
        title="This place doesn't exist or is spam"
        onClick={onInvalidPlace}
      >
        Invalid Place
      </Button>
      <Button
        variant="outline"
        className="min-w-[100px] text-[16px] leading-[24px] font-medium text-primary border-primary hover:bg-primary/10"
        title="Not sure, come back later"
        onClick={onSkip}
      >
        Skip
      </Button>
    </div>
  );
}
