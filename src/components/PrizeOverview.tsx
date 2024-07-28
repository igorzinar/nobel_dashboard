import { useEffect, useState } from 'react';
import { useGetPrizesQuery } from '../services';
import { Modal, Button, LoadingOverlay, Flex, NumberInput } from '@mantine/core';
import { YearPickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import AdjustedAwardChart from './feature/prizes/AdjustedAwardChart';
import { useAppSelector } from '../hooks/redux/redux';
import { useActions } from '../hooks/redux/action';
import LaureatesChart from './feature/prizes/LaureatesChart';
import AwardsCategoryChart from './feature/prizes/AwardsCategoryChart';

const PrizeOverview = () => {
  const { setPrizes, setNobelPrizesFilters } = useActions();
  const { nobelPrizes, filters: prizeFilters } = useAppSelector((state) => state.nobelPrizes);
  const { data, error, isLoading } = useGetPrizesQuery({
    offset: prizeFilters.offset,
    limit: prizeFilters.limit,
    nobelPrizeYear: prizeFilters?.nobelPrizeYear,
    yearTo: prizeFilters?.yearTo
  });
  const [yearRange, setYearRange] = useState<{
    start: number | '';
    end: number | '';
  }>({ start: '', end: '' });
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);

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
  console.log('value ===> ', value);

  // const handleYearClick = (year: number) => {
  //   setSelectedYear(year);
  // };
  //
  // // Filter data based on year range
  // const filteredData = data?.filter(
  //   (prize: any) => prize.year >= yearRange.start && prize.year <= yearRange.end
  // );

  // const handlePrizeFilterChange = () => {
  //   setLaureatesFilters({
  //     ...laureateFilters,
  //     offset: laureateFilters.offset + 20
  //   });
  // };

  useEffect(() => {
    setNobelPrizesFilters({
      ...prizeFilters,
      nobelPrizeYear: yearRange.start || 0,
      yearTo: yearRange.end || 0
    });
  }, [yearRange]);

  return (
    <div>
      <Flex>
        <NumberInput
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
          value={yearRange.end}
          max={2024}
          min={1901}
          onChange={(value) => setYearRange({ ...yearRange, end: value })}
        />
        <Button onClick={() => console.log('Filter applied')}>Apply Filter</Button>
      </Flex>

      {/*<YearPickerInput*/}
      {/*  type="range"*/}
      {/*  icon={<IconCalendar size="1.1rem" stroke={1.5} />}*/}
      {/*  label="Pick date"*/}
      {/*  value={value}*/}
      {/*  onChange={setValue}*/}
      {/*  minDate={new Date(1901, 1)}*/}
      {/*  maxDate={new Date(2024, 1)}*/}
      {/*/>*/}
      <AdjustedAwardChart prizes={nobelPrizes} />
      <LaureatesChart prizes={nobelPrizes} />
      <AwardsCategoryChart prizes={nobelPrizes} />
      <LoadingOverlay visible={isLoading} />
    </div>
  );
};

export default PrizeOverview;
