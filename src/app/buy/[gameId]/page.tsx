
"use client"

import { useState, useRef, use } from "react";
import { notFound, useParams } from "next/navigation"
import Image from "next/image"
import { CalendarDays, MapPin, Ticket, CreditCard, User as UserIcon, CheckCircle, Download, Clock, Shield, Star, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import SeatMap, { type Seat } from "@/components/seat-map"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCode from "react-qr-code";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useData } from "@/context/DataContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateId } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function GamePage() {
  const params = useParams<{ gameId: string }>();
  const { games, seatData, addUser, addTicket, updateSeatData } = useData();
  const game = games.find(g => g.id === params.gameId)
  const { toast } = useToast();
  
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [receiptData, setReceiptData] = useState<any>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [selectedSectionName, setSelectedSectionName] = useState<string>(seatData.sections[0]?.name || '');

  if (!game) {
    notFound()
  }

  const handleSectionChange = (sectionName: string) => {
    setSelectedSectionName(sectionName);
    setSelectedSeat(null);
  };

  const filteredSeatData = {
    ...seatData,
    sections: selectedSectionName ? seatData.sections.filter(s => s.name === selectedSectionName) : [],
  };

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
    
    // Create new user
    const newUserId = generateId('u');
    addUser({
        id: newUserId,
        name: fullName,
        email: email,
        password: password,
        type: 'buyer'
    });

    const totalCost = parseFloat((selectedSeat.price * 1.1).toFixed(2));
    const purchaseDate = new Date().toISOString();
    
    // Add new ticket record
    addTicket({
        id: generateId('t'),
        gameId: game.id,
        section: selectedSeat.section,
        row: selectedSeat.row,
        seat: selectedSeat.seat,
        price: totalCost,
        status: 'sold',
        sellerId: newUserId,
        purchaseDate: purchaseDate,
    });

    // Update seat map to make this seat unavailable for others
    const seatId = `${selectedSeat.section}-${selectedSeat.row}-${selectedSeat.seat}`;
    updateSeatData(seatId);

    const receiptDetails = {
      game,
      seat: selectedSeat,
      user: { fullName, email },
      purchaseDate: purchaseDate,
      total: totalCost.toFixed(2),
    };

    setReceiptData(receiptDetails);
    setPurchaseComplete(true);

    toast({
      title: "Purchase Successful!",
      description: `Thank you, ${fullName}. Your ticket receipt is ready.`,
    });
  };

  const handleDownloadReceipt = () => {
    const input = receiptRef.current;
    if (input) {
      html2canvas(input, { scale: 2, backgroundColor: '#0f172a' }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("Swiss-Ticket-Receipt.pdf");
      });
    }
  };

  const handleBuyAnother = () => {
    setPurchaseComplete(false);
    setReceiptData(null);
    setSelectedSeat(null);
    setFullName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-foreground">
      {/* Hero Section with Enhanced Design */}
      <section className="relative h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center text-center text-white">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 text-sm text-blue-200 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Star className="h-3 w-3 mr-1" />
                Premium Match
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Users className="h-3 w-3 mr-1" />
                High Demand
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-headline font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                {game.teamA}
              </span>
              <span className="text-white/60 mx-6">VS</span>
              <span className="bg-gradient-to-r from-purple-100 via-blue-100 to-white bg-clip-text text-transparent">
                {game.teamB}
              </span>
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <CalendarDays className="h-5 w-5 text-blue-300" />
                <span className="font-medium">{new Date(game.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <MapPin className="h-5 w-5 text-purple-300" />
                <span className="font-medium">{game.venue}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                <Clock className="h-5 w-5 text-green-300" />
                <span className="font-medium">Kickoff 3:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
          {/* Seat Selection Section - Enhanced */}
          <div className="xl:col-span-2">
            <Card className="border-slate-700 shadow-2xl bg-slate-900/80 backdrop-blur-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <CardTitle className="font-headline text-3xl font-bold flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Ticket className="h-6 w-6" />
                  </div>
                  Select Your Perfect Seat
                </CardTitle>
                <CardDescription className="text-blue-100 mt-2 text-lg">
                  Choose your section first, then pick your ideal seat from the interactive map below
                </CardDescription>
              </div>
              
              <CardContent className="p-8">
                {/* Section Selector with Enhanced Design */}
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <Label className="text-xl font-semibold text-slate-200">Choose Stadium Section</Label>
                    <Badge variant="outline" className="text-slate-400 border-slate-600">
                      {seatData.sections.length} Sections Available
                    </Badge>
                  </div>
                  
                  <Select onValueChange={handleSectionChange} defaultValue={selectedSectionName}>
                    <SelectTrigger className="w-full h-14 text-lg bg-slate-800 border-2 border-slate-700 hover:border-blue-500 transition-colors text-white">
                      <SelectValue placeholder="Select a stadium section" />
                    </SelectTrigger>
                    <SelectContent>
                      {seatData.sections.map(section => (
                        <SelectItem key={section.name} value={section.name} className="text-lg py-3">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">Section {section.name}</span>
                            <Badge variant="secondary" className="ml-2">
                            {section.rows * section.seatsPerRow} seats
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Seat Map Legend */}
                <div className="mb-8 p-6 bg-slate-800/50 rounded-xl border border-slate-700">
                  <h4 className="font-semibold text-slate-300 mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Seat Legend
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-md shadow-sm"></div>
                      <span className="text-sm font-medium text-slate-400">Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-md shadow-sm border-2 border-blue-700"></div>
                      <span className="text-sm font-medium text-slate-400">Selected</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-red-400 rounded-md shadow-sm"></div>
                      <span className="text-sm font-medium text-slate-400">Occupied</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-md shadow-sm"></div>
                      <span className="text-sm font-medium text-slate-400">Premium</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Seat Map Container */}
                <div className="bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-8 shadow-inner">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-3 rounded-full font-bold text-lg shadow-lg">
                      ⚽ PITCH ⚽
                    </div>
                  </div>
                  
                  <div className="bg-slate-950/50 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                    <SeatMap 
                      seatData={filteredSeatData} 
                      basePrice={game.basePrice}
                      selectedSeat={selectedSeat}
                      onSeatSelect={setSelectedSeat}
                    />
                  </div>
                  
                  {selectedSeat && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-lg">Selected Seat</h4>
                          <p className="text-blue-100">Section {selectedSeat.section}, Row {selectedSeat.row}, Seat {selectedSeat.seat}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">£{selectedSeat.price.toFixed(2)}</div>
                          <div className="text-sm text-blue-200">+ taxes & fees</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Section - Enhanced */}
          <div className="xl:col-span-1">
            {purchaseComplete && receiptData ? (
              <div className="sticky top-24">
                <Card ref={receiptRef} className="border-slate-700 shadow-2xl bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white text-center">
                    <div className="mx-auto bg-white/20 backdrop-blur-sm rounded-full h-16 w-16 flex items-center justify-center mb-4">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <CardTitle className="font-headline text-2xl font-bold">Purchase Confirmed!</CardTitle>
                    <CardDescription className="text-green-100 mt-2">Your digital ticket is ready</CardDescription>
                  </div>
                  
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                          <Ticket className="h-4 w-4" />
                          Match Details
                        </h4>
                        <p className="font-semibold">{receiptData.game.teamA} vs {receiptData.game.teamB}</p>
                        <p className="text-slate-400 text-sm">{new Date(receiptData.game.date).toLocaleDateString()}</p>
                        <p className="text-slate-400 text-sm">{receiptData.game.venue}</p>
                      </div>
                      
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Your Seat
                        </h4>
                        <p className="text-lg font-bold">Section {receiptData.seat.section}</p>
                        <p>Row {receiptData.seat.row}, Seat {receiptData.seat.seat}</p>
                      </div>
                      
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <h4 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                          <UserIcon className="h-4 w-4" />
                          Ticket Holder
                        </h4>
                        <p className="font-semibold">{receiptData.user.fullName}</p>
                        <p className="text-slate-400 text-sm">{receiptData.user.email}</p>
                      </div>
                      
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <h4 className="font-bold text-slate-200 mb-2">Total Paid</h4>
                        <p className="text-2xl font-bold text-green-400">£{receiptData.total}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-lg">
                      <h4 className="font-bold text-slate-200 mb-3">Entry QR Code</h4>
                      <div className="bg-white p-4 rounded-lg shadow-lg">
                        <QRCode
                          value={JSON.stringify({
                            gameId: receiptData.game.id,
                            seatId: `${receiptData.seat.section}-${receiptData.seat.row}-${receiptData.seat.seat}`,
                            owner: receiptData.user.fullName,
                            purchaseDate: receiptData.purchaseDate
                          })}
                          size={120}
                          viewBox={`0 0 120 120`}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-2 text-center">Present this QR code at stadium entrance</p>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 space-y-3">
                  <Button size="lg" className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg" onClick={handleDownloadReceipt}>
                    <Download className="mr-2 h-5 w-5" /> Download PDF Receipt
                  </Button>
                  <Button size="lg" variant="outline" className="w-full border-2 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white" onClick={handleBuyAnother}>
                    Buy Another Ticket
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="sticky top-24 border-slate-700 shadow-2xl bg-slate-900/90 backdrop-blur-sm overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-white">
                  <CardTitle className="font-headline text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Ticket className="h-6 w-6" />
                    </div>
                    Your Order
                  </CardTitle>
                  <CardDescription className="text-slate-200 mt-2">Complete your purchase securely</CardDescription>
                </div>
                
                <CardContent className="p-6 space-y-8">
                  {/* Order Summary */}
                  <div className="p-6 bg-slate-800/50 rounded-xl">
                    {selectedSeat ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-slate-200">Section {selectedSeat.section}{selectedSeat.row}-{selectedSeat.seat}</span>
                          <span className="font-bold text-lg">£{selectedSeat.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 text-slate-400">
                          <span>Taxes & Service Fees</span>
                          <span>£{(selectedSeat.price * 0.1).toFixed(2)}</span>
                        </div>
                        <Separator className="bg-slate-700" />
                        <div className="flex justify-between items-center py-2">
                          <span className="text-xl font-bold">Total</span>
                          <span className="text-2xl font-bold text-green-400">£{(selectedSeat.price * 1.1).toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Ticket className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                        <p className="text-slate-400 font-medium">Select a seat to continue</p>
                      </div>
                    )}
                  </div>

                  {/* User Information */}
                  <div className="space-y-4">
                    <h3 className="font-headline text-xl font-bold flex items-center gap-3 text-slate-200">
                      <UserIcon className="h-5 w-5" />
                      Your Information
                    </h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName" className="font-medium">Full Name</Label>
                        <Input 
                          id="fullName" 
                          placeholder="Enter your full name" 
                          value={fullName} 
                          onChange={e => setFullName(e.target.value)}
                          className="h-12 border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="font-medium">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email address" 
                          value={email} 
                          onChange={e => setEmail(e.target.value)}
                          className="h-12 border-2"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="font-medium">Create Password</Label>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="Create a secure password" 
                          value={password} 
                          onChange={e => setPassword(e.target.value)}
                          className="h-12 border-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="space-y-4">
                    <h3 className="font-headline text-xl font-bold flex items-center gap-3 text-slate-200">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </h3>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-2 h-12">
                        <TabsTrigger value="card" className="font-medium">Credit Card</TabsTrigger>
                        <TabsTrigger value="paypal" className="font-medium">PayPal</TabsTrigger>
                      </TabsList>
                      <TabsContent value="card" className="mt-6">
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Cardholder Name</Label>
                            <Input id="name" placeholder="Name as it appears on card" className="h-12 border-2" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="h-12 border-2" />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry</Label>
                              <Input id="expiry" placeholder="MM/YY" className="h-12 border-2" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvc">CVC</Label>
                              <Input id="cvc" placeholder="123" className="h-12 border-2" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="zip">ZIP</Label>
                              <Input id="zip" placeholder="12345" className="h-12 border-2" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal" className="mt-6">
                        <div className="text-center p-8 border-2 border-dashed border-slate-600 rounded-xl bg-slate-800/50">
                          <div className="text-4xl mb-4">💳</div>
                          <p className="text-slate-400 mb-4 font-medium">Secure PayPal checkout</p>
                          <p className="text-sm text-slate-500">You'll be redirected to PayPal to complete your purchase safely</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 bg-slate-800/50 border-t border-slate-700">
                  <Button 
                    size="lg" 
                    className="w-full h-14 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg shadow-lg" 
                    onClick={handlePurchase} 
                    disabled={!selectedSeat}
                  >
                    <CheckCircle className="mr-3 h-6 w-6" /> 
                    {selectedSeat ? `Purchase for £${(selectedSeat.price * 1.1).toFixed(2)}` : 'Select a Seat First'}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
