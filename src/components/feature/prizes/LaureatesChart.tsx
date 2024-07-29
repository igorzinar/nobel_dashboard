import React, { useState } from 'react';
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
import { Modal } from '@mantine/core';
import { INobelPrize } from '../../../entities/prizes/types';
import LaureatesYearDerailsModal from '../../modals/LaureatesYearDerailsModal';
import { ILaureatesByYear } from '../../../types';

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

const LaureatesChart = ({ color = '#8884d8', prizes }: ILaureatesChartProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLaureatesByYear, setSelectedLaureatesByYear] = useState<ILaureatesByYear | null>(
    null
  );

  const data = transformLaureateData(prizes);

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      setSelectedLaureatesByYear(data.activePayload[0].payload);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedLaureatesByYear(null);
    setModalOpen(false);
  };

  return (
    <div>
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
    </div>
  );
};

export default LaureatesChart;
