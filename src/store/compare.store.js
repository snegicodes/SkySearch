import { create } from "zustand";

/**
 * Compare store: hold up to 2 flights for side-by-side comparison.
 * @typedef {import('@/src/domain/flight').Flight} Flight
 */
export const useCompareStore = create((set, get) => ({
  /** @type {Flight[]} */
  selectedFlights: [],

  toggleFlight: (flight) => {
    const { selectedFlights } = get();
    const exists = selectedFlights.some((f) => f.id === flight.id);
    if (exists) {
      set({ selectedFlights: selectedFlights.filter((f) => f.id !== flight.id) });
    } else if (selectedFlights.length < 2) {
      set({ selectedFlights: [...selectedFlights, flight] });
    } else {
      set({ selectedFlights: [selectedFlights[1], flight] });
    }
  },

  clearSelection: () => set({ selectedFlights: [] }),

  /** @param {string} flightId */
  isSelected: (flightId) =>
    get().selectedFlights.some((f) => f.id === flightId),
}));
