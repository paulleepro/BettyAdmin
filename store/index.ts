import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers, createStore } from "redux";

type UserType = {
  userId: string;
  token: string;
};

type AuthState = {
  user: UserType | null;
};

const getDefaultUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const existingUser = localStorage.getItem("lu");
  if (existingUser) {
    return JSON.parse(existingUser);
  }

  return null;
};

const initialState: AuthState = { user: getDefaultUser() };

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUser: (state, action: PayloadAction<UserType | null>) => {
      state.user = action.payload;
      if (action.payload) {
        window.localStorage.setItem("lu", JSON.stringify(action.payload));
      } else {
        window.localStorage.removeItem("lu");
      }
    },
  },
});

const store = createStore(
  combineReducers({
    auth: authSlice.reducer,
  })
);
export default store;

export const { setUser } = authSlice.actions;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.auth.user;
