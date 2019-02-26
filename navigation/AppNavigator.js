import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/setup';
import PermissionScreen from '../screens/permissionScreen';
import EventScreen from '../screens/Events';
import Notifications from '../screens/Notification';

export default createAppContainer(createStackNavigator({
  Notification: Notifications,
  Event: EventScreen,
  // Home: HomeScreen,
  // setup: SetupScreen,
  // permission: PermissionScreen,
})); 