import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  // const response = await fetch("https://jsonplaceholder.typicode.com/users");
  // const users = await response.json();
  const users = await axios.get("http://localhost:8000/emp/").then(res => {
   const data= res.data;
   return data
})
  return users;
});





const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    loading: false,
    modal: false,
  },
  reducers: {
    userAdded(state, action) {
      state.entities.push(action.payload);
    },
    userUpdated(state, action) {
      const { __id, name, email,department } = action.payload;
      const existingUser = state.entities.find((user) => user._id === __id);
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.department= department
      }
    },
    userDeleted(state, action) {
      const { _id } = action.payload;
      const existingUser = state.entities.find((user) => user._id === _id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user._id !== _id);
      }
    },

    userDetails(state, action) {
      const { __id } = action.payload;
      const existingUser = state.entities.find((user) => user.__id === __id);
      if (existingUser) {
        state.entities = state.entities.filter((user) => user.__id === __id);
      }
    },
    modalClosed(state,action){
      state.modal = false;
    },
    modalOpen(state,action){
      state.modal= true;
    }
  },
  extraReducers: {
    [fetchUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.entities = [...state.entities, ...action.payload];
    },
    [fetchUsers.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

export const { userAdded, userUpdated, userDeleted, userDetails,modalOpen,modalClosed} = usersSlice.actions;

export default usersSlice.reducer;
