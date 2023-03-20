import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface History {
  operations: string[][];
}

// Define the initial state using that type
const initialState: History = {
  operations: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<string[]>) => {
      state.operations.push(action.payload);
    },
    remove: (state) => {
      state.operations.pop();
    },
    reset: (state) => {
      state.operations.length = 0;
    },
  },
});

export const { add, remove, reset } = historySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectOperations = (state: RootState) => state.history.operations;

export const historyReducer = historySlice.reducer;
