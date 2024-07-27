import React from 'react';
import { Flex, Text } from '@mantine/core';
interface IPrizeDescriptionItemProps {
  description: string | React.ReactNode;
  value: string | React.ReactNode;
}
const PrizeDescriptionItem = ({ description, value }: IPrizeDescriptionItemProps) => {
  return (
    <Flex>
      <Text fz="sm" c="dimmed" mt="sm">
        {`${description}:`}
      </Text>
      <Text fz="sm" mt="sm" ml="xs">
        {value || ''}
      </Text>
    </Flex>
  );
};

export default PrizeDescriptionItem;
