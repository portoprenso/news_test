import { userSlice } from "./AuthSlice";
import { newsSlice } from "./NewsSlice";
import { configureStore } from '@reduxjs/toolkit';
import { sportMonks } from "./FootballSlice";

export const rootStore = configureStore({
  reducer: {news: newsSlice.reducer, user: userSlice.reducer, sportMonks: sportMonks.reducer},
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware()
})
