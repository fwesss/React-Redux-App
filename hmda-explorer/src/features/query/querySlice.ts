// Redux Toolkit
import { Action, createSlice } from '@reduxjs/toolkit';
// API
import { ThunkAction } from 'redux-thunk';
import requestMetrics from '../../api/hmdaAPI';
// Types
import { RootState } from '../../app/rootReducer';

const initialState = {
  fetching: false,
  success: {},
  error: {},
  metrics: {
    stateName: '',
    countyName: '',
    homebuyersAverageIncome: 0,
    homebuyersMedianIncome: 0,
    medianIncome: 0,
    medianLoanAmount: 0,
    averageLoanAmount: 0,
    incomeToLoanAmount: 0,
    transactions: 0
  }
};

const getMetrics = createSlice({
  name: 'getMetrics',
  initialState,
  reducers: {
    fetchingMetrics(state) {
      return {
        ...state,
        fetching: true
      };
    },
    fetchMetricsSuccess(state, action) {
      const {
        data: { results },
        ...requestInfo
      } = action.payload;

      return {
        ...state,
        metrics: results,
        success: requestInfo,
        fetching: false
      };
    },
    fetchMetricsError(state, action) {
      return {
        ...state,
        error: action.payload,
        fetching: false
      };
    }
  }
});

export const { fetchingMetrics, fetchMetricsSuccess, fetchMetricsError } = getMetrics.actions;

export default getMetrics.reducer;

export const fetchMetrics = (
  stateCode = 6,
  countyCode = 71,
  year = 2017
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
  dispatch(fetchingMetrics());
  try {
    const metrics = await requestMetrics(stateCode, countyCode, year);
    dispatch(fetchMetricsSuccess(metrics));
  } catch (error) {
    dispatch(fetchMetricsError(error));
  }
};
