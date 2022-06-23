import { getDownloadURL, getStorage, ref } from "firebase/storage";

export const getDownloadUrl = async (path: string) => {
  const storage = getStorage();
  const pathRef = ref(storage, path);
  return getDownloadURL(pathRef);
};
