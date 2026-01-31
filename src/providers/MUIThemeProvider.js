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

  const isDark = mounted && resolvedTheme ? resolvedTheme === "dark" : true;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
          primary: {
            main: "#818cf8",
            light: "#a5b4fc",
            dark: "#6366f1",
            contrastText: "#1e1b18",
          },
          secondary: {
            main: isDark ? "#3a3633" : "#4a4643",
            contrastText: "#d1d5db",
          },
          background: {
            default: isDark ? "#1e1b18" : "#f1f5f9",
            paper: isDark ? "#3a3633" : "#ffffff",
          },
          text: {
            primary: isDark ? "#e2e8f0" : "#1e1b18",
            secondary: isDark ? "#d1d5db" : "rgba(30, 27, 24, 0.7)",
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
                backgroundColor: "#818cf8",
                color: "#1e1b18",
                "&:hover": {
                  backgroundColor: "#a5b4fc",
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
                    borderColor: "rgba(129, 140, 248, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#818cf8",
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
                    borderColor: "rgba(129, 140, 248, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#818cf8",
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
                  borderColor: "#818cf8",
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
                color: isDark ? "#d1d5db" : "rgba(30, 27, 24, 0.7)",
                "&.Mui-selected": {
                  backgroundColor: "#818cf8",
                  color: "#1e1b18",
                  "&:hover": {
                    backgroundColor: "#a5b4fc",
                  },
                },
                "&:hover": {
                  backgroundColor: "rgba(129, 140, 248, 0.1)",
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
                  borderColor: "rgba(129, 140, 248, 0.4)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#818cf8",
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
