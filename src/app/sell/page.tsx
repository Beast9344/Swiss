
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Ticket as TicketIcon, LogOut, CheckCircle, ArrowLeft, Banknote } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { useData } from '@/context/DataContext';
import type { Ticket } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';


export default function SellPage() {
  const { games, users, tickets, currentUser, setCurrentUser, updateTicket } = useData();
  const [error, setError] = useState('');
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [sellStep, setSellStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [selectedTicketIds, setSelectedTicketIds] = useState<string[]>([]);

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
  
  const handleSelectTicket = (ticketId: string, isChecked: boolean) => {
    setSelectedTicketIds(prev =>
      isChecked ? [...prev, ticketId] : prev.filter(id => id !== ticketId)
    );
  };

  const handleProceedToConfirm = () => {
    if (selectedTicketIds.length === 0) {
      toast({
        title: "No Tickets Selected",
        description: "Please select at least one ticket to list for resale.",
        variant: "destructive",
      });
      return;
    }
    setSellStep('confirm');
  };

  const handleConfirmListing = (event: React.FormEvent) => {
    event.preventDefault();
    selectedTicketIds.forEach(ticketId => {
        updateTicket(ticketId, { status: 'pending' });
    });
    toast({
      title: "Tickets Listed for Resale",
      description: "Your tickets have been submitted for approval and will be listed shortly.",
    });
    setSellStep('success');
  };

  const handleSellMore = () => {
    setSelectedTicketIds([]);
    setSellStep('select');
  };


  if (!currentUser) {
    if (!showLogin) {
      return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary uppercase">Sell your Ticket here!</h1>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mt-4">
              Do you have a seasonal ticket and you cannot attend a specific game?
              <br />
              Sell your ticket for the date you cannot attend below.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-start mb-12">
              <h2 className="text-3xl font-headline font-bold uppercase">How it works:</h2>
              <Button onClick={() => setShowLogin(true)}>Login through club</Button>
            </div>
            
            <div className="space-y-8 relative pl-12">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border -z-10"></div>
              
              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">1</div>
                <h3 className="font-bold text-lg mb-1">Log in with your club's account</h3>
                <p className="text-muted-foreground">Access your club's season ticket by securely logging in through the Swiss platform using your club's credentials. <span className="text-primary/70">(OAuth-style authentication)</span></p>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">2</div>
                <h3 className="font-bold text-lg mb-1">Select the game(s) you cannot attend</h3>
                <p className="text-muted-foreground">View your upcoming games and simply check the ones you'd like to release your seat for.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">3</div>
                <h3 className="font-bold text-lg mb-1">Confirm your release</h3>
                <p className="text-muted-foreground">Review your selections and provide payout info. By confirming, your ticket will be listed on the platform – but you still retain ownership until someone claims or buys it.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">4</div>
                <h3 className="font-bold text-lg mb-1">Stay notified</h3>
                <p className="text-muted-foreground">You'll receive a notification as soon as your seat is claimed. At that point, your ticket will be transferred securely to the new fan, and you'll receive a confirmation.</p>
              </div>
              
              <div className="relative">
                 <div className="absolute -left-12 top-0 flex-shrink-0 bg-card h-8 w-8 rounded-full border-2 border-primary flex items-center justify-center font-bold text-primary z-10">5</div>
                <h3 className="font-bold text-lg mb-1">Receive your payout</h3>
                <p className="text-muted-foreground">Once the game is played, your share of the revenue (85% of the resale price) will be credited to your account.</p>
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
                <CardTitle className="font-headline uppercase">Seller Login</CardTitle>
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

  const userOwnedTickets = tickets.filter(ticket => ticket.sellerId === currentUser?.id && ticket.status === 'sold');
  const ticketsToSell = tickets.filter(ticket => selectedTicketIds.includes(ticket.id));

  const getStatusText = (status: Ticket['status']) => {
      if (status === 'sold') return 'Owned';
      return status.charAt(0).toUpperCase() + status.slice(1);
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary uppercase">Welcome, {currentUser.name}</h1>
                <p className="text-muted-foreground mt-2">Manage your tickets for resale.</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>

        {sellStep === 'select' && (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2 uppercase"><TicketIcon /> My Owned Tickets</CardTitle>
                    <CardDescription>Select the tickets you wish to put up for resale.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]">Sell</TableHead>
                                <TableHead>Game</TableHead>
                                <TableHead>Seat</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userOwnedTickets.length > 0 ? (
                                userOwnedTickets.map(ticket => {
                                    const game = games.find(g => g.id === ticket.gameId);
                                    return (
                                        <TableRow key={ticket.id}>
                                            <TableCell>
                                              <Checkbox
                                                id={`select-${ticket.id}`}
                                                checked={selectedTicketIds.includes(ticket.id)}
                                                onCheckedChange={(checked: boolean | "indeterminate") =>
                                                handleSelectTicket(ticket.id, !!checked)
                                                }
                                                aria-label={`Select ticket for ${game?.teamA} vs ${game?.teamB}`}
                                              />
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{game ? `${game.teamA} vs ${game.teamB}` : 'N/A'}</div>
                                                <div className="text-sm text-muted-foreground">{game ? new Date(game.date).toLocaleDateString() : ''}</div>
                                            </TableCell>
                                            <TableCell>{`Sec ${ticket.section}, Row ${ticket.row}, Seat ${ticket.seat}`}</TableCell>
                                            <TableCell>
                                                <Badge className='bg-accent text-accent-foreground'>
                                                    {getStatusText(ticket.status)}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        You do not own any tickets available for resale.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleProceedToConfirm} disabled={selectedTicketIds.length === 0} className="ml-auto">
                        Sell {selectedTicketIds.length} {selectedTicketIds.length === 1 ? 'Ticket' : 'Tickets'} <ArrowLeft className="mr-2 h-4 w-4 -scale-x-100" />
                    </Button>
                </CardFooter>
            </Card>
        )}

        {sellStep === 'confirm' && (
             <form onSubmit={handleConfirmListing}>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl uppercase">Confirm Your Listing</CardTitle>
                        <CardDescription>Review your tickets and provide bank information for your payout. You will receive 85% of the reselling price.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Selected Tickets</h3>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Game</TableHead>
                                        <TableHead>Seat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {ticketsToSell.map(ticket => {
                                        const game = games.find(g => g.id === ticket.gameId);
                                        return (
                                            <TableRow key={ticket.id}>
                                                <TableCell className="font-medium">{game ? `${game.teamA} vs ${game.teamB}` : 'N/A'}</TableCell>
                                                <TableCell>{`Sec ${ticket.section}, Row ${ticket.row}, Seat ${ticket.seat}`}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-headline text-lg mb-4 flex items-center gap-2 uppercase"><Banknote /> Bank Information for Payout</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="accountName">Account Holder Name</Label>
                                    <Input id="accountName" placeholder="John M. Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sortCode">Sort Code</Label>
                                    <Input id="sortCode" placeholder="12-34-56" required />
                                </div>
                                <div className="space-y-2 col-span-1 md:col-span-2">
                                    <Label htmlFor="accountNumber">Account Number</Label>
                                    <Input id="accountNumber" placeholder="12345678" required />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                         <Button variant="outline" onClick={() => setSellStep('select')}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <Button type="submit">
                           <CheckCircle className="mr-2 h-4 w-4" /> Confirm & List Tickets
                        </Button>
                    </CardFooter>
                </Card>
             </form>
        )}

        {sellStep === 'success' && (
            <Card className="text-center">
                <CardHeader>
                    <div className="mx-auto bg-accent/20 text-accent rounded-full h-16 w-16 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4 uppercase">Listing Successful!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Your tickets have been submitted for administrative approval and will appear on the marketplace shortly.
                    <br/>
                    You will be informed by email as soon as your tickets are sold.
                    </p>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSellMore} className="mx-auto">
                        Sell More Tickets
                    </Button>
                </CardFooter>
            </Card>
        )}
    </div>
  );
}

    
