
type DemoPromiseCard = {
  readonly label: string;
  readonly value: string;
  readonly detail: string;
};

type DemoStage = {
  readonly id: string;
  readonly time: string;
  readonly title: string;
  readonly summary: string;
};

type AplaiDemoNarrative = {
  readonly promiseCards: readonly DemoPromiseCard[];
  readonly anchorScenario: {
    readonly title: string;
    readonly process: string;
    readonly reasons: readonly string[];
  };
  readonly stages: readonly DemoStage[];
  readonly takeaways: readonly string[];
};

export const APLAI_DEMO_NARRATIVE: AplaiDemoNarrative = {
  promiseCards: [
    {
      label: "Длительность",
      value: "10-15 минут",
      detail: "Короткий деловой формат без часовой презентации.",
    },
    {
      label: "Формат",
      value: "Один сценарий -> один результат",
      detail: "Показываем понятный путь, а не набор разрозненных экранов.",
    },
    {
      label: "Маршрут",
      value: "Путь 1-5-60",
      detail: "Обещание сразу связывается с процессом и проверяемым результатом.",
    },
    {
      label: "Выход",
      value: "План пилота",
      detail: "На выходе ясно, что нужно от вашей стороны и какой следующий шаг.",
    },
  ],
  anchorScenario: {
    title: 'CRM "обращения"',
    process: "Регистрация -> рассмотрение / ответ -> согласование -> отправка",
    reasons: [
      "Понятен бизнесу без погружения в предметную область.",
      "Позволяет показать процесс и результат, который можно проверить.",
      "Легко сопоставить с вашим заявочным или сервисным сценарием.",
    ],
  },
  stages: [
    {
      id: "context",
      time: "0-1 мин",
      title: "Контекст и критерий успеха",
      summary: "Фиксируем, что считаем успешным демо: показать путь 1-5-60 и реалистичный пилот.",
    },
    {
      id: "path",
      time: "1-4 мин",
      title: "Путь 1-5-60",
      summary: "Быстро проходим маршрут от сценария до результата, который готов к проверке.",
    },
    {
      id: "scenario",
      time: "4-8 мин",
      title: 'Сценарий CRM "обращения"',
      summary: "Показываем процесс в работе и подтверждаем, что результат можно проверить, а не просто посмотреть.",
    },
    {
      id: "growth",
      time: "8-12 мин",
      title: "Добавление функциональности",
      summary: "Показываем идею развития: функции добавляются быстро и проверяются на стенде.",
    },
    {
      id: "pilot",
      time: "12-15 мин",
      title: "Следующий шаг",
      summary: "Формулируем входы для пилота, следующий контакт и закрываем риск vendor-lock.",
    },
  ],
  takeaways: [
    "Понимаю обещание 1-5-60 и что оно значит на практике.",
    "Вижу результат, который можно проверить.",
    "Понимаю, как применить это к нашему сценарию через пилот.",
    "Понимаю, что нужно от нас для пилота.",
    "Понимаю следующий шаг после демо.",
  ],
};
