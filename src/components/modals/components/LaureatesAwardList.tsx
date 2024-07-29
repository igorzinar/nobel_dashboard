import React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Collapse, Flex } from '@mantine/core';
import { IPrizeLaureate } from '../../../entities/prizes/types';
import PrizeDescriptionItem from './PrizeDescriptionItem';

interface ILaureatesAwardList {
  laureate: IPrizeLaureate;
}
const LaureatesAwardList = ({ laureate }: ILaureatesAwardList) => {
  const [opened] = useDisclosure(false);
  return (
    <Collapse in={opened} title={laureate?.fullName.en}>
      <Flex direction="column">
        <PrizeDescriptionItem description={'Laureate name'} value={laureate?.fullName.en} />
      </Flex>
    </Collapse>
  );
};

export default LaureatesAwardList;
