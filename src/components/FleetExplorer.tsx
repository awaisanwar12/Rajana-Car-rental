"use client";

import { useState } from "react";
import { fleet } from "@/lib/site";
import { FleetCard } from "./FleetCard";

const filters = ["All", "Sedan", "SUV", "7 Seater", "Van"] as const;
type Filter = (typeof filters)[number];

function vehicleGroup(category: string): Exclude<Filter, "All"> {
  if (category.toLowerCase().includes("sedan")) return "Sedan";
  if (category.toLowerCase().includes("7-seater")) return "7 Seater";
  if (category.toLowerCase().includes("van")) return "Van";
  return "SUV";
}

export function FleetExplorer() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleFleet = activeFilter === "All" ? fleet : fleet.filter((car) => vehicleGroup(car.category) === activeFilter);

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
        {visibleFleet.map((car) => <FleetCard key={car.name} car={car} />)}
      </div>
    </div>
  );
}
