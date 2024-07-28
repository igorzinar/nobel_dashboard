import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPrizeItem, IPrizesListResponse } from '../../types';

interface INobelPrizesFilter {
  limit: number;
  offset: number;
  nobelPrizeYear?: string | number;
  yearTo?: string | number;
}

interface INobelPrizes {
  nobelPrizes: IPrizeItem[];
  total: number;
  filters: INobelPrizesFilter;
}

const initialState: INobelPrizes = {
  nobelPrizes: [],
  total: 0,
  filters: {
    limit: 1000,
    offset: 0,
    nobelPrizeYear: '',
    yearTo: ''
  }
};

export const nobelPrizesSlice = createSlice({
  name: 'nobelPrizes',
  initialState,
  reducers: {
    setPrizes(state, action: PayloadAction<IPrizesListResponse>) {
      state.nobelPrizes = action.payload.nobelPrizes;
      state.total = action.payload.meta?.count || 0;
    },
    setNobelPrizesFilters(state, action: PayloadAction<INobelPrizesFilter>) {
      state.filters = action.payload;
    }
  }
});

export const nobelPrizesActions = nobelPrizesSlice.actions;
export const nobelPrizesReducer = nobelPrizesSlice.reducer;
