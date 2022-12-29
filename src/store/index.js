import { configureStore } from "@reduxjs/toolkit";
import { activatedReducer, folderModifyMode, foldersReducer, loginReducer, noteModifyMode, notesReducer, registerReducer, searchMode, userReducer, virtualNotes } from "./reducers";
export const store = configureStore({
  reducer: {
    userReducer,
    loginReducer,
    registerReducer,
    notesReducer,
    activatedReducer,
    virtualNotes,
    foldersReducer,
    folderModifyMode,
    noteModifyMode,
    searchMode,
  },
});
