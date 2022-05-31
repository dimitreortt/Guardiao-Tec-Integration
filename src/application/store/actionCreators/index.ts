import { authActions } from "./../features/auth/authSlice";
import { companyActions } from "./../features/company/companySlice";
import { driversActions } from "./../features/drivers/driversSlice";
import { usersActions } from "./../features/users/usersSlice";

export const actionCreators = {
  ...authActions,
  ...companyActions,
  ...driversActions,
  ...usersActions,
};
