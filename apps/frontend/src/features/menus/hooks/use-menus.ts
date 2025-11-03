import type { CreateMenuDto, UpdateMenuDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { menusService } from '../services';

const MENU_KEY = ['menus'];

export function useMenus() {
  return useQuery({
    queryKey: MENU_KEY,
    queryFn: () => menusService.getAll(),
  });
}

export function useMenu(id: string) {
  return useQuery({
    queryKey: [...MENU_KEY, id],
    queryFn: () => menusService.getById(id),
    enabled: !!id,
  });
}

export function useCreateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMenuDto) => menusService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_KEY });
    },
  });
}

export function useUpdateMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMenuDto }) =>
      menusService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_KEY });
    },
  });
}

export function useDeleteMenu() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => menusService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MENU_KEY });
    },
  });
}
