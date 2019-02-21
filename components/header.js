import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';

export default class CustomHeader extends React.Component {
  
  
  render() {
    const { step } = this.props
    let stepWidth = 0.333 * step
    return (
      <View style={styles.mainContainer} >
      <StatusBar
      hidden
      />
        <View style={[styles.progress,{width: Layout.window.width * stepWidth}]} >
          <LinearGradient
            colors={['#FF6CC9','#8559F0']}
            style={{ flex: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
      <View style={styles.container}>
        <View style={styles.containerLeft} >
          <View style={{marginLeft:15}} >
            <FontAwesome 
            name="angle-left" size={32} color="green" />
            <Text>asdasd</Text>
          </View>
        </View>
        <View style={styles.containerCenter} >
            <View >
              <Text>asdasd</Text>
            </View>
        </View>
        <View style={styles.containerRight} >
            <View style={{marginRight:15,flexDirection:'row'}} >
                <Text>asdasd</Text>
                <FontAwesome 
                  name="angle-left" size={32} color="green" />
                <FontAwesome 
                  name="angle-left" size={32} color="green" />
              </View>
        </View>
      </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer:{
    height: Layout.window.height * 0.12,
  },
  progress:{
    flexDirection:'row',
    height:Layout.window.height * 0.012,
  },
  container:{
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  containerLeft:{
    justifyContent:'center',
    alignItems:'flex-start'
  },
  containerCenter:{
    justifyContent:'center'
  },
  containerRight:{
    justifyContent:'center',
    alignItems:'flex-end'
  }
});
