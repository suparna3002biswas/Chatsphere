import { JobCategory, JobPost, User, JobSeeker, Employer } from '../types';

export const JOB_CATEGORIES: { key: JobCategory; label: string; icon: string }[] = [
  { key: 'driver', label: 'Driver', icon: '🚗' },
  { key: 'maid', label: 'Maid', icon: '🏠' },
  { key: 'cook', label: 'Cook', icon: '👨‍🍳' },
  { key: 'caretaker', label: 'Caretaker', icon: '❤️' },
  { key: 'bodyguard', label: 'Bodyguard', icon: '🛡️' },
  { key: 'security', label: 'Security', icon: '🔒' },
  { key: 'gardener', label: 'Gardener', icon: '🌱' },
  { key: 'electrician', label: 'Electrician', icon: '⚡' },
  { key: 'plumber', label: 'Plumber', icon: '🔧' },
  { key: 'carpenter', label: 'Carpenter', icon: '🔨' },
  { key: 'mechanic', label: 'Mechanic', icon: '⚙️' },
  { key: 'cleaner', label: 'Cleaner', icon: '🧽' },
  { key: 'delivery', label: 'Delivery', icon: '📦' },
  { key: 'other', label: 'Other', icon: '💼' },
];

export const SAMPLE_JOB_POSTS: JobPost[] = [
  {
    id: '1',
    title: 'House Maid Required',
    category: 'maid',
    description: 'Looking for experienced house maid for daily cleaning and maintenance work. Must be reliable and trustworthy. Responsibilities include cleaning rooms, kitchen, bathrooms, and general housekeeping tasks.',
    salary: {
      amount: 8000,
      type: 'monthly'
    },
    location: {
      address: 'Sector 15, Gurgaon',
      city: 'Gurgaon',
      state: 'Haryana',
      latitude: 28.4595,
      longitude: 77.0266
    },
    workingHours: '9 AM - 5 PM',
    requirements: ['Experience required', 'Local resident preferred', 'Trustworthy and reliable'],
    employerId: 'emp1',
    employer: {} as Employer,
    applicants: [],
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Personal Driver Needed',
    category: 'driver',
    description: 'Experienced driver required for family. Must have valid driving license and good knowledge of city routes. Will be responsible for daily commute and occasional outstation trips.',
    salary: {
      amount: 15000,
      type: 'monthly'
    },
    location: {
      address: 'Koramangala, Bangalore',
      city: 'Bangalore',
      state: 'Karnataka',
      latitude: 12.9279,
      longitude: 77.6271
    },
    workingHours: '8 AM - 8 PM',
    requirements: ['Valid driving license', '3+ years experience', 'Knowledge of city routes'],
    employerId: 'emp2',
    employer: {} as Employer,
    applicants: [],
    isActive: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    title: 'Cook for Restaurant',
    category: 'cook',
    description: 'Experienced cook needed for busy restaurant. Must know North Indian and Chinese cuisine. Should be able to handle high volume orders during peak hours.',
    salary: {
      amount: 800,
      type: 'daily'
    },
    location: {
      address: 'Connaught Place, Delhi',
      city: 'Delhi',
      state: 'Delhi',
      latitude: 28.6315,
      longitude: 77.2167
    },
    workingHours: '10 AM - 10 PM',
    requirements: ['Restaurant experience', 'Fast cooking skills', 'Knowledge of North Indian & Chinese cuisine'],
    employerId: 'emp3',
    employer: {} as Employer,
    applicants: [],
    isActive: true,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  }
];

export const SAMPLE_USERS: User[] = [
  {
    id: 'user1',
    name: 'Rajesh Kumar',
    phone: '+91 9876543210',
    role: 'job_seeker',
    city: 'Delhi',
    age: 35,
    gender: 'male',
    verified: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'user2',
    name: 'Priya Sharma',
    phone: '+91 9876543211',
    role: 'employer',
    city: 'Mumbai',
    age: 42,
    gender: 'female',
    verified: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];

export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' }
];

export const SAMPLE_NOTIFICATIONS = {
  job_seeker: [
    {
      id: '1',
      title: 'Job Application Selected',
      message: 'Congratulations! You have been selected for the Driver position at Koramangala.',
      type: 'success',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      title: 'New Job Match',
      message: 'A new Cook position in your area matches your profile.',
      type: 'info',
      time: '5 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'Application Deadline',
      message: 'Application deadline for House Maid position is tomorrow.',
      type: 'warning',
      time: '1 day ago',
      read: true
    }
  ],
  employer: [
    {
      id: '1',
      title: 'New Applications',
      message: '5 new applications received for your Driver position.',
      type: 'info',
      time: '1 hour ago',
      read: false
    },
    {
      id: '2',
      title: 'Similar Jobs Posted',
      message: '3 similar Cook positions posted in your area today.',
      type: 'info',
      time: '3 hours ago',
      read: false
    },
    {
      id: '3',
      title: 'Job Post Expiring',
      message: 'Your House Maid job post will expire in 2 days.',
      type: 'warning',
      time: '1 day ago',
      read: true
    }
  ]
};