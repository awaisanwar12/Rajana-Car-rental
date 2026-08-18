"use client";

import { useEffect, useState } from "react";
import { defaultLahoreIslamabadRouteRate, lahoreIslamabadRouteRateKey, type VehicleRateMap } from "@/lib/site";

export function RouteStartingRate() {
  const [rate, setRate] = useState(defaultLahoreIslamabadRouteRate);

  useEffect(() => {
    let active = true;
    fetch("/api/rates", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { rates?: VehicleRateMap } | null) => {
        const savedRate = payload?.rates?.[lahoreIslamabadRouteRateKey];
        if (active && typeof savedRate === "number") setRate(savedRate);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, []);

  return <>From Rs {new Intl.NumberFormat("en-PK").format(rate)}*</>;
}
