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
import { WebBrowser, LinearGradient } from 'expo';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
import {isIphone} from '../constants/Layout';

export default class CustomeButton extends React.Component {
  render() {
    
    const { buttonText, buttonSize, textColor, gradientColor, onPress } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress} >
          <View style={[ buttonSize !== undefined && buttonSize =='small' ? styles.buttonSmallContainer : styles.buttonContainer]} >
          <LinearGradient
            colors={gradientColor}
            style={{ flex: 1 }}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.gradientStyle}
          >
            <Text style={[styles.buttonText,{color:textColor}]} > 
              {buttonText}
            </Text>
          </LinearGradient>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
  },
  gradientStyle: {
    padding: 15, 
    alignItems: 'center', 
    borderRadius: 25
  },
  buttonSmallContainer: {
    height:40, 
    width:Layout.window.width * 0.350
  },
  buttonContainer: {
    height:isIphone() ? 46 : 40, 
    width:Layout.window.width * 0.610
  },
  buttonText: {
    textAlign:'center',
    alignSelf:'center',
  }
});
