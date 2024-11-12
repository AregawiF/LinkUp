import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { userApi } from '../api/userApi';
import { messageApi } from '../api/messageApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware, userApi.middleware, messageApi.middleware),
});
