import { NextResponse } from 'next/server';
import { getAllTasks, createTask } from '@/lib/tasks-store';
import type { CreateTaskInput } from '@/types/task';

export async function GET() {
  const tasks = getAllTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateTaskInput;
    const task = createTask(body);
    return NextResponse.json(task);
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
}
