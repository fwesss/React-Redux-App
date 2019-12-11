// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
// eslint-disable-next-line import/no-cycle
import getMetricsReducer from '../features/query/querySlice';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  getMetrics: getMetricsReducer,
});

export default rootReducer;
