
'use client';

import { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
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

// Action Types
const ActionType = {
  ADD_USER: 'ADD_USER',
  ADD_TICKET: 'ADD_TICKET',
  UPDATE_TICKET: 'UPDATE_TICKET',
  UPDATE_SEAT_DATA: 'UPDATE_SEAT_DATA',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_GAMES: 'SET_GAMES',
  SET_TICKETS: 'SET_TICKETS',
  SET_USERS: 'SET_USERS',
} as const;

// State Shape
interface State {
  games: Game[];
  tickets: Ticket[];
  users: User[];
  seatData: SeatData;
  currentUser: User | null;
}

// Action Shape
type Action = 
  | { type: typeof ActionType.ADD_USER; payload: User }
  | { type: typeof ActionType.ADD_TICKET; payload: Ticket }
  | { type: typeof ActionType.UPDATE_TICKET; payload: { ticketId: string; updates: Partial<Ticket> } }
  | { type: typeof ActionType.UPDATE_SEAT_DATA; payload: string }
  | { type: typeof ActionType.SET_CURRENT_USER; payload: User | null }
  | { type: typeof ActionType.SET_GAMES; payload: Game[] }
  | { type: typeof ActionType.SET_TICKETS; payload: Ticket[] }
  | { type: typeof ActionType.SET_USERS; payload: User[] };

const initialState: State = {
  games: initialGames,
  tickets: initialTickets,
  users: initialUsers,
  seatData: initialSeatData,
  currentUser: null,
};

function dataReducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case ActionType.ADD_TICKET:
      return { ...state, tickets: [...state.tickets, action.payload] };
    case ActionType.UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map(t =>
          t.id === action.payload.ticketId ? { ...t, ...action.payload.updates } : t
        ),
      };
    case ActionType.UPDATE_SEAT_DATA:
      return {
        ...state,
        seatData: {
          ...state.seatData,
          unavailableSeats: [...state.seatData.unavailableSeats, action.payload],
        },
      };
    case ActionType.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case ActionType.SET_GAMES:
      return { ...state, games: action.payload };
    case ActionType.SET_TICKETS:
      return { ...state, tickets: action.payload };
    case ActionType.SET_USERS:
      return { ...state, users: action.payload };
    default:
      throw new Error(`Unhandled action type`);
  }
}


interface DataContextType extends State {
  setCurrentUser: (user: User | null) => void;
  addUser: (user: User) => void;
  addTicket: (ticket: Ticket) => void;
  updateSeatData: (newUnavailableSeat: string) => void;
  updateTicket: (ticketId: string, updates: Partial<Ticket>) => void;
  setGames: React.Dispatch<React.SetStateAction<Game[]>>;
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const addUser = useCallback((user: User) => {
    dispatch({ type: ActionType.ADD_USER, payload: user });
  }, []);

  const addTicket = useCallback((ticket: Ticket) => {
    dispatch({ type: ActionType.ADD_TICKET, payload: ticket });
  }, []);

  const updateTicket = useCallback((ticketId: string, updates: Partial<Ticket>) => {
    dispatch({ type: ActionType.UPDATE_TICKET, payload: { ticketId, updates } });
  }, []);
  
  const updateSeatData = useCallback((newUnavailableSeat: string) => {
    dispatch({ type: ActionType.UPDATE_SEAT_DATA, payload: newUnavailableSeat });
  }, []);

  const setCurrentUser = useCallback((user: User | null) => {
    dispatch({ type: ActionType.SET_CURRENT_USER, payload: user });
  }, []);

  const setGames = useCallback((setter: React.SetStateAction<Game[]>) => {
    dispatch({ type: ActionType.SET_GAMES, payload: typeof setter === 'function' ? setter(state.games) : setter });
  }, [state.games]);
  
  const setTickets = useCallback((setter: React.SetStateAction<Ticket[]>) => {
      dispatch({ type: ActionType.SET_TICKETS, payload: typeof setter === 'function' ? setter(state.tickets) : setter });
  }, [state.tickets]);

  const setUsers = useCallback((setter: React.SetStateAction<User[]>) => {
      dispatch({ type: ActionType.SET_USERS, payload: typeof setter === 'function' ? setter(state.users) : setter });
  }, [state.users]);

  const contextValue = {
    ...state,
    setCurrentUser,
    addUser,
    addTicket,
    updateSeatData,
    updateTicket,
    setGames,
    setTickets,
    setUsers,
  };

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
