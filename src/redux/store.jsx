import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "./card/cardSlice";

const store = configureStore({
    reducer: {
        card: cardReducer,
    },
});

export default store;