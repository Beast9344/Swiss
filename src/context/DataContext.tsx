'use client';

import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react';
import { 
    games as initialGames, 
    tickets as initialTickets, 
    users as initialUsers,
    seatData as initialSeatData,
} from '@/lib/data';
import type { Game, Ticket, User } from '@/lib/data';

type SeatData = {
    sections: { name: string; rows: number; seatsPerRow: number; priceMultiplier: number }[];
    unavailableSeats: string[];
};

// New Context Shape
interface DataContextType {
  games: Game[];
  tickets: Ticket[];
  users: User[];
  seatData: SeatData;
  currentUser: User | null;
  
  setGames: Dispatch<SetStateAction<Game[]>>;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;

  addUser: (user: User) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
  updateSeatData: (seatId: string) => void;
  removeGame: (gameId: string) => void;
  removeTicket: (ticketId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [games, setGames] = useState<Game[]>(initialGames);
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [seatData, setSeatData] = useState<SeatData>(initialSeatData);
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const addUser = useCallback((user: User) => {
        setUsers(prev => [...prev, user]);
    }, []);

    const addTicket = useCallback((ticket: Ticket) => {
        setTickets(prev => [...prev, ticket]);
    }, []);

    const updateTicket = useCallback((ticketId: string, updates: Partial<Ticket>) => {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, ...updates } : t));
    }, []);

    const updateSeatData = useCallback((seatId: string) => {
        setSeatData(prev => ({
            ...prev,
            unavailableSeats: [...prev.unavailableSeats, seatId],
        }));
    }, []);

    const removeGame = useCallback((gameId: string) => {
        setGames(prev => prev.filter(g => g.id !== gameId));
    }, []);

    const removeTicket = useCallback((ticketId: string) => {
        setTickets(prev => prev.filter(t => t.id !== ticketId));
    }, []);
    
    const value = useMemo(() => ({
        games,
        tickets,
        users,
        seatData,
        currentUser,
        setGames,
        setCurrentUser,
        addUser,
        addTicket,
        updateTicket,
        updateSeatData,
        removeGame,
        removeTicket,
    }), [games, tickets, users, seatData, currentUser, addUser, addTicket, updateTicket, updateSeatData, removeGame, removeTicket]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
