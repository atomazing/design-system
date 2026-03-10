
import { APLAI_TRUST_CONTENT_POLICY } from "./trustContentPolicy";

type AplaiSocialProof = {
  readonly enabled: boolean;
  readonly title: string;
  readonly subtitle: string;
  readonly items: readonly string[];
  readonly linkLabel: string;
};

export const APLAI_SOCIAL_PROOF: AplaiSocialProof = {
  enabled: APLAI_TRUST_CONTENT_POLICY.contexts.length > 0,
  title: "Контексты применения",
  subtitle: "Детали и примеры раскрываем на демо.",
  items: [
    "CRM-модернизация",
    "Миграции low-code",
    "Enterprise-пилоты",
  ],
  linkLabel: "Подробнее о зрелости подхода",
};
