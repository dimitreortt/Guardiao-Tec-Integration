import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { User, UserValues } from "../../domain/entities/User";
import { db } from "../../firebase/firebase";
import { serverUrl } from "./serverUrl";

export class UserRepositoryDatabase {
  constructor() {}

  async createUser(email: string, password: string) {
    const body = {
      email,
      password,
    };

    const response = await fetch(serverUrl(), {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => res.json());

    if (response.error) {
      throw new Error(response.error);
    }

    return response;
  }

  async getUsers(setUsers?: any) {
    const colRef = collection(db, "users");
    onSnapshot(colRef, (querySnapshot) => {
      // const querySnapshot = await getDocs(colRef);
      let users: UserValues[] = [];
      querySnapshot.forEach((doc) => {
        const data: any = doc.data();
        data.Id = doc.id;
        users.push(data);
      });
      setUsers(users);
      // return users;
    });
  }

  async blockUser(user: UserValues) {
    const docRef = doc(db, `users/${user.Id}`);
    updateDoc(docRef, { blocked: true });
  }

  async unblockUser(user: UserValues) {
    const docRef = doc(db, `users/${user.Id}`);
    updateDoc(docRef, { blocked: false });
  }
}
