import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from './components/MainLayout';
import { MantineProvider, DEFAULT_THEME } from '@mantine/core';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={DEFAULT_THEME}>
      <Provider store={store}>
        <MainLayout />
      </Provider>
    </MantineProvider>
  );
}

export default App;
