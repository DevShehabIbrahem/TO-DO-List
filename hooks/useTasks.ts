import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '@/lib/api';
import type { Task, CreateTaskInput, TaskColumn } from '@/types/task';

const QUERY_KEY = ['tasks'] as const;

export function useTasksQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: api.fetchTasks,
    staleTime: 30 * 1000,
  });
}

export function useTaskQuery(id: string | null) {
  return useQuery({
    queryKey: [...QUERY_KEY, id],
    queryFn: () => (id ? api.fetchTask(id) : Promise.reject(new Error('No id'))),
    enabled: !!id,
  });
}

export function useCreateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => api.createTask(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  });
}

export function useUpdateTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: { id: string; column?: TaskColumn; title?: string; description?: string }) =>
      api.updateTask(id, body),
    onSuccess: (updated) => {
      queryClient.setQueryData(QUERY_KEY, (old: Task[] | undefined) =>
        old ? old.map((t) => (t.id === updated.id ? updated : t)) : [updated]
      );
    },
  });
}

export function useDeleteTaskMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.deleteTask(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(QUERY_KEY, (old: Task[] | undefined) =>
        old ? old.filter((t) => t.id !== id) : []
      );
    },
  });
}
