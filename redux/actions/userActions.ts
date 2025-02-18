import { SEARCH_USER, UserActionTypes } from "../types/userTypes";

export const searchUser = (query: string): UserActionTypes => {
  return {
    type: SEARCH_USER,
    payload: query,
  };
};
