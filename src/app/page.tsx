import { Button } from '@/components/ui/button';
import { games } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { GameCard } from '@/components/game-card';

export default function Home() {
  const futureGames = games.filter(game => new Date(game.date) > new Date());

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-card/50">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary tracking-tighter mb-4">
              SeatSwap: Get Your Seat and Game on!
            </h1>
            <div className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8 space-y-2">
              <p>Do you want to attend a game but it is sold out? We got you covered!</p>
              <p>Resell or buy tickets here.</p>
              <p className="text-base">We believe in sharing value. Our platform ensures that ever empty seat becomes an opportunity for someone to feel good, form seller to buyer.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/buy">
                  Buy a Ticket
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sell">Sell a Ticket</Link>
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </section>

        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-5xl md:text-7xl font-headline font-bold text-center mb-16 text-muted-foreground/30 tracking-widest">
              GAMES ON THE HORIZON
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {futureGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
