import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Image
} from "react-native";
import { LinearGradient } from "expo";
import Touch from "react-native-touch";
import Layout from "../constants/Layout";

export default class Activity extends Component {

  onCloseActivity = () => this.props.navigation.goBack()

  render() {
    const item = this.props.navigation.getParam('item') || {};
    console.log(item,'dsfdsfdfsdfs')
    return (
     <ScrollView>
       <View style={{zIndex:0,flex:1}}>
        <LinearGradient
            style={styles.linearGradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 1 }}
            colors={["#ff6cc9", "#8559f0"]}
        >
            <View style = {styles.headerView}>
                <View style={styles.emptyView} />
                <View style={styles.activityTextView}>
                    <Text style = {styles.activityText}>Activity</Text>
                </View>
                <View style = {styles.closeBtnView}>
                    <Touch onPress={this.onCloseActivity}>
                        <Text style = {styles.closeText}>Close</Text>
                    </Touch> 
                </View>
            </View>
            <View style={styles.imageView}>
                <Image style={styles.image} source = {{uri:item.image.secure_url}} />
            </View>
        </LinearGradient>
        <View style={styles.eventDescriptionView} >
            <Text>{item.title}</Text>
        </View>
        </View>
     </ScrollView>
    )
  }
}

const  styles = StyleSheet.create({
    linearGradient: {
    width: Layout.window.width,
    height: Layout.window.width * 0.6,
    flexDirection: "column",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 17,
    paddingTop: Layout.window.width / 9
  },
  headerView : {
    flexDirection: "row",
    width: Layout.window.width,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems:"center"
  },
  emptyView:{
    flex:1
  },
  activityTextView:{
    flex:1,
    flexDirection:"row",
    justifyContent: "center",
    alignItems:"center"
  },
  closeBtnView : {
    flex: 1,
    flexDirection:"row",
    justifyContent:"flex-end",
    alignItems:"center"
  },
  closeText : {
    color : "white",
    textTransform : "uppercase",
  },
  activityText : {
    color: "white",
    fontWeight : "600",
  },
  imageView:{
     position:"absolute",
    top:Layout.window.width * 0.3,
     zIndex:1000,
    width:Layout.window.width,
    height:Layout.window.width/2,
    borderRadius:5,
    overflow:"hidden"
  },
  image : {
    width:"100%",
    height:"100%",
    resizeMode:'center'
    },
  eventDescriptionView : {
    marginTop:Layout.window.width * 0.3
  }
})
