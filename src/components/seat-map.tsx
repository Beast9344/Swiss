"use client"

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface SeatMapProps {
  seatData: {
    sections: { name: string; rows: number; seatsPerRow: number; priceMultiplier: number }[];
    unavailableSeats: string[];
  };
  basePrice: number;
}

type Seat = {
  section: string;
  row: number;
  seat: number;
  price: number;
};

export default function SeatMap({ seatData, basePrice }: SeatMapProps) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  const handleSeatClick = (sectionName: string, row: number, seat: number, price: number, isAvailable: boolean) => {
    if (!isAvailable) return;
    
    const newSelectedSeat = { section: sectionName, row, seat, price };
    
    if (selectedSeat && selectedSeat.section === sectionName && selectedSeat.row === row && selectedSeat.seat === seat) {
      setSelectedSeat(null);
      updateOrderSummary(null);
    } else {
      setSelectedSeat(newSelectedSeat);
      updateOrderSummary(newSelectedSeat);
    }
  };

  const updateOrderSummary = (seat: Seat | null) => {
    const summaryDiv = document.getElementById('order-summary');
    if (summaryDiv) {
      if (seat) {
        summaryDiv.innerHTML = `
          <div class="flex justify-between font-medium">
            <span>Seat: ${seat.section}${seat.row}-${seat.seat}</span>
            <span>£${seat.price.toFixed(2)}</span>
          </div>
          <div class="flex justify-between text-muted-foreground text-sm">
            <span>Taxes & Fees</span>
            <span>£${(seat.price * 0.1).toFixed(2)}</span>
          </div>
           <div class="flex justify-between font-bold text-lg pt-2 border-t mt-2">
            <span>Total</span>
            <span>£${(seat.price * 1.1).toFixed(2)}</span>
          </div>
        `;
      } else {
        summaryDiv.innerHTML = '<p class="text-center text-muted-foreground">No seats selected</p>';
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-lg bg-muted/50 flex items-center justify-center text-sm font-medium">STAGE</div>
      {seatData.sections.map((section) => (
        <div key={section.name}>
          <h3 className="text-lg font-headline font-semibold mb-2 text-center">Section {section.name}</h3>
          <Card className="p-4 overflow-x-auto">
            <CardContent className="p-0">
              <div className="flex flex-col gap-1.5 items-center">
                {Array.from({ length: section.rows }, (_, i) => i + 1).map((row) => (
                  <div key={row} className="flex gap-1.5">
                    {Array.from({ length: section.seatsPerRow }, (_, j) => j + 1).map((seat) => {
                      const seatId = `${section.name}-${row}-${seat}`;
                      const isAvailable = !seatData.unavailableSeats.includes(seatId);
                      const isSelected = selectedSeat?.section === section.name && selectedSeat?.row === row && selectedSeat?.seat === seat;
                      const price = basePrice * section.priceMultiplier;
                      
                      return (
                        <Button
                          key={seatId}
                          size="icon"
                          variant={isSelected ? "default" : "outline"}
                          className={cn(
                            'h-6 w-6 rounded-sm',
                            !isAvailable && 'bg-muted text-muted-foreground cursor-not-allowed',
                            isAvailable && !isSelected && 'hover:bg-accent/20',
                            isSelected && 'bg-primary text-primary-foreground'
                          )}
                          onClick={() => handleSeatClick(section.name, row, seat, price, isAvailable)}
                          disabled={!isAvailable}
                          title={isAvailable ? `Seat ${seatId} - £${price.toFixed(2)}` : 'Seat not available'}
                        >
                          {seat}
                        </Button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
      <div className="flex justify-center items-center gap-6 text-sm mt-4">
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-sm border border-input bg-background" /> Available</div>
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-sm bg-primary" /> Selected</div>
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-sm bg-muted" /> Unavailable</div>
      </div>
    </div>
  );
}
