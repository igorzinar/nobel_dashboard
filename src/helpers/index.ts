import { IAwardsByYear, ICategoryData, INobelPrizeLink } from '../types';
import { INobelPrize } from '../entities/prizes/types';

export const getExternalPrizeLink = (links: INobelPrizeLink[]): string => {
  if (!Array.isArray(links) || links.length === 0) {
    return '';
  }

  const externalLink = links.find(
    (link) => link?.rel?.includes('external') && link.class?.includes('prize summary')
  );
  return externalLink?.href || '';
};

export const transformPrizeData = (prizes: INobelPrize[]): IAwardsByYear[] => {
  const groupedData = prizes.reduce(
    (acc, prize) => {
      const year = parseInt(prize.awardYear, 10);
      const amount = prize.prizeAmountAdjusted;

      if (!acc[year]) {
        acc[year] = { year, amount: 0, items: [] };
      }
      acc[year].amount += amount;
      acc[year].items.push(prize);

      return acc;
    },
    {} as Record<number, IAwardsByYear>
  );

  return Object.values(groupedData);
};

export const transformCategoryData = (prizes: INobelPrize[]): ICategoryData[] => {
  const categoryCount = prizes.reduce(
    (acc, prize) => {
      const category = prize.category.en;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    },
    {} as Record<string, number>
  );

  return Object.keys(categoryCount).map((category) => ({
    name: category,
    value: categoryCount[category]
  }));
};
