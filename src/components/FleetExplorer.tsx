"use client";

import { useEffect, useState } from "react";
import { fleet, type VehicleRateMap, withLiveRates } from "@/lib/site";
import { FleetCard } from "./FleetCard";

const filters = ["All", "Sedan", "SUV", "7 Seater", "Van"] as const;
type Filter = (typeof filters)[number];

function vehicleGroup(category: string): Exclude<Filter, "All"> {
  const lower = category.toLowerCase();
  if (lower.includes("sedan") || lower.includes("economy") || lower.includes("car")) return "Sedan";
  if (lower.includes("7-seater")) return "7 Seater";
  if (lower.includes("van") || lower.includes("coaster")) return "Van";
  return "SUV";
}

export function FleetExplorer() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [rates, setRates] = useState<VehicleRateMap>({});
  const liveFleet = withLiveRates(fleet, rates);
  const visibleFleet = activeFilter === "All" ? liveFleet : liveFleet.filter((car) => vehicleGroup(car.category) === activeFilter);

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

  return (
    <div className="fleet-explorer">
      <div className="fleet-filter" role="group" aria-label="Filter vehicles by type">
        {filters.map((filter) => (
          <button key={filter} type="button" className={activeFilter === filter ? "is-active" : ""} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
            {filter}
          </button>
        ))}
      </div>
      <p className="fleet-result-count" aria-live="polite">Showing {visibleFleet.length} {visibleFleet.length === 1 ? "vehicle" : "vehicles"}</p>
      <div className="fleet-grid fleet-grid-all">
        {visibleFleet.map((car) => <FleetCard key={car.id} car={car} />)}
      </div>
    </div>
  );
}
