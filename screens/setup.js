import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { WebBrowser, LinearGradient, Location, Permissions, Constants,  } from 'expo';
import { connect } from "react-redux";

import CustomeButton from '../components/button';
import CustomHeader from '../components/header';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
import Intrest from '../components/intro/intrest'
import Locations from '../components/intro/location';
import Interest from '../Josn/Index';
import {getStateAndCityRequest, getCategoryRequest} from '../redux/action';
import {setItem, getItem} from '../services/storage';


class SetupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      step: 1,
      interest:[],
      location: null,
      search:'',
      stateCity:[],
      selectedInt:[],
    }
  }
  
  async componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    }
   
  }
  async componentDidMount(){
    await this.props.getCategory(); 
    await this.props.getStateAndCity();
    const {getStateAndCityData,getCategoryData} = this.props;
  }
  
  componentWillReceiveProps(nextProps){
    const {getStateAndCityData,getCategoryData} = this.props;
    if(getStateAndCityData.status !== nextProps.getStateAndCityData.status){
      this.setState({stateCity:nextProps.getStateAndCityData.status.data})
    }else if (getCategoryData.status !== nextProps.getCategoryData.status){
      this.setState({interest:nextProps.getCategoryData.status.data})
    }
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
  selectInterests = (id) => {
    let int = this.state.interest;
    let selectedInt = this.state.selectedInt;
    for (let index = 0; index < int.length; index++) {
      if(int[index]._id === id){
        if(int[index] !== undefined && int[index].selected){
          int[index]["selected"] = false ;
           let a = selectedInt.filter(person => person._id != id);
           this.setState({selectedInt:a})
        }else {
          int[index]["selected"] = true ;
          selectedInt.push(int[index])
          this.setState({selectedInt:selectedInt})
        }
      }
    }
    this.setState({interest:int})
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
  onBackPress = () => {
    const { step } = this.state;
    if(step != 1) {
      this.setState({ step: step - 1 });
    } else {
      this.props.navigation.goBack();
    }
  }

  onSearchChange = (text,val) => {
    this.setState({
      search: text,
      selected: val
    })
  }
  onCancelPress = () => {
    this.setState({search:'',selected:false})
  }

  onNextPress = ( ) => {
    const { step, selectedInt, search } = this.state;
    if(selectedInt.length){
      this.setState({step: step + 1,})
    }else{
      this.setState({selectedInt:this.props.getCategoryData.status.data, step: step + 1})
    }
  }
  onPressLocation = () => {
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
      let results = filters.length ? filters[0] : this.props.getStateAndCityData.status.data[0];
      setItem("user_info", JSON.stringify({ interest: selectedInt,location:results}));
      this.props.navigation.navigate('SignUpScreen')
    }
  }
  render() {
    const { step, interest, search } =this.state
    const {getStateAndCityData,getCategoryData} = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          step={step}
          isLeft={true}
          leftIcon={'angle-left'}
          leftPress={this.onBackPress}
        />
              {
                step == 1 &&
                <Intrest
                  {...this.props}
                  {...this.state}
                  category={getCategoryData}
                  data={interest}
                  onPress={()=>{this.onNextPress()}}
                  selectInterests={(id)=>{this.selectInterests(id)}}
                />
              }
              {
                step == 2 &&
                <Locations 
                  {...this.props}
                  {...this.state}
                  stateAndCity={getStateAndCityData}
                  useCurrentLocation={()=>{this.useCurrentLocation()}}
                  onSearchChange={this.onSearchChange}
                  onPress={()=>{this.onPressLocation()}}
                  onCancelPress={this.onCancelPress}            
                />
              }
       </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  activityIndicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});
const mapStateToProps = state => {
  return {
    getStateAndCityData:state.getStateAndCity,
    getCategoryData: state.getCategory,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getStateAndCity:()=>dispatch(getStateAndCityRequest()),
    getCategory: () => dispatch(getCategoryRequest()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetupScreen)