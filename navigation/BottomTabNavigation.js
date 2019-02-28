import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import CityEventDescription from '../screens/CityEventDescription';


import HomeScreen from '../screens/HomeScreen';
import HomeTab from '../screens/tabs/HomeTab';
import EventScreen from '../screens/Events';
import Notifications from '../screens/Notification';
import ViewAllCard from '../screens/ViewAllCard';
const HomeStack = createStackNavigator({
  Home: HomeTab,
  ViewAllCard:ViewAllCard,
  CityEventDescription:CityEventDescription,

});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

const EventStack = createStackNavigator({
  Event: EventScreen,
});

EventStack.navigationOptions = {
  tabBarLabel: 'My events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart-empty' : 'md-heart-empty'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Settings: Notifications,
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-notifications-outline' : 'md-notifications-outline'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: Notifications,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  EventStack,
  NotificationStack,
  AccountStack
});
