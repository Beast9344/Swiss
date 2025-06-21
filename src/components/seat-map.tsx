"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export type Seat = {
  section: string;
  row: number;
  seat: number;
  price: number;
};

interface SeatMapProps {
  seatData: {
    sections: { name: string; rows: number; seatsPerRow: number; priceMultiplier: number }[];
    unavailableSeats: string[];
  };
  basePrice: number;
  selectedSeat: Seat | null;
  onSeatSelect: (seat: Seat | null) => void;
}

export default function SeatMap({ seatData, basePrice, selectedSeat, onSeatSelect }: SeatMapProps) {
  const handleSeatClick = (sectionName: string, row: number, seat: number, price: number, isAvailable: boolean) => {
    if (!isAvailable) return;
    
    const newSelectedSeat = { section: sectionName, row, seat, price };
    
    if (selectedSeat && selectedSeat.section === sectionName && selectedSeat.row === row && selectedSeat.seat === seat) {
      onSeatSelect(null);
    } else {
      onSeatSelect(newSelectedSeat);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-3 rounded-lg bg-foreground text-background flex items-center justify-center text-sm font-bold tracking-widest">STAGE</div>
      {seatData.sections.map((section) => (
        <div key={section.name}>
          <h3 className="text-lg font-headline font-semibold mb-4 text-center">Section {section.name}</h3>
          <Card className="p-4 overflow-x-auto">
            <CardContent className="p-0">
              <div className="flex flex-col gap-2 items-center mx-auto" style={{ width: 'fit-content' }}>
                {Array.from({ length: section.rows }, (_, i) => i + 1).map((row) => (
                  <div key={row} className="flex gap-2">
                    {Array.from({ length: section.seatsPerRow }, (_, j) => j + 1).map((seat) => {
                      const seatId = `${section.name}-${row}-${seat}`;
                      const isAvailable = !seatData.unavailableSeats.includes(seatId);
                      const isSelected = selectedSeat?.section === section.name && selectedSeat?.row === row && selectedSeat?.seat === seat;
                      const price = basePrice * section.priceMultiplier;
                      
                      return (
                        <Button
                          key={seatId}
                          size="icon"
                          className={cn(
                            'h-7 w-7 rounded-full text-[10px] font-bold transition-all duration-200 leading-none',
                            !isAvailable && 'bg-destructive/70 text-destructive-foreground cursor-not-allowed',
                            isAvailable && !isSelected && 'bg-accent/20 text-foreground hover:bg-accent/40 border border-accent/50',
                            isSelected && 'bg-primary text-primary-foreground ring-2 ring-offset-background ring-offset-2 ring-primary scale-110 z-10'
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
      <div className="flex justify-center items-center flex-wrap gap-6 text-sm mt-6 pt-6 border-t">
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-accent/20 border border-accent/50" /> Available</div>
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-primary" /> Selected</div>
        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded-full bg-destructive/70" /> Unavailable</div>
      </div>
    </div>
  );
}
