# 📚 Table of Contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
3. [Usage](#3-usage)  
   3.1 [Theme Provider Setup](#31-theme-provider-setup)  
   3.2 [Typography Variants](#32-typography-variants)  
   3.3 [Global Styles](#33-global-styles)  
   3.4 [Component Overrides](#34-component-overrides)
4. [Utilities](#4-utilities)  
   4.1 [Color Utilities](#41-color-utilities)  
   4.2 [System Info](#42-system-info)
5. [Animations](#5-animations)
6. [Theming](#6-theming)  
   6.1 [Theme Creation](#61-theme-creation)  
   6.2 [Dark Mode Strategy](#62-dark-mode-strategy)
7. [Typography Configuration](#7-typography-configuration)
8. [Contributing](#8-contributing)
9. [License](#9-license)

## 1. Introduction

**@atomazing-org/design-system** is a reusable, opinionated design system built on top of [Material UI (MUI)](https://mui.com/) and [Emotion](https://emotion.sh/).  
It offers a consistent foundation for building modern web interfaces with minimal configuration.

This package provides:

- 🌈 Customizable MUI theme generator
- ✍️ Extended typography variants
- 🎨 Global styles (with dark/light mode support)
- 🧩 Component style overrides
- 🛠 Utility functions (e.g., color contrast, system info)
- 🎞 Smooth keyframe animations

The design system is ideal for teams working across multiple front-end applications who want to unify styles, reduce duplication, and ship faster with consistent UI patterns.

## 2. Installation

To install the design system in your project, use your preferred package manager:

```bash
# Using npm
npm install @atomazing-org/design-system
```

```bash
# Using yarn
yarn add @atomazing-org/design-system
```

```bash
# Using pnpm
pnpm add @atomazing-org/design-system
```


## 3. Peer Dependencies & Requirements

The `@atomazing-org/design-system` package relies on several peer dependencies to integrate properly with your application stack.

Make sure the following libraries are installed in your project:

| Package              | Version          | Required For                        |
|----------------------|------------------|-------------------------------------|
| `@mui/material`      | `^7.2.0`         | Core MUI theming and components     |
| `@mui/icons-material`| `^7.2.0`         | Icon support                        |
| `@emotion/react`     | `^11.0.0`        | Emotion styling engine (required)   |
| `@emotion/styled`    | `^11.0.0`        | Styled components with Emotion      |
| `@emotion/css`       | `^11.13.5`       | (Optional) Raw className utility    |

### TypeScript Support

This package is fully written in TypeScript and ships with `.d.ts` type declarations.
Ensure your project uses TypeScript 4.5+ for best compatibility.

> ✅ **Tip:** If you encounter missing types (e.g., for `@emotion/react`), install them manually:
```bash
npm install -D @types/react
```

## 4. Features Overview

This package provides a modular and extendable foundation for your design system, broken into the following areas:

### 🎨 Theme Generator (`createCustomTheme`)
- Dynamically generate MUI themes using custom primary and secondary colors.
- Supports light, dark, system, and auto modes.
- Automatically adapts based on background contrast.

### 🧩 Component Overrides (`commonComponentProps`)
- Global style customizations for common MUI components (e.g. `Button`, `Tooltip`, `Dialog`, `Slider`).
- Shared defaults to ensure consistent spacing, border-radius, shadows, and blur effects.

### ✍️ Typography Variants (`typographyVariants`)
- Dozens of additional font sizes and weights beyond MUI defaults.
- Uses names like `text_md_regular`, `display_lg_bold` for clarity and structure.
- Easily configurable in your MUI theme's `typography` field.

### 🖥 Global Styles (`GlobalStyles`)
- Applies global CSS resets and base styles (scrollbars, font, highlight colors).
- Reacts to theme mode (`light` or `dark`) to dynamically adjust UI contrast.
- Uses Emotion’s `<Global />` component under the hood.

### 🎞 Animations (`keyframes`)
- Predefined keyframes for fade, slide, scale, and pulse effects.
- Includes customizable utilities like `pulseAnimation(color)` and `progressPulse(color)`.

### 🛠 Utilities
- `getFontColor`: Calculates readable font color from a background hex.
- `isDarkMode`: Detects appropriate mode based on system or color contrast.
- `systemInfo`: Returns the user's OS and browser in a reliable format.

---

These modules are built to be tree-shakable and can be imported individually.

## 5. Usage Examples

This section shows how to integrate the design system in your React application.

### 5.1. Wrapping with ThemeProvider

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  createCustomTheme,
  GlobalStyles,
} from '@atomazing-org/design-system';

import { ThemeProvider, CssBaseline } from '@mui/material';

const theme = createCustomTheme('#4461F2', '#F9F9FC', 'light');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles />
    <App />
  </ThemeProvider>,
);
```

## 6. Customization

The design system is built to be flexible and extendable. You can override or extend the default behavior in several ways.

### 6.1. Customizing the Theme

You can generate your own theme using `createCustomTheme`:

```ts
import { createCustomTheme } from '@atomazing-org/design-system';

const theme = createCustomTheme(
  '#0088cc', // primary color
  '#f0f4f8', // background (secondary) color
  'light',   // palette mode
);
```

## 7. Tree-Shaking & Importing

The `@atomazing-org/design-system` package is optimized for modern bundlers and supports tree-shaking out of the box.

To minimize bundle size:

### 7.1. Use Named Imports

Instead of importing everything at once, prefer named imports:

```ts
// ✅ Recommended (tree-shakable)
import { fadeIn, getFontColor } from '@atomazing-org/design-system';

// 🚫 Not recommended (bundles everything)
import * as DesignSystem from '@atomazing-org/design-system';
```

## 8. Contribution Guide

We welcome contributions to the design system! Whether it's improving styles, fixing bugs, or adding utilities — every improvement helps.

### 8.1. Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/atomazing/design-system.git
cd design-system
npm install
```

## 9. License

This project is licensed under the [MIT License](./LICENSE).

You are free to use, modify, distribute, and sublicense the design system in your projects, whether personal or commercial.

---

© PonomarevBPM + MarkSinD, 2025  
Maintained under the Atomazing Org initiative.

