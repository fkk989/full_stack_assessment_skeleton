import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { House } from "../../utils/types";

interface InitialState {
  houses: House[];
}

const initialState: InitialState = {
  houses: [],
};

export const houseSlice = createSlice({
  name: "house",
  initialState,
  reducers: {
    // reset state and set state to the new  data
    setHome: (state, action: PayloadAction<House[]>) => {
      const data = action.payload;
      state.houses = data;
    },
    // add data to existing data
    addHomes: (state, actions: PayloadAction<House[]>) => {
      const data = actions.payload;
      const currentState = state.houses;
      state.houses = [...currentState, ...data];
    },
  },
});

export const { setHome, addHomes } = houseSlice.actions;
export default houseSlice.reducer;
