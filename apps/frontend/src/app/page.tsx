'use client';

import { useRestaurants } from '@/features/restaurants/hooks/use-restaurants';

export default function HomePage() {
  const { data: restaurants, isLoading } = useRestaurants();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <p className="text-muted-foreground mb-6">Landing page introducing the restaurant order app and its features.</p>
      
      <div className="grid gap-4">
        {restaurants?.map((restaurant: any) => (
          <div key={restaurant.id} className="border rounded p-4">
            <pre>{JSON.stringify(restaurant, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
