import React from 'react';
import { createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation';
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
import CheckIn from '../screens/CheckIn';
import Activity from "../screens/Activity"
import ChangePassword from '../screens/ChangePassword';
import AccountSettingScreen from '../screens/AccountSetting';
import ManageNotificationScreen from '../screens/ManageNotification';


const Routers = createAppContainer(createStackNavigator({
  Home: HomeScreen,
  setup: SetupScreen,
  SignUpScreen:SignUpScreen,
  HomeTab:TabNavigation,
  CityEventDescription:CityEventDescription,
  ChangePassword: ChangePassword,
  CheckIn:CheckIn,
  Activity: Activity,
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

const defaultGetStateForAction = Routers.router.getStateForAction;

Routers.router.getStateForAction = (action, state) => {
  if (
    state &&
    state.routes[state.index].routeName == "HomeTab" &&
    state.routes[state.index].index == 0 &&
    state.routes[state.index].routes[state.routes[state.index].index].routeName == "HomeStack" &&
    state.routes[state.index].routes[state.routes[state.index].index].index == 0 &&
    action.type === NavigationActions.BACK
  ) {
    // Returning null from getStateForAction means that the action
    // has been handled/blocked, but there is not a new state
    return null;
  } else {
    return defaultGetStateForAction(action, state);
  }
  
};

export default Routers;