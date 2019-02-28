import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/setup';
import PermissionScreen from '../screens/permissionScreen';
// import EventScreen from '../screens/Events';
// import Notifications from '../screens/Notification';
import SignUpScreen from '../screens/Signup';
import HomeTab from '../screens/tabs/HomeTab';
import CityEventDescription from '../screens/CityEventDescription';
import TabNavigation from './BottomTabNavigation';
import Card from '../components/card';
import ViewAllCard from '../screens/ViewAllCard';
export default createAppContainer(createStackNavigator({
  // ViewAllCard:ViewAllCard,
  // Card:Card,
  Home:TabNavigation,
  // SignUpScreen:SignUpScreen,
  // Notification: Notifications,
  // Event: EventScreen,
  // Home: HomeScreen,
  CityEventDescription:CityEventDescription,
  // HomeTab:HomeTab,
  setup: SetupScreen,
  permission: PermissionScreen,
},
{
  defaultNavigationOptions: {
    header: null
  }
}
)); 