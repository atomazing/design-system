import { Global, css } from "@emotion/react";
import { alpha, useTheme } from "@mui/material/styles";

import type { FC } from "react";

/**
 * Injects global styles into the document using Emotion.
 * These styles include font setup, base HTML styles, custom scrollbars,
 * selection styling, and some accessibility tweaks.
 *
 * Uses the MUI theme to dynamically adjust colors for light/dark mode.
 */
interface GlobalStylesProps {
  /** Optional font stack to apply across the app. */
  fontFamily?: string;
}

export const GlobalStyles: FC<GlobalStylesProps> = ({ fontFamily }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const primaryColor = theme.palette.primary.main;
  const textColor = theme.palette.text.primary;
  const backgroundDefault = theme.palette.background.default;
  const backgroundPaper = theme.palette.background.paper;

  const scrollbarThumb = alpha(
    theme.palette.text.primary,
    isDarkMode ? 0.35 : 0.25,
  );
  const scrollbarThumbHover = alpha(
    theme.palette.text.primary,
    isDarkMode ? 0.55 : 0.45,
  );

  return (
    <Global
      styles={css`
        /* Allow application to control font via CSS var or prop */
        :root {
          ${fontFamily ? `--app-font-family: ${fontFamily};` : ""}
        }
        * {
          font-family:
            var(
              --app-font-family,
              "Mulish",
              system-ui,
              -apple-system,
              "Segoe UI",
              Roboto,
              Arial
            ),
            sans-serif !important;
          -webkit-tap-highlight-color: transparent;
          &::selection {
            background-color: ${`${primaryColor}e1`};
          }
        }

        html,
        body,
        #root {
          height: 100%;
          margin: 0;
        }

        :root {
          height: 100%;
          /* default fallback font; apps can override via --app-font-family */
          font-family: var(
              --app-font-family,
              "Mulish",
              system-ui,
              -apple-system,
              "Segoe UI",
              Roboto,
              Arial,
              sans-serif
            )
            sans-serif;
          line-height: 1.5;
          font-weight: 400;
          color-scheme: ${isDarkMode ? "dark" : "light"};
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;
        }

        body {
          margin: 0;
          height: 100%;
          overflow: auto;
          touch-action: manipulation;
          background: ${backgroundDefault};
          color: ${textColor};
          background-attachment: fixed;
          background-size: cover;
          transition: 0.3s background;
          /* Scrollbars: neutral (b2b-friendly) */
          /* Firefox */
          scrollbar-color: ${scrollbarThumb} ${backgroundDefault};
          scrollbar-width: thin;
          /* WebKit */
          &::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          &::-webkit-scrollbar-track {
            background: ${backgroundDefault};
          }
          &::-webkit-scrollbar-thumb {
            background-color: ${scrollbarThumb};
            border-radius: 999px;
            border: 3px solid ${backgroundDefault};
            background-clip: padding-box;
          }
          &::-webkit-scrollbar-thumb:hover {
            background-color: ${scrollbarThumbHover};
          }
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        img {
          user-select: none;
        }

        input[type="file"]::-webkit-file-upload-button {
          display: none;
        }

        input[type="datetime-local"]:placeholder-shown {
          color: transparent !important;
        }

        pre {
          padding: 16px;
          border-radius: 18px;
          overflow-x: auto;
        }

        .MuiDialogContent-root,
        .MuiDrawer-paper,
        .customScrollbar,
        textarea {
          /* Firefox */
          scrollbar-color: ${scrollbarThumb} ${backgroundPaper};
          scrollbar-width: thin;
          /* WebKit */
          &::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          &::-webkit-scrollbar-track {
            background: ${backgroundPaper};
          }
          &::-webkit-scrollbar-thumb {
            background-color: ${scrollbarThumb};
            border-radius: 999px;
            border: 3px solid ${backgroundPaper};
            background-clip: padding-box;
          }
          &::-webkit-scrollbar-thumb:hover {
            background-color: ${scrollbarThumbHover};
          }
        }

        /* react-spring-bottom-sheet styles */
        div[role="dialog"] {
          z-index: 9999;
        }
      `}
    />
  );
};
