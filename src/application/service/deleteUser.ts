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

  console.log(response);

  if (!response.sucess) {
    throw new Error(response.msg);
  }

  if (response.sucess) {
  }
  await deleteUserFromFirestore(user.Id!);

  //   console.log("indo deletar");
  //   console.log(user);
};
