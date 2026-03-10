
type ProofLayer = {
  readonly id: string;
  readonly label: string;
  readonly summary: string;
  readonly sectionId: string;
};

type AplaiProofStack = {
  readonly layers: readonly ProofLayer[];
};

export const APLAI_PROOF_STACK: AplaiProofStack = {
  layers: [
    {
      id: "instant_fact",
      label: "1/5/60 и конвейер",
      summary: "Быстрый факт и понятный путь к проверке результата.",
      sectionId: "hero",
    },
    {
      id: "repeatable_process",
      label: "Повторяемый процесс",
      summary: "Шаги и ритм показывают, что это не разовая импровизация.",
      sectionId: "how_it_works",
    },
    {
      id: "enterprise_fit",
      label: "Встраиваемость и прозрачность",
      summary: "Архитектура показывает, как решение входит в контур и что нужно от команды.",
      sectionId: "architecture",
    },
    {
      id: "concrete_result",
      label: "Конкретный demo-результат",
      summary: "Демо привязано к одному сценарию и одному результату.",
      sectionId: "demo",
    },
    {
      id: "risk_before_conversion",
      label: "Гарантии перед пилотом",
      summary: "Ключевые риски закрываются до финальной формы.",
      sectionId: "guarantees",
    },
  ],
};
