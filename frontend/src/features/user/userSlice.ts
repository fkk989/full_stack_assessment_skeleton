import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

interface InitialState {
  users: User[];
  selectedUser: string;
}

const initialState: InitialState = {
  users: [],
  selectedUser: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // to set users for the first time
    setUser: (state, action: PayloadAction<User[]>) => {
      const data = action.payload;
      if (state.users.length === 0) {
        state.users = data;
      }
    },
    // if you want to add extra users afterWards
    // addUser: (state, action: PayloadAction<User[]>) => {
    //   // dot have a use case right now
    // },
    //
    setSelectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setUser, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;
