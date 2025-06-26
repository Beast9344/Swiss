"use client";

import { useData } from '@/context/DataContext';
import type { Ticket } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Download } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { cn, exportToCsv } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function AdminTicketsPage() {
  const { tickets, games, users, updateTicket, removeTicket } = useData();
  const { toast } = useToast();

  const handleStatusChange = (ticketId: string, status: 'listed' | 'rejected') => {
    updateTicket(ticketId, { status });
    toast({
        title: `Ticket ${status}`,
        description: `The ticket has been successfully marked as ${status}.`
    });
  };

  const handleRemove = (ticketId: string) => {
    removeTicket(ticketId);
    toast({
        title: `Ticket Removed`,
        description: `The ticket has been removed from the listings.`,
        variant: "destructive"
    });
  };
  
  const getBadgeVariant = (status: Ticket['status']) => {
    switch (status) {
      case 'listed': return 'default';
      case 'pending': return 'secondary';
      case 'sold': return 'default';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getGameInfo = (gameId: string) => games.find(g => g.id === gameId);
  const getUserInfo = (userId: string) => users.find(u => u.id === userId);
  
  const handleExport = () => {
    const exportableData = tickets.map(ticket => {
        const game = getGameInfo(ticket.gameId);
        const user = getUserInfo(ticket.sellerId);
        return {
            'Ticket ID': ticket.id,
            'Game': game ? `${game.teamA} vs ${game.teamB}` : 'N/A',
            'Game Date': game ? new Date(game.date).toLocaleDateString() : 'N/A',
            'Seller Name': user?.name ?? 'N/A',
            'Seller Email': user?.email ?? 'N/A',
            'Section': ticket.section,
            'Row': ticket.row,
            'Seat': ticket.seat,
            'Price': ticket.price.toFixed(2),
            'Status': ticket.status,
            'Purchase Date': ticket.purchaseDate ? new Date(ticket.purchaseDate).toLocaleString() : 'N/A',
        };
    });
    exportToCsv('tickets.csv', exportableData);
  };

  return (
    <div className="p-8 space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
        </Button>
      </div>
      
      <Card>
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Seat</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(ticket => {
                const game = getGameInfo(ticket.gameId);
                const user = getUserInfo(ticket.sellerId);
                return (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div className="font-medium">{game ? `${game.teamA} vs ${game.teamB}` : 'N/A'}</div>
                      <div className="text-sm text-muted-foreground">{game ? new Date(game.date).toLocaleDateString() : ''}</div>
                    </TableCell>
                    <TableCell>{user?.name ?? 'N/A'}</TableCell>
                    <TableCell>Sec {ticket.section}, Row {ticket.row}, Seat {ticket.seat}</TableCell>
                    <TableCell>£{ticket.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(ticket.status)} className={cn({ 'bg-accent text-accent-foreground': ticket.status === 'listed' })}>
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          {ticket.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, 'listed')}>
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(ticket.id, 'rejected')}>
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleRemove(ticket.id)} className="text-destructive">
                            Remove Listing
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
