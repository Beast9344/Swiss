import { games, seatData } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CalendarDays, MapPin, Ticket, CreditCard } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SeatMap from "@/components/seat-map"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GamePage({ params }: { params: { gameId: string } }) {
  const game = games.find(g => g.id === params.gameId)

  if (!game) {
    notFound()
  }

  return (
    <div className="bg-background">
      <section className="relative h-64 md:h-80 w-full">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Stadium background"
          layout="fill"
          objectFit="cover"
          className="opacity-20"
          data-ai-hint="stadium lights"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-end pb-12">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">{game.teamA} vs {game.teamB}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-lg text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              <span>{new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>{game.venue}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Select Your Seats</CardTitle>
                <CardDescription>Click on an available seat to add it to your cart. Unavailable seats are greyed out.</CardDescription>
              </CardHeader>
              <CardContent>
                <SeatMap seatData={seatData} basePrice={game.basePrice} />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
             <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-2xl flex items-center gap-2"><Ticket /> Your Order</CardTitle>
                <CardDescription>Complete your purchase below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div id="order-summary" className="space-y-2">
                    <p className="text-center text-muted-foreground">No seats selected</p>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-lg mb-4 flex items-center gap-2"><CreditCard /> Payment Information</h3>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name on Card</Label>
                            <Input id="name" placeholder="John M. Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiry">Expires</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="CVC" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="zip">ZIP</Label>
                                <Input id="zip" placeholder="ZIP" />
                            </div>
                        </div>
                    </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90">
                  Purchase Tickets
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
