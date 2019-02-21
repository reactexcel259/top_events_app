import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';

import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
let logo  = require('../assets/images/logo.png')
let arrow  = require('../assets/images/arrow.svg')

let AllowMessage = 'Tap "Allow" because we want to send you useful note, remind if the Event you are atteing is comming soon or remind you to check in.'

export default class PermissionScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{justifyContent:'flex-start',marginTop:100}} >
          <Image source={logo} size={10} style={{height:102,width:220}} />
        </View>

        <View style={{margin:10,justifyContent:'center',marginBottom:80}} >
          <Image source={arrow} style={{borderWidth:1}} />          
          <Text style={{textAlign:'center'}} > 
            {AllowMessage}
          </Text>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
    flexDirection:'column',
    alignItems:'center'
  },
});
