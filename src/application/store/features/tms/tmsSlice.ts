import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlanningReportValues } from "../../../../domain/entities/Report";
import { datesAreOnSameDay } from "../../../service/datesAreOnSameDay";

// type Report = {
//   status: "success" | "error";
//   transpId: string;
//   transportadora: string;
//   message: string;
//   ft: string;
//   createdAt: Date;
// };

export interface tmsState {
  reports: PlanningReportValues[];
}

const initialState: tmsState = {
  reports: [],
};

export const tmsSlice = createSlice({
  name: "tms",
  initialState,
  reducers: {
    setReports: (state, action: PayloadAction<PlanningReportValues[]>) => {
      // state.reports = action.payload;
      for (const report of action.payload) {
        const found = state.reports.find(
          (r) =>
            r.ft === report.ft &&
            datesAreOnSameDay(r.horarioEnvio, report.horarioEnvio)
        );
        if (!found) {
          state.reports = state.reports.concat([report]);
        }
      }
      // state.reports = state.reports.concat(action.payload);
      // for(const )
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const tmsActions = tmsSlice.actions;
export const { setReports } = tmsActions;
export type setReportsType = typeof setReports;
export default tmsSlice.reducer;
