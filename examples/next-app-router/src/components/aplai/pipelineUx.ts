type PipelineUxStep = {
  readonly id: string;
  readonly title: string;
  readonly time: string;
  readonly trustLayer?: string;
  readonly tooltip: string;
};

type AplaiPipelineUx = {
  readonly title: string;
  readonly demoCaption: string;
  readonly skepticLine: string;
  readonly steps: readonly PipelineUxStep[];
};

export const APLAI_PIPELINE_UX: AplaiPipelineUx = {
  title: "Конвейер 1-5-60",
  demoCaption: "Покажем этот путь на демо за 10-15 минут.",
  skepticLine: "Скорость ценна только тогда, когда она повторяема.",
  steps: [
    {
      id: "scenario",
      title: "Выбор сценария",
      time: "1 мин",
      tooltip: "Фиксируем один приоритетный сценарий и сразу задаем границы пилота.",
    },
    {
      id: "environments",
      title: "Запуск рабочих стендов",
      time: "5 мин",
      trustLayer: "Dev/QA/Preprod/Prod",
      tooltip: "Поднимаем рабочие контуры, чтобы команда сразу проверяла результат.",
    },
    {
      id: "build",
      title: "Сборка функциональности",
      time: "AI + команда",
      trustLayer: "по правилам и конвенциям проекта",
      tooltip: "Собираем функциональность в рамках уже согласованных правил работы.",
    },
    {
      id: "review",
      title: "Готово к проверке",
      time: "~1 час",
      tooltip: "Результат уже можно показать, проверить и использовать как основу пилота.",
    },
  ],
};
