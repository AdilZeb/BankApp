import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    CreateCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload?.fullName;
        state.nationalId = action.payload?.nationalId;
        state.createdAt = action.payload?.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload?.fullName,
//         nationalId: action.payload?.nationalId,
//         createdAt: action.payload?.createdAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// export function CreateCustomer(fullName = "Adil", nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() },
//   };
// }

// export function updateName(fullName = "Adil") {
//   return { type: "account/updateName", payload: fullName };
// }

export const { CreateCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
