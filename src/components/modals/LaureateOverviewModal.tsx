import React from 'react';
import NobelWinner from '../../assets/nobelwinner.png';
import { useGetLaureateInfoByIdQuery } from '../../services';
import { Avatar, Box, Divider, Flex, LoadingOverlay, Text } from '@mantine/core';
import { useStyles } from './styles';
import { getExternalPrizeLink } from '../../helpers';
import PrizeDescriptionItem from './components/PrizeDescriptionItem';

interface ILaureateOverviewModal {
  laureateId: number;
}
const LaureateOverviewModal = ({ laureateId }: ILaureateOverviewModal) => {
  const { classes } = useStyles();
  const { data, isLoading, isSuccess } = useGetLaureateInfoByIdQuery(laureateId);

  return (
    <Box className={classes.content}>
      {!data && isSuccess ? (
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="center"
          fz="xl"
          fw={700}
        >
          No data for this laureate
        </Text>
      ) : (
        <>
          {data?.fullName?.en ? (
            <>
              <Avatar src={NobelWinner} alt="it's me" size={120} radius={'xl'} />
              <Text fz="lg" fw={500} mt="md">
                {data?.fullName?.en}
              </Text>
            </>
          ) : null}
          {data?.nobelPrizes?.length ? (
            <PrizeDescriptionItem
              description={'Number of prizes'}
              value={data?.nobelPrizes?.length}
            />
          ) : null}

          <Flex direction="column">
            {data?.nobelPrizes?.map((nobelPrize, index) => (
              <Flex direction="column" key={index} maw={300}>
                <Divider my="sm" />
                <PrizeDescriptionItem
                  description={'Category'}
                  value={nobelPrize?.categoryFullName?.en}
                />
                <PrizeDescriptionItem
                  description={'Description'}
                  value={nobelPrize?.motivation?.en}
                />
                <PrizeDescriptionItem
                  description={'Date Awarded'}
                  value={nobelPrize?.dateAwarded}
                />
                <PrizeDescriptionItem
                  description={'Award amount'}
                  value={nobelPrize?.prizeAmountAdjusted}
                />
                <PrizeDescriptionItem
                  description={' Link'}
                  value={
                    <a
                      className={classes.prizeLInk}
                      href={getExternalPrizeLink(nobelPrize.links || [])}
                      target={'_blank'}
                    >
                      <Text
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                        sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                        ta="center"
                        fw={700}
                      >
                        Details
                      </Text>
                    </a>
                  }
                />
                <Divider my="sm" />
              </Flex>
            ))}
          </Flex>
          {data?.wikipedia?.english ? (
            <Text fz="sm" c="dimmed" mt="sm">
              <a className={classes.prizeLInk} href={data?.wikipedia?.english} target={'_blank'}>
                <Text
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                  sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                  ta="center"
                  fw={700}
                >
                  More about laureate
                </Text>
              </a>
            </Text>
          ) : null}

          {data?.birth?.date ? (
            <Flex>
              <Text fz="sm" c="dimmed" mt="sm">
                Birth date: {data?.birth?.date}
              </Text>
              {data?.death?.date ? (
                <>
                  <Divider orientation={'vertical'} mx={24} h="14px" my="auto" />
                  <Text fz="sm" c="dimmed" mt="sm">
                    Death date : {data?.death?.date}
                  </Text>
                </>
              ) : null}
            </Flex>
          ) : null}
        </>
      )}
      <LoadingOverlay visible={isLoading} />
    </Box>
  );
};

export default LaureateOverviewModal;
