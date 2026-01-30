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
    originLocationCode: params.originLocationCode,
    destinationLocationCode: params.destinationLocationCode,
    departureDate: params.departureDate,
    adults: String(params.adults ?? 1),
    max: "50",
  });

  if (params.returnDate) {
    searchParams.set("returnDate", params.returnDate);
  }
  if (params.children) searchParams.set("children", String(params.children));
  if (params.infantsInSeat)
    searchParams.set("infantsInSeat", String(params.infantsInSeat));
  if (params.infantsOnLap)
    searchParams.set("infantsOnLap", String(params.infantsOnLap));
  if (params.travelClass) searchParams.set("travelClass", params.travelClass);

  const res = await fetch(
    `${BASE_URL}/v2/shopping/flight-offers?${searchParams}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Amadeus flight offers failed: ${res.status} ${text}`);
  }

  return res.json();
}
