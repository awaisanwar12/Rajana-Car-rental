"use client";

import { useEffect, useState } from "react";
import { fleet, type FleetVehicle, type VehicleRateMap, withLiveRates } from "@/lib/site";
import { FleetCard } from "./FleetCard";

export function FleetPreview({ vehicles = fleet.slice(0, 6) }: { vehicles?: readonly FleetVehicle[] }) {
  const [rates, setRates] = useState<VehicleRateMap>({});

  useEffect(() => {
    let active = true;
    fetch("/api/rates", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { rates?: VehicleRateMap } | null) => {
        if (active && payload?.rates) setRates(payload.rates);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  return <div className="fleet-grid">{withLiveRates(vehicles, rates).map((car, index) => <FleetCard key={car.id} car={car} featured={index === 0} />)}</div>;
}
