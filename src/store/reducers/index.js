import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const isUser = createAsyncThunk("userReducer/isUser", async () => {
  const req = await axios.get("http://127.0.0.1:4011", {
    withCredentials: true,
  });
  const res = await req.data;
  return res;
});

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

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async (ownerId) => {
  const req = await axios.post("http://127.0.0.1:4011/getNotes", ownerId, { withCredentials: true });
  const notes = await req.data;
  return notes;
});
export const notesSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action) => (state = action.payload));
  },
});

export const notesReducer = notesSlice.reducer;
