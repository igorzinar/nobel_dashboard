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
import { a } from 'vite/dist/node/types.d-aGj9QkWt';

// Define your prize data structure
interface IPrize {
  awardYear: string;
  category: { en: string; no: string; se: string };
  categoryFullName: { en: string; no: string; se: string };
  dateAwarded: string;
  laureates: any[];
  links: any[];
  prizeAmount: number;
  prizeAmountAdjusted: number;
}

// Sample prize data
// const prizes: Prize[] = [
//   {
//     awardYear: '1901',
//     category: { en: 'Chemistry', no: 'Kjemi', se: 'Kemi' },
//     categoryFullName: {
//       en: 'The Nobel Prize in Chemistry',
//       no: 'Nobelprisen i kjemi',
//       se: 'Nobelpriset i kemi'
//     },
//     dateAwarded: '1901-11-12',
//     laureates: [],
//     links: [],
//     prizeAmount: 150782,
//     prizeAmountAdjusted: 10531894
//   },
//   {
//     awardYear: '1902',
//     category: { en: 'Physics', no: 'Fysikk', se: 'Fysik' },
//     categoryFullName: {
//       en: 'The Nobel Prize in Physics',
//       no: 'Nobelprisen i fysikk',
//       se: 'Nobelpriset i fysik'
//     },
//     dateAwarded: '1902-11-12',
//     laureates: [],
//     links: [],
//     prizeAmount: 150782,
//     prizeAmountAdjusted: 10531894
//   }
//   // Add more prize objects as needed
// ];

// Transform prize data
const transformPrizeData = (prizes: IPrize[]) => {
  return prizes.map((prize) => ({
    year: parseInt(prize.awardYear, 10),
    amount: prize.prizeAmountAdjusted,
    details: `Category: ${prize.category.en}, Awarded: ${prize.dateAwarded}`
  }));
};

interface IAdjustedAwardChartProps {
  color?: string;
  prizes: any;
}

const AdjustedAwardChart = ({ color = '#8884d8', prizes }: IAdjustedAwardChartProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<any | null>(null);

  const data = transformPrizeData(prizes);

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      setSelectedPrize(data.activePayload[0].payload);
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
