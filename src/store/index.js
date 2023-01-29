import { configureStore } from "@reduxjs/toolkit";
import { activatedReducer, folderAddMode, foldersReducer, noteModifyMode, notesReducer, searchMode, userReducer, virtualNotes } from "./reducers";
export const store = configureStore({
  reducer: {
    userReducer,
    notesReducer,
    activatedReducer,
    virtualNotes,
    foldersReducer,
    folderAddMode,
    noteModifyMode,
    searchMode,
  },
});
