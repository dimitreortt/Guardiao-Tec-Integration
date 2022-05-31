export type UserValues = {
  accessType: "Editor" | "Admin";
  companyId: string;
  email: string;
  blocked: boolean;
  //   password: string;
  Id?: string;
};

export class User {
  constructor(readonly values: UserValues) {}
}
