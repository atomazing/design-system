
type AudienceTier = "primary" | "secondary" | "support";

type AudienceSegment = {
  readonly id: string;
  readonly tier: AudienceTier;
  readonly title: string;
  readonly scenario: string;
  readonly focus: readonly string[];
  readonly triggers: readonly string[];
  readonly objection: string;
  readonly preferredCta: string;
};

type QualificationBand = {
  readonly label: string;
  readonly summary: readonly string[];
};

type IcpNarrative = {
  readonly title: string;
  readonly subtitle: string;
  readonly businessLayer: string;
  readonly technicalLayer: string;
};

type AplaiIcpPack = {
  readonly narrative: IcpNarrative;
  readonly segments: readonly AudienceSegment[];
  readonly qualification: readonly QualificationBand[];
  readonly mustHaves: readonly string[];
};

export const APLAI_ICP_PACK: AplaiIcpPack = {
  narrative: {
    title: "Для кого APLAI",
    subtitle:
      "Business-first сообщение, поддержанное CTO-уровнем доказательств и понятным путем к пилоту.",
    businessLayer:
      "Первый слой: ценность для бизнеса и продукта - быстрый проверяемый результат, понятный следующий шаг, снижение риска старта.",
    technicalLayer:
      "Второй слой: аргументы для CTO и delivery - повторяемый процесс, встраиваемость и отсутствие vendor-lock.",
  },
  segments: [
    {
      id: "cto",
      tier: "primary",
      title: "CTO / IT-директор / Руководитель разработки",
      scenario:
        "Нужно ускорить delivery, сохранив контроль над архитектурой и свободой развития после пилота.",
      focus: [
        "Предсказуемость и повторяемость поставки",
        "Встраиваемость в корпоративный контур",
      ],
      triggers: [
        "Измеримость 1/5/60",
        "Enterprise-ready маршрут",
        "Без vendor-lock",
      ],
      objection:
        "Это не очередная платформа-ловушка: результат остается вашим активом.",
      preferredCta: "Обсудить пилот",
    },
    {
      id: "delivery",
      tier: "primary",
      title: "Delivery / Руководитель направления / Руководитель платформы",
      scenario:
        "Нужно сократить хаос старта проектов и стабилизировать окружения и процесс поставки.",
      focus: [
        "Снижение ручной рутины",
        "Единые правила старта и поставки",
      ],
      triggers: [
        "Понятный step-by-step процесс",
        "Демо с конкретным сценарием за 10-15 минут",
      ],
      objection:
        "Решение убирает организационные задержки, а не добавляет еще один слой хаоса.",
      preferredCta: "Запросить демо",
    },
    {
      id: "product",
      tier: "secondary",
      title: "Product Manager / Product Owner",
      scenario:
        "Нужен быстрый пилот и короткий цикл обратной связи вместо недель ожидания первого результата.",
      focus: [
        "Time-to-value",
        "Понятный результат демо",
      ],
      triggers: [
        "Один сценарий - один результат",
        "Прозрачный блок что дальше",
      ],
      objection:
        "Это не внедрение ради внедрения: сначала быстрый проверяемый результат, затем пилот.",
      preferredCta: "Посмотреть демо-сценарий",
    },
    {
      id: "business",
      tier: "secondary",
      title: "Business Owner / Руководитель продукта или направления",
      scenario:
        "Нужно снизить стоимость старта и быстрее получить рабочий результат без необратимых рисков.",
      focus: [
        "Ускорение пилота",
        "Контроль результата и масштаба",
      ],
      triggers: [
        "Risk reversal без vendor-lock",
        "Маршрут от пилота к масштабу",
      ],
      objection:
        "Даже если пилот не масштабируется сразу, вы не остаетесь в чужой технологической ловушке.",
      preferredCta: "Обсудить пилот",
    },
    {
      id: "security",
      tier: "support",
      title: "Security / Compliance",
      scenario:
        "Нужно понять рамку пилота и требования к доступу, не ухудшая управляемость и безопасность.",
      focus: [
        "Прозрачные требования к пилоту",
        "Ясные границы ответственности",
      ],
      triggers: [
        "Архитектурная секция",
        "FAQ без нереалистичных обещаний",
      ],
      objection:
        "Пилот ограничен и прозрачен: сначала понятная рамка, потом решение о масштабировании.",
      preferredCta: "Посмотреть архитектуру интеграций",
    },
  ],
  qualification: [
    {
      label: "Высокая квалификация",
      summary: [
        "Есть боль: недели на подготовку и старт поставки.",
        "Пилот или проект ожидается в ближайшие 1-3 месяца.",
        "Есть контур и сценарий, который можно формализовать.",
      ],
    },
    {
      label: "Средняя квалификация",
      summary: [
        "Есть интерес к демо, но проект пока не в активной фазе.",
        "Нужна оценка подхода и сравнение вариантов.",
      ],
    },
  ],
  mustHaves: [
    "1/5/60 как измеримый факт",
    "Понятный механизм и step-by-step процесс",
    "Архитектурное доверие и границы пилота",
    "Risk reversal: без vendor-lock",
    "Ясный путь после заявки",
  ],
};
