
type AplaiGlossary = {
  readonly brandName: string;
  readonly canonicalFacts: {
    readonly scenarioSelection: string;
    readonly environmentBoot: string;
    readonly deliveryReady: string;
    readonly vendorLockLabel: string;
    readonly vendorLockExplanation: string;
  };
  readonly cta: {
    readonly primary: string;
    readonly secondary: string;
    readonly navDemo: string;
  };
  readonly trustTerms: {
    readonly environments: string;
    readonly aiAssist: string;
  };
  readonly businessTerms: readonly string[];
  readonly bannedPromises: readonly string[];
};

export const APLAI_GLOSSARY: AplaiGlossary = {
  brandName: "APLAI",
  canonicalFacts: {
    scenarioSelection: "1 мин",
    environmentBoot: "5 мин",
    deliveryReady: "~1 час",
    vendorLockLabel: "Без vendor-lock",
    vendorLockExplanation:
      "Приложение остается вашим активом и может развиваться независимо.",
  },
  cta: {
    primary: "Запросить демо",
    secondary: "Обсудить пилот",
    navDemo: "Посмотреть демо-сценарий",
  },
  trustTerms: {
    environments: "Dev/QA/Preprod/Prod",
    aiAssist: "AI-поддержка",
  },
  businessTerms: [
    "результат",
    "проверка",
    "пилот",
    "контроль",
    "масштабирование",
    "конвейер",
    "повторяемость",
    "встраивается",
  ],
  bannedPromises: ["мгновенно", "всегда", "гарантированно"],
};
