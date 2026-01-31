"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  useMediaQuery,
  useTheme,
  Paper,
  Collapse,
} from "@mui/material";
import {
  FilterList,
  CompareArrows,
  ExpandMore,
  ExpandLess,
  SwapHoriz,
} from "@mui/icons-material";

const LOGO_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762369/spotter/logo1.png";
const LOGO_DARK_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762760/spotter/logoDark1.png";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import AirportAutocomplete from "./AirportAutocomplete";
import PassengerSelector from "./PassengerSelector";
import ThemeToggle from "@/app/components/ThemeToggle";
import useSearchStore from "@/src/store/search.store";

const CABIN_CLASSES = [
  { value: "ECONOMY", label: "Economy" },
  { value: "PREMIUM_ECONOMY", label: "Premium Economy" },
  { value: "BUSINESS", label: "Business" },
  { value: "FIRST", label: "First" },
];

export default function ResultHeaderForm({
  onToggleSidebar,
  sidebarOpen,
  onOpenCompare,
  compareCount,
}) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [formExpanded, setFormExpanded] = useState(!isMobile);
  const [passengerAnchorEl, setPassengerAnchorEl] = useState(null);
  const [minDate, setMinDate] = useState(null);

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

  useEffect(() => {
    setMinDate(new Date());
  }, []);

  useEffect(() => {
    if (tripType === "round-trip" && departureDate && !returnDate) {
      const nextWeek = new Date(departureDate);
      nextWeek.setDate(nextWeek.getDate() + 7);
      setReturnDate(nextWeek);
    }
  }, [tripType, departureDate, returnDate, setReturnDate]);

  const handlePassengerChange = ({ adults, children, infantsInSeat, infantsOnLap }) => {
    useSearchStore.getState().setAdults(adults);
    useSearchStore.getState().setChildren(children);
    useSearchStore.getState().setInfantsInSeat(infantsInSeat);
    useSearchStore.getState().setInfantsOnLap(infantsOnLap);
  };

  const getPassengerSummary = () => {
    const parts = [];
    if (adults > 0) parts.push(`${adults} ${adults === 1 ? "adult" : "adults"}`);
    if (children > 0) parts.push(`${children} ${children === 1 ? "child" : "children"}`);
    if (infantsInSeat > 0 || infantsOnLap > 0) {
      const total = infantsInSeat + infantsOnLap;
      parts.push(`${total} ${total === 1 ? "infant" : "infants"}`);
    }
    return parts.length > 0 ? parts.join(", ") : "1 adult";
  };

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = () => {
    if (!origin || !destination || !departureDate) return;
    if (tripType === "round-trip" && !returnDate) return;
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

  const canSearch =
    origin &&
    destination &&
    departureDate &&
    (tripType === "one-way" || returnDate);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        color: "text.primary",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }}
    >
      <Toolbar
        sx={{
          flexWrap: "nowrap",
          gap: { xs: 0.5, sm: 1 },
          px: { xs: 1, sm: 2 },
          py: { xs: 1, sm: 1.5 },
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        <Box
          sx={{
            flex: { xs: "1 1 0%", md: 1 },
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.5, sm: 1 },
            overflow: "hidden",
            justifyContent: { xs: "space-between", md: "flex-start" },
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              lineHeight: 0,
              flexShrink: 0,
            }}
          >
            <Image
              src={theme.palette.mode === "dark" ? LOGO_DARK_URL : LOGO_URL}
              alt="SkySearch"
              width={160}
              height={40}
              style={{
                height: "clamp(28px, 8vw, 40px)",
                width: "auto",
                maxHeight: 40,
              }}
              priority
              sizes="(max-width: 600px) 120px, 160px"
            />
          </Link>
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{ display: { xs: "flex", md: "none" }, flexShrink: 0 }}
          >
            <Button
              component={Link}
              href="/#search-section"
              size="small"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                color: "text.primary",
                px: 1,
                minHeight: 44,
                whiteSpace: "nowrap",
              }}
            >
              Modify
            </Button>
            <IconButton
              onClick={onToggleSidebar}
              color={sidebarOpen ? "primary" : "default"}
              aria-label="Toggle filters"
              sx={{
                minWidth: 44,
                minHeight: 44,
                p: 0,
              }}
            >
              <FilterList fontSize="small" />
            </IconButton>
          </Stack>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Button
            component={Link}
            href="/#search-section"
            size="medium"
            sx={{ textTransform: "none", fontWeight: 600, color: "text.primary" }}
          >
            Modify Search 
          </Button>
        </Box>

        <Stack
          direction="row"
          spacing={{ xs: 0, sm: 0.5 }}
          alignItems="center"
          sx={{
            flex: { xs: "0 0 auto", md: 1 },
            justifyContent: "flex-end",
            minWidth: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", minWidth: 44, minHeight: 44 }}>
            <ThemeToggle />
          </Box>
          {!isMobile && (
            <IconButton
              onClick={onToggleSidebar}
              color={sidebarOpen ? "primary" : "default"}
              size="small"
              aria-label="Toggle filters"
            >
              <FilterList />
            </IconButton>
          )}
          <IconButton
            onClick={onOpenCompare}
            aria-label="Compare flights"
            sx={{
              minWidth: 44,
              minHeight: 44,
              p: 0,
            }}
          >
            <Badge badgeContent={compareCount} color="primary">
              <CompareArrows fontSize="small" />
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>

      <PassengerSelector
        adults={adults}
        children={children}
        infantsInSeat={infantsInSeat}
        infantsOnLap={infantsOnLap}
        onChange={handlePassengerChange}
        anchorEl={passengerAnchorEl}
        onClose={() => setPassengerAnchorEl(null)}
      />
    </AppBar>
  );
}
