import { UserValues } from "../../domain/entities/User";
import { deleteUserFromFirestore } from "../../infra/services/deleteUserFromFirestore";

export const deleteUser = async (user: UserValues) => {
  const body = {
    userId: user.Id,
  };

  console.log(user);

  const response = await fetch(
    "http://localhost:5001/guardiaotec-tms/us-central1/deleteUser",
    {
      method: "POST",
      body: JSON.stringify(body),
    }
  ).then((res) => res.json());

  if (!response.success) {
    throw new Error(response.msg);
  }

  await deleteUserFromFirestore(user.Id!);
};
