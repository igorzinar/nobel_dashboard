import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILaureateCommonInfo } from '../../types/laureateCommon';
import { ILaureateListResponse } from '../../types';

interface ILaureateFilter {
  limit: number;
  offset: number;
  name: string;
  residence: string;
}

interface ILaureates {
  laureates: ILaureateCommonInfo[];
  total: number;
  filters: ILaureateFilter;
}

const initialState: ILaureates = {
  laureates: [],
  total: 0,
  filters: {
    limit: 20,
    offset: 0,
    name: '',
    residence: ''
  }
};

export const laureatesSlice = createSlice({
  name: 'laureates',
  initialState,
  reducers: {
    setLaureates(state, action: PayloadAction<ILaureateListResponse>) {
      state.laureates = action.payload.laureates;
      state.total = action.payload.meta?.count;
    },
    setLaureatesFilters(state, action: PayloadAction<ILaureateFilter>) {
      state.filters = action.payload;
    }
  }
});

export const laureatesActions = laureatesSlice.actions;
export const laureatesReducer = laureatesSlice.reducer;
