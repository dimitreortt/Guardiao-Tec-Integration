import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const deleteUserFromFirestore = async (userId: string) => {
  console.log("to aqui", userId);
  const docRef = doc(db, `users/${userId}`);
  await deleteDoc(docRef).then(() => {
    console.log("Delete user with id", userId);
  });
};
