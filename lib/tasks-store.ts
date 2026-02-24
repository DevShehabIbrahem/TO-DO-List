import type { Task, CreateTaskInput } from '@/types/task';

const DEFAULT_TASKS: Task[] = [
  { id: '1', title: 'API integration', description: 'Connect frontend to REST API endpoints', column: 'backlog', priority: 'high', createdAt: '2025-02-20T10:00:00.000Z' },
  { id: '2', title: 'Unit tests', description: 'Write tests for utility functions and hooks', column: 'backlog', priority: 'low', createdAt: '2025-02-20T10:05:00.000Z' },
  { id: '3', title: 'Performance audit', description: 'Lighthouse scores and bundle analysis', column: 'backlog', priority: 'low', createdAt: '2025-02-20T10:10:00.000Z' },
  { id: '4', title: 'Notification system', description: 'Toast notifications and in-app alerts', column: 'backlog', priority: 'medium', createdAt: '2025-02-20T10:15:00.000Z' },
  { id: '5', title: 'User settings page', description: 'Profile editing, preferences, and account management', column: 'backlog', priority: 'low', createdAt: '2025-02-20T10:20:00.000Z' },
  { id: '6', title: 'Authentication flow', description: 'Implement login, signup, and password reset screens', column: 'in_progress', priority: 'high', createdAt: '2025-02-19T09:00:00.000Z' },
  { id: '7', title: 'File upload component', description: 'Drag and drop file upload with preview', column: 'in_progress', priority: 'medium', createdAt: '2025-02-19T09:30:00.000Z' },
  { id: '8', title: 'Dark mode support', description: 'Add theme toggle and CSS variable switching', column: 'review', priority: 'medium', createdAt: '2025-02-18T14:00:00.000Z' },
  { id: '9', title: 'Dashboard layout', description: 'Build responsive sidebar and main content area', column: 'review', priority: 'medium', createdAt: '2025-02-18T14:30:00.000Z' },
  { id: '10', title: 'Design system tokens', description: 'Set up color palette, typography, and spacing scales', column: 'done', priority: 'high', createdAt: '2025-02-17T11:00:00.000Z' },
];

let tasks: Task[] = [...DEFAULT_TASKS];

function generateId(): string {
  return Math.random().toString(36).slice(2, 11);
}

export function getAllTasks(): Task[] {
  return [...tasks];
}

export function getTaskById(id: string): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(input: CreateTaskInput): Task {
  const task: Task = {
    id: generateId(),
    title: input.title,
    description: input.description,
    column: input.column,
    priority: input.priority,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  return task;
}

export function updateTask(id: string, input: Partial<CreateTaskInput>): Task | null {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return null;
  tasks[index] = { ...tasks[index], ...input };
  return tasks[index];
}

export function deleteTask(id: string): boolean {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return false;
  tasks.splice(index, 1);
  return true;
}
