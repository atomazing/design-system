import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

import Logo from "../public/logo.png";

addons.setConfig({
  theme: create({
    base: "light",
    // Typography
    fontBase: '"Open Sans", sans-serif',
    fontCode: "monospace",

    brandTitle: "@atomazing-org/design-system",
    brandUrl: "https://github.com/atomazing/design-system",
    brandImage: Logo,
    brandTarget: "_blank",

    //
    colorPrimary: "#3A10E5",
    colorSecondary: "#252525",

    // UI
    appBg: "#ffffff",
    appContentBg: "#ffffff",
    appPreviewBg: "#ffffff",
    appBorderColor: "#252525",
    appBorderRadius: 4,

    // Text colors
    textColor: "#10162F",
    textInverseColor: "#ffffff",

    // Toolbar default and active colors
    barTextColor: "#9E9E9E",
    barSelectedColor: "#252525",
    barHoverColor: "#252525",
    barBg: "#ffffff",

    // Form colors
    inputBg: "#ffffff",
    inputBorder: "#10162F",
    inputTextColor: "#10162F",
    inputBorderRadius: 2,
  }),
});
