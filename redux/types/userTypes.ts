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
export const SORT_USERS = "SORT_USERS";

interface SearchUserAction {
  type: typeof SEARCH_USER;
  payload: string;
}

interface SortUserAction {
  type: typeof SORT_USERS;
  payload: SortData;
}

export type UserActionTypes = SearchUserAction | SortUserAction;

export interface SortData {
  type: "name" | "rank";
  sortDir: "asc" | "desc";
}
