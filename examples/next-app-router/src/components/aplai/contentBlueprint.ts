
type BlueprintStatus = "active" | "deferred";

type BlueprintAnchor = {
  readonly id: string;
  readonly label: string;
  readonly kind: "anchor" | "cta";
};

type BlueprintLayoutMode = {
  readonly mobile: string;
  readonly desktop: string;
};

type BlueprintSection = {
  readonly id: string;
  readonly label: string;
  readonly question: string;
  readonly role: string;
  readonly primaryArtifact: string;
  readonly transition?: string;
  readonly status: BlueprintStatus;
  readonly showInNav: boolean;
};

type AplaiContentBlueprint = {
  readonly pageId: string;
  readonly pageVersion: string;
  readonly patternId: string;
  readonly storyArc: string;
  readonly primaryArtifact: string;
  readonly principle: string;
  readonly rhythmRule: string;
  readonly anchors: readonly BlueprintAnchor[];
  readonly layoutMode: BlueprintLayoutMode;
  readonly sections: readonly BlueprintSection[];
};

export const APLAI_CONTENT_BLUEPRINT: AplaiContentBlueprint = {
  pageId: "aplai-landing",
  pageVersion: "v1",
  patternId: "page_blueprint",
  storyArc: "Обещание -> механизм -> доказательства -> снятие рисков -> CTA.",
  primaryArtifact: "Конвейер результата 1/5/60.",
  principle: "Одна мысль = один экран.",
  rhythmRule:
    "Каждая секция отвечает на один вопрос и держит один главный артефакт, чтобы страница не теряла темп.",
  anchors: [
    { id: "how_it_works", label: "Как это работает", kind: "anchor" },
    { id: "architecture", label: "Архитектура", kind: "anchor" },
    { id: "demo", label: "Демо", kind: "anchor" },
    { id: "templates", label: "Шаблоны", kind: "anchor" },
    { id: "guarantees", label: "Гарантии", kind: "anchor" },
    { id: "faq", label: "FAQ", kind: "anchor" },
    { id: "final_cta", label: "Запросить демо", kind: "cta" },
  ],
  layoutMode: {
    mobile: "Одна колонка, CTA всегда доступна, длинный текст сокращаем.",
    desktop: "Две колонки только там, где это усиливает смысл; без прыжков layout.",
  },
  sections: [
    {
      id: "hero",
      label: "Hero",
      question: "Что это и какой результат?",
      role: "Обещание и старт конверсии.",
      primaryArtifact: "1/5/60 и конвейер результата.",
      transition: "Дальше: закрепить цифры и объяснить, где теряется время.",
      status: "active",
      showInNav: false,
    },
    {
      id: "proof_strip",
      label: "Proof",
      question: "Это измеримо?",
      role: "Закрепить доверие цифрами.",
      primaryArtifact: "Короткая полоса фактов 1/5/60.",
      transition: "Дальше: показать, почему старт обычно тормозит.",
      status: "active",
      showInNav: false,
    },
    {
      id: "problem",
      label: "Problem",
      question: "Почему это важно для нас?",
      role: "Показать боль недель на старт.",
      primaryArtifact: "4 pain-карточки.",
      transition: "Дальше: для кого это особенно критично.",
      status: "active",
      showInNav: false,
    },
    {
      id: "who_its_for",
      label: "Для кого",
      question: "Для кого это и что для них меняется?",
      role: "Связать ценность с сегментами и JTBD.",
      primaryArtifact: "2-layer audience + сегмент-карточки.",
      transition: "Дальше: почему в это верят.",
      status: "active",
      showInNav: true,
    },
    {
      id: "value_prop",
      label: "Ценность",
      question: "Почему это важно и почему это работает?",
      role: "Зафиксировать ценность, proof stack и границы обещаний.",
      primaryArtifact: "3 pillar-карточки + proof/risk stack.",
      transition: "Дальше: показать процесс шаг за шагом.",
      status: "active",
      showInNav: true,
    },
    {
      id: "outcomes",
      label: "Outcomes",
      question: "Что получит команда?",
      role: "Дать конкретику результата на следующий день.",
      primaryArtifact: "3 outcome-карточки.",
      transition: "Дальше: объяснить механизм.",
      status: "active",
      showInNav: false,
    },
    {
      id: "mechanism",
      label: "Mechanism",
      question: "Почему это работает?",
      role: "Снять скепсис логической моделью.",
      primaryArtifact: "3 pillar-карточки.",
      transition: "Дальше: показать процесс.",
      status: "active",
      showInNav: false,
    },
    {
      id: "how_it_works",
      label: "Как это работает",
      question: "Как это выглядит шаг за шагом?",
      role: "Превратить обещание в процесс.",
      primaryArtifact: "stepper 1 -> 5 -> разработка -> ~1 час.",
      transition: "Дальше: проверить, как это впишется в контур.",
      status: "active",
      showInNav: true,
    },
    {
      id: "architecture",
      label: "Архитектура",
      question: "Впишется ли это в наш контур?",
      role: "Дать enterprise-доверие и снять риск долгого внедрения.",
      primaryArtifact: "Интерактивная карта + drawer деталей.",
      transition: "Дальше: показать демо вживую.",
      status: "active",
      showInNav: true,
    },
    {
      id: "demo",
      label: "Демо",
      question: "Что вы покажете на демо?",
      role: "Дать проверяемую конкретику.",
      primaryArtifact: "Демо-процесс и результат на выходе.",
      transition: "Дальше: показать широту сценариев.",
      status: "active",
      showInNav: true,
    },
    {
      id: "templates",
      label: "Шаблоны",
      question: "А если сценарий другой?",
      role: "Показать широту применимости.",
      primaryArtifact: "4 карточки точек входа.",
      transition: "Дальше: показать быстрый старт без потолка развития.",
      status: "active",
      showInNav: false,
    },
    {
      id: "not_low_code",
      label: "Без потолка",
      question: "Упрется ли это в потолок платформы?",
      role: "Снять риск low-code trap спокойным сравнением подходов.",
      primaryArtifact: "2 comparison cards + when-to-choose card.",
      transition: "Дальше: добавить тихий внешний сигнал доверия.",
      status: "active",
      showInNav: false,
    },
    {
      id: "social_proof",
      label: "Контексты",
      question: "Есть ли внешний сигнал доверия?",
      role: "Дать тихий social proof без громких кейсов.",
      primaryArtifact: "Лента контекстов и бейджей.",
      transition: "Дальше: раскрыть более сильный блок зрелости.",
      status: "active",
      showInNav: false,
    },
    {
      id: "trust_showcase",
      label: "Trust",
      question: "Это зрелое решение?",
      role: "Дать статус и уверенность.",
      primaryArtifact: "Контрастный showcase-блок.",
      transition: "Дальше: где ловушки и гарантии.",
      status: "active",
      showInNav: false,
    },
    {
      id: "guarantees",
      label: "Гарантии",
      question: "Где ловушки?",
      role: "Сделать risk reversal спокойным и конкретным.",
      primaryArtifact: "Гарантийные карточки.",
      transition: "Дальше: закрыть оставшиеся вопросы перед пилотом.",
      status: "active",
      showInNav: true,
    },
    {
      id: "faq",
      label: "FAQ",
      question: "Что еще нужно понять перед пилотом?",
      role: "Закрыть неизвестное без перегруза документацией.",
      primaryArtifact: "Короткие FAQ-ответы.",
      transition: "Дальше: показать, как это масштабируется после пилота.",
      status: "active",
      showInNav: true,
    },
    {
      id: "roadmap",
      label: "Roadmap",
      question: "Что будет после пилота?",
      role: "Показать направление развития без неподтвержденных обещаний.",
      primaryArtifact: "Now / Next / Later таймлайн.",
      transition: "Дальше: перевести в запрос на пилот.",
      status: "active",
      showInNav: false,
    },
    {
      id: "final_cta",
      label: "Запросить демо",
      question: "Что будет после заявки?",
      role: "Снять тревожность и довести до конверсии.",
      primaryArtifact: "Форма + 3 шага что дальше + прямой контакт.",
      status: "active",
      showInNav: true,
    },
    {
      id: "footer",
      label: "Footer",
      question: "Что еще нужно для завершения?",
      role: "Служебное завершение и доверие.",
      primaryArtifact: "Ссылки, политика, копирайт.",
      status: "active",
      showInNav: false,
    },
  ],
};
