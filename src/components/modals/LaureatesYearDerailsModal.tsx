import React from 'react';
import { Accordion, Box, Divider, Flex, LoadingOverlay, Text } from '@mantine/core';
import { useStyles } from './styles';
import PrizeDescriptionItem from './components/PrizeDescriptionItem';
import { ILaureatesByYear } from '../../types';

interface IAwardsDetailsModal {
  data: ILaureatesByYear | null;
}
const LaureatesYearDerailsModal = ({ data }: IAwardsDetailsModal) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.content}>
      {!data ? (
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="center"
          fz="xl"
          fw={700}
        >
          No laureates for this year
        </Text>
      ) : (
        <>
          <Flex direction="column" h="100%" w="100%" align="center" justify={'space-between'}>
            <Text fz="xl">Year: {data?.year}</Text>
            <Text fz="xl">Category: {data?.categoryName}</Text>
            <Divider size="xl" />
            <Accordion radius="md" w="100%">
              {data?.laureates?.map((laureate, index) => (
                <Accordion.Item value={laureate?.fullName?.en}>
                  <Accordion.Control>{laureate?.fullName?.en}</Accordion.Control>
                  <Accordion.Panel>
                    <Flex direction="column" key={index}>
                      <PrizeDescriptionItem
                        description={'Motivation'}
                        value={laureate?.motivation?.en}
                      />
                    </Flex>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Flex>
        </>
      )}
      <LoadingOverlay visible={false} />
    </Box>
  );
};

export default LaureatesYearDerailsModal;
