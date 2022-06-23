import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "./../../firebase/firebase";

export type CompanyAccessType = "Administrador" | "Editor";

export const createFirestoreUser = async (
  userId: string,
  companyId: string,
  password: string,
  accessType: CompanyAccessType,
  email: string
) => {
  try {
    const docRef = doc(db, "users", userId);
    const data = { companyId, accessType, password, blocked: false, email };
    const response = await setDoc(docRef, data);
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error("Não foi possível criar usuário (firestore)");
  }
};
