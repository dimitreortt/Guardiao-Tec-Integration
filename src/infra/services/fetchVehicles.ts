import { store } from "./../../application/store/configureStore";
import { VehicleRepositoryDatabase } from "../repository/VehicleRepositoryDatabase";

export const fetchVehicles = async (
  setVehicles: any,
  forceGetAll?: boolean
) => {
  const { user, isAdmin } = store.getState().auth;
  const { adminSelectedCompanyId, userCompanyId } = store.getState().companies;
  const repo = new VehicleRepositoryDatabase();

  if (forceGetAll) {
    const vehicles = await repo.adminGetAllVehicles();
    setVehicles(vehicles);
    return;
  }

  if (isAdmin && adminSelectedCompanyId) {
    let shouldGetAll = adminSelectedCompanyId === "Todas";

    if (shouldGetAll) {
      const vehicles = await repo.adminGetAllVehicles();
      setVehicles(vehicles);
    } else {
      const vehicles = await repo.getVehiclesFromCompanyId(
        adminSelectedCompanyId!
      );
      setVehicles(vehicles);
    }
  } else if (!isAdmin && userCompanyId) {
    const vehicles = await repo.getVehiclesFromCompanyId(userCompanyId!);
    setVehicles(vehicles);
  }
};
