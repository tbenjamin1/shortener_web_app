import {configureStore} from "@reduxjs/toolkit";
import ShortenUlrsSlice from "./ShortenUrls/ShortenUlrsSlice";


export const store = configureStore({
    reducer:{ shortenUrl:ShortenUlrsSlice},
})