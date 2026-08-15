"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FileIcon, WhatsAppIcon } from "./Icons";
import { site } from "@/lib/site";

type NumericInput = number | "";
type LineItem = { id: number; description: string; quantity: NumericInput; rate: NumericInput };
type InvoiceData = {
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  city: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  dropoffDate: string;
  dropoffTime: string;
  notes: string;
  paid: NumericInput;
  items: LineItem[];
};

const today = () => new Date().toISOString().slice(0, 10);
const emptyInvoice = (): InvoiceData => ({
  invoiceNumber: `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`,
  date: today(),
  customerName: "", customerPhone: "", customerEmail: "", customerAddress: "",
  city: "", pickupLocation: "", dropoffLocation: "",
  pickupDate: "", pickupTime: "", dropoffDate: "", dropoffTime: "",
  notes: "Thank you for choosing Rajana Car Rental.",
  paid: "",
  items: [{ id: Date.now(), description: "", quantity: 1, rate: "" }],
});

const numberValue = (value: NumericInput) => value === "" ? 0 : value;
const money = (value: NumericInput) => new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(numberValue(value));
const logoPath = "/images/rajana-logo.jpg";

function invoiceFilename(invoiceNumber: string) {
  return `${invoiceNumber || "Rajana-Invoice"}.pdf`.replace(/[^a-z0-9-_.]/gi, "-");
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1_000);
}

async function loadCircularLogoDataUrl(path: string) {
  const response = await fetch(path);
  if (!response.ok) throw new Error("Logo could not be loaded.");
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new window.Image();
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Logo could not be read."));
      element.src = objectUrl;
    });
    const size = 420;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Logo could not be prepared.");

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, size, size);
    context.save();
    context.beginPath();
    context.arc(size / 2, size / 2, 200, 0, Math.PI * 2);
    context.clip();
    context.fillStyle = "#f8f7f2";
    context.fillRect(0, 0, size, size);
    const logoWidth = 364;
    const logoHeight = logoWidth * (image.height / image.width);
    context.drawImage(image, (size - logoWidth) / 2, (size - logoHeight) / 2, logoWidth, logoHeight);
    context.restore();
    context.strokeStyle = "#0b2235";
    context.lineWidth = 7;
    context.beginPath();
    context.arc(size / 2, size / 2, 196.5, 0, Math.PI * 2);
    context.stroke();

    return canvas.toDataURL("image/jpeg", 0.9);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function whatsappNumber(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `92${digits.slice(1)}`;
  return digits;
}

function displayDate(value: string) {
  if (!value) return "";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-PK", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(year, month - 1, day));
}

function displayTime(value: string) {
  if (!value) return "";
  const [hours, minutes] = value.split(":").map(Number);
  return new Intl.DateTimeFormat("en-PK", { hour: "numeric", minute: "2-digit" }).format(new Date(2000, 0, 1, hours, minutes));
}

function tripDateTime(date: string, time: string) {
  return [displayDate(date), displayTime(time)].filter(Boolean).join(" · ");
}

export function InvoiceBuilder() {
  const [data, setData] = useState<InvoiceData>(emptyInvoice);
  const [status, setStatus] = useState("Drafts stay on this device only.");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rajana-invoice-draft");
    if (!saved) return;
    const timer = window.setTimeout(() => {
      try {
        const savedData = JSON.parse(saved) as Partial<InvoiceData>;
        const fresh = emptyInvoice();
        setData({ ...fresh, ...savedData, items: savedData.items?.length ? savedData.items : fresh.items });
        setStatus("Saved draft restored from this device.");
      } catch { /* Ignore invalid storage */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const total = useMemo(() => data.items.reduce((sum, item) => sum + numberValue(item.quantity) * numberValue(item.rate), 0), [data.items]);
  const balance = Math.max(total - numberValue(data.paid), 0);
  const pickupDateTime = tripDateTime(data.pickupDate, data.pickupTime);
  const dropoffDateTime = tripDateTime(data.dropoffDate, data.dropoffTime);
  const hasTripDetails = Boolean(data.city || data.pickupLocation || data.dropoffLocation || pickupDateTime || dropoffDateTime);

  const setField = <K extends keyof InvoiceData>(field: K, value: InvoiceData[K]) => setData((current) => ({ ...current, [field]: value }));
  const updateItem = (id: number, field: keyof LineItem, value: string | number) => setData((current) => ({ ...current, items: current.items.map((item) => item.id === id ? { ...item, [field]: value } : item) }));
  const addItem = () => setData((current) => ({ ...current, items: [...current.items, { id: Date.now(), description: "", quantity: 1, rate: "" }] }));
  const removeItem = (id: number) => setData((current) => ({ ...current, items: current.items.length === 1 ? current.items : current.items.filter((item) => item.id !== id) }));

  function saveDraft() {
    localStorage.setItem("rajana-invoice-draft", JSON.stringify(data));
    setStatus("Draft saved on this device.");
  }

  function clearDraft() {
    const fresh = emptyInvoice();
    setData(fresh);
    localStorage.removeItem("rajana-invoice-draft");
    setStatus("Invoice cleared.");
  }

  async function createPdf() {
      const { jsPDF } = await import("jspdf");
      const logo = await loadCircularLogoDataUrl(logoPath);
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const navy = [11, 34, 53] as const;
      const red = [184, 41, 49] as const;
      const muted = [91, 105, 116] as const;
      const pageWidth = 210;
      const margin = 16;
      const addPageHeader = () => {
        doc.setFillColor(255, 255, 255); doc.rect(0, 0, pageWidth, 40, "F");
        doc.addImage(logo, "JPEG", 18, 4, 32, 32);
        doc.setFillColor(...navy); doc.rect(137, 0, 73, 40, "F");
        doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.text("INVOICE", 194, 23, { align: "right" });
        doc.setFillColor(...red); doc.rect(0, 40, pageWidth, 2, "F");
      };
      addPageHeader();
      doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      doc.text([site.address, site.phoneDisplay, site.email, site.url], margin, 49);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text("BILL TO", margin, 70);
      doc.setFontSize(12); doc.text(data.customerName || "Customer", margin, 78);
      doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      const customer = [data.customerPhone, data.customerEmail, data.customerAddress].filter(Boolean);
      if (customer.length) doc.text(customer, margin, 84);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text("INVOICE NO.", 142, 70); doc.text("DATE", 142, 80);
      doc.setFont("helvetica", "normal"); doc.text(data.invoiceNumber, 194, 70, { align: "right" }); doc.text(data.date, 194, 80, { align: "right" });
      let y = 98;
      const tripLines = [
        data.city ? `City: ${data.city}` : "",
        pickupDateTime || data.pickupLocation ? `Pickup: ${[pickupDateTime, data.pickupLocation].filter(Boolean).join(" - ")}` : "",
        dropoffDateTime || data.dropoffLocation ? `Drop-off: ${[dropoffDateTime, data.dropoffLocation].filter(Boolean).join(" - ")}` : "",
      ].filter(Boolean);
      if (tripLines.length) {
        const wrappedTripLines = tripLines.flatMap((line) => doc.splitTextToSize(line, 168) as string[]);
        const tripHeight = 12 + wrappedTripLines.length * 4.5;
        doc.setFillColor(245, 247, 248); doc.roundedRect(margin, y, 178, tripHeight, 1.5, 1.5, "F");
        doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text("TRIP DETAILS", margin + 4, y + 6);
        doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.text(wrappedTripLines, margin + 4, y + 12);
        y += tripHeight + 6;
      }
      const tableHead = () => {
        doc.setFillColor(...navy); doc.rect(margin, y, 178, 9, "F");
        doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(8);
        doc.text("DESCRIPTION", margin + 3, y + 6); doc.text("QTY", 143, y + 6, { align: "right" }); doc.text("RATE", 168, y + 6, { align: "right" }); doc.text("AMOUNT", 191, y + 6, { align: "right" }); y += 9;
      };
      tableHead();
      for (const item of data.items) {
        const lines = doc.splitTextToSize(item.description || "Service", 102) as string[];
        const rowHeight = Math.max(12, lines.length * 4.5 + 5);
        if (y + rowHeight > 250) { doc.addPage(); addPageHeader(); y = 50; tableHead(); }
        doc.setDrawColor(220, 224, 227); doc.rect(margin, y, 178, rowHeight);
        doc.setTextColor(...navy); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
        doc.text(lines, margin + 3, y + 6); doc.text(String(numberValue(item.quantity)), 143, y + 6, { align: "right" }); doc.text(money(item.rate), 168, y + 6, { align: "right" }); doc.text(money(numberValue(item.quantity) * numberValue(item.rate)), 191, y + 6, { align: "right" }); y += rowHeight;
      }
      if (y > 226) { doc.addPage(); addPageHeader(); y = 50; }
      y += 7;
      const labelX = 150;
      doc.setFontSize(9); doc.setTextColor(...muted); doc.text("Total", labelX, y); doc.setTextColor(...navy); doc.text(`Rs ${money(total)}`, 194, y, { align: "right" }); y += 8;
      doc.setTextColor(...muted); doc.text("Advance", labelX, y); doc.setTextColor(...navy); doc.text(`Rs ${money(data.paid)}`, 194, y, { align: "right" }); y += 4;
      doc.setDrawColor(...red); doc.line(labelX, y, 194, y); y += 8;
      doc.setFont("helvetica", "bold"); doc.setTextColor(...navy); doc.setFontSize(10); doc.text("REMAINING", labelX, y); doc.setTextColor(...red); doc.text(`Rs ${money(balance)}`, 194, y, { align: "right" });
      const noteY = Math.max(y + 18, 246);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text("PLEASE NOTE", margin, noteY);
      doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.text(doc.splitTextToSize(data.notes || "Thank you for choosing Rajana Car Rental.", 105), margin, noteY + 6);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.text("Mian Waqas", 194, noteY, { align: "right" }); doc.setFont("helvetica", "normal"); doc.setTextColor(...muted); doc.text("Authorized signature", 194, noteY + 6, { align: "right" });
      doc.setFillColor(...red); doc.rect(0, 292, pageWidth, 5, "F");
      return { blob: doc.output("blob"), filename: invoiceFilename(data.invoiceNumber) };
  }

  async function downloadPdf() {
    setGenerating(true);
    setStatus("Preparing PDF…");
    try {
      const { blob, filename } = await createPdf();
      downloadBlob(blob, filename);
      setStatus(`PDF downloaded as ${filename}`);
    } catch (error) {
      console.error(error);
      setStatus("The PDF could not be generated. Please try Print / Save as PDF.");
    } finally { setGenerating(false); }
  }

  async function sharePdf() {
    setGenerating(true);
    setStatus("Preparing invoice for WhatsApp…");
    try {
      const { blob, filename } = await createPdf();
      const file = new File([blob], filename, { type: "application/pdf" });
      const tripSummary = [
        data.city ? `City: ${data.city}` : "",
        pickupDateTime || data.pickupLocation ? `Pickup: ${[pickupDateTime, data.pickupLocation].filter(Boolean).join(" - ")}` : "",
        dropoffDateTime || data.dropoffLocation ? `Drop-off: ${[dropoffDateTime, data.dropoffLocation].filter(Boolean).join(" - ")}` : "",
      ].filter(Boolean).join("\n");
      const message = [`Invoice ${data.invoiceNumber} from Rajana Car Rental.`, tripSummary, `Total: Rs ${money(total)}. Advance: Rs ${money(data.paid)}. Remaining: Rs ${money(balance)}.`].filter(Boolean).join("\n");

      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: `Rajana invoice ${data.invoiceNumber}`, text: message, files: [file] });
        setStatus("Invoice shared. Choose WhatsApp from your phone's share menu.");
        return;
      }

      downloadBlob(blob, filename);
      const customerNumber = whatsappNumber(data.customerPhone);
      const text = `${message}\n\nThe PDF ${filename} has been downloaded. Please attach it to this WhatsApp chat.`;
      window.open(`https://wa.me/${customerNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setStatus("PDF downloaded and WhatsApp opened. Attach the downloaded PDF to the chat.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("Sharing cancelled. Your invoice was not sent.");
      } else {
        console.error(error);
        setStatus("The invoice could not be shared. Please download the PDF and attach it in WhatsApp.");
      }
    } finally { setGenerating(false); }
  }

  return (
    <div className="invoice-workspace">
      <section className="invoice-editor no-print" aria-label="Invoice editor">
        <div className="invoice-editor-heading"><div><span>Private business tool</span><h2>Create invoice</h2></div><p>Saved only on this device. Optional details can be left blank.</p></div>

        <div className="invoice-form-section">
          <div className="invoice-section-heading"><h3>Invoice information</h3><p>Reference and issue date</p></div>
          <div className="invoice-fields two-columns">
            <label>Invoice number<input value={data.invoiceNumber} onChange={(e) => setField("invoiceNumber", e.target.value)} /></label>
            <label>Invoice date<input type="date" value={data.date} onChange={(e) => setField("date", e.target.value)} /></label>
          </div>
        </div>

        <div className="invoice-form-section">
          <div className="invoice-section-heading"><h3>Customer details</h3><p>Contact information</p></div>
          <div className="invoice-fields two-columns">
            <label>Customer name<input value={data.customerName} onChange={(e) => setField("customerName", e.target.value)} placeholder="Optional" /></label>
            <label>Customer phone<input inputMode="tel" value={data.customerPhone} onChange={(e) => setField("customerPhone", e.target.value)} placeholder="Optional, e.g. 0300 1234567" /></label>
            <label>Customer email<input type="email" value={data.customerEmail} onChange={(e) => setField("customerEmail", e.target.value)} placeholder="Optional" /></label>
            <label>Customer address<input value={data.customerAddress} onChange={(e) => setField("customerAddress", e.target.value)} placeholder="Optional" /></label>
          </div>
        </div>

        <div className="invoice-form-section">
          <div className="invoice-section-heading"><h3>Trip details</h3><p>All trip fields are optional</p></div>
          <div className="invoice-fields two-columns">
            <label className="field-wide">City<input value={data.city} onChange={(e) => setField("city", e.target.value)} placeholder="Optional, e.g. Lahore" /></label>
            <label className="field-wide">Pickup location<input value={data.pickupLocation} onChange={(e) => setField("pickupLocation", e.target.value)} placeholder="Optional pickup address" /></label>
            <label>Pickup date<input type="date" value={data.pickupDate} onChange={(e) => setField("pickupDate", e.target.value)} /></label>
            <label>Pickup time<input type="time" value={data.pickupTime} onChange={(e) => setField("pickupTime", e.target.value)} /></label>
            <label className="field-wide">Drop-off location<input value={data.dropoffLocation} onChange={(e) => setField("dropoffLocation", e.target.value)} placeholder="Optional drop-off address" /></label>
            <label>Drop-off date<input type="date" value={data.dropoffDate} onChange={(e) => setField("dropoffDate", e.target.value)} /></label>
            <label>Drop-off time<input type="time" value={data.dropoffTime} onChange={(e) => setField("dropoffTime", e.target.value)} /></label>
          </div>
        </div>

        <div className="invoice-form-section invoice-line-editor">
          <div className="invoice-section-heading line-editor-head"><div><h3>Services and charges</h3><p>Add one line for each service</p></div><button type="button" onClick={addItem}>+ Add line</button></div>
          {data.items.map((item, index) => <div className="line-editor-row" key={item.id}><label className="line-description">Description<textarea rows={2} value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder={index === 0 ? "e.g. Honda BR-V — Lahore Airport pickup" : "Trip or service details"} /></label><label>Qty<input type="number" min="0" step="1" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value === "" ? "" : Number(e.target.value))} /></label><label>Rate (Rs)<input type="number" min="0" step="1" value={item.rate} onChange={(e) => updateItem(item.id, "rate", e.target.value === "" ? "" : Number(e.target.value))} /></label><button className="remove-line" type="button" onClick={() => removeItem(item.id)} aria-label={`Remove service ${index + 1}`}>×</button></div>)}
        </div>

        <div className="invoice-form-section">
          <div className="invoice-section-heading"><h3>Payment details</h3><p>Remaining payment is calculated automatically</p></div>
          <div className="invoice-fields two-columns"><label>Advance payment (Rs)<input type="number" min="0" value={data.paid} onChange={(e) => setField("paid", e.target.value === "" ? "" : Number(e.target.value))} placeholder="Optional" /></label><label>Remaining payment (Rs)<input className="calculated-input" value={money(balance)} readOnly aria-readonly="true" /></label><label className="field-wide">Invoice note<input value={data.notes} onChange={(e) => setField("notes", e.target.value)} placeholder="Optional note" /></label></div>
        </div>

        <div className="invoice-actions"><button className="button button-primary" type="button" onClick={downloadPdf} disabled={generating}><FileIcon /> {generating ? "Generating…" : "Download PDF"}</button><button className="button button-whatsapp" type="button" onClick={sharePdf} disabled={generating}><WhatsAppIcon /> Share on WhatsApp</button><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF</button><button className="button button-outline" type="button" onClick={saveDraft}>Save draft</button><button className="button button-text" type="button" onClick={clearDraft}>Clear</button></div>
        <p className="invoice-status" role="status">{status}</p>
      </section>

      <section className="invoice-preview" aria-label="Invoice preview">
        <div className="invoice-paper">
          <div className="invoice-paper-head"><div className="invoice-logo-mark"><Image className="invoice-logo" src={logoPath} alt="Rajana Car Rental" width={559} height={400} priority /></div><h2>INVOICE</h2></div>
          <div className="invoice-business"><p>{site.address}<br />{site.phoneDisplay}<br />{site.email}<br />{site.url}</p></div>
          <div className="invoice-party"><div><small>BILL TO</small><strong>{data.customerName || "Customer name"}</strong><p>{[data.customerPhone, data.customerEmail, data.customerAddress].filter(Boolean).join(" · ") || "Customer contact details"}</p></div><dl><dt>INVOICE NO.</dt><dd>{data.invoiceNumber}</dd><dt>DATE</dt><dd>{data.date}</dd></dl></div>
          {hasTripDetails && <div className="invoice-trip-details"><small>TRIP DETAILS</small><div className="invoice-trip-grid">{data.city && <div className="invoice-trip-city"><span>City</span><strong>{data.city}</strong></div>}{(pickupDateTime || data.pickupLocation) && <div><span>Pickup</span><strong>{pickupDateTime || "Date and time not provided"}</strong><p>{data.pickupLocation || "Location not provided"}</p></div>}{(dropoffDateTime || data.dropoffLocation) && <div><span>Drop-off</span><strong>{dropoffDateTime || "Date and time not provided"}</strong><p>{data.dropoffLocation || "Location not provided"}</p></div>}</div></div>}
          <div className="invoice-table-wrap"><table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>{data.items.map((item) => <tr key={item.id}><td>{item.description || "Service description"}</td><td>{numberValue(item.quantity)}</td><td>{money(item.rate)}</td><td>{money(numberValue(item.quantity) * numberValue(item.rate))}</td></tr>)}</tbody></table></div>
          <div className="invoice-summary"><dl><dt>Total</dt><dd>Rs {money(total)}</dd><dt>Advance</dt><dd>Rs {money(data.paid)}</dd><dt className="balance-label">Remaining</dt><dd className="balance-value">Rs {money(balance)}</dd></dl></div>
          <div className="invoice-paper-foot"><div><small>PLEASE NOTE</small><p>{data.notes || "Thank you for choosing Rajana Car Rental."}</p></div><div className="signature"><strong>Mian Waqas</strong><span>Authorized signature</span></div></div>
        </div>
      </section>
    </div>
  );
}
