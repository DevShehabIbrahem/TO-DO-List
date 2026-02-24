# Kanban ToDo Dashboard

A Kanban-style task board built with **Next.js**, **Redux**, **React Query**, and **Material UI**. Tasks can be created, updated, deleted, and moved between columns via drag-and-drop. Data is cached with React Query and the UI is powered by a local mock API (json-server).

## Features

- **4 columns**: To Do (Backlog), In Progress, In Review, Done
- **Task fields**: title, description, column, priority (high/medium/low)
- **CRUD**: Create, update, and delete tasks
- **Drag-and-drop**: Move tasks between columns (drag handle on each card)
- **Pagination**: "Show more" in each column to reveal additional tasks (default 5 per column)
- **Search**: Filter tasks by title or description (Redux-backed search bar)
- **Material UI**: Layout and components (AppBar, Cards, Dialogs, Chips, etc.)
- **React Query**: Server state and caching for tasks API
- **Redux**: Client state for search query

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Redux Toolkit** (search state)
- **TanStack React Query** (tasks API, cache)
- **Material UI (MUI) v5**
- **@dnd-kit** (drag-and-drop)
- **json-server** (mock REST API)

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn

### Install dependencies

```bash
npm install
```

### Run the app (API + Next.js together)

One command starts both the mock API and the Next.js app:

```bash
npm run dev
```

This runs **json-server** on `http://localhost:3001` and **Next.js** on [http://localhost:3000](http://localhost:3000). Open the app URL to see the Kanban board with sample tasks.

**Optional – run separately:**  
- API only: `npm run api`  
- App only (if API is already running): `npm run dev:app`

### Build for production

```bash
npm run build
npm start
```

Keep `npm run api` running (or point `NEXT_PUBLIC_API_URL` to a deployed API) when using the production build.

## Project structure

```
├── app/
│   ├── layout.tsx       # Root layout, MUI theme, Redux/React Query providers
│   ├── page.tsx         # Dashboard page (header + Kanban board)
│   ├── providers.tsx    # Redux + React Query providers
│   └── EmotionCache.tsx # Emotion cache for MUI + Next.js
├── components/
│   ├── KanbanBoard.tsx  # DnD context, columns, task CRUD, dialogs
│   ├── KanbanColumn.tsx # Droppable column, task list, "Add task", "Show more"
│   ├── TaskCard.tsx     # Draggable card (drag handle), title, description, priority, edit/delete menu
│   ├── TaskFormDialog.tsx # Create/Edit task form (title, description, column, priority)
│   └── SearchBar.tsx    # Search input (Redux)
├── hooks/
│   └── useTasks.ts      # React Query hooks: useTasksQuery, useCreateTaskMutation, etc.
├── lib/
│   └── api.ts           # Fetch wrappers for tasks CRUD (json-server)
├── store/
│   ├── index.ts         # Redux store
│   └── searchSlice.ts   # Search query state
├── theme/
│   └── index.ts         # MUI theme
├── types/
│   └── task.ts          # Task, TaskColumn, CreateTaskInput, etc.
├── db.json              # json-server data (tasks)
└── package.json
```

## API (json-server)

- `GET /tasks` — list all tasks
- `GET /tasks/:id` — get one task
- `POST /tasks` — create task (body: `{ title, description, column, priority? }`)
- `PATCH /tasks/:id` — update task (partial body)
- `DELETE /tasks/:id` — delete task

`column` must be one of: `backlog`, `in_progress`, `review`, `done`.

## Deployment

- **Next.js**: Deploy to Vercel, Netlify, or any Node host. Set `NEXT_PUBLIC_API_URL` to your tasks API URL if not same-origin.
- **API**: For a live API, deploy `db.json` + json-server (e.g. to Railway, Render, or use a real backend). For local-only, run `npm run api` and use the app locally.

## License

MIT.
