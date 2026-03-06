# Общий фундамент миграции

## Цель

Привести проект к состоянию, где:
- корневой провайдер темы — **ThemeProviderWrapper** из `@atomazing-org/design-system`;
- цвета/типографика/компонентные значения берутся из темы (MUI theme), а не из локальных хардкодов;
- переключение темы/режима (при необходимости) делается через **useThemeSettings**.

## Минимальная интеграция

В корне приложения оборачиваем UI:

```tsx
import { ThemeProviderWrapper } from "@atomazing-org/design-system";

export function App() {
  return (
    <ThemeProviderWrapper>
      {/* app */}
    </ThemeProviderWrapper>
  );
}
```

## Типовые элементы дизайн-системы

- **Dynamic themes**: можно передать массив тем `themes` (name + цвета), чтобы UI мог переключаться между ними.
- **Dark mode**: чтение/запись режима через `useThemeSettings()`.
- **Расширенная палитра**: дополнительные цвета (например, `brand`, `neutral`, `accent`, `muted`) доступны в `theme.palette.*` и на ряде компонентов через `color`.
- **Типографика**: расширенные `Typography` variants (например, семейства `text_*` и `header_*`).

## SSR / Next.js

Если проект SSR:
- избегайте обращения к `window/document/navigator/localStorage` на уровне модуля;
- провайдер темы размещайте в клиентской границе (например, в `layout.tsx` с директивой `"use client"`).


