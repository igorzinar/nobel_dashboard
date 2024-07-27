import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ILaureateListQuery,
  ILaureateListResponse,
  IPrizeByCategoryQuery,
  IPrizeItem,
  IPrizesListQuery
} from '../types';
import { ILaureateCommonInfo } from '../types/laureateCommon';

const BASE_URL = 'https://api.nobelprize.org/2.1/';

export const nobelApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPrizes: builder.query<IPrizeItem[] | undefined, IPrizesListQuery | undefined>({
      query: (payload?: IPrizesListQuery) => ({
        params: {
          ...payload
        },
        url: 'nobelPrizes',
        method: 'GET'
      })
    }),
    getPrizeByCategory: builder.query<IPrizeItem[], IPrizeByCategoryQuery>({
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
