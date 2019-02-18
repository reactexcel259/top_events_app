import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: HomeScreen,
  };

  render() {
    return (
      <Text>
        HomeScreen 
      </Text>
    );
  }

}

const styles = StyleSheet.create({
  //Conatiner Styles
});
