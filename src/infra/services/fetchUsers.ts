import { setUsers } from "../../application/store/features/users/usersSlice";
import { DriverRepositoryDatabase } from "../repository/DriverRepositoryDatabase";
import { UserRepositoryDatabase } from "../repository/UserRepositoryDatabase";
import { store } from "./../../application/store/configureStore";

export const fetchUsers = async () => {
  const { user, isAdmin } = store.getState().auth;
  const users = store.getState().users.users;
  const repo = new UserRepositoryDatabase();

  if (isAdmin && !users) {
    const response = await repo.getUsers();
    store.dispatch(setUsers(response));
  } else {
    throw new Error("non-admin user trying to fetch users!");
  }
};
