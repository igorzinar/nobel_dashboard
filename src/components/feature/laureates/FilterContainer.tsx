import React from 'react';
import { useStyles } from './styles';
import { Box } from '@mantine/core';
import LaureatesSearchFilter from './LaureatesSearchFilter';

const FilterContainer = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.searchContainer}>
      <LaureatesSearchFilter searchField={'name'} />
      <LaureatesSearchFilter searchField={'residence'} />
    </Box>
  );
};

export default FilterContainer;
