import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  INobelPrize,
  IPrizeByCategoryQuery,
  IPrizesListQuery,
  IPrizesListResponse
} from '../entities/prizes/types';
import {
  ILaureateCommonInfo,
  ILaureateListQuery,
  ILaureateListResponse
} from '../entities/laureates/types';

const BASE_URL = import.meta.env.VITE_NOBEL_URL;

export const nobelApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPrizes: builder.query<IPrizesListResponse, IPrizesListQuery>({
      query: (payload?: IPrizesListQuery) => ({
        params: {
          ...payload
        },
        url: 'nobelPrizes',
        method: 'GET'
      })
    }),
    getPrizeByCategory: builder.query<INobelPrize[], IPrizeByCategoryQuery>({
      query: (payload: IPrizeByCategoryQuery) => ({
        url: `nobelPrize/${payload.category}/${payload.year}`,
        method: 'GET'
      })
    }),
    getLaureatesList: builder.query<ILaureateListResponse, ILaureateListQuery>({
      query: (payload: ILaureateListQuery) => ({
        params: {
          ...payload
        },
        url: 'laureates',
        method: 'GET'
      })
    }),
    getLaureateInfoById: builder.query<ILaureateCommonInfo, number>({
      query: (payload: number) => ({
        url: `laureate/${payload}`,
        method: 'GET'
      }),
      transformResponse: (response: ILaureateCommonInfo[]) => ({
        ...response[0]
      })
    })
  })
});

export const {
  useGetPrizesQuery,
  useGetLaureateInfoByIdQuery,
  useGetLaureatesListQuery,
  useGetPrizeByCategoryQuery
} = nobelApi;
