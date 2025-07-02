export interface User {
  id: string;
  name: string;
  phone: string;
  role: 'job_seeker' | 'employer';
  city: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  profileImage?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobSeeker extends User {
  role: 'job_seeker';
  skills: string[];
  experience: string;
  languages: string[];
  workHistory: WorkHistory[];
  availability: 'full_time' | 'part_time' | 'flexible';
}

export interface Employer extends User {
  role: 'employer';
  companyName?: string;
  location: Location;
  jobPosts: JobPost[];
  rating: number;
  reviewCount: number;
}

export interface JobPost {
  id: string;
  title: string;
  category: JobCategory;
  description: string;
  salary: {
    amount: number;
    type: 'hourly' | 'daily' | 'monthly';
  };
  location: Location;
  workingHours: string;
  requirements: string[];
  employerId: string;
  employer: Employer;
  applicants: Application[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  jobSeekerId: string;
  jobSeeker: JobSeeker;
  status: 'pending' | 'shortlisted' | 'rejected' | 'selected';
  appliedAt: Date;
  message?: string;
}

export interface WorkHistory {
  id: string;
  jobTitle: string;
  employerName: string;
  duration: string;
  description: string;
}

export interface Location {
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participants: [string, string];
  lastMessage: Message;
  unreadCount: number;
  createdAt: Date;
}

export type JobCategory = 
  | 'driver'
  | 'maid'
  | 'cook'
  | 'caretaker'
  | 'bodyguard'
  | 'security'
  | 'gardener'
  | 'electrician'
  | 'plumber'
  | 'carpenter'
  | 'mechanic'
  | 'cleaner'
  | 'delivery'
  | 'other';

export type Language = 'en' | 'hi' | 'bn' | 'or';

export type Theme = 'light' | 'dark';

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: Theme;
  language: Language;
  location: Location | null;
}