"use client";

import { useState } from "react";
import { Button } from "@/components/ds";
import type { TripDetails } from "@/lib/bookings/trip";
import { TravellerForm } from "./traveller-form";

/* Submitted details as a read-only summary, with an Edit switch until the
   permits are done. Before anything is submitted it is just the form. */
export function TripDetailsSection({
  reference,
  token,
  travellerCount,
  details,
  locked,
}: {
  reference: string;
  token: string;
  travellerCount: number;
  details?: TripDetails;
  locked: boolean;
}) {
  const [editing, setEditing] = useState(false);

  if (!details || editing) {
    return (
      <TravellerForm
        reference={reference}
        token={token}
        travellerCount={travellerCount}
        initial={details}
        onDone={details ? () => setEditing(false) : undefined}
        className="mt-6"
      />
    );
  }

  return (
    <div className="mt-5 font-ui">
      <ul className="divide-y divide-line border-y border-line">
        {details.travellers.map((t, i) => (
          <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
            <span className="text-body font-medium text-fg">{t.name}</span>
            <span className="text-small text-fg-muted">
              {t.age} · {t.gender} · {t.idType}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 grid gap-3 text-small sm:grid-cols-2">
        <div>
          <dt className="text-fg-subtle">Arriving</dt>
          <dd className="mt-0.5 text-fg">{details.arrival || "Not told us yet"}</dd>
        </div>
        <div>
          <dt className="text-fg-subtle">Food needs</dt>
          <dd className="mt-0.5 text-fg">{details.food || "None"}</dd>
        </div>
        <div>
          <dt className="text-fg-subtle">Emergency contact</dt>
          <dd className="mt-0.5 text-fg">
            {details.emergencyName} · {details.emergencyPhone}
          </dd>
        </div>
      </dl>
      {locked ? (
        <p className="mt-5 text-small text-fg-muted">Permits are done with these details. To change anything, message us on WhatsApp.</p>
      ) : (
        <Button variant="secondary" size="sm" className="mt-5" onClick={() => setEditing(true)}>
          Edit details
        </Button>
      )}
    </div>
  );
}
