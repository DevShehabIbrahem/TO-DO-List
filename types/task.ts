export type TaskColumn = 'backlog' | 'in_progress' | 'review' | 'done';

export type TaskPriority = 'high' | 'medium' | 'low';

export interface Task {
  id: string;
  title: string;
  description: string;
  column: TaskColumn;
  priority?: TaskPriority;
  createdAt?: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  column: TaskColumn;
  priority?: TaskPriority;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  id: string;
}

export const COLUMN_IDS: TaskColumn[] = ['backlog', 'in_progress', 'review', 'done'];

export const COLUMN_LABELS: Record<TaskColumn, string> = {
  backlog: 'To Do',
  in_progress: 'In Progress',
  review: 'In Review',
  done: 'Done',
};
