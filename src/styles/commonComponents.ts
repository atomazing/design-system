import type { Theme } from "@mui/material";

/**
 * Common component style overrides and default props shared across the design system.
 * This object should be spread into the `components` field of the MUI theme.
 */
export const commonComponentProps: Theme["components"] = {
  MuiTooltip: {
    defaultProps: {
      disableInteractive: true,
    },
    styleOverrides: {
      tooltip: ({ theme }) => ({
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
        backgroundColor:
          theme.palette.mode === "dark" ? "#141431dd" : "#ededf3dd",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "8px 16px",
        borderRadius: "8px",
        fontSize: "12px",
      }),
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        padding: "12px 24px",
        borderRadius: "14px",
      },
      contained: {
        boxShadow: "none",
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: {
        borderRadius: "24px",
      },
    },
  },

  MuiSelect: {
    styleOverrides: {
      root: {
        borderRadius: "18px",
      },
      select: {
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "4px",
      },
    },
  },

  MuiDialog: {
    defaultProps: {
      slotProps: {
        paper: {
          style: {
            padding: "12px",
            borderRadius: "24px",
            minWidth: "400px",
          },
        },
      },
    },
    styleOverrides: {
      root: {
        "& .MuiDialog-container": {
          backdropFilter: "blur(4px)",
        },
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        color: "#fff",
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: "16px",
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiInputBase-root": {
          borderRadius: "16px",
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      elevation8: {
        borderRadius: "16px",
      },
    },
  },

  MuiBottomNavigationAction: {
    styleOverrides: {
      root: {
        padding: "12px",
        margin: 0,
        maxHeight: "none",
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      valueLabel: ({ theme }) => ({
        borderRadius: "10px",
        padding: "6px 14px",
        color: theme.palette.mode === "dark" ? "#fff" : "#000",
        backgroundColor:
          theme.palette.mode === "dark" ? "#141431dd" : "#ededf3dd",
        "&::before, &::after": {
          display: "none",
        },
      }),
    },
  },

  MuiCircularProgress: {
    styleOverrides: {
      circle: {
        strokeLinecap: "round",
      },
    },
  },

  MuiAccordion: {
    styleOverrides: {
      root: {
        "&::before": {
          display: "none",
        },
      },
    },
  },
};
