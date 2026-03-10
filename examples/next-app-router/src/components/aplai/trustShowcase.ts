
import { APLAI_PROOF_STACK } from "./proofStack";
import { APLAI_TRUST_CONTENT_POLICY } from "./trustContentPolicy";

type AplaiTrustShowcase = {
  readonly title: string;
  readonly lead: string;
  readonly proofLine: string;
  readonly proofLayers: readonly string[];
  readonly contexts: typeof APLAI_TRUST_CONTENT_POLICY.contexts;
  readonly safeSignals: readonly string[];
  readonly disclosure: string;
  readonly ctaLabel: string;
};

export const APLAI_TRUST_SHOWCASE: AplaiTrustShowcase = {
  title: "Проверено в корпоративных контурах",
  lead:
    "Показываем не обещания, а контексты, где подход уже обсуждался и проверялся, без раскрытия конфиденциальных деталей.",
  proofLine:
    "Зрелость здесь подтверждается процессом, архитектурой и прозрачными требованиями к пилоту, а не громкими именами.",
  proofLayers: APLAI_PROOF_STACK.layers.map((item) => item.label),
  contexts: APLAI_TRUST_CONTENT_POLICY.contexts,
  safeSignals: APLAI_TRUST_CONTENT_POLICY.safeSignals,
  disclosure: APLAI_TRUST_CONTENT_POLICY.disclosure,
  ctaLabel: "Обсудить пилот",
};
