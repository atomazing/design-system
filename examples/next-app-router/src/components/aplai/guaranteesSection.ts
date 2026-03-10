
import { APLAI_RISK_REVERSAL_PACK } from "./riskReversalPack";

type GuaranteeCard = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly secondaryLine?: string;
};

type GuaranteeSignal = {
  readonly id: string;
  readonly label: string;
};

type AplaiGuaranteesSection = {
  readonly title: string;
  readonly subtitle: string;
  readonly cards: readonly GuaranteeCard[];
  readonly riskSignals: readonly GuaranteeSignal[];
  readonly detailsHint: string;
  readonly primaryCtaLabel: string;
  readonly secondaryCtaLabel: string;
};

export const APLAI_GUARANTEES_SECTION: AplaiGuaranteesSection = {
  title: "Снятие рисков: можно начинать с пилота без ловушек",
  subtitle:
    "Мы ускоряем старт и поставку, но не забираем контроль: код и развитие остаются у вас.",
  cards: APLAI_RISK_REVERSAL_PACK.guaranteeCards,
  riskSignals: APLAI_RISK_REVERSAL_PACK.guaranteeSignals,
  detailsHint:
    "Детали по требованиям безопасности и встраиванию в контур - в Архитектуре и FAQ.",
  primaryCtaLabel: "Запросить демо",
  secondaryCtaLabel: "Подробнее в FAQ",
};
