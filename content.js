// Личные данные и ВСЕ внешние ссылки редактируются здесь.
// Пустая ссылка скрывает соответствующую кнопку. demo — только проверенное демо.
window.PORTFOLIO = {
  name: 'Максим Чечёткин',
  contact: '@imnobitch',
  links: {
    github: 'https://github.com/advantan-boop',
    telegram: 'https://t.me/imnobitch'
  },
  projects: [
    {
      name: 'TaskFlow', category: 'Веб-приложение · учебный проект',
      description: 'Канбан-доска для небольших команд: задачи, чек-листы, файлы и командный чат в одном приложении.',
      stack: ['Python', 'Django / DRF', 'PostgreSQL', 'React', 'Redis'],
      feature: 'Права доступа к доске и задачам: наблюдатель читает, участник редактирует, администратор управляет доской.',
      file: 'api/permissions.py',
      snippet: 'class CanEditTask(BasePermission):\n    def has_object_permission(self, request, view, obj):\n        return (\n            request.method in SAFE_METHODS\n            or can_edit(obj.project, request.user)\n        )',
      code: 'https://github.com/advantan-boop/taskflow-portfolio/blob/main/api/permissions.py',
      repo: 'https://github.com/advantan-boop/taskflow-portfolio',
      demo: '', // README указывает https://skyflowshit.ru — включить после проверки доступности.
    },
    {
      name: 'BarberBot', category: 'Telegram Mini App + бот',
      description: 'Живая очередь и клиентская база для барбершопов. Клиент встаёт в очередь онлайн, а мастер видит предстоящие визиты.',
      stack: ['Python', 'FastAPI', 'PostgreSQL', 'aiogram', 'React'],
      feature: 'Расчёт времени ожидания: подбор свободного окна у мастера с учётом смены, занятых интервалов и длительности услуг.',
      file: 'backend/app/domain/queue/eta.py',
      snippet: 'for w in sorted(free):\n    s = max(w.start, not_before)\n    if s + need <= w.end:\n        return s\nreturn None',
      code: 'https://github.com/advantan-boop/barberbot-portfolio/blob/main/backend/app/domain/queue/eta.py',
      repo: 'https://github.com/advantan-boop/barberbot-portfolio',
      demo: '', // Публичная демо-ссылка не указана в репозитории.
    },
    {
      name: 'SVG-drop', category: 'Редактор в браузере',
      description: 'Сборщик векторных иллюстраций из готовой библиотеки. Подбор объектов, смена палитры, работа со слоями и экспорт в SVG.',
      stack: ['React', 'TypeScript', 'Vite', 'SVG'],
      feature: 'Экспорт композиции: сборка слоёв в SVG, применение палитры и уникальные идентификаторы для повторяющихся объектов.',
      file: 'app/src/lib/render.ts',
      snippet: `const layers = scene.layers\n  .filter((l) => !l.hidden)\n  .map((l) => layerMarkup(ctx, scene, l, map))\n  .join('\\n');`,
      code: 'https://github.com/advantan-boop/svg-drop/blob/main/app/src/lib/render.ts',
      repo: 'https://github.com/advantan-boop/svg-drop',
      demo: 'https://advantan-boop.github.io/svg-drop/', // Проверено в браузере 2026-11-16.
    }
  ]
};
