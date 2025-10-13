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
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        padding: "8px 16px",
        borderRadius: theme.shape.borderRadius,
        fontSize: "12px",
      }),
    },
  },

  MuiButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "12px 24px",
        borderRadius: theme.shape.borderRadius,
      }),
      contained: {
        boxShadow: "none",
      },
    },
  },

  MuiSkeleton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },

  MuiSelect: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
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
            borderRadius: 24, // оставить явно, если это критично
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
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: "outlined", // по умолчанию, если нужно
    },
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiInputBase-root": {
          borderRadius: theme.shape.borderRadius,
        },
      }),
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        "& fieldset": {
          borderColor: theme.palette.primary.main,
        },
        "&:hover fieldset": {
          borderColor: theme.palette.primary.dark,
        },
        "&.Mui-focused fieldset": {
          borderColor: theme.palette.primary.main,
        },
      }),
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.main,
        "&.Mui-focused": {
          color: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.error.main,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
      elevation8: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },

  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
    },
  },

  MuiBottomNavigationAction: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: "12px",
        margin: 0,
        maxHeight: "none",
      }),
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },

  MuiSlider: {
    styleOverrides: {
      valueLabel: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: "6px 14px",
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

  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
      }),
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
