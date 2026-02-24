const API_BASE = typeof window !== 'undefined' ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') : 'http://localhost:3001';

export async function fetchTasks(): Promise<import('@/types/task').Task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

export async function fetchTask(id: string): Promise<import('@/types/task').Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`);
  if (!res.ok) throw new Error('Failed to fetch task');
  return res.json();
}

export async function createTask(
  body: import('@/types/task').CreateTaskInput
): Promise<import('@/types/task').Task> {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}

export async function updateTask(
  id: string,
  body: Partial<import('@/types/task').CreateTaskInput>
): Promise<import('@/types/task').Task> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
}
