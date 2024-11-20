import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import itemsReducer from './reducers/items';
import usersReducer from './reducers/users';
import { itemsAPI } from './services/items';
import { usersAPI } from './services/users';

export const setupStore = () => {
    const store = configureStore({
        reducer: {
            itemsReducer,
            usersReducer,
            [itemsAPI.reducerPath]: itemsAPI.reducer,
            [usersAPI.reducerPath]: usersAPI.reducer,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(itemsAPI.middleware)
            .concat(usersAPI.middleware)
    });

    setupListeners(store.dispatch);

    return store;
}