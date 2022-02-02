import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COLORS } from '../colors';
import { RootState } from './store';

export interface ISettingsSlice {
  name: string;
  theme: string;
  labels: boolean;
}

const initialState: ISettingsSlice = {
  name: 'Гость',
  theme: '#5A9EEE',
  labels: true,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<ISettingsSlice>) {
      state.name = action.payload.name;
      state.theme = action.payload.theme;
      state.labels = action.payload.labels;
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default settingsSlice.reducer;
