"use client";

import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Ticket, Clock, CheckCircle, TrendingUp, Users, Calendar, Activity } from "lucide-react";
import RecentSales from "@/components/RecentSales";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { format } from 'date-fns';
import Link from "next/link";

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
        existing.count += 1;
      } else {
        acc.push({ name: date, total: ticket.price, count: 1 });
      }
    }
    return acc;
  }, [] as { name: string; total: number; count: number }[]).sort((a,b) => new Date(a.name).getTime() - new Date(b.name).getTime());

  const revenueGrowth = totalRevenue > 0 ? "+20.1%" : "0%";
  const ticketGrowth = totalListed > 0 ? "+10" : "0";
  const salesGrowth = totalSalesCount > 0 ? "+5" : "0";

  return (
    <div className="p-8">
        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Revenue</CardTitle>
              <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">
                £{totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                <span className="text-green-400 font-medium">{revenueGrowth}</span>
                <span className="text-slate-400 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Tickets</CardTitle>
              <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <Ticket className="h-5 w-5 text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{totalListed}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3 w-3 text-purple-400 mr-1" />
                <span className="text-purple-400 font-medium">{ticketGrowth}</span>
                <span className="text-slate-400 ml-1">since last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Pending Approvals</CardTitle>
              <div className="p-2 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{pendingApprovals}</div>
              <div className="flex items-center text-sm">
                <Clock className="h-3 w-3 text-orange-400 mr-1" />
                <span className="text-orange-400 font-medium">Require review</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Sales</CardTitle>
              <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                <CheckCircle className="h-5 w-5 text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-1">{totalSalesCount}</div>
              <div className="flex items-center text-sm">
                <TrendingUp className="h-3 w-3 text-blue-400 mr-1" />
                <span className="text-blue-400 font-medium">{salesGrowth}</span>
                <span className="text-slate-400 ml-1">since yesterday</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-7 mb-8">
          {/* Recent Sales */}
          <Card className="lg:col-span-4 bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  Recent Sales
                </CardTitle>
                <div className="text-sm text-slate-400">
                  Last 7 days
                </div>
              </div>
            </CardHeader>
            <CardContent className="bg-slate-800/30 rounded-lg mx-6 mb-6 p-4">
              <RecentSales />
            </CardContent>
          </Card>

          {/* Sales Chart */}
          <Card className="lg:col-span-3 bg-gradient-to-br from-slate-800 to-slate-800/80 border-slate-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              {salesData.length > 0 ? (
                <div className="bg-slate-800/30 rounded-lg p-4 -mx-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="name"
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#64748b"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `£${value}`}
                      />
                      <Tooltip
                        cursor={{ stroke: '#475569', strokeWidth: 1 }}
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          border: '1px solid #475569',
                          borderRadius: '8px',
                          color: '#f1f5f9'
                        }}
                        formatter={(value: number, name) => [name === 'total' ? `£${value.toFixed(2)}` : value, name === 'total' ? 'Revenue' : 'Tickets']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRevenue)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-slate-400 bg-slate-800/30 rounded-lg -mx-2">
                  <TrendingUp className="h-12 w-12 text-slate-600 mb-3" />
                  <p className="text-lg font-medium">No sales data available</p>
                  <p className="text-sm text-slate-500">Sales data will appear here once you have transactions</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <Link href="/admin/tickets">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-blue-500 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Manage Tickets</h3>
                    <p className="text-blue-100 text-sm">Review and approve pending tickets</p>
                  </div>
                  <Ticket className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/games">
            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-green-500 text-white hover:from-green-700 hover:to-green-800 transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">Game Schedule</h3>
                    <p className="text-green-100 text-sm">View and manage upcoming games</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/users">
            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-purple-500 text-white hover:from-purple-700 hover:to-purple-800 transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">User Management</h3>
                    <p className="text-purple-100 text-sm">Manage users and permissions</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
    </div>
  );
}
