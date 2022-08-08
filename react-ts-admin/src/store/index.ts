import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import type {initialStateType} from './userSlice';

export interface StorelistType {
  user: initialStateType;
}

const Store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default Store;
