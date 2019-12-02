// React
import React, { FC } from 'react';
// UI
import { CSSReset, ThemeProvider, Flex } from '@chakra-ui/core';
import theme from './theme/theme';
import LoadingSpinner from './components/LoadingSpinner';
// Components
import Map from '../features/map/Map';
import Info from '../features/info/Info';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <LoadingSpinner />
      <Flex>
        <Map />
        <Info />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
