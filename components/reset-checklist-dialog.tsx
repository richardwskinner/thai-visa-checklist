"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ResetChecklistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  tone?: "pink" | "blue";
};

const toneStyles = {
  pink: {
    icon: "bg-pink-100 text-pink-700",
    confirmButton: "bg-pink-600 text-white hover:bg-pink-700",
  },
  blue: {
    icon: "bg-blue-100 text-blue-700",
    confirmButton: "bg-blue-700 text-white hover:bg-blue-800",
  },
} as const;

export default function ResetChecklistDialog({
  open,
  onOpenChange,
  onConfirm,
  tone = "blue",
}: ResetChecklistDialogProps) {
  const styles = toneStyles[tone];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl p-6 sm:p-7">
        <DialogHeader className="gap-4">
          <div className="flex items-center gap-3">
            <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${styles.icon}`}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-xl font-bold text-slate-900">Reset checklist?</DialogTitle>
          </div>
          <DialogDescription className="text-sm leading-relaxed text-slate-600">
            This will clear all checked items and customisations.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-3 flex-row gap-3 sm:justify-start">
          <Button type="button" variant="outline" className="h-10 px-4" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            type="button"
            className={`${styles.confirmButton} h-10 px-4`}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Yes, reset checklist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
