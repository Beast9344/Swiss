import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Ticket, Clock, CheckCircle, BarChart } from "lucide-react";
import { tickets, users, games } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const totalListed = tickets.length;
  const pendingApprovals = tickets.filter(t => t.status === 'pending').length;
  const recentSales = tickets.filter(t => t.status === 'sold').slice(0, 5);
  const totalRevenue = tickets.filter(t => t.status === 'sold').reduce((acc, t) => acc + t.price, 0);

  const getGameInfo = (gameId: string) => {
    return games.find(g => g.id === gameId);
  }

  const getUserInfo = (userId: string) => {
    return users.find(u => u.id === userId);
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Listed Tickets</CardTitle>
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
            <div className="text-2xl font-bold">{recentSales.length}</div>
            <p className="text-xs text-muted-foreground">+5 since yesterday</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
           <CardHeader>
            <CardTitle className="font-headline">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Game</TableHead>
                        <TableHead>Seat</TableHead>
                        <TableHead>Seller</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentSales.map(ticket => {
                        const game = getGameInfo(ticket.gameId);
                        const user = getUserInfo(ticket.sellerId);
                        return (
                            <TableRow key={ticket.id}>
                                <TableCell>{game ? `${game.teamA} vs ${game.teamB}`: 'N/A'}</TableCell>
                                <TableCell>{ticket.section}{ticket.row}-{ticket.seat}</TableCell>
                                <TableCell>{user?.name ?? 'N/A'}</TableCell>
                                <TableCell className="text-right">£{ticket.price.toFixed(2)}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
         <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Sales Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[350px] flex items-center justify-center text-muted-foreground">
                <BarChart className="h-16 w-16" />
                <p className="ml-4">Chart placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
