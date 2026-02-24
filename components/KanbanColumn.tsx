'use client';

import { useDroppable } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import type { Task, TaskColumn } from '@/types/task';
import { COLUMN_LABELS } from '@/types/task';
import TaskCard from './TaskCard';

const COLUMN_COLORS: Record<TaskColumn, string> = {
  backlog: '#2196f3',
  in_progress: '#ff9800',
  review: '#9c27b0',
  done: '#4caf50',
};

interface KanbanColumnProps {
  columnId: TaskColumn;
  tasks: Task[];
  pageSize: number;
  showMore: boolean;
  onShowMore: () => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export default function KanbanColumn({
  columnId,
  tasks,
  pageSize,
  showMore,
  onShowMore,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });
  const displayedTasks = showMore ? tasks : tasks.slice(0, pageSize);
  const hasMore = tasks.length > pageSize && !showMore;

  return (
    <Paper
      ref={setNodeRef}
      sx={{
        flex: '1 1 0',
        minWidth: 280,
        maxWidth: 320,
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isOver ? 'action.hover' : 'background.paper',
        border: isOver ? 2 : 0,
        borderColor: COLUMN_COLORS[columnId],
        transition: 'background-color 0.2s',
      }}
    >
      <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            bgcolor: COLUMN_COLORS[columnId],
          }}
        />
        <Typography variant="subtitle1" fontWeight={600}>
          {COLUMN_LABELS[columnId]}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto', p: 1.5, display: 'flex', flexDirection: 'column' }}>
        {displayedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
        {hasMore && (
          <Button size="small" onClick={onShowMore} sx={{ mt: 1 }}>
            Show more ({tasks.length - pageSize} more)
          </Button>
        )}
      </Box>
      <Box sx={{ p: 1.5, borderTop: 1, borderColor: 'divider' }}>
        <Button
          fullWidth
          startIcon={<AddIcon />}
          onClick={onAddTask}
          size="small"
          variant="outlined"
        >
          Add task
        </Button>
      </Box>
    </Paper>
  );
}
