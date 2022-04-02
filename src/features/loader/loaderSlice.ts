import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LoaderState {
  isCompleted: boolean;
  isLoading: boolean;
  shouldExit: boolean;
  step: number;
  value: number;
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState: {
    isCompleted: false,
    isLoading: false,
    shouldExit: false,
    step: 1,
    value: 1993,
  },
  reducers: {
    complete: (state) => {
      state.isCompleted = true;
    },
    setValue: (state: LoaderState, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    start: (state) => {
      state.isLoading = true;
    },
    stop: (state) => {
      state.isLoading = false;
      state.shouldExit = true;
    },
  },
});

export const { complete, setValue, start, stop } = loaderSlice.actions;
export const selectLoaderState = (state: RootState): LoaderState => state.loader;
export default loaderSlice.reducer;
