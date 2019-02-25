import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import Layout from "../constants/Layout";
import { LinearGradient, Font } from 'expo';
import { FontAwesome } from '@expo/vector-icons';

export default class Card extends React.Component {
  render() {
    const { isWishlist } = this.props;
    return (
        <View style={{elevation:5,flexDirection:'column',justifyContent:'space-between',backgroundColor:'white',borderRadius:5,height:320,margin:10}} >
            <Image
              source={require('../assets/images/photo.png')}
              style={{height:150,width:Layout.window.width * 0.912,borderRadius:5,margin:5}}
              mode="contain"
            />

            <View style={{marginTop:5,marginBottom:5}} >
              <Text style={{fontSize:20,fontWeight:'600'}} > THIS Is Title </Text>
            </View>

            <View style={{margin:5,flexDirection:'column'}} >
              <View style={{flexDirection:'row',margin:2,justifyContent:'space-between'}} >
                  <View style={{justifyContent:'flex-start',flexDirection:'row'}} >
                    <Image source={require('../assets/images/map.png')} style={{margin:4}} />
                    <Text> Concert Hall </Text>
                  </View>
                  <View style={{justifyContent:'flex-start',flexDirection:'row',width:Layout.window.width * 0.4}} >
                    <Image source={require('../assets/images/cost.png')} style={{margin:4}} />
                    <Text> from $45 </Text>
                  </View>
              </View>
              <View style={{flexDirection:'row',margin:2,justifyContent:'space-between'}} >
                  <View style={{justifyContent:'flex-start',flexDirection:'row'}} >
                    <Image source={require('../assets/images/time.png')} style={{margin:4}} />
                    <Text> Concert Hall </Text>
                  </View>
                  <View style={{justifyContent:'flex-start',flexDirection:'row',width:Layout.window.width * 0.4}} >
                    <Image source={require('../assets/images/web.png')} style={{margin:4}} />
                    <Text> from $45 </Text>
                  </View>
              </View>
            </View>
            { isWishlist  ?
              <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginBottom:10}} >
                <View style={{alignSelf:'flex-start',alignSelf:'center',marginLeft:5}} >
                  <Image source={require('../assets/images/heart.png')}  />
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',marginRight:15,width:Layout.window.width * 0.5}} >
                    <Text style={{alignSelf:'center',color:'#F66BCC'}} > Intreseted </Text>
                    <Image source={require('../assets/images/heart_full.png')} style={{margin:4}} />
                </View>
              </View>
            :
            <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',marginBottom:10}} >
              <View style={{alignSelf:'flex-start',alignSelf:'center',marginLeft:5}} >
                <Image source={require('../assets/images/heart.png')}  />
                {/* <Image source={require('../assets/images/heart_full.png')}  /> */}
              </View>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginRight:5,width:Layout.window.width * 0.5}} >
                  <View style={{justifyContent:'center'}} >
                      <Image source={require('../assets/images/heart.png')}  />
                  </View>
                  <View>
                      <View style={{borderWidth:1,alignItems:'center',justifyContent:'center',borderRadius:20,width:100,height:40}} >
                        <Text style={{alignSelf:'center'}} > You're going </Text>
                      </View>
                  </View>
              </View>
            </View>
            }
        </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'lightgray'
  },
});
