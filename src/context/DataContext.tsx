'use client';

import {
    createContext,
    useContext,
    useState,
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

interface DataContextType {
  games: Game[];
  setGames: Dispatch<SetStateAction<Game[]>>;
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  seatData: SeatData;
  setSeatData: Dispatch<SetStateAction<SeatData>>;
  currentUser: User | null;
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

    const addUser = (user: User) => {
        setUsers(prevUsers => [...prevUsers, user]);
    };

    const addTicket = (ticket: Ticket) => {
        setTickets(prevTickets => [...prevTickets, ticket]);
    };

    const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
        setTickets(prevTickets => 
            prevTickets.map(t => t.id === ticketId ? { ...t, ...updates } : t)
        );
    };

    const updateSeatData = (seatId: string) => {
        setSeatData(prevSeatData => ({
            ...prevSeatData,
            unavailableSeats: [...prevSeatData.unavailableSeats, seatId],
        }));
    };

    const removeGame = (gameId: string) => {
        setGames(prevGames => prevGames.filter(g => g.id !== gameId));
    };

    const removeTicket = (ticketId: string) => {
        setTickets(prevTickets => prevTickets.filter(t => t.id !== ticketId));
    };
    
    const value: DataContextType = {
        games,
        setGames,
        tickets,
        setTickets,
        users,
        setUsers,
        seatData,
        setSeatData,
        currentUser,
        setCurrentUser,
        addUser,
        addTicket,
        updateTicket,
        updateSeatData,
        removeGame,
        removeTicket,
    };

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
