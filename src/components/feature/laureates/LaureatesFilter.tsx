import { SearchInput } from './searchInput';
import React, { useState, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useActions } from '../../../hooks/redux/action';
import { useAppSelector } from '../../../hooks/redux/redux';
import { IconSearch } from '@tabler/icons-react';

const LaureatesFilter = () => {
  const { setLaureatesFilters } = useActions();
  const { filters: laureatesFilter } = useAppSelector((state) => state.laureates);

  const [text, setText] = useState(laureatesFilter.name || '');

  const debounced = useDebounce(text, 500);

  useEffect(() => {
    setLaureatesFilters({
      ...laureatesFilter,
      offset: 0,
      name: debounced
    });
  }, [debounced]);

  return (
    <SearchInput icon={<IconSearch />} setSearch={setText} value={text} placeholder={'Search'} />
  );
};

export default LaureatesFilter;
