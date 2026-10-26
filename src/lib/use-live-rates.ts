"use client";

import { useEffect, useState } from "react";
import type { VehicleRateMap } from "@/lib/site";

let inflightRates: Promise<VehicleRateMap> | null = null;

function loadLiveRates(): Promise<VehicleRateMap> {
  if (!inflightRates) {
    inflightRates = fetch("/api/rates", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((payload: { rates?: VehicleRateMap } | null) => payload?.rates ?? {})
      .catch(() => ({}))
      .finally(() => {
        inflightRates = null;
      });
  }
  return inflightRates;
}

export function useLiveRates() {
  const [rates, setRates] = useState<VehicleRateMap>({});

  useEffect(() => {
    let active = true;
    loadLiveRates().then((nextRates) => {
      if (active) setRates(nextRates);
    });
    return () => {
      active = false;
    };
  }, []);

  return rates;
}
