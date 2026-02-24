'use client';

import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import type { Task, TaskColumn, TaskPriority, CreateTaskInput } from '@/types/task';

type Mode = 'create' | 'edit';

interface TaskFormDialogProps {
  open: boolean;
  onClose: () => void;
  mode: Mode;
  initialColumn?: TaskColumn;
  initialTask?: Task | null;
  onSubmit: (input: CreateTaskInput & { id?: string }) => void;
  isLoading?: boolean;
}

const COLUMNS: { value: TaskColumn; label: string }[] = [
  { value: 'backlog', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'review', label: 'In Review' },
  { value: 'done', label: 'Done' },
];

const PRIORITIES: { value: TaskPriority; label: string }[] = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export default function TaskFormDialog({
  open,
  onClose,
  mode,
  initialColumn = 'backlog',
  initialTask = null,
  onSubmit,
  isLoading = false,
}: TaskFormDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState<TaskColumn>(initialColumn);
  const [priority, setPriority] = useState<TaskPriority>('medium');

  useEffect(() => {
    if (open) {
      if (mode === 'edit' && initialTask) {
        setTitle(initialTask.title);
        setDescription(initialTask.description);
        setColumn(initialTask.column);
        setPriority(initialTask.priority || 'medium');
      } else {
        setTitle('');
        setDescription('');
        setColumn(initialColumn);
        setPriority('medium');
      }
    }
  }, [open, mode, initialTask, initialColumn]);

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (mode === 'edit' && initialTask) {
      onSubmit({ id: initialTask.id, title: title.trim(), description: description.trim(), column, priority });
    } else {
      onSubmit({ title: title.trim(), description: description.trim(), column, priority });
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{mode === 'create' ? 'Add task' : 'Edit task'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          select
          label="Column"
          fullWidth
          value={column}
          onChange={(e) => setColumn(e.target.value as TaskColumn)}
        >
          {COLUMNS.map((c) => (
            <MenuItem key={c.value} value={c.value}>
              {c.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="dense"
          select
          label="Priority"
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          {PRIORITIES.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              {p.label}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!title.trim() || isLoading}>
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
