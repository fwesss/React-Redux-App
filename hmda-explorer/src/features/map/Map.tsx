// React
import React, { FC } from 'react';
// Map
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
// UI
import { Box } from '@chakra-ui/core';
// Redux
import { useDispatch } from 'react-redux';
import { storeQueryParams } from '../query/querySlice';

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
    dispatch(storeQueryParams({ stateCode: Number(countyId.slice(0, 2)), countyCode: Number(countyId.slice(2)) }));
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
