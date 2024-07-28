import { SearchInput } from './searchInput';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useActions } from '../../../hooks/redux/action';
import { useAppSelector } from '../../../hooks/redux/redux';
import { IconSearch } from '@tabler/icons-react';
type searchFieldType = 'name' | 'residence';
interface IFilterProps {
  searchField: searchFieldType;
}
const LaureatesSearchFilter = ({ searchField }: IFilterProps) => {
  const { setLaureatesFilters } = useActions();
  const { filters: laureatesFilter } = useAppSelector((state) => state.laureates);

  const [text, setText] = useState(laureatesFilter[searchField] || '');

  const debounced = useDebounce(text, 500);

  useEffect(() => {
    setLaureatesFilters({
      ...laureatesFilter,
      offset: 0,
      [searchField]: debounced
    });
  }, [debounced]);

  return (
    <SearchInput
      label={searchField === 'name' ? 'Laureate name' : 'Laureate residence'}
      icon={<IconSearch />}
      setSearch={setText}
      value={text}
      placeholder={searchField === 'name' ? 'Name' : 'Residence'}
    />
  );
};

export default LaureatesSearchFilter;
