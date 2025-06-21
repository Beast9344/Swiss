"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { games, Game } from '@/lib/data';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function SellPage() {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const { toast } = useToast();

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
        <CardFooter>
          <Button onClick={handleListTickets} className="ml-auto">List Tickets</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
