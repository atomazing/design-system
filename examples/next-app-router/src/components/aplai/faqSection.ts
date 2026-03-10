
type FaqItem = {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
  readonly detailsLabel?: string;
  readonly detailsTarget?: string;
};

type AplaiFaqSection = {
  readonly title: string;
  readonly subtitle: string;
  readonly hint: string;
  readonly items: readonly FaqItem[];
};

export const APLAI_FAQ_SECTION: AplaiFaqSection = {
  title: "Вопросы перед пилотом",
  subtitle: "Если вашего вопроса нет - оставьте заявку, и мы разберем ваш сценарий на коротком созвоне.",
  hint: "Открывайте вопросы по одному - ответы короткие.",
  items: [
    {
      id: "enterprise_fit",
      question: "Как APLAI встраивается в наш корпоративный контур?",
      answer:
        "APLAI подключается к ключевым зонам контура и делает путь до проверки результата предсказуемым. Основной контур уже показан в архитектурной секции.",
      detailsLabel: "Подробнее: Архитектура",
      detailsTarget: "architecture",
    },
    {
      id: "pilot_duration",
      question: "Нужно ли отдельное внедрение на месяцы?",
      answer:
        "Нет. Пилот строится вокруг одного сценария и проверяемого результата. Границы и требования фиксируем заранее, без сюрпризов.",
    },
    {
      id: "pilot_inputs",
      question: "Что нужно от нас для пилота?",
      answer:
        "Нужны владелец сценария со стороны бизнеса или продукта и контакт со стороны IT для согласования условий. Что нужно от вас фиксируем заранее в рамках пилота.",
      detailsLabel: "Подробнее: План пилота",
      detailsTarget: "final_cta",
    },
    {
      id: "pilot_output",
      question: "Что мы получим на выходе пилота?",
      answer:
        "Работающий сценарий, который можно проверить и показать, плюс план следующего шага. Также фиксируем критерии успеха и рамки масштабирования.",
      detailsLabel: "Подробнее: Что входит в пилот",
      detailsTarget: "final_cta",
    },
    {
      id: "vendor_lock",
      question: "Останемся ли мы в зависимости от платформы?",
      answer:
        "Нет. APLAI ускоряет создание и поставку, но приложение остается вашим активом и может развиваться независимо. Это ключевая гарантия на странице.",
      detailsLabel: "Подробнее: Guarantees",
      detailsTarget: "guarantees",
    },
    {
      id: "low_code_diff",
      question: "Чем это отличается от low-code?",
      answer:
        "Быстрый старт - да, но без потолка развития. Сложные сценарии и долгий жизненный цикл не должны упираться в ограничения платформы.",
      detailsLabel: "Подробнее: Без потолка",
      detailsTarget: "not_low_code",
    },
    {
      id: "demo_scope",
      question: "Что вы покажете на демо?",
      answer:
        "За 10-15 минут показываем путь 1-5-60 на одном понятном сценарии и обсуждаем формат пилота под вашу задачу. Цель - проверяемый результат и следующий шаг.",
      detailsLabel: "Подробнее: Демо",
      detailsTarget: "demo",
    },
    {
      id: "after_submit",
      question: "Что будет после заявки?",
      answer:
        "Мы уточним ваш сценарий и контур, проведем демо и предложим план пилота. Контакты используем только для связи по вашему запросу.",
      detailsLabel: "Подробнее: Финальный шаг",
      detailsTarget: "final_cta",
    },
  ],
};
