import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface ICommonSlice {
  locale: string;
  welcome: boolean;
}

const initialState: ICommonSlice = {
  locale: 'ru_RU',
  welcome: true,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    hideWelcomeScreen(state) {
      state.welcome = false;
    },
  },
});

export const { hideWelcomeScreen } = commonSlice.actions;

export default commonSlice.reducer;
