import { Preview, ReactRenderer } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../src/stories/styles/theme"; // Import your custom theme configs

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        light: theme,
        dark: theme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
