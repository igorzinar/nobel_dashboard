import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Modal, useMantineTheme, Button, Group } from '@mantine/core';
import { INobelPrize } from '../../../entities/prizes/types';
import { transformCategoryData } from '../../../helpers';
import { ICategoryData } from '../../../types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

interface IAwardsCategoryChartProps {
  prizes: INobelPrize[];
}

const AwardsCategoryChart: React.FC<IAwardsCategoryChartProps> = ({ prizes }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategoryData | null>(null);
  const theme = useMantineTheme();

  const data = transformCategoryData(prizes);

  const handleChartClick = useCallback((event: any) => {
    if (event && event.activePayload) {
      setSelectedCategory(event.activePayload[0].payload);
      setModalOpen(true);
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCategory(null);
    setModalOpen(false);
  }, []);

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
      <h3>Number of laureates by category:</h3>
      <Modal
        opened={modalOpen}
        onClose={handleCloseModal}
        title={`Awards in ${selectedCategory?.name}`}
      >
        <p>Number of awards: {selectedCategory?.value}</p>
        <Group position="center">
          <Button onClick={handleCloseModal}>Close</Button>
        </Group>
      </Modal>
    </div>
  );
};

export default AwardsCategoryChart;
