"use client";

import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useCompareStore } from "@/src/store/compare.store";
import {
  formatPrice,
  formatDuration,
  formatTime,
  formatDate,
} from "@/src/domain/flight";

/**
 * Bottom drawer showing side-by-side comparison of up to 2 selected flights.
 */
export default function CompareDrawer({ open, onClose }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { selectedFlights, clearSelection } = useCompareStore();

  const isDark = theme.palette.mode === "dark";

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "80vh",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: isDark
            ? "rgba(30, 30, 30, 0.88)"
            : "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid",
          borderBottom: "none",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          boxShadow: isDark
            ? "0 -8px 32px rgba(0,0,0,0.4)"
            : "0 -8px 32px rgba(0,0,0,0.12)",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Compare Flights
          </Typography>
          <IconButton onClick={onClose} size="small" aria-label="Close compare">
            <Close />
          </IconButton>
        </Box>

        {selectedFlights.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            Select up to 2 flights using the &quot;Compare&quot; checkbox on each
            flight card.
          </Typography>
        ) : (
        <Stack
          direction={isSm ? "row" : "column"}
          spacing={2}
          sx={{ mt: 2 }}
        >
          {selectedFlights.map((flight) => (
            <Paper
              key={flight.id}
              variant="outlined"
              sx={{
                p: 2,
                flex: 1,
                minWidth: 0,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
              }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                {flight.airline?.name} ({flight.airline?.code})
              </Typography>
              <Typography variant="h6" color="primary.main" sx={{ mt: 0.5 }}>
                {formatPrice(flight.price)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDuration(flight.durationMinutes)} ·{" "}
                {flight.stops === 0
                  ? "Non-stop"
                  : flight.stops === 1
                    ? "1 stop"
                    : `${flight.stops} stops`}
              </Typography>
              <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Departure
                  </Typography>
                  <Typography variant="body2">
                    {formatTime(flight.departure?.timestamp)} ·{" "}
                    {flight.departure?.airport}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(flight.departure?.timestamp)}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Arrival
                  </Typography>
                  <Typography variant="body2">
                    {formatTime(flight.arrival?.timestamp)} ·{" "}
                    {flight.arrival?.airport}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(flight.arrival?.timestamp)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
        )}

        {selectedFlights.length > 0 && (
          <Typography
            component="button"
            variant="body2"
            onClick={() => {
              clearSelection();
              onClose();
            }}
            sx={{
              mt: 2,
              cursor: "pointer",
              border: "none",
              background: "none",
              color: "primary.main",
              textDecoration: "underline",
            }}
          >
            Clear selection
          </Typography>
        )}
      </Box>
    </Drawer>
  );
}
