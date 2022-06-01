import { DriverRepositoryDatabase } from "../repository/DriverRepositoryDatabase";
import { store } from "./../../application/store/configureStore";

export const fetchDrivers = async (setDrivers: any, forceGetAll?: boolean) => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;
  const repo = new DriverRepositoryDatabase();

  if (isAdmin && adminSelectedCompanyId) {
    let shouldGetAll = adminSelectedCompanyId === "Todas";
    if (forceGetAll) shouldGetAll = true;

    if (shouldGetAll) {
      const drivers = await repo.adminGetAllDrivers();
      setDrivers(drivers);
    } else {
      const drivers = await repo.getDriversFromCompanyId(
        adminSelectedCompanyId!
      );
      setDrivers(drivers);
    }
  } else if (!isAdmin && userCompanyId) {
    const drivers = await repo.getDriversFromCompanyId(userCompanyId!);
    setDrivers(drivers);
  }
};
