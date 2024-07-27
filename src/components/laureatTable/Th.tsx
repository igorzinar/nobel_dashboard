import { FC } from 'react';
import { Group, Text } from '@mantine/core';

interface IThProps {
  children: React.ReactNode;
  width?: string;
}

export const Th: FC<IThProps> = ({ children, width = 'auto' }) => {
  return (
    <th style={{ width, maxWidth: 600 }}>
      {children ? (
        <Group position="apart">
          <Text weight={400} size="sm" color="gray.6" fw={400}>
            {children}
          </Text>
        </Group>
      ) : null}
    </th>
  );
};
