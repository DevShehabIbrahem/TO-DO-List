'use client';

import { useState, useMemo } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { Task, TaskColumn } from '@/types/task';
import { COLUMN_IDS } from '@/types/task';
import { useTasksQuery, useUpdateTaskMutation, useCreateTaskMutation, useDeleteTaskMutation } from '@/hooks/useTasks';
import KanbanColumn from './KanbanColumn';
import TaskFormDialog from './TaskFormDialog';

const PAGE_SIZE = 5;

export default function KanbanBoard() {
  const searchQuery = useSelector((state: RootState) => state.search.query);
  const { data: tasks = [], isLoading, error } = useTasksQuery();
  const updateTask = useUpdateTaskMutation();
  const createTask = useCreateTaskMutation();
  const deleteTask = useDeleteTaskMutation();

  const [expandedColumns, setExpandedColumns] = useState<Record<TaskColumn, boolean>>({
    backlog: false,
    in_progress: false,
    review: false,
    done: false,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [dialogColumn, setDialogColumn] = useState<TaskColumn>('backlog');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const q = searchQuery.toLowerCase();
    return tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }, [tasks, searchQuery]);

  const tasksByColumn = useMemo(() => {
    const map: Record<TaskColumn, Task[]> = {
      backlog: [],
      in_progress: [],
      review: [],
      done: [],
    };
    filteredTasks.forEach((t) => {
      if (map[t.column]) map[t.column].push(t);
    });
    return map;
  }, [filteredTasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const taskId = String(active.id);
    const newColumn = over.id as TaskColumn;
    if (!COLUMN_IDS.includes(newColumn)) return;
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.column === newColumn) return;
    updateTask.mutate({ id: taskId, column: newColumn });
  };

  const openAddDialog = (column: TaskColumn) => {
    setDialogColumn(column);
    setDialogMode('create');
    setEditingTask(null);
    setDialogOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setDialogColumn(task.column);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleSubmit = (input: { id?: string; title: string; description: string; column: TaskColumn; priority?: import('@/types/task').TaskPriority }) => {
    if (dialogMode === 'edit' && input.id) {
      updateTask.mutate({
        id: input.id,
        title: input.title,
        description: input.description,
        column: input.column,
        priority: input.priority,
      });
    } else {
      createTask.mutate({
        title: input.title,
        description: input.description,
        column: input.column,
        priority: input.priority,
      });
    }
    setDialogOpen(false);
  };

  const toggleShowMore = (column: TaskColumn) => {
    setExpandedColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  };

  if (error) {
    return (
      <Box sx={{ p: 3, color: 'error.main' }}>
        Failed to load tasks. Is the API running? Start with: npm run api
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        Loading tasks...
      </Box>
    );
  }

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
            minHeight: 'calc(100vh - 120px)',
          }}
        >
          {COLUMN_IDS.map((columnId) => (
            <KanbanColumn
              key={columnId}
              columnId={columnId}
              tasks={tasksByColumn[columnId]}
              pageSize={PAGE_SIZE}
              showMore={expandedColumns[columnId]}
              onShowMore={() => toggleShowMore(columnId)}
              onAddTask={() => openAddDialog(columnId)}
              onEditTask={openEditDialog}
              onDeleteTask={(id) => deleteTask.mutate(id)}
            />
          ))}
        </Box>
      </DndContext>

      <TaskFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={dialogMode}
        initialColumn={dialogColumn}
        initialTask={editingTask}
        onSubmit={handleSubmit}
        isLoading={createTask.isPending || updateTask.isPending}
      />
    </>
  );
}
