
type MechanismCard = {
  readonly title: string;
  readonly summary: string;
  readonly detail?: string;
};

type AplaiMechanismSection = {
  readonly title: string;
  readonly lead: string;
  readonly cards: readonly MechanismCard[];
  readonly supportLine: string;
  readonly bridgeLabel: string;
};

export const APLAI_MECHANISM_SECTION: AplaiMechanismSection = {
  title: "Почему это работает: три опоры APLAI",
  lead:
    "Мы стандартизируем старт, поставку и разработку, чтобы команда быстрее выпускала функциональность без хаоса.",
  cards: [
    {
      title: "Шаблоны и архитектура",
      summary: "Единая основа приложения, чтобы стартовать без проектирования с нуля.",
      detail: "Каркас и правила работы",
    },
    {
      title: "Контуры и поставка",
      summary: "Готовые стенды и повторяемый релизный процесс для Agile-разработки.",
      detail: "Dev/QA/Preprod/Prod + CI/CD",
    },
    {
      title: "AI-поддержка разработки",
      summary: "Ускорение рутинных задач и генерация кода по инструкциям и конвенциям проекта.",
      detail: "AI-агенты + контроль качества",
    },
  ],
  supportLine: "Скорость достигается не только AI, а стандартом запуска и поставки.",
  bridgeLabel: "Посмотреть архитектуру интеграций",
};
