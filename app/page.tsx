'use client';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useTasksQuery } from '@/hooks/useTasks';
import SearchBar from '@/components/SearchBar';
import KanbanBoard from '@/components/KanbanBoard';

export default function Home() {
  const { data: tasks = [] } = useTasksQuery();
  const totalTasks = tasks.length;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DashboardIcon color="primary" />
            <Typography variant="h6" fontWeight={600}>
              Kanban Board
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {totalTasks} {totalTasks === 1 ? 'task' : 'tasks'}
            </Typography>
          </Box>
          <SearchBar />
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 2 }}>
        <KanbanBoard />
      </Box>
    </Box>
  );
}
