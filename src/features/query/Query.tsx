// React
import React, { ChangeEvent, FC } from 'react';
// UI
import { FormControl, FormLabel, Select } from '@chakra-ui/core';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { storeQueryParams } from './querySlice';
// Utils
import ensure from '../../utils/ensure';
// Data
import { years, states, counties } from './formOptions';
// Types
import { RootState } from '../../app/rootReducer';

const Query: FC = () => {
  const { stateCode } = useSelector((state: RootState) => state.getMetrics);
  const { stateName, countyName, year } = useSelector(
    (state: RootState) => state.getMetrics
  );
  const dispatch = useDispatch();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    if (event.target.name === 'stateName') {
      dispatch(
        storeQueryParams({
          stateCode: ensure(
            states.find((state) => state.name === event.target.value)
          ).code,
        })
      );
    } else if (event.target.name === 'countyName') {
      dispatch(
        storeQueryParams({
          countyCode: ensure(
            counties.find(
              (county) =>
                county.name === event.target.value &&
                county.stateCode === stateCode
            )
          ).code,
        })
      );
    }

    dispatch(storeQueryParams({ [event.target.name]: event.target.value }));
  };

  return (
    <FormControl fontFamily="body">
      <FormLabel mt="1rem" id="year-label" htmlFor="year">
        Year
      </FormLabel>
      <Select
        id="year"
        name="year"
        defaultValue={year}
        aria-labelledby="year-label"
        onChange={handleChange}
      >
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </Select>

      <FormLabel mt="1rem" id="state-label" htmlFor="state">
        State
      </FormLabel>
      <Select
        id="state"
        name="stateName"
        defaultValue={stateName}
        aria-labelledby="state-label"
        onChange={handleChange}
      >
        {states.map((state) => (
          <option key={state.code} value={state.name}>
            {state.name}
          </option>
        ))}
      </Select>

      <FormLabel mt="1rem" id="county-label" htmlFor="county">
        County
      </FormLabel>
      <Select
        id="county"
        name="countyName"
        defaultValue={countyName}
        aria-labelledby="county-label"
        onChange={handleChange}
      >
        {counties
          .filter(
            (county) =>
              county.stateCode ===
              ensure(states.find((state) => state.name === stateName)).code
          )
          .map((county) => (
            <option key={county.code} value={county.name}>
              {county.name}
            </option>
          ))}
      </Select>
    </FormControl>
  );
};

export default Query;
