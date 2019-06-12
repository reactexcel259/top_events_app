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
  Linking,
  ActivityIndicator,
  Share,
  ToastAndroid,
  KeyboardAvoidingView,
  WebView,
  AsyncStorage
} from "react-native";
import Layout from "../constants/Layout";
import { LinearGradient, MapView, Video } from "expo";
import CommentSection from "../components/CommentSection";
import Comments from "../components/Comments";
import ImagePickerModal from '../components/imagePickerModal';
import Carousel from "../components/Carousel";
import { FontAwesome } from "@expo/vector-icons";
import CustomHeader from "../components/header";
import { Circle } from "react-native-svg";
import moment from "moment";
import { connect } from "react-redux";
import { ErrorRecovery } from 'expo';
import ErrorBoundary from '../components/ErrorBoundary';
const { height, width } = Dimensions.get("window");
 import {getItem ,setItem} from '../services/storage';
import {
  getEventDescriptionRequest,
  postEventLikeRequest,
  postAddCommentRequest,
  cleanCommentSuccess,
  postLikeCommentRequest,
  postJoiningEventsRequest,
  setAddEventDefault,
} from "../redux/action";
import HomePageModal from '../components/HomePageModal';
import FullImageModal from '../components/fullImageModal';
import { Platform } from "expo-core";
import * as _ from 'lodash';

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
      isPlay: false,
      isEventDescription: false,
      isLiked: false,
      comment: '',
      image:[],
      calanderItem:'',
      isCalander: true,
      isModalCall: false,
      imagepicker: false,
      isFullImage: false,
      imageUrl:'',
      userSelectedLike:null,
      userLikedWhenPageLanding:false,
      isUserGoingToEvent:false
    };
  }
 async componentDidMount() {
    if (this.props.navigation.state.params.item) {
      this.props.eventDescription(this.props.navigation.state.params.item._id);
    }
  }
 async componentDidUpdate(prevProps, prevState) {
   const {getInterestedEvent,getEventDescription}=this.props;
    const { isLiked, isCalander, isModalCall ,userLikedWhenPageLanding,isUserGoingToEvent} = this.state;
    const { user } = this.props.user;
    const eventData = this.props.getEventDescription;
    const item =
      eventData.isSuccess && this.props.getEventDescription.status.data;
    let interestedArray = !item ? [] : item.interested;
    let checkedInarry = !item ? [] : item.checkedinBy;
    const checkedIn = user.data && user.data.data && user.data.data.email && checkedInarry.find(
      going => going.email == user.data.data.email
    );
    const checkedInBy =
      checkedIn && Object.keys(checkedIn).length ? true : false;
    const checkInterested =user.data && user.data.data && user.data.data.email && interestedArray.find(
      going => going.email == user.data.data.email
    );
    if(checkedInBy && item && isCalander && !isModalCall ){
      this.setState({
        calanderItem: item,
        isCalander: false
      })
    }
    if ( !this.state.isLiked && checkInterested &&  Object.keys(checkInterested).length) {
      // setItem('userLiked', JSON.stringify({liked:true}));
        this.setState({ isLiked: true },()=>{
          if(this.props.userLike.isSuccess && userLikedWhenPageLanding){
          ToastAndroid.show('Added to Wishlist', ToastAndroid.SHORT);
        }
        });
    } else if(this.state.isLiked && checkInterested == undefined) {
      this.setState({isLiked: false},()=>{
        if(this.props.userLike.isSuccess && userLikedWhenPageLanding){
          ToastAndroid.show('Removed from Wishlist', ToastAndroid.SHORT);
        }
      })
    }
    // const userDidLiked =await AsyncStorage.getItem('userLiked')
    // if(!userLikedWhenPageLanding && userDidLiked !==undefined){
    //   console.log(userDidLiked,'LLLLLLLLLLLLLLLLLLLLLLLLLLLL');
    //   this.setState({userLikedWhenPageLanding:true})
      
    // }

    if(this.props.postAddComment.isSuccess){
      this.setState({
        comment: '',
        image:[],
      })
      this.props.cleanCommentSuccess()
      // this.props.eventDescription(this.props.navigation.state.params.item._id);      
    }
    if(this.props.getInterestedEvent.joinedTrue  && prevProps.getInterestedEvent.joinedTrue !== this.props.getInterestedEvent.joinedTrue){
        this.props.setAddEventDefault();
        this.props.eventDescription(this.props.navigation.state.params.item._id);
      }

      if(getEventDescription.isSuccess !==prevProps.getEventDescription.isSuccess){
      let isPassed;
      isPassed = moment().diff(moment(item.start),'days')
      if(!checkedInBy && !(isPassed  != undefined && isPassed >= 0 )  && isUserGoingToEvent && getEventDescription.isSuccess){
        ToastAndroid.show('Removed from Attending Events', ToastAndroid.SHORT);
      }
      if(checkedInBy && !(isPassed  != undefined && isPassed >= 0 ) && isUserGoingToEvent && getEventDescription.isSuccess){
        ToastAndroid.show('Added to Attending Events', ToastAndroid.SHORT);
      }
    }
  }

  onShare = async () => {
    const eventData = this.props.getEventDescription;
    const item = eventData.isSuccess && this.props.getEventDescription.status.data;
    try {
      const result = await Share.share({
        message: `${item.title} event is going to start. To see detail of Event Open the link https://topeventsinjamaica.com/#/event-detail/${item._id}`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  callCalander = () => {
    const item = this.props.getEventDescription.status.data;
    let url
    if( item.start && item.end){
     url = `http://www.google.com/calendar/event?action=TEMPLATE&dates=${item.start
    .split("-")
    .join("")
    .split(":")
    .join("")
    .split(".")[0] + "Z"}%2F${item.end
      .split("-")
      .join("")
      .split(":")
      .join("")
      .split(".")[0] + "Z"}&text=${
        item.title
        }&location=${item.EventPlace}&details=${
        item.title
        }`
    } else {
       
       url =  `http://www.google.com/calendar/event?action=TEMPLATE&dates=${JSON.stringify(moment(item.start))
          .replace('"', "")
          .split("-")
          .join("")
          .split(":")
          .join("")
          .split(".")[0] + "Z"}%2F${JSON.stringify(
          moment(item.start)
        )
          .replace('"', "")
          .split("-")
          .join("")
          .split(":")
          .join("")
          .split(".")[0] + "Z"}&text=${
          item.title
        }&location=${item.EventPlace}&details=${
          item.title
        }`
    }
    Linking.canOpenURL(url).then(supported => {
      if(supported){
        return Linking.openURL(url);
      } else {
        console.log('error')
      }
    })
  }

  onEventLike = async() => {
    this.setState({ userLikedWhenPageLanding:true,isUserGoingToEvent:false });
    let token = this.props.user.user.status.token;
    let eventId = this.props.navigation.state.params.item._id;
    await this.props.eventLikeRequest({ token, eventId });
  };

  onCommentTextChange = (text) => {
    this.setState({
      comment: text
    })
  }


  onComment = () => {
    const { comment, image } = this.state;
    const { navigation, postAddCommentRequest, user } = this.props;
    let payload = {
      id: navigation.state.params.item._id,
      token : user.user.status.token,
      data: {
        comment: comment,
        image: image
      }
    }
    let userCommment =comment.trim()
    if(userCommment !==""){
    postAddCommentRequest(payload);
    this.setState({
      comment:""
    })
  }else{
    ToastAndroid.show('Add any comments', ToastAndroid.SHORT);
    this.setState({
      comment:""
    })
  }
  }

  onUpload = (data) => {
    let imageNew = _.cloneDeep(this.state.image)
    if(data && data.secure_url){
      imageNew.push(data.secure_url)
    }
    this.setState({
      image: imageNew,
    })
  }

  onLike = (id) => {
    const { user } = this.props;
    let payload = {
      token : user.user.status.token,
      id: id
    }
    this.props.postLikeCommentRequest(payload)
  }

  eventJoin = () => {
    this.setState({isUserGoingToEvent:true,userLikedWhenPageLanding:false})
    const { user,navigation  } = this.props;
    const eventData = this.props.getEventDescription;    
    const item =
    eventData.isSuccess && this.props.getEventDescription.status.data;
    let checkedInarry = !item ? [] : item.checkedinBy;
    const checkedIn =user.data && user.data.data && user.data.data.email && checkedInarry.find(
      going => going.email == user.user.data.data.email
    );
    const checkedInBy =
    checkedIn && Object.keys(checkedIn).length ? true : false;
    if(!checkedInBy){
      this.setState({
        isModalCall: false
      })
    }
    let payload= {
      token: user.user.status.token,
      id: navigation.state.params.item._id
    }
    this.props.postJoiningEventsRequest(payload)
  }

  openMap = () => {
    const { getEventDescription } = this.props;
    let url = Platform.OS == 'ios' ? 
    `maps:${getEventDescription.status.data.EventLocation[0]},${getEventDescription.status.data.EventLocation[1]}`
    :
    `geo:${getEventDescription.status.data.EventLocation[0]},${getEventDescription.status.data.EventLocation[1]}`

    Linking.canOpenURL(url).then(supported => {
      if(supported){
        return Linking.openURL(url);
      } else {
        let browser_url = `https://www.google.com/maps/@${getEventDescription.status.data.EventLocation[0]},${getEventDescription.status.data.EventLocation[1]}`
        return Linking.openURL(browser_url);
      }
    })
    
  }

  data = (item) =>{
    return(
      item && item.interested.length > 0 ? item.interested.slice(0,6).map((data, i) => {
        return (
          <View
          key={i}
          style={[styles.peopleLiked, { zIndex: image.length - i }]}
          >
          {
            data.image ?
            <Image
            style={styles.peopleLikedImage}
            source={{uri:data.image}}
            />
            :
            <Image
            style={styles.peopleLikedImage}
            source={require("../assets/images/photo2.png")}
            />
          }
          </View>
        );
      })
    :
    null
  )
  }
  removeCalanderItem = () => {
    this.setState({
      calanderItem: '', 
      isCalander: true,
      isModalCall: true
    })
  }

  openImageModal = () => {
    this.setState({
      imagepicker: true
    })
  }
  closeimageModal = () => {
    this.setState({
      imagepicker:false
    })
  }

  onCloseFullImage = () => {
    this.setState({
      isFullImage: false,
      imageUrl: ''
    })
  }

  onImageSelect = (url) => {
    this.setState({
      isFullImage:true,
      imageUrl: url
    })
  }

  render() {
    const { isLiked, comment, calanderItem, isCalander, isFullImage, imageUrl,userSelectedLike } = this.state;
    const { user } = this.props.user;
    let rightIcon;
    const eventData = this.props.getEventDescription;
    const {getEventDescription} =this.props;
    const goingData = this.props.getInterestedEvent;
    const item = this.props.getEventDescription.isSuccess && this.props.getEventDescription.status && this.props.getEventDescription.status.data !==undefined && this.props.getEventDescription.status.data;
    let interestedArray = !item ? [] : item.interested;
    console.log(item,'eventname_is_here');
    
    let checkedInarry = !item ? [] : item.checkedinBy;
    const checkedIn =user.data && user.data.data && user.data.data.email && checkedInarry.find(
      going => going.email == user.data.data.email
    );
    const checkedInBy = checkedIn && Object.keys(checkedIn).length ? true : false;
    const checkInterested =user.data && user.data.data && user.data.data.email && interestedArray.find(
      going => going.email == user.data.data.email
    );
    if (isLiked) {
      rightIcon = ["heart", "share-alt"];
    } else {
      rightIcon =
      checkInterested && Object.keys(checkInterested).length && !isLiked
      ? ["heart", "share-alt"]
      : ["heart-o", "share-alt"];
    }
    let isPassed;
    if(item){
     isPassed = moment().diff(moment(item.start),'days')
    }
 let isGoing = item && user.data && user.data.data && user.data.data.email && item.interested.findIndex(val => val.email == user.data.data.email);
   let  eventEndDate
 if(item && item.start && item.end){
  eventEndDate = moment(item.end).format("M") > moment(item.start).format("M") ||  (parseInt(moment(item.end).format("D")) !== parseInt(moment(item.start).format("D"))+1 && parseInt(moment(item.end).format("D")) > parseInt(moment(item.start).format("D"))+1 )? moment(item.end).format("D MMM, ddd") : "";
 }
 console.log(this.props,'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
 
 return (
   <ErrorBoundary>
      <KeyboardAvoidingView style={{flex:1}} keyboardVerticalOffset={120}  behavior="padding" enabled >
      <View>
        <CustomHeader
          isCenter={true}
          isLeft={true}
          onShare={() => this.onShare()}
          gradieantColor={["#FF6CC9", "#FF6CC9"]}
          leftPress={() => this.props.navigation.goBack()}
          leftIcon="angle-left"
          isRight={true}
          rightIcon={rightIcon}
          onEventLike={() => this.onEventLike()}
        />
        {
          getEventDescription.isLoading || goingData.isEventJoinLoading ? 
           (
            <View style={styles.loaderView}>
              <ActivityIndicator color="#FF6CC9" size="large" />
            </View>
          )
          :
          getEventDescription.isSuccess && item && (
          <ScrollView>
            <View>
              <LinearGradient colors={["#ff6cc9", "#8559f0"]}>
                <View style={styles.firstSectionWrapper}>
                  <View style={styles.firstChild}>
                    <View style={styles.imageWrapper}>
                      <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={
                          item.image
                            ? { uri: item.image.secure_url }
                            : require("../assets/images/no-thumbnail.png")
                        }
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
                        <Text style={styles.dateDay}>
                        {eventEndDate !=="" ? moment(item.start).format("D MMM, ddd")+" " : moment(item.start).format("D MMM, dddd")+" "}{eventEndDate !=="" && ("-"+" " + eventEndDate)}
                        </Text>
                        <Text>{moment(item.start).format("hh:mm A")}</Text>
                      </View>
                    </View>
                    <View style={styles.time}>
                      <Image
                        style={styles.icon}
                        source={require("../assets/images/cost.png")}
                      />
                      <Text style={styles.dollar}>from $ {item.Price ? item.Price : 0}</Text>
                    </View>
                    <View style={styles.peopleWrapper}>
                      <View style={styles.peppleLikedWrapper}>{this.data(item)}</View>
                      <Text style={styles.totalPeople}>
                      {
                        (!isGoing || isGoing == -1 ) ?
                        `${interestedArray.length} people interested`
                        :
                        `You and ${interestedArray.length - 1} people interested`
                      }
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "center",
                        marginTop: 30
                      }}
                    >
                    <TouchableOpacity onPress={(isPassed != undefined && isPassed < 0) ? ()=>this.eventJoin() : ()=>{return null} }>
                      <LinearGradient
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#ff6cc9", "#8559f0"]}
                        style={styles.button}
                      >
                        {checkedInBy ? (
                          <View style={styles.insideButton}>
                            <Text
                              style={[styles.buttonText, { color: "black" }]}
                            >
                              {(isPassed  != undefined && isPassed >= 0) ?  `Event Closed` : `You're going`}
                            </Text>
                          </View>
                        ) : (
                          <Text style={styles.buttonText}> 
                          { (isPassed != undefined && isPassed >= 0) ?  `Event Closed` : 'Join Event' }
                          
                          </Text>
                        )}
                      </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.callCalander} >
                      {/* <LinearGradient
                        colors={["#ff6cc9", "#8559f0"]}
                        style={styles.bag}
                      >
                        <View style={styles.gradientCircle}> */}
                          <Image
                            resizeMode="contain"
                            style={{height:40,width:40}}
                            source={require("../assets/images/Group1.png")}
                          />
                        {/* </View>
                      </LinearGradient> */}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View />
                </View>
                {item.EventLocation && item.EventLocation !== undefined && (
                  <View style={styles.mapView}>
                  <View style ={{borderRadius:10,overflow:'hidden'}}>
                    <MapView
                      style={{ flex: 1, height: Layout.window.height * 0.23, borderRadius:15 }}
                      initialRegion={{
                        latitude:  item.EventLocation[1],
                        longitude:  item.EventLocation[0],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                      }}
                    >
                      <MapView.Marker
                        coordinate={{latitude: item.EventLocation[1],
                            longitude: item.EventLocation[0],}}
                        title={item.title}
                      />
                    </MapView>
                    </View>
                    <View style={styles.mapDescription}>
                      <View style={styles.lacationName}>
                        <Image style={{height:20,width:20}} source={require("../assets/images/map.png")} />
                        <Text style={styles.locationText}>
                          {item.EventPlace}{item.EventCity && item.EventCity.name && ","+" "+item.EventCity.name}
                        </Text>
                      </View>
                      <TouchableOpacity onPress={this.openMap}>                      
                        <View style={styles.getDirectionButton}>
                          <Text style={styles.buttonText}>Get Direction</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </LinearGradient>
              <View style={styles.tabWrapper}>
                <View style={[styles.tab]}>
                  <TouchableOpacity
                    activeOpacity={0.1}
                    onPress={() =>
                      this.setState({
                        isAboutTab: true,
                        isDiscussionTab: false
                      })
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
                      this.setState({
                        isAboutTab: false,
                        isDiscussionTab: true
                      })
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
                    <Text>{item.content.brief}</Text>
                  </View>
                  <View style={styles.video}>
                    {item && item.DescriptionImage && (item.VideoLink == undefined || item.VideoLink === "")&& <Carousel DescriptionImage={item.DescriptionImage} />}
                    {
                      (item.VideoLink != undefined && item.VideoLink != "") &&
                        <View style={{width:"100%",height:235}}>
                        <ScrollView>
                      <View style={styles.videoView}>
                        {/* <Video
                          source={{uri: item.VideoLink }}
                          rate={1.0}
                          volume={1.0}
                          isMuted={false}
                          resizeMode="cover"
                          shouldPlay={this.state.isPlay}
                          isLooping={false}
                          style={{ width: "100%", height: "100%" }}
                          /> */}
                          <WebView
                              style={{width: "100%", height:"100%" ,}}
                              javaScriptEnabled={true}
                              source={{uri: `${item.VideoLink}?showinfo=0` }}
                          />
                        {/* <View style={styles.pasuePlayView}>
                          <FontAwesome
                            size={30}
                            color="#8559f0"
                            onPress={() =>
                              this.setState({ isPlay: !this.state.isPlay })
                            }
                            name={this.state.isPlay ? "pause" : "play"}
                            />
                        </View> */
                        }
                      </View>
                            </ScrollView>
                      </View>
                    }
                  </View>
                </View>
              )}
              {this.state.isDiscussionTab && (
                <View style={styles.discussionWrapper}>
                  <CommentSection 
                    // {...this.state}
                    // vvv={this.state.vvv}
                    image={this.state.image}
                    comment={comment}
                    onChange={this.onCommentTextChange}
                    onSubmit={this.onComment}
                    onAddImage={this.openImageModal}
                  />
                  <Comments 
                    userId={user.data.data._id}
                    onImageSelect={this.onImageSelect}
                    userComments={item.comments} 
                    onLike={this.onLike}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        ) }
        {
          !isCalander &&
          <HomePageModal
          {...this.props}
          isOpen = {(calanderItem == '' ? false: true) && !(isPassed  != undefined && isPassed >= 0)}
          title="Add to your calendar"
          buttons={['Add','Skip']}
          type="calendar"
          removeItem={this.removeCalanderItem}
          item={calanderItem}
          />
        }
        <ImagePickerModal
          isOpen={this.state.imagepicker}
          onCloseImage={this.closeimageModal}
          onUpload={this.onUpload}
        />
        {
          imageUrl !== '' &&
          <FullImageModal
          isOpen={isFullImage}
          item={imageUrl}
          onCloseFullImage={this.onCloseFullImage}
          />
        }
      </View>
      </KeyboardAvoidingView>
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    getEventDescription: state.getEventDescription,
    user: state.user,
    userLike: state.postAddLikeEvent,
    postAddComment: state.postAddComment,
    getInterestedEvent:state.getInterestedEvent,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    eventDescription: id => dispatch(getEventDescriptionRequest(id)),
    eventLikeRequest: (token, eventId) =>
      dispatch(postEventLikeRequest(token, eventId)),
    postAddCommentRequest: (payload) => 
      dispatch(postAddCommentRequest(payload)),
    cleanCommentSuccess: () => dispatch(cleanCommentSuccess()),
    postLikeCommentRequest: (payload) => dispatch(postLikeCommentRequest(payload)),
    postJoiningEventsRequest: (payload) => dispatch(postJoiningEventsRequest(payload)),
    setAddEventDefault: () => dispatch(setAddEventDefault()),
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
    paddingLeft: 20
  },
  website: {
    color:'#FF6CC9'
  },
  time: {
    marginTop: 20,
    flexDirection: "row",
    paddingLeft: 20
  },
  timeWrapper: {
    marginTop: -5
  },
  dollar: {
    marginTop: -5
  },
  icon: {
    marginRight: 20,
    height:20,
    width:20
  },
  peopleLiked: {
    width: 35,
    height: 35,
    marginLeft: -20,
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 28,
    backgroundColor: "#fff",
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
    marginLeft: 15,
    flexWrap:'wrap',
    flex:1
  },
  dateDay: {
    fontWeight: "bold"
  },
  insideButton: {
    width: Layout.window.width / 1.74,
    height: Layout.window.width * 0.111,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40,
    backgroundColor: "white"
  },
  button: {
    width: Layout.window.width / 1.7,
    height: Layout.window.width * 0.12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 40
  },
  buttonText: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 18
  },
  firstChild: {
    backgroundColor: "#fff",
    borderRadius: 10,
    height: Layout.window.height * 0.85,
    marginBottom: 20
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
    paddingBottom: 90
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
    paddingTop: 15,
    paddingBottom: 30,
  },
  mapDescription: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7
  },
  lacationName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight:5,
    width:Layout.window.width * 0.5
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
    color: "#fff",
    flexWrap:'wrap'
  },
  buttonText: {
    color: "#fff"
  },
  videoView: {
    width: "100%",
    height: 500,
    // overflow:"scroll"

  },
  pasuePlayView: {
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    top: "40%"
  },
  bag: {
    width: Layout.window.width * 0.15,
    height: Layout.window.width * 0.15,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  gradientCircle: {
    width: "95%",
    height: "94%",
    backgroundColor: "#fff",
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  begImage: {
    width: "50%",
    height: "50%"
  },
  loaderView: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    top: height * 0.4
  }
});
