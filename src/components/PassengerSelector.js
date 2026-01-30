"use client";

import {
  Popover,
  Box,
  Typography,
  IconButton,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useState, useEffect } from "react";

export default function PassengerSelector({
  adults,
  children,
  infantsInSeat,
  infantsOnLap,
  onChange,
  anchorEl,
  onClose,
}) {
  const [tempCounts, setTempCounts] = useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });

  useEffect(() => {
    if (anchorEl) {
      setTempCounts({
        adults: adults ?? 1,
        children: children ?? 0,
        infantsInSeat: infantsInSeat ?? 0,
        infantsOnLap: infantsOnLap ?? 0,
      });
    }
  }, [anchorEl, adults, children, infantsInSeat, infantsOnLap]);

  const handleIncrement = (field) => {
    setTempCounts((prev) => ({
      ...prev,
      [field]: prev[field] + 1,
    }));
  };

  const handleDecrement = (field) => {
    setTempCounts((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] - 1),
    }));
  };

  const handleDone = () => {
    onChange(tempCounts);
    onClose();
  };

  const handleCancel = () => {
    setTempCounts({
      adults,
      children,
      infantsInSeat,
      infantsOnLap,
    });
    onClose();
  };

  const PassengerRow = ({ label, subLabel, field, value }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: 1.5,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        {subLabel && (
          <Typography variant="caption" color="text.secondary">
            {subLabel}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <IconButton
          size="small"
          onClick={() => handleDecrement(field)}
          disabled={value === 0}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 32,
            height: 32,
          }}
        >
          <Remove fontSize="small" />
        </IconButton>
        <Typography
          variant="body2"
          sx={{ minWidth: 24, textAlign: "center", fontWeight: 500 }}
        >
          {value}
        </Typography>
        <IconButton
          size="small"
          onClick={() => handleIncrement(field)}
          sx={{
            border: "1px solid",
            borderColor: "divider",
            width: 32,
            height: 32,
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleCancel}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      PaperProps={{
        sx: {
          minWidth: 320,
          p: 2,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Passengers
      </Typography>
      <Stack spacing={0}>
        <PassengerRow
          label="Adults"
          subLabel="Aged 12+"
          field="adults"
          value={tempCounts.adults}
        />
        <Divider />
        <PassengerRow
          label="Children"
          subLabel="Aged 2–11"
          field="children"
          value={tempCounts.children}
        />
        <Divider />
        <PassengerRow
          label="Infants"
          subLabel="In seat"
          field="infantsInSeat"
          value={tempCounts.infantsInSeat}
        />
        <Divider />
        <PassengerRow
          label="Infants"
          subLabel="On lap"
          field="infantsOnLap"
          value={tempCounts.infantsOnLap}
        />
      </Stack>
      <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{ flex: 1 }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleDone}
          sx={{ flex: 1 }}
          fullWidth
        >
          Done
        </Button>
      </Box>
    </Popover>
  );
}
