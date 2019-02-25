import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/setup';
import PermissionScreen from '../screens/permissionScreen';
import EventScreen from '../screens/Events';

export default createAppContainer(createStackNavigator({
  Event: EventScreen,
  // Home: HomeScreen,
  // setup: SetupScreen,
  // permission: PermissionScreen,
})); 