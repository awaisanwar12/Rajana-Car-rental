export const serviceAreas = [
  "DHA",
  "Gulberg",
  "Johar Town",
  "Model Town",
  "Lahore Cantt",
  "Bahria Town",
  "Wapda Town",
  "Garden Town",
  "Faisal Town",
] as const;

export const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/GetCarLahore" },
  { name: "Instagram", url: "https://www.instagram.com/getcarlahore/" },
  { name: "TikTok", url: "https://www.tiktok.com/@getcarlahore" },
  { name: "Threads", url: "https://www.threads.com/@getcarlahore" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/getcar-lahore-a619a729b/" },
] as const;

export const site = {
  name: "Get Car",
  shortName: "Get Car",
  url: "https://getcarlahore.com",
  mapsUrl: "https://maps.app.goo.gl/LthigekKvtWpafvS9?g_st=awb",
  phoneDisplay: "+92 303 6565672",
  phoneHref: "+923036565672",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "923036565672",
  address: "Street 145, H Block, Sector H, DHA Phase 1, Lahore, Pakistan",
  shortAddress: "Street 145, H Block, DHA Phase 1, Lahore",
  latitude: 31.4824528,
  longitude: 74.3943188,
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.55!2d74.3943188!3d31.4824528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392319bedce10537%3A0xffc6b2fb1f87e8ac!2sGetCar%20-%20Rent%20A%20Car%20Lahore!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk",
  googleRating: 4.8,
  googleReviewCount: 190,
  serviceAreas,
  socialLinks,
};

export const paymentDetails = {
  accountTitle: "MUHAMMAD WAQAS ANWAR",
  bankName: "Faisal Bank",
  bankAccountNumber: "3233301000008602",
  jazzCashNumber: "03036565672",
};

export const fleet = [
  {
    id: "honda-civic-rs",
    name: "Honda Civic RS",
    category: "Executive sedan",
    seats: "4 passengers",
    price: 10000,
    priceLabel: "From Rs 10,000/day",
    image: "/images/honda-civic-rs.jpg",
    alt: "Black Honda Civic RS available for rent in Lahore",
  },
  {
    id: "toyota-corolla-altis-x",
    name: "Toyota Corolla Altis X",
    category: "Comfort sedan",
    seats: "4 passengers",
    price: 7000,
    priceLabel: "From Rs 7,000/day",
    image: "/images/toyota-altis.webp",
    alt: "Toyota Corolla Altis X chauffeur car rental Lahore",
  },
  {
    id: "toyota-yaris-corolla-gli",
    name: "Toyota Yaris / Corolla GLi",
    category: "Economy sedan",
    seats: "4 passengers",
    price: 6000,
    priceLabel: "From Rs 6,000/day",
    image: "/images/toyota-yaris.png",
    alt: "Toyota Yaris economy rental car in Lahore",
  },
  {
    id: "jaecoo-j5-2026",
    name: "Jaecoo J5 2026",
    category: "Modern SUV",
    seats: "5 passengers",
    price: 12000,
    priceLabel: "From Rs 12,000/day",
    image: "/images/jaecoo-j5.jpeg",
    alt: "Jaecoo J5 2026 SUV for rent with driver in Lahore",
  },
  {
    id: "honda-br-v",
    name: "Honda BR-V",
    category: "Family 7-seater",
    seats: "6 passengers",
    price: 7000,
    priceLabel: "From Rs 7,000/day",
    image: "/images/honda-brv.png",
    alt: "White Honda BR-V seven seater rental in Lahore",
  },
  {
    id: "toyota-fortuner-prado",
    name: "Toyota Fortuner / Prado",
    category: "Premium SUV",
    seats: "6 passengers",
    price: 16000,
    priceLabel: "From Rs 16,000/day",
    image: "/images/toyota-fortuner.jpg",
    alt: "Toyota Fortuner premium SUV car rental Lahore",
  },
  {
    id: "grand-cabin",
    name: "Grand Cabin / Coaster",
    category: "Group van",
    seats: "13 to 29 passengers",
    price: 15000,
    priceLabel: "From Rs 15,000/day",
    image: "/images/grand-cabin.jpg",
    alt: "Toyota Grand Cabin and Coaster for group travel from Lahore",
    rateNote: "Grand Cabin from Rs 15,000/day · Coaster (Out of city) Rs 25,000/day",
    terms: "Without fuel, tolls, parking, driver food and accommodation. Traffic challans customer responsibility if vehicle goes to Northern Area.",
  },
  {
    id: "land-cruiser-v8",
    name: "Land Cruiser V8",
    category: "Luxury SUV",
    seats: "6 passengers",
    price: 25000,
    priceLabel: "From Rs 25,000/day",
    image: "/images/land-cruiser.jpeg",
    alt: "Land Cruiser V8 luxury chauffeur rental Lahore",
  },
  {
    id: "suzuki-wagon-r-cultus",
    name: "Suzuki Wagon R / Cultus",
    category: "Economy car",
    seats: "4 passengers",
    price: 5000,
    priceLabel: "From Rs 5,000/day",
    image: "/images/suzuki-wagon-r.webp",
    alt: "Suzuki Wagon R and Cultus rental with driver in Lahore",
    rateNote: "Local: Rs 5,000/day · Out of city: Rs 6,000/day",
    terms: "Without fuel, tolls, parking, driver food and accommodation",
  },
] as const;

export type FleetVehicle = (typeof fleet)[number];
export const lahoreIslamabadRouteRateKey = "lahore-to-islamabad";
export const defaultLahoreIslamabadRouteRate = 25000;
export const coasterOutstationRateKey = "toyota-coaster";
export const defaultCoasterOutstationRate = 25000;
export const wagonROutstationRateKey = "suzuki-wagon-r-cultus-outstation";
export const defaultWagonROutstationRate = 6000;
export type PublishedRateKey =
  | FleetVehicle["id"]
  | typeof lahoreIslamabadRouteRateKey
  | typeof coasterOutstationRateKey
  | typeof wagonROutstationRateKey;
export type VehicleRateMap = Partial<Record<PublishedRateKey, number>>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function formatPkr(price: number) {
  return new Intl.NumberFormat("en-PK").format(price);
}

export function rateLabel(price: number) {
  return `From Rs ${formatPkr(price)}/day`;
}

export function withLiveRates<T extends readonly FleetVehicle[]>(vehicles: T, rates: VehicleRateMap) {
  const coasterRate = rates[coasterOutstationRateKey] ?? defaultCoasterOutstationRate;
  const wagonROutstationRate = rates[wagonROutstationRateKey] ?? defaultWagonROutstationRate;
  return vehicles.map((vehicle) => {
    const price = rates[vehicle.id] ?? vehicle.price;
    const rateNote =
      vehicle.id === "grand-cabin"
        ? `Grand Cabin from Rs ${formatPkr(price)}/day · Coaster (Out of city) Rs ${formatPkr(coasterRate)}/day`
        : vehicle.id === "suzuki-wagon-r-cultus"
          ? `Local: Rs ${formatPkr(price)}/day · Out of city: Rs ${formatPkr(wagonROutstationRate)}/day`
          : undefined;
    return { ...vehicle, price, priceLabel: rateLabel(price), ...(rateNote ? { rateNote } : {}) };
  });
}

export function trackEvent(event: string, params: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
