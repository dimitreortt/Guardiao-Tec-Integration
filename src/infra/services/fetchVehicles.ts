import { store } from "./../../application/store/configureStore";
import { VehicleRepositoryDatabase } from "../repository/VehicleRepositoryDatabase";
import { selectCurrentRelatedCompanyId } from "./selectCurrentRelatedCompanyId";

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

  const companyId = selectCurrentRelatedCompanyId();
  // Is admin and 'Todas' is selected
  if (!companyId) {
    const vehicles = await repo.adminGetAllVehicles();
    setVehicles(vehicles);
  } else {
    const vehicles = await repo.getVehiclesFromCompanyId(companyId);
    setVehicles(vehicles);
  }

  // if (isAdmin && adminSelectedCompanyId) {
  //   let shouldGetAll = adminSelectedCompanyId === "Todas";

  //   if (shouldGetAll) {
  //     const vehicles = await repo.adminGetAllVehicles();
  //     setVehicles(vehicles);
  //   } else {
  //     const vehicles = await repo.getVehiclesFromCompanyId(
  //       adminSelectedCompanyId!
  //     );
  //     setVehicles(vehicles);
  //   }
  // } else if (!isAdmin && userCompanyId) {
  //   const vehicles = await repo.getVehiclesFromCompanyId(userCompanyId!);
  //   setVehicles(vehicles);
  // }
};
