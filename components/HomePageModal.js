import React, { Component } from "react";
import { Text, View ,StyleSheet ,Image} from "react-native";
import Layout from "../constants/Layout";
import {LinearGradient} from 'expo';
import Modal from "react-native-modalbox";
import { FontAwesome ,EvilIcons } from '@expo/vector-icons';

const image = [
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  },
  {
    image: "../assets/images/photo2.png"
  }
]

export default class HomePageModal extends Component {
  constructor(props){
    super(props);
    this.state={isOpen:true}
  }
  render() {
    const data = image.map((data, i) => {
      return (
        <View key={i} style={[styles.peopleLiked, { zIndex: image.length - i }]}>
          <Image
            style={styles.peopleLikedImage}
            source={require("../assets/images/photo2.png")}
          />
        </View>
      );
    });
    return (
      <Modal
        isDisabled={false}
        coverScreen={true}
        backdropPressToClose={true}
        swipeToClose={false}
        style={styles.modal}
        isOpen={this.state.isOpen}
        position={"bottom"}
      >
        <View style={{backgroundColor:'transparent'}}>
          <View style={{backgroundColor:'transparent',paddingBottom:20}}>
            <EvilIcons onPress={()=>this.setState({isOpen:false})} name='close' size={40} color="#fff"/>
          </View>
          <View style={{backgroundColor:'#fff',borderRadius:12}}>
          <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          colors={["#ff6cc9", "#8559f0"]}
          style={styles.header}
          >
          <View>
              <Text style={styles.headerText}>Happening now</Text>
          </View>
          </LinearGradient>
          <View style={styles.wrapper}>
                <View style={styles.eventName}>
                  <Text >Jamaica Carnival</Text>
                </View>
                <View style={styles.contentWrapper}>
                  <View style={styles.imageView}>
                    <Image style={{width:"100%",height:'100%'}} resizeMode='contain' source={require('../assets/images/photo2.png')} />
                  </View>
                  <View style={styles.buttonsView}>
                    <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#ff6cc9", "#8559f0"]}
                    style={styles.checkGrandient}
                    >
                          <Text style={styles.checkinText }>Check in</Text>
                    </LinearGradient>
                    <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#ff6cc9", "#8559f0"]}
                    style={styles.activityGradient}
                    >
                    <View style={styles.gradientChild}>
                      <Text style={styles.activityText}>Activity</Text>
                      </View>
                    </LinearGradient>
                  </View>
                </View>
                <View style={styles.likedPeopleView}>
                    {data}
                    <Text style={styles.checkedPeople}>233 checked in</Text>
                </View>

          </View>
        </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    width: Layout.window.width - 30,
    height: Layout.window.width-30,
    backgroundColor: "transparent",
    bottom:50
  },
  header:{
    flexDirection:'row',
    justifyContent:'center',
    height:50,
    alignItems:'center',
    borderTopLeftRadius:12,
    borderTopRightRadius:12
  },
  wrapper:{
    paddingLeft:15,
    paddingRight:15
  },
  imageView:{
    width:Layout.window.width/2.1,
    height:Layout.window.width/3.3
  },
  contentWrapper:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  buttonsView:{
    flexDirection:'column',
    justifyContent:'space-around'
  },
  checkGrandient:{
    width:Layout.window.width/3,
    height:(Layout.window.width/3.5)/2.5,
    borderRadius:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  activityGradient:{
    width:Layout.window.width/3,
    height:(Layout.window.width/3.5)/2.5,
    borderRadius:20,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  headerText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:20
  },
  eventName:{
    fontSize:17,
    marginTop:15,
    marginBottom:15
  },
  gradientChild:{
    width:"98%",
    height:"96%",
    backgroundColor:'#fff',
    borderRadius:19,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  checkinText:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:15
  },
  activityText:{
    color:'#ff6cc9',
    fontWeight:'bold',
    fontSize:17
  },
  peopleLiked: {
    width: 30,
    height: 30,
    marginLeft: -15,
    borderRadius: 1,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 28,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center"
  },
  peopleLikedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 24,
    position: "absolute",
  },
  likedPeopleView:{
    flexDirection:'row',
    marginLeft:15,
    marginTop:27,
    // justifyContent:'center',
    alignItems:'center',
    paddingBottom:27
  },
  checkedPeople:{
    marginLeft:10,
    
  }
  

});