import { store } from "../configureStore";

export const selectCurrentSelectedLTU = () => {
  return store.getState().companies.selectedLTU;
};
