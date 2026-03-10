
import { APLAI_RISK_REVERSAL_PACK } from "./riskReversalPack";

type PilotOfferBand = {
  readonly title: string;
  readonly items: readonly string[];
};

type AplaiPilotOffer = {
  readonly title: string;
  readonly promise: string;
  readonly fit: readonly string[];
  readonly notFit: readonly string[];
  readonly inScope: PilotOfferBand;
  readonly outOfScope: PilotOfferBand;
  readonly successCriteria: readonly string[];
  readonly requirements: {
    readonly minimum: readonly string[];
    readonly optional: readonly string[];
    readonly summary: string;
  };
  readonly riskReversal: readonly string[];
};

export const APLAI_PILOT_OFFER: AplaiPilotOffer = {
  title: "Пилот под ваш сценарий",
  promise:
    "За короткий цикл запускаем прикладной сценарий в вашем контуре и доводим его до проверяемого результата, чтобы вы приняли решение о следующем шаге.",
  fit: [
    "Есть сценарий, который важно быстро проверить.",
    "Нужно сократить время старта и быстрее увидеть результат.",
    "Важно начать безопасно и без vendor-lock.",
  ],
  notFit: [
    "Нет владельца сценария и критериев готовности.",
    "Ожидается, что все сделают без участия вашей команды.",
    "Нужен финальный production без этапа проверки и итераций.",
  ],
  inScope: {
    title: "Входит в пилот",
    items: [
      "Работающий и проверяемый сценарий.",
      "Демонстрация результата на встрече.",
      "План следующего шага и границ масштабирования.",
      "Прозрачный список условий для продолжения.",
    ],
  },
  outOfScope: {
    title: "Не входит в пилот",
    items: [
      "Полный production-запуск как финальная цель.",
      "Все интеграции и все требования сразу.",
      "Универсальная коробка без адаптации.",
    ],
  },
  successCriteria: [
    "Сценарий доведен до проверяемого результата.",
    "Понятен следующий шаг для расширения или масштабирования.",
    "Сняты ключевые риски по встраиваемости и vendor-lock.",
    "Ритм поставки доказан на выбранном сценарии.",
  ],
  requirements: {
    minimum: [
      "Владелец сценария со стороны Product / Business.",
      "Контакт со стороны IT для согласования контуров.",
      "Согласованные границы пилота и критерии успеха.",
    ],
    optional: [
      "Описание текущего процесса.",
      "Понимание приоритетной интеграции, если она нужна на пилоте.",
    ],
    summary: "Мы заранее говорим, что нужно от вас, без сюрпризов в процессе.",
  },
  riskReversal: APLAI_RISK_REVERSAL_PACK.finalCtaBullets,
};
