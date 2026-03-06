export type StarterFlowStep = {
  id: string;
  route: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  outcome: string;
  highlights: string[];
  actionLabel: string;
};

export type StarterNavItem = {
  href: string;
  label: string;
  matches?: string[];
};

export const starterFlowSteps: StarterFlowStep[] = [
  {
    id: "step-presets",
    route: "/presets",
    navLabel: "Пресеты",
    eyebrow: "Выберите визуальное направление",
    title: "Сначала задайте стиль, потом собирайте экран.",
    description:
      "Сильный пресет сразу задает стартовому шаблону нужное настроение бренда.",
    outcome: "Понятное визуальное направление уже на первом экране.",
    highlights: [
      "Набор пресетов настроен для лендинговых поверхностей",
      "Быстрый путь от пустой оболочки к осмысленному интерфейсу",
    ],
    actionLabel: "Выбрать пресет",
  },
  {
    id: "step-theme-controls",
    route: "/debug/theme",
    navLabel: "Тема",
    eyebrow: "Проверьте управление",
    title: "Переключайте пресет и режим, не ломая оболочку.",
    description:
      "Смена темы должна ощущаться безопасно, быстро и сохраняться.",
    outcome: "Настройки работают как в реальном продукте.",
    highlights: [
      "Пресет и режим обновляются вместе",
      "Изменения сохраняются после перезагрузки",
    ],
    actionLabel: "Проверить настройки темы",
  },
  {
    id: "step-theme-state",
    route: "/debug/state",
    navLabel: "Состояние",
    eyebrow: "Проверьте источник истины",
    title: "Посмотрите итоговое состояние темы.",
    description:
      "Проверьте пресет, темный режим и итоговую палитру в одном спокойном экране.",
    outcome: "Единый источник истины для того, что приложение реально рендерит.",
    highlights: [
      "Видно и заданный, и фактический режим",
      "Полезно при отладке гидрации и сохранения состояния",
    ],
    actionLabel: "Проверить состояние темы",
  },
  {
    id: "step-showcase",
    route: "/showcase",
    navLabel: "Обзор",
    eyebrow: "Нагрузите интерфейс",
    title: "Проверьте поверхности, которые несут бренд.",
    description:
      "Типографику, формы, таблицы и контраст проще оценивать рядом.",
    outcome: "Быстрый аудит поверхностей до продуктовой разработки.",
    highlights: [
      "Слабые места интерфейса заметны раньше",
      "Сравнивайте пресеты на реальных компонентах",
    ],
    actionLabel: "Запустить визуальную проверку",
  },
  {
    id: "step-ssr",
    route: "/ssr",
    navLabel: "Статика",
    eyebrow: "Выпускайте без сюрпризов",
    title: "Подтвердите экспорт перед релизом.",
    description:
      "Одного статического маршрута достаточно, чтобы убедиться, что сборка остается стабильной.",
    outcome: "Уверенность, что стартовый шаблон можно отгружать как статический вывод.",
    highlights: [
      "Метка времени остается стабильной между перезагрузками",
      "Полезная финальная проверка перед деплоем",
    ],
    actionLabel: "Проверить статический вывод",
  },
];

export const starterFlowNavItems: StarterNavItem[] = [
  { href: "/", label: "Главная" },
  ...starterFlowSteps.map((step) => ({ href: step.route, label: step.navLabel })),
];
