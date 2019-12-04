// React
import React, { FC } from 'react';
// Map
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// UI
import { Box } from '@chakra-ui/core';
// Redux
import { useDispatch } from 'react-redux';
import { storeQueryParams } from '../query/querySlice';
// Data
import { counties, states } from '../query/formOptions';

const countyMap = 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json';

type County = {
  readonly geometry: {};
  readonly id: string;
  readonly properties: {};
  readonly rsmKey: string;
  readonly svgPath: string;
  readonly type: string;
};

const Map: FC = () => {
  const dispatch = useDispatch();

  const handleClick = (countyId: string) => {
    const stateCode = Number(countyId.slice(0, 2));
    const stateName = states.filter(state => state.code === stateCode)[0].name;
    const countyCode = Number(countyId.slice(2));
    const countyName = counties.filter(county => county.code === countyCode && county.stateCode === stateCode)[0].name;

    dispatch(storeQueryParams({ stateCode, stateName, countyCode, countyName }));
  };

  return (
    <Box w="80%">
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={countyMap}>
          {({ geographies }: { readonly geographies: readonly County[] }) =>
            geographies.map(county => {
              return <Geography key={county.rsmKey} geography={county} onClick={() => handleClick(county.id)} />;
            })
          }
        </Geographies>
      </ComposableMap>
    </Box>
  );
};

export default Map;
