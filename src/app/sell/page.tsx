
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Ticket as TicketIcon, LogOut, CheckCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { useData, ActionType } from '@/context/DataContext';
import type { Ticket } from '@/lib/data';


export default function SellPage() {
  const { state, dispatch } = useData();
  const { games, users, tickets, currentUser } = state;
  const [error, setError] = useState('');
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      dispatch({ type: ActionType.SET_CURRENT_USER, payload: user });
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const handleLogout = () => {
    dispatch({ type: ActionType.SET_CURRENT_USER, payload: null });
  };

  const handleResellTicket = (ticketId: string) => {
    dispatch({
      type: ActionType.UPDATE_TICKET,
      payload: { ticketId, updates: { status: 'pending' } }
    });
    toast({
      title: "Ticket Listed for Resale",
      description: "Your ticket has been submitted for approval and will be listed shortly.",
    });
  };

  if (!currentUser) {
    if (!showLogin) {
      return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Sell your Ticket here!</h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
              Do you have a seasonal ticket and you cannot attend a specific game?
              <br />
              Sell your ticket for the date you cannot attend below.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-12">
              <h2 className="text-3xl font-headline font-bold">How it works:</h2>
              <Button onClick={() => setShowLogin(true)}>Login through club</Button>
            </div>
            
            <div className="space-y-8 relative pl-12">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border -z-10"></div>
              
              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">1</div>
                <h3 className="font-bold text-lg mb-1">Log in with your club's account</h3>
                <p className="text-muted-foreground">Access your club's season ticket by securely logging in through the SeatSwap platform using your club's credentials. <span className="text-primary/70">(OAuth-style authentication)</span></p>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">2</div>
                <h3 className="font-bold text-lg mb-1">Select the game(s) you cannot attend</h3>
                <p className="text-muted-foreground">View your upcoming games and simply check the ones you'd like to release your seat for.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">3</div>
                <h3 className="font-bold text-lg mb-1">Confirm your release</h3>
                <p className="text-muted-foreground">Review your selections. By confirming, your ticket will be listed on the platform – but you still retain ownership until someone claims or buys it.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">4</div>
                <h3 className="font-bold text-lg mb-1">Stay notified</h3>
                <p className="text-muted-foreground">You'll receive a notification as soon as your seat is claimed. At that point, your ticket will be transferred securely to the new fan, and you'll receive a confirmation.</p>
              </div>
              
              <div className="relative">
                 <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">5</div>
                <h3 className="font-bold text-lg mb-1">Receive your payout</h3>
                <p className="text-muted-foreground">Once the game is played, your share of the revenue will be credited to your account or preferred payment method.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
       return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 flex justify-center items-start">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="font-headline">Seller Login</CardTitle>
                <CardDescription>
                  Log in to view your purchased tickets and list them for resale.
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
                <CardFooter className="flex flex-col sm:flex-row-reverse gap-2">
                  <Button type="submit" form="login-form" className="w-full">
                    Login
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setShowLogin(false)}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                </CardFooter>
              </form>
            </Card>
        </div>
      );
    }
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
