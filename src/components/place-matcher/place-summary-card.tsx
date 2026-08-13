"use client";

import { Copy, Search } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlaceSummaryCardProps {
  name: string;
  address: string;
  category: string;
  externalReferenceId: string;
  reportingUser?: {
    name: string;
    avatarUrl: string;
  };
  onSearchWeb?: () => void;
  onCopyReferenceId?: () => void;
  onNewPlace?: () => void;
  onClosedPlace?: () => void;
  onInvalidPlace?: () => void;
  onSkip?: () => void;
  className?: string;
}

export function PlaceSummaryCard({
  name,
  address,
  category,
  externalReferenceId,
  reportingUser,
  onSearchWeb,
  onCopyReferenceId,
  onNewPlace,
  onClosedPlace,
  onInvalidPlace,
  onSkip,
  className,
}: PlaceSummaryCardProps) {
  return (
    <Card className={cn("overflow-hidden bg-primary/5 border-primary/20", className)}>
      <CardContent className="space-y-0.5">
        {/* Name with red pin icon */}
        <div className="flex items-center gap-2">
          <h2 className="text-[16px] leading-[24px] font-semibold text-[#171417] underline decoration-foreground/30 underline-offset-2">
            {name}
          </h2>
          <Image src="/icons/map-pin-red.svg" alt="Source location" width={16} height={20} className="shrink-0" />
        </div>

        {/* Address */}
        <p className="text-[14px] leading-[20px] font-normal text-foreground">
          {address}
        </p>

        {/* Category */}
        <p className="text-[14px] leading-[20px] font-normal text-[#646464]">
          {category}
        </p>

        <div className="flex items-center gap-4 pt-1">
          <Button
            variant="link"
            size="sm"
            className="text-primary p-0 h-auto text-[14px] leading-[20px] font-medium"
            onClick={onSearchWeb}
          >
            <Search className="size-4 mr-1" />
            Search the web
          </Button>

          {reportingUser && (
            <div className="flex items-center gap-2">
              <span className="text-[14px] leading-[20px] font-normal text-foreground">
                Reporting user:
              </span>
              <Avatar className="size-6">
                <AvatarImage
                  src={reportingUser.avatarUrl}
                  alt={reportingUser.name}
                />
                <AvatarFallback>
                  {reportingUser.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>

        {/* External Reference ID */}
        <div className="flex items-center gap-2 pt-1">
          <code className="text-[12px] leading-[16px] font-semibold font-mono text-[#646464]">
            External Place Reference ID: {externalReferenceId}
          </code>
          <Button
            variant="ghost"
            size="icon"
            className="size-5"
            onClick={onCopyReferenceId}
          >
            <Copy className="size-3.5" />
          </Button>
        </div>
      </CardContent>

      {/* Action Buttons in Footer */}
      <CardFooter className="flex items-center gap-3 bg-primary/5 border-primary/20">
        <Button
          variant="outline"
          className="flex-1 text-[14px] leading-[20px] font-medium h-9 text-primary border-primary hover:bg-primary/10"
          title="This place is real but not in our database"
          onClick={onNewPlace}
        >
          New Place
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-[14px] leading-[20px] font-medium h-9 text-destructive border-destructive hover:bg-destructive/10"
          title="This place has permanently closed"
          onClick={onClosedPlace}
        >
          Closed Place
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-[14px] leading-[20px] font-medium h-9 text-destructive border-destructive hover:bg-destructive/10"
          title="This place doesn't exist or is spam"
          onClick={onInvalidPlace}
        >
          Invalid Place
        </Button>
        <Button
          variant="outline"
          className="flex-1 text-[14px] leading-[20px] font-medium h-9 text-primary border-primary hover:bg-primary/10"
          title="Not sure, come back later"
          onClick={onSkip}
        >
          Skip
        </Button>
      </CardFooter>
    </Card>
  );
}
