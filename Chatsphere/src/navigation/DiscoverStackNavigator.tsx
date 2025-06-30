import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DiscoverStackParamList } from '@/types';
import DiscoverScreen from '@/screens/main/DiscoverScreen';

const Stack = createStackNavigator<DiscoverStackParamList>();

const DiscoverStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverFeed" component={DiscoverScreen} />
    </Stack.Navigator>
  );
};

export default DiscoverStackNavigator;