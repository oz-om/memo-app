import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers"
export const store = configureStore({
  reducer: {
    userReducer,
  },
})