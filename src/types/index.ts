import { ILaureateCommonInfo } from './laureateCommon';

export interface IPrizeItem {
  year?: string | number;
  category?: string;
  laureates?: ILaureate[];
}

export interface ILaureate {
  id?: string | number;
  firstname?: string;
  surname?: string;
  motivation?: string;
  share?: string;
}

export interface IPrizesListQuery {
  offset?: number;
  limit?: number;
  nobelPrizeYear?: number;
  yearTo?: number;
}

export interface IPrizeByCategoryQuery {
  category: string;
  year: number;
}

export interface ILaureateListQuery {
  offset?: number;
  limit?: number;
  name?: string;
  residence?: string;
}

export interface IMeta {
  offset?: number;
  limit?: number;
  residence?: string;
  count?: number;
  terms?: string;
  license?: string;
  disclaimer?: string;
}

export interface ILinks {
  first?: string;
  prev?: string;
  self?: string;
  next?: string;
  last?: string;
}

export interface ILaureateListResponse {
  laureates: ILaureateCommonInfo[];
  links?: ILinks;
  meta?: IMeta;
}
