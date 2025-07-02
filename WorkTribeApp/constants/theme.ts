import { Theme } from '../types';

export const COLORS = {
  // Job Seeker Theme (Blue)
  jobSeeker: {
    primary: '#2563EB',
    primaryLight: '#3B82F6',
    primaryDark: '#1E40AF',
    background: '#FFFFFF',
    surface: '#F8FAFC',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    accent: '#F59E0B',
  },
  
  // Employer Theme (Green)
  employer: {
    primary: '#059669',
    primaryLight: '#10B981',
    primaryDark: '#047857',
    background: '#FFFFFF',
    surface: '#F0FDF4',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#D1FAE5',
    accent: '#F59E0B',
  },
  
  // Dark Mode Job Seeker (Black + Dark Blue)
  darkJobSeeker: {
    primary: '#3B82F6',
    primaryLight: '#60A5FA',
    primaryDark: '#1E40AF',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    accent: '#F59E0B',
  },
  
  // Dark Mode Employer (Black + Dark Green)
  darkEmployer: {
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryDark: '#047857',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    border: '#334155',
    accent: '#F59E0B',
  },
  
  // Common Colors
  common: {
    white: '#FFFFFF',
    black: '#000000',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    info: '#3B82F6',
  }
};

export const getThemeColors = (userRole: 'job_seeker' | 'employer' | null, theme: Theme) => {
  if (theme === 'dark') {
    if (userRole === 'employer') {
      return COLORS.darkEmployer;
    }
    return COLORS.darkJobSeeker;
  }
  
  if (userRole === 'employer') {
    return COLORS.employer;
  }
  
  return COLORS.jobSeeker;
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};