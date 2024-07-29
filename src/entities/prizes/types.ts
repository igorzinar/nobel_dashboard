import { ILinks, IMetaResponse, IMultilingual, INobelPrizeLink } from '../../types';

export interface IPrizesListQuery {
  offset?: number;
  limit?: number;
  nobelPrizeYear?: string | number;
  yearTo?: string | number;
}

export interface IPrizesListResponse {
  nobelPrizes: INobelPrize[];
  links?: ILinks;
  meta?: IMetaResponse;
}

export interface IPrizeByCategoryQuery {
  category: string;
  year: number;
}

export interface IPrizeLaureate {
  id: string;
  knownName: {
    en: string;
  };
  fullName: {
    en: string;
  };
  portion: string;
  sortOrder: string;
  motivation: IMultilingual;
  links: ILinks[];
}

export interface INobelPrize {
  awardYear: string;
  category: IMultilingual;
  categoryFullName: IMultilingual;
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: INobelPrizeLink[];
  laureates: IPrizeLaureate[];
}

export class IAwardsByYear {}
