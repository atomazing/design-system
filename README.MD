# 📚 Table of Contents

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
3. [Usage](#3-usage)  
   3.1 [ThemeProvider Setup](#31-themeprovider-setup)  
   3.2 [Switching Theme Mode (Light/Dark)](#34-switching-theme-mode-lightdark)  
   3.3 [Custom Theme Colors](#35-custom-theme-colors)
4. [Peer Dependencies & Requirements](#4-peer-dependencies--requirements)
5. [Utilities](#5-utilities)  
   5.1 [Color Utilities](#51-color-utilities)  
   5.2 [System Info](#52-system-info)

## 1. Introduction

**@atomazing-org/design-system** is a flexible, modern, and themeable design system built on top of [Material UI (MUI)](https://mui.com/) and [Emotion](https://emotion.sh/).

It provides a unified approach to building consistent, responsive, and accessible UIs across multiple frontend applications — with minimal setup and full customizability.

### 🔧 What’s Included

- 🌈 **Custom MUI Theme Generator**  
  Create light/dark themes with primary/background colors in a single line.

- ✍️ **Extended Typography Variants**  
  Includes consistent, scalable font sizes and weights beyond MUI defaults.

- 🎨 **Global Styles**  
  Applies CSS resets, adaptive contrast, scrollbar styling, and system theming.

- 🧩 **Component Style Overrides**  
  Predefined visual rules for MUI components like buttons, dialogs, sliders, etc.

- 🛠 **Utility Functions**  
  Helpful tools like color contrast calculation, system info detection, and dark mode strategy.

- 🎞 **Predefined Animations**  
  Keyframes for transitions like fade, slide, pulse, and more.

### 🚀 When to Use

Use this design system when:

- You’re building apps that require a **consistent design language**.
- You want to **save time on theming and component styling**.
- You work across multiple projects and need **reusable design tokens**.
- You want **dark mode support**, animations, and global styles out of the box.

This package is ideal for both small projects and large enterprise frontends looking to maintain style consistency and speed up delivery.

---

## 2. Installation

To install `@atomazing-org/design-system`, use your preferred package manager:

```bash
# npm
npm install @atomazing-org/design-system
```

```bash
# yarn
yarn add @atomazing-org/design-system
```

```bash
# pnpm
pnpm add @atomazing-org/design-system
```

> **Note:** This package includes only the core functionality.  
> You must also install the required **peer dependencies** to ensure proper integration with MUI and Emotion.

## 3. Usage

This section describes how to use the design system in your application, including theme setup, global styles, switching between light and dark modes, and accessing theme context via a custom hook.

### 3.1 ThemeProvider Setup

To enable theming, wrap your application with the `ThemeProviderWrapper` provided by `@atomazing-org/design-system`.  
This wrapper handles theme creation, dark mode toggling, system preferences, and context setup — all out of the box.

```tsx
import { ThemeProviderWrapper } from '@atomazing-org/design-system';

export const App = () => (
  <ThemeProviderWrapper>
    {/* Your application content */}
  </ThemeProviderWrapper>
);
```

### 🔍 Key Notes

- `ThemeProviderWrapper` abstracts away the creation and management of the MUI theme.
- It provides built-in support for dark mode, system preferences, and the `useAppThemeProvider` hook.

### 3.2 Switching Theme Mode (Light/Dark)

The design system includes a built-in hook — `useThemeSettings()` — to manage theme mode and apply it consistently across your app.

It supports four modes out of the box:
- `light`
- `dark`
- `system` — matches the user’s OS-level preference
- `auto` — determines best contrast based on theme background

#### 🧩 Example: Custom Toggle with Options

```tsx
import {
  useThemeSettings,
  themes,
} from '@atomazing-org/design-system';

const { darkMode, setDarkMode } = useThemeSettings();

<CustomRadioGroup
  options={[
    { label: 'Auto', value: 'auto' },
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ]}
  value={darkMode}
  onChange={val => setDarkMode(val)}
/>
```


### 3.3 Custom Theme Colors

The design system allows you to create and switch between custom color themes using the `createCustomTheme()` function internally via `ThemeProviderWrapper`.

You can define as many themes as needed by specifying:
- `primaryColor`: main branding color
- `secondaryColor` (optional): used for background and surface elements

#### 🎨 Example: Theme Definitions

```ts
export const themeConfig = {
  "Dark Purple": {
    primaryColor: '#b624ff',
  },
  "Light Orange": {
    primaryColor: '#F26E56',
    secondaryColor: '#F6F6F6',
  },
  // Other colors  
};
```

## 4. Peer Dependencies & Requirements

The `@atomazing-org/design-system` package is built on top of [Material UI v7](https://mui.com/) and [Emotion](https://emotion.sh/) and requires the following peer dependencies to be present in your project.

Install them manually if not already included:

### 📦 Required Peer Dependencies

| Package                    | Version    | Purpose                                 |
|----------------------------|------------|-----------------------------------------|
| `@mui/material`            | ^7.0.0     | Core MUI components and theming         |
| `@mui/icons-material`      | ^7.0.0     | MUI icon set                            |
| `@emotion/react`           | ^11.0.0    | Emotion’s core rendering runtime        |
| `@emotion/styled`          | ^11.0.0    | Styled components engine                |
| `@emotion/css`             | ^11.0.0    | (Optional) For raw CSS class generation |

You can install all required peers with:

```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @emotion/css
```

## 5. Utilities

The design system includes a collection of lightweight, framework-agnostic utility functions and hooks to support theming, contrast handling, and device detection.

---

### 5.1 Color Utilities

#### 🎯 `getFontColor(backgroundColor: string): string`

Returns the best readable font color (`dark` or `light`) based on the background brightness.

```ts
const textColor = getFontColor('#ffffff'); // → "#101727" (dark)
```

- Accepts any valid hex color (`#fff`, `#ffffff`)
- Automatically expands short hex (`#abc` → `#aabbcc`)
- Uses WCAG-recommended brightness formula
- Returns fallback (`fontDark`) if invalid color

This is useful for generating accessible dynamic UI colors — especially in theme builders or color pickers.

---

### 5.2 System Info

#### 🧩 `systemInfo: { os: OperatingSystem; browser: Browser }`

Detects the user's operating system and browser at runtime based on the `navigator.userAgent`.

```ts
console.log(systemInfo.os); // "macOS" | "Windows" | "Linux" | ...
console.log(systemInfo.browser); // "Chrome" | "Safari" | ...
```

> Uses lightweight string matching for compatibility across most modern devices.

#### 🌓 `useSystemTheme(): 'light' | 'dark' | 'unknown'`

React hook that listens for system-level theme changes.

```ts
const systemTheme = useSystemTheme();

useEffect(() => {
  console.log('System prefers:', systemTheme);
}, [systemTheme]);
```

- Responds to changes in `(prefers-color-scheme)`
- Automatically updates the value when system settings are changed
- Useful for defaulting UI themes before user makes a selection

---

These utilities are tree-shakable and can be used independently of the rest of the design system.


