import { useState } from 'react';
import { useGetPrizesQuery } from '../services';
import { Modal, Button, TextInput } from '@mantine/core';

const PrizeOverview = () => {
  const { data, error, isLoading } = useGetPrizesQuery({});
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [yearRange, setYearRange] = useState({ start: '', end: '' });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  console.log('data ===> ', data);
  // const handleYearClick = (year: number) => {
  //   setSelectedYear(year);
  // };
  //
  // // Filter data based on year range
  // const filteredData = data?.filter(
  //   (prize: any) => prize.year >= yearRange.start && prize.year <= yearRange.end
  // );

  return (
    <div>
      <TextInput
        placeholder="Start Year"
        value={yearRange.start}
        onChange={(e) => setYearRange({ ...yearRange, start: e.currentTarget.value })}
      />
      <TextInput
        placeholder="End Year"
        value={yearRange.end}
        onChange={(e) => setYearRange({ ...yearRange, end: e.currentTarget.value })}
      />
      <Button onClick={() => console.log('Filter applied')}>Apply Filter</Button>

      {/* Render your charts here based on filteredData */}
      {selectedYear && (
        <Modal opened={true} onClose={() => setSelectedYear(null)}>
          {/* Render prize details for the selected year */}
        </Modal>
      )}
    </div>
  );
};

export default PrizeOverview;
