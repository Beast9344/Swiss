"use client";

import { useData } from "@/context/DataContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function RecentSales() {
  const { state } = useData();
  const { tickets, users } = state;

  const recentSales = tickets
    .filter((ticket) => ticket.status === "sold" && ticket.purchaseDate)
    .sort((a, b) => new Date(b.purchaseDate!).getTime() - new Date(a.purchaseDate!).getTime())
    .slice(0, 5);
    
  const getUserInfo = (userId: string) => users.find((u) => u.id === userId);

  return (
    <div className="space-y-8">
      {recentSales.map((ticket) => {
        const user = getUserInfo(ticket.sellerId);
        return (
          <div key={ticket.id} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <div className="ml-auto font-medium">+£{ticket.price.toFixed(2)}</div>
          </div>
        );
      })}
      {recentSales.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No recent sales have been recorded.
        </p>
      )}
    </div>
  );
}
