import { createSlice } from '@reduxjs/toolkit';
import { UIState } from '@/types';

const initialState: UIState = {
  theme: 'light',
  isLoading: false,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
});

export default uiSlice.reducer;