import React, { ReactElement, ReactNode } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { appReducer, initialAppState } from '../src/store/reducers/app';
import {
  houseReducer,
  initialHouseState,
} from '../src/store/reducers/housesReducer';

function render(ui: ReactElement, renderOptions = {}) {
  function Wrapper({ children }: { children: ReactNode }): ReactElement {
    const store = configureStore({
      reducer: { app: appReducer, houses: houseReducer },
      preloadedState: {
        app: initialAppState(),
        houses: initialHouseState(),
      },
    });
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, {
    wrapper: Wrapper as React.ComponentType<{}> | undefined,
    ...renderOptions,
  });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
