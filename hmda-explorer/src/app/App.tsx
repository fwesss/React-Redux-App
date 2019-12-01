// React
import React, { FC } from 'react';
// UI
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import theme from './theme/theme';
import Title from './theme/components/Title';
// Components
import Map from '../features/map/Map';

const App: FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Title>App</Title>
      <Map />
    </ThemeProvider>
  );
};

export default App;
