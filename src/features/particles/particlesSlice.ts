import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ParticlesState {
  isVisible: boolean;
  isExploded: boolean;
}

export const particlesSlice = createSlice({
  name: 'particles',
  initialState: {
    isVisible: false,
    isExploded: false,
  },
  reducers: {
    showParticles: (state) => {
      state.isVisible = true;
    },
    explode: (state) => {
      state.isExploded = true;
    },
    unexplode: (state) => {
      state.isExploded = false;
    },
  },
});

export const { explode, showParticles, unexplode } = particlesSlice.actions;
export const selectParticlesState = (state: RootState): ParticlesState => state.particles;
export default particlesSlice.reducer;
