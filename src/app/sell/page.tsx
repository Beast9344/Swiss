
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Ticket as TicketIcon, LogOut, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { useData } from '@/context/DataContext';
import type { Ticket } from '@/lib/data';


export default function SellPage() {
  const { games, users, tickets, currentUser, setCurrentUser, updateTicket } = useData();
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleResellTicket = (ticketId: string) => {
    updateTicket(ticketId, { status: 'pending' });
    toast({
      title: "Ticket Listed for Resale",
      description: "Your ticket has been submitted for approval and will be listed shortly.",
    });
  };

  if (!currentUser) {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex justify-center items-start">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="font-headline">Seller Login</CardTitle>
                <CardDescription>
                  Log in to view your purchased tickets and list them for resale. (e.g. john.doe@example.com / password123)
                </CardDescription>
              </CardHeader>
              <form id="login-form" onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Authentication Failed</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="user@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" required />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" form="login-form" className="w-full">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
        </div>
    );
  }

  const userTickets = tickets.filter(ticket => ticket.sellerId === currentUser?.id);

  const getBadgeVariant = (status: Ticket['status']) => {
      switch (status) {
          case 'listed': return 'default';
          case 'pending': return 'secondary';
          case 'sold': return 'default'; // 'sold' now means owned by user
          case 'rejected': return 'destructive';
          default: return 'outline';
      }
  };
  
  const getStatusText = (status: Ticket['status']) => {
      if (status === 'sold') return 'Owned';
      // Capitalize first letter
      return status.charAt(0).toUpperCase() + status.slice(1);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Welcome, {currentUser.name}</h1>
                <p className="text-muted-foreground mt-2">Here are your tickets. You can list any owned ticket for resale.</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>

      <Card>
          <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2"><TicketIcon /> My Tickets</CardTitle>
              <CardDescription>Track the status of your tickets and list them for sale.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Game</TableHead>
                          <TableHead>Seat</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {userTickets.length > 0 ? (
                          userTickets.map(ticket => {
                              const game = games.find(g => g.id === ticket.gameId);
                              return (
                                  <TableRow key={ticket.id}>
                                      <TableCell>
                                          <div className="font-medium">{game ? `${game.teamA} vs ${game.teamB}` : 'N/A'}</div>
                                          <div className="text-sm text-muted-foreground">{game ? new Date(game.date).toLocaleDateString() : ''}</div>
                                      </TableCell>
                                      <TableCell>{`Sec ${ticket.section}, Row ${ticket.row}, Seat ${ticket.seat}`}</TableCell>
                                      <TableCell>
                                          <Badge variant={getBadgeVariant(ticket.status)} className={cn({'bg-accent text-accent-foreground': ticket.status === 'sold'})}>
                                              {getStatusText(ticket.status)}
                                          </Badge>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        {ticket.status === 'sold' ? (
                                            <Button size="sm" onClick={() => handleResellTicket(ticket.id)}>
                                                <CheckCircle className="mr-2 h-4 w-4" /> Sell Ticket
                                            </Button>
                                        ) : (
                                            <Button size="sm" variant="outline" disabled>
                                                {getStatusText(ticket.status)}
                                            </Button>
                                        )}
                                      </TableCell>
                                  </TableRow>
                              );
                          })
                      ) : (
                          <TableRow>
                              <TableCell colSpan={4} className="h-24 text-center">
                                  You have not purchased any tickets yet.
                              </TableCell>
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
          </CardContent>
      </Card>
    </div>
  );
}
