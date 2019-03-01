import React, { Component } from "react";
import { Text, View, StyleSheet,Dimensions, ScrollView ,ActivityIndicator,FlatList } from "react-native";
import VideosComponent from "../../components/VideosComponent";
import Events from "../../components/Events";
import CustomHeader from ".././../components/header";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
import { getEventRequest, getCategoryRequest ,getStateAndCityRequest,getStateAndCityEventRequest} from "../../redux/action";
import Touch from 'react-native-touch';

class HomeTab extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isCategoryId: false,
      isStateAndCityId:false,
    };
  }

  async componentDidMount() {
    await this.props.getCategory();
    await this.props.getStateAndCity();
  }

  async componentDidUpdate() {
    const { getCategoryData ,getStateAndCityData} = this.props;
    if (getCategoryData.isSuccess && !this.state.isCategoryId) {
      getCategoryData.status.data.forEach(eventId => {
        let id = eventId._id;
        let key = eventId.key;
        this.props.getEvent({ id, key });
      });
      this.setState({ isCategoryId: true });
    }
    if(getStateAndCityData.isSuccess && !this.state.isStateAndCityId){
      this.props.getStateAndCityEvent(getStateAndCityData.status.data[0].cities[0]._id);
      this.setState({isStateAndCityId:true});
    }
  }
  onViewAll=(key)=>{
    console.log(key ,'VVVVVVVVVVVVVVVVVVVVV');
    const events = this.props.getEventData.register.eventData;
    events.forEach(event=>{
      console.log(event,'evem',events)
      if(Object.keys(event).join() === key){
        this.props.navigation.navigate('ViewAllCard' ,{eventDetails:event[Object.keys(event).join()].data},);
      }
    });
  }
  _renderItem=({item,index})=>{
    console.log(item ,"YYYYYYYYYYYYYYYY");
    
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

    return(
    <Events
      key={index}
      eventData={item[Object.keys(item).join()].data}
      categoryId={Object.keys(item).join()}
      backgroundColor={backgroundColor}
      onViewAll={(key)=>this.onViewAll(key)}
    />

    )
  }
  _keyExtractor=(item, index) => (item, index)

  render() {
    const eventsLength = this.props.getEventData.register.eventData.length;
    const events = this.props.getEventData.register.eventData;
    const cityEvents =this.props.getStateAndCityEventData.status
    console.log(events, "JJJJJ");

    return (
      <View style={styles.wrapper}>
        <CustomHeader isCenter={true} centerImage={true} centerTitle={true} />
        {(eventsLength ==6 && cityEvents !==undefined) ?
        <ScrollView>
          <View style={styles.mainWrapper}>
            <View style={styles.kingstoneView}>
              <View style={styles.kingstoneTitle}>
                <View>
                  <Text>Events in</Text>
                </View>
                <View style={styles.secondText}>
                  <Text style={styles.kingstonText}>Kingston</Text>
                  <View>
                    <Text style={styles.changText}>Chang</Text>
                  </View>
                </View>
              </View>
             {(cityEvents !==undefined)  &&
              <VideosComponent 
              cityData={cityEvents}
              />}
            </View>
            <View style={styles.likedView}>
              <View style={styles.EventTitleView}>
                <Text style={styles.kingstonText}>Events you might like</Text>
              </View>
              <VideosComponent
              cityData={cityEvents}
              />
            </View>
            <View style={styles.eventComponentView}>
              {eventsLength > 0 &&
              <FlatList 
              data={events}
              removeClippedSubviews={true}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              // extraData={events}
              />
                // events.map((event, index) => {
                //   let cetegoryId;
                //   let backgroundColor;
                //   console.log(event, "OOOOOOOOOOOO");
                //   if (Object.keys(event).join() === "shopping") {
                //     backgroundColor = "#8559F0";
                //   } else if (Object.keys(event).join() === "sport") {
                //     backgroundColor = "#FEEA3F";
                //   } else if (Object.keys(event).join() === "food") {
                //     backgroundColor = "#FF523E";
                //   } else if (Object.keys(event).join() === "conferences") {
                //     backgroundColor = "#00D5E4";
                //   } else if (Object.keys(event).join() === "health_wellness") {
                //     backgroundColor = "#00ED7C";
                //   } else {
                //     backgroundColor = "#FF6CC9";
                //   }
                //   return (
                //     <Events
                //       key={index}
                //       eventData={event[Object.keys(event).join()].data}
                //       categoryId={Object.keys(event).join()}
                //       backgroundColor={backgroundColor}
                //       onViewAll={(key)=>this.onViewAll(key)}
                //     />
                //   );
                // })
                }
            </View>
          </View>
        </ScrollView> : <View style={styles.loaderView}><ActivityIndicator color="#FF6CC9" size="large" /></View> }
      </View>
    );
  }
}
const mapStateToProps = state => {
  console.log(state, ">>>>>>>>>>>>>>>>>>>>>");
  return {
    getCategoryData: state.getCategory,
    getEventData: state.getEvent,
    getStateAndCityData:state.getStateAndCity,
    getStateAndCityEventData:state.getStateAndCityEvent,
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getEvent: (eventId, eventKey) =>
      dispatch(getEventRequest(eventId, eventKey)),
    getCategory: () => dispatch(getCategoryRequest()),
    getStateAndCity:()=>dispatch(getStateAndCityRequest()),
    getStateAndCityEvent:(cityId)=>dispatch(getStateAndCityEventRequest(cityId))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeTab);

const styles = StyleSheet.create({
  wrapper:{
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
    paddingBottom:90
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
