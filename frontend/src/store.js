import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import household from './components/household/household-slice';

const rootReducer = combineReducers({
    household,
});

const configureAppStore = () => {

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    });

    return store
};

export default configureAppStore;