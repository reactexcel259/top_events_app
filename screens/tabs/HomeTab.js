import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import moment from 'moment';
import VideosComponent from "../../components/VideosComponent";
import Events from "../../components/Events";
import CustomHeader from ".././../components/header";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
import { getEventRequest,
  getAttendingEventRequest,   
  getCategoryRequest ,
  getStateAndCityRequest,
  getStateAndCityEventRequest, 
  getTodayEventRequest,
  getUserDataRequest,
  getEventByIdRequest,
  storeTokenRequest,
  getLikeEventRequest,
} from "../../redux/action";
import Touch from 'react-native-touch';
import Layout from "../../constants/Layout";
import HomePageModal from '../../components/HomePageModal';
import {setItem,getItem} from '../../services/storage';
import ChangeLocation from '../../components/ChangeLocation';
import { WebBrowser, LinearGradient, Location, Permissions, Constants, Notifications } from 'expo';


class HomeTab extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isCategoryId: false,
      isStateAndCityId: false,
      changeLocationModal:false,
      interest:[],
      location: null,
      search:'',
      selected: false,
      stateCity:[],
      selectedInt:[],
      attendingEvents:'',
      attendingEventList:[],
    };
  }

  async componentDidMount() {
    const getUpdatedInterest =await getItem('user_updated_interest')
    let getInterest;
    const getLocation = await getItem("user_info");
    let token =this.props.user.user.status.token
    if(getLocation && getLocation.location !== undefined){
      this.setState({search:getLocation.location.name, selected: true}); 
    }
    if(getInterest && getInterest.interest != undefined ){
      if( getInterest.interest.length >0){
      getInterest.interest.forEach(eventId => {
        let id = eventId._id;
        let key = eventId.key;
        this.props.getEvent({ id, key });
      })
    } 
    }else{
      await this.props.getCategory();
    }
    this.props.getTodayEventRequest()
    await this.props.getAttendingEventRequest(token)
    await this.props.getLikeEventRequest({token:token});
    await this.props.getStateAndCity();
    await this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
}

 registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  let userToken =this.props.user.user.status.token
  
  let payload = {
    token: userToken,
    data: {
      deviceToken:token
    }
  }
  this.props.storeTokenRequest(payload)
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  
}

_handleNotification = (notification) => {
    console.log(notification,'idaaaaa')
  };

  async componentDidUpdate() {
    const getUpdatedInterest =await getItem('user_updated_interest')
    const getInterest =await getItem("user_interest")
    const getLocation = await getItem("user_info");    
    const { getCategoryData ,getStateAndCityData, user} = this.props;
    if(user.user.data.length == 0 ){
      let token  = user.user.status.token;
      this.props.getUserDataRequest(token);
    }
    
    if (getCategoryData.isSuccess && !this.state.isCategoryId) {
      
      getCategoryData.status.data.forEach(eventId => {
        let id = eventId._id;
        let key = eventId.key;
        this.props.getEvent({ id, key });
      });
      this.props.getTodayEventRequest()      
      this.setState({ isCategoryId: true });
    }
    if(getLocation && getLocation.location !== undefined){
      this.setState({search:getLocation.location.name, selected: true}); 
    }
    if (getStateAndCityData.isSuccess && !this.state.isStateAndCityId && getLocation && getLocation.location !== undefined) {
      this.props.getStateAndCityEvent(
        getLocation.location._id
      );
      this.setState({ isStateAndCityId: true });
    }
  }
  
  onViewAll = async category => {
    this.props.getEventById({id:category._id,key:category.key}) 
    this.props.navigation.navigate('ViewAllCard');
  };

  useCurrentLocation = async () => {
    const response = await Location.hasServicesEnabledAsync()
    if (!response) {
      this.setState({
        mapError: true,
      });
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Please turn on your device location, to access this service',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){ 
        Alert.alert(
          'Location Permission Denied',
          'Please turn on your device location, to access this service',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    }else {
      let { status,error } = await Permissions.askAsync(Permissions.LOCATION);
      let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
      this.getGeoAddress(location.coords.latitude, location.coords.longitude);
    }
  };

  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { data } = this.props.getStateAndCityData.status;
    
    const regex = new RegExp(`${query.trim()}`, 'i');
    return data.filter(city => city.name.search(regex) >= 0);
  }

  getGeoAddress = async (myLat,myLon) => {
    let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + myLat + ',' + myLon + '&key=' + "AIzaSyBB7Tc7njRoyjegBDmqAVj09AKWbdRrTCI");
    const responses = await response.json();
    const results = responses.results
    let storableLocation = {};
    for (var ac = 0; ac < results[0].address_components.length; ac++) {
      var component = results[0].address_components[ac];

      switch (component.types[0]) {
        case "locality":
          storableLocation.city = component.long_name;
          break;
        case "administrative_area_level_1":
          storableLocation.state = component.long_name;
          break;
        case "country":
          storableLocation.country = component.long_name;
          storableLocation.registered_country_iso_code =
            component.short_name;
          break;
      }
    }
    let result = this.findFilm(storableLocation.state);
    if(result.length){
      this.setState({search:result[0].name})
    }else{
      this.setState({search:this.props.getStateAndCityData.status.data[0].name})
    }
  }
  onSearchChange = (text,val) => {
    this.setState({
      search: text,
      selected: val
    },()=>{
      if(val == false)
      this.onPressLocation()
    })
  }
  onPressLocation = async() => {
    const { search, selectedInt} = this.state;
    if(!Object.keys(this.state.search).length){
      if(Platform.OS == 'android') {
        ToastAndroid.showWithGravityAndOffset(
          'Please add your location !!',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else if( Platform.OS == 'ios'){ 
        Alert.alert(
          'Add Location',
          'Please add your location !!',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    } else {
      let filters = this.findFilm(search);
      let results;
      if(filters.length){
        results = filters[0]
        setItem("user_info", JSON.stringify({ location:results}));
        await this.props.getStateAndCityEvent(results._id);
        this.setState({changeLocationModal:false})
      }else {
        if(Platform.OS == 'android') {
          ToastAndroid.showWithGravityAndOffset(
            'Please add a correct location',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );
        } else if( Platform.OS == 'ios'){ 
          Alert.alert(
            'Add Location',
            'Please add a correct location',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
        }
      }
    }
  }
  onCancelPress = () => {
    this.setState({search:'',selected:false})
  }
  componentWillReceiveProps(nextProps){
    const {getStateAndCityData,getCategoryData} = this.props;
    const {attending,isLoading,joinedTrue} = this.props.getInterestedEvent    
    if(nextProps.getInterestedEvent.attending.data !== undefined && nextProps.getInterestedEvent.attending.data.results.length > 0 ){
      if(nextProps.getInterestedEvent.attending !== attending ){
        // if(this.state.attendingEventList.length !== nextProps.getInterestedEvent.attending.data.results)
          this.checkIn(nextProps.getInterestedEvent.attending);
      }    
    }
    if(getStateAndCityData.status !== nextProps.getStateAndCityData.status){
      this.setState({stateCity:nextProps.getStateAndCityData.status.data})
    }else if (getCategoryData.status !== nextProps.getCategoryData.status){
      this.setState({interest:nextProps.getCategoryData.status.data})
    }
  }

  checkIn = (attending) => {
    const { attendingEvents, attendingEventList } = this.state;
      attending.data.results.length > 0 && attending.data.results.map((events)=> {
        let diff = moment().diff(moment(events.start),'days')
        if(attendingEventList.length > 0) {
          let shownId = attendingEventList.find(id => id == events._id);
          if(shownId == -1 && attendingEvents == '' && diff == 0 ){
            attendingEventList.push(events._id);
            this.setState({
              attendingEvents: events,
              attendingEventList: attendingEventList
            })
          }
        } else {
          if(attendingEvents == '' && diff == 0 ){
            attendingEventList.push(events._id);
            this.setState({
              attendingEvents: events,
              attendingEventList: attendingEventList
            })
          }
        }
      })
  }

  onEventDescription = item => {
    this.props.navigation.navigate("CityEventDescription", { item: item });
  };
  _renderItem = ({ item, index }) => {
    let cetegoryId;
    let backgroundColor;
    if (Object.keys(item).join() === "shopping") {
      backgroundColor = "#8559F0";
    } else if (Object.keys(item).join() === "sports") {
      backgroundColor = "#FEEA3F";
    } else if (Object.keys(item).join() === "food") {
      backgroundColor = "#FF523E";
    } else if (Object.keys(item).join() === "conferences") {
      backgroundColor = "#00D5E4";
    } else if (Object.keys(item).join() === "health_wellness") {
      backgroundColor = "#00ED7C";
    } else {
      backgroundColor = "#FF6CC9";
    }
    return (
      <Events
        key={index}
        eventData={item[Object.keys(item).join()].data}
        categoryId={Object.keys(item).join()}
        backgroundColor={backgroundColor}
        onViewAll={key => this.onViewAll(key)}
        onEventDescription={item => this.onEventDescription(item)}
      />
    );
  };

  removeCalanderItem = () => {
      this.setState({
        attendingEvents: '', 
      })
    }
  _keyExtractor = (item, index) => (index.toString());

  render() {
    const { changeLocationModal, attendingEvents } = this.state;
    const {getStateAndCityData} = this.props;
    const eventsLength = this.props.getEventData.register.eventData.length;
    const events = this.props.getEventData.register.eventData;
    const thisWeekEvent = this.props.getEventData.register.todayEvent;
    const cityEvents = this.props.getStateAndCityEventData.status;
    const likeEvent = this.props.getEventData.register.likeEvent;
    return (
      <View style={styles.wrapper}>
        <CustomHeader isCenter={true} centerImage={true} />
        {this.props.getEventData.register.isLoading == false ? (
          <ScrollView>
          {
            getStateAndCityData.status &&
            <ChangeLocation
              {...this.state} 
              changeLocationModal={changeLocationModal}
              stateAndCity={getStateAndCityData}
              useCurrentLocation={()=>{this.useCurrentLocation()}}
              onSearchChange={this.onSearchChange}
              onPress={()=>{this.onPressLocation()}}
              onCancelPress={this.onCancelPress}  
              closeModal={()=>{this.setState({changeLocationModal:false})}}
            />
          }
            <View style={styles.mainWrapper}>
              <View style={styles.kingstoneView}>
                <View style={styles.kingstoneTitle}>
                  <View>
                    <Text>Events Location</Text>
                  </View>
                  <View style={styles.secondText}>
                    <Text style={styles.kingstonText}>{this.state.search}</Text>
                    <TouchableOpacity onPress={()=>{this.setState({changeLocationModal:true})}}>
                      <View style={{flexDirection:'row', marginTop:3}} >
                        <Image
                          style={{width:20,height:20}}
                          resizeMode='cover'
                          source={require('../../assets/images/location.png')}
                        />
                        <View style={{margin:5}}/>
                        <Image
                          style={{width:65,height:20}}
                          resizeMode='cover'
                          source={require('../../assets/images/Change.png')}
                        />
                        {/* <View style={{margin:5}}/> */}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {(eventsLength >0 && cityEvents !== undefined) && (
                  <VideosComponent
                    cityData={cityEvents}
                    onEventDescription={item => this.onEventDescription(item)}
                  />
                )}
              </View>
              <View style={styles.likedView}>
                <View style={styles.EventTitleView}>
                  <Text style={styles.kingstonText}>Events you might like</Text>
                </View>
                {
                  likeEvent && likeEvent.data  &&
                <VideosComponent
                  cityData={likeEvent}
                  onEventDescription={item => this.onEventDescription(item)}
                />
                }
              </View>
              {
                thisWeekEvent.data && thisWeekEvent.data.length > 0 &&
                <LinearGradient
                colors={["#FF6CC9","#8559F0"]}
                style={{ flex: 1,justifyContent:'center' }}
                start={[0, 0]}
                end={[1, 0]}
                >
              <View style={{marginTop:15,marginBottom:15}}>
                <View style={{paddingLeft:15,marginBottom:10}}>
                  <Text style={styles.kingstonGradientText}>This Week</Text>
                </View>
                {
                  thisWeekEvent.data  &&
                <VideosComponent
                  cityData={thisWeekEvent}
                  type="thisWeek"
                  onEventDescription={item => this.onEventDescription(item)}
                  />
                }
              </View>
              </LinearGradient>
              }
              <View style={styles.eventComponentView}>
                {eventsLength > 0 && (
                  <FlatList
                    data={events}
                    removeClippedSubviews={true}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                  />
                )
                }
              </View>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loaderView}>
            <ActivityIndicator color="#FF6CC9" size="large" />
          </View>
        )}
        {
          attendingEvents != '' &&
          <HomePageModal
            {...this.props}
            isOpen = {attendingEvents != '' ? true : false}
            title="Happening now"
            buttons={['Check in','Activity']}
            type="checkin"
            removeItem={this.removeCalanderItem}
            item={attendingEvents}
            />
        }
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    getCategoryData: state.getCategory,
    getEventData: state.getEvent,
    getInterestedEvent: state.getInterestedEvent,
    getStateAndCityData: state.getStateAndCity,
    getStateAndCityEventData: state.getStateAndCityEvent
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvent: (eventId, eventKey) =>
      dispatch(getEventRequest(eventId, eventKey)),
    getAttendingEventRequest: (token) => dispatch(getAttendingEventRequest(token)),
    getCategory: () => dispatch(getCategoryRequest()),
    getUserDataRequest: (token) => dispatch(getUserDataRequest(token)),
    getStateAndCity:()=>dispatch(getStateAndCityRequest()),
    getTodayEventRequest: () => dispatch(getTodayEventRequest()),
    getStateAndCityEvent:(cityId)=>dispatch(getStateAndCityEventRequest(cityId)),
    getEventById:(eventId)=>dispatch(getEventByIdRequest(eventId)),
    storeTokenRequest: (payload) => dispatch(storeTokenRequest(payload)),
    getLikeEventRequest : (payload) => dispatch(getLikeEventRequest(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);

const styles = StyleSheet.create({
  wrapper: {
    // flexDirection:'column',
    // justifyContent:'center',
    // alignContent:'center'
  },
  mainWrapper: {
    flex: 1
  },
  kingstoneTitle: {
    flexDirection: "column",
    padding: 15
  },
  secondText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  kingstonText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5
  },
  kingstonGradientText: {
    fontWeight: "bold",
    fontSize: 15,
    color:'white',
    marginBottom: 5
  },
  changText: {
    color: "#FF6CC9"
  },
  likedView: {
    marginTop: 30
  },
  EventTitleView: {
    paddingLeft: 15
  },
  eventComponentView: {
    paddingBottom: 90
  },
  loaderView: {
    position: "absolute",
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignContent: "center",
    top: height / 2.4
  }
});
