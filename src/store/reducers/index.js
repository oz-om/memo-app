import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//init user state
export const isUser = createAsyncThunk("userReducer/isUser", async () => {
  const req = await axios.get("http://127.0.0.1:4011", {
    withCredentials: true,
  });
  const res = await req.data;
  return res;
});

// user slice
const userSlice = createSlice({
  name: "userReducer",
  initialState: {
    userState: null,
    user: null,
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
    });
    builder.addCase(logoutAction.fulfilled, function (state, action) {
      return (state.userState = action.payload);
    });
  },
});
export const { updateUserState } = userSlice.actions;
export const userReducer = userSlice.reducer;

//authentication slice
export const logoutAction = createAsyncThunk("userReducer/registerAction", async () => {
  const options = {
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  };
  const req = await axios.post("http://127.0.0.1:4011/logout", options);
  const res = await req.data;
  return res;
});
const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
  },
  reducers: {
    setEmail: (state, action) => void (state.email = action.payload),
    setPassword: (state, action) => void (state.password = action.payload),
  },
});
export const { setEmail, setPassword } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
const registerSlice = createSlice({
  name: "register",
  initialState: {
    username: "",
    email: "",
    password: "",
  },
  reducers: {
    setRegisterUsername: (state, action) => void (state.username = action.payload),
    setRegisterEmail: (state, action) => void (state.email = action.payload),
    setRegisterPassword: (state, action) => void (state.password = action.payload),
  },
});
export const { setRegisterUsername, setRegisterEmail, setRegisterPassword } = registerSlice.actions;
export const registerReducer = registerSlice.reducer;

// notes slice
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (ownerId) => {
  const req = await axios.post("http://127.0.0.1:4011/getNotes", ownerId, { withCredentials: true });
  const notes = await req.data;
  return notes;
});
export const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    pushNote: function (state, action) {
      state.push(action.payload);
    },
    updateNote: function (state, action) {
      const specificNote = state.find((note) => {
        return note.id == action.payload.id;
      });
      specificNote.title = action.payload.newTitle;
      specificNote.note = action.payload.newNote;
      specificNote.bgColor = action.payload.bgColor;
      specificNote.color = action.payload.color;
      return state;
    },
    removeNote: function (state, action) {
      const updated = state.filter((note) => note.id !== action.payload);
      return (state = updated);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => (state = action.payload));
  },
});
export const { pushNote, removeNote, updateNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;

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
  const req = await axios.post("http://127.0.0.1:4011/getFolders", ownerId, {
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
  initialState: [],
  reducers: {
    pushFolder: function (state, action) {
      state.push(action.payload);
    },
    removeFolder: function (state, action) {
      const updated = state.filter((folder) => folder !== action.payload);
      return (state = updated);
    },
    reNameFolder: function (state, action) {
      const folder = state.indexOf(action.payload.oldName);
      state[folder] = action.payload.newName;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFolders.fulfilled, (state, action) => (state = action.payload.folders));
  },
});
export const { pushFolder, removeFolder, reNameFolder } = foldersSlice.actions;
export const foldersReducer = foldersSlice.reducer;

const modifyFolderSlice = createSlice({
  name: "modifyFolder",
  initialState: false,
  reducers: {
    switchModifyMode: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const { switchModifyMode } = modifyFolderSlice.actions;
export const folderModifyMode = modifyFolderSlice.reducer;

const activatedSlice = createSlice({
  name: "activated",
  initialState: "All",
  reducers: {
    updateActivated: function (state, action) {
      return (state = action.payload);
    },
  },
});

export const { updateActivated } = activatedSlice.actions;
export const activatedReducer = activatedSlice.reducer;
