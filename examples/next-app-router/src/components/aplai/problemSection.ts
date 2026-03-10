
type ProblemCard = {
  readonly title: string;
  readonly summary: string;
};

type AplaiProblemSection = {
  readonly title: string;
  readonly lead: string;
  readonly cards: readonly ProblemCard[];
  readonly callout: string;
  readonly bridgeLabel: string;
};

export const APLAI_PROBLEM_SECTION: AplaiProblemSection = {
  title: "Почему старт проектов съедает недели",
  lead:
    "Большая часть задержек — это не разработка функций, а подготовка среды, процессов поставки и стандартов. APLAI превращает это в повторяемый конвейер.",
  cards: [
    {
      title: "Окружения и доступы",
      summary: "Старт тормозится, когда среды и права доступа собираются вручную через очереди и заявки.",
    },
    {
      title: "Пайплайны и релизный процесс",
      summary: "Каждый проект стартует по-разному, поэтому команда теряет предсказуемость и темп.",
    },
    {
      title: "Качество и наблюдаемость",
      summary: "Критичные требования часто откладываются на потом и возвращаются как риск и переработка.",
    },
    {
      title: "Каждый проект заново",
      summary: "Повторяемая рутина старта снова съедает время до первого результата для бизнеса.",
    },
  ],
  callout: "Пока нет стабильных стендов — нет стабильной разработки.",
  bridgeLabel: "Как APLAI сокращает старт",
};
