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

interface ITransformedPrize extends INobelPrize {
  year: number;
  amount: number;
  details: string;
}

const transformPrizeData = (prizes: INobelPrize[]) => {
  return prizes.map((prize) => ({
    ...prize,
    year: parseInt(prize.awardYear, 10),
    amount: prize.prizeAmountAdjusted,
    details: `Category: ${prize.category.en}, Awarded: ${prize.dateAwarded}`
  }));
};

interface IAdjustedAwardChartProps {
  color?: string;
  prizes: INobelPrize[];
}

const AdjustedAwardChart = ({ color = '#8884d8', prizes }: IAdjustedAwardChartProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<ITransformedPrize | null>(null);

  const data = transformPrizeData(prizes);

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      setSelectedPrize(data.activePayload[0].payload);
      setModalOpen(true);
    }
  };

  console.log('data 0  ---> ', data);

  return (
    <div>
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

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Prize Details for ${selectedPrize?.year}`}
      >
        <p>{selectedPrize?.details}</p>
        <Group position="center">
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default AdjustedAwardChart;
