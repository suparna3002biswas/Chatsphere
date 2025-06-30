# Chatsphere - University Club Social App

A complete React Native mobile application for college students to discover, join, and engage with university clubs. Built with modern design principles, TypeScript, and a comprehensive feature set.

## 🎯 Features

### Core Functionality
- **User Authentication** - Login, registration, and password recovery
- **Home Feed** - Discover trending clubs and upcoming events
- **Club Discovery** - Search and filter clubs by category
- **Event Calendar** - View and manage club events with calendar integration
- **Real-time Messaging** - Chat with club members and groups
- **User Profiles** - Comprehensive user profiles with club memberships

### Key Highlights
- 🎨 **Modern UI/UX** - Clean, youthful design with gradient accents
- 📱 **Cross-platform** - Built with React Native for iOS and Android
- 🔐 **Type Safety** - Full TypeScript implementation
- 🏪 **State Management** - Redux Toolkit with persistence
- 🎭 **Mock Data** - Complete demo functionality with sample data
- 📐 **Responsive Design** - Optimized for various screen sizes

## 🏗️ Architecture

### Project Structure
```
Chatsphere/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/          # Screen components
│   │   ├── auth/         # Authentication screens
│   │   └── main/         # Main app screens
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API services and utilities
│   ├── store/           # Redux store and slices
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Utility functions
├── android/             # Android-specific code
├── ios/                 # iOS-specific code
└── __tests__/          # Test files
```

### Technology Stack
- **React Native 0.80.1** - Mobile app framework
- **TypeScript** - Type safety and better development experience
- **Redux Toolkit** - State management
- **React Navigation 6** - Navigation library
- **React Native Vector Icons** - Icon library
- **React Native Linear Gradient** - Gradient support
- **React Native Calendars** - Calendar component
- **React Native Async Storage** - Local storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native development environment
- Android Studio / Xcode for simulators
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chatsphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the application**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   
   # Start Metro bundler
   npm start
   ```

### Demo Credentials
Use these credentials to test the login functionality:
- **Email:** demo@university.edu
- **Password:** password

## 📱 Screens Overview

### Authentication Flow
- **Login Screen** - Email/password authentication with modern UI
- **Registration Screen** - Multi-field registration form
- **Forgot Password** - Password recovery functionality

### Main App Flow
- **Home Feed** - Trending clubs, upcoming events, personalized content
- **Discover** - Club search with category filters and detailed cards
- **Calendar** - Event calendar with month/agenda views
- **Messages** - Chat list with online indicators and unread counts
- **Profile** - User information, stats, settings, and logout

## 🎨 Design System

### Color Palette
- **Primary:** Purple gradient (#6B46C1 to #9333EA)
- **Background:** Light gray (#F9FAFB)
- **Cards:** White (#FFFFFF)
- **Text:** Charcoal (#111827) and gray variants
- **Accent:** Purple (#6B46C1)

### Typography
- **Headers:** Bold, large text (24-32px)
- **Body:** Regular text (14-16px)
- **Captions:** Small text (12px)
- **Font Weight:** 300-700 range for hierarchy

### Components
- **Rounded corners** - 12-16px border radius
- **Shadows** - Subtle elevation with shadow/elevation
- **Cards** - White backgrounds with gentle shadows
- **Buttons** - Gradient backgrounds with rounded corners

## 🔧 Configuration

### Development Setup
1. **Path Mapping** - Configured with `@/` alias for clean imports
2. **ESLint** - Code linting with TypeScript support
3. **Prettier** - Code formatting configuration
4. **Metro Config** - Bundle configuration for React Native

### State Management
- **Redux Toolkit** - Modern Redux with slices
- **Persistence** - User authentication state persistence
- **Type Safety** - Full TypeScript integration

## 📚 Key Features Detail

### Home Feed
- Trending clubs carousel
- Upcoming events list
- Personalized recommendations
- Modern card-based layout

### Club Discovery
- Search functionality
- Category filtering
- Detailed club cards with tags
- Join/leave functionality

### Event Calendar
- Month and agenda views
- Event filtering
- Color-coded events
- Event details and RSVP

### Messaging System
- Real-time chat interface
- Group and direct messages
- Online status indicators
- Unread message counts

### User Profile
- Comprehensive user information
- Club membership statistics
- Settings and preferences
- Logout functionality

## 🔮 Future Enhancements

### Planned Features
- Real-time notifications
- Image sharing in chats
- Event creation and management
- Club administration tools
- Social media integration
- Push notifications
- Offline support
- Chat media sharing

### Technical Improvements
- API integration
- Real-time messaging with WebSocket
- Image upload and management
- Enhanced search with filters
- Performance optimizations
- Automated testing suite

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Review the documentation
- Check the troubleshooting guide

---

**Chatsphere** - Connecting university communities, one club at a time! 🎓✨
