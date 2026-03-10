
type ScrollAnchor = {
  readonly id: string;
  readonly label: string;
  readonly kind: "anchor" | "cta";
};

type CtaReturnPoint = {
  readonly id: string;
  readonly label: string;
  readonly reason: string;
};

type AplaiScrollJourney = {
  readonly scenarios: readonly string[];
  readonly anchors: readonly ScrollAnchor[];
  readonly ctaReturnPoints: readonly CtaReturnPoint[];
  readonly showStickyRail: false;
};

export const APLAI_SCROLL_JOURNEY: AplaiScrollJourney = {
  scenarios: [
    "Быстрый скан: сразу перейти к доказательствам и решить, стоит ли смотреть дальше.",
    "Вдумчивое чтение: пройти по секциям последовательно и дойти до заявки без потери контекста.",
    "Mobile-first: быстро вернуться к CTA и к нужному доказательству без мелких кликов.",
  ],
  anchors: [
    { id: "how_it_works", label: "Как это работает", kind: "anchor" },
    { id: "architecture", label: "Архитектура", kind: "anchor" },
    { id: "demo", label: "Демо", kind: "anchor" },
    { id: "templates", label: "Шаблоны", kind: "anchor" },
    { id: "guarantees", label: "Гарантии", kind: "anchor" },
    { id: "faq", label: "FAQ", kind: "anchor" },
    { id: "final_cta", label: "Запросить демо", kind: "cta" },
  ],
  ctaReturnPoints: [
    {
      id: "demo",
      label: "Запросить демо",
      reason: "После конкретики демо пользователь часто готов к следующему шагу.",
    },
    {
      id: "faq",
      label: "Обсудить пилот",
      reason: "После снятия последних вопросов нужен спокойный возврат к CTA.",
    },
    {
      id: "final_cta",
      label: "Запросить демо",
      reason: "Главная форма остается финальной точкой конверсии.",
    },
  ],
  showStickyRail: false,
};
