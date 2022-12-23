import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './reducers/auth';
import event from './reducers/event';

const rootReducer = combineReducers({
   auth,
   event
});

const store = configureStore({
   reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;