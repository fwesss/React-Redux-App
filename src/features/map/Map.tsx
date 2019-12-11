// React
import React, { FC, useEffect, useState } from 'react';
// Map
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// UI
import { Box } from '@chakra-ui/core';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { storeQueryParams } from '../query/querySlice';
// Data
import { counties, states } from '../query/formOptions';
import { RootState } from '../../app/rootReducer';
import ensure from '../../utils/ensure';

const countyMap = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

type County = {
  readonly id: string;
  readonly rsmKey: string;
};

const Map: FC = () => {
  const { stateCode, countyCode } = useSelector(
    (state: RootState) => state.getMetrics
  );
  const [geographyId, setGeographyId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setGeographyId(
      stateCode.toString().padStart(2, '0') +
        countyCode.toString().padStart(3, '0')
    );
  }, [countyCode, stateCode]);

  const handleClick = (countyId: string): void => {
    const newStateCode = Number(countyId.slice(0, 2));
    const stateName = ensure(
      states.find((state) => state.code === newStateCode)
    ).name;
    const newCountyCode = Number(countyId.slice(2));
    const countyName = ensure(
      counties.find(
        (county) =>
          county.code === newCountyCode && county.stateCode === newStateCode
      )
    ).name;

    dispatch(
      storeQueryParams({
        geographyId: countyId,
        stateCode: newStateCode,
        stateName,
        countyCode: newCountyCode,
        countyName,
      })
    );
  };

  return (
    <Box w="80%">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={countyMap}>
          {({
            geographies,
          }: {
            readonly geographies: readonly County[];
          }): unknown[] =>
            geographies.map((county) => {
              return (
                <Geography
                  key={county.rsmKey}
                  geography={county}
                  fill={county.id === geographyId ? '#38B2AC' : '#333333'}
                  onClick={(): void => handleClick(county.id)}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default Map;
