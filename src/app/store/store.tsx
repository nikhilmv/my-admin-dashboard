import {configureStore } from '@reduxjs/toolkit';
import adminauthSliceReducer from './features/auth/adminauthSlice';

export const store = configureStore({
  reducer: {
    adminauth: adminauthSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
