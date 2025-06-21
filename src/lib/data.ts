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
};

export type User = {
    id: string;
    name: string;
    email: string;
    type: 'seller' | 'buyer' | 'admin';
    password?: string;
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

export const tickets: Ticket[] = [
  { id: 't1', gameId: '1', section: 'A', row: 5, seat: 12, price: 85, status: 'listed', sellerId: 'u1' },
  { id: 't2', gameId: '3', section: 'B', row: 3, seat: 8, price: 95, status: 'pending', sellerId: 'u2' },
  { id: 't3', gameId: '4', section: 'C', row: 10, seat: 1, price: 105, status: 'sold', sellerId: 'u1' },
  { id: 't4', gameId: '1', section: 'D', row: 1, seat: 20, price: 75, status: 'listed', sellerId: 'u3' },
  { id: 't5', gameId: '3', section: 'A', row: 2, seat: 5, price: 115, status: 'rejected', sellerId: 'u2' },
];

export const users: User[] = [
    { id: 'u1', name: 'John Doe', email: 'john.doe@example.com', type: 'seller', password: 'password123' },
    { id: 'u2', name: 'Jane Smith', email: 'jane.smith@example.com', type: 'seller', password: 'password123' },
    { id: 'u3', name: 'Peter Jones', email: 'peter.jones@example.com', type: 'buyer', password: 'password123' },
    { id: 'admin', name: 'Admin User', email: 'admin@seatswap.com', type: 'admin', password: 'admin' },
];

export const seatData = {
  sections: [
    { name: 'A', rows: 10, seatsPerRow: 20, priceMultiplier: 1.5 },
    { name: 'B', rows: 15, seatsPerRow: 25, priceMultiplier: 1.2 },
    { name: 'C', rows: 20, seatsPerRow: 30, priceMultiplier: 1.0 },
    { name: 'D', rows: 15, seatsPerRow: 25, priceMultiplier: 1.2 },
  ],
  unavailableSeats: ['A-5-12', 'C-10-1', 'B-3-8', 'A-2-5', 'D-1-20'],
};
