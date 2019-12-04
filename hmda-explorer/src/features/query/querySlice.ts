// Redux Toolkit
import { Action, createSlice } from '@reduxjs/toolkit';
// API
import { ThunkAction } from 'redux-thunk';
import requestMetrics from '../../api/hmdaAPI';
// Types
import { RootState } from '../../app/rootReducer';

type initialState = {
  countyCode: number;
  year: number;
  success: {};
  apiQuery: {};
  stateCode: number;
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
  countyCode: 71
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
        error: JSON.parse(action.payload),
        success: {},
        fetching: false
      };
    },
    storeQueryParams(state, action): initialState {
      const { year = state.year, stateCode = state.stateCode, countyCode = state.countyCode } = action.payload;

      return {
        ...state,
        year,
        stateCode,
        countyCode
      };
    }
  }
});

export const { fetchingMetrics, fetchMetricsSuccess, fetchMetricsError, storeQueryParams } = getMetrics.actions;

export default getMetrics.reducer;

export const fetchMetrics = (
  stateCode: number,
  countyCode: number,
  year = 2017
): ThunkAction<void, RootState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(fetchingMetrics());
  try {
    const metrics = await requestMetrics(stateCode, countyCode, year);
    dispatch(fetchMetricsSuccess(metrics));
  } catch (error) {
    dispatch(fetchMetricsError(error.toString()));
  }
};
