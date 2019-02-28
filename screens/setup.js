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
} from 'react-native';
import { WebBrowser, LinearGradient, Location, Permissions, Constants,  } from 'expo';
import connect from 'redux';

import CustomeButton from '../components/button';
import CustomHeader from '../components/header';
import Layout from '../constants/Layout';
import { MonoText } from '../components/StyledText';
import Intrest from '../components/intro/intrest'
import Locations from '../components/intro/location';
import Interest from '../Josn/Index';
import {getStateAndCityRequest} from '../redux/action';

export default class SetupScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      step: 1,
      interest:Interest,
      location: null,
    }
  }
  
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } 
    // this.props.action.getStateAndCity();
  }
  useCurrentLocation = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
    this.getGeoAddress(location.coords.latitude, location.coords.longitude);
  };
  selectInterests = (id) => {
    let int = this.state.interest;
    if(int[id] !== undefined && int[id].selected){
      int[id]["selected"] = false ;
    }else {
      int[id]["selected"] = true ;
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
    console.log(storableLocation,"question");
    
  }
  onBackPress = () => {
    const { step } = this.state;
    if(step != 1) {
      this.setState({ step: step - 1 });
    } else {
      this.props.navigation.goBack();
    }
  }
  render() {
    const { step, interest } =this.state
    
    return (
      <View style={styles.container}>
        <CustomHeader
          step={step}
          isLeft={true}
          // headerColors={['#FF6CC9','#FF6CC9']}
          leftIcon={'angle-left'}
          leftPress={this.onBackPress}
        />
        {
          step == 1 &&
          <Intrest 
            data={interest}
            onPress={()=>{ this.setState({step: step + 1}) }}
            selectInterests={(id)=>{this.selectInterests(id)}}
          />
        }
        {
          step == 2 &&
          <Locations 
            {...this.props}
            {...this.state}
            useCurrentLocation={()=>{this.useCurrentLocation()}}
            onPress={()=>{ console.log('navigate') }}            
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
});
