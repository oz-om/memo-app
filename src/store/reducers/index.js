import axios from "axios";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const isUser = createAsyncThunk(
  "userState/isUser", 
  async () => {
  const req = await axios.get("http://127.0.0.1:4011", {
    withCredentials: true
  });
  const res = await req.data;
  console.log(res);
  return res
});

const userSlice = createSlice({
  name: "userReducer",
  initialState: false,
  reducers:{
    loginAction: function(state,action){
      return state = action.payload
    },
    logoutAction: function(state,action){
      return state = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      isUser.fulfilled, 
      (state,action) => {
        return state = action.payload.user
    })
  }
})

export const {loginAction, logoutAction} = userSlice.actions
export const userReducer = userSlice.reducer