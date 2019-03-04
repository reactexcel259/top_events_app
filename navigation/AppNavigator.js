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
import ProfileSettingScreen from '../screens/ProfileSetting';
import ManageNotificationScreen from '../screens/ManageNotification';
import AccountSettingScreen from '../screens/AccountSetting';
import ChangePassword from '../screens/ChangePassword';


export default createAppContainer(createStackNavigator({
  Home: HomeScreen,
  HomeTab:TabNavigation,
  SignUpScreen:SignUpScreen,
  CityEventDescription:CityEventDescription,
  ChangePassword: ChangePassword,
  setup: SetupScreen,
  permission: PermissionScreen,
  ProfileSetting: ProfileSettingScreen,
  AccountSetting: AccountSettingScreen,
  ManageNotification: ManageNotificationScreen,
},
{
  defaultNavigationOptions: {
    header: null
  }
}
)); 