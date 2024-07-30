import React, { useState, useMemo, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Modal, Box } from '@mantine/core';
import { INobelPrize } from '../../../entities/prizes/types';
import { ILaureatesByYear } from '../../../types';
import LaureatesYearDerailsModal from '../../modals/LaureatesYearDerailsModal';

const transformLaureateData = (prizes: INobelPrize[]): ILaureatesByYear[] => {
  return prizes.map((prize) => ({
    year: parseInt(prize?.awardYear, 10),
    laureatesCount: prize?.laureates?.length,
    categoryName: prize?.category?.en,
    laureates: prize.laureates
  }));
};

interface ILaureatesChartProps {
  color?: string;
  prizes: INobelPrize[];
}

const LaureatesChart: React.FC<ILaureatesChartProps> = ({ color = '#8884d8', prizes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaureatesByYear, setSelectedLaureatesByYear] = useState<ILaureatesByYear | null>(
    null
  );

  const data = useMemo(() => transformLaureateData(prizes), [prizes]);

  const handleChartClick = useCallback((event: any) => {
    if (event && event.activePayload) {
      setSelectedLaureatesByYear(event.activePayload[0].payload);
      setModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedLaureatesByYear(null);
    setModalOpen(false);
  }, []);

  return (
    <Box p="md">
      <h3>Number of laureates by year:</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} onClick={handleChartClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="laureatesCount" stroke={color} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <Modal opened={modalOpen} onClose={handleCloseModal}>
        <LaureatesYearDerailsModal data={selectedLaureatesByYear} />
      </Modal>
    </Box>
  );
};

export default LaureatesChart;
