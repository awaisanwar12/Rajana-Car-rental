"use client";

import { useEffect, useState } from "react";
import { defaultLahoreIslamabadRouteRate, lahoreIslamabadRouteRateKey, type FleetVehicle, type VehicleRateMap } from "@/lib/site";

type RateManagerProps = { vehicles: readonly FleetVehicle[] };
type ApiPayload = { rates?: VehicleRateMap; updatedAt?: string | null; error?: string };

function toRateMap(vehicles: readonly FleetVehicle[]) {
  return { ...Object.fromEntries(vehicles.map((vehicle) => [vehicle.id, vehicle.price])), [lahoreIslamabadRouteRateKey]: defaultLahoreIslamabadRouteRate } as VehicleRateMap;
}

export function RateManager({ vehicles }: RateManagerProps) {
  const [rates, setRates] = useState<VehicleRateMap>(() => toRateMap(vehicles));
  const [status, setStatus] = useState("Loading saved rates…");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/admin/api/rates", { cache: "no-store" })
      .then(async (response) => ({ response, payload: await response.json() as ApiPayload }))
      .then(({ response, payload }) => {
        if (!active) return;
        if (!response.ok) {
          setStatus(payload.error || "Rate storage is not configured yet.");
          return;
        }
        setRates((current) => ({ ...current, ...payload.rates }));
        setStatus(payload.updatedAt ? `Last saved ${new Date(payload.updatedAt).toLocaleString("en-PK")}.` : "Using the current published starting rates.");
      })
      .catch(() => active && setStatus("Could not load saved rates. Please refresh and try again."));
    return () => { active = false; };
  }, []);

  function changeRate(id: keyof VehicleRateMap, value: string) {
    const amount = Number(value);
    setRates((current) => ({ ...current, [id]: Number.isFinite(amount) ? amount : 0 }));
  }

  async function saveRates() {
    setSaving(true);
    setStatus("Saving rates…");
    try {
      const response = await fetch("/admin/api/rates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rates }),
      });
      const payload = await response.json() as ApiPayload;
      if (!response.ok) throw new Error(payload.error || "Could not save rates.");
      setRates((current) => ({ ...current, ...payload.rates }));
      setStatus(`Saved. The public fleet page will refresh shortly. ${payload.updatedAt ? `Updated ${new Date(payload.updatedAt).toLocaleString("en-PK")}.` : ""}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save rates.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rate-manager" aria-label="Vehicle rate management">
      <div className="rate-manager-heading"><div><span>Starting prices</span><h2>Update rates</h2><p>Only change the rate. Vehicle names, photos and categories stay unchanged.</p></div><p className="rate-manager-note">Final trip prices may still vary by route, fuel, tolls, timing and availability.</p></div>
      <div className="route-rate-editor"><label><span><strong>Popular one-way route</strong><small>Lahore → Islamabad</small></span><span className="rate-input"><small>Starting price (Rs)</small><input aria-label="Lahore to Islamabad starting rate" type="number" min="1000" max="500000" step="500" value={rates[lahoreIslamabadRouteRateKey] ?? defaultLahoreIslamabadRouteRate} onChange={(event) => changeRate(lahoreIslamabadRouteRateKey, event.target.value)} /></span></label><p>This one price updates every public Lahore → Islamabad route mention.</p></div>
      <div className="rate-list">{vehicles.map((vehicle) => <label key={vehicle.id}><span><strong>{vehicle.name}</strong><small>{vehicle.category} · {vehicle.seats}</small></span><span className="rate-input"><small>Rs / day</small><input aria-label={`${vehicle.name} daily starting rate`} type="number" min="1000" max="500000" step="500" value={rates[vehicle.id] ?? vehicle.price} onChange={(event) => changeRate(vehicle.id, event.target.value)} /></span></label>)}</div>
      <div className="rate-manager-actions"><button className="button button-primary" type="button" onClick={saveRates} disabled={saving}>{saving ? "Saving…" : "Save published rates"}</button><p role="status">{status}</p></div>
    </section>
  );
}
