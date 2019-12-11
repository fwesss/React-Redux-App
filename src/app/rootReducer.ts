// Redux Toolkit
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// Reducers
// eslint-disable-next-line import/no-cycle
import getMetricsReducer from '../features/query/querySlice';

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  getMetrics: getMetricsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
