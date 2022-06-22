import { store } from "../../application/store/configureStore";
import { setReports } from "../../application/store/features/tms/tmsSlice";
import { PlanningReportValues } from "../../domain/entities/Report";
import { ReportsRepositoryDatabase } from "../repository/ReportsRepositoryDatabase";

export const listenReports = () => {
  const repo = new ReportsRepositoryDatabase();

  repo.listenReports((reports: PlanningReportValues[]) =>
    store.dispatch(setReports(reports))
  );
  //   setReports(reports);
};
