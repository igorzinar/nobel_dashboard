import React, { MutableRefObject, useState } from 'react';
import { Box, Loader, Table } from '@mantine/core';
import { Tr } from './Tr';
import { ILaureateCommonInfo } from '../../types/laureateCommon';
import { Th } from './Th';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useStyles } from './styles';

interface ILaureatesTableProps {
  laureates: ILaureateCommonInfo[];
  scrollRef?: MutableRefObject<null>;
  getNextData: () => void;
  allDataLength: number;
  handleRowClick: (id: number) => void;
}
const LaureatesTable = ({
  laureates,
  scrollRef,
  getNextData,
  allDataLength,
  handleRowClick
}: ILaureatesTableProps) => {
  const { classes } = useStyles();

  const Ths = (
    <tr>
      <Th>Name</Th>
      <Th>Number of prizes</Th>
    </tr>
  );

  const rows = laureates?.map((laureate: ILaureateCommonInfo, index) => (
    <Tr key={index} laureate={laureate} handleRowClick={handleRowClick} />
  ));

  return (
    <Box>
      <InfiniteScroll
        ref={scrollRef}
        dataLength={laureates?.length}
        next={getNextData}
        hasMore={allDataLength > laureates.length}
        loader={
          <>
            {Boolean(laureates.length) && (
              <Box className={classes.infiniteScrollMoreData}>
                <Loader size="sm" />
              </Box>
            )}
          </>
        }
        className={classes.infiniteScroll}
        height={'calc(50vh - 100px)'}
      >
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          captionSide="top"
          highlightOnHover
          style={{ margin: '32px', maxWidth: '80%' }}
        >
          <caption>Nobel laureates table</caption>
          <thead>{Ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </InfiniteScroll>
    </Box>
  );
};

export default LaureatesTable;
