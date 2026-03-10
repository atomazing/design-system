
type OutcomeCard = {
  readonly title: string;
  readonly summary: string;
  readonly detail?: string;
};

type AplaiOutcomesSection = {
  readonly title: string;
  readonly lead: string;
  readonly cards: readonly OutcomeCard[];
  readonly supportLine: string;
  readonly bridgeLabel: string;
};

export const APLAI_OUTCOMES_SECTION: AplaiOutcomesSection = {
  title: "Готово из коробки — что получает команда",
  lead:
    "Это не набор инструментов. Это повторяемая стартовая линия и конвейер поставки для корпоративных приложений.",
  cards: [
    {
      title: "Основа приложения",
      summary: "Стартовый каркас, чтобы команда начинала с работающей базы, а не с проектирования с нуля.",
      detail: "Front + Back шаблоны",
    },
    {
      title: "Рабочие контуры",
      summary: "Стенды и процесс поставки, чтобы быстро показывать и проверять результат.",
      detail: "Dev/QA/Preprod/Prod",
    },
    {
      title: "Ускорение разработки",
      summary: "AI-поддержка, которая работает по правилам и конвенциям проекта.",
      detail: "AI-агенты по инструкциям",
    },
  ],
  supportLine: "Подходит для пилота: начать быстро и расширять постепенно.",
  bridgeLabel: "Как это работает",
};
