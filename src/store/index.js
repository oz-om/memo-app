import { configureStore } from "@reduxjs/toolkit";
import { activatedReducer, folderModifyMode, foldersReducer, noteModifyMode, notesReducer, searchMode, userReducer, virtualNotes } from "./reducers";
export const store = configureStore({
  reducer: {
    userReducer,
    notesReducer,
    activatedReducer,
    virtualNotes,
    foldersReducer,
    folderModifyMode,
    noteModifyMode,
    searchMode,
  },
});
