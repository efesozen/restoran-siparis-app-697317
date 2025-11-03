'use client';

import { useOrders } from '@/features/orders/hooks/use-orders';

export default function DashboardPage() {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p className="text-muted-foreground mb-6">Main dashboard for users to manage orders and view analytics.</p>
      
      <div className="grid gap-4">
        {orders?.map((order: any) => (
          <div key={order.id} className="border rounded p-4">
            <pre>{JSON.stringify(order, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}
