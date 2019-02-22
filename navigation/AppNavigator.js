import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/setup';
import PermissionScreen from '../screens/permissionScreen';

export default createAppContainer(createStackNavigator({
  Home: HomeScreen,
  setup: SetupScreen,
  permission: PermissionScreen,
})); 