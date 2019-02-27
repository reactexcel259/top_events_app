import React, { Component } from 'react'
import { Text, View ,StyleSheet,TextInput,Image} from 'react-native';
import Layout from '../constants/Layout';

export default class CommentSection extends Component {
  render() {
    return (
      <View style={{flex:1,paddingBottom:200}}>
        <View style={styles.wrapper}>
            <Image style={styles.userAvatar} source={require('../assets/images/guide-small.png')} />
            <TextInput multiline={true} style={styles.inputText} placeholder="Ask question or share your experience hare"/>
            <Image style={styles.userAvatar} source={require('../assets/images/guide-small.png')} />
        </View>
      </View>
    )
  }
}
const styles=StyleSheet.create({
    inputText:{
        borderWidth:1,
        height:Layout.window.height*.1,
        width:Layout.window.width*.55,
        flexWrap:"wrap",
        borderRadius:7,
        paddingLeft:7,
        paddingLeft:7
    },
    wrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:7,
        paddingRight:7
    },
    userAvatar:{
        width:Layout.window.width*.13,
        height:Layout.window.width*.13,
        borderRadius:30,
    }
})