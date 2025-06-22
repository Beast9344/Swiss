'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { 
    games as initialGames, 
    tickets as initialTickets, 
    users as initialUsers,
    seatData as initialSeatData,
} from '@/lib/data';
import type { Game, Ticket, User } from '@/lib/data';

type SeatData = typeof initialSeatData;

const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

type DataContextType = {
  games: Game[];
  tickets: Ticket[];
  users: User[];
  seatData: SeatData;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  addTicket: (ticket: Omit<Ticket, 'id'>) => void;
  addUser: (user: Omit<User, 'id'>) => User;
  updateSeatData: (newUnavailableSeat: string) => void;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [seatData, setSeatData] = useState<SeatData>(initialSeatData);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addTicket = (ticket: Omit<Ticket, 'id'>) => {
    const newTicket = { ...ticket, id: generateId('t') };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: generateId('u') };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const updateSeatData = (newUnavailableSeat: string) => {
    setSeatData(prevSeatData => ({
      ...prevSeatData,
      unavailableSeats: [...prevSeatData.unavailableSeats, newUnavailableSeat],
    }));
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets =>
      prevTickets.map(t =>
        t.id === ticketId ? { ...t, ...updates } : t
      )
    );
  };

  return (
    <DataContext.Provider value={{
        games,
        tickets,
        users,
        seatData,
        currentUser,
        setCurrentUser,
        setGames,
        setTickets,
        setUsers,
        addTicket,
        addUser,
        updateSeatData,
        updateTicket
    }}>
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
