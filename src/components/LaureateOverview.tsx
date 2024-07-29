import { useEffect, useRef, useState } from 'react';
import { LoadingOverlay, Modal, Text } from '@mantine/core';
import { useGetLaureatesListQuery } from '../services';
import LaureatesTable from './laureatTable';
import { useDisclosure } from '@mantine/hooks';
import LaureateOverviewModal from './modals/LaureateOverviewModal';
import { useActions } from '../hooks/redux/action';
import { useAppSelector } from '../hooks/redux/redux';
import FilterContainer from './feature/laureates/FilterContainer';

const LaureateOverview = () => {
  const { setLaureates, setLaureatesFilters } = useActions();
  const { laureates, filters: laureateFilters, total } = useAppSelector((state) => state.laureates);

  const scrollRef = useRef<any>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const handleCloseModal = () => {
    setSelectedLaureate(null);
    close();
  };
  const [selectedLaureate, setSelectedLaureate] = useState<number | null>(null);
  const { data, error, isLoading, isFetching } = useGetLaureatesListQuery({
    offset: laureateFilters.offset,
    name: laureateFilters.name,
    limit: laureateFilters.limit,
    residence: laureateFilters.residence
  });

  useEffect(() => {
    if (data) {
      const laureatesData =
        laureateFilters.offset > 0 ? [...laureates, ...data.laureates] : data?.laureates;
      setLaureates({ ...data, laureates: laureatesData });
    }
  }, [data]);

  const handleLoadMore = () => {
    setLaureatesFilters({
      ...laureateFilters,
      offset: laureateFilters.offset + 20
    });
  };

  const handleRowClick = (id: number) => {
    setSelectedLaureate(id);
    open();
  };

  if (error) return <div>Error loading data</div>;
  return (
    <div style={{ minHeight: '500px' }}>
      <h2>Laureates list</h2>
      <FilterContainer />
      <LaureatesTable
        isLoading={isLoading}
        isFetching={isFetching}
        handleRowClick={handleRowClick}
        laureates={laureates}
        allDataLength={total}
        getNextData={handleLoadMore}
        scrollRef={scrollRef}
      />
      {selectedLaureate && (
        <Modal trapFocus={false} size="600px" h={400} opened={opened} onClose={handleCloseModal}>
          <LaureateOverviewModal laureateId={selectedLaureate} />
        </Modal>
      )}
      <LoadingOverlay visible={isLoading} />
    </div>
  );
};

export default LaureateOverview;
