import { createSlice } from '@reduxjs/toolkit';
import { MessagesState } from '@/types';

const initialState: MessagesState = {
  chats: [],
  messages: {},
  selectedChat: null,
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});

export default messagesSlice.reducer;