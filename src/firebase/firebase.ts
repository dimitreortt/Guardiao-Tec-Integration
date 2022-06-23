import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: criar função firebaseConfig que simplesmente retorna a sua config
import { firebaseConfig } from "./firebaseConfig";

export const app = initializeApp(firebaseConfig());
export const db = getFirestore(app);
export const storage = getStorage(app);
