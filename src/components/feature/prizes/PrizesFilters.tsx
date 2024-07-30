import React, { useState, useCallback } from 'react';
import { Button, Flex, NumberInput } from '@mantine/core';
import { useActions } from '../../../hooks/redux/action';
import { useAppSelector } from '../../../hooks/redux/redux';

const PrizesFilters = () => {
  const { setNobelPrizesFilters } = useActions();
  const { filters: prizeFilters } = useAppSelector((state) => state.nobelPrizes);

  const [yearRange, setYearRange] = useState<{ start: number | ''; end: number | '' }>({
    start: '',
    end: ''
  });

  const handlePrizeFilterChange = useCallback(() => {
    setNobelPrizesFilters({
      ...prizeFilters,
      nobelPrizeYear: yearRange.start || 0,
      yearTo: yearRange.end || 0
    });
  }, [setNobelPrizesFilters, prizeFilters, yearRange]);

  const handleStartYearChange = useCallback((value: number | '') => {
    setYearRange((prevRange) => ({ ...prevRange, start: value }));
  }, []);

  const handleEndYearChange = useCallback((value: number | '') => {
    setYearRange((prevRange) => ({ ...prevRange, end: value }));
  }, []);

  return (
    <Flex align="center" justify="center" m="sm">
      <NumberInput
        placeholder="Start Year"
        value={yearRange.start}
        hideControls
        min={1901}
        max={2024}
        onChange={handleStartYearChange}
      />
      <NumberInput
        placeholder="End Year"
        hideControls
        mx="xs"
        value={yearRange.end}
        min={1901}
        max={2024}
        onChange={handleEndYearChange}
      />
      <Button onClick={handlePrizeFilterChange}>Apply Filter</Button>
    </Flex>
  );
};

export default PrizesFilters;
