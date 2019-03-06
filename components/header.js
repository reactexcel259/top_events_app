import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Share
} from 'react-native';
import { WebBrowser, LinearGradient } from 'expo';
import { FontAwesome ,EvilIcons } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';

export default class CustomHeader extends React.Component {
  renderIcon = (icon) => {
    return icon.map((value,i)=>{
      return (
          <TouchableOpacity key={i} onPress={value =="share-google" ? ()=>this.props.onShare() : ()=>this.props.onEventLike()} >
            <View style={{width:40}} >
            {value !=="share-alt" && (value != "heart-o" || value != "heart" ) ? 
            <FontAwesome
              key={i} 
              name={value} size={30} style={{margin:5}} color="white" />
            :<FontAwesome
              key={i} 
              name={value} size={30} style={{margin:5}} color="white" />}
            </View>
          </TouchableOpacity>
      )
    })
  }
  
  render() {
    const { 
      gradieantStyle,
      gradieantColor,
      gradieantEnd,
      gradieantStart,
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
      headerColors
      } = this.props
    let stepWidth = 0.50 * step;
    return (
      <View style={styles.mainContainer} >
      {/* <StatusBar
      hidden
      /> */}
        {
          step &&
        <View style={[styles.progress,{width: Layout.window.width * stepWidth}]} >
          <LinearGradient
            colors={['#8559F0','#8559F0']}
            style={{ flex: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          />
        </View>
        }
      <LinearGradient
        colors={gradieantColor? gradieantColor :["#FF6CC9","#8559F0"]}
        style={[gradieantStyle ? gradieantStyle :{ flex: 1,justifyContent:'center' }]}
        start={gradieantStart? gradieantStart : [0, 0]}
        end={gradieantEnd? gradieantEnd : [1, 0]}
      >
      <View style={styles.container}>
       {
         isLeft ?
        <View style={styles.containerLeft} >
          <View style={{marginLeft:15}} >
            {
              leftIcon &&
              <TouchableOpacity onPress={leftPress} >
                <View style={{width:40}} >
                <FontAwesome 
                name={leftIcon} onPress={leftPress} size={32} color="white" />
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
        <View style={[styles.containerCenter,isLeft ? {marginLeft:-40}:{}]} >
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
                <Text style={styles.centerText} >{centerTitle}</Text>
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
       </LinearGradient>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  mainContainer:{
    height: 80,
    justifyContent:'center',
    elevation:1,
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
    justifyContent:'center',
    alignItems:'center'
  },
  centerText:{
    fontWeight: '500',
    fontSize:18,
    color:'white'
  },
  containerRight:{
    justifyContent:'center',
    alignItems:'flex-end'
  }
});
