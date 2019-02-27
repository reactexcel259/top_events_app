import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Layout from "../constants/Layout";
import { LinearGradient, MapView } from "expo";
import CommentSection from '../components/CommentSection';

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
  }
];

export default class CityEventDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAboutTab:false,
      isDiscussionTab: true
    };
  }
  render() {
    const data = image.map((data, i) => {
      return (
        <View style={[styles.peopleLiked, { zIndex: image.length - i }]}>
          <Image
            style={styles.peopleLikedImage}
            source={require("../assets/images/photo2.png")}
          />
        </View>
      );
    });
    return (
      <ScrollView>
        <View>
          <LinearGradient colors={["#ff6cc9", "#8559f0"]}>
            <View style={styles.firstSectionWrapper}>
              <View style={styles.firstChild}>
                <View style={styles.imageWrapper}>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={require("../assets/images/photo2.png")}
                  />
                </View>
                <View style={styles.eventWrapper}>
                  <Text style={styles.eventName}>Jamaica Carnival</Text>
                  <Text style={styles.website}>website.com</Text>
                </View>
                <View style={styles.time}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/images/time.png")}
                  />
                  <View style={styles.timeWrapper}>
                    <Text style={styles.dateDay}>7 Dec ,Friday</Text>
                    <Text>19:00 - 22:00</Text>
                  </View>
                </View>
                <View style={styles.time}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/images/cost.png")}
                  />
                  <Text style={styles.dollar}>from $45</Text>
                </View>
                <View style={styles.peopleWrapper}>
                  <View style={styles.peppleLikedWrapper}>{data}</View>
                  <Text style={styles.totalPeople}>4.5K people interested</Text>
                </View>
                <View>
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#ff6cc9", "#8559f0"]}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Joing event</Text>
                  </LinearGradient>
                  <View>{/* <Image /> */}</View>
                </View>
              </View>
              <View />
            </View>
            <View style={styles.mapView}>
              <MapView
                style={{ flex: 1, height: Layout.window.height * 0.23 }}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
              />
              <View style={styles.mapDescription}>
                <View style={styles.lacationName}>
                  <Image source={require('../assets/images/map.png')}/>
                  <Text style={styles.locationText}>Kingston ,Concert Hall</Text>
                </View>
                <View style={styles.getDirectionButton}>
                  <Text style={styles.buttonText}>Get Direction</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View style={styles.tabWrapper}>
              <View style={[styles.tab]}>
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() =>
                this.setState({ isAboutTab: true, isDiscussionTab: false })
              }
            >
                <Text>About</Text>
                </TouchableOpacity>
                {this.state.isAboutTab && (
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#ff6cc9", "#8559f0"]}
                    style={styles.gradientBar}
                  />
                )}
              </View>
              <View style={[styles.tab]}>
            <TouchableOpacity
              activeOpacity={0.1}
              onPress={() =>
                this.setState({ isAboutTab: false, isDiscussionTab: true })
              }
            >
                <Text>Discussion</Text>
                </TouchableOpacity>
                {this.state.isDiscussionTab && (
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#ff6cc9", "#8559f0"]}
                    style={styles.gradientBar}
                  />
                )}
              </View>
          </View>
          {this.state.isAboutTab && (
            <View style={styles.aboutUsWrapper}>
              <View style={styles.eventDescription}>
                <Text>
                  Expo is the easiest way to start building a new React Native
                  application. It allows you to start a project without
                  installing or configuring any tools to build native code - no
                  Xcode or Android Studio installation required (see Caveats).
                </Text>
              </View>
              <View style={styles.video}>
                <Image
                  style={styles.videoImage}
                  source={require("../assets/images/placeholder-copy.png")}
                />
              </View>
            </View>
          )}
          {this.state.isDiscussionTab && (
            <View style={styles.discussionWrapper}>
              <CommentSection />
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  imageWrapper: {
    width: "100%",
    height: Layout.window.height / 3
    // paddingLeft:15,
    // paddingRight:15,
    // borderWidth:5,
    // borderColor:'red'
  },
  image: {
    width: "100%",
    height: "100%"
  },
  firstSectionWrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    width: Layout.window.width
    // backgroundColor: "green",
    // height: Layout.window.height - 80
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold"
  },
  eventWrapper: {
    marginTop: 20,
    marginBottom: 2,
    paddingLeft: 30
  },
  website: {},
  time: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 30
  },
  timeWrapper: {
    marginTop: -5
  },
  dollar: {
    marginTop: -5
  },
  icon: {
    marginRight: 20
  },
  peopleLiked: {
    width: 35,
    height: 35,
    marginLeft: -20,
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
    position: "absolute"
  },
  peppleLikedWrapper: {
    flexDirection: "row"
  },
  peopleWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 50,
    marginTop: 20,
    alignItems: "center"
  },
  totalPeople: {
    marginLeft: 15
  },
  dateDay: {
    fontWeight: "bold"
  },
  button: {
    width: Layout.window.width / 1.2,
    height: 60,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40,
    marginTop: 30
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18
  },
  firstChild: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: Layout.window.height - 100
  },
  tab: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: Layout.window.width / 2
  },
  tabWrapper: {
    flexDirection: "row",
    width: Layout.window.width,
    height: Layout.window.height * 0.09,
},
aboutUsWrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
    marginTop:15
  },
  discussionWrapper: {
    marginTop:15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  video: {
    width: "100%",
    marginTop: 20
  },
  videoImage: {
    width: "100%"
  },
  gradientBar: {
    height: 2,
    width: "100%",
    zIndex: 1,
    position: "absolute",
    bottom: 0
  },
  mapView: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    paddingTop: 30,
    paddingBottom: 30
    //   backgroundColor:'red'
  },
  mapDescription:{
      flexDirection:"row",
      justifyContent:'space-between',
      marginTop:7
  },
  lacationName:{
    flexDirection:"row",
    justifyContent:'center',
    alignItems:'center'
  },
  getDirectionButton:{
      backgroundColor:"#ff6cc9",
      width:Layout.window.width*.32,
      height:Layout.window.height*.05,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:5
  },
  locationText:{
      marginLeft:10,
      color:'#fff'
  },
  buttonText:{
      color:'#fff'
  }
});
