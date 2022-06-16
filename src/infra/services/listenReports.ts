import { ReportsRepositoryDatabase } from "../repository/ReportsRepositoryDatabase";

export const listenReports = (setReports: any) => {
  const repo = new ReportsRepositoryDatabase();
  repo.listenReports(setReports);
  //   setReports(reports);
};
