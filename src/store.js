import customerReducer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./features/accounts/accountSlice";
const store = configureStore({
  reducer: {
    customer: customerReducer,
    account: accountReducer,
  },
});
export default store;
