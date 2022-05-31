import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserValues } from "../../../../domain/entities/User";

export interface UsersState {
  users: UserValues[] | undefined;
}

const initialState: UsersState = {
  users: undefined,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserValues[]>) => {
      const users = action.payload;
      state.users = users;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { setUserId } = counterSlice.actions;
export const usersActions = usersSlice.actions;
export const { setUsers } = usersActions;
export type SetusersType = typeof setUsers;
export default usersSlice.reducer;
