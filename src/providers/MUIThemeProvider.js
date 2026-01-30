"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme as useNextTheme } from "next-themes";
import { useMemo } from "react";

export function MUIThemeProvider({ children }) {
  const { theme: nextTheme } = useNextTheme();
  const isDark = nextTheme === "dark";

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? "dark" : "light",
          primary: {
            main: isDark ? "#2dd4bf" : "#0d9488", // teal
            light: isDark ? "#5eead4" : "#2dd4bf", // teal-light
            dark: isDark ? "#14b8a6" : "#0f766e", // teal-dark
          },
          background: {
            default: isDark ? "#0a0e10" : "#fafcfc",
            paper: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.02)",
          },
          text: {
            primary: isDark ? "#e6eaed" : "#0c1214",
            secondary: isDark ? "rgba(230, 234, 237, 0.7)" : "rgba(12, 18, 20, 0.7)",
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
                backgroundColor: isDark ? "#2dd4bf" : "#0d9488",
                color: isDark ? "#0a0e10" : "#ffffff",
                "&:hover": {
                  backgroundColor: isDark ? "#5eead4" : "#0f766e",
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
                    borderColor: isDark
                      ? "rgba(45, 212, 191, 0.4)"
                      : "rgba(13, 148, 136, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isDark ? "#2dd4bf" : "#0d9488",
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
                    borderColor: isDark
                      ? "rgba(45, 212, 191, 0.4)"
                      : "rgba(13, 148, 136, 0.4)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: isDark ? "#2dd4bf" : "#0d9488",
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
                  borderColor: isDark ? "#2dd4bf" : "#0d9488",
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
                  backgroundColor: isDark ? "#2dd4bf" : "#0d9488",
                  color: isDark ? "#0a0e10" : "#ffffff",
                  "&:hover": {
                    backgroundColor: isDark ? "#5eead4" : "#0f766e",
                  },
                },
                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(45, 212, 191, 0.1)"
                    : "rgba(13, 148, 136, 0.1)",
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
                  borderColor: isDark
                    ? "rgba(45, 212, 191, 0.4)"
                    : "rgba(13, 148, 136, 0.4)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDark ? "#2dd4bf" : "#0d9488",
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
