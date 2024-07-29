import { Container, Title } from '@mantine/core';
import PrizeOverview from './PrizeOverview';
import LaureateOverview from './LaureateOverview';
import { useStyles } from './styles';

const MainLayout = () => {
  const { classes } = useStyles();
  return (
    <Container className={classes.layoutContainer}>
      <Title>Nobel Prize Dashboard</Title>
      <PrizeOverview />
      <LaureateOverview />
    </Container>
  );
};

export default MainLayout;
