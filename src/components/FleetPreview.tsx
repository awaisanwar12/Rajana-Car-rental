"use client";

import { fleet, type FleetVehicle, withLiveRates } from "@/lib/site";
import { useLiveRates } from "@/lib/use-live-rates";
import { FleetCard } from "./FleetCard";

export function FleetPreview({ vehicles = fleet }: { vehicles?: readonly FleetVehicle[] }) {
  const rates = useLiveRates();

  return <div className="fleet-grid">{withLiveRates(vehicles, rates).map((car, index) => <FleetCard key={car.id} car={car} featured={index === 0} />)}</div>;
}
