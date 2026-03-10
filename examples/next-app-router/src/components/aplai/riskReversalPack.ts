
type RiskSignal = {
  readonly id: string;
  readonly label: string;
};

type RiskReversalCard = {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly secondaryLine?: string;
};

type AplaiRiskReversalPack = {
  readonly guaranteeCards: readonly RiskReversalCard[];
  readonly guaranteeSignals: readonly RiskSignal[];
  readonly finalCtaBullets: readonly string[];
};

export const APLAI_RISK_REVERSAL_PACK: AplaiRiskReversalPack = {
  guaranteeCards: [
    {
      id: "vendor_lock",
      title: "Без vendor-lock",
      summary:
        "APLAI помогает создавать и поставлять приложения, но не становится обязательной средой исполнения. Ваше приложение может развиваться независимо.",
      secondaryLine: "Пилот = быстрый старт без необратимой зависимости",
    },
    {
      id: "not_low_code_trap",
      title: "Не low-code ловушка",
      summary:
        "Быстрый старт не упирается в потолок платформы: вы сохраняете гибкость и масштабируемость для долгого развития.",
      secondaryLine: "Подходит для развития, а не только для прототипа",
    },
  ],
  guaranteeSignals: [
    { id: "what_stays_yours", label: "Что остается у вас" },
    { id: "what_you_need", label: "Что нужно от вас" },
    { id: "what_happens_next", label: "Что будет дальше" },
    { id: "privacy", label: "Контакты только по запросу" },
  ],
  finalCtaBullets: [
    "Без vendor-lock: результат остается вашим активом.",
    "Прозрачные условия: что нужно от вашей стороны известно заранее.",
    "Сфокусированный объем: один сценарий -> один результат.",
    "Следующий шаг понятен: после результата фиксируем план масштабирования.",
  ],
};
