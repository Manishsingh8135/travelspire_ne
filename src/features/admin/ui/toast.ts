"use client";

import { toast } from "sonner";

export { toast };

/**
 * Optimistic-mutation feedback: apply, then toast with a working Undo instead of
 * a blocking confirm dialog (Aza Raskin / Linear model). Undo persists ≥10s.
 */
export function toastUndo(message: string, undo: () => void | Promise<void>) {
  toast(message, {
    duration: 10_000,
    action: {
      label: "Undo",
      onClick: () => {
        void undo();
      },
    },
  });
}

export function toastError(message = "Something went wrong — try again.") {
  toast.error(message);
}
