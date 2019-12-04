// React
import React, { ChangeEvent, FC } from 'react';
// UI
import { FormControl, FormLabel, Select } from '@chakra-ui/core';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { storeQueryParams } from './querySlice';
// Data
import { years, states, counties } from './formOptions';
// Types
import { RootState } from '../../app/rootReducer';

const Query: FC = () => {
  const { stateName, countyName, year } = useSelector((state: RootState) => state.getMetrics);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (event.target.name === 'stateName') {
      dispatch(
        storeQueryParams({
          stateCode: states.filter(state => state.name === event.target.value)[0].code
        })
      );
    } else if (event.target.name === 'countyName') {
      dispatch(
        storeQueryParams({
          countyCode: counties.filter(county => county.name === event.target.value)[0].code
        })
      );
    }
    dispatch(storeQueryParams({ [event.target.name]: event.target.value }));
  };

  return (
    <FormControl>
      <FormLabel id="year-label" htmlFor="year">
        Year
      </FormLabel>
      <Select id="year" name="year" value={year} aria-labelledby="year-label" onChange={handleChange}>
        {years.map(yearOption => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </Select>

      <FormLabel id="state-label" htmlFor="state">
        State
      </FormLabel>
      <Select id="state" name="stateName" value={stateName} aria-labelledby="state-label" onChange={handleChange}>
        {states.map(state => (
          <option key={state.code} value={state.name}>
            {state.name}
          </option>
        ))}
      </Select>

      <FormLabel id="county-label" htmlFor="county">
        County
      </FormLabel>
      <Select id="county" name="countyName" value={countyName} aria-labelledby="county-label" onChange={handleChange}>
        {counties
          .filter(county => county.stateCode === states.filter(state => state.name === stateName)[0].code)
          .map(county => (
            <option key={county.code} value={county.name}>
              {county.name}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default Query;
