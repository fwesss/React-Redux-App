// Redux-toolkit
import { configureStore } from '@reduxjs/toolkit';
// Reducers
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
