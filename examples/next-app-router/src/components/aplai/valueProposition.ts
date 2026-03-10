
type ValuePillar = {
  readonly id: string;
  readonly title: string;
  readonly promise: string;
  readonly outcome: string;
  readonly language: readonly string[];
  readonly trustLayer?: string;
};

type ProofLayer = {
  readonly title: string;
  readonly summary: string;
};

type RiskReversalItem = {
  readonly risk: string;
  readonly statement: string;
};

type AplaiValueProposition = {
  readonly northStarOutcome: string;
  readonly oneLiner: string;
  readonly pillars: readonly ValuePillar[];
  readonly proofStack: readonly ProofLayer[];
  readonly riskReversal: readonly RiskReversalItem[];
  readonly boundaries: readonly string[];
};

export const APLAI_VALUE_PROPOSITION: AplaiValueProposition = {
  northStarOutcome:
    "Сократить время до проверяемого результата с недель до часов, сохраняя управляемость и независимость решений.",
  oneLiner:
    "APLAI дает повторяемый конвейер: быстро стартуете, быстро показываете результат и можете развивать решение без ловушек.",
  pillars: [
    {
      id: "start",
      title: "Быстрый старт",
      promise: "Старт проекта перестает быть неделями подготовки.",
      outcome:
        "Быстрее запускаете пилот и получаете первый проверяемый результат без лишней рутины.",
      language: [
        "Запускаем быстрее",
        "Меньше подготовительных шагов",
        "Быстрее первый результат",
      ],
      trustLayer: "Повторяемые рабочие контуры как второй уровень доверия.",
    },
    {
      id: "scale",
      title: "Гибкость развития",
      promise: "Решение не упирается в потолок и не остается одноразовым прототипом.",
      outcome:
        "Можно начинать быстро и развивать как полноценное корпоративное приложение.",
      language: [
        "Подходит для долгого жизненного цикла",
        "Сложные сценарии не упираются в ограничения",
        "Контроль остается у вашей команды",
      ],
    },
    {
      id: "accelerate",
      title: "Ускорение разработки",
      promise: "AI-поддержка ускоряет работу, но остается управляемой.",
      outcome:
        "Меньше рутины, быстрее выпуск функциональности и стабильнее качество.",
      language: [
        "AI-поддержка ускоряет рутинные задачи",
        "Работает по правилам проекта",
        "Качество важнее магии",
      ],
    },
  ],
  proofStack: [
    {
      title: "Измеримые факты",
      summary: "1/5/60 как визуальные якоря и понятная рамка time-to-value.",
    },
    {
      title: "Понятный процесс",
      summary: "Stepper по шагам: что происходит от сценария до результата.",
    },
    {
      title: "Enterprise-доверие",
      summary: "Архитектурная карта и прозрачный блок о том, что нужно от вашей команды.",
    },
    {
      title: "Конкретика демо",
      summary: "Один сценарий, 10-15 минут и понятный результат на выходе.",
    },
  ],
  riskReversal: [
    {
      risk: "Vendor-lock",
      statement:
        "Приложение остается вашим активом и может развиваться независимо.",
    },
    {
      risk: "Потолок развития",
      statement:
        "Быстрый старт не означает ограничение долгого развития и сложных сценариев.",
    },
    {
      risk: "Не впишется в контур",
      statement:
        "Показываем, что нужно от вас для пилота и как решение встроится в существующий процесс.",
    },
  ],
  boundaries: [
    "Не обещаем универсальную применимость без условий.",
    "Не обещаем конкретные сроки внедрения без согласования.",
    "Не обещаем запуск без участия вашей команды.",
    "Не используем ценовые или лицензионные сравнения без утвержденного текста.",
  ],
};
