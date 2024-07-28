import React, { useState } from 'react';
import { Button, Flex, NumberInput } from '@mantine/core';
import { useActions } from '../../../hooks/redux/action';
import { useAppSelector } from '../../../hooks/redux/redux';

const PrizesFilters = () => {
  const { setNobelPrizesFilters } = useActions();
  const { filters: prizeFilters } = useAppSelector((state) => state.nobelPrizes);

  const [yearRange, setYearRange] = useState<{
    start: number | '';
    end: number | '';
  }>({ start: '', end: '' });

  const handlePrizeFilterChange = () => {
    setNobelPrizesFilters({
      ...prizeFilters,
      nobelPrizeYear: yearRange.start || 0,
      yearTo: yearRange.end || 0
    });
  };

  return (
    <Flex align="center" justify="flex-start" m="md">
      <NumberInput
        // p="md"
        placeholder="Start Year"
        value={yearRange.start}
        hideControls
        min={1901}
        max={2024}
        onChange={(value) => setYearRange({ ...yearRange, start: value })}
      />
      <NumberInput
        placeholder="End Year"
        hideControls
        // p="md"
        mx="sm"
        value={yearRange.end}
        max={2024}
        min={1901}
        onChange={(value) => setYearRange({ ...yearRange, end: value })}
      />
      <Button onClick={handlePrizeFilterChange}>Apply Filter</Button>
    </Flex>
  );
};

export default PrizesFilters;
