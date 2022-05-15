import { configureStore } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import reducers from './reducers';

let store;

function initStore(initialState) {
    return configureStore({
        reducer: reducers,
        devTools: process.env.NODE_ENV !== 'production',
        initialState,
    });
}

export const initializeStore = (preloadedState) => {
    let initialStore = store ?? initStore(preloadedState);

    if (preloadedState && store) {
        initialStore = initStore({
            ...store.getState(),
            ...preloadedState,
        });

        store = undefined;
    }

    if (typeof window === 'undefined') {
        return initialStore;
    }

    if (!store) store = initialStore;

    return initialStore;
};

export function useStore(initialState) {
    return useMemo(() => initializeStore(initialState), [initialState]);
}

