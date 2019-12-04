// React
import React, { FC, useEffect, useState } from 'react';
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
  const { stateCode, countyCode, year } = useSelector((state: RootState) => state.getMetrics);
  const dispatch = useDispatch();

  const [formValues, setFormValue] = useState({
    year,
    countyCode,
    countyName: counties.filter(county => countyCode === county.code && stateCode === county.stateCode)[0].name,
    stateCode,
    stateName: states.filter(state => state.code === stateCode)[0].name
  });

  useEffect(() => {
    setFormValue({
      ...formValues,
      stateCode: states.filter(state => state.name === formValues.stateName)[0].code
    });
  }, [formValues.stateName]);

  useEffect(() => {
    console.log(formValues);
    setFormValue({
      ...formValues,
      countyCode: counties.filter(
        county =>
          county.name === formValues.countyName &&
          county.stateCode === states.filter(state => state.name === formValues.stateName)[0].code
      )[0].code
    });
  }, [formValues.countyName]);

  useEffect(() => {
    console.log(stateCode, countyCode);
    setFormValue({
      ...formValues,
      stateName: states.filter(state => state.code === stateCode)[0].name,
      countyName: counties.filter(county => countyCode === county.code && stateCode === county.stateCode)[0].name
    });
  }, [stateCode, countyCode]);

  useEffect(() => {
    dispatch(
      storeQueryParams({
        stateCode: formValues.stateCode,
        countyCode: formValues.countyCode,
        year: formValues.year
      })
    );
  }, [dispatch, formValues.countyCode, formValues.stateCode, formValues.year]);

  const handleChange = (event: any) => {
    if (event.target.name === 'year') {
      setFormValue({
        ...formValues,
        [event.target.name]: Number(event.target.value)
      });
    } else {
      setFormValue({
        ...formValues,
        [event.target.name]: event.target.value
      });
    }
  };

  return (
    <FormControl>
      <FormLabel id="year-label" htmlFor="year">
        Year
      </FormLabel>
      <Select id="year" name="year" value={formValues.year} aria-labelledby="year-label" onChange={handleChange}>
        {years.map(yearOption => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </Select>

      <FormLabel id="state-label" htmlFor="state">
        State
      </FormLabel>
      <Select
        id="state"
        name="stateName"
        value={formValues.stateName}
        aria-labelledby="state-label"
        onChange={handleChange}
      >
        {states.map(state => (
          <option key={state.code} value={state.name}>
            {state.name}
          </option>
        ))}
      </Select>

      <FormLabel id="county-label" htmlFor="county">
        County
      </FormLabel>
      <Select
        id="county"
        name="countyName"
        value={formValues.countyName}
        aria-labelledby="county-label"
        onChange={handleChange}
      >
        {counties
          .filter(county => county.stateCode === states.filter(state => state.name === formValues.stateName)[0].code)
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
