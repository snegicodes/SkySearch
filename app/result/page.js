import Link from "next/link";
import Image from "next/image";
import { Box, Typography, Paper } from "@mui/material";

const LOGO_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762369/spotter/logo.png";
const LOGO_DARK_URL =
  "https://res.cloudinary.com/dmbd4gf0y/image/upload/v1769762760/spotter/logoDark.png";

export default function ResultPage() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Moving grid background */}
      <div className="grid-bg" aria-hidden />
      
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center">
          <Image
            src={LOGO_URL}
            alt="SkySearch"
            width={210}
            height={48}
            className="h-12 w-auto sm:h-14 dark:hidden"
            priority
          />
          <Image
            src={LOGO_DARK_URL}
            alt="SkySearch"
            width={210}
            height={48}
            className="h-12 w-auto sm:h-14 hidden dark:block"
            priority
          />
        </Link>
      </header>

      {/* Results Content */}
      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          minHeight: "calc(100vh - 5rem)",
          px: { xs: 2, sm: 4, md: 6 },
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          <Link
            href="/#search-section"
            className="mb-6 inline-flex items-center gap-2 text-sm text-[var(--foreground)]/70 transition-colors hover:text-[var(--foreground)]"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to search
          </Link>

          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Flight Search Results
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Results page coming soon. The search form is working and will redirect here with your search parameters.
            </Typography>
          </Paper>
        </Box>
      </Box>
    </div>
  );
}
