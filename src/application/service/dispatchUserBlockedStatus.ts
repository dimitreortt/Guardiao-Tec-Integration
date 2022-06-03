import { getDoc, doc } from "firebase/firestore";
import { db } from "./../../firebase/firebase";
import { store } from "../store/configureStore";
import {
  setUserCompanyId,
  setCompanyInfo,
} from "../store/features/company/companySlice";
import { setUserBlockedStatus } from "../store/features/users/usersSlice";
import { UserValues } from "../../domain/entities/User";

export const dispatchUserBlockedStatus = (
  user: UserValues,
  isBlocked: boolean
) => {
  store.dispatch(setUserBlockedStatus({ user, isBlocked }));
};
// const dispatchCompanyInfo = async (companyId: string) => {
//   const data = await getCompanyInfo(companyId);
//   store.dispatch(setCompanyInfo(data));
// };
