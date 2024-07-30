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
import AwardsDetailsModal from '../../modals/AwardsDetailsModal';
import { IAwardsByYear } from '../../../types';
import { transformPrizeData } from '../../../helpers';

interface IAdjustedAwardChartProps {
  color?: string;
  prizes: INobelPrize[];
}

const AdjustedAwardChart: React.FC<IAdjustedAwardChartProps> = ({ color = '#8884d8', prizes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAwards, setSelectedAwards] = useState<IAwardsByYear | null>(null);

  const data = useMemo(() => transformPrizeData(prizes), [prizes]);

  const handleChartClick = useCallback((event: any) => {
    if (event && event.activePayload) {
      setSelectedAwards(event.activePayload[0].payload);
      setModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
    setSelectedAwards(null);
  }, []);

  return (
    <Box p="md">
      <h3>Adjusted Award Amount Over the Years</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} onClick={handleChartClick}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
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
