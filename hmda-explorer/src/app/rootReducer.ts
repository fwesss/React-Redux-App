// Redux Toolkit
import { combineReducers } from '@reduxjs/toolkit';
// Reducers
import getMetricsReducer from '../features/query/querySlice';

const rootReducer = combineReducers({
  getMetrics: getMetricsReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
