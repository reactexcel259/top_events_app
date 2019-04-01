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
import { connect } from "react-redux";
import Touch from "react-native-touch";
import Layout from "../constants/Layout";
import {
  getEventDescriptionRequest,
  postEventLikeRequest,
  postAddCommentRequest,
  cleanCommentSuccess,
  postLikeCommentRequest,
  postJoiningEventsRequest,
  setAddEventDefault,
} from "../redux/action";
import Comments from "../components/Comments";

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
class Activity extends Component {

  onCloseActivity = () => this.props.navigation.goBack();

  onPressCheckin = () => this.props.navigation.navigate('CheckIn');

  onLike = (id) => {
    const { user } = this.props;
    let payload = {
      token : user.user.status.token,
      id: id
    }
    this.props.postLikeCommentRequest(payload)
  }

  render() {
    const { user } = this.props
    const eventData = this.props.getEventDescription;
    const item =
    eventData.isSuccess ? this.props.getEventDescription.status.data : this.props.navigation.getParam('item');
    // const item = this.props.navigation.getParam('item') || {};
    const images = item && item.interested.slice(0,5).map((user, i) => {
      return (
        <View key={i} style={[styles.peopleLiked, { zIndex: image.length - i }]}>
          {
            user.image?
            <Image
            style={styles.peopleLikedImage}
            source={{uri:user.image}}
            />
            :
            <Image
            style={styles.peopleLikedImage}
            source={require("../assets/images/photo2.png")}
            />
          }
        </View>
      );
    });
    return (
     <ScrollView>
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
               {
                 item.image ?
                <Image style={styles.image} source = {{uri:item.image.secure_url}} />
                :
                <Image style={styles.image} source={require('../assets/images/no-thumbnail.png')} />
               }
            </View>
        </LinearGradient>
        {
          eventData.isLoading ? 
           (
            <View style={styles.loaderView}>
              <ActivityIndicator color="#FF6CC9" size="large" />
            </View>
          )
          :
        <View style={styles.eventDescriptionView} >
            <Text style={styles.eventTitle}>
                {item.title}
            </Text>
            <View style={styles.likedPeopleView}>
                {images}
            </View>
            <View style={styles.checkedinTextView}>
                <Text style={styles.checkedinText}>{item.checkedinBy ? item.checkedinBy.length : 0} checked in</Text>
            </View>
            <Touch onPress ={this.onPressCheckin}>
                <View style={styles.buttonView}>
                    <LinearGradient
                      start={{ x: 0, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#ff6cc9", "#8559f0"]}
                      style={styles.submitButton}
                    >
                      <Text style={styles.submitText}>Check In</Text>
                    </LinearGradient>
              </View>
          </Touch>
          {item.comments &&
            <Comments 
            userId={user.user.data.data._id}
            userComments={item.comments} 
            // onLike={this.onLike}
            />
        }
        </View>
        }
     </ScrollView>
    )
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
)(Activity);

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
    borderRadius:15,
    overflow:"hidden"
  },
  image : {
    width:"100%",
    height:"100%",
    resizeMode:'center',
    borderRadius:20
    },
  eventDescriptionView : {
    marginTop:Layout.window.width * 0.25,
    alignItems:"center"
  },
  eventTitle : {
    fontSize: 20,
    fontWeight: "600"
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
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
    marginLeft:15
  },
  buttonView: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17
  },
  submitButton: {
    width: Layout.window.width / 1.6,
    height: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 22,
    marginBottom: 22
  },
  checkedinTextView: {
    marginBottom: 22,
  },
  checkedinText: {
    color: "#ccc"
  }
})
