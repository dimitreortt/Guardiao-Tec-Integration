import { ReportsRepositoryDatabase } from "../repository/ReportsRepositoryDatabase";

export const fetchReports = async (setReports: any) => {
  const repo = new ReportsRepositoryDatabase();
  const reports = await repo.getReports();
  setReports(reports);
};
