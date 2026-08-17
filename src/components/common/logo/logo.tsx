// components/common/logo/logo.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Travelspire North-East home"
      className={cn(
        "flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2ead8]",
        className,
      )}
    >
      <div className="relative flex items-center">
        <div className="relative h-[72px] w-24 md:h-20">
          <Image
            src="/images/logo/Travelspire_ne_logo_new.png"
            alt="Travelspire NE Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
}
