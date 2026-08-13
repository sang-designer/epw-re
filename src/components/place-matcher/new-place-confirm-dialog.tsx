"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface NewPlaceConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function NewPlaceConfirmDialog({
  open,
  onConfirm,
  onCancel,
}: NewPlaceConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-[18px] leading-[24px] font-semibold">
            Create a new place?
          </DialogTitle>
        </DialogHeader>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onCancel} className="min-w-[100px]">
            No
          </Button>
          <Button onClick={onConfirm} className="min-w-[100px]">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
