const BASE_URL = "https://test.api.amadeus.com";

let cachedToken = null;
let tokenExpiresAt = 0;
const TOKEN_BUFFER_MS = 60 * 1000; // refresh 60s before expiry


async function getAccessToken(clientId, clientSecret) {
  if (cachedToken && Date.now() < tokenExpiresAt - TOKEN_BUFFER_MS) {
    return cachedToken;
  }

  const res = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Amadeus OAuth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  const expiresIn = (data.expires_in ?? 1799) * 1000;
  tokenExpiresAt = Date.now() + expiresIn;
  return cachedToken;
}

export async function searchLocations(keyword, clientId, clientSecret) {
  const token = await getAccessToken(clientId, clientSecret);
  const params = new URLSearchParams({
    keyword: keyword.trim(),
    subType: "AIRPORT,CITY",
    "page[limit]": "10",
  });

  const res = await fetch(
    `${BASE_URL}/v1/reference-data/locations?${params}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Amadeus locations failed: ${res.status} ${text}`);
  }

  return res.json();
}

export async function fetchAmadeusFlights(params, clientId, clientSecret) {
  const token = await getAccessToken(clientId, clientSecret);

  const searchParams = new URLSearchParams({
    originLocationCode: String(params.originLocationCode).toUpperCase().trim(),
    destinationLocationCode: String(params.destinationLocationCode).toUpperCase().trim(),
    departureDate: String(params.departureDate).trim(),
    adults: String(Math.max(1, parseInt(params.adults, 10) || 1)),
    max: "50",
  });

  // Optional: only add when present and valid
  if (params.returnDate && String(params.returnDate).trim()) {
    searchParams.set("returnDate", String(params.returnDate).trim());
  }
  const children = parseInt(params.children, 10) || 0;
  if (children > 0) {
    searchParams.set("children", String(children));
  }
  // Amadeus GET may support "infants" (combined); infantsInSeat/infantsOnLap are POST-only.
  // Only add infants when > 0; omit if your Amadeus plan uses different param names.
  const infantsInSeat = parseInt(params.infantsInSeat, 10) || 0;
  const infantsOnLap = parseInt(params.infantsOnLap, 10) || 0;
  const totalInfants = infantsInSeat + infantsOnLap;
  if (totalInfants > 0) {
    searchParams.set("infants", String(totalInfants));
  }
  if (params.travelClass && String(params.travelClass).trim()) {
    searchParams.set("travelClass", String(params.travelClass).trim());
  }

  const url = `${BASE_URL}/v2/shopping/flight-offers?${searchParams}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("Amadeus flight-offers response:", res.status, text);
    throw new Error(`Amadeus flight offers failed: ${res.status} ${text}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Amadeus invalid JSON: ${text.slice(0, 200)}`);
  }
}
