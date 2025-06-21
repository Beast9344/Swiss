"use client"

import { useState, use } from "react";
import { games, seatData } from "@/lib/data"
import { notFound } from "next/navigation"
import Image from "next/image"
import { CalendarDays, MapPin, Ticket, CreditCard, User as UserIcon, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SeatMap, { type Seat } from "@/components/seat-map"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GamePage({ params }: { params: any }) {
  const resolvedParams = use(params);
  const game = games.find(g => g.id === resolvedParams.gameId)
  const { toast } = useToast();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');


  if (!game) {
    notFound()
  }

  const handlePurchase = () => {
    if (!selectedSeat) {
      toast({
        title: "No Seat Selected",
        description: "Please select a seat before purchasing.",
        variant: "destructive",
      });
      return;
    }
    if (!fullName || !email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter your full name, email address, and password.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would add more validation for payment details here.

    toast({
      title: "Purchase Successful!",
      description: `Thank you, ${fullName}. Your ticket for seat ${selectedSeat.section}${selectedSeat.row}-${selectedSeat.seat} has been sent to ${email}.`,
    });

    setSelectedSeat(null);
    setFullName('');
    setEmail('');
    setPassword('');
  };

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
                <SeatMap 
                  seatData={seatData} 
                  basePrice={game.basePrice}
                  selectedSeat={selectedSeat}
                  onSeatSelect={setSelectedSeat}
                />
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
                    {selectedSeat ? (
                      <>
                        <div className="flex justify-between font-medium">
                          <span>Seat: {selectedSeat.section}{selectedSeat.row}-{selectedSeat.seat}</span>
                          <span>£{selectedSeat.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground text-sm">
                          <span>Taxes & Fees</span>
                          <span>£{(selectedSeat.price * 0.1).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                          <span>Total</span>
                          <span>£{(selectedSeat.price * 1.1).toFixed(2)}</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-center text-muted-foreground">No seats selected</p>
                    )}
                </div>
                <Separator />
                 <div>
                    <h3 className="font-headline text-lg mb-4 flex items-center gap-2"><UserIcon /> Your Information</h3>
                     <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" placeholder="John M. Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" placeholder="********" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
                <Separator />
                <div>
                    <h3 className="font-headline text-lg mb-4 flex items-center gap-2"><CreditCard /> Payment Information</h3>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="card">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="mt-4">
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
                      </TabsContent>
                      <TabsContent value="paypal" className="mt-4">
                          <div className="text-center p-8 border-dashed border-2 rounded-md">
                              <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                              <Button variant="outline" className="w-full">
                                  Pay with PayPal
                              </Button>
                          </div>
                      </TabsContent>
                    </Tabs>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90" onClick={handlePurchase}>
                  <CheckCircle className="mr-2 h-5 w-5" /> Purchase Tickets
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
