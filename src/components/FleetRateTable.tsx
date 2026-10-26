"use client";

import Link from "next/link";
import {
  defaultLahoreIslamabadRouteRate,
  fleet,
  formatPkr,
  lahoreIslamabadRouteRateKey,
  whatsappUrl,
  withLiveRates,
} from "@/lib/site";
import { useLiveRates } from "@/lib/use-live-rates";

export function FleetRateTable() {
  const rates = useLiveRates();
  const vehiclesByPrice = [...withLiveRates(fleet, rates)].sort((left, right) => left.price - right.price);
  const islamabadRate = rates[lahoreIslamabadRouteRateKey] ?? defaultLahoreIslamabadRouteRate;

  return (
    <div className="rate-table-wrap">
      <table className="rate-table">
        <caption>Get Car Lahore chauffeur-driven daily and intercity starting rates in PKR</caption>
        <thead>
          <tr>
            <th scope="col">Vehicle / Route</th>
            <th scope="col">Type</th>
            <th scope="col">Capacity</th>
            <th scope="col">Starting Rate</th>
            <th scope="col">Rate Details</th>
            <th scope="col">Quote</th>
          </tr>
        </thead>
        <tbody>
          {vehiclesByPrice.map((car) => (
            <tr key={car.id}>
              <th scope="row">
                <Link href={`/${car.slug}/`}>{car.name}</Link>
              </th>
              <td>{car.category}</td>
              <td>{car.seats}</td>
              <td className="rate-table-price">{car.priceLabel}</td>
              <td>{car.rateNote ?? "With driver · Fuel, tolls & parking quoted by route"}</td>
              <td>
                <a
                  className="rate-table-cta"
                  href={whatsappUrl(`Hello Get Car, please share availability and exact rate for ${car.name}.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp quote
                </a>
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row">
              <Link href="/lahore-to-islamabad-car-rental/">Lahore to Islamabad Drop</Link>
            </th>
            <td>Intercity route</td>
            <td>4 to 29 passengers</td>
            <td className="rate-table-price">From Rs {formatPkr(islamabadRate)}*</td>
            <td>One-way or return chauffeur journey · Confirm vehicle &amp; motorway terms</td>
            <td>
              <a
                className="rate-table-cta"
                href={whatsappUrl("Hello Get Car, please share the exact quote for a Lahore to Islamabad drop.")}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp quote
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
