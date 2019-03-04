import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  FlatList
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
import {getItem} from '../../services/storage';

class HomeTab extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isCategoryId: false,
      isStateAndCityId: false
    };
  }

  async componentDidMount() {
    const getInterest =await getItem("user_info")
    // await this.props.getCategory();
    getInterest.interest.forEach(eventId => {
      let id = eventId._id;
        let key = eventId.key;
        this.props.getEvent({ id, key });
    })
    await this.props.getStateAndCity();
  }

  async componentDidUpdate() {
    const { getCategoryData ,getStateAndCityData, user} = this.props;
    if(user.user.data.length == 0 ){
      let token  = user.user.status.token;
      this.props.getUserDataRequest(token);
    }
    // if (getCategoryData.isSuccess && !this.state.isCategoryId) {
    //   getCategoryData.status.data.forEach(eventId => {
    //     let id = eventId._id;
    //     let key = eventId.key;
    //     this.props.getEvent({ id, key });
    //   });
    //   this.setState({ isCategoryId: true });
    // }
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
  onEventDescription = item => {
    this.props.navigation.navigate("CityEventDescription", { item: item });
  };
  _renderItem = ({ item, index }) => {
    console.log(item,"sectionlist");
    
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
    
    const eventsLength = this.props.getEventData.register.eventData.length;
    const events = this.props.getEventData.register.eventData;
    const cityEvents = this.props.getStateAndCityEventData.status;
    return (
      <View style={styles.wrapper}>
        <CustomHeader isCenter={true} centerImage={true} centerTitle={true} />
        {cityEvents !== undefined ? (
          <ScrollView>
            <HomePageModal />
            <View style={styles.mainWrapper}>
              <View style={styles.kingstoneView}>
                <View style={styles.kingstoneTitle}>
                  <View>
                    <Text>Events in</Text>
                  </View>
                  <View style={styles.secondText}>
                    <Text style={styles.kingstonText}>Kingston</Text>
                    <View>
                      <Text style={styles.changText}>Change</Text>
                    </View>
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
