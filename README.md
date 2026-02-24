# Kanban ToDo Dashboard

A Kanban-style task board built with **Next.js**, **Redux**, **React Query**, and **Material UI**. Tasks can be created, updated, deleted, and moved between columns via drag-and-drop. Data is cached with React Query. The API runs as Next.js API routes (Vercel-ready) or via json-server when `NEXT_PUBLIC_API_URL` is set.

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

### Run the app

**Option A – Next.js only (uses built-in API):**

```bash
npm run dev:app
```

The app uses **Next.js API routes** at `/api/tasks` (no json-server). Open [http://localhost:3000](http://localhost:3000).

**Option B – Next.js + json-server (two terminals or one):**

- One command: `npm run dev` (starts json-server on 3001 and Next.js on 3000).
- To use json-server, create `.env.local` with: `NEXT_PUBLIC_API_URL=http://localhost:3001`

### Build for production

```bash
npm run build
npm start
```

With no `NEXT_PUBLIC_API_URL`, the app uses the built-in `/api/tasks` (same host).

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
├── app/api/tasks/       # Next.js API routes (used on Vercel)
├── lib/
│   ├── api.ts           # Fetch wrappers (uses /api/tasks or external URL)
│   └── tasks-store.ts   # In-memory store for API routes
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

## API

When using the built-in API (default on Vercel and when `NEXT_PUBLIC_API_URL` is not set), routes are under `/api/tasks`:

- `GET /api/tasks` — list all tasks
- `GET /api/tasks/:id` — get one task
- `POST /api/tasks` — create task (body: `{ title, description, column, priority? }`)
- `PATCH /api/tasks/:id` — update task (partial body)
- `DELETE /api/tasks/:id` — delete task

`column` must be one of: `backlog`, `in_progress`, `review`, `done`.  
With `NEXT_PUBLIC_API_URL` set (e.g. to json-server), the same paths are used relative to that URL (`/tasks`, `/tasks/:id`).

## Deployment (Vercel)

1. Push your code to GitHub and import the repo in [Vercel](https://vercel.com).
2. **Do not** set `NEXT_PUBLIC_API_URL` — the app will use the built-in API routes (`/api/tasks`) on the same deployment.
3. Deploy. The API is served by the same Vercel project (serverless functions).

**How the API is managed on Vercel:**

- Tasks are handled by **Next.js API routes** in `app/api/tasks/` and `app/api/tasks/[id]/`.
- Data is stored **in-memory** in the serverless function (resets on cold start). For persistent storage, add [Vercel KV](https://vercel.com/docs/storage/vercel-kv) or a database and update `lib/tasks-store.ts`.
- To use an external API (e.g. your own backend) instead, set the env var `NEXT_PUBLIC_API_URL` to that API’s base URL in the Vercel project settings.

## License

MIT.
