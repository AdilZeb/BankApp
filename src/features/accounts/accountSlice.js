import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  loading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposite(state, action) {
      state.balance = state.balance + action.payload;
      state.loading = false;
    },

    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.loading = true;
    },
  },
});
console.log(accountSlice);
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/currencyFetching" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    console.log(data);
    const Converted = data.rates.USD;
    dispatch({ type: "account/deposite", payload: Converted });
  };
}
export default accountSlice.reducer;
// export default function accountReducer(state = initialStateaccount, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         loading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;

//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/currencyFetching":
//       return { ...state, loading: true };
//     default:
//       return state;
//   }
// }

// export function deposite(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: "account/currencyFetching" });
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     console.log(data);
//     const Converted = data.rates.USD;
//     dispatch({ type: "account/deposit", payload: Converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: {
//       amount: amount,
//       purpose: purpose,
//     },
//   };
// }

// export function payLoan() {
//   return { type: "account/payLoan" };
// }
