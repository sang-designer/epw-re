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
  variant?: "default" | "two-step";
  activeStep?: 1 | 2;
}

function DefaultInstructions() {
  return (
    <Accordion className="w-full" defaultValue={["overview"]}>
      <AccordionItem value="overview">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Overview
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          The top place is the one we&apos;re trying to identify. It is shown as
          a <strong>red pin</strong> on the map. The places listed below are
          possible candidates — shown as <strong>blue pins</strong> on the map.
          Your job is to find the same place in our database.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="finding">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Finding the Same Place
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground space-y-2">
          <p>
            Look for an obvious candidate based on the name and address.
            Sometimes addresses are slightly different — use the
            &quot;Search the Web&quot; link to verify they are the same place.
            If so, click <strong>&quot;This is it&quot;</strong>.
          </p>
          <p>
            If no candidate is obvious, check the map for a blue pin very near
            the red pin — it may be the same place with a slightly different
            address.
          </p>
          <p>
            Tip: Use ctrl+F to search the page for the zip code or street name
            if the list is long.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="manual">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Manual Linking
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          If none of the listed places are correct, but you know the Foursquare
          Place ID, enter it in the manual input field at the bottom and click{" "}
          <strong>&quot;Link&quot;</strong>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="no-candidates">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          No Candidates Found
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          Use &quot;Search the Web&quot; to confirm the place is real and open.
          If it exists but isn&apos;t in our database, click{" "}
          <strong>&quot;New Place&quot;</strong>. If you can&apos;t find any
          evidence it exists, click <strong>&quot;Invalid Place&quot;</strong>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="closed">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Closed Places
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          If the place is real but has permanently closed (e.g. a
          &quot;permanently closed&quot; note on Google, or reviews mentioning
          closure), click <strong>&quot;Closed Place&quot;</strong>. Use this
          when the place existed but no longer operates at this location.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="not-sure">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Not Sure?
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          You can always <strong>Skip</strong> and come back later! You can also
          ask for help from the Foursquare team — just provide the External
          Place Reference ID shown on the top card.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function TwoStepInstructions({ activeStep = 1 }: { activeStep?: 1 | 2 }) {
  return (
    <Accordion
      key={activeStep}
      className="w-full"
      defaultValue={activeStep === 2 ? ["step-2"] : ["step-1"]}
    >
      <AccordionItem value="overview">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Overview
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          The highlighted place is the one we&apos;re trying to identify. It is
          shown as a <strong>red pin</strong> on the map. Possible matches are
          shown as <strong>blue pins</strong>. Review happens in two steps:
          first choose the place&apos;s status, then select any matching places
          in our database.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-1">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Step 1: Select Status
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground space-y-2">
          <p>
            Use <strong>&quot;Search the Web&quot;</strong> to research the
            place, then choose one status:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Open</strong> — the place currently operates at this
              location.
            </li>
            <li>
              <strong>Closed</strong> — the place existed but has permanently
              closed (for example, a &quot;permanently closed&quot; note on
              Google, or reviews mentioning closure).
            </li>
            <li>
              <strong>Invalid</strong> — you can&apos;t find evidence this
              place exists, or it isn&apos;t a real place.
            </li>
          </ul>
          <p>
            After you choose a status, you&apos;ll continue to step 2 to select
            matching places. This applies to Open, Closed, and Invalid.
          </p>
          <p>
            If you&apos;re not sure, you can <strong>Skip</strong> and come
            back later.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="step-2">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Step 2: Select Matches
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground space-y-2">
          <p>
            Select any listed places that are the same location. You can select
            more than one.
          </p>
          <p>
            Look for an obvious candidate based on the name and address.
            Addresses can differ slightly — use{" "}
            <strong>&quot;Search the Web&quot;</strong> to verify they are the
            same place. If no candidate is obvious, check the map for a blue
            pin near the red pin; it may be the same place with a slightly
            different address.
          </p>
          <p>
            Tip: Use ctrl+F to search the page for the zip code or street name
            if the list is long.
          </p>
          <p>
            If none of the listed places are correct, but you know the
            Foursquare Place ID, enter it in the field under the last card and
            click <strong>&quot;Link&quot;</strong>.
          </p>
          <p>
            If there are no matches, click{" "}
            <strong>&quot;Submit (No Matches)&quot;</strong>. Otherwise click{" "}
            <strong>&quot;Submit Selected Match(es)&quot;</strong>.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="not-sure">
        <AccordionTrigger className="text-[14px] leading-[20px] font-semibold">
          Not Sure?
        </AccordionTrigger>
        <AccordionContent className="text-[14px] leading-[20px] text-foreground">
          You can always <strong>Skip</strong> on step 1 and come back later.
          You can also ask for help from the Foursquare team — just provide the
          External Place Reference ID shown on the top card.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function InstructionsDialog({
  open,
  onClose,
  variant = "default",
  activeStep = 1,
}: InstructionsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] max-w-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[24px] leading-[28px] font-semibold tracking-[-0.5px]">
            Instructions
          </DialogTitle>
        </DialogHeader>

        {variant === "two-step" ? (
          <TwoStepInstructions activeStep={activeStep} />
        ) : (
          <DefaultInstructions />
        )}

        <DialogFooter>
          <Button onClick={onClose}>OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
