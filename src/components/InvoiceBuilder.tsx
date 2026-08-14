"use client";

import { useEffect, useMemo, useState } from "react";
import { FileIcon } from "./Icons";
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
  notes: string;
  paid: NumericInput;
  items: LineItem[];
};

const today = () => new Date().toISOString().slice(0, 10);
const emptyInvoice = (): InvoiceData => ({
  invoiceNumber: `INV-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}`,
  date: today(), customerName: "", customerPhone: "", customerEmail: "", customerAddress: "",
  notes: "Thank you for choosing Rajana Car Rental.", paid: "",
  items: [{ id: Date.now(), description: "", quantity: 1, rate: "" }],
});

const numberValue = (value: NumericInput) => value === "" ? 0 : value;
const money = (value: NumericInput) => new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(numberValue(value));

export function InvoiceBuilder() {
  const [data, setData] = useState<InvoiceData>(emptyInvoice);
  const [status, setStatus] = useState("Drafts stay on this device only.");
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("rajana-invoice-draft");
    if (!saved) return;
    const timer = window.setTimeout(() => {
      try { setData(JSON.parse(saved) as InvoiceData); setStatus("Saved draft restored from this device."); } catch { /* Ignore invalid storage */ }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const total = useMemo(() => data.items.reduce((sum, item) => sum + numberValue(item.quantity) * numberValue(item.rate), 0), [data.items]);
  const balance = Math.max(total - numberValue(data.paid), 0);

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

  async function downloadPdf() {
    setGenerating(true);
    setStatus("Preparing PDF…");
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });
      const navy = [11, 34, 53] as const;
      const red = [184, 41, 49] as const;
      const muted = [91, 105, 116] as const;
      const pageWidth = 210;
      const margin = 16;
      const addPageHeader = () => {
        doc.setFillColor(...navy); doc.rect(0, 0, pageWidth, 31, "F");
        doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text("RAJANA", margin, 13);
        doc.setFontSize(8); doc.setCharSpace(1.7); doc.text("CAR RENTAL", margin, 20); doc.setCharSpace(0);
        doc.setFontSize(22); doc.text("INVOICE", 194, 18, { align: "right" });
      };
      addPageHeader();
      doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      doc.text([site.address, site.phoneDisplay, site.email, site.url], margin, 39);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.text("BILL TO", margin, 60);
      doc.setFontSize(12); doc.text(data.customerName || "Customer", margin, 68);
      doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
      const customer = [data.customerPhone, data.customerEmail, data.customerAddress].filter(Boolean);
      if (customer.length) doc.text(customer, margin, 74);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(9);
      doc.text("INVOICE NO.", 142, 60); doc.text("DATE", 142, 70);
      doc.setFont("helvetica", "normal"); doc.text(data.invoiceNumber, 194, 60, { align: "right" }); doc.text(data.date, 194, 70, { align: "right" });
      let y = 88;
      const tableHead = () => {
        doc.setFillColor(...navy); doc.rect(margin, y, 178, 9, "F");
        doc.setTextColor(255, 255, 255); doc.setFont("helvetica", "bold"); doc.setFontSize(8);
        doc.text("DESCRIPTION", margin + 3, y + 6); doc.text("QTY", 143, y + 6, { align: "right" }); doc.text("RATE", 168, y + 6, { align: "right" }); doc.text("AMOUNT", 191, y + 6, { align: "right" }); y += 9;
      };
      tableHead();
      for (const item of data.items) {
        const lines = doc.splitTextToSize(item.description || "Service", 102) as string[];
        const rowHeight = Math.max(12, lines.length * 4.5 + 5);
        if (y + rowHeight > 250) { doc.addPage(); addPageHeader(); y = 42; tableHead(); }
        doc.setDrawColor(220, 224, 227); doc.rect(margin, y, 178, rowHeight);
        doc.setTextColor(...navy); doc.setFont("helvetica", "normal"); doc.setFontSize(8.5);
        doc.text(lines, margin + 3, y + 6); doc.text(String(numberValue(item.quantity)), 143, y + 6, { align: "right" }); doc.text(money(item.rate), 168, y + 6, { align: "right" }); doc.text(money(numberValue(item.quantity) * numberValue(item.rate)), 191, y + 6, { align: "right" }); y += rowHeight;
      }
      if (y > 226) { doc.addPage(); addPageHeader(); y = 45; }
      y += 7;
      const labelX = 150;
      doc.setFontSize(9); doc.setTextColor(...muted); doc.text("Total", labelX, y); doc.setTextColor(...navy); doc.text(`Rs ${money(total)}`, 194, y, { align: "right" }); y += 8;
      doc.setTextColor(...muted); doc.text("Paid", labelX, y); doc.setTextColor(...navy); doc.text(`Rs ${money(data.paid)}`, 194, y, { align: "right" }); y += 4;
      doc.setDrawColor(...red); doc.line(labelX, y, 194, y); y += 8;
      doc.setFont("helvetica", "bold"); doc.setTextColor(...navy); doc.setFontSize(11); doc.text("BALANCE", labelX, y); doc.setTextColor(...red); doc.text(`Rs ${money(balance)}`, 194, y, { align: "right" });
      const noteY = Math.max(y + 18, 246);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.text("PLEASE NOTE", margin, noteY);
      doc.setTextColor(...muted); doc.setFont("helvetica", "normal"); doc.text(doc.splitTextToSize(data.notes || "Thank you for choosing Rajana Car Rental.", 105), margin, noteY + 6);
      doc.setTextColor(...navy); doc.setFont("helvetica", "bold"); doc.text("Mian Waqas", 194, noteY, { align: "right" }); doc.setFont("helvetica", "normal"); doc.setTextColor(...muted); doc.text("Authorized signature", 194, noteY + 6, { align: "right" });
      doc.setFillColor(...red); doc.rect(0, 292, pageWidth, 5, "F");
      const filename = `${data.invoiceNumber || "Rajana-Invoice"}.pdf`.replace(/[^a-z0-9-_\.]/gi, "-");
      doc.save(filename);
      setStatus(`PDF downloaded as ${filename}`);
    } catch {
      setStatus("The PDF could not be generated. Please try Print / Save as PDF.");
    } finally { setGenerating(false); }
  }

  return (
    <div className="invoice-workspace">
      <section className="invoice-editor no-print" aria-label="Invoice editor">
        <div className="invoice-editor-heading"><div><span>Private browser tool</span><h2>Invoice details</h2></div><p>Nothing is uploaded or sent to a server.</p></div>
        <div className="invoice-fields two-columns">
          <label>Invoice number<input value={data.invoiceNumber} onChange={(e) => setField("invoiceNumber", e.target.value)} /></label>
          <label>Invoice date<input type="date" value={data.date} onChange={(e) => setField("date", e.target.value)} /></label>
          <label>Customer name<input value={data.customerName} onChange={(e) => setField("customerName", e.target.value)} placeholder="Customer name" /></label>
          <label>Customer phone<input value={data.customerPhone} onChange={(e) => setField("customerPhone", e.target.value)} placeholder="+92…" /></label>
          <label>Customer email<input type="email" value={data.customerEmail} onChange={(e) => setField("customerEmail", e.target.value)} placeholder="Optional" /></label>
          <label>Customer address<input value={data.customerAddress} onChange={(e) => setField("customerAddress", e.target.value)} placeholder="Optional" /></label>
        </div>
        <div className="invoice-line-editor">
          <div className="line-editor-head"><h3>Services</h3><button type="button" onClick={addItem}>+ Add line</button></div>
          {data.items.map((item, index) => <div className="line-editor-row" key={item.id}><label className="line-description">Description<textarea rows={2} value={item.description} onChange={(e) => updateItem(item.id, "description", e.target.value)} placeholder={index === 0 ? "e.g. Honda BR-V — Lahore Airport pickup" : "Trip or service details"} /></label><label>Qty<input type="number" min="0" step="1" value={item.quantity} onChange={(e) => updateItem(item.id, "quantity", e.target.value === "" ? "" : Number(e.target.value))} /></label><label>Rate (Rs)<input type="number" min="0" step="1" value={item.rate} onChange={(e) => updateItem(item.id, "rate", e.target.value === "" ? "" : Number(e.target.value))} /></label><button className="remove-line" type="button" onClick={() => removeItem(item.id)} aria-label={`Remove service ${index + 1}`}>×</button></div>)}
        </div>
        <div className="invoice-fields two-columns"><label>Paid amount (Rs)<input type="number" min="0" value={data.paid} onChange={(e) => setField("paid", e.target.value === "" ? "" : Number(e.target.value))} /></label><label>Note<input value={data.notes} onChange={(e) => setField("notes", e.target.value)} /></label></div>
        <div className="invoice-actions"><button className="button button-primary" type="button" onClick={downloadPdf} disabled={generating}><FileIcon /> {generating ? "Generating…" : "Download PDF"}</button><button className="button button-dark" type="button" onClick={() => window.print()}>Print / Save as PDF</button><button className="button button-outline" type="button" onClick={saveDraft}>Save draft</button><button className="button button-text" type="button" onClick={clearDraft}>Clear</button></div>
        <p className="invoice-status" role="status">{status}</p>
      </section>

      <section className="invoice-preview" aria-label="Invoice preview">
        <div className="invoice-paper">
          <div className="invoice-paper-head"><div><strong>RAJANA</strong><span>CAR RENTAL</span></div><h2>INVOICE</h2></div>
          <div className="invoice-business"><p>{site.address}<br />{site.phoneDisplay}<br />{site.email}<br />{site.url}</p></div>
          <div className="invoice-party"><div><small>BILL TO</small><strong>{data.customerName || "Customer name"}</strong><p>{[data.customerPhone, data.customerEmail, data.customerAddress].filter(Boolean).join(" · ") || "Customer contact details"}</p></div><dl><dt>INVOICE NO.</dt><dd>{data.invoiceNumber}</dd><dt>DATE</dt><dd>{data.date}</dd></dl></div>
          <div className="invoice-table-wrap"><table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>{data.items.map((item) => <tr key={item.id}><td>{item.description || "Service description"}</td><td>{numberValue(item.quantity)}</td><td>{money(item.rate)}</td><td>{money(numberValue(item.quantity) * numberValue(item.rate))}</td></tr>)}</tbody></table></div>
          <div className="invoice-summary"><dl><dt>Total</dt><dd>Rs {money(total)}</dd><dt>Paid</dt><dd>Rs {money(data.paid)}</dd><dt className="balance-label">Balance</dt><dd className="balance-value">Rs {money(balance)}</dd></dl></div>
          <div className="invoice-paper-foot"><div><small>PLEASE NOTE</small><p>{data.notes || "Thank you for choosing Rajana Car Rental."}</p></div><div className="signature"><strong>Mian Waqas</strong><span>Authorized signature</span></div></div>
        </div>
      </section>
    </div>
  );
}
