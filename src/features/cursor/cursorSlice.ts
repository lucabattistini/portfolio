import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { MousePosition } from '../../lib/hooks/useMousePosition';

export interface CursorState {
  isHovered: boolean;
  isStuck: boolean;
  isVisible: boolean;
  position: MousePosition;
  speed: number;
}

export const cursorSlice = createSlice({
  name: 'cursor',
  initialState: {
    isHovered: false,
    isStuck: false,
    isVisible: false,
    position: {
      x: -80,
      y: -80,
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
    show: (state) => {
      state.isVisible = true;
    },
    hide: (state) => {
      state.isVisible = false;
    },
    stick: (state: CursorState, action: PayloadAction<MousePosition>) => {
      state.isStuck = true;
      state.position = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    unstick: (state) => {
      state.isStuck = false;
    },
    hover: (state) => {
      state.isHovered = true;
    },
    unhover: (state) => {
      state.isHovered = false;
    },
  },
});

export const { hide, hover, setPosition, setSpeed, show, stick, unstick, unhover } =
  cursorSlice.actions;
export const selectCursorState = (state: RootState): CursorState => state.cursor;
export default cursorSlice.reducer;
