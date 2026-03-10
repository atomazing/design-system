
import { APLAI_GLOSSARY } from "./glossary";

type AplaiCanonicalFacts = {
  readonly scenarioSelection: string;
  readonly environmentBoot: string;
  readonly deliveryReady: string;
  readonly vendorLockLabel: string;
};

type AplaiHeroMessage = {
  readonly eyebrowPrimary: string;
  readonly eyebrowSecondary: string;
  readonly heading: string;
  readonly summary: string;
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
};

type AplaiMessageMap = {
  readonly northStarPromise: string;
  readonly primaryCtaLabel: string;
  readonly pilotCtaLabel: string;
  readonly canonicalFacts: AplaiCanonicalFacts;
  readonly hero: AplaiHeroMessage;
  readonly architecture: {
    readonly title: string;
    readonly subtitle: string;
    readonly vendorLockStatement: string;
  };
  readonly demo: {
    readonly title: string;
    readonly subtitle: string;
    readonly primaryCtaLabel: string;
    readonly secondaryCtaLabel: string;
  };
  readonly finalCta: {
    readonly title: string;
    readonly subtitle: string;
    readonly quickStartTitle: string;
    readonly quickStartSummary: string;
    readonly modalCtaLabel: string;
  };
};

export const APLAI_MESSAGE_MAP: AplaiMessageMap = {
  northStarPromise: "От сценария до проверяемого результата - за часы, а не недели.",
  primaryCtaLabel: APLAI_GLOSSARY.cta.primary,
  pilotCtaLabel: APLAI_GLOSSARY.cta.secondary,
  canonicalFacts: {
    scenarioSelection: APLAI_GLOSSARY.canonicalFacts.scenarioSelection,
    environmentBoot: APLAI_GLOSSARY.canonicalFacts.environmentBoot,
    deliveryReady: APLAI_GLOSSARY.canonicalFacts.deliveryReady,
    vendorLockLabel: APLAI_GLOSSARY.canonicalFacts.vendorLockLabel,
  },
  hero: {
    eyebrowPrimary: APLAI_GLOSSARY.canonicalFacts.vendorLockLabel,
    eyebrowSecondary: APLAI_GLOSSARY.trustTerms.environments,
    heading: "От сценария до проверки - за часы, а не недели",
    summary:
      "APLAI дает повторяемый конвейер старта и поставки: вы быстрее запускаете основу и быстрее показываете проверяемый результат.",
    primaryCtaLabel: APLAI_GLOSSARY.cta.primary,
    secondaryCtaLabel: APLAI_GLOSSARY.cta.navDemo,
  },
  architecture: {
    title: "Архитектура и встраиваемость",
    subtitle:
      "Показываем, что нужно от вашей стороны и как это вписывается в существующие процессы.",
    vendorLockStatement:
      `${APLAI_GLOSSARY.canonicalFacts.vendorLockLabel}: ${APLAI_GLOSSARY.canonicalFacts.vendorLockExplanation}`,
  },
  demo: {
    title: "Что вы увидите на демо за 10-15 минут",
    subtitle:
      "Покажем путь 1-5-60 на понятном сценарии и обсудим, как быстро запустить пилот в вашем контуре.",
    primaryCtaLabel: APLAI_GLOSSARY.cta.primary,
    secondaryCtaLabel: "Перейти к форме",
  },
  finalCta: {
    title: "Запросить демо APLAI",
    subtitle:
      "Покажем путь 1-5-60 и предложим формат пилота под ваш контур.",
    quickStartTitle: "Нужен быстрый старт?",
    quickStartSummary:
      "Можно открыть форму в модальном окне и отправить запрос без скролла.",
    modalCtaLabel: "Открыть форму в модалке",
  },
};
