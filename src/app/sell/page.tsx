
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, Ticket as TicketIcon } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { useData } from '@/context/DataContext';
import type { Game, User } from '@/lib/data';


export default function SellPage() {
  const { games, users, tickets } = useData();
  const [authState, setAuthState] = useState<'unauthenticated' | 'authenticated'>('unauthenticated');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [showSummary, setShowSummary] = useState(false);
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
      setAuthState('authenticated');
    } else {
      setError('Invalid credentials. Please check your email and password.');
    }
  };

  const handleLogout = () => {
    setAuthState('unauthenticated');
    setCurrentUser(null);
    setSelectedGames([]);
    setShowSummary(false);
  };

  const handleGameSelect = (game: Game, checked: boolean) => {
    setSelectedGames(prev =>
      checked ? [...prev, game] : prev.filter(g => g.id !== game.id)
    );
  };

  const handleListTickets = () => {
    if (selectedGames.length === 0) {
      toast({
        title: "No Games Selected",
        description: "Please select at least one game to list tickets for.",
        variant: "destructive",
      });
      return;
    }
    setShowSummary(true);
  };
  
  const handleConfirmSale = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
        title: "Your tickets have been listed!",
        description: "You can track their status on your dashboard. You will be notified by email when a ticket is sold.",
    });
    // This is a mock. In a real app, we would call an API to create the listings.
    // Here, we can't easily modify the shared state from here without more complex logic.
    // The main goal of showing status is already handled by reading the initial ticket data.
    setSelectedGames([]);
    setShowSummary(false);
  }

  if (authState === 'unauthenticated') {
    return (
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">Sell your Ticket here!</h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
            Do you have a seasonal sports ticket and you cannot attend a specific game?
            <br />
            Sell your ticket for the date you cannot attend <span className="text-primary font-medium">below</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-6">How it works:</h2>
            <ol className="space-y-8">
              <li className="flex gap-4">
                <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h3 className="font-bold text-lg">Log in with your account</h3>
                  <p className="text-muted-foreground mt-1">Access your season ticket by securely logging in. Any user with an account can list a ticket for sale.</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="font-bold text-lg">Select the game(s) you cannot attend</h3>
                  <p className="text-muted-foreground mt-1">View upcoming games and simply check the ones for which you'd like to sell your ticket.</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="font-bold text-lg">Confirm your listing</h3>
                  <p className="text-muted-foreground mt-1">Review your selections and enter your payout information. Your ticket will be listed on the platform immediately.</p>
                </div>
              </li>
               <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">4</div>
                <div>
                  <h3 className="font-bold text-lg">Track your sale</h3>
                  <p className="text-muted-foreground mt-1">Monitor the status of your listing in your seller dashboard and get notified when it's sold.</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">5</div>
                <div>
                  <h3 className="font-bold text-lg">Receive your payout</h3>
                  <p className="text-muted-foreground mt-1">Once the game is played, your share of the revenue will be credited to your account.</p>
                </div>
              </li>
            </ol>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Login to Sell Tickets</CardTitle>
                <CardDescription>
                  Use your account credentials to log in and list your ticket. Any user with an account can list a ticket for sale. (e.g. john.doe@example.com / password123)
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
                    Login & Select Tickets
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showSummary) {
     return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
             <Card className="w-full max-w-2xl mx-auto">
                 <CardHeader>
                     <CardTitle className="font-headline text-2xl">Confirmation Summary</CardTitle>
                     <CardDescription>Review your selections and provide your bank information for payouts.</CardDescription>
                 </CardHeader>
                 <CardContent>
                     <h3 className="font-medium mb-2">Selected Games:</h3>
                     <ul className="space-y-2 border rounded-md p-4 mb-6">
                         {selectedGames.map(game => (
                             <li key={game.id} className="flex justify-between items-center text-sm">
                                 <span>{game.teamA} vs {game.teamB}</span>
                                 <span className="text-muted-foreground">{new Date(game.date).toLocaleDateString()}</span>
                             </li>
                         ))}
                     </ul>
                     <form onSubmit={handleConfirmSale} className="space-y-4" id="bank-info-form">
                        <h3 className="font-medium mb-2">Payout Information</h3>
                        <div className="space-y-2">
                            <Label htmlFor="bank-name">Bank Name</Label>
                            <Input id="bank-name" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="account-number">Account Number</Label>
                            <Input id="account-number" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="sort-code">Sort Code</Label>
                            <Input id="sort-code" required />
                        </div>
                     </form>
                 </CardContent>
                 <CardFooter className="flex justify-between">
                     <Button variant="outline" onClick={() => setShowSummary(false)}>Back</Button>
                     <Button type="submit" form="bank-info-form" className="bg-accent hover:bg-accent/90">
                        <CheckCircle className="mr-2 h-4 w-4" /> Confirm and List
                     </Button>
                 </CardFooter>
             </Card>
        </div>
     )
  }

  const userTickets = tickets.filter(ticket => ticket.sellerId === currentUser?.id);

  const getBadgeVariant = (status: typeof tickets[0]['status']) => {
      switch (status) {
          case 'listed': return 'default';
          case 'pending': return 'secondary';
          case 'sold': return 'default';
          case 'rejected': return 'destructive';
          default: return 'outline';
      }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 space-y-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Sell Your Tickets</CardTitle>
          <CardDescription>Select the games you won't be attending. We'll find a buyer for you.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {games.map(game => (
              <div key={game.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Checkbox 
                    id={`game-${game.id}`}
                    onCheckedChange={(checked) => handleGameSelect(game, !!checked)}
                    checked={selectedGames.some(g => g.id === game.id)}
                />
                <label htmlFor={`game-${game.id}`} className="flex-1 flex items-center justify-between cursor-pointer">
                    <div>
                        <p className="font-medium">{game.teamA} vs {game.teamB}</p>
                        <p className="text-sm text-muted-foreground">{new Date(game.date).toLocaleDateString()}</p>
                    </div>
                    <Image src={`https://placehold.co/40x40.png`} data-ai-hint="soccer badge" alt="Team Badge" width={40} height={40} className="rounded-full" />
                </label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
          <Button onClick={handleListTickets} className="ml-auto">List Tickets</Button>
        </CardFooter>
      </Card>

      <Card className="w-full max-w-4xl mx-auto">
          <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2"><TicketIcon /> Your Listed Tickets</CardTitle>
              <CardDescription>Track the status and see payout details for your resale tickets.</CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                      <TableRow>
                          <TableHead>Game</TableHead>
                          <TableHead>Seat</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Your Payout</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                      {userTickets.length > 0 ? (
                          userTickets.map(ticket => {
                              const game = games.find(g => g.id === ticket.gameId);
                              // Assuming an 85% payout for the seller
                              const payout = ticket.price * 0.85; 
                              return (
                                  <TableRow key={ticket.id}>
                                      <TableCell>
                                          <div className="font-medium">{game ? `${game.teamA} vs ${game.teamB}` : 'N/A'}</div>
                                          <div className="text-sm text-muted-foreground">{game ? new Date(game.date).toLocaleDateString() : ''}</div>
                                      </TableCell>
                                      <TableCell>{`Sec ${ticket.section}, Row ${ticket.row}, Seat ${ticket.seat}`}</TableCell>
                                      <TableCell>
                                          <Badge variant={getBadgeVariant(ticket.status)} className={cn({'bg-green-500 text-white': ticket.status === 'sold'})}>
                                              {ticket.status}
                                          </Badge>
                                      </TableCell>
                                      <TableCell className="text-right font-medium">
                                          {ticket.status === 'sold' ? `£${payout.toFixed(2)}` : 'Pending'}
                                      </TableCell>
                                  </TableRow>
                              );
                          })
                      ) : (
                          <TableRow>
                              <TableCell colSpan={4} className="h-24 text-center">
                                  You haven't listed any tickets for resale yet.
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
