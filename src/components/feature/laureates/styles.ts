import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  search: {
    width: '100%',

    '& input': {
      borderRadius: '8px',
      border: 'none'
    },

    '& .mantine-Input-input[data-with-icon]': {
      paddingLeft: '56px'
    },

    '& .mantine-Input-icon': {
      marginLeft: theme.spacing.sm
    },

    '&:hover': {
      '& .mantine-Search-clearIcon': {
        display: 'inherit'
      }
    }
  },
  clearIcon: {
    cursor: 'pointer',
    marginRight: theme.spacing.sm,
    color: '#98A2B3',
    display: 'none'
  }
}));
