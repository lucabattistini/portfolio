import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LoaderState {
  isCompleted: boolean;
  isLoading: boolean;
  step: number;
  value: number;
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isCompleted: false,
    isLoading: false,
    step: 1,
    value: 1993,
  },
  reducers: {
    setValue: (state: LoaderState, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    start: (state) => {
      state.isLoading = true;
    },
    stop: (state) => {
      state.isLoading = false;
      state.isCompleted = true;
    },
  },
});

export const { setValue, start, stop } = loaderSlice.actions;
export const selectLoaderState = (state: RootState): LoaderState => state.loader;
export default loaderSlice.reducer;
