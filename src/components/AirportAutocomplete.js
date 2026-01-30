"use client";

import { useState, useEffect, useCallback } from "react";
import { Autocomplete, TextField, Box, Typography } from "@mui/material";
import { FlightTakeoff, LocationCity } from "@mui/icons-material";
import { debounce } from "@mui/material/utils";

const fetchLocations = async (keyword) => {
  if (!keyword || keyword.length < 2) return { data: [] };
  
  try {
    const response = await fetch(`/api/locations?keyword=${encodeURIComponent(keyword)}`);
    if (!response.ok) {
      console.error("Location search failed:", response.status);
      return { data: [] };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Location search error:", error);
    return { data: [] };
  }
};

const debouncedFetch = debounce(async (keyword, callback) => {
  const result = await fetchLocations(keyword);
  callback(result.data || []);
}, 300);

export default function AirportAutocomplete({
  label,
  value,
  onChange,
  required = false,
  placeholder = "City or airport",
}) {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Sync selectedLocation when value prop changes (e.g., from URL or swap)
  useEffect(() => {
    if (value) {
      // Update if value changed (different IATA code)
      if (!selectedLocation || selectedLocation.iataCode !== value) {
        setSelectedLocation({ iataCode: value, name: value });
        setInputValue(value);
      }
    } else if (!value && selectedLocation) {
      setSelectedLocation(null);
      setInputValue("");
    }
  }, [value, selectedLocation]);

  const handleInputChange = useCallback((event, newInputValue) => {
    setInputValue(newInputValue);
    
    if (newInputValue.length >= 2) {
      setLoading(true);
      debouncedFetch(newInputValue, (data) => {
        setOptions(data);
        setLoading(false);
      });
    } else {
      setOptions([]);
      setLoading(false);
    }
  }, []);

  const handleChange = useCallback((event, newValue) => {
    setSelectedLocation(newValue);
    if (newValue) {
      onChange(newValue.iataCode);
    } else {
      onChange("");
    }
  }, [onChange]);

  const getOptionLabel = (option) => {
    if (typeof option === "string") return option;
    return `${option.name} (${option.iataCode})`;
  };

  return (
    <Autocomplete
      options={options}
      loading={loading}
      value={selectedLocation}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      onChange={handleChange}
      getOptionLabel={getOptionLabel}
      filterOptions={(x) => x}
      isOptionEqualToValue={(option, value) =>
        value != null && option.iataCode === value.iataCode
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          placeholder={placeholder}
          fullWidth
          sx={{ 
            '& .MuiInputBase-root': { 
              height: 56 
            } 
          }}
        />
      )}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const isCity = option.subType === "CITY";
        return (
          <Box
            key={key}
            component="li"
            {...optionProps}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              py: 1.5,
            }}
          >
            {isCity ? (
              <LocationCity sx={{ color: "text.secondary" }} />
            ) : (
              <FlightTakeoff sx={{ color: "text.secondary" }} />
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {option.name}
              </Typography>
              {(option.address?.cityName || option.address?.countryName) && (
                <Typography variant="caption" color="text.secondary">
                  {[option.address.cityName, option.address.countryName]
                    .filter(Boolean)
                    .join(", ")}
                </Typography>
              )}
            </Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                ml: 1,
              }}
            >
              {option.iataCode}
            </Typography>
          </Box>
        );
      }}
      noOptionsText={
        inputValue.length < 2
          ? "Type at least 2 characters"
          : "No locations found"
      }
      sx={{ width: "100%" }}
    />
  );
}
