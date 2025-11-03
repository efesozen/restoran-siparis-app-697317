import type { CreateOrderDto, UpdateOrderDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ordersService } from '../services';

const ORDER_KEY = ['orders'];

export function useOrders() {
  return useQuery({
    queryKey: ORDER_KEY,
    queryFn: () => ordersService.getAll(),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: [...ORDER_KEY, id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrderDto) => ordersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEY });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderDto }) =>
      ordersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEY });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ordersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ORDER_KEY });
    },
  });
}
