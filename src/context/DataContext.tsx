'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
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

interface AppState {
  games: Game[];
  tickets: Ticket[];
  users: User[];
  seatData: SeatData;
  currentUser: User | null;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [appState, setAppState] = useState<AppState>({
    games: initialGames,
    tickets: initialTickets,
    users: initialUsers,
    seatData: initialSeatData,
    currentUser: null,
  });

  const setGames = useCallback((updater: React.SetStateAction<Game[]>) => {
    setAppState(prev => ({
      ...prev,
      games: typeof updater === 'function' ? (updater as (prevState: Game[]) => Game[])(prev.games) : updater
    }));
  }, []);

  const setTickets = useCallback((updater: React.SetStateAction<Ticket[]>) => {
    setAppState(prev => ({
      ...prev,
      tickets: typeof updater === 'function' ? (updater as (prevState: Ticket[]) => Ticket[])(prev.tickets) : updater
    }));
  }, []);

  const setUsers = useCallback((updater: React.SetStateAction<User[]>) => {
    setAppState(prev => ({
      ...prev,
      users: typeof updater === 'function' ? (updater as (prevState: User[]) => User[])(prev.users) : updater
    }));
  }, []);
  
  const setCurrentUser = useCallback((updater: React.SetStateAction<User | null>) => {
    setAppState(prev => ({
      ...prev,
      currentUser: typeof updater === 'function' ? (updater as (prevState: User | null) => User | null)(prev.currentUser) : updater
    }));
  }, []);

  const addTicket = useCallback((ticket: Omit<Ticket, 'id'>) => {
    const newTicket = { ...ticket, id: generateId('t') };
    setTickets(prevTickets => [...prevTickets, newTicket]);
  }, [setTickets]);

  const addUser = useCallback((user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: generateId('u') };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  }, [setUsers]);

  const updateSeatData = useCallback((newUnavailableSeat: string) => {
    setAppState(prev => ({
      ...prev,
      seatData: {
        ...prev.seatData,
        unavailableSeats: [...prev.seatData.unavailableSeats, newUnavailableSeat],
      },
    }));
  }, []);

  const updateTicket = useCallback((ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prevTickets =>
      prevTickets.map(t =>
        t.id === ticketId ? { ...t, ...updates } : t
      )
    );
  }, [setTickets]);

  const contextValue = useMemo(() => ({
    ...appState,
    setGames,
    setTickets,
    setUsers,
    setCurrentUser,
    addTicket,
    addUser,
    updateSeatData,
    updateTicket
  }), [appState, setGames, setTickets, setUsers, setCurrentUser, addTicket, addUser, updateSeatData, updateTicket]);

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
