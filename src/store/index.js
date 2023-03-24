import { configureStore } from "@reduxjs/toolkit";
import { activatedReducer, folderAddMode, foldersReducer, moveMode, noteModifyMode, notesReducer, searchMode, userReducer, virtualNotes } from "./reducers";
export const store = configureStore({
  reducer: {
    userReducer,
    notesReducer,
    activatedReducer,
    virtualNotes,
    moveMode,
    foldersReducer,
    folderAddMode,
    noteModifyMode,
    searchMode,
  },
});
