import { GameCard } from '@/components/game-card';
import { games } from '@/lib/data';

export default function BuyPage() {
  const futureGames = games.filter(game => new Date(game.date) > new Date());

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tight">Find your Ticket here!</h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4 italic">
          "This page is personalized for every club individually"
        </p>
      </div>

      <h2 className="text-5xl md:text-7xl font-headline font-bold text-center mb-16 text-muted-foreground/30 tracking-widest">
        GAMES
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {futureGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
