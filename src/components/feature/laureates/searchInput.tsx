import { ChangeEvent, FC, ReactNode } from 'react';
import { InputProps, TextInput } from '@mantine/core';
import { useStyles } from './styles';
import { IconX } from '@tabler/icons-react';

export interface ISearchProps {
  placeholder?: string;
  props?: InputProps;
  setSearch: (value: string) => void;
  value: string;
  icon?: ReactNode;
  label?: string;
}

export const SearchInput: FC<ISearchProps> = ({
  placeholder = 'Search...',
  setSearch,
  icon,
  value,
  label,
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
    <TextInput
      label={label}
      data-lpignore="true"
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
