import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.white,
    transition: 'box-shadow 150ms ease',
    zIndex: 300
  },

  wrapper: {
    overflow: 'auto'
  },

  scrolled: {
    boxShadow: theme.shadows.sm
  },

  tr: {
    padding: '0 !important',
    position: 'relative',
    backgroundColor: 'white'
  },

  infiniteScroll: {
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '10px'
    },

    '&::-webkit-scrollbar-thumb': {
      borderRadius: '8px',
      background: '#98A2B3'
    },

    '&::-webkit-scrollbar-track': {
      background: '#F9FAFB'
    },

    scrollbarColor: '#98A2B3 #F9FAFB'
  },

  infiniteScrollMoreData: {
    width: '100%',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  error: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    '& p': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0px 10px'
    }
  }
}));
