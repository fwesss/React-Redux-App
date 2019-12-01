// Redux Toolkit
import { Action, createSlice } from '@reduxjs/toolkit';
// API
import { ThunkAction } from 'redux-thunk';
import { requestMetrics } from '../../api/hmdaAPI';
// Types
import { RootState } from '../../app/rootReducer';

const initialState = {
  fetching: false,
  success: {},
  error: {},
  metrics: []
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
      return {
        ...state,
        metrics: action.payload.data,
        success: action.payload.statusText,
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
  stateCode: number,
  countyCode: number
): ThunkAction<void, RootState, null, Action<string>> => async dispatch => {
  dispatch(fetchingMetrics());
  try {
    const metrics = await requestMetrics(stateCode, countyCode);
    dispatch(fetchMetricsSuccess(metrics));
  } catch (error) {
    dispatch(fetchMetricsError(error));
  }
};
