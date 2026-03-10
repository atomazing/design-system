
import { APLAI_GLOSSARY } from "./glossary";

type ComparisonColumn = {
  readonly title: string;
  readonly summary: string;
  readonly points: readonly string[];
};

type AplaiNotLowCodeSection = {
  readonly title: string;
  readonly lead: string;
  readonly disclaimer: string;
  readonly columns: readonly ComparisonColumn[];
  readonly whenToChooseTitle: string;
  readonly whenToChoose: readonly string[];
  readonly bridgeLabel: string;
};

export const APLAI_NOT_LOW_CODE_SECTION: AplaiNotLowCodeSection = {
  title: "Быстрый старт без потолка развития",
  lead:
    "Можно стартовать быстро, но дальше развивать решение как полноценный инженерный продукт: без смены модели работы по мере роста требований.",
  disclaimer:
    "Сравнение ниже про типовые trade-offs. Конкретные ограничения и риски проверяем на пилоте под ваш контур.",
  columns: [
    {
      title: "Типичный low-code",
      summary: "Подходит для быстрого старта на простых сценариях, но ограничения появляются раньше.",
      points: [
        "Быстро запускается на типовых процессах.",
        "Сложные требования и интеграции чаще требуют обходных решений.",
        "При развитии сильнее растет зависимость от платформенных механизмов.",
      ],
    },
    {
      title: "APLAI",
      summary: "Сохраняет быстрый старт, но оставляет развитие в привычной инженерной модели.",
      points: [
        "Быстрый старт через шаблоны и конвейер поставки.",
        "Сложные сценарии развиваются без смены подхода к разработке.",
        `Контроль и независимость решения: ${APLAI_GLOSSARY.canonicalFacts.vendorLockLabel}.`,
      ],
    },
  ],
  whenToChooseTitle: "Когда выбирать APLAI",
  whenToChoose: [
    "Нужен быстрый пилот, но заранее понятны будущие интеграции, нагрузка или длинный жизненный цикл.",
    `Важно сохранить повторяемую поставку через ${APLAI_GLOSSARY.trustTerms.environments}.`,
    "Нужен быстрый старт без перехода в платформенный потолок по мере развития решения.",
  ],
  bridgeLabel: "Гарантия: без vendor-lock",
};
