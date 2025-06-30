import { createSlice } from '@reduxjs/toolkit';
import { EventsState } from '@/types';

const initialState: EventsState = {
  events: [],
  userEvents: [],
  selectedEvent: null,
  loading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
});

export default eventsSlice.reducer;