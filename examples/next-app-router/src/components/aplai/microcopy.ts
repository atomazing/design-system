
type ValidationErrors = {
  readonly contactRequired: string;
  readonly contactEmail: string;
  readonly contactPhone: string;
  readonly roleRequired: string;
  readonly taskRequired: string;
};

type FormFieldMicrocopy = {
  readonly companyPlaceholder: string;
  readonly companyHelper: string;
  readonly rolePlaceholder: string;
  readonly contactPlaceholder: string;
  readonly contactHelper: string;
  readonly requiredFieldsHint: string;
  readonly taskPlaceholder: string;
  readonly taskHelper: string;
  readonly loadingNote: string;
};

type AplaiMicrocopySystem = {
  readonly architectureHint: string;
  readonly stepperHint: string;
  readonly templatesHint: string;
  readonly faqHint: string;
  readonly privacyLine: string;
  readonly whatsNextCompact: string;
  readonly validation: ValidationErrors;
  readonly form: FormFieldMicrocopy;
};

export const APLAI_MICROCOPY: AplaiMicrocopySystem = {
  architectureHint: "Сверьте этот контур с вашими текущими ограничениями и требованиями.",
  stepperHint: "Покажем этот путь на демо за 10-15 минут.",
  templatesHint: "Если сценарий другой - обсудим пилот под вашу задачу.",
  faqHint: "Ниже короткие ответы на частые вопросы перед пилотом.",
  privacyLine: "Не передаем контакты в аналитику. Используем только для связи по запросу.",
  whatsNextCompact: "Уточним задачу -> покажем демо -> предложим план пилота",
  validation: {
    contactRequired: "Укажите email или телефон.",
    contactEmail: "Проверьте формат email.",
    contactPhone: "Проверьте номер телефона.",
    roleRequired: "Выберите роль.",
    taskRequired: "Опишите задачу в 1-2 предложениях.",
  },
  form: {
    companyPlaceholder: "Например: Компания N",
    companyHelper: "Опционально. Поможет подготовить демо под ваш контур.",
    rolePlaceholder: "Выберите",
    contactPlaceholder: "Email или телефон",
    contactHelper: "Используем только для связи по запросу",
    requiredFieldsHint:
      "Нужны только роль и контакт. Компания и задача помогут подготовить демо точнее, но не обязательны.",
    taskPlaceholder: "1-2 предложения: что хотите ускорить или запустить",
    taskHelper: "Опционально. Например: нужен быстрый пилот CRM, процессов или миграции",
    loadingNote: "Это займет несколько секунд.",
  },
};
