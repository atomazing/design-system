import { useMemo } from "react";
import { Global, css } from "@emotion/react";
import { useTheme } from "@mui/material/styles";

import { getFontColor } from "./colorUtils";

import type { FC } from "react";

/**
 * Injects global styles into the document using Emotion.
 * These styles include font setup, base HTML styles, custom scrollbars,
 * selection styling, and some accessibility tweaks.
 *
 * Uses the MUI theme to dynamically adjust colors for light/dark mode.
 */
export const GlobalStyles: FC = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const primaryFontColor = useMemo(
    () => getFontColor(primaryColor),
    [primaryColor],
  );
  const secondaryFontColor = useMemo(
    () => getFontColor(secondaryColor),
    [secondaryColor],
  );

  return (
    <Global
      styles={css`
        * {
          font-family: "Poppins", sans-serif !important;
          -webkit-tap-highlight-color: transparent;
          &::selection {
            background-color: ${`${primaryColor}e1`};
            color: ${primaryFontColor};
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
          font-family: "Poppins", sans-serif;
          line-height: 1.5;
          font-weight: 400;
          color-scheme: ${isDarkMode ? "dark" : "light"};
          color: ${secondaryFontColor};
          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          -webkit-text-size-adjust: 100%;

          --rsbs-backdrop-bg: rgba(0, 0, 0, 0.3);
          --rsbs-bg: ${isDarkMode ? "#383838" : "#ffffff"};
        }

        body {
          margin: 0;
          height: 100%;
          overflow: auto;
          touch-action: manipulation;
          background: ${secondaryColor};
          background-attachment: fixed;
          background-size: cover;
          transition: 0.3s background;

          ::-webkit-scrollbar {
            width: 8px;
            background-color: ${secondaryColor};
          }
          ::-webkit-scrollbar-thumb {
            background-color: ${primaryColor};
            border-radius: 64px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: ${`${primaryColor}d8`};
          }
          ::-webkit-scrollbar-track {
            border-radius: 64px;
            background-color: ${secondaryColor};
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
          background-color: #000000d7;
          color: white;
          padding: 16px;
          border-radius: 18px;
          overflow-x: auto;
        }

        .MuiDialogContent-root,
        .MuiDrawer-paper,
        .customScrollbar,
        textarea {
          ::-webkit-scrollbar {
            width: 8px;
            border-radius: 4px;
            background-color: #84848415;
          }
          ::-webkit-scrollbar-thumb {
            background-color: #8484844b;
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background-color: #84848476;
          }
          ::-webkit-scrollbar-track {
            border-radius: 4px;
            background-color: #84848415;
          }
        }

        /* react-spring-bottom-sheet styles */
        div[role="dialog"] {
          border-radius: 42px 42px 0 0;
          z-index: 9999999;
        }

        div[data-rsbs-backdrop] {
          z-index: 999;
        }

        div[data-rsbs-header] {
          z-index: 999999;
          box-shadow: none;
          &::before {
            width: 60px;
            height: 6px;
            border-radius: 100px;
            background: ${isDarkMode ? "#717171" : "#cfcfcf"};
            margin-top: 3px;
          }
        }
      `}
    />
  );
};
