
type RoadmapLane = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly string[];
};

type AplaiRoadmapSection = {
  readonly title: string;
  readonly lead: string;
  readonly disclaimer: string;
  readonly lanes: readonly RoadmapLane[];
  readonly ctaNote: string;
};

export const APLAI_ROADMAP_SECTION: AplaiRoadmapSection = {
  title: "Куда развивается APLAI",
  lead:
    "Фокус сохраняется на enterprise-направлении: повторяемая поставка, контроль, масштабирование и миграции без потери гибкости.",
  disclaimer:
    "Дорожная карта - ориентир направления. Конкретные приоритеты уточняем под ваш сценарий пилота.",
  lanes: [
    {
      id: "now",
      title: "Сейчас",
      items: [
        "Быстрый старт приложений и повторяемая поставка.",
        "Усиление шаблонов под BPM, CRM и миграции.",
        "Более строгие conventions для AI-assisted разработки.",
      ],
    },
    {
      id: "next",
      title: "Дальше",
      items: [
        "Управление командами и проектами в delivery-конвейере.",
        "Расширение интеграций, observability и governance.",
        "Ускорение миграций с legacy и low-code контуров.",
      ],
    },
    {
      id: "later",
      title: "Затем",
      items: [
        "Набор повторно используемых бизнес-компонентов.",
        "Более глубокая автоматизация enterprise-контуров и политик.",
      ],
    },
  ],
  ctaNote: "Обсудим, что важно именно для вашего контура.",
};
