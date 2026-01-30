"use client";

import { Tabs, Tab, Box } from "@mui/material";
import { useFiltersStore } from "@/src/store/filters.store";

const SORT_LABELS = {
  best: "Best",
  cheapest: "Cheapest",
  fastest: "Fastest",
};

export default function SortingTabs() {
  const { sortPreset, setSortPreset } = useFiltersStore();

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
      <Tabs
        value={sortPreset}
        onChange={(_, value) => setSortPreset(value)}
        aria-label="Sort flights"
        sx={{
          "& .MuiTab-root": { textTransform: "none", fontWeight: 600 },
          "& .Mui-selected": { color: "primary.main" },
        }}
      >
        <Tab label={SORT_LABELS.best} value="best" />
        <Tab label={SORT_LABELS.cheapest} value="cheapest" />
        <Tab label={SORT_LABELS.fastest} value="fastest" />
      </Tabs>
    </Box>
  );
}
