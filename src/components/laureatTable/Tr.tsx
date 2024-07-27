import { FC } from 'react';
import { ILaureateCommonInfo } from '../../types/laureateCommon';

interface ITrProps {
  laureate?: ILaureateCommonInfo;
  handleRowClick?: (id: number) => void;
}

export const Tr: FC<ITrProps> = ({ laureate, handleRowClick }) => {
  const clickRow = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    const currentTarget = e.currentTarget;
    const target = e.target as HTMLElement;

    if (currentTarget.contains(target) && handleRowClick) {
      handleRowClick(Number(laureate?.id));
    }
  };

  return (
    <tr data-id={laureate?.id} onClick={clickRow} style={{ cursor: 'pointer' }}>
      {/*{columns.map((col, colIndex) => {*/}
      {/*  const currentValue = col.render(row, selection);*/}

      {/*  return (*/}
      {/*    <td key={colIndex} className={cx(classes.td)}>*/}
      {/*      {currentValue}*/}
      {/*    </td>*/}
      {/*  );*/}
      {/*})}*/}
      <td>{laureate?.fullName?.en}</td>
      <td>{laureate?.nobelPrizes?.length}</td>
    </tr>
  );
};
