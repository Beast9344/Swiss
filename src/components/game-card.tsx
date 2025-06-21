import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import { Badge } from './ui/badge';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const isAvailable = game.status === 'Tickets Available';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
           <Image
            src={`https://placehold.co/600x400.png`}
            alt={`${game.teamA} vs ${game.teamB}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="stadium crowd"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <Badge variant={isAvailable ? 'default' : 'secondary'} className={`mb-2 ${isAvailable ? 'bg-accent text-accent-foreground' : ''}`}>
          {game.status}
        </Badge>
        <CardTitle className="font-headline text-xl mb-2">{game.teamA} vs {game.teamB}</CardTitle>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{new Date(game.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
         <Button asChild disabled={!isAvailable} className="w-full">
          <Link href={isAvailable ? `/buy/${game.id}` : '#'}>
            Find Tickets <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
