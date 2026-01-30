/**
 * Flight domain model and helpers.
 * Flight shape: { id, airline: { code, name }, price: { amount, currency }, stops, durationMinutes, departure: { airport, timestamp }, arrival: { airport, timestamp } }
 */

/**
 * Format price for display (e.g. "$299")
 * @param {{ amount: number, currency: string }} price
 * @returns {string}
 */
export function formatPrice(price) {
  if (!price || typeof price.amount !== "number") return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency || "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(price.amount);
}

/**
 * Format duration in minutes (e.g. "3h 30m")
 * @param {number} minutes
 * @returns {string}
 */
export function formatDuration(minutes) {
  if (typeof minutes !== "number" || minutes < 0) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

/**
 * Format timestamp as locale time (12h)
 * @param {number} timestamp - Unix ms
 * @returns {string}
 */
export function formatTime(timestamp) {
  if (typeof timestamp !== "number") return "";
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

/**
 * Format timestamp as short date (e.g. "Wed, Jan 15")
 * @param {number} timestamp - Unix ms
 * @returns {string}
 */
export function formatDate(timestamp) {
  if (typeof timestamp !== "number") return "";
  return new Date(timestamp).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Normalized score 0–1: 60% price (lower better), 40% duration (lower better). Used for "Best" sort.
 * @param {object} flight - Flight object with price.amount, durationMinutes
 * @param {number} minPrice
 * @param {number} maxPrice
 * @param {number} minDuration
 * @param {number} maxDuration
 * @returns {number}
 */
export function calculateBestScore(
  flight,
  minPrice,
  maxPrice,
  minDuration,
  maxDuration
) {
  if (!flight?.price || typeof flight.price.amount !== "number") return 0;
  const priceRange = maxPrice - minPrice || 1;
  const durationRange = maxDuration - minDuration || 1;
  const priceScore = 1 - (flight.price.amount - minPrice) / priceRange;
  const durationScore =
    1 - ((flight.durationMinutes ?? 0) - minDuration) / durationRange;
  return 0.6 * priceScore + 0.4 * durationScore;
}

/**
 * Price confidence by percentile: bottom 25% = low, middle 50% = average, top 25% = high
 * @param {object} flight - Flight object with id
 * @param {object[]} allFlights - All flights for percentile
 * @returns {'low' | 'average' | 'high'}
 */
export function getPriceConfidence(flight, allFlights) {
  if (!flight || !allFlights?.length) return "average";
  const sorted = [...allFlights].sort(
    (a, b) => a.price.amount - b.price.amount
  );
  const index = sorted.findIndex((f) => f.id === flight.id);
  if (index < 0) return "average";
  const pct = (index + 1) / sorted.length;
  if (pct <= 0.25) return "low";
  if (pct >= 0.75) return "high";
  return "average";
}
