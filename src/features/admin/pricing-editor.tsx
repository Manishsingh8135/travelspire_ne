"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button, Input, Label, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  PricingSchema,
  fromPrice,
  type Pricing,
  type PricingMode,
} from "@/lib/tours/pricing";
import { useEditorForm } from "./ui/editor-shell";

/**
 * PricingEditor — the real pricing matrix (03 §4): group-size tiers + a
 * private rate + festival variant tiers, in one model. "FROM ₹X" is computed
 * live and derived on save — never typed. Serializes to a hidden input
 * validated server-side by PricingSchema.
 */

type GroupRow = { key: string; groupSize: string; pricePax: string };
type VariantRow = {
  key: string;
  label: string;
  pricePax: string;
  nights: string;
  days: string;
  description: string;
  inclusions: string;
};

const miniLabel = "font-mono text-[10px] tracking-wider text-muted-foreground uppercase";
const compact = "h-9 px-2.5 text-sm";

function fromDefault(value: unknown): {
  groups: GroupRow[];
  privateOn: boolean;
  privatePrice: string;
  variants: VariantRow[];
} {
  const parsed = PricingSchema.safeParse(value ?? {});
  const modes: PricingMode[] = parsed.success ? parsed.data.modes : [];
  let k = 0;
  const key = () => `p-${k++}`;
  const groups: GroupRow[] = [];
  const variants: VariantRow[] = [];
  let privateOn = false;
  let privatePrice = "";
  for (const m of modes) {
    if (m.mode === "group") {
      for (const t of m.tiers)
        groups.push({ key: key(), groupSize: String(t.groupSize || ""), pricePax: String(t.pricePax) });
    } else if (m.mode === "private") {
      privateOn = true;
      privatePrice = String(m.pricePax);
    } else {
      variants.push({
        key: key(),
        label: m.label,
        pricePax: String(m.pricePax),
        nights: m.nights != null ? String(m.nights) : "",
        days: m.days != null ? String(m.days) : "",
        description: m.description ?? "",
        inclusions: (m.inclusions ?? []).join("\n"),
      });
    }
  }
  return { groups, privateOn, privatePrice, variants };
}

function build(state: ReturnType<typeof fromDefault>): Pricing | null {
  const modes: PricingMode[] = [];
  const tiers = state.groups
    .filter((g) => g.pricePax.trim() !== "")
    .map((g) => ({ groupSize: Number(g.groupSize) || 0, pricePax: Number(g.pricePax) || 0 }));
  if (tiers.length) modes.push({ mode: "group", label: "Group trip", tiers });
  if (state.privateOn && state.privatePrice.trim() !== "")
    modes.push({ mode: "private", label: "Private (couple/twin)", pricePax: Number(state.privatePrice) || 0 });
  for (const v of state.variants) {
    if (!v.label.trim() || v.pricePax.trim() === "") continue;
    modes.push({
      mode: "variant",
      label: v.label,
      pricePax: Number(v.pricePax) || 0,
      nights: v.nights.trim() === "" ? null : Number(v.nights),
      days: v.days.trim() === "" ? null : Number(v.days),
      description: v.description.trim() || null,
      inclusions: v.inclusions.split("\n").map((l) => l.trim()).filter(Boolean),
    });
  }
  return modes.length ? { currency: "INR", per: "pax", modes } : null;
}

export function PricingEditor({ name, defaultValue }: { name: string; defaultValue: unknown }) {
  const [state, setState] = React.useState(() => fromDefault(defaultValue));
  const { markDirty } = useEditorForm();
  const counter = React.useRef(1000);
  const nextKey = () => `n-${counter.current++}`;

  const mutate = (updates: Partial<ReturnType<typeof fromDefault>>) => {
    setState((prev) => ({ ...prev, ...updates }));
    markDirty();
  };

  const pricing = build(state);
  const from = fromPrice(pricing);

  return (
    <div className="flex flex-col gap-5">
      <input type="hidden" name={name} value={pricing ? JSON.stringify(pricing) : ""} readOnly />

      {/* Computed from-price — derived, never typed */}
      <div className="flex items-center gap-2 rounded-md border border-border-subtle bg-muted/50 px-3 py-2">
        <span className={miniLabel}>Catalogue price</span>
        <span className="font-mono text-sm font-medium text-foreground">
          {from != null ? `FROM ₹${from.toLocaleString("en-IN")}` : "— no pricing yet"}
        </span>
        <span className="ml-auto text-[11px] text-muted-foreground">computed from the matrix</span>
      </div>

      {/* Group tiers */}
      <div className="flex flex-col gap-2">
        <p className={miniLabel}>Group trip — ₹ per person by group size</p>
        {state.groups.map((g) => (
          <div key={g.key} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Label className={cn(miniLabel, "shrink-0")}>Group of</Label>
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={g.groupSize}
                onChange={(e) =>
                  mutate({
                    groups: state.groups.map((x) =>
                      x.key === g.key ? { ...x, groupSize: e.target.value } : x,
                    ),
                  })
                }
                className={cn(compact, "w-20 font-mono")}
              />
            </div>
            <div className="flex flex-1 items-center gap-2">
              <Label className={cn(miniLabel, "shrink-0")}>₹ / pax</Label>
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={g.pricePax}
                onChange={(e) =>
                  mutate({
                    groups: state.groups.map((x) =>
                      x.key === g.key ? { ...x, pricePax: e.target.value } : x,
                    ),
                  })
                }
                className={cn(compact, "w-32 font-mono")}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-9 px-2 text-muted-foreground hover:text-danger"
              aria-label="Remove tier"
              onClick={() => mutate({ groups: state.groups.filter((x) => x.key !== g.key) })}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            mutate({ groups: [...state.groups, { key: nextKey(), groupSize: "", pricePax: "" }] })
          }
        >
          <Plus /> Add group tier
        </Button>
      </div>

      {/* Private */}
      <div className="flex flex-wrap items-center gap-3 border-t border-border-subtle pt-4">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input
            type="checkbox"
            checked={state.privateOn}
            onChange={(e) => mutate({ privateOn: e.target.checked })}
            className="size-4 accent-[var(--accent)]"
          />
          Private trip (couple / twin)
        </label>
        {state.privateOn ? (
          <div className="flex items-center gap-2">
            <Label className={cn(miniLabel, "shrink-0")}>₹ / pax</Label>
            <Input
              type="number"
              min="0"
              inputMode="numeric"
              value={state.privatePrice}
              onChange={(e) => mutate({ privatePrice: e.target.value })}
              className={cn(compact, "w-32 font-mono")}
            />
          </div>
        ) : null}
      </div>

      {/* Festival variants */}
      <div className="flex flex-col gap-2 border-t border-border-subtle pt-4">
        <p className={miniLabel}>Festival / package variants</p>
        {state.variants.map((v) => (
          <div key={v.key} className="rounded-md border border-border-subtle p-3">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-[minmax(0,1fr)_110px_80px_80px_auto]">
              <Input
                value={v.label}
                placeholder="Hornbill Camping"
                onChange={(e) =>
                  mutate({
                    variants: state.variants.map((x) =>
                      x.key === v.key ? { ...x, label: e.target.value } : x,
                    ),
                  })
                }
                className={compact}
              />
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={v.pricePax}
                placeholder="₹ / pax"
                onChange={(e) =>
                  mutate({
                    variants: state.variants.map((x) =>
                      x.key === v.key ? { ...x, pricePax: e.target.value } : x,
                    ),
                  })
                }
                className={cn(compact, "font-mono")}
              />
              <Input
                type="number"
                min="0"
                inputMode="numeric"
                value={v.nights}
                placeholder="nights"
                onChange={(e) =>
                  mutate({
                    variants: state.variants.map((x) =>
                      x.key === v.key ? { ...x, nights: e.target.value } : x,
                    ),
                  })
                }
                className={cn(compact, "font-mono")}
              />
              <Input
                type="number"
                min="1"
                inputMode="numeric"
                value={v.days}
                placeholder="days"
                onChange={(e) =>
                  mutate({
                    variants: state.variants.map((x) =>
                      x.key === v.key ? { ...x, days: e.target.value } : x,
                    ),
                  })
                }
                className={cn(compact, "font-mono")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 px-2 text-muted-foreground hover:text-danger"
                aria-label={`Remove ${v.label || "variant"}`}
                onClick={() => mutate({ variants: state.variants.filter((x) => x.key !== v.key) })}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Input
                value={v.description}
                placeholder="One-line description (optional)"
                onChange={(e) =>
                  mutate({
                    variants: state.variants.map((x) =>
                      x.key === v.key ? { ...x, description: e.target.value } : x,
                    ),
                  })
                }
                className={compact}
              />
              <Textarea
                value={v.inclusions}
                placeholder="Inclusions — one per line"
                rows={2}
                onChange={(e) =>
                  mutate({
                    variants: state.variants.map((x) =>
                      x.key === v.key ? { ...x, inclusions: e.target.value } : x,
                    ),
                  })
                }
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() =>
            mutate({
              variants: [
                ...state.variants,
                { key: nextKey(), label: "", pricePax: "", nights: "", days: "", description: "", inclusions: "" },
              ],
            })
          }
        >
          <Plus /> Add variant
        </Button>
      </div>
    </div>
  );
}
