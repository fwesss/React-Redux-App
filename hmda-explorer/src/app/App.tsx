// React
import React, { FC, useEffect } from 'react';
// UI
import { CSSReset, ThemeProvider, Flex } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import theme from './theme/theme';
// Redux
import { fetchMetrics } from '../features/query/querySlice';
// Components
import LoadingSpinner from './components/LoadingSpinner';
import Map from '../features/map/Map';
import Info from '../features/info/Info';
// Types
import { RootState } from './rootReducer';

const App: FC = () => {
  const { stateCode, countyCode, year } = useSelector((state: RootState) => state.getMetrics);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetrics(stateCode, countyCode, year));
  }, [countyCode, dispatch, year]);

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
