import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { Badge } from './ui/badge';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const isAvailable = game.status === 'Tickets Available';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-neon-primary hover:-translate-y-1 bg-card text-card-foreground rounded-2xl border border-primary/20">
      <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-6">
          <Image
            src={`https://placehold.co/200x200.png`}
            alt="Team Badge"
            fill
            className="rounded-full ring-4 ring-primary/20 object-cover"
            data-ai-hint="soccer badge"
          />
        </div>
        <h3 className="font-headline text-xl mb-2 flex-grow">{game.teamA} vs {game.teamB}</h3>
        <div className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
          <CalendarDays className="h-4 w-4" />
          <span>{new Date(game.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
          <MapPin className="h-4 w-4" />
          <span>{game.venue}</span>
        </div>
        <Badge variant={isAvailable ? 'default' : 'secondary'} className={`mb-4 ${isAvailable ? 'bg-accent text-accent-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          {game.status}
        </Badge>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
         <Button asChild disabled={!isAvailable} className="w-full rounded-full bg-primary/10 hover:bg-primary/20 text-primary backdrop-blur-sm border border-primary/20">
          <Link href={isAvailable ? `/buy/${game.id}` : '#'}>
            Find Tickets <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
