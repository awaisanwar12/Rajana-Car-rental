export const site = {
  name: "Rajana Car Rental",
  shortName: "Rajana",
  url: "https://rajanacarrental.com",
  phoneDisplay: "+92 303 6565672",
  phoneHref: "+923036565672",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "923036565672",
  email: "booknow@rajanacarrental.com",
  address: "123 H Block Market, DHA Phase 1, Lahore, Pakistan",
  shortAddress: "H Block Market, DHA Phase 1, Lahore",
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
    name: "Grand Cabin",
    category: "Group van",
    seats: "13+ passengers",
    price: 15000,
    priceLabel: "From Rs 15,000/day",
    image: "/images/grand-cabin.jpg",
    alt: "Grand Cabin van for group travel from Lahore",
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
] as const;

export type FleetVehicle = (typeof fleet)[number];
export const lahoreIslamabadRouteRateKey = "lahore-to-islamabad";
export const defaultLahoreIslamabadRouteRate = 25000;
export type PublishedRateKey = FleetVehicle["id"] | typeof lahoreIslamabadRouteRateKey;
export type VehicleRateMap = Partial<Record<PublishedRateKey, number>>;

export function rateLabel(price: number) {
  return `From Rs ${new Intl.NumberFormat("en-PK").format(price)}/day`;
}

export function withLiveRates<T extends readonly FleetVehicle[]>(vehicles: T, rates: VehicleRateMap) {
  return vehicles.map((vehicle) => {
    const price = rates[vehicle.id] ?? vehicle.price;
    return { ...vehicle, price, priceLabel: rateLabel(price) };
  });
}

export const whatsappUrl = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
