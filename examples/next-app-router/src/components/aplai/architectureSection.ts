
import {
  APLAI_ARCHITECTURE_DRAWER_CONTENT,
  type ArchitectureGroup,
  type ArchitectureNode,
} from "./architectureDrawerContent";

type AplaiArchitectureSection = {
  readonly title: string;
  readonly lead: string;
  readonly helperHint: string;
  readonly coreTitle: string;
  readonly coreSubtitle: string;
  readonly sceneTitle: string;
  readonly sceneSummary: string;
  readonly zoneLabels: readonly ArchitectureGroup[];
  readonly trustLine: string;
  readonly supportBullets: readonly string[];
  readonly optionalBadgeLabel: string;
  readonly drawerLabels: {
    readonly why: string;
    readonly connect: string;
    readonly outcome: string;
    readonly fromYou: string;
  };
  readonly nodes: readonly ArchitectureNode[];
};

export const APLAI_ARCHITECTURE_SECTION: AplaiArchitectureSection = {
  title: "Встраивается в ваш корпоративный контур",
  lead:
    "Нажмите на узел карты, чтобы открыть короткую карточку: зачем это нужно, какой контур затрагиваем, что вы получаете и что нужно от вашей команды.",
  helperHint:
    "Карта должна читаться сразу: ядро APLAI, пять зон корпоративного контура и одинаково структурированный drawer для каждого узла.",
  coreTitle: "APLAI",
  coreSubtitle: "Ускорение старта и поставки приложений.",
  sceneTitle: "Карта интеграций APLAI",
  sceneSummary:
    "Схема показывает не список технологий, а ключевые точки, где APLAI встраивается в текущий контур и делает поставку предсказуемой.",
  zoneLabels: ["Поставка", "Доступы", "Надежность", "Качество и контроль", "Данные и интеграции"],
  trustLine: "Поддерживает Dev, QA, Preprod, Prod и повторяемую поставку.",
  supportBullets: [
    "APLAI встраивается, а не ломает текущий контур.",
    "Каждый узел открывает одинаковую структуру деталей без длинной документации.",
    "В drawer используется бизнес-язык, а не список вендоров и стека.",
  ],
  optionalBadgeLabel: "Опционально",
  drawerLabels: {
    why: "Зачем это нужно",
    connect: "Контур",
    outcome: "Что вы получаете",
    fromYou: "Что нужно от вас",
  },
  nodes: APLAI_ARCHITECTURE_DRAWER_CONTENT,
};
