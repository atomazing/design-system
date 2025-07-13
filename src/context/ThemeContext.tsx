import { createContext, useContext } from "react";

import type { ThemeContextProps } from "../models";

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined,
);

export const useThemeSettings = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error(
      "useThemeSettings must be used within ThemeProviderWrapper",
    );
  return context;
};
