import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  searchContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [theme.fn.largerThan('xs')]: {
      alignItems: 'center'
    }
  },
  search: {
    marginRight: '27px',
    '& input': {
      // backgroundColor: '#f2f3f4',
      paddingLeft: '56px',
      height: '45px',
      fontSize: '16px',
      borderRadius: '8px'
    },
    [theme.fn.smallerThan('xs')]: {
      marginBottom: 15
    },
    width: '100%',

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
    display: 'block'
  }
}));
