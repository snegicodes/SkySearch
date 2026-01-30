import { fetchAmadeusFlights } from "@/src/api/amadeus";
import { adaptAmadeusResponse } from "@/src/api/adaptFlight";
import flightsMock from "@/src/mocks/flights.json";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from =
    searchParams.get("from") || searchParams.get("originLocationCode");
  const to =
    searchParams.get("to") ||
    searchParams.get("destinationLocationCode");
  const date =
    searchParams.get("date") || searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate") || undefined;
  const adults = parseInt(searchParams.get("adults") || "1", 10);
  const children = parseInt(searchParams.get("children") || "0", 10);
  const infantsInSeat = parseInt(
    searchParams.get("infantsInSeat") || "0",
    10
  );
  const infantsOnLap = parseInt(searchParams.get("infantsOnLap") || "0", 10);
  const cabinClass =
    searchParams.get("cabinClass") || searchParams.get("travelClass") || undefined;

  if (!from || !to || !date) {
    return Response.json(
      { error: "Missing required params: from, to, date" },
      { status: 400 }
    );
  }

  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  const useAmadeus =
    clientId &&
    clientSecret &&
    clientId.trim() !== "" &&
    clientSecret.trim() !== "";

  if (useAmadeus) {
    try {
      const params = {
        originLocationCode: from.toUpperCase(),
        destinationLocationCode: to.toUpperCase(),
        departureDate: date,
        returnDate: returnDate || undefined,
        adults,
        children,
        infantsInSeat,
        infantsOnLap,
        travelClass: cabinClass,
      };
      const response = await fetchAmadeusFlights(
        params,
        clientId,
        clientSecret
      );
      const flights = adaptAmadeusResponse(response);
      return Response.json({
        flights: flights.length > 0 ? flights : flightsMock,
      });
    } catch (err) {
      console.error("Amadeus flights error:", err.message);
      return Response.json({ flights: flightsMock });
    }
  }

  return Response.json({ flights: flightsMock });
}
