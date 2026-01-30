"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme as useNextTheme } from "next-themes";
import { useMemo, useState, useEffect } from "react";

export function MUIThemeProvider({ children }) {
  const { theme: nextTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial render, use dark theme to match defaultTheme="dark"
  // After mount, use the resolved theme from next-themes
  const isDark = mounted && resolvedTheme ? resolvedTheme === "dark" : true;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
          primary: {
            main: "#e05d38", // tangerine
            light: "#ea7a5c",
            dark: "#c44d2a",
            contrastText: "#ffffff",
          },
          secondary: {
            main: isDark ? "#2a303e" : "#3d4554",
            contrastText: isDark ? "#e5e5e5" : "#1c2433",
          },
          background: {
            default: isDark ? "#1c2433" : "#f8f6f5",
            paper: isDark ? "#2a303e" : "#ffffff",
          },
          text: {
            primary: isDark ? "#e5e5e5" : "#1c2433",
            secondary: isDark ? "rgba(229, 229, 229, 0.7)" : "rgba(28, 36, 51, 0.7)",
          },
          divider: isDark
            ? "rgba(255, 255, 255, 0.06)"
            : "rgba(0, 0, 0, 0.06)",
        },
        typography: {
          fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
          button: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  transform: "translateY(-1px)",
                },
                transition: "all 0.2s ease",
              },
              contained: {
                backgroundColor: "#e05d38",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#ea7a5c",
                },
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.02)",
                  borderRadius: 12,
                  transition: "all 0.2s ease",
                  "& fieldset": {
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.08)",
                    borderWidth: 1.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(224, 93, 56, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e05d38",
                    borderWidth: 2,
                  },
                },
              },
            },
          },
          MuiAutocomplete: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark
                    ? "rgba(255, 255, 255, 0.03)"
                    : "rgba(0, 0, 0, 0.02)",
                  borderRadius: 12,
                  paddingTop: "4px !important",
                  paddingBottom: "4px !important",
                  "& fieldset": {
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.08)",
                    borderWidth: 1.5,
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(224, 93, 56, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#e05d38",
                    borderWidth: 2,
                  },
                },
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: "none",
                borderRadius: 12,
                border: `1px solid ${
                  isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"
                }`,
                backdropFilter: "blur(8px)",
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                border: `1px solid ${
                  isDark ? "rgba(255, 255, 255, 0.06)" : "rgba(0, 0, 0, 0.06)"
                }`,
                "&:hover": {
                  borderColor: "#e05d38",
                },
                transition: "border-color 0.2s ease",
              },
            },
          },
          MuiToggleButtonGroup: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.02)",
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                border: "none",
                color: isDark ? "rgba(230, 234, 237, 0.7)" : "rgba(12, 18, 20, 0.7)",
                "&.Mui-selected": {
                  backgroundColor: "#e05d38",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ea7a5c",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(224, 93, 56, 0.1)",
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                backgroundColor: isDark
                  ? "rgba(255, 255, 255, 0.03)"
                  : "rgba(0, 0, 0, 0.02)",
              },
              outlined: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.08)",
                  borderWidth: 1.5,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(224, 93, 56, 0.4)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#e05d38",
                  borderWidth: 2,
                },
              },
            },
          },
          MuiPopover: {
            styleOverrides: {
              paper: {
                borderRadius: 12,
                marginTop: 8,
              },
            },
          },
        },
      }),
    [isDark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
