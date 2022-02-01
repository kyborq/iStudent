import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { COLORS } from '../colors';
import { RootState } from './store';

export interface ISettingsSlice {
  name: string;
  theme: string;
}

const initialState: ISettingsSlice = {
  name: 'Гость',
  theme: '#5A9EEE',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<ISettingsSlice>) {
      state.name = action.payload.name;
      state.theme = action.payload.theme;
    },
  },
});

export const { updateSettings } = settingsSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default settingsSlice.reducer;
