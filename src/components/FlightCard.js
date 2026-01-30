"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import {
  formatPrice,
  formatDuration,
  formatTime,
  formatDate,
  getPriceConfidence,
} from "@/src/domain/flight";

const CONFIDENCE_LABELS = {
  low: "Low for this route",
  average: "Average",
  high: "High",
};

const CONFIDENCE_COLORS = {
  low: "success",
  average: "default",
  high: "warning",
};

/**
 * Single flight card with price confidence.
 * @param {{ flight: object, allFlights: object[] }} props
 */
export default function FlightCard({ flight, allFlights }) {
  const confidence = getPriceConfidence(flight, allFlights);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderWidth: 2,
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {flight.airline?.name} ({flight.airline?.code})
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
              <Typography variant="h6" color="primary.main">
                {formatPrice(flight.price)}
              </Typography>
              <Chip
                size="small"
                label={CONFIDENCE_LABELS[confidence]}
                color={CONFIDENCE_COLORS[confidence]}
                variant="outlined"
              />
            </Stack>
          </Box>
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 4 }}
          sx={{ mt: 2 }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="caption" color="text.secondary">
              Departure
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {formatTime(flight.departure?.timestamp)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {flight.departure?.airport} · {formatDate(flight.departure?.timestamp)}
            </Typography>
          </Box>
          <Box sx={{ alignSelf: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {formatDuration(flight.durationMinutes)}
            </Typography>
            <Chip
              size="small"
              label={
                flight.stops === 0
                  ? "Non-stop"
                  : flight.stops === 1
                    ? "1 stop"
                    : `${flight.stops} stops`
              }
              variant="filled"
              sx={{ mt: 0.5 }}
            />
          </Box>
          <Box sx={{ textAlign: { sm: "right" } }}>
            <Typography variant="caption" color="text.secondary">
              Arrival
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {formatTime(flight.arrival?.timestamp)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {flight.arrival?.airport} · {formatDate(flight.arrival?.timestamp)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
