import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  content: {
    marginTop: theme.spacing.md,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: `${theme.spacing.xs} 0px `,
    width: '100%',
    minHeight: '400px'
  },
  title: {
    color: '#667085',
    fontSize: '12px'
  },
  prizeLInk: {
    textDecoration: 'none'
  }
}));
