window.TRIP_DATA = {
  project: {
    name: "Scotland Family Road Trip",
    startDate: "2026-08-01",
    endDate: "2026-08-06",
    durationDays: 6,
    families: 5,
    adults: 10,
    children: 3,
    totalPeople: 13
  },
  routeOverview: [
    { name: "Each family’s home postcode", detail: "Private route to the first meeting point.", badge: "Personal" },
    { name: "Moto Knutsford M6 Northbound", detail: "Official meeting point for all five families.", badge: "Meet" },
    { name: "Moto Southwaite Northbound", detail: "Regroup, fuel, food and toilets.", badge: "Regroup" },
    { name: "Dalkeith and Edinburgh", detail: "Royal Mile, Victoria Street and Dean Village.", badge: "Day 1" },
    { name: "Edinburgh → Kelpies → Steall Waterfall → Glencoe", detail: "Check in to the Glencoe accommodation.", badge: "Day 2" },
    { name: "Eilean Donan → Old Man of Storr → Portree → Kilt Rock", detail: "Isle of Skye day trip, returning to Glencoe.", badge: "Day 3" },
    { name: "Glenfinnan → Sligachan → Fairy Pools → Stirling", detail: "Check in at Causewayhead Road.", badge: "Day 4" },
    { name: "Stirling Castle → Stirling Distillery → Falkirk Wheel → Silver Sands", detail: "Central Scotland sightseeing day.", badge: "Day 5" },
    { name: "Stirling → Tebay Services", detail: "Final shared group stop and goodbye point.", badge: "Day 6" },
    { name: "Tebay Services → each family’s home postcode", detail: "Families continue independently.", badge: "Personal" }
  ],
  accommodation: [
    { nights: "Night 1", location: "Dalkeith", address: "25–27 High Street, Dalkeith, EH22 1LB", host: "", checkIn: "To confirm", checkOut: "To confirm" },
    { nights: "Nights 2–3", location: "Glencoe", address: "Address to confirm", host: "Paul", checkIn: "2 August, 16:00", checkOut: "4 August, 10:00" },
    { nights: "Nights 4–5", location: "Stirling", address: "40 Causewayhead Road, Stirling, FK9 area", host: "Dee", checkIn: "4 August, 16:00", checkOut: "6 August, 10:00" }
  ],
  itinerary: [
    { day: "Day 1 · Saturday 1 August", title: "Meet and Edinburgh", stops: ["Personal route", "Moto Knutsford", "Moto Southwaite", "Dalkeith check-in", "Royal Mile", "Victoria Street", "Dean Village"] },
    { day: "Day 2 · Sunday 2 August", title: "Edinburgh to Glencoe", stops: ["Edinburgh Castle", "Scott Monument", "The Kelpies", "Steall Waterfall", "Glencoe check-in"] },
    { day: "Day 3 · Monday 3 August", title: "Isle of Skye", stops: ["Eilean Donan Castle", "Old Man of Storr", "Portree", "Kilt Rock", "Return to Glencoe"] },
    { day: "Day 4 · Tuesday 4 August", title: "Glencoe to Stirling", stops: ["Check out 10:00", "Glenfinnan Viaduct", "Sligachan Old Bridge", "Fairy Pools", "Stirling check-in"] },
    { day: "Day 5 · Wednesday 5 August", title: "Stirling and Falkirk", stops: ["Stirling Castle", "Stirling Distillery", "Falkirk Wheel", "Silver Sands Beach", "Pack for departure"] },
    { day: "Day 6 · Thursday 6 August", title: "Return journey", stops: ["Check out 10:00", "Scenic southbound route", "Tebay Services", "Personal route home"] }
  ],
  checklist: [
    "Driving licences",
    "Accommodation confirmations",
    "Attraction tickets",
    "Phone chargers",
    "Power banks",
    "Children’s essentials",
    "Snacks and water",
    "Medication",
    "Warm clothing",
    "Waterproof clothing",
    "Check every room before checkout",
    "Final headcount: 13 travellers"
  ]
};
