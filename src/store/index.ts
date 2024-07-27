import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { nobelApi } from '../services';
import { laureatesReducer } from '../entities/laureates/slice';
import { nobelPrizesReducer } from '../entities/prizes/slice';

export const store = configureStore({
  reducer: {
    laureates: laureatesReducer,
    nobelPrizes: nobelPrizesReducer,
    [nobelApi.reducerPath]: nobelApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nobelApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
