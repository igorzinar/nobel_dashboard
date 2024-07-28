import { useEffect, useState } from 'react';
import { useGetPrizesQuery } from '../services';
import { Button, LoadingOverlay, Flex, NumberInput } from '@mantine/core';
import AdjustedAwardChart from './feature/prizes/AdjustedAwardChart';
import { useAppSelector } from '../hooks/redux/redux';
import { useActions } from '../hooks/redux/action';
import LaureatesChart from './feature/prizes/LaureatesChart';
import AwardsCategoryChart from './feature/prizes/AwardsCategoryChart';
import PrizesFilters from './feature/prizes/PrizesFilters';

const PrizeOverview = () => {
  const { setPrizes } = useActions();
  const { nobelPrizes, filters: prizeFilters } = useAppSelector((state) => state.nobelPrizes);
  const { data, error, isLoading, isFetching } = useGetPrizesQuery({
    offset: prizeFilters.offset,
    limit: prizeFilters.limit,
    nobelPrizeYear: prizeFilters?.nobelPrizeYear,
    yearTo: prizeFilters?.yearTo
  });

  useEffect(() => {
    if (data) {
      console.log('prizesData data ===> ', data);
      const prizesData =
        prizeFilters.offset > 0 ? [...nobelPrizes, ...data.nobelPrizes] : data?.nobelPrizes;
      setPrizes({ ...data, nobelPrizes: prizesData });
    }
  }, [data]);

  // if (error) return <div>Error loading data</div>;

  console.log('data ===> ', data);

  return (
    <div>
      <PrizesFilters />
      <AdjustedAwardChart prizes={nobelPrizes} />
      <LaureatesChart prizes={nobelPrizes} />
      <AwardsCategoryChart prizes={nobelPrizes} />
      <LoadingOverlay visible={isLoading} />
      <LoadingOverlay visible={isLoading || isFetching} />
    </div>
  );
};

export default PrizeOverview;
