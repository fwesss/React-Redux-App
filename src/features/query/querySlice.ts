// Redux Toolkit
import { Action, createSlice } from '@reduxjs/toolkit';
// API
import { ThunkAction } from 'redux-thunk';
import requestMetrics from '../../api/hmdaAPI';
// Types
import { RootState } from '../../app/rootReducer';

type initialState = {
  countyCode: number;
  countyName: string;
  year: number;
  success: {};
  apiQuery: {};
  stateCode: number;
  stateName: string;
  fetching: boolean;
  metrics: {
    stateName: string;
    averageLoanAmount: number;
    homebuyersAverageIncome: number;
    incomeToLoanAmount: number;
    homebuyerIncomeToLoanAmount: number;
    resultsYear: number;
    medianLoanAmount: number;
    transactions: number;
    medianIncome: number;
    countyName: string;
    homebuyersMedianIncome: number;
  };
  error: {};
};

const initialState = {
  fetching: false,
  success: {},
  error: {},
  apiQuery: {},
  metrics: {
    stateName: '',
    countyName: '',
    homebuyersAverageIncome: 0,
    homebuyersMedianIncome: 0,
    medianIncome: 0,
    medianLoanAmount: 0,
    averageLoanAmount: 0,
    incomeToLoanAmount: 0,
    homebuyerIncomeToLoanAmount: 0,
    transactions: 0,
    resultsYear: 0
  },
  year: 2017,
  stateCode: 6,
  stateName: 'California',
  countyCode: 71,
  countyName: 'San Bernardino County'
};

const getMetrics = createSlice({
  name: 'getMetrics',
  initialState,
  reducers: {
    fetchingMetrics(state): initialState {
      return {
        ...state,
        fetching: true
      };
    },
    fetchMetricsSuccess(state, action): initialState {
      const {
        data: { results, query },
        ...requestInfo
      } = action.payload;

      return {
        ...state,
        metrics: results,
        error: {},
        success: requestInfo,
        apiQuery: query,
        fetching: false
      };
    },
    fetchMetricsError(state, action): initialState {
      return {
        ...state,
        error: action.payload,
        success: {},
        fetching: false
      };
    },
    storeQueryParams(state, action): initialState {
      const {
        year = state.year,
        stateCode = state.stateCode,
        stateName = state.stateName,
        countyCode = state.countyCode,
        countyName = state.countyName
      } = action.payload;

      return {
        ...state,
        year,
        stateCode,
        stateName,
        countyCode,
        countyName
      };
    }
  }
});

export const { fetchingMetrics, fetchMetricsSuccess, fetchMetricsError, storeQueryParams } = getMetrics.actions;

export default getMetrics.reducer;

export const fetchMetrics = (
  stateCode: number,
  countyCode: number,
  year: number
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(fetchingMetrics());
  try {
    const metrics = await requestMetrics(stateCode, countyCode, year);
    dispatch(fetchMetricsSuccess(metrics));
  } catch (error) {
    dispatch(fetchMetricsError(error));
  }
};
