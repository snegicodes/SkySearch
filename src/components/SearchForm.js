"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Paper,
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import { SwapHoriz } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import AirportAutocomplete from "./AirportAutocomplete";
import PassengerSelector from "./PassengerSelector";
import useSearchStore from "@/src/store/search.store";

const CABIN_CLASSES = [
  { value: "ECONOMY", label: "Economy" },
  { value: "PREMIUM_ECONOMY", label: "Premium Economy" },
  { value: "BUSINESS", label: "Business" },
  { value: "FIRST", label: "First" },
];

export default function SearchForm() {
  const router = useRouter();
  const {
    tripType,
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    children,
    infantsInSeat,
    infantsOnLap,
    cabinClass,
    setTripType,
    setOrigin,
    setDestination,
    setDepartureDate,
    setReturnDate,
    setCabinClass,
  } = useSearchStore();

  const [passengerAnchorEl, setPassengerAnchorEl] = useState(null);
  const [minDate, setMinDate] = useState(null);

  // Set minDate on client side only to avoid hydration mismatch
  useEffect(() => {
    setMinDate(new Date());
  }, []);

  // Set default return date to +7 days from departure
  useEffect(() => {
    if (tripType === "round-trip" && departureDate && !returnDate) {
      const nextWeek = new Date(departureDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setReturnDate(nextWeek);
    }
  }, [tripType, departureDate, returnDate, setReturnDate]);

  const handlePassengerChange = ({
    adults,
    children,
    infantsInSeat,
    infantsOnLap,
  }) => {
    useSearchStore.getState().setAdults(adults);
    useSearchStore.getState().setChildren(children);
    useSearchStore.getState().setInfantsInSeat(infantsInSeat);
    useSearchStore.getState().setInfantsOnLap(infantsOnLap);
  };

  const getPassengerSummary = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} ${adults === 1 ? "adult" : "adults"}`);
    if (children > 0)
      parts.push(`${children} ${children === 1 ? "child" : "children"}`);
    if (infantsInSeat > 0 || infantsOnLap > 0) {
      const totalInfants = infantsInSeat + infantsOnLap;
      parts.push(`${totalInfants} ${totalInfants === 1 ? "infant" : "infants"}`);
    }
    return parts.length > 0 ? parts.join(", ") : "1 adult";
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!origin || !destination || !departureDate) {
      return;
    }

    if (tripType === "round-trip" && !returnDate) {
      return;
    }

    const params = new URLSearchParams({
      from: origin,
      to: destination,
      date: format(departureDate, "yyyy-MM-dd"),
      tripType,
      adults: String(adults),
      children: String(children),
      infantsInSeat: String(infantsInSeat),
      infantsOnLap: String(infantsOnLap),
      cabinClass,
    });

    if (tripType === "round-trip" && returnDate) {
      params.set("returnDate", format(returnDate, "yyyy-MM-dd"));
    }

    router.push(`/result?${params.toString()}`);
  };

  const isFormValid =
    origin &&
    destination &&
    departureDate &&
    (tripType === "one-way" || returnDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: { xs: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: 1100,
            width: "100%",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1.5,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              Find Your Flight
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: "text.secondary",
                fontSize: { xs: "0.95rem", sm: "1.05rem" }
              }}
            >
              Search and compare flights from top airlines
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {/* Trip Type & Passengers & Cabin */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 3 }}
              alignItems="stretch"
            >
              <ToggleButtonGroup
                value={tripType}
                exclusive
                onChange={(e, newValue) => {
                  if (newValue !== null) setTripType(newValue);
                }}
                aria-label="trip type"
                sx={{ 
                  width: { xs: "100%", sm: "auto" },
                  height: 56,
                  border: "0.5px solid",
                  borderColor: "#0d9488",
                  borderRadius: 1
                }}
              >
                <ToggleButton 
                  value="one-way" 
                  sx={{ 
                    px: 3,
                    flex: { xs: 1, sm: "0 0 auto" }
                  }}
                >
                  One-way
                </ToggleButton>
                <ToggleButton 
                  value="round-trip" 
                  sx={{ 
                    px: 3,
                    flex: { xs: 1, sm: "0 0 auto" }
                  }}
                >
                  Round trip
                </ToggleButton>
              </ToggleButtonGroup>

              <Button
                variant="outlined"
                onClick={(e) => setPassengerAnchorEl(e.currentTarget)}
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  justifyContent: "flex-start",
                  px: 2.5,
                  py: { xs: 2, sm: 1.5 },
                  height: 56,
                  minWidth: { sm: 200 },
                }}
              >
                <Typography variant="body2">{getPassengerSummary()}</Typography>
              </Button>

              <FormControl
                sx={{ width: { xs: "100%", sm: "200px" } }}
              >
                <InputLabel>Cabin Class</InputLabel>
                <Select
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                  label="Cabin Class"
                  sx={{ height: 56 }}
                >
                  {CABIN_CLASSES.map((cabin) => (
                    <MenuItem key={cabin.value} value={cabin.value}>
                      {cabin.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Divider sx={{ my: 3.5, opacity: 0.5 }} />

            {/* Origin & Destination */}
            <Box sx={{ position: "relative", mb: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ position: "relative" }}
              >
                <Box sx={{ flex: 1 }}>
                  <AirportAutocomplete
                    label="From"
                    value={origin}
                    onChange={setOrigin}
                    required
                    placeholder="City or airport"
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <AirportAutocomplete
                    label="To"
                    value={destination}
                    onChange={setDestination}
                    required
                    placeholder="City or airport"
                  />
                </Box>
              </Stack>

              {/* Swap button - positioned absolutely between fields */}
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1000,
                  pointerEvents: "auto",
                }}
              >
                <IconButton
                  onClick={handleSwap}
                  sx={{
                    bgcolor: "background.default",
                    border: "2px solid",
                    borderColor: "divider",
                    width: 44,
                    height: 44,
                    "&:hover": {
                      bgcolor: "background.default",
                      borderColor: "primary.main",
                      transform: "rotate(180deg)",
                      transition: "all 0.3s ease",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <SwapHoriz />
                </IconButton>
              </Box>
            </Box>

            {/* Dates */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mb: 4 }}
            >
              <Box sx={{ flex: 1 }}>
                <DatePicker
                  label="Departure"
                  value={departureDate}
                  onChange={(newValue) => setDepartureDate(newValue)}
                  minDate={minDate}
                  slotProps={{
                    textField: {
                      required: true,
                      fullWidth: true,
                    },
                  }}
                />
              </Box>
              {tripType === "round-trip" && (
                <Box sx={{ flex: 1 }}>
                  <DatePicker
                    label="Return"
                    value={returnDate}
                    onChange={(newValue) => setReturnDate(newValue)}
                    minDate={departureDate || minDate}
                    slotProps={{
                      textField: {
                        required: true,
                        fullWidth: true,
                      },
                    }}
                  />
                </Box>
              )}
            </Stack>

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={!isFormValid}
              sx={{
                py: 1.75,
                fontSize: "1.05rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Search Flights
            </Button>
          </Box>
        </Box>
      </Box>

      <PassengerSelector
        adults={adults}
        children={children}
        infantsInSeat={infantsInSeat}
        infantsOnLap={infantsOnLap}
        onChange={handlePassengerChange}
        anchorEl={passengerAnchorEl}
        onClose={() => setPassengerAnchorEl(null)}
      />
    </LocalizationProvider>
  );
}
