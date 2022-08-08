import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage, removeLocalStorage,getLocalStorage } from "../lib/LocalStorage";
export interface initialStateType {
  // userInfo: {
  //   [key: string]: any;
  // };

  userInfo:Record<string,any>
}

const initialState: initialStateType = {
  userInfo: JSON.parse(getLocalStorage('userInfo') || '{}'),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      setLocalStorage("userInfo", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.userInfo = {};
      removeLocalStorage("userInfo");
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
