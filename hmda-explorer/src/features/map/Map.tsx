import React, { FC } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { useDispatch } from 'react-redux';
import { fetchMetrics } from '../query/querySlice';

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

  const handleClick = (county: County) => {
    const stateCode = Number(county.id.slice(0, 2));
    const countyCode = Number(county.id.slice(2));

    dispatch(fetchMetrics(stateCode, countyCode));
  };

  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={countyMap}>
          {({ geographies }: { readonly geographies: readonly County[] }) =>
            geographies.map(county => {
              return <Geography key={county.rsmKey} geography={county} onClick={() => handleClick(county)} />;
            })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default Map;
