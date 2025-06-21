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
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [games, setGames] = useState<Game[]>(initialGames);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [seatData, setSeatData] = useState<SeatData>(initialSeatData);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const addTicket = (ticket: Omit<Ticket, 'id'>) => {
    setTickets(prevTickets => [...prevTickets, { ...ticket, id: `t${prevTickets.length + 1}` }]);
  };

  const addUser = (user: Omit<User, 'id'>) => {
    const newUser = { ...user, id: `u${users.length + 1}` };
    setUsers(prevUsers => [...prevUsers, newUser]);
    return newUser;
  };

  const updateSeatData = (newUnavailableSeat: string) => {
    setSeatData(prevSeatData => ({
      ...prevSeatData,
      unavailableSeats: [...prevSeatData.unavailableSeats, newUnavailableSeat],
    }));
  };

  return (
    <DataContext.Provider value={{ games, tickets, users, seatData, currentUser, setCurrentUser, setGames, setTickets, setUsers, addTicket, addUser, updateSeatData }}>
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
