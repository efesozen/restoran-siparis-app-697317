import type { CreateRestaurantDto, UpdateRestaurantDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { restaurantsService } from '../services';

const RESTAURANT_KEY = ['restaurants'];

export function useRestaurants() {
  return useQuery({
    queryKey: RESTAURANT_KEY,
    queryFn: () => restaurantsService.getAll(),
  });
}

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: [...RESTAURANT_KEY, id],
    queryFn: () => restaurantsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRestaurantDto) => restaurantsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_KEY });
    },
  });
}

export function useUpdateRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRestaurantDto }) =>
      restaurantsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_KEY });
    },
  });
}

export function useDeleteRestaurant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restaurantsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESTAURANT_KEY });
    },
  });
}
