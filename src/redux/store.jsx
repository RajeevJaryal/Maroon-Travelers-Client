import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "./fetchDataSlice";
const store=configureStore({
    reducer:{
        listings:fetchDataReducer,
    },
});
export default store;