import { INobelPrizeLink } from '../types/laureateCommon';

export const getExternalPrizeLink = (links: INobelPrizeLink[]): string => {
  if (!Array.isArray(links) || links.length === 0) {
    return '';
  }

  const externalLink = links.find(
    (link) => link?.rel?.includes('external') && link.class?.includes('prize summary')
  );
  return externalLink?.href || '';
};
