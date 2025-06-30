import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarStackParamList } from '@/types';
import CalendarScreen from '@/screens/main/CalendarScreen';

const Stack = createStackNavigator<CalendarStackParamList>();

const CalendarStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CalendarView" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

export default CalendarStackNavigator;