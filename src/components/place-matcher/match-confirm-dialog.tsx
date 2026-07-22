"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MatchConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function MatchConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: MatchConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[16px] leading-[24px] font-semibold">
            Is this the same place?
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onCancel}>
            No
          </Button>
          <Button onClick={onConfirm}>
            Yes, same place!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
