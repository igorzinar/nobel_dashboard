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

// Define your prize data structure
interface Prize {
  awardYear: string;
  category: { en: string; no: string; se: string };
  categoryFullName: { en: string; no: string; se: string };
  dateAwarded: string;
  prizeAmount: number;
  prizeAmountAdjusted: number;
  links: {
    rel: string;
    href: string;
    action: string;
    types: string;
  }[];
  laureates: {
    id: string;
    knownName: {
      en: string;
    };
    fullName: {
      en: string;
    };
    portion: string;
    sortOrder: string;
    motivation: {
      en: string;
      se: string;
    };
    links: {
      rel: string;
      href: string;
      action: string;
      types: string;
    }[];
  }[];
}

const transformLaureateData = (prizes: Prize[]) => {
  return prizes.map((prize) => ({
    year: parseInt(prize?.awardYear, 10),
    laureatesCount: prize?.laureates?.length,
    category: prize?.category?.en,
    details: prize?.laureates?.map((laureate) => laureate?.knownName?.en).join(', ')
  }));
};

interface ILaureatesChartProps {
  color?: string;
  prizes: any;
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
          <Tooltip dataKey="category" />
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
