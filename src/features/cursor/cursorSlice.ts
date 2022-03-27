import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MousePosition } from '../../common/hooks/useMousePosition';

export interface CursorState {
  isStuck: boolean;
  isVisible: boolean;
  position: MousePosition;
  speed: number;
}

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState: {
    isStuck: false,
    isVisible: false,
    position: {
      x: -95,
      y: -95,
    },
    speed: 0,
  },
  reducers: {
    setPosition: (state: CursorState, action: PayloadAction<MousePosition>) => {
      state.position = action.payload;
    },
    setSpeed: (state: CursorState, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
    showCursor: (state) => {
      state.isVisible = true;
    },
    stick: (state) => {
      state.isStuck = true;
    },
    unstick: (state) => {
      state.isStuck = false;
    },
  },
});

export const { setPosition, setSpeed, showCursor, stick, unstick } = cursorSlice.actions;
export const selectCursorState = (state: RootState): CursorState => state.cursor;
export default cursorSlice.reducer;
