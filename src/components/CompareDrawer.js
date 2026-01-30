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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import {
  Close,
  FlightTakeoff,
  FlightLand,
  Schedule,
  AttachMoney,
  SwapHoriz,
} from "@mui/icons-material";
import { useCompareStore } from "@/src/store/compare.store";
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
 * Compute which of the two flights wins each attribute (for "Best" badges).
 * @param {object[]} flights - Exactly 2 flights
 * @returns {{ bestPriceIdx: number | null, bestDurationIdx: number | null, bestStopsIdx: number | null }}
 */
function getComparisonHighlights(flights) {
  if (flights?.length !== 2) return { bestPriceIdx: null, bestDurationIdx: null, bestStopsIdx: null };
  const [a, b] = flights;
  const aPrice = a.price?.amount ?? Infinity;
  const bPrice = b.price?.amount ?? Infinity;
  const aDur = a.durationMinutes ?? Infinity;
  const bDur = b.durationMinutes ?? Infinity;
  const aStops = a.stops ?? Infinity;
  const bStops = b.stops ?? Infinity;

  return {
    bestPriceIdx: aPrice < bPrice ? 0 : bPrice < aPrice ? 1 : null,
    bestDurationIdx: aDur < bDur ? 0 : bDur < aDur ? 1 : null,
    bestStopsIdx: aStops < bStops ? 0 : bStops < aStops ? 1 : null,
  };
}

/**
 * Bottom drawer showing side-by-side comparison of up to 2 selected flights.
 * @param {{ open: boolean, onClose: () => void, allFlights?: object[] }} props
 */
export default function CompareDrawer({ open, onClose, allFlights = [] }) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const { selectedFlights, toggleFlight, clearSelection } = useCompareStore();

  const isDark = theme.palette.mode === "dark";
  const highlights =
    selectedFlights.length === 2
      ? getComparisonHighlights(selectedFlights)
      : { bestPriceIdx: null, bestDurationIdx: null, bestStopsIdx: null };

  const handleRemoveFlight = (flight) => {
    toggleFlight(flight);
  };

  return (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      variant="temporary"
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "85vh",
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
      <Box sx={{ p: 2, pb: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
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
          <Box
            sx={{
              py: 4,
              px: 2,
              textAlign: "center",
              backgroundColor: "action.hover",
              borderRadius: 2,
              border: "1px dashed",
              borderColor: "divider",
            }}
          >
            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
              Select up to 2 flights to compare side by side
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Use the &quot;Compare&quot; checkbox on each flight card, then open
              this panel to see a detailed comparison.
            </Typography>
          </Box>
        ) : selectedFlights.length === 1 ? (
          <>
            <SingleFlightView
              flight={selectedFlights[0]}
              allFlights={allFlights}
              onRemove={() => handleRemoveFlight(selectedFlights[0])}
              isSm={isSm}
            />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  clearSelection();
                  onClose();
                }}
                color="primary"
              >
                Clear selection
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Compare price, duration, stops, and schedule at a glance. The best
              option for each criterion is highlighted.
            </Typography>

            {isSm ? (
              <ComparisonTable
                flights={selectedFlights}
                allFlights={allFlights}
                highlights={highlights}
                onRemoveFlight={handleRemoveFlight}
              />
            ) : (
              <Stack direction="column" spacing={2}>
                {selectedFlights.map((flight, idx) => (
                  <ComparisonCard
                    key={flight.id}
                    flight={flight}
                    allFlights={allFlights}
                    isFirst={idx === 0}
                    bestPrice={highlights.bestPriceIdx === idx}
                    bestDuration={highlights.bestDurationIdx === idx}
                    bestStops={highlights.bestStopsIdx === idx}
                    onRemove={() => handleRemoveFlight(flight)}
                  />
                ))}
              </Stack>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
                mt: 3,
                pt: 2,
                borderTop: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                Need to change your selection? Uncheck a flight on the results
                or clear below.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => {
                  clearSelection();
                  onClose();
                }}
                color="primary"
              >
                Clear selection
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
}

/**
 * Single flight detailed card when only one flight is selected.
 */
function SingleFlightView({ flight, allFlights, onRemove, isSm }) {
  const confidence = getPriceConfidence(flight, allFlights);
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      <IconButton
        size="small"
        onClick={onRemove}
        aria-label="Remove from compare"
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <Close fontSize="small" />
      </IconButton>
      <Typography variant="subtitle1" fontWeight={600} sx={{ pr: 4 }}>
        {flight.airline?.name} ({flight.airline?.code})
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 0.5 }}>
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
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {formatDuration(flight.durationMinutes)} ·{" "}
        {flight.stops === 0
          ? "Non-stop"
          : flight.stops === 1
            ? "1 stop"
            : `${flight.stops} stops`}
      </Typography>
      <Stack
        direction={isSm ? "row" : "column"}
        spacing={2}
        sx={{ mt: 2 }}
        divider={<Divider orientation={isSm ? "vertical" : "horizontal"} flexItem />}
      >
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Departure
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {formatTime(flight.departure?.timestamp)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {flight.departure?.airport} · {formatDate(flight.departure?.timestamp)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Arrival
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {formatTime(flight.arrival?.timestamp)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {flight.arrival?.airport} · {formatDate(flight.arrival?.timestamp)}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Select another flight from the results to compare side by side.
      </Typography>
    </Paper>
  );
}

/**
 * Comparison table for desktop: rows = criteria, columns = Flight 1 | Flight 2.
 */
function ComparisonTable({ flights, allFlights, highlights, onRemoveFlight }) {
  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{ borderRadius: 2, border: "1px solid", borderColor: "divider" }}
    >
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, width: "20%", minWidth: 100 }}>
              Criteria
            </TableCell>
            {flights.map((flight, idx) => (
              <TableCell
                key={flight.id}
                align="center"
                sx={{
                  fontWeight: 600,
                  backgroundColor: "action.hover",
                  position: "relative",
                  minWidth: 140,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => onRemoveFlight(flight)}
                  aria-label={`Remove ${flight.airline?.code} from compare`}
                  sx={{ position: "absolute", top: 4, right: 4 }}
                >
                  <Close fontSize="small" />
                </IconButton>
                <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                  {flight.airline?.name} ({flight.airline?.code})
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>
              <AttachMoney sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
              Price
            </TableCell>
            {flights.map((flight, idx) => (
              <TableCell key={flight.id} align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="body1" fontWeight={600} color="primary.main">
                    {formatPrice(flight.price)}
                  </Typography>
                  {highlights.bestPriceIdx === idx && (
                    <Chip label="Best price" size="small" color="success" />
                  )}
                  {allFlights?.length > 0 && (
                    <Chip
                      size="small"
                      label={CONFIDENCE_LABELS[getPriceConfidence(flight, allFlights)]}
                      color={CONFIDENCE_COLORS[getPriceConfidence(flight, allFlights)]}
                      variant="outlined"
                    />
                  )}
                </Stack>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>
              <Schedule sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
              Duration
            </TableCell>
            {flights.map((flight, idx) => (
              <TableCell key={flight.id} align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="body2" fontWeight={500}>
                    {formatDuration(flight.durationMinutes)}
                  </Typography>
                  {highlights.bestDurationIdx === idx && (
                    <Chip label="Fastest" size="small" color="info" />
                  )}
                </Stack>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>
              <SwapHoriz sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
              Stops
            </TableCell>
            {flights.map((flight, idx) => (
              <TableCell key={flight.id} align="center">
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="body2">
                    {flight.stops === 0
                      ? "Non-stop"
                      : flight.stops === 1
                        ? "1 stop"
                        : `${flight.stops} stops`}
                  </Typography>
                  {highlights.bestStopsIdx === idx && (
                    <Chip label="Fewest stops" size="small" color="primary" variant="outlined" />
                  )}
                </Stack>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>
              <FlightTakeoff sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
              Departure
            </TableCell>
            {flights.map((flight) => (
              <TableCell key={flight.id} align="center">
                <Typography variant="body2" fontWeight={500}>
                  {formatTime(flight.departure?.timestamp)}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {flight.departure?.airport}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(flight.departure?.timestamp)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell sx={{ color: "text.secondary" }}>
              <FlightLand sx={{ fontSize: 18, verticalAlign: "middle", mr: 0.5 }} />
              Arrival
            </TableCell>
            {flights.map((flight) => (
              <TableCell key={flight.id} align="center">
                <Typography variant="body2" fontWeight={500}>
                  {formatTime(flight.arrival?.timestamp)}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {flight.arrival?.airport}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(flight.arrival?.timestamp)}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

/**
 * Single flight card for mobile comparison view.
 */
function ComparisonCard({
  flight,
  allFlights,
  isFirst,
  bestPrice,
  bestDuration,
  bestStops,
  onRemove,
}) {
  const confidence = getPriceConfidence(flight, allFlights);
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      <IconButton
        size="small"
        onClick={onRemove}
        aria-label="Remove from compare"
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <Close fontSize="small" />
      </IconButton>
      <Typography variant="subtitle1" fontWeight={600} sx={{ pr: 4 }}>
        {flight.airline?.name} ({flight.airline?.code})
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={0.5} sx={{ mt: 1 }}>
        {bestPrice && <Chip label="Best price" size="small" color="success" />}
        {bestDuration && <Chip label="Fastest" size="small" color="info" />}
        {bestStops && (
          <Chip label="Fewest stops" size="small" color="primary" variant="outlined" />
        )}
      </Stack>
      <Typography variant="h6" color="primary.main" sx={{ mt: 1 }}>
        {formatPrice(flight.price)}
      </Typography>
      <Chip
        size="small"
        label={CONFIDENCE_LABELS[confidence]}
        color={CONFIDENCE_COLORS[confidence]}
        variant="outlined"
        sx={{ mt: 0.5 }}
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {formatDuration(flight.durationMinutes)} ·{" "}
        {flight.stops === 0
          ? "Non-stop"
          : flight.stops === 1
            ? "1 stop"
            : `${flight.stops} stops`}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }} divider={<Divider orientation="vertical" flexItem />}>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Departure
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {formatTime(flight.departure?.timestamp)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {flight.departure?.airport} · {formatDate(flight.departure?.timestamp)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary" display="block">
            Arrival
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {formatTime(flight.arrival?.timestamp)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {flight.arrival?.airport} · {formatDate(flight.arrival?.timestamp)}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
