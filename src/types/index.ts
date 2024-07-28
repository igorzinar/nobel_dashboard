export interface INobelPrizeLink {
  rel?: string;
  href?: string;
  action?: string;
  types?: string;
}

export interface IMetaResponse {
  offset?: number;
  limit?: number;
  residence?: string;
  count: number;
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

export interface IName {
  en?: string;
  se?: string;
}

export interface IBirthDeath {
  date?: string;
  place?: IPlace;
}

export interface IPlace {
  city?: IMultilingual;
  country?: IMultilingual;
  cityNow?: IMultilingualWithCoords;
  countryNow?: IMultilingualWithCoords;
  continent?: IMultilingual;
  locationString?: IMultilingual;
}

export interface IMultilingual {
  en: string;
  no?: string;
  se?: string;
}

export interface IMultilingualWithCoords extends IMultilingual {
  sameAs?: string[];
  latitude?: string;
  longitude?: string;
}

export interface IWikipedia {
  slug?: string;
  english?: string;
}

export interface IWikidata {
  id?: string;
  url?: string;
}

export interface INobelPrizeLink {
  rel?: string;
  href?: string;
  action?: string;
  types?: string;
  title?: string;
  class?: string[];
}

export interface IMultilingualNow {
  en?: string;
}
