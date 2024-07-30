import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { LoadingOverlay, Modal } from '@mantine/core';
import { useGetLaureatesListQuery } from '../services';
import LaureatesTable from './laureatTable';
import { useDisclosure } from '@mantine/hooks';
import LaureateOverviewModal from './modals/LaureateOverviewModal';
import { useActions } from '../hooks/redux/action';
import { useAppSelector } from '../hooks/redux/redux';
import FilterContainer from './feature/laureates/FilterContainer';

const LaureateOverview: React.FC = () => {
  const { setLaureates, setLaureatesFilters } = useActions();
  const { laureates, filters: laureateFilters, total } = useAppSelector((state) => state.laureates);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedLaureate, setSelectedLaureate] = useState<number | null>(null);

  const { data, error, isError, isLoading, isFetching } = useGetLaureatesListQuery({
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

  const handleRowClick = useCallback(
    (id: number) => {
      setSelectedLaureate(id);
      open();
    },
    [open]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedLaureate(null);
    close();
  }, [close]);

  const errorMessage = useMemo(() => {
    if (error) {
      return <div>Error loading data</div>;
    }
    return null;
  }, [error]);

  return (
    <div style={{ minHeight: '500px' }}>
      <h2>Laureates list</h2>
      {isError && error ? (
        errorMessage
      ) : (
        <>
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
        </>
      )}

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
