"use client";

import { defaultLahoreIslamabadRouteRate, formatPkr, lahoreIslamabadRouteRateKey } from "@/lib/site";
import { useLiveRates } from "@/lib/use-live-rates";

export function RouteStartingRate() {
  const rates = useLiveRates();
  const rate = rates[lahoreIslamabadRouteRateKey] ?? defaultLahoreIslamabadRouteRate;

  return <>From Rs {formatPkr(rate)}*</>;
}
