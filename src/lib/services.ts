export type ServicePage = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  introduction: string;
  image: string;
  imageAlt: string;
  imageNote: string;
  serviceType: string;
  highlights: readonly string[];
  planningTitle: string;
  planningCopy: readonly string[];
  bookingPoints: readonly string[];
  whatsAppMessage: string;
  faqs: readonly (readonly [string, string])[];
};

export const services = [
  {
    slug: "car-rental-with-driver-lahore",
    title: "Car Rental with Driver in Lahore",
    description: "Book a chauffeur-driven rental car in Lahore for city travel, family journeys, business appointments and intercity trips. Get an exact quote on WhatsApp.",
    eyebrow: "Chauffeur-driven travel in Lahore",
    heading: "A Lahore car rental with a driver, ready for your day.",
    introduction: "Rajana provides chauffeur-driven vehicles for people who want a comfortable, practical way to travel in Lahore. Choose the car that fits your passengers and luggage, then share your route and timing so the team can confirm availability and the final trip quote.",
    image: "/images/honda-civic-rs.jpg",
    imageAlt: "Honda Civic RS chauffeur-driven rental car in Lahore",
    imageNote: "Professional driver included",
    serviceType: "Chauffeur service",
    highlights: ["City and intercity travel", "Economy cars, SUVs and group vans", "Direct WhatsApp booking", "Exact price confirmed before travel"],
    planningTitle: "What to share when booking a driver-led car",
    planningCopy: ["Send your pickup point, destination, date, pickup time, passenger count and luggage details. This helps Rajana recommend the right sedan, SUV or van instead of giving a generic estimate.", "If the trip includes multiple stops, waiting time or a return journey, mention that in the first message. The final quote can then cover the complete requirement before the booking is confirmed."],
    bookingPoints: ["Your pickup location and destination", "Travel date and pickup time", "Passenger and luggage count", "Preferred car or request for a recommendation"],
    whatsAppMessage: "Hello Rajana Car Rental, I need a car with driver in Lahore. My route is: ",
    faqs: [
      ["Does every Rajana rental include a driver?", "Yes. Rajana offers chauffeur-driven car rental so the driver and vehicle are arranged together for the confirmed trip."],
      ["Which car should I choose?", "Share your passenger count, luggage and route. Rajana can recommend an economy sedan, family vehicle, SUV or group van based on the trip."],
      ["How is the final price confirmed?", "The final quote is confirmed directly on WhatsApp after the route, timing, vehicle availability and trip requirements are clear."],
    ],
  },
  {
    slug: "lahore-airport-car-rental",
    title: "Lahore Airport Car Rental & Transfer",
    description: "Pre-book a chauffeur-driven Lahore airport transfer for pickup or drop-off at Allama Iqbal International Airport. Share your flight timing for a confirmed WhatsApp quote.",
    eyebrow: "Allama Iqbal International Airport",
    heading: "Pre-book your Lahore airport pickup or drop-off.",
    introduction: "For airport travel, timing and luggage matter. Rajana arranges a chauffeur-driven vehicle for travel to or from Allama Iqbal International Airport after confirming your pickup point, flight timing, passengers and luggage on WhatsApp.",
    image: "/images/toyota-fortuner.jpg",
    imageAlt: "Toyota Fortuner available for chauffeur-driven Lahore airport transfer",
    imageNote: "Airport pickup and drop-off",
    serviceType: "Airport transfer",
    highlights: ["Airport pickup and drop-off", "Space planned for passengers and luggage", "Early and late travel requests", "Vehicle confirmed before the journey"],
    planningTitle: "Details that make airport booking smoother",
    planningCopy: ["For an airport pickup, send the flight number or arrival time, the terminal if known, and the number of passengers with luggage. For an airport drop-off, share your pickup address and the time you need to arrive at the airport.", "Rajana confirms the vehicle and final price in writing before the journey. This keeps the booking clear for both the traveller and the driver."],
    bookingPoints: ["Airport pickup or airport drop-off", "Flight number or required airport arrival time", "Pickup address", "Passengers and luggage"],
    whatsAppMessage: "Hello Rajana Car Rental, I need a Lahore Airport transfer. My flight/travel timing is: ",
    faqs: [
      ["Can I book an airport pickup in advance?", "Yes. Advance booking is recommended so Rajana can confirm the appropriate vehicle and driver for your flight timing."],
      ["What should I send for an airport pickup?", "Send the flight timing or flight number, passenger count, luggage details and the destination after leaving the airport."],
      ["Can you arrange a larger vehicle for luggage or a group?", "Yes. Tell Rajana how many people and bags are travelling so a suitable vehicle can be confirmed."],
    ],
  },
  {
    slug: "lahore-to-islamabad-car-rental",
    title: "Lahore to Islamabad Car Rental with Driver",
    description: "Book a Lahore to Islamabad chauffeur-driven car for a direct one-way or return intercity journey. Starting from Rs 25,000; request your final quote on WhatsApp.",
    eyebrow: "Lahore to Islamabad intercity travel",
    heading: "Travel from Lahore to Islamabad in one confirmed car.",
    introduction: "A direct intercity booking means your driver, vehicle and journey details are settled before you leave Lahore. Rajana offers Lahore to Islamabad chauffeur-driven travel for families, business travellers and people who need a practical one-way drop or return journey.",
    image: "/images/toyota-altis.webp",
    imageAlt: "Toyota Corolla Altis for Lahore to Islamabad car rental with driver",
    imageNote: "Starting from Rs 25,000*",
    serviceType: "Intercity car rental",
    highlights: ["Direct Lahore to Islamabad travel", "One-way or return journey", "Cars for family and business travel", "Final terms confirmed before booking"],
    planningTitle: "Plan an intercity trip before the car is confirmed",
    planningCopy: ["Send the exact Lahore pickup point, Islamabad destination, travel date, preferred departure time and passenger count. For a return journey, include the return date, departure time and any expected waiting time.", "The advertised starting rate is Rs 25,000. Fuel, tolls, taxes, waiting time, vehicle choice and final route requirements must be confirmed in the final written quote."],
    bookingPoints: ["Lahore pickup and Islamabad destination", "One-way or return journey", "Departure and return timing", "Passengers, luggage and preferred car"],
    whatsAppMessage: "Hello Rajana Car Rental, I need a Lahore to Islamabad car with driver. My travel date and route are: ",
    faqs: [
      ["What is the Lahore to Islamabad starting rate?", "The current advertised starting rate is Rs 25,000. Confirm the complete final quote, including any route-specific terms, before booking."],
      ["Can I arrange a one-way Lahore to Islamabad drop?", "Yes. Tell Rajana that the booking is one-way and share the exact destination and travel date."],
      ["Can I request a return journey?", "Yes. Include your planned return date, time and waiting requirements so the correct vehicle and full quote can be confirmed."],
    ],
  },
  {
    slug: "wedding-car-rental-lahore",
    title: "Wedding Car Rental in Lahore",
    description: "Arrange chauffeur-driven wedding cars in Lahore for couple transport, family travel and guest movement. Share your event schedule for a clear WhatsApp quote.",
    eyebrow: "Wedding transport in Lahore",
    heading: "Wedding transport that follows your event schedule.",
    introduction: "Wedding-day transport needs clear timing, suitable cars and reliable coordination. Rajana can arrange chauffeur-driven sedans, SUVs and larger vehicles for couple transport, family journeys and guest movement after confirming your event plan directly on WhatsApp.",
    image: "/images/land-cruiser.jpeg",
    imageAlt: "Land Cruiser V8 available for wedding car rental in Lahore",
    imageNote: "Cars for wedding-day travel",
    serviceType: "Wedding transport",
    highlights: ["Couple, family and guest transport", "Sedans, SUVs and group vehicles", "Timing and pickup plan confirmed first", "Direct contact with the booking team"],
    planningTitle: "What to include in a wedding car request",
    planningCopy: ["Share the event date, pickup areas, venue, start and finish times, number of people travelling and whether one car or multiple vehicles are needed. This allows Rajana to check the right vehicle options and availability.", "If there are separate pickup points, venue changes or waiting periods, list them in the first WhatsApp message. The written confirmation should include the agreed vehicle, driver plan and pricing terms."],
    bookingPoints: ["Event date and venue", "Pickup locations and required times", "Number of passengers or vehicles", "Vehicle preference and waiting requirements"],
    whatsAppMessage: "Hello Rajana Car Rental, I need wedding transport in Lahore. My event date and requirements are: ",
    faqs: [
      ["Can I book cars for wedding guests as well as the couple?", "Yes. Share the number of guests, pickup areas and event timing so Rajana can advise on suitable cars or larger vehicles."],
      ["How early should I book wedding transport?", "Book as early as practical, especially for weekends and busy wedding dates, so the preferred vehicle can be confirmed."],
      ["Can the booking include more than one pickup point?", "Yes. Include every pickup point and timing in the request so the journey plan and final quote are accurate."],
    ],
  },
  {
    slug: "corporate-car-rental-lahore",
    title: "Corporate Car Rental in Lahore",
    description: "Chauffeur-driven corporate car rental in Lahore for client pickups, office travel, meetings, airport transfers and business trips. Request a clear quote on WhatsApp.",
    eyebrow: "Business travel in Lahore",
    heading: "Professional cars for Lahore business travel.",
    introduction: "Rajana provides chauffeur-driven vehicles for business meetings, client pickups, office travel, airport transfers and intercity business journeys. Share the travel schedule and passenger requirements to receive a practical vehicle recommendation and confirmed quote.",
    image: "/images/jaecoo-j5.jpeg",
    imageAlt: "Jaecoo J5 chauffeur-driven corporate car rental in Lahore",
    imageNote: "Client and team travel",
    serviceType: "Corporate transportation",
    highlights: ["Client pickup and office travel", "Airport and intercity business journeys", "Executive sedans and SUVs", "Clear route and timing confirmation"],
    planningTitle: "Make a corporate booking easy to coordinate",
    planningCopy: ["Send the company contact name, trip date, pickup point, destinations, passenger count and required times. For a multi-stop day, include each stop in order and any expected waiting time.", "Rajana confirms the available vehicle, driver plan and final price directly before the booking. For recurring travel, use the same WhatsApp contact so the team has a clear written record of each trip."],
    bookingPoints: ["Company contact and traveller details", "Pickup, destinations and schedule", "Number of passengers and luggage", "One-time, multi-stop or intercity requirement"],
    whatsAppMessage: "Hello Rajana Car Rental, I need a corporate car in Lahore. My travel schedule is: ",
    faqs: [
      ["Can Rajana arrange a car for a client pickup?", "Yes. Share the client pickup point, destination, date and time so the suitable chauffeur-driven vehicle can be confirmed."],
      ["Can a corporate booking include several stops?", "Yes. List each planned stop and the approximate schedule so Rajana can quote accurately."],
      ["Do you provide cars for intercity business travel?", "Yes. Share the route, return requirements, passenger count and timing to receive a final quote."],
    ],
  },
] as const satisfies readonly ServicePage[];

export const serviceBySlug = new Map<string, ServicePage>(services.map((service) => [service.slug, service]));
