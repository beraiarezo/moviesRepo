import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import movieSlice from '../store/movieSlice';
import uiReducer from '../store/uiSlice';

export const store = configureStore({
  reducer: {
    TopRated: movieSlice,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
