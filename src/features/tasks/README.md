# Tasks feature

Everything for viewing and managing tasks.

- TaskCard.tsx       presentational card (props in, events out)
- TaskForm.tsx       controlled add-task form with validation
- SearchBar.tsx      presentational search input
- useTasks.ts        loads tasks from the API (loading + data)
- useTaskFilters.ts  search state + derived visible list
- taskService.ts     API calls (internal — not in the barrel)
- index.ts           public surface (import from '@/features/tasks')

Data flows: component -> hook -> service -> API.