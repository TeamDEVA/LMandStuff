import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import anotherCounterSlice from '../features/counter/anotherCounterSlice';
import leagueList from '../features/leagueList/leagueList';
import contractRedux from '../features/contractRedux/contractRedux';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

// here define all the reducers.
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: anotherCounterSlice,
    ll: leagueList,
    contractRedux: contractRedux,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, // Return type of the thunk function
  RootState, // state type used by getState
  unknown, // any "extra argument" injected into the thunk
  Action<string> // known types of actions that can be dispatched
>;
