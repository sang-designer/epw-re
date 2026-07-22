"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface InstructionsDialogProps {
  open: boolean;
  onClose: () => void;
}

export function InstructionsDialog({ open, onClose }: InstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[24px] leading-[28px] font-semibold tracking-[-0.5px]">
            Instructions
          </DialogTitle>
        </DialogHeader>

        <Accordion className="w-full" defaultValue={["overview"]}>
          <AccordionItem value="overview">
            <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
              Overview
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[20px] text-foreground">
              The top place is the one we&apos;re trying to identify. It is
              shown as a <strong>red pin</strong> on the map. The places listed
              below are possible candidates — shown as{" "}
              <strong>blue pins</strong> on the map. Your job is to find the
              same place in our database.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="finding">
            <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
              Finding the Same Place
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[20px] text-foreground space-y-2">
              <p>
                Look for an obvious candidate based on the name and address. 
                Sometimes addresses are slightly different — use the &quot;Search
                the Web&quot; link to verify they are the same place. If so,
                click <strong>&quot;This is it&quot;</strong>.
              </p>
              <p>
                If no candidate is obvious, check the map for a blue pin very
                near the red pin — it may be the same place with a slightly
                different address.
              </p>
              <p>
                Tip: Use ctrl+F to search the page for the zip code or street
                name if the list is long.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="manual">
            <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
              Manual Linking
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[20px] text-foreground">
              If none of the listed places are correct, but you know the
              Foursquare Place ID, enter it in the manual input field at the
              bottom and click <strong>&quot;Link&quot;</strong>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="no-candidates">
            <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
              No Candidates Found
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[20px] text-foreground">
              Use &quot;Search the Web&quot; to confirm the place is real and
              open. If it exists but isn&apos;t in our database, click{" "}
              <strong>&quot;New Place&quot;</strong>. If you can&apos;t find any
              evidence it exists, click{" "}
              <strong>&quot;Invalid Place&quot;</strong>.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="closed">
            <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
              Closed Places
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[20px] text-foreground">
              If the place is real but has permanently closed (e.g. a
              &quot;permanently closed&quot; note on Google, or reviews
              mentioning closure), click{" "}
              <strong>&quot;Closed Place&quot;</strong>. Use this when the place
              existed but no longer operates at this location.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="not-sure">
            <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
              Not Sure?
            </AccordionTrigger>
            <AccordionContent className="text-[14px] leading-[20px] text-foreground">
              You can always <strong>Skip</strong> and come back later! You can
              also ask for help from the Foursquare team — just provide the
              External Place Reference ID shown on the top card.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <DialogFooter>
          <Button onClick={onClose}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
