// Mock API client for development
// In production, this would use axios or fetch

interface ApiResponse {
  data: any;
  status: number;
  statusText: string;
}

interface ApiClient {
  get(url: string): Promise<ApiResponse>;
  post(url: string, data?: any): Promise<ApiResponse>;
  put(url: string, data?: any): Promise<ApiResponse>;
  delete(url: string): Promise<ApiResponse>;
}

// Mock implementation for development
const createMockResponse = (data: any, status: number = 200): ApiResponse => ({
  data,
  status,
  statusText: status === 200 ? 'OK' : 'Error',
});

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@university.edu',
  avatar: 'https://via.placeholder.com/150',
  university: 'University of Technology',
  year: 3,
  major: 'Computer Science',
  bio: 'Passionate about technology and making connections',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const apiClient: ApiClient = {
  async get(url: string): Promise<ApiResponse> {
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === '/auth/me') {
      return createMockResponse({ success: true, data: mockUser });
    }
    
    return createMockResponse({ success: true, data: [] });
  },

  async post(url: string, data?: any): Promise<ApiResponse> {
    // Mock delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (url === '/auth/login') {
      if (data.email === 'demo@university.edu' && data.password === 'password') {
        return createMockResponse({ success: true, data: mockUser });
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    if (url === '/auth/register') {
      return createMockResponse({ success: true, data: { ...mockUser, ...data } });
    }
    
    if (url === '/auth/logout') {
      return createMockResponse({ success: true, data: null });
    }
    
    return createMockResponse({ success: true, data: {} });
  },

  async put(url: string, data?: any): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return createMockResponse({ success: true, data: data });
  },

  async delete(url: string): Promise<ApiResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return createMockResponse({ success: true, data: null });
  },
};