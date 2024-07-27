export interface ILaureateCommonInfo {
  id?: string;
  knownName?: Name;
  givenName?: Name;
  familyName?: Name;
  fullName?: Name;
  fileName?: string;
  gender?: string;
  birth?: BirthDeath;
  death?: BirthDeath;
  wikipedia?: Wikipedia;
  wikidata?: Wikidata;
  sameAs?: string[];
  links?: INobelPrizeLink[];
  nobelPrizes?: NobelPrize[];
  meta?: Meta;
}

interface Name {
  en?: string;
  se?: string;
}

interface BirthDeath {
  date?: string;
  place?: Place;
}

interface Place {
  city?: Multilingual;
  country?: Multilingual;
  cityNow?: MultilingualWithCoords;
  countryNow?: MultilingualWithCoords;
  continent?: Multilingual;
  locationString?: Multilingual;
}

interface Multilingual {
  en?: string;
  no?: string;
  se?: string;
}

interface MultilingualWithCoords extends Multilingual {
  sameAs?: string[];
  latitude?: string;
  longitude?: string;
}

interface Wikipedia {
  slug?: string;
  english?: string;
}

interface Wikidata {
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

interface NobelPrize {
  awardYear?: string;
  category?: Multilingual;
  categoryFullName?: Multilingual;
  sortOrder?: string;
  portion?: string;
  dateAwarded?: string;
  prizeStatus?: string;
  motivation?: Multilingual;
  prizeAmount?: number;
  prizeAmountAdjusted?: number;
  affiliations?: Affiliation[];
  links?: INobelPrizeLink[];
}

interface Affiliation {
  name?: Multilingual;
  nameNow?: MultilingualNow;
  city?: Multilingual;
  country?: Multilingual;
  cityNow?: MultilingualWithCoords;
  countryNow?: MultilingualWithCoords;
  continent?: Multilingual;
  locationString?: Multilingual;
}

interface MultilingualNow {
  en?: string;
}

interface Meta {
  terms?: string;
  license?: string;
  disclaimer?: string;
}
