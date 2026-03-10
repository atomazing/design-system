
import { APLAI_PIPELINE_UX } from "./pipelineUx";

const PIPELINE_STEP_MAP = Object.fromEntries(
  APLAI_PIPELINE_UX.steps.map((step) => [step.id, step]),
);

type HowItWorksStep = {
  readonly id: string;
  readonly title: string;
  readonly time: string;
  readonly summary: string;
  readonly trustLayer?: string;
};

type AplaiHowItWorksSection = {
  readonly title: string;
  readonly lead: string;
  readonly steps: readonly HowItWorksStep[];
  readonly footnote: string;
  readonly bridgeLabel: string;
};

export const APLAI_HOW_IT_WORKS_SECTION: AplaiHowItWorksSection = {
  title: "Как APLAI доводит идею до проверки",
  lead:
    "Вы видите процесс целиком: от выбора сценария до результата, который можно проверить и показать на демо.",
  steps: [
    {
      id: "scenario",
      title: PIPELINE_STEP_MAP.scenario.title,
      time: PIPELINE_STEP_MAP.scenario.time,
      summary: "Стартовая конфигурация и правила работы - без проектирования с нуля.",
    },
    {
      id: "environments",
      title: PIPELINE_STEP_MAP.environments.title,
      time: PIPELINE_STEP_MAP.environments.time,
      summary: "Команда получает среду для работы и проверки результата.",
      trustLayer: PIPELINE_STEP_MAP.environments.trustLayer,
    },
    {
      id: "build",
      title: PIPELINE_STEP_MAP.build.title,
      time: PIPELINE_STEP_MAP.build.time,
      summary: "Реализуем бизнес-логику в рамках конвенций проекта.",
      trustLayer: PIPELINE_STEP_MAP.build.trustLayer,
    },
    {
      id: "review",
      title: PIPELINE_STEP_MAP.review.title,
      time: PIPELINE_STEP_MAP.review.time,
      summary: "Результат доступен для проверки и демонстрации.",
    },
  ],
  footnote: "~1 час — пример: UI 10-20 полей + логика + БД + 1 интеграция.",
  bridgeLabel: "Посмотреть демо-сценарий",
};
