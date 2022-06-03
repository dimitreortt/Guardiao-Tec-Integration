import { getDoc, doc } from "firebase/firestore";
import { db } from "./../../firebase/firebase";
import { store } from "../store/configureStore";
import {
  setUserCompanyId,
  setCompanyInfo,
} from "../store/features/company/companySlice";

export const getCompanyInfo = async (companyId: string) => {
  if (!companyId) return;
  const companyDoc = await getDoc(doc(db, "companies", companyId));
  const companyData = companyDoc.data();
  return companyData;
};

const dispatchCompanyInfo = async (companyId: string) => {
  const data = await getCompanyInfo(companyId);
  store.dispatch(setCompanyInfo(data));
};

export const getUserCompanyInfo = async (userId: string) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  const companyId = userDoc.data()?.companyId;
  store.dispatch(setUserCompanyId(companyId));
  dispatchCompanyInfo(companyId);
};
