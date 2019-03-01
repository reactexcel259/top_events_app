import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { LinearGradient, Font } from 'expo';


import Attending from './Attending';
import Wishlist from './wishlist';

const attendingScreen = createStackNavigator({
  Attending: Attending,
});

attendingScreen.navigationOptions = {
  tabBarLabel: props => <Text style={{color:'black'}} > Attending </Text>,
  tabBarOptions: {
    // activeTintColor:'gray',
    tintColor:'gray', 
    labelStyle: {
      fontSize: 12,
      padding:0,
      margin:0,
    },
    style:{
      backgroundColor:'#FFFFFF',
      height:40
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const wishlistScreen = createStackNavigator({
  Wishlist: Wishlist,
});

wishlistScreen.navigationOptions = {
  tabBarLabel: props => <Text style={{color:'black'}} > WishList </Text>,
  tabBarOptions: {
    labelStyle: {
      fontSize: 12,
      padding:0,
      margin:0,
    },
    style:{
      backgroundColor:'#FFFFFF',
      height:40      
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createMaterialTopTabNavigator({
  attendingScreen,
  wishlistScreen,
});