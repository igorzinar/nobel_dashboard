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
import { Modal, Button, Group } from '@mantine/core';
import { INobelPrize } from '../../../entities/prizes/types';

const transformLaureateData = (prizes: INobelPrize[]) => {
  return prizes.map((prize) => ({
    year: parseInt(prize?.awardYear, 10),
    laureatesCount: prize?.laureates?.length,
    category: prize?.category?.en,
    details: prize?.laureates?.map((laureate) => laureate?.knownName?.en).join(', ')
  }));
};

interface ILaureatesChartProps {
  color?: string;
  prizes: INobelPrize[];
}

const LaureatesChart = ({ color = '#8884d8', prizes }: ILaureatesChartProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<any | null>(null);

  const data = transformLaureateData(prizes);

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      setSelectedYear(data.activePayload[0].payload);
      setModalOpen(true);
    }
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

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Laureate Details for ${selectedYear?.year}`}
      >
        <p>{selectedYear?.details}</p>
        <Group position="center">
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default LaureatesChart;
