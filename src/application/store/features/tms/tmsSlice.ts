import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report, ReportValues } from "../../../../domain/entities/Report";
import { UserValues } from "../../../../domain/entities/User";

// type Report = {
//   status: "success" | "error";
//   transpId: string;
//   transportadora: string;
//   message: string;
//   ft: string;
//   createdAt: Date;
// };

export interface tmsState {
  reports: ReportValues[];
}

const initialState: tmsState = {
  reports: [],
};

export const tmsSlice = createSlice({
  name: "tms",
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<ReportValues[]>) => {
      state.reports = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const tmsActions = tmsSlice.actions;
export const { setReports } = tmsActions;
// export type SettmsType = typeof settms;
export default tmsSlice.reducer;
