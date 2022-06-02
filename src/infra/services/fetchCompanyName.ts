import { CompanyRepositoryDatabase } from "../repository/CompanyRepositoryDatabase";

export const fetchCompanyName = async (transpId: string) => {
  const repo = new CompanyRepositoryDatabase();
  const company = await repo.getCompanyFromId(transpId);
  return company.values.Transportadora;
};
