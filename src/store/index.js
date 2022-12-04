import { configureStore } from "@reduxjs/toolkit";
import { loginReducer, notesReducer, registerReducer, userReducer } from "./reducers";
export const store = configureStore({
  reducer: {
    userReducer,
    loginReducer,
    registerReducer,
    notesReducer,
  },
});
