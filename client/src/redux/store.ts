// store.ts
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootSlice'; // You'll create this

const store = configureStore({
  reducer: rootReducer,
  // other configuration options (middleware, devTools, etc.)
});

export default store;
