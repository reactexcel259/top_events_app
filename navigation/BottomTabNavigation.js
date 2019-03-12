import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import CityEventDescription from '../screens/CityEventDescription';
import CustomHeader from '../components/header';

import HomeScreen from '../screens/HomeScreen';
import HomeTab from '../screens/tabs/HomeTab';
import EventScreen from '../screens/Events';
import Notifications from '../screens/Notification';
import MyAccountScreen from '../screens/Account';
import ViewAllCard from '../screens/ViewAllCard';
import { LinearGradient, Font } from 'expo';


const HomeStack = createStackNavigator({
  Homes: HomeTab,
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
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const EventStack = createStackNavigator({
  // Event: EventScreen,
  Event: {
    screen: EventScreen,
    navigationOptions: ({ navigation }) =>({
      header : (
        <CustomHeader 
          isCenter
          centerTitle={'My events'}
        />
      )
    }),
  }
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
  Account: MyAccountScreen,
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
  AccountStack,
});
