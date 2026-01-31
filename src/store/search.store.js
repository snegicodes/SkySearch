import { create } from "zustand";

const useSearchStore = create((set) => ({
  tripType: "round-trip",
  origin: "",
  destination: "",
  departureDate: null,
  returnDate: null,
  adults: 1,
  children: 0,
  infantsInSeat: 0,
  infantsOnLap: 0,
  cabinClass: "ECONOMY",

  setTripType: (tripType) => set({ tripType }),
  setOrigin: (origin) => set({ origin }),
  setDestination: (destination) => set({ destination }),
  setDepartureDate: (date) => set({ departureDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),
  setAdults: (adults) => set({ adults }),
  setChildren: (children) => set({ children }),
  setInfantsInSeat: (infantsInSeat) => set({ infantsInSeat }),
  setInfantsOnLap: (infantsOnLap) => set({ infantsOnLap }),
  setCabinClass: (cabinClass) => set({ cabinClass }),

  resetForm: () =>
    set({
      tripType: "round-trip",
      origin: "",
      destination: "",
      departureDate: null,
      returnDate: null,
      adults: 1,
      children: 0,
      infantsInSeat: 0,
      infantsOnLap: 0,
      cabinClass: "ECONOMY",
    }),
}));

export default useSearchStore;
