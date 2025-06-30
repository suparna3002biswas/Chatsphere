import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club, ClubsState } from '@/types';

const initialState: ClubsState = {
  clubs: [],
  userClubs: [],
  selectedClub: null,
  loading: false,
  error: null,
};

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setClubs: (state, action: PayloadAction<Club[]>) => {
      state.clubs = action.payload;
    },
    setUserClubs: (state, action: PayloadAction<Club[]>) => {
      state.userClubs = action.payload;
    },
    setSelectedClub: (state, action: PayloadAction<Club | null>) => {
      state.selectedClub = action.payload;
    },
    addClub: (state, action: PayloadAction<Club>) => {
      state.clubs.push(action.payload);
    },
    updateClub: (state, action: PayloadAction<Club>) => {
      const index = state.clubs.findIndex(club => club.id === action.payload.id);
      if (index !== -1) {
        state.clubs[index] = action.payload;
      }
    },
    removeClub: (state, action: PayloadAction<string>) => {
      state.clubs = state.clubs.filter(club => club.id !== action.payload);
      state.userClubs = state.userClubs.filter(club => club.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setClubs,
  setUserClubs,
  setSelectedClub,
  addClub,
  updateClub,
  removeClub,
  setLoading,
  setError,
  clearError,
} = clubsSlice.actions;

export default clubsSlice.reducer;