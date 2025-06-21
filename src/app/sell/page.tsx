"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { games, Game, users } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SellPage() {
  const [authState, setAuthState] = useState<'unauthenticated' | 'authenticated'>('unauthenticated');
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
    
    if (user && user.type === 'seller') {
      setAuthState('authenticated');
    } else {
      setError('You do not own a seasonal ticket. Please check your credentials or contact support if you believe this is an error.');
    }
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
        description: "You will be notified by email when your ticket has been sold.",
    });
    // Reset state
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
                  <h3 className="font-bold text-lg">Log in with your club's account</h3>
                  <p className="text-muted-foreground mt-1">Access your club's season ticket by securely logging in through the SeatSwap platform using your club's credentials. (OAuth-style authentication)</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="font-bold text-lg">Select the game(s) you cannot attend</h3>
                  <p className="text-muted-foreground mt-1">View your upcoming games and simply check the ones you'd like to release your seat for.</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="font-bold text-lg">Confirm your release</h3>
                  <p className="text-muted-foreground mt-1">Review your selections. By confirming, your ticket will be listed on the platform – but you still retain ownership until someone claims or buys it.</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">4</div>
                <div>
                  <h3 className="font-bold text-lg">Stay notified</h3>
                  <p className="text-muted-foreground mt-1">You'll receive a notification as soon as your seat is claimed. At that point, your ticket will be transferred securely to the new fan, and you'll receive a confirmation.</p>
                </div>
              </li>
              <li className="flex gap-4">
                 <div className="flex-shrink-0 h-10 w-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg">5</div>
                <div>
                  <h3 className="font-bold text-lg">Receive your payout</h3>
                  <p className="text-muted-foreground mt-1">Once the game is played, your share of the revenue (e.g. xx% of the ticket price) will be credited to your account or preferred payment method.</p>
                </div>
              </li>
            </ol>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Login through club</CardTitle>
                <CardDescription>
                  Log in with your email and password to verify your seasonal ticket ownership. (e.g. john.doe@example.com / password123)
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

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
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
          <Button variant="outline" onClick={() => setAuthState('unauthenticated')}>Logout</Button>
          <Button onClick={handleListTickets} className="ml-auto">List Tickets</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
