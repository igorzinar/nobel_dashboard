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
import { Box, Modal } from '@mantine/core';
import AwardsDetailsModal from '../../modals/AwardsDetailsModal';
import { INobelPrize } from '../../../entities/prizes/types';
import { transformPrizeData } from '../../../helpers';
import { IAwardsByYear } from '../../../types';

interface IAdjustedAwardChartProps {
  color?: string;
  prizes: INobelPrize[];
}

const AdjustedAwardChart: React.FC<IAdjustedAwardChartProps> = ({ color = '#8884d8', prizes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAwards, setSelectedAwards] = useState<IAwardsByYear | null>(null);

  const data = transformPrizeData(prizes);

  const handleChartClick = (event: any) => {
    if (event && event.activePayload) {
      setSelectedAwards(event.activePayload[0].payload);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAwards(null);
  };

  return (
    <Box p="md">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} onClick={handleChartClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis type="number" tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke={color} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <Modal opened={modalOpen} onClose={handleCloseModal}>
        <AwardsDetailsModal awards={selectedAwards} />
      </Modal>
    </Box>
  );
};

export default AdjustedAwardChart;
