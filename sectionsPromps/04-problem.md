# APLAI Problem Section Prompt Pack

## Section Snapshot

- `SECTION_ID`: `problem`
- `Section Type`: `standalone`
- `Isolation`: `High`
- `Parent`: `page`
- `Primary Question`: `Почему это важно сейчас?`
- `Live Files`:
  - `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
  - `examples/next-app-router/src/components/aplai/problemSection.ts`
- `Frozen Shared Contract`:
  - `scrollToSection("how_it_works")`

## Why This Section Goes First

- Это безопасная стартовая секция для калибровки новых prompt packs.
- У нее высокий уровень изоляции и один понятный bridge CTA.
- Секция уже неплохая по смыслу, поэтому здесь можно отработать не "полный передел", а дисциплину UX-упрощения.
- Правильный результат здесь: улучшить скорость понимания, не ломая narrative arc страницы.

## Working Diagnosis

- Секция уже отвечает на один вопрос, но ее можно сделать быстрее для сканирования.
- Сейчас в ней есть дублирование между `title`, `callout` и `lead`.
- 4 pain-карточки работают, но их еще нужно проверить на смысловые пересечения и порядок чтения.
- CTA-переход в `how_it_works` правильный и должен остаться.
- Это секция про проблему старта, а не про аудитории, не про value proposition и не про guarantees.

## Common Preflight For Every Prompt In This File

Перед выполнением любого промпта сначала загрузи и используй в таком порядке:

1. `examples/next-app-router/AGENTS.md`
2. `examples/next-app-router/docs/landing-template-rules.md`
3. `examples/next-app-router/docs/features/aplai-landing-section-migration-log.md`
4. `rules/APLAI_Section_UX_Rules.md`
5. `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
6. `examples/next-app-router/src/components/aplai/problemSection.ts`

Обязательные ограничения для всех промптов:

- Работай только в рамках секции `problem`.
- Не меняй `section id`.
- Не ломай `scrollToSection("how_it_works")`.
- Не превращай секцию в proof-блок, audience-блок или mechanism-блок.
- Не добавляй новые секции.
- Не увеличивай число CTA.
- Не делай визуальный редизайн.
- Не добавляй decorative surfaces.
- Если проблему можно решить сокращением иерархии и плотности, делай это раньше, чем усложнение layout.

---

## Prompt 1. Section Audit

```md
Ты анализируешь только секцию `problem` в landing page APLAI.

Сначала выполни Common Preflight из файла `sectionsPromps/04-problem.md`.

Твоя задача: провести жесткий UX-аудит текущей секции без предложений по коду.

Ответь строго в формате:

### Section
- SECTION_ID:
- Type:
- Isolation:
- Frozen Contracts:

### Function
- Одна фраза: какую одну задачу секция должна выполнять в воронке.

### 3-5 Second Takeaway
- Что пользователь должен понять за 3-5 секунд.

### Current Strengths
- Что уже работает хорошо и должно быть сохранено.

### Current Problems
- Только конкретные UX-проблемы:
  - где дублируется мысль
  - где claim и supporting text слишком близки по смыслу
  - есть ли пересечения между pain cards
  - не перегружен ли верх секции
  - логичен ли переход в `how_it_works`

### Keep Frozen
- Что нельзя ломать в этой секции.

### Risk Of Over-Editing
- Что здесь опасно "улучшать", потому что секция уже близка к хорошей.

Не предлагай код. Не переписывай контент. Не предлагай новую структуру. Только анализ.
```

---

## Prompt 2. Narrative Compression

```md
Ты работаешь только над секцией `problem` в landing page APLAI.

Сначала выполни Common Preflight из файла `sectionsPromps/04-problem.md`.
Затем используй результат Prompt 1 как входные данные.

Твоя задача: сжать секцию до одной мысли, одного фокуса и одного маршрута чтения.

Ответь строго в формате:

### Core Question
- Какой один вопрос должна закрывать секция.

### Main Thesis
- Один главный тезис секции.

### What Must Be Understood First
- Что должно быть понятно до карточек.

### What Moves To Supporting Level
- Какие смыслы нельзя держать на первом плане.

### What Must Not Enter This Section
- Какие темы принадлежат соседним секциям:
  - `who_its_for`
  - `value_prop`
  - `how_it_works`
  - `guarantees`

### New Reading Formula
- Запиши новую формулу секции в виде:
  - claim
  - explanation
  - pain proof
  - transition

### Edit Severity
- Выбери одно:
  - light packaging fix
  - medium structural cleanup
  - heavy rewrite

Объясни выбор в 3-5 предложениях.
Не предлагай код.
```

---

## Prompt 3. Structure Rebuild

```md
Ты работаешь только над секцией `problem` в landing page APLAI.

Сначала выполни Common Preflight из файла `sectionsPromps/04-problem.md`.
Затем используй результаты Prompt 1 и Prompt 2 как обязательный вход.

Твоя задача: предложить новую UX-структуру секции сверху вниз без визуального редизайна.

Ответь строго в формате:

### Section
- SECTION_ID:
- Type:
- Isolation:

### Proposed Structure
- Top-to-bottom order of blocks.
- Для каждого блока укажи:
  - роль блока
  - primary / supporting / proof / transition
  - что пользователь должен понять именно здесь

### CTA Logic
- Почему CTA должен остаться в конце.
- Почему переход именно в `how_it_works` логичен.

### Desktop Reading Flow
- Как секция читается на desktop.

### Mobile-First Reading Flow
- Как тот же порядок сохраняется на mobile.

### What Gets Smaller
- Какие элементы должны стать короче, тише или проще.

### What Stays Unchanged
- Какие части текущей структуры уже правильные.

Не предлагай код.
Не добавляй новые блоки без необходимости.
Если считаешь, что текущая структура почти правильная, скажи это прямо.
```

---

## Prompt 4. Card Logic Cleanup

```md
Ты работаешь только над секцией `problem` в landing page APLAI.

Сначала выполни Common Preflight из файла `sectionsPromps/04-problem.md`.
Затем используй результаты Prompt 1, 2 и 3.

Твоя задача: пересобрать смысл 4 pain-карточек так, чтобы каждая карточка представляла одну отдельную проблему и не спорила с соседними.

Ответь строго в формате:

### Card Audit
- Для каждой текущей карточки:
  - что в ней полезно
  - с какой карточкой она может пересекаться
  - нужно ли менять ее смысл или только упаковку

### Recommended Card Set
- Предложи финальный набор из 4 карточек.
- Для каждой карточки укажи:
  - title
  - one-sentence problem statement
  - why it deserves its own card

### Card Order
- В каком порядке карточки должны идти и почему.

### Duplication Check
- Где удалось убрать пересечения.

### Reading Speed Check
- Почему новый набор карточек читается быстрее.

Не предлагай код.
Не превращай карточки в value statements или solution statements.
Карточки должны описывать именно friction старта.
```

---

## Prompt 5. Final Content Rewrite

```md
Ты работаешь только над секцией `problem` в landing page APLAI.

Сначала выполни Common Preflight из файла `sectionsPromps/04-problem.md`.
Затем используй результаты Prompt 1, 2, 3 и 4.

Твоя задача: подготовить финальную переписанную версию секции как content/UX результат перед кодом.

Ответь строго в формате:

### Final Section Goal
- Одним абзацем: что именно должна делать секция после переработки.

### Rewritten Content
- Section title
- Callout
- Lead
- 4 cards:
  - title
  - summary
- Bridge CTA label

### Content Hierarchy
- Что главное
- Что supporting
- Что proof
- Что transition

### Mobile Order
- Точный порядок блоков на мобильном

### Quality Check
- Проверь по чеклисту:
  - одна ли главная мысль
  - один ли активный фокус
  - быстро ли сканируется секция
  - не делает ли она работу соседней секции
  - не перегружен ли первый экран секции

Не предлагай код.
Не расширяй объем текста без сильной причины.
Предпочти ясность и сканируемость, а не маркетинговую "красоту".
```

---

## Prompt 6. Implementation Prompt

```md
Ты работаешь только над секцией `problem` в landing page APLAI и должен выполнить изменение в коде.

Сначала выполни Common Preflight из файла `sectionsPromps/04-problem.md`.
Затем используй результат Prompt 5 как content source of truth.

Твоя задача: внедрить переработку секции `problem` в коде с минимальным вмешательством.

Обязательные файлы для работы:

- `examples/next-app-router/src/components/aplai/AplaiLanding.tsx`
- `examples/next-app-router/src/components/aplai/problemSection.ts`

Не трогай соседние секции, если это не требуется напрямую.

Жесткие ограничения:

- Сохрани `id="problem"`.
- Сохрани `scrollToSection("how_it_works")`.
- Не добавляй новый CTA.
- Не меняй route structure.
- Не добавляй декоративные поверхности.
- Не ломай текущий visual direction starter-а.
- Если можно решить задачу изменением copy и локальной иерархии, не делай более тяжелый refactor.

После изменений ответь строго в формате:

### Changed Files
- Какие файлы реально изменены.

### What Changed
- Что было изменено в структуре и контенте секции.

### What Stayed Frozen
- Какие контракты сохранены без изменений.

### Validation
- Подтверди:
  - section reading flow is clearer
  - cards do not duplicate each other
  - CTA still routes to `how_it_works`
  - mobile order preserved
  - no extra surfaces introduced

### Residual Risk
- Что еще может потребовать второй проход, но не должно блокировать эту правку.
```

---

## Expected Outcome Of This File

- Сначала промпты выявляют реальные UX-проблемы секции.
- Затем они сжимают секцию до одного narrative.
- Потом фиксируют новую структуру.
- Затем очищают логику карточек.
- Потом формируют финальную content version.
- И только после этого переводят решение в код.
