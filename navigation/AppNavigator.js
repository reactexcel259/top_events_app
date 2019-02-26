import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/setup';
import PermissionScreen from '../screens/permissionScreen';
import EventScreen from '../screens/Events';
import Notifications from '../screens/Notification';
import SignUpScreen from '../screens/Signup';
import HomeTab from '../screens/tabs/HomeTab';
import CityEventDescription from '../screens/CityEventDescription';

export default createAppContainer(createStackNavigator({
  SignUpScreen:SignUpScreen,
  Notification: Notifications,
  Event: EventScreen,
  // Home: HomeScreen,
  CityEventDescription:CityEventDescription,
  HomeTab:HomeTab,
  setup: SetupScreen,
  permission: PermissionScreen,
})); 