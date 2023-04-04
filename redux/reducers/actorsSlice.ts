import { baseObj } from "@/common/constance";
import { IcharacterProps, IsingleChars } from "@/common/GlobalIterfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define the initial state using that type
const initialState: IcharacterProps = baseObj

export const actorsSlice = createSlice({
  name: "actorsData",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<IcharacterProps>) => {
      state.data = action.payload.data;
      
    },
    updateSinglepageData:(state, action: PayloadAction<IsingleChars>) => {
      state.singlePageData = action.payload
    },
  },
});

export const { updateData,updateSinglepageData } = actorsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state;

export default actorsSlice.reducer;
