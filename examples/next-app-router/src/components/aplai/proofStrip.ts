
import { APLAI_GLOSSARY } from "./glossary";

type ProofMetric = {
  readonly value: string;
  readonly label: string;
};

type AplaiProofStrip = {
  readonly railTitle: string;
  readonly sectionTitle: string;
  readonly sectionLead: string;
  readonly metrics: readonly ProofMetric[];
  readonly trustLine: string;
  readonly trustBadges: readonly string[];
};

export const APLAI_PROOF_STRIP: AplaiProofStrip = {
  railTitle: "1-5-60: путь до результата",
  sectionTitle: "Цифры, на которые можно опираться",
  sectionLead: "Скорость важна только тогда, когда она повторяема и измерима.",
  metrics: [
    {
      value: APLAI_GLOSSARY.canonicalFacts.scenarioSelection,
      label: "Выбор сценария",
    },
    {
      value: APLAI_GLOSSARY.canonicalFacts.environmentBoot,
      label: "Запуск рабочих стендов",
    },
    {
      value: APLAI_GLOSSARY.canonicalFacts.deliveryReady,
      label: "Готово к проверке",
    },
  ],
  trustLine: `${APLAI_GLOSSARY.trustTerms.environments} • ${APLAI_GLOSSARY.canonicalFacts.vendorLockLabel}`,
  trustBadges: [
    APLAI_GLOSSARY.trustTerms.environments,
    APLAI_GLOSSARY.canonicalFacts.vendorLockLabel,
  ],
};
