import { create } from "zustand";

export const useCompareStore = create((set, get) => ({
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

  isSelected: (flightId) =>
    get().selectedFlights.some((f) => f.id === flightId),
}));
