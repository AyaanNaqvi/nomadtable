import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AppProvider, useApp } from './src/context/AppContext';
import ExploreScreen from './src/screens/ExploreScreen';
import SavedScreen from './src/screens/SavedScreen';
import ChatScreen from './src/screens/ChatScreen';
import ChatThreadScreen from './src/screens/ChatThreadScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';
import { colors } from './src/theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    card: '#fff',
    border: colors.divider,
    primary: colors.primary,
    text: colors.text,
  },
};

const tabIcons = {
  Saved: 'bookmark-outline',
  Explore: 'airplane-outline',
  Chat: 'chatbubble-ellipses-outline',
  Profile: 'person-outline',
};

function Tabs() {
  const { unreadChatCount } = useApp();
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: colors.divider,
        },
        tabBarBadge:
          route.name === 'Chat' && unreadChatCount > 0 ? unreadChatCount : undefined,
        tabBarBadgeStyle: { backgroundColor: colors.primary },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? tabIcons[route.name].replace('-outline', '') : tabIcons[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{ presentation: 'modal' }}
          />
          <Stack.Screen
            name="ChatThread"
            component={ChatThreadScreen}
            options={{ presentation: 'card' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
