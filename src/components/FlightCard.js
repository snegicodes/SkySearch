"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Checkbox,
  FormControlLabel,
  Stack,
} from "@mui/material";
import { FlightTakeoff, FlightLand, Flight } from "@mui/icons-material";
import {
  formatPrice,
  formatDuration,
  formatTime,
  formatDate,
  getPriceConfidence,
} from "@/src/domain/flight";
import { useCompareStore } from "@/src/store/compare.store";

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
 * Single flight card with price confidence and compare checkbox.
 * @param {{ flight: object, allFlights: object[] }} props
 */
export default function FlightCard({ flight, allFlights }) {
  const { toggleFlight, isSelected } = useCompareStore();
  const confidence = getPriceConfidence(flight, allFlights);
  const selected = isSelected(flight.id);

  return (
    <Card
      variant="outlined"
      sx={{
        mb: 2,
        borderWidth: 2,
        borderColor: selected ? "primary.main" : "divider",
        transition: "border-color 0.2s ease",
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
          <FormControlLabel
            control={
              <Checkbox
                checked={selected}
                onChange={() => toggleFlight(flight)}
                color="primary"
                size="small"
              />
            }
            label="Compare"
            sx={{ mr: 0 }}
          />
        </Box>

        <Box sx={{ mt: 3 }}>
          {/* Mobile Compact Layout */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Stack direction="row" spacing={0} alignItems="center">
              {/* Departure - Compact */}
              <Box sx={{ flexShrink: 0, minWidth: 70 }}>
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 0.5 }}>
                  <FlightTakeoff sx={{ fontSize: 14, color: "primary.main" }} />
                  <Typography variant="caption" color="text.secondary" fontSize="0.65rem">
                    DEP
                  </Typography>
                </Stack>
                <Typography variant="body1" fontWeight={600} fontSize="0.9rem">
                  {formatTime(flight.departure?.timestamp)}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                  {flight.departure?.airport}
                </Typography>
              </Box>

              {/* Connecting Line - Compact */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  px: 1.5,
                  minWidth: 120,
                }}
              >
                {/* Duration and stops above line */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -160%)",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Typography variant="caption" color="text.secondary" fontSize="0.7rem" fontWeight={500}>
                    {formatDuration(flight.durationMinutes)}
                  </Typography>
                </Box>

                {/* Line with airplane */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Left line */}
                  <Box
                    sx={{
                      flex: 1,
                      height: 2,
                      background: (theme) =>
                        `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                      },
                    }}
                  />
                  
                  {/* Airplane icon */}
                  <Flight
                    sx={{
                      fontSize: 20,
                      color: "primary.main",
                      transform: "rotate(90deg)",
                      mx: 0.5,
                    }}
                  />

                  {/* Right line */}
                  <Box
                    sx={{
                      flex: 1,
                      height: 2,
                      background: (theme) =>
                        `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid",
                        borderLeftColor: "primary.main",
                        borderTop: "4px solid transparent",
                        borderBottom: "4px solid transparent",
                      },
                    }}
                  />
                </Box>

                {/* Stops chip below line */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, 80%)",
                    textAlign: "center",
                  }}
                >
                  <Chip
                    size="small"
                    label={
                      flight.stops === 0
                        ? "Non-stop"
                        : flight.stops === 1
                          ? "1 stop"
                          : `${flight.stops} stops`
                    }
                    variant="outlined"
                    sx={{
                      fontSize: "0.65rem",
                      height: 18,
                      "& .MuiChip-label": { px: 1 },
                      borderColor: flight.stops === 0 ? "success.main" : "primary.main",
                      color: flight.stops === 0 ? "success.main" : "primary.main",
                    }}
                  />
                </Box>
              </Box>

              {/* Arrival - Compact */}
              <Box sx={{ flexShrink: 0, minWidth: 70, textAlign: "right" }}>
                <Stack direction="row" spacing={0.5} alignItems="center" justifyContent="flex-end" sx={{ mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary" fontSize="0.65rem">
                    ARR
                  </Typography>
                  <FlightLand sx={{ fontSize: 14, color: "primary.main" }} />
                </Stack>
                <Typography variant="body1" fontWeight={600} fontSize="0.9rem">
                  {formatTime(flight.arrival?.timestamp)}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                  {flight.arrival?.airport}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Desktop Layout */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Stack
              direction="row"
              spacing={0}
              alignItems="stretch"
            >
              {/* Departure */}
              <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column" }}>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <FlightTakeoff sx={{ fontSize: 20, color: "primary.main" }} />
                  <Typography variant="caption" color="text.secondary" fontWeight={500}>
                    Departure
                  </Typography>
                </Stack>
                <Typography variant="h6" fontWeight={600}>
                  {formatTime(flight.departure?.timestamp)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.departure?.airport}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(flight.departure?.timestamp)}
                </Typography>
              </Box>

              {/* Connecting Line with Airplane - centered container */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  minWidth: 200,
                  px: 3,
                }}
              >
                {/* Duration and stops - absolutely positioned above the line */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -120%)",
                    textAlign: "center",
                    pb: 2,
                  }}
                >
                  <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.5, whiteSpace: "nowrap" }}>
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
                    variant="outlined"
                    sx={{
                      fontSize: "0.7rem",
                      height: 20,
                      borderColor: flight.stops === 0 ? "success.main" : "primary.main",
                      color: flight.stops === 0 ? "success.main" : "primary.main",
                    }}
                  />
                </Box>

                {/* Line container - centered both vertically and horizontally */}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  {/* Left line */}
                  <Box
                    sx={{
                      flex: 1,
                      height: 2,
                      background: (theme) =>
                        `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      position: "relative",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                      },
                    }}
                  />
                  
                  {/* Airplane icon */}
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: 1,
                    }}
                  >
                    <Flight
                      sx={{
                        fontSize: 28,
                        color: "primary.main",
                        transform: "rotate(90deg)",
                      }}
                    />
                  </Box>

                  {/* Right line */}
                  <Box
                    sx={{
                      flex: 1,
                      height: 2,
                      background: (theme) =>
                        `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid",
                        borderLeftColor: "primary.main",
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* Arrival */}
              <Box sx={{ flexShrink: 0, display: "flex", flexDirection: "column", textAlign: "right" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ mb: 1 }}
                >
                  {/* Icon order adjusted for right alignment */}
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    fontWeight={500}
                  >
                    Arrival
                  </Typography>
                  <FlightLand 
                    sx={{ 
                      fontSize: 20, 
                      color: "primary.main",
                    }} 
                  />
                </Stack>
                <Typography variant="h6" fontWeight={600}>
                  {formatTime(flight.arrival?.timestamp)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.arrival?.airport}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(flight.arrival?.timestamp)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
