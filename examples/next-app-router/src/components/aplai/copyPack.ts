
import { APLAI_GLOSSARY } from "./glossary";

type CopyCard = {
  readonly title: string;
  readonly summary: string;
};

type AplaiCopyPack = {
  readonly proofStrip: {
    readonly title: string;
    readonly trustLine: string;
  };
  readonly howItWorks: {
    readonly title: string;
    readonly subtitle: string;
  };
  readonly templates: {
    readonly title: string;
    readonly subtitle: string;
    readonly items: readonly CopyCard[];
  };
  readonly guarantees: {
    readonly title: string;
    readonly subtitle: string;
    readonly items: readonly CopyCard[];
  };
  readonly faq: {
    readonly title: string;
    readonly subtitle: string;
  };
  readonly form: {
    readonly nextTitle: string;
    readonly nextSteps: readonly string[];
    readonly submitLabel: string;
    readonly privacy: string;
    readonly directContactLabel: string;
    readonly success: string;
    readonly retryLabel: string;
    readonly error: string;
  };
  readonly footer: {
    readonly summary: string;
    readonly legal: string;
  };
};

export const APLAI_COPY_PACK: AplaiCopyPack = {
  proofStrip: {
    title: "1-5-60: путь до результата",
    trustLine: `${APLAI_GLOSSARY.trustTerms.environments} • ${APLAI_GLOSSARY.canonicalFacts.vendorLockLabel}`,
  },
  howItWorks: {
    title: "Как APLAI доводит идею до проверки",
    subtitle:
      "Вы видите процесс целиком: от выбора сценария до результата, который можно проверить и показать.",
  },
  templates: {
    title: "Шаблоны, с которых можно начать",
    subtitle:
      "Шаблоны дают стандартизированную основу: можно быстро запуститься и развивать решение дальше.",
    items: [
      {
        title: "BPM-шаблон",
        summary: "Процессные приложения, согласования и задачи.",
      },
      {
        title: "CRM-шаблон",
        summary: "Обращения, активности и работа с клиентскими сценариями.",
      },
      {
        title: "Конвертер миграций",
        summary: "Переезд с legacy или low-code без хаотичного старта.",
      },
      {
        title: "UI-layout шаблон",
        summary: "Быстрые макеты и согласование структуры до глубокой сборки.",
      },
    ],
  },
  guarantees: {
    title: "Снятие рисков перед пилотом",
    subtitle:
      "Ускоряем старт и поставку, сохраняя контроль: код и развитие остаются у вас.",
    items: [
      {
        title: APLAI_GLOSSARY.canonicalFacts.vendorLockLabel,
        summary: APLAI_GLOSSARY.canonicalFacts.vendorLockExplanation,
      },
      {
        title: "Без потолка развития",
        summary:
          "Быстрый старт без ограничений долгого жизненного цикла и сложных сценариев.",
      },
    ],
  },
  faq: {
    title: "Вопросы перед пилотом",
    subtitle:
      "Если вашего вопроса нет, оставьте заявку, и мы разберем ваш сценарий на коротком созвоне.",
  },
  form: {
    nextTitle: "Что дальше",
    nextSteps: [
      "Уточним сценарий и контур",
      "Проведем демо",
      "Предложим план пилота",
    ],
    submitLabel: APLAI_GLOSSARY.cta.primary,
    privacy: "Контакты используем только для связи по запросу.",
    directContactLabel: "Написать напрямую",
    success: "Запрос отправлен. Мы свяжемся с вами по указанному контакту.",
    retryLabel: "Отправить еще один запрос",
    error: "Не удалось отправить запрос. Попробуйте снова или напишите напрямую.",
  },
  footer: {
    summary: "APLAI landing prototype. Demo flow and trust path for enterprise leads.",
    legal: "© 2026 APLAI",
  },
};
