import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Layout from "../constants/Layout";
import { LinearGradient, Font } from "expo";
import { FontAwesome } from "@expo/vector-icons";
import * as actions from "../redux/action";
import CustomHeader from "../components/header";
import Intrest from "../components/intro/intrest";
import ChangeLocation from '../components/ChangeLocation';
import { setItem, getItem } from "../services/storage";
import * as _ from 'lodash';

class ProfileSettingScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      interest: [],
      selectedInt: [],
      changeLocationModal: false,
      search:'',
    };
  }

  async componentWillMount() {
    // await this.props.getCategoryRequest();
    await this.props.getInterestRequest();    
    const { user } = this.props;
    let userInterset = getItem('user_interest');
  }

  componentWillReceiveProps(nextProps) {
    const { getCategoryData, user, getInterest } = this.props;
    if (getInterest.status !== nextProps.getInterest.status) {
      this.setState({ interest: nextProps.getInterest.status.message }
        ,()=>{
        if( user.data.data && user.data.data.interests && user.data.data.interests.length >0){
          this.selectedInt()
        }
      });
    }
  }

  goBack = () => {
    const { navigation } = this.props;
    this.props.navigation.goBack();
  };

  selectedInt = () => {
    const { user } = this.props;
    let int = this.state.interest;
    let selectedInt = _.cloneDeep(user.data.data.interests);
    let listInt = []
    for (let index = 0; index < int.length; index++) {
      let id  = selectedInt.find(data => data._id == int[index]._id)
      if(id){
        if(int[index]._id === id._id){
          if(int[index] !== undefined && int[index].selected){
            int[index]["selected"] = false ;
            // let a = selectedInt.filter(person => person._id != id._id);
            // this.setState({selectedInt:a})
          }else {
            int[index]["selected"] = true ;
            listInt.push(int[index]._id)
            this.setState({selectedInt:listInt})
          }
        }
      }
      console.log(int,'asdasd')
    this.setState({interest:int})
  }
  // setItem("user_interest", JSON.stringify({ interest: selectedInt}));
  }

  selectInterests = async id => {
    let int = this.state.interest;
    let selectedInt = _.cloneDeep(this.state.selectedInt);
    for (let index = 0; index < int.length; index++) {
        if(int[index]._id === id){
          if(int[index] !== undefined && int[index].selected){
            int[index]["selected"] = false ;
            let a = selectedInt.findIndex(person => person == id);
            selectedInt.splice(a,1)
            this.setState({selectedInt:selectedInt})
          }else {
            int[index]["selected"] = true ;
            selectedInt.push(int[index]._id)
            this.setState({selectedInt:selectedInt})
          }
        }
      this.setState({interest:int})
    }
    // setItem("user_interest", JSON.stringify({ interest: selectedInt}));
  };

  updateUserInterest = () => {
    const { selectedInt } = this.state;
    const { user } = this.props;
    let payload = {
      token: user.status.token,
      data: {
        interests: selectedInt
      }
    };
    // console.log(payload,this.props)
    this.props.updateUserDataRequest(payload)
  }

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
    },()=>{
      if(val == false)
        this.onPressLocation()
    })
  }
  onPressLocation = async() => {
    const { search } = this.state;
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
        await this.props.getStateAndCityEventRequest(results._id);
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

  checkChange = () => {
    const { user } = this.props;
    let list = _.cloneDeep(user.data.data.interests)
    const { selectedInt } = this.state;
    let check;
    if(list){
    check = list.map( data => {
      let index = selectedInt.findIndex( id => id == data._id);
      if(index != -1){
        return false
      } else {
        return true
      }
    } )
    } else if (selectedInt.length > 0) {
      check = [true]
    } else {
      check = [false]
    }
    return check[0];
  }

  render() {
    const { getCategoryData, user, getStateAndCityData } = this.props;
    const { interest, changeLocationModal, selectedInt } = this.state;
    let isUpdate = user.data.data.interests && (user.data.data.interests.length != selectedInt.length) ? true : this.checkChange();
    let selectedInterest = user.data.data.interests ? user.data.data.interests : []
    return (
      <View style={styles.mainContainer}>
        <CustomHeader
          isLeft
          leftIcon={"angle-left"}
          leftPress={this.goBack}
          isCenter={true}
          centerTitle={"Profile settings"}
        />

        <View style={{ flex: 1, backgroundColor: "black" }}>
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

          <View
            style={{
              backgroundColor: "lightgray",
              height: Layout.window.height * 0.4
            }}
          >
            <View
              style={{
                height: Layout.window.height * 0.08,
                backgroundColor: "lightgray",
                justifyContent: "center"
              }}
            >
              <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}} >
                <View>
                  <Text style={{ margin: 10, fontWeight: "500" }}> Interest </Text>
                </View>
                <View>
                  {
                    isUpdate &&
                    <TouchableOpacity onPress={this.updateUserInterest} >
                      <Text style={{ margin: 10, fontWeight: "500",color:'white' }}> Save </Text>
                    </TouchableOpacity>
                  }
                </View>
              </View>
            </View>
            {interest && (
              <View style={styles.intrestContainer}>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}
                >
                  <FlatList
                    data={interest}
                    extraData={this.state}
                    keyExtractor={(item, index) => item.name}
                    numColumns={3}
                    style={styles.flatList}
                    renderItem={({ item }) => {
                      let selected =
                        item.selected !== undefined ? item.selected : false;
                      return (
                      <TouchableOpacity
                        onPress={() => {
                          this.selectInterests(item._id);
                        }}
                      >
                        <LinearGradient
                            colors={
                              selected
                                ? [ "#FF6CC9", "#8559F0"]
                                : ["rgba(255,255,255,0)", "rgba(255,255,255,0)"]
                            }
                            style={{ flex: 1 , alignItems:'center'}}
                            start={[0.0, 1.0]}
                            end={[1.0, 1.0]}
                            style={styles.bubbleContainer}
                          >
                            <Text
                              style={[
                                styles.bubbleText,
                                selected
                                  ? { color: "black" }
                                  : { color: "lightgray" }
                              ]}
                            >
                              {" "}
                              {item.name}{" "}
                            </Text>
                          </LinearGradient>
                      </TouchableOpacity>
                      );
                    }}
                  />
                </View>
              </View>
            )}
          </View>

          <View
            style={{
              backgroundColor: "lightgray",
              height: Layout.window.height * 0.2
            }}
          >
            {/* <View
              style={{
                height: Layout.window.height * 0.08,
                backgroundColor: "lightgray",
                justifyContent: "center"
              }}
            >
              <Text style={{ margin: 10, fontWeight: "500" }}> Age </Text>
            </View> */}
            <View style={styles.intrestContainer}>
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}
              >
                {/* age */}
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "lightgray", flex: 1 }}>
            <View
              style={{
                height: Layout.window.height * 0.08,
                backgroundColor: "lightgray",
                justifyContent: "center"
              }}
            >
              <Text style={{ margin: 10, fontWeight: "500" }}> Location </Text>
            </View>
            <View style={styles.intrestContainer}>
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", margin: 10 }}
              >
                <View style={styles.secondText}>
                  <Text style={styles.kingstonText}>{this.state.search}</Text>
                  <View>
                  <TouchableOpacity onPress={()=>{this.setState({changeLocationModal:true})}}>
                    <Text style={styles.changText}>Change</Text>
                  </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "lightgray"
  },
  secondText: {
    flex: 1,
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
  flatList: {
    flexDirection: "column"
  },
  ageFlatList: {
    flexDirection: "row"
  },
  bubbleText: {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 10,
    color: "#D8D8D8",
    fontWeight: "900"
  },
  intrestContainer: {
    // margin:10,
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  bubbleContainer: {
    borderWidth: 1,
    margin: 3,
    borderRadius: 20,
    paddingRight: 15,
    paddingLeft: 15,
    borderColor: "#D8D8D8",
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
    getCategoryData: state.getCategory,
    getStateAndCityData: state.getStateAndCity,  
    getInterest: state.interest,      
  };
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileSettingScreen);
