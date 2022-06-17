import authReducer from "./features/auth/authSlice";
import driversReducer from "./features/drivers/driversSlice";
import companyReducer from "./features/company/companySlice";
import usersReducer from "./features/users/usersSlice";
import tmsReducer from "./features/tms/tmsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    drivers: driversReducer,
    companies: companyReducer,
    users: usersReducer,
    tms: tmsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
