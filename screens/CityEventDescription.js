import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from "react-native";
import Layout from "../constants/Layout";
import { LinearGradient, MapView ,Video} from "expo";
import CommentSection from "../components/CommentSection";
import Comments from "../components/Comments";
import Carousel from '../components/Carousel';
import { FontAwesome } from '@expo/vector-icons';
import CustomHeader from '../components/header';
import { Circle } from "react-native-svg";
import moment from 'moment';
import {connect} from 'react-redux';
const { height, width } = Dimensions.get("window");
import {getEventDescriptionRequest} from '../redux/action';

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

 class CityEventDescription extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isAboutTab: true,
      isDiscussionTab: false,
      isPlay:false,
      isEventDescription:false
    };
  }
  componentDidMount(){
    if(this.props.navigation.state.params.item){
    this.props.eventDescription(this.props.navigation.state.params.item._id)
    }
  }
  render() {
    console.log(this.props.navigation.state.params ,"llllllllllllllllllllllllllllllll");
    // const item=this.props.navigation.state.params.item
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
    console.log(this.props ,"88888888888");
    const eventData =this.props.getEventDescription
    const item=eventData.isSuccess && this.props.getEventDescription.status.data
    return (
      <View style={{marginTop:StatusBar.currentHeight}}>
        <CustomHeader isCenter={true} centerImage={true} centerTitle={true} />
     {eventData.isSuccess ? <ScrollView>
        <View>
          <LinearGradient colors={["#ff6cc9", "#8559f0"]}>
            <View style={styles.firstSectionWrapper}>
              <View style={styles.firstChild}>
                <View style={styles.imageWrapper}>
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{uri:item.image.secure_url}}
                  />
                </View>
                <View style={styles.eventWrapper}>
                  <Text style={styles.eventName}>{item.title}</Text>
                  <Text style={styles.website}>{item.website}</Text>
                </View>
                <View style={styles.time}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/images/time.png")}
                  />
                  <View style={styles.timeWrapper}>
                    <Text style={styles.dateDay}>{moment(item.start).format("D MMM, dddd")}</Text>
                    <Text>{moment(item.start).format("hh:mm A")}</Text>
                  </View>
                </View>
                <View style={styles.time}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/images/cost.png")}
                  />
                  <Text style={styles.dollar}>from {item.Price}</Text>
                </View>
                <View style={styles.peopleWrapper}>
                  <View style={styles.peppleLikedWrapper}>{data}</View>
                  <Text style={styles.totalPeople}>4.5K people interested</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:30}}>
                  <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#ff6cc9", "#8559f0"]}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Joing event</Text>
                  </LinearGradient>
                  <LinearGradient 
                  colors={["#ff6cc9", "#8559f0"]}
                  style={styles.bag}
                  >
                    <View style={styles.gradientCircle}>
                      <Image resizeMode='contain' style={styles.begImage} source={require('../assets/images/Group.png')} />
                    </View>
                  </LinearGradient>
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
                  <Image source={require("../assets/images/map.png")} />
                  <Text style={styles.locationText}>
                    Kingston ,Concert Hall
                  </Text>
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
                  {item.categories.description}
                </Text>
              </View>
              <View style={styles.video}>
                <Carousel />
                <View style={styles.videoView}>
              <Video
                source={{
                  uri:"http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
                }}

                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay={this.state.isPlay}
                isLooping={false}
                style={{ width:'100%', height: "100%" }}
              />
              <View style={styles.pasuePlayView}>
                <FontAwesome size={30} color='#8559f0' onPress={()=>this.setState({isPlay:!this.state.isPlay})} name={this.state.isPlay ? "pause" :'play'} />
              </View>
              </View>
              </View>
            </View>
          )}
          {this.state.isDiscussionTab && (
            <View style={styles.discussionWrapper}>
              <CommentSection />
              <Comments />
            </View>
          )}
        </View>
        </ScrollView> :<View style={styles.loaderView}><ActivityIndicator color="#FF6CC9" size="large" /></View> }
      </View>
    );
  }
}


const mapStateToProps = state => {
  console.log(state, "222222222222222222222222");
  return {
    getEventDescription:state.getEventDescription
  };
};
const mapDispatchToProps = dispatch => {
  return {
    eventDescription:(id)=>dispatch(getEventDescriptionRequest(id))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityEventDescription);

const styles = StyleSheet.create({
  imageWrapper: {
    width: "100%",
    height: Layout.window.height / 3
  },
  image: {
    width: "100%",
    height: "100%"
  },
  firstSectionWrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    width: Layout.window.width
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
    width: Layout.window.width / 1.7,
    height:Layout.window.width*.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40,
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
    height: Layout.window.height * 0.09
  },
  aboutUsWrapper: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 100,
    marginTop: 15
  },
  discussionWrapper: {
    marginTop: 15,
    paddingBottom: 90,
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
  },
  mapDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7
  },
  lacationName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  getDirectionButton: {
    backgroundColor: "#ff6cc9",
    width: Layout.window.width * 0.32,
    height: Layout.window.height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  locationText: {
    marginLeft: 10,
    color: "#fff"
  },
  buttonText: {
    color: "#fff"
  },
  videoView:{
    width:"100%",
    height:200
  },
  pasuePlayView:{
    position:'absolute',
    zIndex:1,
    alignSelf:'center',
    top:"40%"
  },
  bag:{
    width:Layout.window.width*.15,
    height:Layout.window.width*.15,
    borderRadius:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  gradientCircle:{
    width:"95%",
    height:"94%",
    backgroundColor:"#fff",
    borderRadius:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  begImage:{
    width:"50%",
    height:'50%'
  },
  loaderView:{
    position:"absolute",
    flex:1,
    flexDirection:'column',
    alignSelf:"center",
    justifyContent:'center',
    alignContent:'center',
    top:height/2.4
  }
});
