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

import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../assets/images/photo.png')}
        />
        <View style={styles.ovalContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logoImage}
              source={require('../assets/images/logo.png')}
            />
          </View>
            <Text style={styles.suggestion}>
              Find the best events in Jamaica
            </Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  image :{
    height: Layout.window.height * 0.66,
    width: Layout.window.width
  },
  ovalContainer:{
    width:Layout.window.width * 1.12 ,
    height:Layout.window.height * 0.6,
    backgroundColor:'#ffffff',
    position:'absolute',
    borderRadius: 1400 / 3,
    top: Layout.window.height * 0.42, 
    left: -21, 
    right: 0, 
    bottom: 0,
  },
  imageContainer:{
    paddingTop: Layout.window.height * 0.10,
    justifyContent:'center',
    alignItems:'center'
  },
  logoImage:{
    height:Layout.window.height * 0.141 ,
    width: Layout.window.width * 0.54,
  },
  suggestion:{
    padding:25,
    textAlign:'center'
  },
});
