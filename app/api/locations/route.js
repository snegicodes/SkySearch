import { searchLocations } from "@/src/api/amadeus";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get("keyword")?.trim() || "";

  if (keyword.length < 2) {
    return Response.json(
      { error: "keyword must be at least 2 characters" },
      { status: 400 }
    );
  }

  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  if (
    !clientId ||
    !clientSecret ||
    clientId.trim() === "" ||
    clientSecret.trim() === ""
  ) {
    return Response.json(
      { error: "Amadeus credentials not configured", data: [] },
      { status: 503 }
    );
  }

  try {
    const response = await searchLocations(keyword, clientId, clientSecret);
    return Response.json(response);
  } catch (err) {
    console.error("Amadeus locations error:", err.message);
    return Response.json(
      { error: err.message || "Location search failed", data: [] },
      { status: 500 }
    );
  }
}
