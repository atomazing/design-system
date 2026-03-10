
type TemplateEntry = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly secondaryLine?: string;
};

type AplaiTemplatesGallery = {
  readonly title: string;
  readonly subtitle: string;
  readonly items: readonly TemplateEntry[];
  readonly supportLine: string;
  readonly secondaryCtaLabel: string;
};

export const APLAI_TEMPLATES_GALLERY: AplaiTemplatesGallery = {
  title: "Шаблоны, с которых можно начать",
  subtitle:
    "Шаблоны дают стандартизированную основу: можно быстро запуститься и развивать решение как полноценное корпоративное приложение.",
  items: [
    {
      id: "bpm",
      title: "BPM-шаблон",
      subtitle:
        "Запуск процессных приложений: задачи, статусы и маршрут согласования.",
      secondaryLine: "Портал задач • демо-процесс",
    },
    {
      id: "crm",
      title: "CRM-шаблон",
      subtitle:
        "Работа с обращениями и активностями: от регистрации до ответа.",
      secondaryLine: "Контакты и контрагенты • сценарии обращений",
    },
    {
      id: "converter",
      title: "Конвертер из legacy / low-code",
      subtitle:
        "Переезд с платформы: анализ, требования и план миграции.",
      secondaryLine: "Legacy / low-code • нейтральные требования миграции",
    },
    {
      id: "ui_layout",
      title: "UI-layout шаблон",
      subtitle:
        "Быстрые кликабельные макеты и UI-каркас для согласования.",
      secondaryLine: "Стилизация по референсам • быстрое развертывание",
    },
  ],
  supportLine: "Если вашего сценария нет - обсудим пилот под вашу задачу.",
  secondaryCtaLabel: "Обсудить пилот",
};
