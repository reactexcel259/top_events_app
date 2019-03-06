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
  Alert
} from "react-native";
import VideosComponent from "../../components/VideosComponent";
import Events from "../../components/Events";
import CustomHeader from ".././../components/header";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
import { getEventRequest, getCategoryRequest ,getStateAndCityRequest,getStateAndCityEventRequest, getUserDataRequest} from "../../redux/action";
import Touch from 'react-native-touch';
import Layout from "../../constants/Layout";
import HomePageModal from '../../components/HomePageModal';
import {setItem,getItem} from '../../services/storage';
import ChangeLocation from '../../components/ChangeLocation';
import { WebBrowser, LinearGradient, Location, Permissions, Constants,  } from 'expo';


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
      stateCity:[],
      selectedInt:[],
    };
  }

  async componentDidMount() {
    const getUpdatedInterest =await getItem('user_updated_interest')
    const getInterest =await getItem("user_interest")
    if(getInterest !== undefined){
      if(getInterest.interest && getInterest.interest.length >0){
      
      getInterest.interest.forEach(eventId => {
        let id = eventId._id;
        let key = eventId.key;
        this.props.getEvent({ id, key });
      })
    }
    }else{
      await this.props.getCategory();
    }
    await this.props.getStateAndCity();
}

  async componentDidUpdate() {
    const getUpdatedInterest =await getItem('user_updated_interest')
    const getInterest =await getItem("user_interest")
    // if(getUpdatedInterest.updatedInsterest.length > getInterest.interest.length ){
      
    //   getUpdatedInterest.updatedInsterest.forEach(eventId => {
    //     let id = eventId._id;
    //     let key = eventId.key;
    //     this.props.getEvent({ id, key });
    //   })
    // }
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
      this.setState({ isCategoryId: true });
    }
    if (getStateAndCityData.isSuccess && !this.state.isStateAndCityId) {
      this.props.getStateAndCityEvent(
        getStateAndCityData.status.data[0]._id
      );
      this.setState({ isStateAndCityId: true });
    }
  }
  onViewAll = key => {
    const events = this.props.getEventData.register.eventData;
    events.forEach(event=>{
      if(Object.keys(event).join() === key){
        this.props.navigation.navigate('ViewAllCard' ,{eventDetails:event[Object.keys(event).join()].data},);
      }
    });
  };
  useCurrentLocation = async () => {
    const response = await Location.hasServicesEnabledAsync()
    if (!response) {
      this.setState({
        mapError: true,
      });
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
    })
  }
  onPressLocation = async() => {
    const { search, selectedInt} = this.state;
    if(!Object.keys(this.state.search).length){
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
    } else {
      let filters = this.findFilm(search);
      let results;
      if(filters.length){
        results = filters[0]
        setItem("user_info", JSON.stringify({ location:results}));
        await this.props.getStateAndCityEvent(results._id);
        this.setState({changeLocationModal:false})
      }else {
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
  onCancelPress = () => {
    this.setState({search:'',selected:false})
  }
  componentWillReceiveProps(nextProps){
    const {getStateAndCityData,getCategoryData} = this.props;
    if(getStateAndCityData.status !== nextProps.getStateAndCityData.status){
      this.setState({stateCity:nextProps.getStateAndCityData.status.data})
    }else if (getCategoryData.status !== nextProps.getCategoryData.status){
      this.setState({interest:nextProps.getCategoryData.status.data})
    }
  }

  onEventDescription = item => {
    this.props.navigation.navigate("CityEventDescription", { item: item });
  };
  _renderItem = ({ item, index }) => {
    let cetegoryId;
    let backgroundColor;
    if (Object.keys(item).join() === "shopping") {
      backgroundColor = "#8559F0";
    } else if (Object.keys(item).join() === "sport") {
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
  _keyExtractor = (item, index) => (index.toString());

  render() {
    const { changeLocationModal } = this.state;
    const {getStateAndCityData} = this.props;
    const eventsLength = this.props.getEventData.register.eventData.length;
    const events = this.props.getEventData.register.eventData;
    const cityEvents = this.props.getStateAndCityEventData.status;
    return (
      <View style={styles.wrapper}>
        <CustomHeader isCenter={true} centerImage={true} />
        {cityEvents !== undefined ? (
          <ScrollView>
            <HomePageModal />
            <ChangeLocation
              {...this.state} 
              changeLocationModal={changeLocationModal}
              stateAndCity={getStateAndCityData}
              useCurrentLocation={()=>{this.useCurrentLocation()}}
              onSearchChange={this.onSearchChange}
              onPress={()=>{this.onPressLocation()}}
              onCancelPress={this.onCancelPress}  
            />
            <View style={styles.mainWrapper}>
              <View style={styles.kingstoneView}>
                <View style={styles.kingstoneTitle}>
                  <View>
                    <Text>Events in</Text>
                  </View>
                  <View style={styles.secondText}>
                    <Text style={styles.kingstonText}>Kingston</Text>
                    <TouchableOpacity onPress={()=>{this.setState({changeLocationModal:true})}}>
                      <Text style={styles.changText}>Change</Text>
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
                <VideosComponent
                  cityData={cityEvents}
                  onEventDescription={item => this.onEventDescription(item)}
                />
              </View>
              <View style={styles.eventComponentView}>
                {eventsLength > 0 && (
                  <FlatList
                    data={events}
                    removeClippedSubviews={true}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    // extraData={events}
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
      </View>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    getCategoryData: state.getCategory,
    getEventData: state.getEvent,
    getStateAndCityData: state.getStateAndCity,
    getStateAndCityEventData: state.getStateAndCityEvent
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvent: (eventId, eventKey) =>
      dispatch(getEventRequest(eventId, eventKey)),
    getCategory: () => dispatch(getCategoryRequest()),
    getUserDataRequest: (token) => dispatch(getUserDataRequest(token)),
    getStateAndCity:()=>dispatch(getStateAndCityRequest()),
    getStateAndCityEvent:(cityId)=>dispatch(getStateAndCityEventRequest(cityId))
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
