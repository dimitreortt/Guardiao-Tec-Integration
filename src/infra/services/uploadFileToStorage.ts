import { ref, uploadBytes } from "firebase/storage";
import uuid from "react-uuid";
import { storage } from "../../firebase/firebase";
import { makeid } from "./makeId";

export const uploadFileToStorage = async (companyId: string, file: File) => {
  const name = file.name.split(".");
  const ext = name[name.length - 1];
  const storagePath = `/${companyId}/${makeid(8) + "." + ext}`;
  const storageRef = ref(storage, storagePath);

  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });

  return { storagePath };
};
