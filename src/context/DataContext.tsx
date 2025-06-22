'use client';

import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
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

// State Shape
export interface State {
  games: Game[];
  tickets: Ticket[];
  users: User[];
  seatData: SeatData;
  currentUser: User | null;
}

// Action Types
export const ActionType = {
  ADD_USER: 'ADD_USER',
  ADD_TICKET: 'ADD_TICKET',
  UPDATE_TICKET: 'UPDATE_TICKET',
  UPDATE_SEAT_DATA: 'UPDATE_SEAT_DATA',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_GAMES: 'SET_GAMES',
  SET_TICKETS: 'SET_TICKETS',
  REMOVE_GAME: 'REMOVE_GAME',
  REMOVE_TICKET: 'REMOVE_TICKET',
} as const;

// Action Shape
export type Action = 
  | { type: typeof ActionType.ADD_USER; payload: User }
  | { type: typeof ActionType.ADD_TICKET; payload: Ticket }
  | { type: typeof ActionType.UPDATE_TICKET; payload: { ticketId: string; updates: Partial<Ticket> } }
  | { type: typeof ActionType.UPDATE_SEAT_DATA; payload: string }
  | { type: typeof ActionType.SET_CURRENT_USER; payload: User | null }
  | { type: typeof ActionType.SET_GAMES; payload: Game[] }
  | { type: typeof ActionType.SET_TICKETS; payload: Ticket[] }
  | { type: typeof ActionType.REMOVE_GAME; payload: string } // gameId
  | { type: typeof ActionType.REMOVE_TICKET; payload: string }; // ticketId

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
    case ActionType.REMOVE_GAME:
      return { ...state, games: state.games.filter(g => g.id !== action.payload) };
    case ActionType.REMOVE_TICKET:
        return { ...state, tickets: state.tickets.filter(t => t.id !== action.payload) };
    default:
      // This is a safe way to handle unhandled actions in TypeScript
      const _: never = action;
      return state;
  }
}

interface DataContextType {
    state: State;
    dispatch: Dispatch<Action>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
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
