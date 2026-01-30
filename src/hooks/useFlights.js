"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * @typedef {Object} SearchParams
 * @property {string} from
 * @property {string} to
 * @property {string} date
 * @property {string} [returnDate]
 * @property {number} [adults]
 * @property {number} [children]
 * @property {number} [infantsInSeat]
 * @property {number} [infantsOnLap]
 * @property {string} [cabinClass]
 */

/**
 * Fetch flights from /api/flights. No React Query in this project; simple state + fetch.
 * @param {SearchParams | null} params
 * @returns {{ data: import('@/src/domain/flight').Flight[] | null, isLoading: boolean, error: Error | null, refetch: () => void }}
 */
export function useFlights(params) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(!!params);
  const [error, setError] = useState(null);

  const fetchFlights = useCallback(async () => {
    if (!params?.from || !params?.to || !params?.date) {
      setData(null);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const searchParams = new URLSearchParams({
        from: params.from,
        to: params.to,
        date: params.date,
        adults: String(params.adults ?? 1),
        children: String(params.children ?? 0),
        infantsInSeat: String(params.infantsInSeat ?? 0),
        infantsOnLap: String(params.infantsOnLap ?? 0),
        cabinClass: params.cabinClass ?? "ECONOMY",
      });
      if (params.returnDate) searchParams.set("returnDate", params.returnDate);
      const res = await fetch(`/api/flights?${searchParams.toString()}`);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setData(json.flights ?? []);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [
    params?.from,
    params?.to,
    params?.date,
    params?.returnDate,
    params?.adults,
    params?.children,
    params?.infantsInSeat,
    params?.infantsOnLap,
    params?.cabinClass,
  ]);

  useEffect(() => {
    if (!params?.from || !params?.to || !params?.date) {
      setData(null);
      setIsLoading(false);
      return;
    }
    fetchFlights();
  }, [params?.from, params?.to, params?.date, params?.returnDate, fetchFlights]);

  return { data, isLoading, error, refetch: fetchFlights };
}
