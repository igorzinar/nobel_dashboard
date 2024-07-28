import {
  IBirthDeath,
  ILinks,
  IMetaResponse,
  IMultilingual,
  IMultilingualNow,
  IMultilingualWithCoords,
  IName,
  INobelPrizeLink,
  IWikidata,
  IWikipedia
} from '../../types';

export interface ILaureateListQuery {
  offset?: number;
  limit?: number;
  name?: string;
  residence?: string;
}

export interface ILaureateListResponse {
  laureates: ILaureateCommonInfo[];
  links?: ILinks;
  meta: IMetaResponse;
}

export interface IAffiliation {
  name?: IMultilingual;
  nameNow?: IMultilingualNow;
  city?: IMultilingual;
  country?: IMultilingual;
  cityNow?: IMultilingualWithCoords;
  countryNow?: IMultilingualWithCoords;
  continent?: IMultilingual;
  locationString?: IMultilingual;
}

interface ILaureatePrize {
  awardYear?: string;
  category?: IMultilingual;
  categoryFullName?: IMultilingual;
  sortOrder?: string;
  portion?: string;
  dateAwarded?: string;
  prizeStatus?: string;
  motivation?: IMultilingual;
  prizeAmount?: number;
  prizeAmountAdjusted?: number;
  affiliations?: IAffiliation[];
  links?: INobelPrizeLink[];
}

export interface ILaureateCommonInfo {
  id?: string;
  knownName?: IName;
  givenName?: IName;
  familyName?: IName;
  fullName?: IName;
  fileName?: string;
  gender?: string;
  birth?: IBirthDeath;
  death?: IBirthDeath;
  wikipedia?: IWikipedia;
  wikidata?: IWikidata;
  sameAs?: string[];
  links?: INobelPrizeLink[];
  nobelPrizes?: ILaureatePrize[];
  meta?: IMetaResponse;
}
