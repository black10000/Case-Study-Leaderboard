export interface User {
  uid: string;
  name: string;
  bananas: number;
  lastDayPlayed: string;
  longestStreak: number;
  stars: number;
  subscribed: boolean;
  rank?: number;
  isSearchedUser?: boolean;
}

export interface UsersState {
  users: Record<string, User>;
}

export const SEARCH_USER = "SEARCH_USER";

interface SearchUserAction {
  type: typeof SEARCH_USER;
  payload: string;
}

export type UserActionTypes = SearchUserAction;
