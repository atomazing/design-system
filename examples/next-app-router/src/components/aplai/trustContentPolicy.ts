
type TrustContext = {
  readonly title: string;
  readonly summary: string;
};

type AplaiTrustContentPolicy = {
  readonly publicMode: "A" | "B" | "C";
  readonly title: string;
  readonly subtitle: string;
  readonly contexts: readonly TrustContext[];
  readonly disclosure: string;
  readonly safeSignals: readonly string[];
  readonly forbiddenClaims: readonly string[];
};

export const APLAI_TRUST_CONTENT_POLICY: AplaiTrustContentPolicy = {
  publicMode: "B",
  title: "Контексты применения без раскрытия названий",
  subtitle:
    "Показываем домены применения нейтрально: без логотипов, без имен компаний и без неподтвержденных цифр.",
  contexts: [
    {
      title: "CRM-модернизация в enterprise-контуре",
      summary: "Когда нужен быстрый пилот вокруг обращений, активностей и маршрута обработки.",
    },
    {
      title: "Миграции с legacy и low-code",
      summary: "Когда важно быстро зафиксировать требования и показать реалистичный путь перехода.",
    },
    {
      title: "Пилоты в сложном корпоративном контуре",
      summary: "Когда нужно доказать встраиваемость, прозрачность требований и управляемую поставку.",
    },
  ],
  disclosure: "Детали и названия раскрываем на демо при необходимости.",
  safeSignals: ["Повторяемый конвейер", "Прозрачные требования к пилоту", "Без vendor-lock"],
  forbiddenClaims: [
    "Неподтвержденные цифры по экономии времени или денег.",
    "Названия компаний или логотипы без явного разрешения.",
    "Намеки, по которым можно деанонимизировать клиента.",
  ],
};
