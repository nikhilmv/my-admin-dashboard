import {configureStore } from '@reduxjs/toolkit';
import adminauthSliceReducer from './features/auth/adminauthSlice';

export const store = configureStore({
  reducer: {
    adminauth: adminauthSliceReducer,
  },
});