"use client";

import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Ticket, Clock, CheckCircle } from "lucide-react";
import RecentSales from "@/components/RecentSales";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { format } from 'date-fns';

export default function AdminDashboard() {
  const { tickets } = useData();

  const totalListed = tickets.length;
  const pendingApprovals = tickets.filter(t => t.status === 'pending').length;
  const soldTickets = tickets.filter(t => t.status === 'sold');
  const totalRevenue = soldTickets.reduce((acc, t) => acc + t.price, 0);
  const totalSalesCount = soldTickets.length;

  const salesData = soldTickets.reduce((acc, ticket) => {
    if (ticket.purchaseDate) {
      const date = format(new Date(ticket.purchaseDate), 'MMM d');
      const existing = acc.find(item => item.name === date);
      if (existing) {
        existing.total += ticket.price;
      } else {
        acc.push({ name: date, total: ticket.price });
      }
    }
    return acc;
  }, [] as { name: string; total: number }[]).sort((a,b) => new Date(a.name) > new Date(b.name) ? 1 : -1);

  return (
    <div className="flex h-full flex-col">
      <div className="flex-shrink-0 p-8 pt-6 pb-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight font-headline uppercase">Dashboard</h2>
        </div>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto px-8 pb-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">£{totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
              <Ticket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalListed}</div>
              <p className="text-xs text-muted-foreground">+10 since last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">Require review</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSalesCount}</div>
              <p className="text-xs text-muted-foreground">+5 since yesterday</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="font-headline uppercase">Recent Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="font-headline uppercase">Sales Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {salesData.length > 0 ? (
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={salesData}>
                    <XAxis
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `£${value}`}
                    />
                    <Tooltip
                      cursor={{ fill: 'hsl(var(--muted))' }}
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                    />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                    <p>No sales data to display.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
