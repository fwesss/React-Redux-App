// React
import React, { FC, useEffect } from 'react';
// UI
import { ThemeProvider, Flex, CSSReset } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import customTheme from './theme/theme';
// Redux
import { fetchMetrics } from '../features/query/querySlice';
// Components
import LoadingSpinner from './components/LoadingSpinner';
import Map from '../features/map/Map';
import Info from '../features/info/Info';
// Types
import { RootState } from './rootReducer';

const App: FC = () => {
  const { stateCode, countyCode, year } = useSelector(
    (state: RootState) => state.getMetrics
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetrics(stateCode, countyCode, year));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countyCode, dispatch, year]);

  return (
    <ThemeProvider theme={customTheme}>
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
