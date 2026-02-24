'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import type { Task, TaskPriority } from '@/types/task';

const PRIORITY_COLOR: Record<TaskPriority, 'error' | 'warning' | 'info'> = {
  high: 'error',
  medium: 'warning',
  low: 'info',
};

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task },
  });

  const style = transform
    ? { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : 1 }
    : undefined;

  const handleMenu = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleEdit = () => {
    onEdit(task);
    handleClose();
  };
  const handleDelete = () => {
    onDelete(task.id);
    handleClose();
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 1.5,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ py: 1.5, '&:last-child': { pb: 1.5 }, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
          <Box
            sx={{ cursor: 'grab', color: 'text.secondary', '&:active': { cursor: 'grabbing' }, mt: 0.25 }}
            {...attributes}
            {...listeners}
          >
            <DragIndicatorIcon fontSize="small" />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {task.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {task.priority && (
                <Chip
                  size="small"
                  label={task.priority.toUpperCase()}
                  color={PRIORITY_COLOR[task.priority]}
                  sx={{ textTransform: 'uppercase' }}
                />
              )}
              <IconButton size="small" onClick={handleMenu} sx={{ ml: 'auto' }} aria-label="options">
                <MoreVertIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}
