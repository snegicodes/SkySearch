import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
import ResultContent from "./ResultContent";

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <CircularProgress />
        </Box>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
