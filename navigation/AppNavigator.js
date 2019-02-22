import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/setup';
import PermissionScreen from '../screens/permissionScreen';
import HomeTab from '../screens/tabs/HomeTab';
export default createAppContainer(createStackNavigator({
  // Home: HomeScreen,
  HomeTab:HomeTab,
  setup: SetupScreen,
  permission: PermissionScreen,
})); 