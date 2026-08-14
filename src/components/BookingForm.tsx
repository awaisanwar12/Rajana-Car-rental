"use client";

import { FormEvent, useState } from "react";
import { fleet, whatsappUrl } from "@/lib/site";
import { ArrowIcon, WhatsAppIcon } from "./Icons";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello Rajana Car Rental, I would like a quote.",
      "",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Pickup: ${form.get("pickup")}`,
      `Destination: ${form.get("destination")}`,
      `Pickup date: ${form.get("date")}`,
      `Car: ${form.get("car")}`,
      `Details: ${form.get("details") || "Not provided"}`,
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setStatus("Your details are ready in WhatsApp. Send the message to confirm your request.");
  }

  return (
    <form className={`booking-form ${compact ? "booking-form-compact" : ""}`} onSubmit={handleSubmit}>
      <div className="form-heading">
        <span><WhatsAppIcon size={19} /> Fastest response</span>
        <h2>Get your trip price</h2>
        <p>No payment needed. We confirm the final rate on WhatsApp.</p>
      </div>
      <div className="form-grid">
        <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
        <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="03xx xxxxxxx" required /></label>
        <label>Pickup location<input name="pickup" placeholder="e.g. DHA Lahore" required /></label>
        <label>Destination<input name="destination" placeholder="e.g. Lahore Airport" required /></label>
        <label>Pickup date<input name="date" type="date" required /></label>
        <label>Choose a car<select name="car" defaultValue=""><option value="" disabled>Select a vehicle</option>{fleet.map((car) => <option key={car.name}>{car.name}</option>)}<option>Other / recommend a car</option></select></label>
        {!compact && <label className="field-wide">Trip details<textarea name="details" rows={3} placeholder="Passengers, return date, special requests…" /></label>}
      </div>
      <button className="button button-primary button-block" type="submit">Continue on WhatsApp <ArrowIcon /></button>
      {status && <p className="form-status" role="status">{status}</p>}
    </form>
  );
}
