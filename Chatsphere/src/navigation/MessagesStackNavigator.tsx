import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MessagesStackParamList } from '@/types';
import MessagesScreen from '@/screens/main/MessagesScreen';

const Stack = createStackNavigator<MessagesStackParamList>();

const MessagesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MessagesList" component={MessagesScreen} />
    </Stack.Navigator>
  );
};

export default MessagesStackNavigator;