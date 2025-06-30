// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university: string;
  year: number;
  major: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// Club types
export interface Club {
  id: string;
  name: string;
  description: string;
  category: ClubCategory;
  coverImage?: string;
  logo?: string;
  memberCount: number;
  university: string;
  isPrivate: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export type ClubCategory = 
  | 'Academic'
  | 'Sports'
  | 'Arts'
  | 'Technology'
  | 'Social'
  | 'Professional'
  | 'Volunteer'
  | 'Cultural'
  | 'Religious'
  | 'Other';

// Event types
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  clubId: string;
  clubName: string;
  isVirtual: boolean;
  maxAttendees?: number;
  currentAttendees: number;
  image?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Message types
export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  chatId: string;
  type: MessageType;
  createdAt: string;
  updatedAt: string;
  replyTo?: string;
  attachments?: MessageAttachment[];
}

export type MessageType = 'text' | 'image' | 'file' | 'system';

export interface MessageAttachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  filename: string;
  size: number;
}

// Chat types
export interface Chat {
  id: string;
  type: ChatType;
  name?: string;
  participants: User[];
  clubId?: string;
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export type ChatType = 'direct' | 'group' | 'club';

// Navigation types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  Calendar: undefined;
  Messages: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeFeed: undefined;
  ClubDetail: { clubId: string };
  EventDetail: { eventId: string };
};

export type DiscoverStackParamList = {
  DiscoverFeed: undefined;
  ClubDetail: { clubId: string };
  ClubSearch: undefined;
};

export type CalendarStackParamList = {
  CalendarView: undefined;
  EventDetail: { eventId: string };
  CreateEvent: { clubId?: string };
};

export type MessagesStackParamList = {
  MessagesList: undefined;
  ChatDetail: { chatId: string };
  CreateGroup: undefined;
};

export type ProfileStackParamList = {
  ProfileView: undefined;
  EditProfile: undefined;
  Settings: undefined;
  MyClubs: undefined;
};

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Store types
export interface RootState {
  auth: AuthState;
  clubs: ClubsState;
  events: EventsState;
  messages: MessagesState;
  ui: UIState;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface ClubsState {
  clubs: Club[];
  userClubs: Club[];
  selectedClub: Club | null;
  loading: boolean;
  error: string | null;
}

export interface EventsState {
  events: Event[];
  userEvents: Event[];
  selectedEvent: Event | null;
  loading: boolean;
  error: string | null;
}

export interface MessagesState {
  chats: Chat[];
  messages: { [chatId: string]: Message[] };
  selectedChat: Chat | null;
  loading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  isLoading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}