'use client';

import { Provider } from 'react-redux';
import { store } from './store'; // Adjust path if your store is in a different folder

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
