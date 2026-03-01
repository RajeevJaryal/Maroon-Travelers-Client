import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./fetchDataSlice";
import bookingsReducer from "./bookingsSlice";
import userAuthReducer from "./userAuthSlice";
import categoriesReducer from "./categoriesSlice";
const store=configureStore({
    reducer:{
        listings:fetchDataReducer,
        bookings: bookingsReducer,
        userAuth: userAuthReducer,
        categories: categoriesReducer,
    },
});
export default store;