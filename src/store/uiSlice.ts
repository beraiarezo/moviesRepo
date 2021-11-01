import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { IUi } from 'src/Types'

const initialState: IUi = {
    isSmall: false,
    isTouch: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUi: (state, action: PayloadAction<IUi>) => {
      state.isSmall = action.payload.isSmall
      state.isTouch = action.payload.isTouch
    },
  },
});

export const { setUi } = uiSlice.actions;

export const getUi = (state: RootState) => state.ui;

export default uiSlice.reducer;
