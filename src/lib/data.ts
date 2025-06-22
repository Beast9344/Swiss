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
  { id: 'g-1', teamA: 'Arsenal', teamB: 'Chelsea', date: '2025-07-15', status: 'Tickets Available', venue: 'Emirates Stadium', basePrice: 70 },
  { id: 'g-2', teamA: 'Liverpool', teamB: 'Arsenal', date: '2025-07-22', status: 'No Tickets Yet', venue: 'Anfield', basePrice: 80 },
  { id: 'g-3', teamA: 'Arsenal', teamB: 'Manchester City', date: '2025-08-05', status: 'Tickets Available', venue: 'Emirates Stadium', basePrice: 85 },
  { id: 'g-4', teamA: 'Tottenham', teamB: 'Arsenal', date: '2025-08-12', status: 'Tickets Available', venue: 'Tottenham Hotspur Stadium', basePrice: 75 },
  { id: 'g-5', teamA: 'Arsenal', teamB: 'Manchester United', date: '2025-08-19', status: 'No Tickets Yet', venue: 'Emirates Stadium', basePrice: 90 },
  { id: 'g-6', teamA: 'Manchester City', teamB: 'Chelsea', date: '2025-07-19', status: 'Tickets Available', venue: 'Etihad Stadium', basePrice: 72 },
  { id: 'g-7', teamA: 'Manchester United', teamB: 'Liverpool', date: '2025-07-26', status: 'Tickets Available', venue: 'Old Trafford', basePrice: 88 },
  { id: 'g-8', teamA: 'Chelsea', teamB: 'Tottenham', date: '2025-08-02', status: 'No Tickets Yet', venue: 'Stamford Bridge', basePrice: 78 },
];

export const users: User[] = [
    { id: 'admin', name: 'Admin User', email: 'admin@swiss.com', type: 'admin', password: 'admin', purchasedTickets: [] },
    { id: 'u-1', name: 'Alice Johnson', email: 'alice@example.com', type: 'seller', password: 'password123', purchasedTickets: ['t-1', 't-2'] },
    { id: 'u-2', name: 'Bob Williams', email: 'bob@example.com', type: 'seller', password: 'password123', purchasedTickets: ['t-3'] },
    { id: 'u-3', name: 'Charlie Brown', email: 'charlie@example.com', type: 'buyer', password: 'password123', purchasedTickets: ['t-4'] }
];

export const tickets: Ticket[] = [
    { id: 't-1', gameId: 'g-1', section: 'A', row: 5, seat: 12, price: 105, status: 'sold', sellerId: 'u-1', purchaseDate: '2024-05-10T10:00:00Z' },
    { id: 't-2', gameId: 'g-3', section: 'C', row: 10, seat: 5, price: 85, status: 'listed', sellerId: 'u-1' },
    { id: 't-3', gameId: 'g-4', section: 'B', row: 2, seat: 18, price: 90, status: 'pending', sellerId: 'u-2' },
    { id: 't-4', gameId: 'g-6', section: 'D', row: 8, seat: 22, price: 86.4, status: 'sold', sellerId: 'u-3', purchaseDate: '2024-05-12T14:30:00Z' },
    { id: 't-5', gameId: 'g-7', section: 'A', row: 1, seat: 1, price: 132, status: 'sold', sellerId: 'u-1', purchaseDate: '2024-05-11T11:20:00Z' },
];


export const seatData = {
  sections: [
    { name: 'A', rows: 10, seatsPerRow: 20, priceMultiplier: 1.5 },
    { name: 'B', rows: 15, seatsPerRow: 25, priceMultiplier: 1.2 },
    { name: 'C', rows: 20, seatsPerRow: 30, priceMultiplier: 1.0 },
    { name: 'D', rows: 15, seatsPerRow: 25, priceMultiplier: 1.2 },
  ],
  unavailableSeats: ['A-5-12', 'D-8-22', 'A-1-1'],
};
