import { GameCard } from '@/components/game-card';
import { games } from '@/lib/data';

export default function BuyPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Find Your Seat</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4">
          Browse upcoming games and find available tickets. Click on a game to view the seating map and select your tickets.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
