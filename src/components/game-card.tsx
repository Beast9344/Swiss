import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/data';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { Badge } from './ui/badge';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const isAvailable = game.status === 'Tickets Available';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-gradient-to-br from-gray-900 to-slate-800 text-white rounded-2xl border-none">
      <CardContent className="p-6 flex-grow flex flex-col items-center text-center">
        <div className="relative w-32 h-32 mb-6">
          <Image
            src={`https://placehold.co/200x200.png`}
            alt="Team Badge"
            layout="fill"
            objectFit="cover"
            className="rounded-full ring-4 ring-white/10"
            data-ai-hint="soccer badge"
          />
        </div>
        <h3 className="font-headline text-xl mb-2 flex-grow">{game.teamA} vs {game.teamB}</h3>
        <div className="text-sm text-white/70 flex items-center gap-2 mb-4">
          <CalendarDays className="h-4 w-4" />
          <span>{new Date(game.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <Badge variant={isAvailable ? 'default' : 'secondary'} className={`mb-4 ${isAvailable ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
          {game.status}
        </Badge>
      </CardContent>
      <CardFooter className="p-6 pt-0 mt-auto">
         <Button asChild disabled={!isAvailable} className="w-full rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10">
          <Link href={isAvailable ? `/buy/${game.id}` : '#'}>
            Find Tickets <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
