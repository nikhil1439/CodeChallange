import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./components/reducers/usersSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
  },
});
