const DEFAULT_EUR_TO_USD = 1.08;
function getEurToUsd() {
  if (typeof process !== "undefined" && process.env?.EXCHANGE_RATE_EUR_USD) {
    const n = parseFloat(process.env.EXCHANGE_RATE_EUR_USD, 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return DEFAULT_EUR_TO_USD;
}

function parseDuration(duration) {
  if (!duration || typeof duration !== "string") return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  return hours * 60 + minutes;
}

function getAirlineName(code, carriers) {
  return (carriers && carriers[code]) || code || "UNKNOWN";
}

export function adaptAmadeusResponse(response) {
  if (!response || !response.data || !Array.isArray(response.data)) {
    return [];
  }

  const carriers = response.dictionaries?.carriers || {};

  return response.data
    .map((offer, index) => {
      const itinerary = offer.itineraries?.[0];
      if (!itinerary) return null;

      const segments = itinerary.segments || [];
      if (segments.length === 0) return null;

      const stops = Math.max(0, segments.length - 1);
      const firstSegment = segments[0];
      const lastSegment = segments[segments.length - 1];
      const departureTime = new Date(firstSegment.departure?.at || 0).getTime();
      const arrivalTime = new Date(lastSegment.arrival?.at || 0).getTime();
      const carrierCode = firstSegment.carrierCode || "UNKNOWN";

      let priceAmount = parseFloat(offer.price?.total) || 0;
      const rawCurrency = (offer.price?.currency || "USD").toUpperCase();
      if (rawCurrency === "EUR") {
        priceAmount = priceAmount * getEurToUsd();
      }
      const currency = "USD";

      const durationMinutes =
        parseDuration(itinerary.duration) ||
        Math.round((arrivalTime - departureTime) / (1000 * 60));

      return {
        id: offer.id ?? `flight-${index}`,
        airline: {
          code: carrierCode,
          name: getAirlineName(carrierCode, carriers),
        },
        price: { amount: priceAmount, currency },
        stops,
        durationMinutes,
        departure: {
          airport: firstSegment.departure?.iataCode || "UNKNOWN",
          timestamp: departureTime,
        },
        arrival: {
          airport: lastSegment.arrival?.iataCode || "UNKNOWN",
          timestamp: arrivalTime,
        },
      };
    })
    .filter((f) => f !== null);
}
