export type Game = {
  id: string;
  teamA: string;
  teamB: string;
  date: string;
  status: 'Tickets Available' | 'No Tickets Yet';
  venue: string;
  basePrice: number;
};

export type Ticket = {
  id: string;
  gameId: string;
  section: string;
  row: number;
  seat: number;
  price: number;
  status: 'listed' | 'pending' | 'sold' | 'rejected';
  sellerId: string;
  purchaseDate?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    type: 'seller' | 'buyer' | 'admin';
    password?: string;
    purchasedTickets?: string[];
};

export const games: Game[] = [
  { id: '1', teamA: 'Arsenal', teamB: 'Chelsea', date: '2025-07-15', status: 'Tickets Available', venue: 'Emirates Stadium', basePrice: 70 },
  { id: '2', teamA: 'Liverpool', teamB: 'Arsenal', date: '2025-07-22', status: 'No Tickets Yet', venue: 'Anfield', basePrice: 80 },
  { id: '3', teamA: 'Arsenal', teamB: 'Manchester City', date: '2025-08-05', status: 'Tickets Available', venue: 'Emirates Stadium', basePrice: 85 },
  { id: '4', teamA: 'Tottenham', teamB: 'Arsenal', date: '2025-08-12', status: 'Tickets Available', venue: 'Tottenham Hotspur Stadium', basePrice: 75 },
  { id: '5', teamA: 'Arsenal', teamB: 'Manchester United', date: '2025-08-19', status: 'No Tickets Yet', venue: 'Emirates Stadium', basePrice: 90 },
  { id: '6', teamA: 'Manchester City', teamB: 'Chelsea', date: '2025-07-19', status: 'Tickets Available', venue: 'Etihad Stadium', basePrice: 72 },
  { id: '7', teamA: 'Manchester United', teamB: 'Liverpool', date: '2025-07-26', status: 'Tickets Available', venue: 'Old Trafford', basePrice: 88 },
  { id: '8', teamA: 'Chelsea', teamB: 'Tottenham', date: '2025-08-02', status: 'No Tickets Yet', venue: 'Stamford Bridge', basePrice: 78 },
];

export const tickets: Ticket[] = [];

export const users: User[] = [
    { id: 'admin', name: 'Admin User', email: 'admin@seatswap.com', type: 'admin', password: 'admin' },
];

export const seatData = {
  sections: [
    { name: 'A', rows: 10, seatsPerRow: 20, priceMultiplier: 1.5 },
    { name: 'B', rows: 15, seatsPerRow: 25, priceMultiplier: 1.2 },
    { name: 'C', rows: 20, seatsPerRow: 30, priceMultiplier: 1.0 },
    { name: 'D', rows: 15, seatsPerRow: 25, priceMultiplier: 1.2 },
  ],
  unavailableSeats: [],
};
