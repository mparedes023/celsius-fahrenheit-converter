import { configureStore } from '@reduxjs/toolkit';
import tempReducer from './temperatureSlice';

const store = configureStore({
  reducer: {
    temperature: tempReducer,
  },
});

export default store;
