import { configureStore } from "@reduxjs/toolkit";
import { activatedReducer, folderModifyMode, foldersReducer, loginReducer, noteModifyMode, notesReducer, registerReducer, userReducer } from "./reducers";
export const store = configureStore({
  reducer: {
    userReducer,
    loginReducer,
    registerReducer,
    notesReducer,
    foldersReducer,
    folderModifyMode,
    activatedReducer,
    noteModifyMode,
  },
});
