import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const { VITE_API_KEY } = process.env;

//init user state
export const isUser = createAsyncThunk("userReducer/isUser", async () => {
  const req = await axios.get(VITE_API_KEY, {
    withCredentials: true,
  });
  const res = await req.data;
  return res;
});

//authentication slice
export const logoutAction = createAsyncThunk("userReducer/logout", async () => {
  const options = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
  const req = await axios.post(`${VITE_API_KEY}/logout`, options);
  const res = await req.data;
  return res;
});

// user slice
const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    userState: false,
    user: null,
    loading: true,
  },
  reducers: {
    updateUserState: function (state, action) {
      state.userState = action.payload.login;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(isUser.fulfilled, function (state, action) {
      state.userState = action.payload.login;
      if (action.payload.login) {
        state.user = action.payload.user;
      }
      state.loading = false;
    });
    builder.addCase(logoutAction.fulfilled, function (state, action) {
      state.userState = action.payload;
      state.loading = false;
    });
  },
});
export const { updateUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;

// notes slice
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const req = await axios.get(`${VITE_API_KEY}/getNotes`, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
  const notes = await req.data;
  return notes;
});
export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    loading: true,
    errMsg: "",
    notes: [],
  },
  reducers: {
    pushNote: function (state, action) {
      state.notes.unshift(action.payload);
    },
    updateNote: function (state, action) {
      const specificNote = state.notes.find((note) => {
        return note.id == action.payload.noteId;
      });
      specificNote.title = action.payload.newTitle;
      specificNote.note = action.payload.newNote;
      specificNote.bgColor = action.payload.bgColor;
      specificNote.color = action.payload.color;
      // return state;
    },
    removeNote: function (state, action) {
      const updated = state.notes.filter((note) => note.id !== action.payload);
      state.notes = updated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, function (state, action) {
      if (action.payload.state) {
        state.notes = action.payload.notes;
      } else {
        state.errMsg = action.payload.msg;
      }
      state.loading = false;
    });
  },
});
export const { pushNote, removeNote, updateNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

export const virtualNotesSlice = createSlice({
  name: "virtualNotes",
  initialState: [],
  reducers: {
    setupNotes: function (state, action) {
      return (state = action.payload);
    },
  },
});
export const { setupNotes } = virtualNotesSlice.actions;
export const virtualNotes = virtualNotesSlice.reducer;

// modify mode
const modifyNoteSlice = createSlice({
  name: "modifyNote",
  initialState: {
    editMode: false,
    id: null,
    title: "",
    note: "",
    bgColor: "",
    color: "",
  },
  reducers: {
    switchNoteModifyMode: function (state, action) {
      state.editMode = action.payload.editMode;
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.note = action.payload.note;
      state.bgColor = action.payload.bgColor;
      state.color = action.payload.color;
      return state;
    },
  },
});
export const { switchNoteModifyMode } = modifyNoteSlice.actions;
export const noteModifyMode = modifyNoteSlice.reducer;

// folders slice
export const fetchFolders = createAsyncThunk("folders/fetchFolders", async (ownerId) => {
  const req = await axios.post(`${VITE_API_KEY}/getFolders`, ownerId, {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });
  const folders = await req.data;
  return folders;
});
const foldersSlice = createSlice({
  name: "folders",
  initialState: {
    loading: true,
    errMsg: "",
    folders: [],
  },
  reducers: {
    pushFolder: function (state, action) {
      state.folders.unshift(action.payload);
    },
    removeFolder: function (state, action) {
      const updated = state.folders.filter((folder) => folder.id !== action.payload);
      state.folders = updated;
    },
    reNameFolder: function (state, action) {
      state.folders.forEach((folder) => {
        if (folder.id == action.payload.id) {
          folder.folder = action.payload.newName;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.fulfilled, (state, action) => {
      if (action.payload.state) {
        state.folders = action.payload.folders;
      } else {
        state.errMsg = action.payload.msg;
      }
      state.loading = false;
    });
  },
});
export const { pushFolder, removeFolder, reNameFolder } = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;

const modifyFolderSlice = createSlice({
  name: "addFolder",
  initialState: false,
  reducers: {
    switchAddMode: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { switchAddMode } = modifyFolderSlice.actions;
export const folderAddMode = modifyFolderSlice.reducer;

const activatedSlice = createSlice({
  name: "activated",
  initialState: 0,
  reducers: {
    updateActivated: function (state, action) {
      return (state = action.payload);
    },
  },
});

export const { updateActivated } = activatedSlice.actions;
export const activatedReducer = activatedSlice.reducer;

// search mode
const searchSlice = createSlice({
  name: "search",
  initialState: false,
  reducers: {
    switchSearchMode: function (state, action) {
      return (state = action.payload);
    },
  },
});
export const { switchSearchMode } = searchSlice.actions;
export const searchMode = searchSlice.reducer;
