import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import tasksSlice from './tasksSlice';
import AsyncStorage from '@react-native-community/async-storage';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import subjectSlice from './subjectsSlice';
import scheduleSlice from './scheduleSlice';

const reducers = combineReducers({
  tasks: tasksSlice,
  subjects: subjectSlice,
  schedule: scheduleSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

// const persistedReducer = persistReducer(persistConfig, reducers);
const persistedReducer = reducers;

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
