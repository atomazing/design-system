
type DemoAnchorStep = {
  readonly title: string;
  readonly summary: string;
};

type AplaiDemoAnchor = {
  readonly badge: string;
  readonly title: string;
  readonly bullets: readonly string[];
  readonly supportLine: string;
  readonly processTitle: string;
  readonly processSteps: readonly DemoAnchorStep[];
  readonly resultTitle: string;
  readonly resultItems: readonly string[];
  readonly secondaryCtaLabel: string;
};

export const APLAI_DEMO_ANCHOR: AplaiDemoAnchor = {
  badge: "Сценарий демо: CRM - обращения",
  title: "Что покажем",
  bullets: [
    "Один сценарий -> один результат.",
    'Якорный сценарий: CRM "обращения".',
    "Результат: работающий процесс + понятный план пилота.",
  ],
  supportLine:
    "Покажем также, как быстро добавляется новая бизнес-функциональность, не уходя в технические детали.",
  processTitle: "Как проходит демо",
  processSteps: [
    {
      title: "Запуск основы",
      summary: "Показываем путь 1-5-60 от сценария до первого проверяемого результата.",
    },
    {
      title: "Процесс в работе",
      summary: 'Разбираем CRM "обращения" как понятный и проверяемый сценарий.',
    },
    {
      title: "Добавление функции",
      summary: "Показываем, как новая бизнес-функция добавляется без долгого цикла.",
    },
    {
      title: "Готово к проверке",
      summary: "Фиксируем, что остается после демо и какой следующий шаг по пилоту.",
    },
  ],
  resultTitle: "Что будет на выходе",
  resultItems: [
    "Процесс в работе.",
    "Понятный следующий шаг пилота.",
    "Прозрачно: что нужно от вашей стороны.",
  ],
  secondaryCtaLabel: "Обсудить пилот под ваш сценарий",
};
