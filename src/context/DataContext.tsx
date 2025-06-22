'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { 
    games as initialGames, 
    tickets as initialTickets, 
    users as initialUsers,
    seatData as initialSeatData,
} from '@/lib/data';
import type { Game, Ticket, User } from '@/lib/data';

type SeatData = typeof initialSeatData;

const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

interface AppState {
  games: Game[];
  tickets: Ticket[];
  users: User[];
  seatData: SeatData;
  currentUser: User | null;
}

type DataContextType = AppState & {
  setCurrentUser: (user: User | null) => void;
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
  const [appState, setAppState] = useState<AppState>({
    games: initialGames,
    tickets: initialTickets,
    users: initialUsers,
    seatData: initialSeatData,
    currentUser: null,
  });

  const setCurrentUser = (user: User | null) => {
    setAppState(prev => ({ ...prev, currentUser: user }));
  };

  const setGames = (updater: React.SetStateAction<Game[]>) => {
    setAppState(prev => ({
      ...prev,
      games: typeof updater === 'function' ? updater(prev.games) : updater,
    }));
  };
  
  const setTickets = (updater: React.SetStateAction<Ticket[]>) => {
    setAppState(prev => ({
      ...prev,
      tickets: typeof updater === 'function' ? updater(prev.tickets) : updater,
    }));
  };

  const setUsers = (updater: React.SetStateAction<User[]>) => {
    setAppState(prev => ({
      ...prev,
      users: typeof updater === 'function' ? updater(prev.users) : updater,
    }));
  };

  const addUser = (user: Omit<User, 'id'>): User => {
    const newUser = { ...user, id: generateId('u') };
    setAppState(prev => ({
      ...prev,
      users: [...prev.users, newUser],
    }));
    return newUser;
  };

  const addTicket = (ticket: Omit<Ticket, 'id'>) => {
    const newTicket = { ...ticket, id: generateId('t') };
     setAppState(prev => ({
      ...prev,
      tickets: [...prev.tickets, newTicket],
    }));
  };

  const updateSeatData = (newUnavailableSeat: string) => {
    setAppState(prev => ({
      ...prev,
      seatData: {
        ...prev.seatData,
        unavailableSeats: [...prev.seatData.unavailableSeats, newUnavailableSeat],
      },
    }));
  };

  const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
    setAppState(prev => ({
      ...prev,
      tickets: prev.tickets.map(t =>
        t.id === ticketId ? { ...t, ...updates } : t
      ),
    }));
  };

  const contextValue = useMemo(() => ({
    ...appState,
    setCurrentUser,
    setGames,
    setTickets,
    setUsers,
    addUser,
    addTicket,
    updateSeatData,
    updateTicket,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [appState]);

  return (
    <DataContext.Provider value={contextValue}>
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
