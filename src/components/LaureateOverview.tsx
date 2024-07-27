import { useRef, useState } from 'react';
import { LoadingOverlay, Modal, TextInput } from '@mantine/core';
import { useGetLaureatesListQuery } from '../services';
import LaureatesTable from './laureatTable';
import { useDisclosure } from '@mantine/hooks';
import LaureateOverviewModal from './modals/LaureateOverviewModal';

const LaureateOverview = () => {
  const scrollRef = useRef(null);
  const [search, setSearch] = useState<string>('');
  const [selectedLaureate, setSelectedLaureate] = useState<number | null>(null);
  const { data, error, isLoading } = useGetLaureatesListQuery({ name: search, limit: 10 });
  const [opened, { open, close }] = useDisclosure(false);
  const handleCloseModal = () => {
    setSelectedLaureate(null);
    close();
  };

  if (error) return <div>Error loading data</div>;
  console.log('data?.laureates ===> ', data?.laureates);
  const handleRowClick = (id: number) => {
    setSelectedLaureate(id);
    open();
  };
  return (
    <div style={{ minHeight: '500px' }}>
      <TextInput
        placeholder="Search for a laureate"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <LaureatesTable
        handleRowClick={handleRowClick}
        laureates={data?.laureates || []}
        allDataLength={100}
        getNextData={() => console.log('nex data ===> ')}
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
