import React from 'react';
import { Accordion, Box, Flex, Text } from '@mantine/core';
import { useStyles } from './styles';
import { IAwardsByYear } from '../../types';
import PrizeDescriptionItem from './components/PrizeDescriptionItem';

interface IAwardsDetailsModal {
  awards: IAwardsByYear | null;
}
const AwardsDetailsModal = ({ awards }: IAwardsDetailsModal) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.content}>
      {!awards ? (
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="center"
          fz="xl"
          fw={700}
        >
          No data for this Awards
        </Text>
      ) : (
        <>
          <Flex direction="column" w="100%" align="center">
            <h2>Year: {awards?.year}</h2>
            <Accordion radius="md" w="100%">
              {awards?.items?.map((award, index) => (
                <Accordion.Item value={award?.category.en}>
                  <Accordion.Control>{award.category.en}</Accordion.Control>
                  <Accordion.Panel>
                    <Flex direction="column" key={index} maw={300}>
                      <PrizeDescriptionItem description={'Category'} value={award.category.en} />
                      <PrizeDescriptionItem
                        description={'Award amount'}
                        value={award?.prizeAmountAdjusted}
                      />
                    </Flex>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default AwardsDetailsModal;
