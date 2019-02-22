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
  renderIcon = (icon) => {
    return icon.map((value,i)=>{
      return (
          <TouchableOpacity onPress={()=>{}} >
            <View>
              <FontAwesome
              key={i} 
              name={value} size={32} style={{margin:5}} color="green" />
            </View>
          </TouchableOpacity>
      )
    })
  }
  
  render() {
    const { 
      step, 
      isLeft,
      leftIcon,
      leftTitle,
      leftPress,
      isCenter,
      centerImage,
      centerTitle,
      isRight,
      rightTitle,
      rightIcon,
      } = this.props
      console.log('left',this.props)
    let stepWidth = 0.333 * step
    return (
      <View style={styles.mainContainer} >
      <StatusBar
      hidden
      />
        {
          step &&
        <View style={[styles.progress,{width: Layout.window.width * stepWidth}]} >
          <LinearGradient
            colors={['#FF6CC9','#8559F0']}
            style={{ flex: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
        }
      <View style={styles.container}>
       {
         isLeft ?
        <View style={styles.containerLeft} >
          <View style={{marginLeft:15}} >
            {
              leftIcon &&
              <TouchableOpacity onPress={leftPress} >
                <View>
                <FontAwesome 
                name={leftIcon} size={32} color="green" />
                </View>
              </TouchableOpacity>
            }
            {
              leftTitle &&
              <Text>{leftTitle}</Text>
            }
          </View>
        </View>
        :
        <View style={styles.containerLeft} />
       } 
       {
         isCenter ?
        <View style={styles.containerCenter} >
            <View >
              {
                centerImage &&
                <Image
                  style={styles.logoImage}
                  source={require('../assets/images/logo.png')}
                />
              }
              {
                centerTitle &&
                <Text>{centerTitle}</Text>
              }
            </View>
        </View>
        :
        <View style={styles.containerCenter} />
       }
       
       {
         isRight ?
        <View style={styles.containerRight} >
            <View style={{marginRight:15,flexDirection:'row'}} >
                {
                  rightTitle &&
                  <Text>{rightTitle}</Text>
                }
                {
                  rightIcon &&
                  <View style={{flexDirection:'row'}} >
                    {this.renderIcon(rightIcon)}
                  </View>
                }
              </View>
        </View>
        :
        <View style={styles.containerRight} />
       }
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
  logoImage:{
    height:42,
    width: 90,
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
