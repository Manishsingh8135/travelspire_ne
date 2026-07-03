"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  setPublished,
  setArchived,
  softDelete,
  restoreDeleted,
  type ContentTable,
} from "@/features/admin/lifecycle-actions";
import { toastUndo, toastError } from "./toast";

function label(count: number, noun: string): string {
  return count === 1 ? `1 ${noun}` : `${count} ${noun}s`;
}

/**
 * Optimistic lifecycle ops bound to a content table, each with a toast + working
 * Undo and a router refresh. This is the one place publish/archive/delete UX
 * lives — row actions and bulk actions both call it.
 */
export function useLifecycle(table: ContentTable, noun: string) {
  const router = useRouter();

  const perform = React.useCallback(
    async (fn: () => Promise<void>) => {
      try {
        await fn();
        router.refresh();
      } catch {
        toastError();
      }
    },
    [router],
  );

  return React.useMemo(
    () => ({
      publish: (ids: string[]) =>
        perform(async () => {
          await setPublished(table, ids, true);
          toastUndo(`${label(ids.length, noun)} published`, () =>
            perform(() => setPublished(table, ids, false)),
          );
        }),
      unpublish: (ids: string[]) =>
        perform(async () => {
          await setPublished(table, ids, false);
          toastUndo(`${label(ids.length, noun)} unpublished`, () =>
            perform(() => setPublished(table, ids, true)),
          );
        }),
      archive: (ids: string[]) =>
        perform(async () => {
          await setArchived(table, ids, true);
          toastUndo(`${label(ids.length, noun)} archived`, () =>
            perform(() => setArchived(table, ids, false)),
          );
        }),
      remove: (ids: string[]) =>
        perform(async () => {
          await softDelete(table, ids);
          toastUndo(`${label(ids.length, noun)} deleted`, () =>
            perform(() => restoreDeleted(table, ids)),
          );
        }),
    }),
    [perform, table, noun],
  );
}
