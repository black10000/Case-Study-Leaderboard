import { createStore } from "redux";
import { usersReducer } from "./reducers/userReducer";

const store = createStore(usersReducer);

export default store;
