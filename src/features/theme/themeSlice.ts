import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type Theme = 'light' | 'dark';

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', action.payload);
      }
    },
    toggleTheme: (state) => {
      const newTheme: Theme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', newTheme);
      }
    },
    setLightTheme: (state) => {
      state.theme = 'light';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    },
    setDarkTheme: (state) => {
      state.theme = 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    },
  },
});

export const { setTheme, toggleTheme, setLightTheme, setDarkTheme } = themeSlice.actions;

export const selectTheme = (state: RootState): Theme => state.theme.theme;
export const selectThemeState = (state: RootState): ThemeState => state.theme;

export default themeSlice.reducer;
