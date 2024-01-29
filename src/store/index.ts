import { configureStore } from '@reduxjs/toolkit'
// ...
import { setupListeners } from '@reduxjs/toolkit/query'
import eventReducer from "./state/eventSlice"
import authReducer  from "./state/authSlice";
import clubReducer from "./state/clubSlice";
import { authApi } from './api/authApi';
import { eventApi } from './api/eventApi';
import { clubApi } from './api/clubApi';

export const store = configureStore({
  reducer: {
    auth:authReducer,
    [authApi.reducerPath]: authApi.reducer, 
    event:eventReducer,
    [eventApi.reducerPath]:eventApi.reducer,  
    club:clubReducer,
    [clubApi.reducerPath]:clubApi.reducer,
  },
  
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(authApi.middleware,eventApi.middleware,clubApi.middleware),
})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)