import { store } from "../../application/store/configureStore";
import { setReports } from "../../application/store/features/tms/tmsSlice";
import { Report, ReportValues } from "../../domain/entities/Report";
import { ReportsRepositoryDatabase } from "../repository/ReportsRepositoryDatabase";

export const listenReports = () => {
  const repo = new ReportsRepositoryDatabase();

  repo.listenReports((reports: ReportValues[]) =>
    store.dispatch(setReports(reports))
  );
  //   setReports(reports);
};
