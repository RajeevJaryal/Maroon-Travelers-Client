import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./fetchDataSlice";
import bookingsReducer from "./bookingsSlice";
import userAuthReducer from "./userAuthSlice";
const store=configureStore({
    reducer:{
        listings:fetchDataReducer,
        bookings: bookingsReducer,
        userAuth: userAuthReducer,
    },
});
export default store;