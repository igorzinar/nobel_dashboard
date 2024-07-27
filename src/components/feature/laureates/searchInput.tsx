import { ChangeEvent, FC, ReactNode } from 'react';
import { Input, InputProps } from '@mantine/core';
import { useStyles } from './styles';
import { IconX } from '@tabler/icons-react';

export interface ISearchProps {
  placeholder?: string;
  props?: InputProps;
  fullSize?: boolean;
  setSearch: (value: string) => void;
  value: string;
  hideClearIcon?: boolean;
  icon?: ReactNode;
}

export const SearchInput: FC<ISearchProps> = ({
  placeholder = 'Search...',
  setSearch,
  icon,
  value,
  ...props
}) => {
  const { classes } = useStyles();

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const clearValue = () => {
    setSearch('');
  };

  return (
    <Input
      data-lpignore="true"
      autoComplete="new-password"
      type="search"
      className={classes.search}
      icon={icon}
      placeholder={placeholder}
      onChange={onSearchChange}
      value={value}
      rightSection={value && <IconX className={classes.clearIcon} onClick={clearValue} />}
      {...props}
    />
  );
};
