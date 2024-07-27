import { Container, Grid, Title } from '@mantine/core';
import PrizeOverview from './PrizeOverview';
import LaureateOverview from './LaureateOverview';

const MainLayout = () => {
  return (
    <Container>
      <Title order={1}>Nobel Prize Dashboard</Title>

      <PrizeOverview />

      <LaureateOverview />
    </Container>
  );
};

export default MainLayout;
