import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Modal, useMantineTheme, Button, Group } from '@mantine/core';
import { INobelPrize } from '../../../entities/prizes/types';

const transformCategoryData = (prizes: INobelPrize[]) => {
  const categoryCount = prizes.reduce((acc, prize) => {
    const category = prize.category.en;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category]++;
    return acc;
  }, {});

  return Object.keys(categoryCount).map((category) => ({
    name: category,
    value: categoryCount[category]
  }));
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];
interface IAwardsCategoryChartProps {
  prizes: INobelPrize[];
}
const AwardsCategoryChart = ({ prizes }: IAwardsCategoryChartProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const theme = useMantineTheme();

  const data = transformCategoryData(prizes);

  const handleChartClick = (data) => {
    if (data && data.activePayload) {
      setSelectedCategory(data.activePayload[0].payload);
      setModalOpen(true);
    }
  };

  return (
    <div>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart onClick={handleChartClick}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill={theme.colors.blue[6]}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`Awards in ${selectedCategory?.name}`}
      >
        <p>Number of awards: {selectedCategory?.value}</p>
        <Group position="center">
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default AwardsCategoryChart;
